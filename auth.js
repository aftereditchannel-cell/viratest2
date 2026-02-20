// کلید بررسی تکمیل فرم
const DONE_KEY = "vira_form_done";

// بررسی وضعیت ورود قبلی
const session = JSON.parse(localStorage.getItem("vira_session") || "{}");

// اگر سشن فعال هست
if (session.id) {
    // اگر فرم پر شده → مستقیم به home
    if (localStorage.getItem(DONE_KEY) === "true") {
        window.location.href = "home.html";
    } 
    // اگر فرم پر نشده → بره form
    else {
