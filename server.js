const express = require("express")
const cors = require("cors")
const ejs = require('ejs')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())
const path = require('path');

app.use(express.static(path.join(__dirname, 'static')));

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.post('/email', (req, res) => {
    const { email, message, name, subject } = req.body
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "courageosemwengie@gmail.com",
            pass: 'faithbosky'
        }
    })

    ejs.renderFile(__dirname + "/mail.ejs", { name: name, message: message }, function (err, data) {
        if (err) {
            res.status.send({ status: false })
        } else {
            const mailOptions = {
                from: email, // sender address
                to: 'courageosemwengie@gmail.com', // list of receivers
                subject: subject, // Subject line
                html: data
            }

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    return res.status(200).send({ status: false })
                }
                else {
                    return res.status(200).send({ status: true })
                }
            })
        }
    })

})


const port = (process.env.PORT || '8000');


app.listen(port, () => console.log(`Running server on Port ${port}`))