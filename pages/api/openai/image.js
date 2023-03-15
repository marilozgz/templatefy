import { DallEApi } from 'openai';

const dallEApi = new DallEApi({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      throw new Error('No prompt provided.');
    }

    const { data: { url } } = await dallEApi.createImage({
      model: 'image-alpha-001',
      prompt,
    });

    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
}
