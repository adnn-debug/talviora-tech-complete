const https = require('https');

https.get('https://talviora-ai-career-intelligence.vercel.app', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('=== LIVE PRODUCTION HTML AUDIT ===');
    console.log('HTTP Status:', res.statusCode);
    console.log('Total HTML Size:', html.length, 'bytes');

    // SEO & Head Meta
    console.log('Viewport Meta:', html.includes('name="viewport"'));
    console.log('Description Meta:', html.includes('name="description"'));
    console.log('Title Tag:', html.includes('<title>'));
    console.log('Charset Meta:', html.includes('charSet=') || html.includes('charset='));
    console.log('Lang Attribute:', html.includes('lang="en"'));
    console.log('Favicon Link:', html.includes('rel="icon"'));

    // Images
    const imgMatches = html.match(/<img[^>]+>/g) || [];
    console.log('Total <img> tags:', imgMatches.length);
    imgMatches.forEach((img, i) => {
      console.log(` Image ${i + 1}: ${img.slice(0, 100)}`);
      console.log(`   Has alt:`, img.includes('alt='));
      console.log(`   Has width:`, img.includes('width='));
      console.log(`   Has height:`, img.includes('height='));
    });

    // Links without accessible text
    const linkMatches = html.match(/<a[^>]*>(.*?)<\/a>/gs) || [];
    console.log('Total <a> tags:', linkMatches.length);
    let emptyLinks = 0;
    linkMatches.forEach((a) => {
      const clean = a.replace(/<[^>]+>/g, '').trim();
      const hasAria = a.includes('aria-label=') || a.includes('title=');
      if (!clean && !hasAria) {
        emptyLinks++;
        console.log(' Empty link without text or aria-label:', a.slice(0, 100));
      }
    });
    console.log('Empty links count:', emptyLinks);

    // Buttons without accessible text
    const buttonMatches = html.match(/<button[^>]*>(.*?)<\/button>/gs) || [];
    console.log('Total <button> tags:', buttonMatches.length);
    let emptyButtons = 0;
    buttonMatches.forEach((btn) => {
      const clean = btn.replace(/<[^>]+>/g, '').trim();
      const hasAria = btn.includes('aria-label=') || btn.includes('title=');
      if (!clean && !hasAria) {
        emptyButtons++;
        console.log(' Empty button without text or aria-label:', btn.slice(0, 100));
      }
    });
    console.log('Empty buttons count:', emptyButtons);
  });
});
