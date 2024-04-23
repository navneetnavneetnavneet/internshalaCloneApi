const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First Name is required"],
            minLength: [4, "First Name should be atleast 4 character long"]
        },
        lastname: {
            type: String,
            required: [true, "Last Name is required"],
            minLength: [4, "Last Name should be atleast 4 character long"]
        },
        contact: {
            type: String,
            required: [true, "Contact is required"],
            maxLength: [10, "Contact must not be exceed 10 character"],
            minLength: [10, "Contact should be atleast 10 character long"]
        },
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
        },
        organizationname: {
            type: String,
            required: [true, "Organization Name is required"],
            minLength: [4, "Organization Name should be atleast 4 character long"]
        },
        organizationlogo: {
            type: Object,
            default: {
                fileId: "",
                url: "https://images.unsplash.com/photo-1713617317250-c7020e06230f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "internship" }],
        jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
    },
    {
        timestamps: true
    }
);

employeSchema.pre("save", function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

employeSchema.methods.correctpassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

employeSchema.methods.getjwttoken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    )
}

module.exports = mongoose.model("employe", employeSchema);