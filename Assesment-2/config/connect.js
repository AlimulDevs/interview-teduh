const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Ganti dengan URL MongoDB Anda
const client = new MongoClient(uri);

exports.connectToMongo = async function () {
    try {
        await client.connect();
        console.log("Terhubung ke MongoDB");
    } catch (error) {
        console.error("Gagal terhubung ke MongoDB:", error);
    }
}
exports.database = client.db('db-teduh'); // Ganti dengan nama database Anda
