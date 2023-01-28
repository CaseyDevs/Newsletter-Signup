const express = require('express')
const bodyParse = require('body-parser')
const request = require('request')
const bodyParser = require('body-parser')
const https = require('https')
const client = require('@mailchimp/mailchimp_marketing')

const app = express()

require('./routes')(app)

require('dotenv').config()

// Set mailchimp configurations
client.setConfig({
    apiKey: `${process.env.API_KEY}`, 
    server: `${process.env.DC}`,
})

// Server static files in public folder
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true}))

app.post('/', (req, res) => {
    // Data from form input
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    // User object containing input data
    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    }

    // Add user to news letter
    const run = async () => {
        try {
            const response = await client.lists.addListMember(`${process.env.LIST_ID}`, {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscribingUser.firstName,
                    LNAME: subscribingUser.lastName
                }
            })

            res.sendFile(__dirname + '/pages/success.html')
            console.log(response);

        } catch (error) {
            res.sendFile(__dirname + '/pages/failure.html')
        }
    }
    run()
})

// Local port run

app.listen(3000, () => {
    console.log('Sever is running on port 3000');
})