const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

exports.sendMail = async function (recepient, subject, text) {
  try {
    // create transporter
    console.log("Starting mail function...");

    // send email
    const accessToken = await OAuth2Client.getAccessToken();
    console.log("access token: ", accessToken);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
      },
    });

    console.log("Transporter created");

    // create mail options
    let mailOptions = {
      from: process.env.EMAIL,
      to: recepient,
      subject: subject,
      text: text,
    };

    // send email
    const result = await transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Email sent");
      transporter.close();
      return data;
    });

    return result;
  } catch (error) {
    return error;
  }
};
