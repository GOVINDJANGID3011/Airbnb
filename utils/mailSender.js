const nodeMailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, token) => {
  try {
    // Create transporter for Gmail
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.EMAIL_PASS, // Use 16-character Gmail App Password
      },
    });

    // Email content
    const mailOptions = {
      from: `"Wanderlust 🏕️" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Verify Your Email Address - Wanderlust",
      html: `
        <div style="
          font-family: 'Poppins', sans-serif;
          background: #f7f9fc;
          padding: 40px;
          text-align: center;
        ">
          <div style="
            background: white;
            max-width: 650px;
            margin: auto;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            overflow: hidden;
          ">
            <!-- HEADER -->
            <div style="background: #ff385c; color: white; padding: 20px 0;">
              <h1 style="margin: 0; font-size: 26px;">
                Airbnb by Govind <br>
                <small style="font-size: 14px;">(2023PGCSCS059)</small>
              </h1>
            </div>

            <!-- BODY -->
            <div style="padding: 30px;">
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" 
                   alt="Airbnb Logo" 
                   width="70"
                   style="margin-bottom: 20px;" />
              
              <h2 style="color: #333; margin-bottom: 15px;">
                Verify Your Email Address
              </h2>
              
              <p style="color: #555; font-size: 15px; line-height: 1.6;">
                Hi there 👋,<br>
                Thank you for signing up with <strong>Wanderlust</strong>.<br>
                Please verify your email address by clicking the button below.
              </p>
              
              <a href="${process.env.BASE_URL}/verify-email?token=${token}" 
                 style="
                   display: inline-block;
                   background-color: #ff385c;
                   color: white;
                   text-decoration: none;
                   font-weight: 600;
                   padding: 12px 25px;
                   border-radius: 8px;
                   margin: 20px 0;
                   transition: background-color 0.3s ease;
                 ">
                 ✅ Verify Email
              </a>

              <p style="color: #777; font-size: 13px; margin-top: 20px;">
                If the button doesn’t work, copy and paste this link into your browser:<br>
                <a href="${process.env.BASE_URL}/verify-email?token=${token}" style="color:#ff385c;">${process.env.BASE_URL}/verify-email?token=${token}</a>
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

              <p style="color: #999; font-size: 12px;">
                This email was sent by <strong>Airbnb by Govind (2023PGCSCS059)</strong>.<br>
                Please do not reply to this message.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent successfully to ${email}`);
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
  }
};

module.exports = mailSender;
