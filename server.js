const express = require('express')
const connectDB = require('./config/db')

const app = express();

//Connect to Database
connectDB();


// Init Middleware
//Allows us to accept body data
app.use(express.json({ extended: false}))

//making get request to our server 
//.get() takes place, and arrow functiion with req and res and .json
app.get('/', (req, res) => res.json({msg: 'Welcome to contact keeper api'}) );


//Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(` Server started on port ${PORT}`))