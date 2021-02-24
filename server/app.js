const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')


const app = express()

app.use(cors())

// Mongo db
// https://cloud.mongodb.com/v2/603030b98800966cc35e18d7#clusters/connect?clusterId=Cluster0
const uri = "mongodb+srv://colin:test123@cluster0.8ydse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri)
mongoose.connection.once('open', () => {
  console.log('connected to the database')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


app.listen(4000, () => {
  console.log('App listening on port 4000')
})