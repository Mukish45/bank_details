const { ObjectId } = require('mongodb');

const express = require("express");
const mongoose = require('mongoose');

const app = express()

app.use(express.json())

const uri = 'mongodb+srv://mukish:Hsikum%40321@cluster0.minsz0l.mongodb.net/bank_details';
const collectionName = 'bank_details';
const dataSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true
      },
      address: {
        type: String,
      },
      bank_id: {
        type: String,
      },
      bank_name: {
        type: String,
      },
      branch: {
        type: String,
      },
      city: {
        type: String,
      },
      district: {
        type: String,
      },
      ifsc: {
        type: String,
      },
      state: {
        type: String,
      }
});

const Data = mongoose.model('Data', dataSchema, collectionName);



var port_number = process.env.PORT || 3000;

app.listen(port_number,()=>{
    console.log(port_number)
    console.log("Server running...")
});

app.get('/', (req, resp) => {
    resp.send("Welcome to MongoDB API")
})


app.get('/api/search', (req, resp)=>{

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => {
        console.log('Connected to MongoDB Atlas');
        return Data.find({city:req.query.q}).sort({ifsc:1}).limit(req.query.limit).skip(req.query.offset).exec();
      })
      .then((data) => {
        console.log(`Data in '${collectionName}':\n${JSON.stringify(data, null, 2)}`);
        resp.send(data);
        return mongoose.connection.close();
      })
    
      .then(() => {
        console.log('Disconnected from MongoDB Atlas');
      })
    
      .catch((err) => {
        console.log(`Error fetching data: ${err}`);
      });

})


app.get('/api/branch', (req, resp)=>{
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => {
        console.log('Connected to MongoDB Atlas');
        return Data.find({branch:req.query.q}).sort({ifsc:-1}).limit(req.query.limit).skip(req.query.offset).exec();
      })
    
      .then((data) => {
        console.log(`Data in '${collectionName}':\n${JSON.stringify(data, null, 2)}`);
        resp.send(data);
        return mongoose.connection.close();
      })
    
      .then(() => {
        console.log('Disconnected from MongoDB Atlas');
      })
    
      .catch((err) => {
        console.log(`Error fetching data: ${err}`);
      });
})

