const https = require('https');
const bvs = process.argv.slice(2);
function get(bv) {
  return new Promise((res) => {
    https.get({
      host: 'api.bilibili.com',
      path: '/x/web-interface/view?bvid=' + bv,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Referer': 'https://www.bilibili.com/' },
    }, (r) => {
      let s = '';
      r.on('data', d => s += d);
      r.on('end', () => {
        try {
          const j = JSON.parse(s);
          if (j.code === 0) res(bv + ' ' + new Date(j.data.pubdate * 1000).toISOString().slice(0, 10) + ' ' + j.data.title);
          else res(bv + ' code=' + j.code + ' ' + j.message);
        } catch (e) { res(bv + ' ERR ' + s.slice(0, 60)); }
      });
    }).on('error', e => res(bv + ' NETERR ' + e.message));
  });
}
(async () => {
  for (const bv of bvs) { console.log(await get(bv)); await new Promise(r => setTimeout(r, 1200)); }
})();
