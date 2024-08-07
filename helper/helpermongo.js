const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

function mongoServices(dbName) {
    this.dbName = client.db(dbName);
}

mongoServices.prototype.connect = async function() {
  // Use connect method to connect to the server
  try {
      await client.connect();
      console.log('Connected successfully to server');
  }
  catch (error) {
    if (error) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
      }
      throw error;
  }
}

mongoServices.prototype.insertData = async function(collection, data) {
    const colect = this.dbName.collection(collection);
    try {
    const insertResult = await colect.insertMany(data);
    console.log('Inserted documents =>', insertResult);
    }
    catch (error) {
        if (error) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
          }
          throw error;
      }
}

mongoServices.prototype.readData = async function(collection) {
    const colect = this.dbName.collection(collection);
    try {
        const findResult = await colect.find().toArray();
        return findResult;
    }
    catch (error) {
        if (error) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
          }
          throw error;
      }

}

module.exports = mongoServices;