const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())
app.use(require('./routes/formRoute'))



async function connectToDatabase() {
    try {
        await mongoose.connect(MONGOURI);
        console.log("Database Connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}
connectToDatabase();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
