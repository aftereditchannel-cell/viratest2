const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// ---------------------
// تنظیمات OAuth گوگل
// ---------------------
passport.use(new GoogleStrategy({
    clientID: '262062257189-0i4cdos5t0249h5ig4p00c6rfmk5g78u', // Client ID شما
    clientSecret: 'YOUR_CLIENT_SECRET',                        // Client Secret شما
    callbackURL: 'http://localhost:3000/auth/google/callback'  // مسیر Redirect
},
(accessToken, refreshToken, profile, done) => {
    // profile اطلاعات کاربر گوگل
    console.log(profile); // برای تست
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

// ---------------------
// مسیرهای OAuth گوگل
// ---------------------

// شروع ورود با گوگل
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// مسیر callback گوگل
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // اطلاعات کاربر گوگل را در session یا localStorage منتقل کنید
        // برای نمونه، می‌توانیم به home.html منتقل کنیم
        res.redirect('/home.html'); 
    }
);

// مسیر برای تست ورود کاربر
app.get('/home.html', (req, res) => {
    if (!req.user) return res.send('لطفاً ابتدا وارد شوید.');
    res.send(`<h1>خوش آمدید ${req.user.displayName}</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`);
});

// فایل‌های استاتیک
app.use(express.static(__dirname));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
