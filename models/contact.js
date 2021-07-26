//mongoose used to create schema

const mongoose=require('mongoose');

//if you have required mongoose at multiple places it will be required from the same instance

//create schema

const contactSchema=new mongoose.Schema({
    name:{
        //name is the first field
        type:String,
        required: true
    },
    phone:{
        //phone is the second field
        type:String,
        require:true
    }
});
//schema-->Basically how one contact's document of a collection would look like

//now we need to mention what will we call our collection

const Contact=mongoose.model('Contact',contactSchema);
//1st arguement-->name  of the collection in the db
//2nd arguement-->That collection will be defined by the schema-->contactSchema
module.exports=Contact;
