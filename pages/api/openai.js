import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("API key:", process.env.OPENAI_API_KEY); // Agrega esta línea

const openai = new OpenAIApi(configuration);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.body.prompt !== undefined) {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${req.body.prompt}`,
      max_tokens: req.body.max_tokens,  
      n: req.body.n,
      stop: req.body.stop,
      temperature: req.body.temperature  });
    
    res.status(200).json({ text: `${completion.data.choices[0].text}` });
  } else {
    res.status(400).json({ text: "No prompt provided." });
  }
};