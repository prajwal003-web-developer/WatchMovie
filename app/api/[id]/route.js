import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET(req, context) {
  try {
    const params = await context.params;
    const imdbId = params.id;
    

    if (!imdbId) {
      return new Response(
        JSON.stringify({ error: 'IMDb ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get query parameter for type (movie or tv)
    const urlObj = new URL(req.url);
    let type = urlObj.searchParams.get('q') || 'movie'; // default to movie

    let url = `https://vidsrc.xyz/embed/${type}/${imdbId}`;


    if (type != 'movie') {
      let episode = type.split("_")[1]
      url = `https://vidsrc.xyz/embed/tv/${imdbId}/${episode}`;
    }

    console.log(url)

    // Construct the URL based on type
    // vidsrc.xyz has /movie/ and /tv/ endpoints


    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        'Accept':
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://google.com/',
        'Connection': 'keep-alive',
      },
    });

    const $ = cheerio.load(data);

    // Extract iframe URL
    const iframeUrl = $('iframe').attr('src');

    if (!iframeUrl) {
      return new Response(
        JSON.stringify({ error: 'Iframe URL not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ iframeUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
