const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path');

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((error, req, res, next) => {

    if (error.status) {
        return res.status(error.status).json({
            message: error.message,
        });
    }

    if (error.message.includes("Cast to ObjectId failed for value")) {return res.status(404).json({
        message: `We didn't find anyone with ID ${error.value}. Please try again`,
        });
    } 
    
    return res.status(500).json({
        message: "Internal server error" 
    });
});


module.exports = app