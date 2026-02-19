// کلید بررسی تکمیل فرم
const DONE_KEY = "vira_form_done";

// بررسی وضعیت ورود قبلی
const session = JSON.parse(localStorage.getItem("vira_session") || "{}");

// اگر کاربر قبلا فرم پر کرده → مستقیم به home
if (session.id && localStorage.getItem(DONE_KEY)) {
    window.location.href = "home.html";
}

// لینک دکمه گوگل
const googleLoginBtn = document.getElementById("googleLogin");

// برای موبایل لینک مستقیم Render
if (/Mobi|Android/i.test(navigator.userAgent)) {
    googleLoginBtn.href = "https://viratest2.onrender.com/auth/google";
}

// تابع هدایت هوشمند
function handleLogin(type) {

    const user = {
        type: type,
        name: type === "guest" ? "کاربر مهمان" : "کاربر گوگل",
        id: type + "_" + Date.now(),
        login: new Date().toISOString()
    };

    localStorage.setItem("vira_session", JSON.stringify(user));

    // فقط چک کن فرم پر شده یا نه
    if (!localStorage.getItem(DONE_KEY)) {
        window.location.href = "form.html";
    } else {
        window.location.href = "home.html";
    }
}

// ورود مهمان
document.getElementById("guestLogin").onclick = () => {
    handleLogin("guest");
};

// ورود گوگل (شبیه‌سازی دسکتاپ)
googleLoginBtn.onclick = (e) => {
    if (/Mobi|Android/i.test(navigator.userAgent)) return;
    e.preventDefault();
    handleLogin("google");
};
