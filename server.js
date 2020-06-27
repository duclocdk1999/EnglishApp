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
const { response } = require("express");


// -------------------------------------------------------------------------------------
app.get('/', (req, res) => res.send('Hello World!'))
// -------------------------------------------------------------------------------------
app.post("/register", function(request, response) {

    // postman form:
    /*
     * "username":  "oppa",                                 --> required, unique
     * "email":     "duclocdk1999@gmail.com",               --> required, unique
     * "password":  "1",                                    --> required
     * "type":      "student-account",
     * "phone":     "0905259939",                           --> required
     * "gender":    true,                                   --> true: female, false: male
     * "address":   "135B District 1, California, US"     
     * "birthDate": "17/02/1999"
     */

    account = new Account(request.body);

    var username = request.body.username;
    var password = request.body.password;

    // check if username and password does exist in form
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

    // postman form:
    /*
     * "username": "oppa",
     * "password": "1" 
     */
    
    var username = request.body.username;
    var password = request.body.password;

    Account.findOne({username: username, password: password}, function(error, account) {
        // received account from database will be saved into account variable here

        if (error || account === null) {
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
app.put("/edit-password", function(request, response) {
    
    // postman form:
    /*
     * "username":      "oppa",
     * "password":      "1"
     * "newPassowrd:"   "2"
     */

    var username = request.body.username;
    var password = request.body.password;
    var newPass  = request.body.newPassword;

    Account.findOne({username: username, password: password}, function(error, foundAccount) {
        // result will be saved in foundAccount

        if (error || foundAccount === null) {
            console.log(error)
            response.status(500).send("wrong username or password")
        }
        else {
            // update password
            foundAccount.password = newPass

            // save new account to database
            foundAccount.save(function(error, updatedAccount) {
                if (error) {
                    console.log(error)
                    response.status(500).send("unexpected error from server!")
                }
                else {
                    console.log("change password sucessfully!");
                    response.status(400).send(updatedAccount)
                }
            })
        }
    })
})
// -------------------------------------------------------------------------------------
app.put("/update", function(request, response) {

    // postman form
    /*
     * "username":  "oppa",                                 --> required, unique
     * "email":     "duclocdk1999@gmail.com",               --> required, unique
     * "password":  "1",                                    --> required
     * "type":      "student-account",
     * "phone":     "0905259939",                           --> required
     * "gender":    true,                                   --> true: female, false: male
     * "address":   "135B District 1, California, US"     
     * "birthDate": "17/02/1999"
     */

    username = request.body.username;
    email = request.body.email;
    password = request.body.password;
    type = request.body.type;
    phone = request.body.phone;
    gender = request.body.gender;
    address = request.body.address;
    birthDate = request.body.birthDate;

    Account.findOne({username: username, password: password}, function(error, foundAccount) {
        // result will be saved into updatedAccount

        if (error || foundAccount === null) {
            console.log(error);
            response.status(500).send("wrong username or password - update failed");
        }
        else {

            if (email) {
                foundAccount.email = email;
            }
            if (type) {
                foundAccount.type = type;
            }
            if (phone) {
                foundAccount.phone = phone;
            }
            if (gender !== null) {
                foundAccount.gender = gender;
            }
            if (address) {
                foundAccount.address = address;
            }
            if (birthDate) {
                foundAccount.birthDate = birthDate;
            }

            console.log(foundAccount)
            // Account.findOneAndUpdate({username: username, password: password}, 
            //                         {$set:{
            //                             "gender": false
            //                         }}, 
            //                         { returnNewDocument: true });
            
            foundAccount.save(function(err, updatedAccount) {
                if (err) {
                    console.log(err)
                    response.status(500).send("internal error")
                }
                else {
                    console.log("update sucessfully!");
                    response.status(400).send(updatedAccount);
                }
            })
        }
    })    
})
// -------------------------------------------------------------------------------------
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))