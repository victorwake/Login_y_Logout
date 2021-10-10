var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contacto', {
    isContacto: true,
  });
});



router.post('/', async function(req,res,next) {

  var nombre = req.body.nombre;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'victorpintowake@outlook.com',
    subject: 'Contacto desde la web Transporte X',
    html:
      nombre +
      " se contacto a traves y quiere info a este correo: " +
      email +
       +
      "<br> , Ademas, hizo el siguiente comentario: " +
      mensaje +
      ", <br> Su telefono es " +
      telefono
  } // cierra var obj

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  }) //cierra transporte

  var info = await transport.sendMail(obj);

  res.render('contacto', {
    isContacto: true,
    message: 'Mensaje enviado correctamente'
  });
}); //Cierrra el post*/

module.exports = router;
