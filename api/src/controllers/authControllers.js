const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModels");

const jwtToken = process.env.JWT_SECRET;

const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User Registered Successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const login = async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            jwtToken,
            { expiresIn: "1h" }
        )
        // set cookie
        res.status(200).cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24,
        }).json({
            id: user._id,
            username
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const logout = async (req, res) => {
    return res.status(200)
        .clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }).json({ message: "User logged out" });
}

// Token Validation
const validateToken = async (req, res) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(400).json({ message: "No Token Provided" });

    try {
        const decoded = jwt.verify(token, jwtToken);
        return res.status(200).json({ valid: true, user: decoded });
    } catch (e) {
        return res.status(401).json({ valid: false, message: "Invalid token" });
    }
}

module.exports = { register, login, logout, validateToken };