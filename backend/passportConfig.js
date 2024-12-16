const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('./models/userModel');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userModel.findByEmail(profile.emails[0].value);
                if (!user) {
                    user = await userModel.createUser(profile.emails[0].value, null);
                }
                console.log("Authenticated User:", user);
                done(null, user);
            } catch (error) {
                console.log("Error in Google Strategy:", error);
                done(error, null);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/api/auth/facebook/callback',
            profileFields: ['id', 'emails', 'name'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`;
                let user = await userModel.findByEmail(email);
                if (!user) {
                    user = await userModel.createUser(email, null);
                }
                console.log("Authenticated User:", user); // debug
                done(null, user);
            } catch (error) {
                console.log("Error in Facebook Strategy:", error); //debug
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null)
    }
});

module.exports = passport;