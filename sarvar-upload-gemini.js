import express from "express";
import multer from "multer";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

const genAI = new GoogleGenerativeAI("AIzaSyDzJEG1ucF4umvMyxn0Xqe6JbQO1SiACNE");

app.post("/api/stylist", upload.single("image"), async (req, res) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

    const prompt = `
تو یک AI استایلیست حرفه‌ای هستی.
بر اساس تصویر کاربر و توضیح او پیشنهاد استایل بده.
پیشنهادت دقیق، کاربردی و مرحله‌به‌مرحله باشد.
لحن دوستانه باشد.
متن کاربر:
${req.body.text}
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64Image,
        },
      },
    ]);

    fs.unlinkSync(req.file.path);

    res.json({
      reply: result.response.text()
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "خطا در پردازش درخواست"
    });
  }
});

app.listen(3000, () => {
  console.log("Gemini Upload Server running on port 3000");
});
