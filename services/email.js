
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const api_key = process.env.EMAIL_API_KEY

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.EMAIL_PRIVATE_KEY
const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi()

function SendEmail(WhomToSend,time,date){

    

    const sender = {
        email : "vinaykumararva13@gmail.com"
    }
    
    const receiver = [
        {
            email : `arvavinaykumar@gmail.com`
        }
    ]
    
    return tranEmailApi.sendTransacEmail({
        sender,
        to :receiver,
        subject : "Saloon Appointment Booking Confirmation",
        htmlContent:`

        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .email-container {
      padding: 20px;
    }
    .email-header {
      background-color: #319a4b;
      color: #fff;
      padding: 10px 0;
      text-align: center;
    }
    .email-body {
      background-color: #fbfbfbd9;
      padding: 20px;
      border-radius: 5px;
    }
    .footer {
      font-size: 14px;
      color: #000000;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container email-container">
    <!-- Email Header -->
    <div class="email-header">
      <h2>Booking Confirmation</h2>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <h4>Hello,</h4>
      <p>Thank you for booking with us! We are pleased to confirm your appointment.</p>

      <p><strong>Appointment Details:</strong></p>
      <ul>
        <li><strong>Appointment Date:</strong> ${date}</li>
        <li><strong>Appointment Time:</strong> ${time}</li>
        <li><strong>Location:</strong> Hyderabad</li>
      </ul>

      <p>If you need to make any changes or cancel your appointment, please let us know at least 24 hours in advance. You can contact us by replying to this email or calling +91 7563483431.</p>

      <p>We look forward to seeing you!</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Best regards,</p>
      <p><strong>Saloon Booking Service</strong></p>
      <p>Hyderabad</p>
      <p><a href="#" target="_blank">Visit our website</a></p>
    </div>
  </div>

  <!-- Bootstrap JS (Optional) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>



        `
    }).then((result) => {
        return result
    }).catch((err) => {
        return err
    });

}


module.exports = SendEmail;






