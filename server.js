const mongoose = require("mongoose");
const database = mongoose.connect("mongodb://127.0.0.1:27017/EnglishApp");

const bodyParser = require("body-parser");

const express = require('express')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = 3000
// -------------------------------------------------------------------------------------
var Account = require("./model/account");


// -------------------------------------------------------------------------------------
app.get('/', (req, res) => res.send('Hello World!'))
// -------------------------------------------------------------------------------------
app.post("/register", function(request, response) {
    account = new Account(request.body);

    var username = request.body.username;
    var password = request.body.password;

    if (username && password && username.length > 0 && password.length > 0) {

        account.save(function(error, savedAccount) {
            if (error) {
                console.log(error);
                response.status(500).send("username does exist - register failed!");
            }
            else {
                console.log("sign up sucessfully");
                response.status(400).send('sign up successfully');
            }
        })
    }
    else {
        console.log(username, ' ', password);
        response.status(500).send("your username or password is not in acceptable form, pls fix it !");
    }
});
// -------------------------------------------------------------------------------------
app.post("/login", function(request, response) {
    
    var username = request.body.username;
    var password = request.body.password;

    Account.find({username: username, password: password}, function(error, account) {
        if (error) {
            console.log("login failed!");
            response.status(500).send("login failed! Wrong username or password");
        }
        else {
            console.log("login sucessfully");
            response.status(400).send(account);
        }
    })
})
// -------------------------------------------------------------------------------------
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))