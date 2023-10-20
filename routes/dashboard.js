const express = require('express');
const { MongoClient } = require('mongodb');

const router = express.Router();

// Initialize MongoDB Database
const url = "mongodb://localhost:27017";
const dbName = "FarmManagement";

const client = new MongoClient(url);

// Connect to the database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err;
    }
}

// Function to retrieve crops
async function retrieveCrops() {
    try {
        const db = client.db(dbName);
        const collection = db.collection("crops");
        const documents = await collection.find({}).toArray();
        return documents; // Return the retrieved data
    } catch (err) {
        console.error("Error retrieving crops:", err);
        throw err;
    }
}

// Function to retrieve cows
async function retrieveCows() {
    try {
        const db = client.db(dbName);
        const collection = db.collection("cows");
        const documents = await collection.find({}).toArray();
        return documents; // Return the retrieved data
    } catch (err) {
        console.error("Error retrieving cows:", err);
        throw err;
    }
}

// Function to insert a document into a collection
async function insertDocument(collectionName, document) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(document);
        console.log(`Added document with _id: ${result.insertedId}`);
    } catch (error) {
        console.error('Error adding document:', error);
        throw error;
    }
}

//Setup routes
router.route('/')
    .get(async (req, res) => {
        try {
            await connectToDatabase();
            const crops = await retrieveCrops();
            const cows = await retrieveCows();
            res.render('dashboard', { crops, cows });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    })
    .post(async (req, res) => {
        try {
            await connectToDatabase();

            if (req.body.hasOwnProperty('cropName')) {
                // If the request has 'cropName' property, it's for adding a crop
                const newCropType = {
                    cropName: req.body.cropName,
                    Quantity: req.body.Quantity,
                    cropPrice: req.body.cropPrice,
                    cropDescription: req.body.cropDescription
                };
                await insertDocument("crops", newCropType);
            } else if (req.body.hasOwnProperty('cowTag')) {
                // If the request has 'cowTag' property, it's for adding a cow
                const newCow = {
                    cowTag: req.body.cowTag,
                    cowType: req.body.cowType,
                    milkQuantity: req.body.milkQuantity,
                    milkPrice: req.body.milkPrice
                };
                await insertDocument("cows", newCow);
            }

            res.redirect('/dashboard'); // Redirect to the product listing page
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

module.exports = router;
