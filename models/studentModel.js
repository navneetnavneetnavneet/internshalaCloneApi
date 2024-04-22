const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        },
        resetPasswordToken: {
            type: String,
            default: "0"
        }
    },
    {
        timestamps: true
    }
);

studentSchema.pre("save", function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

studentSchema.methods.correctpassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

studentSchema.methods.getjwttoken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    )
}

module.exports = mongoose.model("student", studentSchema);