const jwt = require('jsonwebtoken')

async function identifyUser(req,res,next){
  console.log("Cookies:", req.cookies);
     const token = req.cookies.token;
     console.log("Token:", token);
      if (!token) {
        return res.status(401).json({
          message: "token not provided, unauthorized access",
        });
      }
    
      
      let decoded = null;
      try{
       decoded = jwt.verify(token, process.env.JWT_SECRET);
      //agr koi fake token hua to error aaegi internal server error 500 but wo user ko smj thodi aegi so we give custom error
      }catch(error){
        return res.status(401).json({
            message:"user not authorized!"
        })
      }
      
      //jab request middleware identifyuser pe rhti hai tb ek new property ati {req.user} yahan user ki jagah kuch bhi name rkh lo
      req.user = decoded 
      //iss property ko aange forward krna hai to we use next function
      next()
}
module.exports = identifyUser