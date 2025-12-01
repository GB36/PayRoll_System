const mongoose = require("mongoose");

const connectDB = async () => {

    console.log('MongoDB URI:', process.env.MONGODB_URI);

    // if (process.env.SKIP_DB === 'false') {
    //     console.log("Skipping MongoDB connection as per SKIP_DB flag.");
    //     return;
    // }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }

};

module.exports = connectDB;
