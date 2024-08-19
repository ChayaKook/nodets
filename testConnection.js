const { MongoClient } = require('mongodb');

// Connection URI
// const uri = 'mongodb+srv://ck:Chayuta51529@cluster0.mojcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const uri = 'mongodb://localhost:27017/tootit'
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function testConnection() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        console.log('Connected successfully to the MongoDB Atlas cluster');
        console.log("******************");
        
    } catch (e) {
        console.error('Error connecting to the MongoDB Atlas cluster:', e);
    } finally {
        // Close the connection
        await client.close();
    }
}

testConnection();
