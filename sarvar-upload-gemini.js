// ===== sarvar-upload-gemini.js =====

// المنت‌ها
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
const submitBtn = document.getElementById("submitBtn");
const optionalText = document.getElementById("optionalText");

let selectedFile = null;

// ===== انتخاب و پیش‌نمایش عکس =====
if (uploadBox) {
  uploadBox.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => {
        uploadBox.innerHTML = `<img src="${e.target.result}">`;
      };
      reader.readAsDataURL(file);
    }
  });

  uploadBox.addEventListener("dragover", e => {
    e.preventDefault();
    uploadBox.classList.add("dragover");
  });

  uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("dragover");
  });

  uploadBox.addEventListener("drop", e => {
    e.preventDefault();
    uploadBox.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => {
        uploadBox.innerHTML = `<img src="${e.target.result}">`;
      };
      reader.readAsDataURL(file);
    }
  });
}

// ===== ارسال عکس به PHP و API Gemini =====
if (submitBtn) {
  submitBtn.addEventListener("click", async () => {
    if (!selectedFile) {
      alert("لطفا اول یک عکس انتخاب کنید");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("text", optionalText.value || "");

    try {
      // ===== ارسال به PHP =====
      const phpResponse = await fetch("upload.php", {
        method: "POST",
        body: formData
      });
      const phpData = await phpResponse.json();
      if (!phpResponse.ok) throw new Error(phpData.message || "خطا در آپلود به سرور");

      // ===== ارسال به API Gemini =====
      const apiForm = new FormData();
      apiForm.append("image", selectedFile);
      apiForm.append("text", optionalText.value || "");

      const geminiResponse = await fetch("https://gemini.googleapis.com/v1/models/gemini:generateMessage", {
        method: "POST",
        headers: { "Authorization": "Bearer AIzaSyDzJEG1ucF4umvMyxn0Xqe6JbQO1SiACNE" },
        body: apiForm
      });

      if (!geminiResponse.ok) throw new Error("خطا در ارسال به API Gemini");
      const geminiData = await geminiResponse.json();

      // نمایش پاسخ AI
      alert("جواب AI:\n" + (geminiData.result || JSON.stringify(geminiData)));

    } catch (err) {
      console.error(err);
      alert("خطا در ارسال یا دریافت پاسخ");
    }
  });
}
