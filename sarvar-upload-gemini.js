// فایل sarvar-upload-gemini.js

const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
const submitBtn = document.getElementById("submitBtn");
const optionalText = document.getElementById("optionalText");
let selectedFile = null;

// ===== مدیریت آپلود تصویر =====
if (uploadBox && fileInput) {
  uploadBox.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => uploadBox.innerHTML = `<img src="${e.target.result}">`;
      reader.readAsDataURL(file);
    }
  });

  uploadBox.addEventListener("dragover", e => {
    e.preventDefault();
    uploadBox.classList.add("dragover");
  });

  uploadBox.addEventListener("dragleave", () => uploadBox.classList.remove("dragover"));

  uploadBox.addEventListener("drop", e => {
    e.preventDefault();
    uploadBox.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => uploadBox.innerHTML = `<img src="${e.target.result}">`;
      reader.readAsDataURL(file);
    }
  });
}

// ===== ارسال به Gemini API =====
if (submitBtn) {
  submitBtn.addEventListener("click", async () => {
    if (!selectedFile) {
      alert("اول عکس انتخاب کن");
      return;
    }

    const reader = new FileReader();
    reader.onload = async e => {
      const base64Image = e.target.result.split(",")[1];
      alert("در حال پردازش... ⏳");

      try {
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer AIzaSyDzJEG1ucF4umvMyxn0Xqe6JbQO1SiACNE"
          },
          body: JSON.stringify({
            prompt: {
              messages: [
                {
                  author: "user",
                  content: [
                    { type: "text", text: `تو یک AI استایلیست حرفه‌ای هستی. متن کاربر: ${optionalText.value}` },
                    { type: "image", image: { imageBytes: base64Image, mimeType: selectedFile.type } }
                  ]
                }
              ]
            }
          })
        });

        const data = await res.json();
        const answer = data.candidates?.[0]?.content?.map(c => c.type === "text" ? c.text : "").join("\n") || "پاسخ خالی";
        alert("جواب AI:\n" + answer);

      } catch (err) {
        console.error(err);
        alert("خطا در دریافت پاسخ AI ❌");
      }
    };

    reader.readAsDataURL(selectedFile);
  });
}
