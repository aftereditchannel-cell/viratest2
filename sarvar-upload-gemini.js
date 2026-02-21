// ===== sarvar-upload-gemini.js =====
const submitBtn = document.getElementById("submitBtn");
const fileInput = document.getElementById("fileInput");
const textInput = document.getElementById("optionalText");
const uploadBox = document.getElementById("uploadBox");

// نمایش پیش‌نمایش عکس وقتی انتخاب شد
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    let img = uploadBox.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      uploadBox.innerHTML = "";
      uploadBox.appendChild(img);
    }
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// باز کردن گالری وقتی روی باکس کلیک شد
uploadBox.addEventListener("click", () => {
  fileInput.click();
});

// درگ و دراپ عکس
uploadBox.addEventListener("dragover", e => {
  e.preventDefault();
  uploadBox.classList.add("dragover");
});
uploadBox.addEventListener("dragleave", e => {
  e.preventDefault();
  uploadBox.classList.remove("dragover");
});
uploadBox.addEventListener("drop", e => {
  e.preventDefault();
  uploadBox.classList.remove("dragover");
  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));
  }
});

// ارسال به upload.php
submitBtn.addEventListener("click", async () => {
  const selectedFile = fileInput.files[0];
  if (!selectedFile) {
    alert("لطفا اول یک عکس انتخاب کنید");
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("text", textInput.value || "");

  try {
    const response = await fetch("upload.php", {
      method: "POST",
      body: formData
    });

    if (!response.ok) throw new Error("خطا در ارسال به سرور");

    const data = await response.json();
    if(data.error){
      alert("خطا: " + data.error);
    } else {
      alert("جواب AI:\n" + (data.result || JSON.stringify(data)));
    }
  } catch (err) {
    console.error(err);
    alert("خطا در ارسال یا دریافت پاسخ");
  }
});
