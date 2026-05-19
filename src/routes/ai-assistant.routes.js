import express from 'express';
// import { GoogleGenerativeAI } from '@google/generative-ai';

 const router = express.Router();

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyAyOC-TfV5bciW7vLSWaB_z6GkXHZ6CGjk";
// const genAI = new GoogleGenerativeAI(apiKey);


// router.post('/chat', async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is missing" });
//     }

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const responseText = await result.response.text();

    
//     return res.json({ reply: responseText });

//   } catch (error) {
//     console.error("Gemini Error:", error);
//     return res.status(500).json({ error: "API internal processing error" });
//   }
// });

export default router;