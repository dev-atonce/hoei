const secret = require("../configs/app").secret;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT  = passportJWT.ExtractJwt

const User = require("../models/User");

passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
    try {
        const findUser = User.findOne({ email: email });
        if (!findUser) return new Error("User not Found");
        if (findUser.password !== password) return new Error("Invalid Credentials");
        return done(null, findUser);
      } catch (error) {
        return done(err, null)
      }
    }
  )
);

passport.use(
  new JWTStrategy({ jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey   : secret }, (jwtPayload, done) => {
    try {
      const findUser = User.findOne({ email: email });
      if(jwtPayload.id == user.id) {
        return done(null, user);
      } else {
        return done(null, false);
      }
      } catch (error) {
        return done(error, false);
      }
    }
));