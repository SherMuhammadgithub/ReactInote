const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sherisagood$boy'


const fetchuser = (req, res, next) => {


    // Get the uesr from the jwt token and id to req object
    const token = req.header("auth-token");


    if (!token) {


        res.status(401).send({ error: "Please authenticate using a valid token 🤗" })

        
    }


    try {


        const data = jwt.verify(token, JWT_SECRET);


        req.user = data.user;


        next();

    }
    
    catch (error) {



        res.status(401).send({ error: "Please authentikate using a valid token 🤗 " })

    }


}



module.exports = fetchuser;