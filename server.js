require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(session({
    secret: 'vira_secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// مسیر اصلی
app.get('/', (req, res) => {
    res.send('<h2>در حال هدایت به سایت...</h2>');
});

// ورود با گوگل
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// callback گوگل
app.get('/https://viratest2-nlnzxw.fly.dev/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // اطلاعات ضروری کاربر
        const userData = {
            id: req.user.id,
            displayName: req.user.displayName,
            email: req.user.emails[0].value,
            photo: req.user.photos[0].value
        };

        // redirect به GitHub Pages
        const githubHome = 'https://aftereditchannel-cell.github.io/viratest2/home.html';
        res.redirect(`${githubHome}?user=${encodeURIComponent(JSON.stringify(userData))}`);
    }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});

