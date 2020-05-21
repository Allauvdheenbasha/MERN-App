const jwt = require("jsonwebtoken");
const secret = require("config").get("jwtSecret");

module.exports = (req,res,next) => {
    // Get Auth token from req header
    const Authtoken=req.header('x-auth-token');

    // check token is empty
    if (!Authtoken) {
        return res.status(401).json({msg: 'No token - Authorization dened'});
    }

    // verify token
    try {
        jwt.verify(token,secret,(err,decoded)=>{
            if(err)
            return res.status(401).send({msg:'provided token is not valid'});
            else
            {
                req.user=decoded;
                next();
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(401).send({errors:error});
    }
};
