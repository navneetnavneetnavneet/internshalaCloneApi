const mongoose = require("mongoose");

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connection Established");
    } catch (error) {
        console.log(error.message);
    }
}

// mogodb_atlas_url
// mongodb+srv://navneetsinghsolanki2003:klZLMfrpeOcNExoU@cluster0.55rleyw.mongodb.net/internshalaclone