const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [3, "First Name should be atleast 3 character long"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minLength: [3, "Last Name should be atleast 3 character long"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxLength: [10, "Contact must not be exceed 10 character"],
      minLength: [10, "Contact should be atleast 10 character long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
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
      default: "0",
    },
    organizationName: {
      type: String,
      minLength: [3, "Organization Name should be atleast 3 character long"],
    },
    organizationCity: {
      type: String,
      minLength: [3, "Organization City should be atleast 3 character long"],
    },
    organizationDescription: {
      type: String,
    },
    numberOfEmployees: {
      type: String,
    },
    industry: {
      type: String,
      minLength: [3, "Industry should be atleast 3 character long"],
    },
    organizationLogo: {
      type: Object,
      default: {
        fileId: "",
        url: "",
      },
    },
    designation: {
      type: String,
    },
    internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "internship" }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
  },
  {
    timestamps: true,
  }
);

employeSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

employeSchema.methods.correctpassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

employeSchema.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("employe", employeSchema);
