const express = require('express');
const stripe = require('stripe')('sk_test_51NDTONSCtrTgHtUOR3LaQ2igjvLSslpATZBPS0XkTO56No12j2mapZgAR0vb7lkVCx41tqQ4gSnEqwJE7vU5JcMC00h2jrlibK');

const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_9cYOpChjzoZvatKSA2BZNSJxukiAwHa4';

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err}`);
    return;
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log(`PaymentIntent ${paymentIntent.id} was successful!`);

    // Store the order and delivery details in Firestore
    // Send a message to the admin using Twilio
  }

  res.status(200).send();
});

app.listen(3000, () => {
  console.log('Stripe server listening on port 3000');
});
