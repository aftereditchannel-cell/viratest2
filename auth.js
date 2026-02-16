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
