import { Configuration, OpenAIApi } from "openai";
import express from "express";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const app = express();
const API_URL = process.env.API_URL || "http://localhost";
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.listen(PORT, () => {
  console.info(`🚀  Server started on ${API_URL}:${PORT}`);
});

process.on("exit", () => {
  console.info("👋  Goodbye!");
});

app.post("/chat", async (req, res, next) => {
  try {
    const { message } = req.body;

    // Send message to OpenAI model
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a user" },
        { role: "user", content: message },
      ],
    });

    // Extract the model's reply from the response
    const reply = response.data.choices[0].message;

    // Send the reply back to the client
    res.json({ reply });
  } catch (e) {
    next(e);
  }
});
