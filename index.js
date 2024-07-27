/* eslint-disable no-undef */
import express from 'express'
import connectDb from './db.js'
import ProductRoutes from './Routes/ProductRoutes.js'
import BrandRoutes from './Routes/BrandRoutes.js'
import CategoryRoutes from './Routes/CategoryRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import UserRoutes from './Routes/UserRoutes.js'
import CartRoutes from './Routes/CartRoutes.js'
import OrderRoutes from './Routes/OrderRoutes.js'
import session from 'express-session'
import { cookieExtractor, isAuth, sanitizeUser } from './middleware/isAuth.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy } from 'passport-jwt';
import UserSchema from './model/UserModel.js'

const app = express()
const port = 5000
connectDb()

app.use(express.json())
app.use(cors(
    {
        exposedHeaders: ['X-Total-Count']
    }
))

app.use(express.static('dist'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.authenticate('session'))

app.use(cookieParser())

app.use('/products', isAuth(), ProductRoutes)
app.use('/brands', isAuth(), BrandRoutes)
app.use('/categories', isAuth(), CategoryRoutes)
app.use('/users', UserRoutes)
app.use('/cart', isAuth(), CartRoutes)
app.use('/orders', isAuth(), OrderRoutes)


const SECRET_KEY = 'secret'
passport.use('local', new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
        try {
            const User = await UserSchema.findOne({ email });
            if (!User) {
                done(null, false, { error: 'User Not Exists' })
            }

            crypto.pbkdf2(password,
                User.salt,
                310000,
                32,
                'sha256',
                async function (err, hashedPassword) {
                    if (crypto.timingSafeEqual(User.password, hashedPassword)) {
                        const token = jwt.sign(sanitizeUser(User), SECRET_KEY)
                        done(null, { id: User.id, role: User.role, token })
                    } else {
                        done(null, false, { error: 'Invalid email or password' })
                    }
                })
        } catch (error) {
            done(error)
        }
    }
));

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: SECRET_KEY
}, async (jwt_payload, done) => {
    try {
        const user = await UserSchema.findById(jwt_payload.id);
        if (user) {
            return done(null, sanitizeUser(user));
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, { id: user.id, role: user.role });
    });
});



passport.deserializeUser(function (User, cb) {
    process.nextTick(function () {
        return cb(null, User);
    });
});



app.listen(port, () => {
    console.log('server started ' + port)
})
