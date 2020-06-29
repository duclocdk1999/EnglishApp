const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://127.0.0.1:27017/EnglishApp", 
    { 
        useNewUrlParser: true,  
        useUnifiedTopology: true 
    }
);
mongoose.set('useCreateIndex', true)

const bodyParser = require("body-parser");

const express = require('express')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = 3000
// -------------------------------------------------------------------------------------
// declare table variables
var Account = require("./model/account")
var Category = require("./model/category")
var Topic = require("./model/topic")


// -------------------------------------------------------------------------------------
app.get('/', (req, res) => res.send('Hello đũy Đạt :)'))
// -------------------------------------------------------------------------------------
app.get('/category/get/list', function(request, response) {
    
    Category.find({}, function(error, foundCategoryList) {
        if (error) {
            console.log(error)
            response.status(500).send("internal server error!")
        }   
        else {
            console.log("get category list sucessfully !")
            response.status(400).send(foundCategoryList)
        }
    })
})
// -------------------------------------------------------------------------------------
app.get('/category/get/:categoryId', function(request, response) {
    // postman from:
    // "http://localhost:3000/category/categoryId"

    // get a particular category information by ID

    var categoryId = request.params.categoryId
    Category.findById(categoryId, function(error, foundCategory) {
        if (error) {
            console.log(error)
            response.status(500).send("wrong category id!");
        }
        else {
            console.log("get category sucessfully !")
            response.status(400).send(foundCategory)
        }
    })
})
// -------------------------------------------------------------------------------------
app.get('/topic/get/:topicId', function(request, response) {
    // postman form: no need request body

    var topicId = request.params.topicId
    Topic.findById(topicId, function(error, foundTopic) {
        if (error) {
            console.log(error)
            response.status(500).send("server internal error !")
        }
        else {
            if (foundTopic === null) {
                console.log("topic Id not found !")
                response.status(500).send("wrong topic ID !")
            }
            else {
                console.log("get topic by id sucessfully !")
                response.status(400).send(foundTopic)
            }
        }
    })
})
// -------------------------------------------------------------------------------------
app.get('/topic/get/list', function(request, response) {
    
    // postman form: no need request body

    Topic.find({}, function(error, foundTopicList) {
        if (error) {
            console.log(error)
            response.status(500).send("server internal error !")
        }
        else {
            console.log("get topic list sucessfully !")
            response.status(400).send(foundTopicList)
        }
    })
})
// -------------------------------------------------------------------------------------
app.post('/topic/new', function(request, response) {
    // postman form:
    /*
     * "name": "Animal",
     * "status": true,
     * "category": 
     * {
     *      "_id": "5ef95ec9aed5472405d0d571"
     * }, 
     * "type": "grammar"
     */
    
    var newTopic = new Topic(request.body)
    newTopic.save(function(error, savedTopic) {
        if (error) {
            console.log(error)
            response.status(500).send("this topic name does exist!")
        }
        else {
            console.log("insert new topic sucessfully!")
            response.status(400).send(savedTopic)
        }
    })
})
// -------------------------------------------------------------------------------------
app.post('/category/new', function(request, response) {

    // postman form:
    /*
     * name: first category
     */

    newCategory = new Category(request.body)
    newCategory.save(function(error, savedCategory) {
        if (error) {
            console.log(error)
            response.status(500).send("failed !")
        }
        else {
            console.log("insert new category sucessfully!")
            response.status(400).send(savedCategory)
        }
    })
})
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