/* Carballo Tardío · detalles comunes: logo fijo, firma medida, la hora y la luz de Peque en el pie y el favicon. */
(function(){
  var CT=window.CT;if(!CT)return;
  function nowH(){var d=new Date(),o=CT.madridOffset(d);return ((d.getUTCHours()*60+d.getUTCMinutes()+o+1440)%1440)/60;}
  function tick(){var H=nowH(),e=CT.solar(H).elev,inner=CT.sign('C1',H);
    [].forEach.call(document.querySelectorAll('[data-sign]'),function(el){el.innerHTML=inner});
    var ph=CT.phaseAt(H),txt='Ahora en Peque son las '+CT.hhmm(H)+'. '+(e>-4?'Sol a '+Math.max(0,Math.round(e))+'° sobre el horizonte.':CT.phaseName(ph).replace(/^./,function(c){return c.toUpperCase()})+'.');
    [].forEach.call(document.querySelectorAll('[data-now]'),function(el){el.textContent=txt});
    var fav=document.getElementById('favicon');if(fav){var dark=e<-4;var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="color:'+(dark?'#EFE3CB':'#302B25')+';--o:'+(dark?'#8E6A4E':'#75513B')+'"><rect width="100" height="100" rx="18" fill="'+(dark?'#1C1D23':'#F0E8D9')+'"/>'+inner.replace(/var\(--o\)/g,dark?'#8E6A4E':'#75513B').replace(/var\(--hole\)/g,dark?'#1C1D23':'#F0E8D9').replace(/currentColor/g,dark?'#EFE3CB':'#302B25')+'</svg>';fav.href='data:image/svg+xml,'+encodeURIComponent(svg);}}
  [].forEach.call(document.querySelectorAll('[data-logo]'),function(el){el.innerHTML=CT.x1(1)});
  function firmas(){CT.resetCache();[].forEach.call(document.querySelectorAll('[data-fk]'),function(el){el.innerHTML=CT.firma(el.dataset.fk)});}
  tick();firmas();setInterval(tick,60000);
  if(document.fonts){document.fonts.ready.then(firmas);document.fonts.addEventListener&&document.fonts.addEventListener('loadingdone',firmas);}
})();
