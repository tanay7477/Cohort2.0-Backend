
//* iss code ko ek middle ware bnaenge 
// middleware m ek extra term 'next' hoti hai

async function identifyUser(req,res,next){
    const token = req.cookies.token;

  if(!token){ //agr token expired ho gya yaah user register hi nhi hai
    return res.status(401).json({
      message: ' token not provided, unauthorized access'
    })
  }
  //agr token glt hai to code server ko show krna chahie 401 but 500 show kr rha
  //!if se nhi krte yeh use try catch
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    // here you get error decoded is not defined  becoz of scope so we declare outside
  } catch (err) {
    // agr tooken glt hua to yeh chlega catch usse handle krega
    return res.status(401).json({
      message: "token not provided , unauthorized access",
    });
  }
  req.user = decoded; //decoded m user ki id aa rhi h
  //issi req ko next ke through controller m bhejenge

  //controller ke pass ab req ka access hoga jisme user ki id aa rhi h
  // to controller ke user main req.user.id de denge

  next()
}

module.exports =  identifyUser


