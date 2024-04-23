const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
    {
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
        employe: { type: mongoose.Schema.Types.ObjectId, ref: "employe" },
        profile: String,
        skill: String,
        internshiptype: { type: String, enum: ["In office", "Remote"] },
        opennings: Number,
        from: String,
        to: String,
        duration: String,
        responsibility: String,
        stipend: {
            status: { 
                type: String, 
                enum: ["Fixed", "Negotiable", "Perforemance", "Unpaid"] 
            },
            amount: Number
        },
        perks: String,
        assesments: String,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("internship", internshipSchema);