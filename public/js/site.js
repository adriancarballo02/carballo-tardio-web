/* Carballo Tardío · el único detalle vivo: la hora y la luz de Peque en el pie y el cardo del favicon. */
(function(){
  var CT=window.CT;if(!CT)return;
  function nowH(){var d=new Date(),o=CT.madridOffset(d);return ((d.getUTCHours()*60+d.getUTCMinutes()+o+1440)%1440)/60;}
  function tick(){var H=nowH(),e=CT.solar(H).elev,inner=CT.sign('C1',H),ph=CT.phaseAt(H);
    [].forEach.call(document.querySelectorAll('[data-sign]'),function(el){el.innerHTML=inner});
    var txt='En Peque son las '+CT.hhmm(H)+' · '+(e>-4?'sol a '+Math.max(0,Math.round(e))+'°':CT.phaseName(ph));
    [].forEach.call(document.querySelectorAll('[data-now]'),function(el){el.textContent=txt});
    var fav=document.getElementById('favicon');if(!fav)return;var dark=e<-4,bg=dark?'#1C1D23':'#F0E8D9',fg=dark?'#EFE3CB':'#302B25',o=dark?'#8E6A4E':'#75513B';
    fav.href='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="'+bg+'"/>'+inner.replace(/var\(--o\)/g,o).replace(/var\(--hole\)/g,bg).replace(/currentColor/g,fg)+'</svg>');}
  tick();setInterval(tick,60000);
})();
