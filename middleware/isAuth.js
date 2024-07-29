import passport from "passport";
import nodemailer from 'nodemailer'

// eslint-disable-next-line no-unused-vars
export const isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

export const sanitizeUser = (user) => {
  return { id: user.id, email: user.email, role: user.role, addresses: user.addresses }
}

export const cookieExtractor = function (req) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['jwt']
  }
  return token
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "nagarpurv@gmail.com",
    pass: "rktn bbat xaat gvtz",
  },
});

export const sendMail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: `East-Ecommerce 🛒 <nagarpurv@gmail.com>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
  return info
}

