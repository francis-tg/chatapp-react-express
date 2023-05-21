
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
// Load user model
//require("../models/User");
//const User = mongoose.model("users");
const User = require("../models/User");

function jwtAuth(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.secretOrKey || "Su44mWCEQYfhNuQ6";
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({email: jwt_payload.email}).then((user, err) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
}

module.exports = {
  jwtAuth
};
