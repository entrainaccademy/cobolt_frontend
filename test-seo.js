async function testSeo() {
  try {
    const res = await fetch('http://localhost:3000');
    const html = await res.text();

    const titleMatches = Array.from(html.matchAll(/<title[^>]*>([^<]*)<\/title>/gi)).map(m => m[1].trim());
    const descMatches = Array.from(html.matchAll(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/gi)).map(m => m[1].trim());
    const ogTitleMatches = Array.from(html.matchAll(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/gi)).map(m => m[1].trim());
    const ogDescMatches = Array.from(html.matchAll(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/gi)).map(m => m[1].trim());
    const canonicalMatches = Array.from(html.matchAll(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/gi)).map(m => m[1].trim());

    console.log(JSON.stringify({
      status: res.status,
      titles: titleMatches,
      descriptions: descMatches,
      ogTitles: ogTitleMatches,
      ogDescriptions: ogDescMatches,
      canonicals: canonicalMatches
    }, null, 2));
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

testSeo();
