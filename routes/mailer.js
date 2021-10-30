const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const router = require("express").Router();

dotenv.config();
const sendMail = (user, callback) => {
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
    from: `"mriwa", "marwaannebi25@gmail.com"`,
     to: `${user.user.email}`,
    subject: "Confirmation",
    html: `
    <h2>
    تطبيقة تخلّي صغيرك يقرا من غير ضغط و هو مرتاح و اتحبّو في القراية
    مرحبا بصغيرك معنا
     ClassQuiz
    </h2>
    <img src="feature-5.png" />
    <br>
   <p>Please confirm your email by clicking on the following link</p>
    <br>
    <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
           // http://localhost:3001/generatepassword/${user.id}`,
  };
  transporter.sendMail(mailOptions, callback);
};

router.post("/sendmail", (req, res) => {
  console.log("request came");
  const user ={ ...req.body, id : req.body.id.data.id};
  console.log(user.user.email)
 sendMail(user, (err, info) => {
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