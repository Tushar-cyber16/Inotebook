const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET="Tushar is a good b$oy";
// Route1:  creating a user using: Post '/api/auth/createuser' 
router.post('/createuser',[
    body('name','enter a valid name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
]
,async (req,res) => {
     
    try{
        let success=false;
    // if error return bad request and errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // to check if user already exists
    const email=req.body.email;
    const check = await User.findOne({email});
    if(check)
    {
       return res.status(401).send(success,"user already exists");
    }


// hashing 
const salt = await bcrypt.genSaltSync(10);
const secPass=await bcrypt.hash(req.body.password,salt);
req.body.password=secPass;

     
    //   creating a new user
    const user = await User.create(req.body);

    const data={
        user:{ 
            id: user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authToken});


    //   console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
}catch(error){
    console.error(error.message);
        res.status(500).send("internal server error");
}
})

//Route2: authenticate a user using: Post '/api/auth/login' 

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
]
,async (req,res) => {

     // if error return bad request and errors 
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const {email,password}= req.body;
     try {
         let success=false;
         let user=await User.findOne({email});
         if(!user) {
             return res.status(400).json({success,error: "Please try to login with correct credentials"});
         }
         const passwordCompare=await bcrypt.compare(password,user.password);
             if(!passwordCompare) {
                return res.status(400).json({success,error: "Please try to login with correct credentials"});
             }

             const data={
                user:{ 
                    id: user.id
                }
            }
            const authToken=jwt.sign(data,JWT_SECRET);
             success=true;
            res.json({success,authToken});
         
     } catch (error) {
         console.error(error.message);
         res.status(500).send("internal server error");
     }

})

//Route:3  get logged in user details using POST  "/api/auth/getuser" login required
router.post('/getuser',fetchuser,async (req,res) => {
    try {
        const userid=req.user.id;
        const user=await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

})
module.exports = router 