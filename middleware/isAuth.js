import passport from "passport";



// eslint-disable-next-line no-unused-vars
export const isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

export const sanitizeUser = (user) => {
  return { id: user.id, email: user.email, role: user.role, addresses: user.addresses }
}

export const cookieExtractor=function(req){
  let token=null
  if(req && req.cookies){
    token=req.cookies['jwt']
  }
  return token
}