



// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const accountSid = 'AC8bbbadd96d294d39dd811ec5b39496f5';
const authToken = 'b40afe90d266452652c47ae6ef19d5a6';
const client = new twilio(accountSid, authToken);


app.post('/send-sms', async (req, res) => {
  const { orderData, adminPhoneNumber } = req.body;

  try {
    const message = await client.messages.create({
      body: `New order received: ${JSON.stringify(orderData)}`,
      to: adminPhoneNumber,
      from: 'whatsapp:+14155238886',
    });

    res.status(200).send({ message: 'SMS sent successfully', data: message });
  } catch (error) {
    res.status(500).send({ error: 'Error sending SMS', details: error });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
