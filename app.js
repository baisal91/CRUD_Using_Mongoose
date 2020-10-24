//jshint esversion:6


//Native mongodb driver
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert"); //testing

//Conection URL
const url = "mongodb://localhost:27017";

//Database Name
const dbName = "fruits";

//Create a new MongoClient
const client = new MongoClient(url, {
    useUnifiedTopology: true
});

//Use connect method to connect to the Server
client.connect(function (err) {
    assert.strictEqual(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

   /*  insertDocument(db, function(){ //to insert the documnets
        client.close();
    }); */

    findDocumnets(db, function(){ //to find the records
        client.close();
    })

    
});



const insertDocument = function (db, callback) {
    //Get the document collection
    const collection = db.collection("fruits");
    //Insert some documents
    collection.insertMany([{
        name: "Apple",
        score: 8,
        review: "Great fruit"
    }, {
        name: "Orange",
        score: 6,
        review: "Kind sour"
    }, {
        name: "Banana",
        score: 9,
        review: "Great stuff!"
    }

    ], function (err, result) {

        assert.strictEqual(err, null);
        assert.strictEqual(3, result.result.n);
        assert.strictEqual(3, result.ops.length);

        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocumnets = function(db, callback){
    //Get the documents collection
    const collection = db.collection("fruits");
    //Find some documents
    collection.find({}).toArray(function(err, fruits) {
        assert.strictEqual(err, null);
        console.log("Foundthe following records");
        console.log(fruits);
        callback(fruits);
    });
}