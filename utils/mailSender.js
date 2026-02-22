const nodeMailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, token, otp) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: `"Wanderlust 🏕️" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Verify Your Email Address - Airbnb by Govind",
      html: `
        <div style="font-family: Poppins, sans-serif; background:#f7f9fc; padding:40px;">
          <div style="max-width:650px; margin:auto; background:white; border-radius:15px;
                      box-shadow:0 5px 20px rgba(0,0,0,0.1); overflow:hidden;">

            <!-- HEADER -->
            <div style="background:#ff385c; color:white; padding:20px; text-align:center;">
              <h1 style="margin:0;">
                Airbnb by Govind<br>
                <small style="font-size:14px;">(2023PGCSCS059)</small>
              </h1>
            </div>

            <!-- BODY -->
            <div style="padding:30px; text-align:center;">
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                   width="70" style="margin-bottom:20px;" />

              <h2 style="color:#333;">Verify Your Email</h2>

              <p style="color:#555; font-size:15px; line-height:1.6;">
                Hi 👋<br>
                Thank you for signing up with <strong>Wanderlust</strong>.<br>
                You can verify your account using <b>OTP</b> or the <b>verification link</b>.
              </p>

              <!-- OTP SECTION -->
              <div style="margin:25px 0; padding:20px; background:#f2f4ff;
                          border-radius:10px;">
                <p style="margin:0; font-size:14px; color:#333;">
                  Your One-Time Password (OTP)
                </p>
                <h1 style="letter-spacing:6px; margin:10px 0; color:#ff385c;">
                  ${otp}
                </h1>
                <p style="font-size:13px; color:#777;">
                  OTP is valid for <b>5 minutes</b>
                </p>
              </div>

              <p style="color:#777; font-size:14px;">— OR —</p>

              <!-- LINK BUTTON -->
              <a href="${verificationLink}"
                 style="display:inline-block; background:#ff385c; color:white;
                        padding:12px 25px; border-radius:8px;
                        text-decoration:none; font-weight:600; margin:15px 0;">
                ✅ Verify via Link
              </a>

              <p style="font-size:13px; color:#777;">
                If the button doesn’t work, copy this link:<br>
                <a href="${verificationLink}" style="color:#ff385c;">
                  ${verificationLink}
                </a>
              </p>

              <hr style="border:none; border-top:1px solid #eee; margin:25px 0;">

              <p style="font-size:12px; color:#999;">
                This email was sent by <strong>Airbnb by Govind</strong>.<br>
                Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
  }
};

module.exports = mailSender;
