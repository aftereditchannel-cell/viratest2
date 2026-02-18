// بررسی وضعیت ورود قبلی
const session = JSON.parse(localStorage.getItem("vira_session") || "{}");

// اگر کاربر قبلا فرم پر کرده → مستقیم به home
if (session.id && session.formFilled) {
    window.location.href = "home.html";
}

// لینک دکمه گوگل روی موبایل و دسکتاپ
const googleLoginBtn = document.getElementById("googleLogin");

// برای موبایل لینک مستقیم Render
if (/Mobi|Android/i.test(navigator.userAgent)) {
    googleLoginBtn.href = "https://viratest2.onrender.com/auth/google";
}

// ورود مهمان
document.getElementById("guestLogin").onclick = () => {
    const user = {
        type: "guest",
        name: "کاربر مهمان",
        id: "guest_" + Date.now(),
        login: new Date().toISOString(),
        formFilled: false
    };
    localStorage.setItem("vira_session", JSON.stringify(user));
    window.location.href = "form.tsx";
};

// ثبت نام با گوگل (شبیه‌سازی)
googleLoginBtn.onclick = (e) => {
    // اگر موبایل هست، لینک مستقیم Render رو باز کن
    if (/Mobi|Android/i.test(navigator.userAgent)) return;
    
    e.preventDefault();
    const user = {
        type: "google",
        name: "کاربر گوگل",
        id: "google_" + Date.now(),
        login: new Date().toISOString(),
        formFilled: false
    };
    localStorage.setItem("vira_session", JSON.stringify(user));
    window.location.href = "form.tsx";
};

