const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1lk0tsy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("taskmanagementDB").collection("users");
    const taskCollection = client.db("taskmanagementDB").collection("tasks");

    app.get("/task", async(req, res)=> {
       const userInf = req.query.email;
       const result = await taskCollection.find({email: userInf}).toArray()
       res.send(result)
    })
    app.get("/users", async(req, res)=> {
       
       const result = await userCollection.find().toArray()
       res.send(result)
    })

    app.delete("/task/:id", async (req, res)=> {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await taskCollection.deleteOne(query)
      res.send(result)
    })

    app.put("/task/:id", async (req, res)=> {
      const id = req.params.id;
      const item = req.body;
      console.log(id, item);
      const query = {_id: new ObjectId(id)}
      const updateItem = {
        $set: {
          type: item.type
        }
      }
      const result = await taskCollection.updateOne(query, updateItem)
      res.send(result)
    })

    app.post("/user", async (req, res) => {
      const userInfo = req.body;
      const result = await userCollection.insertOne(userInfo);
      res.send(result)
    });

    app.post("/task", async (req, res) => {
      const userInfo = req.body;
      const result = await taskCollection.insertOne(userInfo);
      res.send(result)
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  console.log(res.send("hellow"));
});

app.listen(port, () => {
  console.log("running with 5000");
});
