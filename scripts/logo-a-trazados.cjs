// Convierte la firma medida en el navegador (texto + línea) en trazados SVG fijos, para que el logo no dependa
// de fuentes ni de JavaScript. Uso: node scripts/logo-a-trazados.cjs <logo-raw.json> <salida.json>
// Necesita: npm i --no-save fontkit wawoff2
const fs = require('fs');
const fontkit = require('fontkit');
const wawoff2 = require('wawoff2');
const [,, input, output] = process.argv;
(async () => {
  const raw = JSON.parse(fs.readFileSync(input, 'utf8'));
  const ttf = Buffer.from(await wawoff2.decompress(fs.readFileSync('node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2')));
  const archivo = fontkit.create(ttf).getVariation({ wght: 800, wdth: 125 });
  const literata = fontkit.create(Buffer.from(await wawoff2.decompress(fs.readFileSync('node_modules/@fontsource/literata/files/literata-latin-400-italic.woff2'))));
  function textToPath(font, str, x, y, size) {
    const run = font.layout(str), k = size / font.unitsPerEm;
    let pen = 0, d = '';
    run.glyphs.forEach((g, i) => {
      const pos = run.positions[i];
      d += g.path.scale(k, -k).translate(x + (pen + pos.xOffset) * k, y - pos.yOffset * k).toSVG();
      pen += pos.xAdvance;
    });
    return { d, width: pen * k };
  }
  const svg = raw.firma;
  const texts = [...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)" font-family="([^"]+)" font-size="([\d.]+)"[^>]*>([^<]+)<\/text>/g)];
  const rect = svg.match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/);
  const a = texts[0], t = texts[1];
  const c = textToPath(archivo, a[5], +a[1], +a[2], +a[4]);
  const td = textToPath(literata, t[5], +t[1], +t[2], +t[4]);
  fs.writeFileSync(output, JSON.stringify({
    viewBox: svg.match(/viewBox="([^"]+)"/)[1],
    carballo: c.d, tardio: td.d,
    linea: { x: +rect[1], y: +rect[2], w: +rect[3], h: +rect[4] },
    simbolo: raw.x1,
  }));
  console.log('CARBALLO mide', c.width.toFixed(1), '· la línea empieza en', rect[1]);
})();
