require("dotenv").config();
const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const bodyparser = require("body-parser")
const { NM_PASSWORD, NM_EMAIL, PORT } = process.env;
const port = PORT || 3001

const app = express()

app.use(cors())

app.use(bodyparser.json())

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: NM_EMAIL,
    pass: NM_PASSWORD,
  },
})

transport.verify((error) => {
  if(error) {
      console.log(error)
  } else {
      console.log("Mensaje enviado")
  }
})

app.get("/prueba", (req, res) => {
  res.json({message: "Todo andando bien"})
})

app.post("/contac", (req, res) => {
  const { name, lastName, email, phone, message } = req.body

  const mail = {
    from: email,
    to: NM_EMAIL,
    subject: "Contacto desde la web Reina trenzas",
    html: `<p>Nombre: ${name}</p>
           <p>Apellido: ${lastName}<p>
           <p>email: ${email}</p>
           <p>Cel: ${phone}</p>
           <p>Mensaje: ${message}`
  }


  transport.sendMail(mail, (error) => {
    if(error) {
      console.log(error)
      res.json({code: 500, message: "Ah ocurrido un error"})
    } else {
      res.json({code: 200, message: "Mensaje enviado"})
    }
  })

})

  app.listen(port, () => {
    console.log(`server walking in the port ${port}`); 
  });
