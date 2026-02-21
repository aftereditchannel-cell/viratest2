// ===== sarvar-upload-gemini.js فقط ارسال به API =====

const submitBtn = document.getElementById("submitBtn");

if(submitBtn){
  submitBtn.addEventListener("click", async () => {
    // گرفتن فایل و متن از DOM
    const fileInput = document.getElementById("fileInput");
    const textInput = document.getElementById("optionalText");
    const selectedFile = fileInput.files[0];

    if(!selectedFile){
      alert("لطفا اول یک عکس انتخاب کنید");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("text", textInput.value || "");

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
      // نمایش پاسخ AI در alert ساده
      alert("جواب AI:\n" + (data.result || JSON.stringify(data)));

    } catch(err){
      console.error(err);
      alert("خطا در ارسال یا دریافت پاسخ");
    }
  });
}
