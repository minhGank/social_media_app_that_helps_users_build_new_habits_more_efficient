const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_SECRET, MAILING_REFRESH, MAILING_ID } = process.env;
const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVertificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "donotrix email vertification",
    //email html change here:
    html: `<div style="max-width: 700px; margin-bottom: 1rem;display:flex; align-items:center; gap:10px; font-family: Roboto; font-weight: 600;color:#3b5998"> <img src="#"/> <span> Action require: Activate your donotrix account </span> </div> <div style="padding: 1rem 0; border-top: 1px solid white; border-bottom: 1px solid white; color:black; font-family: Roboto; font-size:17px "> <span> Hello ${name} </span> <div style="padding: 20px 0 "> <span style=" padding: 1.5rem 0"> You recently created an account on donotrix. To complete your registration, please confirm your account. </span> </div> <a href="${url}" style="width:200px; padding: 10px 15px; background: #4c649b; color: white; text-decoration: none; font-weight: 600;">Confirm your account</a> </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
