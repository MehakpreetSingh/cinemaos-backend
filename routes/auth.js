const express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator')
const User = require('../Models/user')
const bcrypt = require('bcryptjs');
const JWT_SECRET = "movieworldmakesmerunfromtheworld";
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

//create a new user
router.post(
    "/signup",
    //This is addded as a validation check for every variable .
    [
        body("name", "Enter a Valid Name").isLength({ min: 3 }),
        body("email", "Enter a Valid Email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    ],
    //This is what should happen if we give this endpoint in our routes in express
    async (req, res) => {
        let success = false;
        //If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        //Check whether the user with same email already exists
        try {
            let user = await User.findOne({ email: req.body.email }); // Checking the input of the body 
            if (user) {
                return res
                    .status(400)
                    .json({ success, error: "Sorry the user with this email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            //Create a new user
            user = await User.create({ // await for creating the data entry via the mongo model
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken: authtoken });

        } catch (error) { // If there is any error .
            console.error(error.message);
            res.status(00).send("Some error occured");
        }
    }
);

//ROUTE 2 : Authenticate a User Using Post "/api/auth/login". No login required
router.post('/login', [
    body('email', "Enter a Valid email").isEmail(),
    body("password", "Password cannot be Blank").exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ success, message: 'Please Enter the correct login credentials' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).send({ success, message: 'Please Enter the correct Password' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken: authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }

})

//ROUTE 3 : Get logged in user details using POST "api/auth/getuser" , Login Required
router.post("/getuser", fetchuser, async (req, res) => {
    //If there are errors return bad request and the errors
    //  const errors = validationResult(req);
    //  if (!errors.isEmpty()) {
    //    return res.status(400).json({ errors: errors.array() });
    //  }
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(400).send("Internal Server error occured");
    }
})

router.get("/getuserbyId/:id" , async(req,res)=> {
    const id = req.params.id ;
    try {
        let user = await User.findById(id) ;
        res.status(200).send(user) ;
    } catch (error) {
        res.status(400).send("Internal Server error occured");
    }
})

//ROUTE 4: Change User info 

router.put("/updateuserdata" , fetchuser , async(req,res) => {
    const id = req.user.id ;
    const {name , email , password , profileImage} = req.body ;
    const updatedData = {} ;
    if(name) {updatedData.name=name}
    if(email) {updatedData.email=email}
    if(password) {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)
        updatedData.password=secPass ; 
    }
    if(profileImage) {updatedData.profileImage=profileImage}
    try {
        let user = await User.findById(id) ;
        if(user) {
            if(user._id.toString() !== id) {
                res.status(401).send("Not Allowed")
            }
            user = await User.findByIdAndUpdate(id , {$set:updatedData} , {new:true})
            res.status(200).json(user) ;
        }else {
            res.status(401).send("The User with id not found") ;
        }
    } catch (error) {
        res.status(409).send({message : error.message}) ;
    }
})

module.exports = router;