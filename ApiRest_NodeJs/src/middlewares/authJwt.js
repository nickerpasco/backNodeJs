
import jwt from "jsonwebtoken";


export const verifyTokenv2 = async (req, res, next) => {
    let token = req.headers["authorization"];

     console.log(token)
  
    if (!token) return res.status(403).json({ message: "No token provided" });
  
    try {
      const decoded = jwt.verify(token, "secretykey");
     
    // console.log(decoded.id)
  
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
  };


  export const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];

     console.log(token)
  
    if (!token) return res.status(403).json({ message: "No token provided" });
  


       // Verificar el formato del token
  const [bearer, tokenValue] = token.split(" ");
  if (bearer !== "Bearer" || !tokenValue) {
    return res.status(403).json({ message: "Invalid token format" });
  }

    try {
      
    const bearerToken = token.split (" ") [1];
    const decoded = jwt.verify(bearerToken, "secretykey");
  
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
  };

  
export const verifyTokencap = async (req, res, next) => {
  const bearerHeader = req.headers ['authorization '];

  if (typeof bearerHeader !== 'undefined' ){
    const bearerToken = bearerHeader.split (" ") [1];
    reg.token = bearerToken;
    next() ;
    
  }else{
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

 