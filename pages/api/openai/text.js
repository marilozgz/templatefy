import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  organization: "org-dcT0TyKkmCnrAm72idZ73X4j",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const { prompt, max_tokens, n, stop, temperature } = req.body;

    if (!prompt) {
      throw new Error('No prompt provided.');
    }

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens,
      n,
      stop,
      temperature,
    });

    res.status(200).json({ text: completion.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
}
