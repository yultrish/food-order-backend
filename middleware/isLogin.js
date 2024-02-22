// import generateToken from "../utils/generateToken";
import getToken from "../utils/getToken.js";
import verifyToken from "../utils/verifyToken.js";

const isLoggedIn = (req, res, next) => {
  //get token from the header
  const token = getToken(req);
  // verify the token
  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new Error("invalid token/token expired. pls loggin again");
  } else {
    req.UserAuthId = decodedUser?.id;
    next();
  }
};

export default isLoggedIn;
