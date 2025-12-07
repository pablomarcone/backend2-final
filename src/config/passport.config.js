import config from './config.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import localStrategy from 'passport-local';
import jwtStrategy from 'passport-jwt';
import { userRepository } from '../service/factory.js';

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies && req.cookies[config.jwt_cookie_name]) {
        token = req.cookies[config.jwt_cookie_name];
    }
    return token;
};

export const initPassport = () => {

    passport.use('register', new localStrategy.Strategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const { first_name, last_name, age } = req.body;
            if (!first_name || !last_name || !email || !password) {
                return done(null, false);
            }
            let exists = await userRepository.getUserByEmail(email);
            if (exists) {
                return done(null, false);
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userRepository.createUser({ first_name, last_name, email, age, password: hashedPassword });
            return done(null, user.toJSON());
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('login', new localStrategy.Strategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            const user = await userRepository.getUserByEmail(email);
            if (!user) {
                return done(null, false);
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return done(null, false);
            }
            delete user.password;
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('current', new jwtStrategy.Strategy(
        {
            jwtFromRequest: jwtStrategy.ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: config.jwt_secret
        }, async (payload, done) => {
            try {
                return done(null, payload);
            } catch (error) {
                return done(error);
            }
        }));
}
export default initPassport;