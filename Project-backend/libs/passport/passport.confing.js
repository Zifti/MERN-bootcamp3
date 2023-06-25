const passport = require('passport')
const User = require('../../models/user.model')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_TOKEN_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({ id: jwt_payload.sub })
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    })
    .catch(err => {
      return done(err, false);
    });
}));

  
