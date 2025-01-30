const express = require('express');

const passport = require("passport");

const {User} = require ("../models/User")



const index = (req,res) => {
    res.send('hi from index controller');

};
const getallUsers = async (req,res) => {
    try {
        const allUser = await User.find();
        res.status(200).json(allUser);
    } catch (error) {
     res.status(400).json({ message: error.message });
    }

};






const logOut = (req,res) => {
    res.send('hi from logout controller')

};

module.exports = {
   
    getallUsers,
   
    logOut,
    index

}