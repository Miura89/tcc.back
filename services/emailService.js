const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

const mailerSend = new MailerSend({
    apiKey: process.env.MAILSENDER_TOKEN,
  });

const sendEmail = async (to, name, subject, html) =>{
    const sentFrom = new Sender('ingressiasuporte@gmail.com', "Ingress IA")
    const recipents = [new Recipient(to, name)];
    
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipents)
        .setSubject(subject)
        .setHtml(html)
    
        try{
            const response = await mailerSend.email.send(emailParams);
            return response
        }
        catch(error){
            console.log(error)
        }
}

module.exports = sendEmail