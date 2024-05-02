const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://szbalint:Bali2006@base.d0abfnx.mongodb.net/?retryWrites=true&w=majority&appName=Base';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

connectToDatabase();

// Connect to the MongoDB server
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
        await client.close();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
