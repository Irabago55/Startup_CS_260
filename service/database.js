const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const cartCollection = db.collection('cart');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

  function getUser(email) {
    return userCollection.findOne({ email: email });
  }

  async function addUser(email, password) {
    const user = {
        email: email,
        password: password,
        cart: []
    }
    await userCollection.insertOne(user);
  }


  module.exports = {
    addUser,
    getUser
  }
  //upload to github