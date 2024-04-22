const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            select: false,
            required: [true, "Password is required"],
            maxLength: [15, "Password should not exceed more than 15 characters"], 
            minLength: [6, "Password should hava atleast 6 characters"], 
            // match: []
        }
    },
    {
        timestamps: true
    }
);

studentSchema.pre("save", function(){
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

studentSchema.methods.correctpassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("student", studentSchema);