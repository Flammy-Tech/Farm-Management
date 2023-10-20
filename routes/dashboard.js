const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const router = express.Router();

// Initialize MongoDB Database
const url = "mongodb://localhost:27017";
const dbName = "FarmManagement";

const client = new MongoClient(url);




//Setup routes
router.route('/')
    .get((req, res) =>{
        res.render('dashboard');

    }).post(async(req, res) =>{
        try {
            const newCropType = {
                cropName: req.body.cropName,
                Quantity: req.body.Quantity,
                cropPrice: req.body.cropPrice,
                cropDescription: req.body.cropDescription
              };

            // Insert the new product into the MongoDB collection
            const db = client.db(dbName);
            const collection = db.collection("crops");
            const result = await collection.insertOne(newCropType);

            console.log(`Added crop with _id: ${result.insertedId}`);

            res.redirect('/dashboard'); // Redirect to the product listing page
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error'); // Handle errors gracefully
        }

    });

module.exports = router;