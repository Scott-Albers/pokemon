import passport from 'passport';
import User from '../models/user';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy({
  usernameField: 'email',
},
  (email, password, done) => {
    User.findOne({ email }).populate('pokemon').exec((err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }));

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, (jwt, done) => {
  User.findByID(jwt.sub).populate('pokemon').exec((err, user) => {
    if (err) {
      return done(err, false);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
     // or you could create a new account
  });
}));
