const express = require ("express")
const nodemailer = require("nodemailer")

const app = express()
app.use(express.json())
const path = require('path');

app.use(express.static(path.join(__dirname, 'static')));

const transporter =nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "courageosemwengie@gmail.com",
        pass: 'faithbosky'
    }
})
const mailOptions = {
    from: 'courageosemwengie@gmail.com', // sender address
    to: 'osamudiamenogbiede55@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
  }

  transporter.sendMail(mailOptions, function(err,info){
      if(err){
          console.log(err)
      }
      else{
          console.log(info)
      }
  })

const port = (process.env.PORT || '8000');


app.listen(port, () => console.log(`Running server on Port ${port}`))