import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
// bcrypt package is used to enceipt the password
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
   const {email, password} = req.body;
   try {
    const user = await UserModel.findOne({email});

    if (!user) {
        return res.json({success: false, message: "User does not exist"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({success: false, message: "Invalid Credentials"})
    }

    const token = createToken(user._id);
    res.json({success: true, token})
   } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"})
   }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    // chacking is user alredy exists
    const {name, password, email} = req.body;
    try {
        const exists = await UserModel.findOne({email});
        if (exists) {
            return res.json({success: false, message: "User alredy exists!"});
        }

        // validating email format & password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please Enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success: false, message: "please enter a strong password"})
        }

        // hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt);


        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedpassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

export {loginUser, registerUser}
