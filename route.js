async function handler({ amount, paymentType, paymentMethodId }) {
  const session = getSession();

  if (!session?.user) {
    return { error: "Authentication required" };
  }

  if (!amount || !paymentType || !paymentMethodId) {
    return { error: "Missing required payment information" };
  }

  try {
    const result = await sql.transaction(async (sql) => {
      const [payment] = await sql`
        INSERT INTO payment_records (
          user_id,
          amount,
          payment_type,
          transaction_id,
          payment_status,
          created_at
        )
        VALUES (
          ${session.user.id},
          ${amount},
          ${paymentType},
          ${paymentMethodId},
          'processing',
          NOW()
        )
        RETURNING id
      `;

      const response = await fetch(
        "https://api.stripe.com/v1/payment_intents",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            amount: Math.round(amount * 100),
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: "true",
          }),
        }
      );

      const paymentIntent = await response.json();

      if (paymentIntent.error) {
        await sql`
          UPDATE payment_records
          SET payment_status = 'failed'
          WHERE id = ${payment.id}
        `;
        throw new Error(paymentIntent.error.message);
      }

      const receiptUrl = paymentIntent.charges.data[0]?.receipt_url;

      await sql`
        UPDATE payment_records
        SET 
          payment_status = 'completed',
          receipt_url = ${receiptUrl},
          transaction_id = ${paymentIntent.id}
        WHERE id = ${payment.id}
      `;

      return { paymentId: payment.id, receiptUrl };
    });

    return {
      success: true,
      paymentId: result.paymentId,
      receiptUrl: result.receiptUrl,
      message: "Payment processed successfully",
    };
  } catch (error) {
    return {
      error: "Payment processing failed",
      details: error.message,
    };
  }
}