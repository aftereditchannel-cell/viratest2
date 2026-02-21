// ===== sarvar-upload-gemini.js =====

// ===== انتخاب صفحات و منوی پایین =====
const pages = document.querySelectorAll(".page");
const buttons = document.querySelectorAll(".bottom-nav button");
const indicator = document.querySelector(".nav-indicator");

function switchPage(pageId, btn) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const rect = btn.getBoundingClientRect();
  const parentRect = btn.parentElement.getBoundingClientRect();
  indicator.style.left = (rect.left - parentRect.left + rect.width/2 - 12) + "px";
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    switchPage(btn.dataset.page, btn);
  });
});

window.addEventListener("load", () => {
  const activeBtn = document.querySelector(".bottom-nav button.active") || buttons[0];
  switchPage(activeBtn.dataset.page, activeBtn);
});

// ===== ذخیره استایل‌ها =====
document.querySelectorAll(".save-btn").forEach(btn => {
  const id = btn.dataset.id;
  if(localStorage.getItem("saved-"+id) === "true") {
    btn.classList.add("saved");
    btn.textContent = "✓ ذخیره شد";
  }

  btn.addEventListener("click", () => {
    btn.classList.toggle("saved");
    if(btn.classList.contains("saved")) {
      btn.textContent = "✓ ذخیره شد";
      localStorage.setItem("saved-"+id, "true");
    } else {
      btn.textContent = "⭐ ذخیره";
      localStorage.removeItem("saved-"+id);
    }
  });
});

// ===== آپلود تصویر =====
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
let selectedFile = null;

if(uploadBox){
  uploadBox.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if(file) showSelectedFile(file);
  });

  uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("dragover");
  });

  uploadBox.addEventListener("dragleave", () => uploadBox.classList.remove("dragover"));

  uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if(file) showSelectedFile(file);
  });
}

function showSelectedFile(file){
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    uploadBox.innerHTML = `<img src="${e.target.result}">`;
  };
  reader.readAsDataURL(file);
}

// ===== ارسال به Gemini API =====
const submitBtn = document.getElementById("submitBtn");
if(submitBtn){
  submitBtn.addEventListener("click", async () => {
    if(!selectedFile){
      alert("اول عکس انتخاب کن");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("text", document.getElementById("optionalText").value);

    try {
      const response = await fetch("https://gemini.googleapis.com/v1/models/gemini:generateMessage", {
        method: "POST",
        headers: {
          "Authorization": "Bearer AIzaSyDzJEG1ucF4umvMyxn0Xqe6JbQO1SiACNE"
        },
        body: formData
      });

      if(!response.ok) throw new Error("خطا در ارسال به سرور");

      const data = await response.json();
      alert("جواب AI:\n" + (data.result || JSON.stringify(data)));

    } catch(err){
      console.error(err);
      alert("خطا در ارسال یا دریافت پاسخ");
    }
  });
}

// ===== خروج از حساب =====
const logoutBtn = document.querySelector(".logout");
if(logoutBtn){
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("vira_session");
    localStorage.removeItem("vira_form_done");
    localStorage.removeItem("onboardingData");

    Object.keys(localStorage).forEach(key => {
      if(key.startsWith("saved-")) localStorage.removeItem(key);
    });

    window.location.href = "index.html";
  });
}
