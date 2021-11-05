const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const router = require("express").Router();

dotenv.config();
const sendMail = (email, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: `"marwa", "marwaannebi25@gmail.com"`,
    to: `${email}`,
    subject: "Confirmation",
    html: `
    <h2>
    تطبيقة تخلّي صغيرك يقرا من غير ضغط و هو مرتاح و اتحبّو في القراية
    مرحبا بصغيرك معنا
    ClassQuiz
    </h2>
    <br>
    <p>Please confirm your email by clicking on the following link</p>
    <br>
    <a href="http://localhost:3001/login" > Click here</a>`,
  };
  transporter.sendMail(mailOptions, callback);
};

router.post("/sendmail", (req, res) => {
  console.log("request came");
  let email = req.body.email;
  console.log(email)
  
  sendMail(email, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.status(200).json({ msg: info });
    }
  });
});

module.exports = router;
