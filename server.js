const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
dotenv.config();

const { HOST_URI } = process.env;

function main() {
    try {
        mongoose.connect(HOST_URI)
        console.log("Database connection successful")

        app.listen(3000, () => {
            console.log("Server running. Use our API on port: 3000")
        })
    } catch (error) {
        console.log("Error connect MongoDB", error.message)
        process.exit(1)
    }
}

main();
