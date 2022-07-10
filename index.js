const express = require('express');
const cors = require('cors') ;
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose') ;
const port = process.env.PORT || 5000;
const app = express() ;
const uri = "mongodb+srv://mehakbrar811:mehak%40811@cluster1.g6rue.mongodb.net/?retryWrites=true&w=majority";
const path = require('path') ;


// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("DATABASE CONNECTED")
//   // perform actions on the collection object
//   client.close();
// });
mongoose.connect(uri , {useNewurlParser: true}) ;
const connection = mongoose.connection ;
connection.once('open' , () => {
    console.log("DataBASE CONNECTED");
})

app.use(express.json()) ;
app.use(cors()) ;
app.use("/movies" , require('./routes/getmovies') ) ;
app.use("/tvshows" , require('./routes/getTvShows') ) ;
app.use("/series" , require('./routes/getSeries') ) ;

app.listen(port , () => {
    console.log(`https://localhost:${port}`)
})
