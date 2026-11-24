const https = require('https');
const fs = require('fs');
const ids = process.argv.slice(2);
function get(url, tries = 5) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let s = '';
      r.on('data', d => s += d);
      r.on('end', () => {
        try { res(JSON.parse(s)); } catch (e) {
          if (tries > 1) setTimeout(() => get(url, tries - 1).then(res, rej), 1500);
          else rej(new Error('parse fail ' + s.slice(0, 60)));
        }
      });
    }).on('error', e => { if (tries > 1) setTimeout(() => get(url, tries - 1).then(res, rej), 1500); else rej(e); });
  });
}
(async () => {
  for (const id of ids) {
    const j = await get(`https://itunes.apple.com/lookup?id=${id}&country=jp&entity=song&limit=300`);
    const col = j.results.find(r => r.wrapperType === 'collection' || r.collectionId == id && r.artistName);
    const meta = j.results.find(r => r.collectionId == id && r.collectionName);
    if (!meta) { console.log(id, 'NO META', j.resultCount); continue; }
    const art = meta.artworkUrl100 ? meta.artworkUrl100.replace(/\/100x100bb/, '/600x600bb') : '';
    const m = art.match(/\/(4540774\d{6})\./);
    const out = {
      collectionId: +id,
      name: meta.collectionName,
      artist: meta.artistName,
      date: (meta.releaseDate || '').slice(0, 10),
      catDigits: m ? m[1].slice(7, 12) : '',
      art,
      tracks: j.results.filter(r => r.wrapperType === 'track' && r.trackId !== meta.collectionId)
        .map(r => ({ disc: r.discNumber || 1, no: r.trackNumber, t: r.trackName, by: r.artistName, ms: r.trackTimeMillis }))
        .sort((a, b) => a.disc - b.disc || a.no - b.no),
    };
    fs.writeFileSync(`.tmpfetch/itunes2/${id}.json`, JSON.stringify(out, null, 1));
    console.log(id, out.name, '|', out.artist, '|', out.date, '| 品番', out.catDigits, '|', out.tracks.length, 'tracks');
    await new Promise(r => setTimeout(r, 800));
  }
})();
