const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.authenticate = (req, res, next) => {

    try{
        console.log('token:')
        const token = req.body.token || req.header("Authorization").replace("Bearer ", "");
        console.log(token);


        if(!token){
            return res.status(401).json({
                success: false,
                message: "token missing",
            })
        }


        try{
            const decode = jwt.verify(token,process.env.JWT_SECREAT);
            console.log(decode);

            req.user = decode;   

        }catch(error){
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            });
        }

        next();

    }catch(error){
        console.log(error)
        return res.status(401).json({
            success:false,
            message: "something went wrong, while verifying the token",
        })
    }
}


exports.isAttendee = (req, res, next) => {
    try{
        if(req.user.role !== "attendee"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for attendee",
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message: "user role is not matching",
        })
    }
}


