const connectToMongo= require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

//cors middleware

app.use(cors())


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.set(express.urlencoded());
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port, () => {
  console.log(`INotebook backend listening on port ${port}`)
})