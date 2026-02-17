// ورود مهمان
document.getElementById("guestLogin").onclick = () => {
    const user = {
        type: "guest",
        name: "کاربر مهمان",
        id: "guest_" + Date.now(),
        login: new Date().toISOString()
    };
    localStorage.setItem("vira_session", JSON.stringify(user));
    window.location.href = "home.html";
};

// پردازش گوگل: اگر URL حاوی user باشد
const params = new URLSearchParams(window.location.search);
if(params.has('user')){
    const user = JSON.parse(decodeURIComponent(params.get('user')));
    localStorage.setItem("vira_session", JSON.stringify(user));
    window.history.replaceState({}, document.title, "home.html"); // پاک کردن query از URL
}

// گزینه جایگزین JS برای موبایل (در صورت block شدن لینک <a>)
document.getElementById("googleLogin").addEventListener("click", (e) => {
    e.preventDefault(); // جلوگیری از رفتار پیش‌فرض مرورگر
    window.location.assign("https://viratest2-nlnzxw.vercel.app/api/auth/google");
});


