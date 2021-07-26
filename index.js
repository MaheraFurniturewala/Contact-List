const express = require('express');
const path = require('path');
const port = 8000;

//require the library/configuration for setting up my db to be accessed by mongoose(ODM) 
//has to be done before express is fired up
//./ because parallel folder in the same path

const db=require('./config/mongoose');


//import contact schema
const Contact=require('./models/contact');
//now this Contact variable will be used to creare entries,populate....
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middleware to convert string format from form to parsed JSON type object
app.use(express.urlencoded());
//import assets
app.use(express.static('assets'));


var contactList = [
    {
        name: "Mahera",
        phone: "1111111111"
    },//This document follows a schema-->
    //schema-->Is a def of what fields would be there in one document.
    //A document needs a schema which needs to be defined in mongoose and mongoose  then populates the model using the schema
    //Basically predefine the fields in objects. 
    //fields can be added in schema//step1-->Desfine schema
    //step 2-->Access datbase through schema
    //Creating schema: in modules-->contact.js
    //M of MVC
    //A schema needs to be defined for just one pf these contacts and the other contacts will follow
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', function(req, res){

    Contact.find({},(err,contacts)=>{
        if(err){
            console.log("error in fetching contacts from db");
            return;
            

        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
    
    });
    });
});
app.post('/create-contact', function(req, res){
    
    // contactList.push(req.body);
    //Using Contact to create an instance of the schema and put it in teh db
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
        //this  entire part could be replaced by req.body
    }, (err,newContact)=>{
        if(err){
            console.log("Error in creating a contact");
            return;

        }
        else{
            console.log("***********", newContact);
            return res.redirect('back');
        }
    })

    
});


app.get('/delete-contact/', function(req, res){
    //get the id from the query in the url
    let id=req.query.id;
    //find the contact in the database using id and delete it 
    Contact.findByIdAndDelete(id,(err)=>{
        console.log("error in deleting an object in database");
        return;
    })
    return res.redirect('back');
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})