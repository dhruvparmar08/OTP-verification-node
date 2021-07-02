const express = require('express');
const app = express();
const port = process.env.port || 8080;
const config = require('./config');
const client = require('twilio')(config.accountID, config.authToken)

app.get('/login' , (req , res)=>{

    client
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to: `+${req.query.phone}`,
            channel: 'sms'
        }).then((data) => {
            res.status(200).json({data: data})
        })
//    res.send('hello from simple server :)')
})

app.get('/verify', (req, res) => {
    client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to: `+${req.query.phone}`,
            code: req.query.code
        }).then((data) => {
            res.status(200).json({data: data})
        })
})

app.listen(port, ()=> console.log("connected with ", port));