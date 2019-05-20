const sgMail = require('@sendgrid/mail')
const config = require('config')
const SENDGRID_API_KEY = config.get('SENDGRID_API_KEY')
sgMail.setApiKey(SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to:email,
        from:'shahynkamali@gmail.com',
        subject:'Thank you for joining ISomm!',
        text:`Welcome ${name} to ISomm!. This is a beta version!`,
    })
}

const sendGoodbyeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'shahynkamali@gmail.com',
        subject: 'Please tell me why you left?',
        text: `Thanks ${name}`,
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail

}