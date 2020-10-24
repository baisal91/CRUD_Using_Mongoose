//jshint esversion:6

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });


//Create new schema using mongoose for fruit
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entery, the name is not specified"]  // validation to have name always
    },
    rating: {
        type: Number,  
        min: 1,  //to give restriction (validation) min to max allowed
        max: 10
    },
    review: String
});

//Create mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);

//Ready to create documnet insert method same in mongo native driver
const fruit =  new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});
//fruit.save();


//Create new schema using mongoose for person
const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

//Create mongoose model
const Person = mongoose.model("Person", personSchema);

//inser person document
const person = new Person ({
    name: "Mark",
    age: 37
});

person.save();

//Find function
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{
        console.log(fruits);
    }
});


//update 
Fruit.updateOne({_id: "5f938512005fc5d64f1964b2"}, {name: "Peach"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfyllu updated");
    }
});

//delete One
Fruit.deleteOne({__id: "5f938b2c7ed1d5d6f1eb7a1d"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Deleted");
    }
});

//delete Many
Person.deleteMany({name: "Mark"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Deleted all the person");
    }
})