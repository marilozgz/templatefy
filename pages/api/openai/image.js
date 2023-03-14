import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const { prompt, size } = req.body;

    if (!prompt) {
      throw new Error('No prompt provided.');
    }

    if (!size) {
      throw new Error('No size provided.');
    }

    const completion = await openai.createCompletion({
      model: 'image-alpha-001',
      prompt,
      num_images: 1,
      size,
      response_format: 'url',
    });

    res.status(200).json({ image_url: completion.data.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
}
