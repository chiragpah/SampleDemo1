const User = require("../models/userModel");
// const cookie = require('')
const { setUser } = require("../service/auth")
const insertUser = async (req, res) => {
    console.log(req.body);
    try {

        const { name, email, mobile, password } = req.body; // Destructure the request body
        const user = new User({
            name,
            email,
            mobile,
            password
        });
        // console.log(req.body);
        const result = await user.save();
        // res.status(200).json({ message: "Registration successful", data: result });
        // res.send("Success")

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const checkUser = async (req, res) => {
    // console.log(req.body);
    try {

        const { email, password } = req.body;
        console.log(req.body); // Destructure the request body
        const user = await User.findOne({ email, password })
        // console.log(req.body);
        if (!user)
            return res.json({ "status": "Failed" })
        else {
            console.log(user._id);
            const token = setUser(user)

            // res.cookie("uid", token)
            return res.json({ "token": token })
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    insertUser, checkUser
};
