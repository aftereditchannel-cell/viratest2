require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// تنظیم Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// تنظیم Session
app.use(session({
    secret: 'vira_secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// مسیر اصلی (optional) برای نمایش پیام
app.get('/', (req, res) => {
    res.send('<h2>در حال هدایت به سایت...</h2>');
});

// مسیر ورود با گوگل
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// مسیر callback بعد از ورود گوگل
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // redirect به GitHub Pages بعد از ورود موفق
        const githubHome = 'https://aftereditchannel-cell.github.io/home.html';
        res.redirect(`${githubHome}?user=${encodeURIComponent(JSON.stringify(req.user))}`);
    }
);

// سرور گوش می‌دهد
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
