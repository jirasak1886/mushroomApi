const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Corrected from Product to User
require('dotenv').config();


// Register
exports.register = async (req, res) => {
    const { Lname, name,password,tel,role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ Lname, password: hashedPassword,name,tel,role });
        await user.save();
        res.status(201).send("User registered");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Login
exports.login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const tmpuser = await User.findOne({ name });
        if (!tmpuser) return res.status(400).send("User not found");
        const isMatch = await bcrypt.compare(password, tmpuser.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");
        const role = await(tmpuser.role);
        if (!role) return res.status(400).send("Role not found");

        const accessToken = jwt.sign(
            { userId: tmpuser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" } // ปรับให้มันยาว *ใช้เฉพาะตอนเรียน
        );

        const refreshToken = jwt.sign(
            { userId: tmpuser._id },
            process.env.REFRESH_TOKEN_SECRET
        );

        res.json({ user: tmpuser, accessToken, refreshToken ,role});
    } catch (err) {
        res.status(500).send(err.message);
    }
};
// Refresh
exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { userId: user.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.json({ accessToken });
    });
};