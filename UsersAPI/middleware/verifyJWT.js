import  Jwt  from 'jsonwebtoken';
import 'dotenv/config';

function verifyJWT  (req, res, next) {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401);
    const token = authHeader.split(" ")[1];
    Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decodedToken)=>{
        if(err) return res.status(403);
        req.userEmail = decodedToken.userEmail
        next();
    })
}

export default verifyJWT;