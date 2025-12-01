import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Resume from '../models/Resume.js';

const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token
}
//User Registration
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message: "Missing required fields"})
        }
        // check is user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message: "User already exists"})
        }
        
        // create new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        //return success response
        const token = generateToken(newUser._id)
        newUser.password = undefined //hide password

        return res.status(201).json({message: "User registered successfully", token, user: newUser})

    } catch (error) {
        return res.status(400).json({message: "Error registering user", error: error.message})
    }
}

//User Login
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        
        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        }

        // compare password
        if(!user.comparePassword(password)){
            return res.status(400).json({message: "Invalid email or password"})
        }

        // generate token
        const token = generateToken(user._id)
        user.password = undefined //hide password

        return res.status(200).json({message: "User logged in successfully", token, user})
    } catch (error) {
        return res.status(400).json({message: "Error logging in user", error: error.message})
    }
}

//Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        //return user
        user.password = undefined
        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({message: "Error fetching user profile", error: error.message})
    }
}

// getting user resume list
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId

        // return user resumes
        const resumes = await Resume.find({userId})
        return res.status(200).json({resumes})
    } catch (error) {
        return res.status(400).json({message: "Error fetching user resumes", error: error.message})
    }
}