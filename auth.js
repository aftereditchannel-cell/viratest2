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

// ثبت نام با گوگل (شبیه سازی)
document.getElementById("googleLogin").onclick = () => {

    const user = {
        type: "google",
        name: "کاربر گوگل",
        id: "google_" + Date.now(),
        login: new Date().toISOString()
    };

    localStorage.setItem("vira_session", JSON.stringify(user));

    window.location.href = "home.html";
};
