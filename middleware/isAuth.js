import passport from "passport";



// eslint-disable-next-line no-unused-vars
export const isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

export const sanitizeUser = (user) => {
  return { id: user.id, email: user.email, role: user.role, addresses: user.addresses }
}