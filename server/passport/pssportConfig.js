
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');


const {User} = require ("../models/User")


passport.use(
  "login",
  new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true
  }, async (req, email, password, done)=> {

      try {
       
        const user = await User.findOne({ email: email });
        if(!user) { 
          return done(null, false, { message: 'Incorrect email.' });
        } else {
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch){
            return done(null, false, { message: 'Incorrect password.' }); 
           }
            done(null, user);
           
        }
        
      } catch (error) {
       
        return done(error, false);
      }
    }
  )
);

passport.use('signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const username = req.body.username;
    const user = await User.create({ username, email, password });
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));
 
  
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

  