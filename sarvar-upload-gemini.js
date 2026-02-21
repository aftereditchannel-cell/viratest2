// ===== sarvar-upload-gemini.js نهایی =====

const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
const textInput = document.getElementById("optionalText");
const submitBtn = document.getElementById("submitBtn");
let selectedFile = null;

// ===== انتخاب عکس و پیش‌نمایش =====
if (uploadBox && fileInput) {
  uploadBox.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.objectFit = "contain"; // جلوگیری از زوم شدن
      img.style.width = "100%";
      img.style.height = "100%";
      uploadBox.innerHTML = "";
      uploadBox.appendChild(img);
    };
    reader.readAsDataURL(file);
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
    if (!file) return;
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.objectFit = "contain";
      img.style.width = "100%";
      img.style.height = "100%";
      uploadBox.innerHTML = "";
      uploadBox.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

// ===== ارسال به API =====
if (submitBtn) {
  submitBtn.addEventListener("click", async () => {
    if (!selectedFile) {
      alert("لطفا اول یک عکس انتخاب کنید");
      return;
    }

    try {
      // تبدیل عکس به Base64
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]); // فقط دیتا
        reader.onerror = () => reject("خطا در خواندن تصویر");
        reader.readAsDataURL(selectedFile);
      });

      // ساخت body JSON مطابق API
      const body = {
        model: "gemini",
        messages: [
          {
            role: "user",
            content: [
              { type: "image", image: { mimeType: selectedFile.type, data: base64Image } },
              { type: "text", text: textInput.value || "" }
            ]
          }
        ]
      };

      const response = await fetch("https://gemini.googleapis.com/v1/models/gemini:generateMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer AIzaSyDzJEG1ucF4umvMyxn0Xqe6JbQO1SiACNE"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error("خطا در ارسال به سرور");

      const data = await response.json();

      // نمایش جواب AI
      let message = data?.responses?.[0]?.content?.find(c => c.type === "text")?.text || JSON.stringify(data);
      alert("جواب AI:\n" + message);

    } catch (err) {
      console.error(err);
      alert("خطا در ارسال یا دریافت پاسخ");
    }
  });
}
