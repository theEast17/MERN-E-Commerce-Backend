import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserSchema from '../model/UserModel';
import { sanitizeUser } from './isAuth';



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
                        done(null, token)
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
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
    // eslint-disable-next-line no-undef
    process.nextTick(function () {
        return cb(null,{ id: user.id, role: user.role });
    });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (User, cb) {
    // eslint-disable-next-line no-undef
    process.nextTick(function () {
        return cb(null, User);
    });
});


export default passport;
