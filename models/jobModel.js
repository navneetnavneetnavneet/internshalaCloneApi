const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
        employe: { type: mongoose.Schema.Types.ObjectId, ref: "employe" },
        title: String,
        skill: String,
        jobtype: { type: String, enum: ["In office", "Remote"] },
        opennings: Number,
        description: String,
        preferences: String,
        salary: Number,
        perks: String,
        assesments: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("job", jobSchema);