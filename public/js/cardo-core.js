(function(){

  function f(n){return n.toFixed(2)}
  function P(p){return f(p[0])+' '+f(p[1])}
  /* ——— sistema de brácteas ———
     base en (bx,by), ángulo en grados, largo, ancho de base, curva (+ derecha / − izquierda) */
  function bract(bx,by,ang,len,w,curve,o){o=o||{};var a=ang*Math.PI/180,d=[Math.cos(a),Math.sin(a)],n=[-d[1],d[0]];
    function pt(t,side){var bend=curve*len*t*t,ww=w/2*Math.pow(1-t,1.25)*(t<.12?1+.6*(.12-t)/.12:1);return [bx+d[0]*len*t+n[0]*(bend+side*ww),by+d[1]*len*t+n[1]*(bend+side*ww)];}
    var L=[],R=[],N=18;for(var i=0;i<=N;i++){var t=i/N;L.push(pt(t,-1));R.push(pt(t,1));}
    var s='M'+P(L[0]);for(i=1;i<=N;i++)s+=' L'+P(L[i]);for(i=N;i>=0;i--)s+=' L'+P(R[i]);s+='Z';
    var out='<path d="'+s+'" fill="'+(o.fill||'currentColor')+'"/>';
    var sp=o.spines||0,side=curve>=0?1:-1;
    for(var k=1;k<=sp;k++){var t=.28+k*(.5/(sp+1)),p=pt(t,side),q=pt(t+.04,side),dd=[q[0]-p[0],q[1]-p[1]],l=Math.hypot(dd[0],dd[1])||1;dd=[dd[0]/l,dd[1]/l];var nn=[-dd[1]*side,dd[0]*side];
      var sl=len*.11;out+='<path d="M'+P([p[0]-dd[0]*1.3,p[1]-dd[1]*1.3])+' L'+P([p[0]+nn[0]*sl+dd[0]*sl*.6,p[1]+nn[1]*sl+dd[1]*sl*.6])+' L'+P([p[0]+dd[0]*1.4,p[1]+dd[1]*1.4])+'Z" fill="'+(o.fill||'currentColor')+'"/>';}
    return out;}
  /* cabeza con escamas en el contorno */
  function head(cx,cy,rx,ry,fill){var s='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="'+(fill||'currentColor')+'"/>';
    for(var i=0;i<9;i++){var a=(150+i*30)*Math.PI/180;if(i>4)a=(150-(i-4)*30)*Math.PI/180;var x=cx+Math.cos(a)*rx*.92,y=cy+Math.sin(a)*ry*.92;s+=bract(x,y,(Math.atan2(Math.sin(a),Math.cos(a))*180/Math.PI)-(Math.cos(a)<0?-25:25),rx*.62,rx*.42,0,{fill:fill});}
    return s;}
  function stem(x0,y0,x1,y1,w0,w1,bend){var mx=(x0+x1)/2+(bend||0),my=(y0+y1)/2;return '<path d="M'+f(x0-w0/2)+' '+f(y0)+' Q'+f(mx-(w0+w1)/4)+' '+f(my)+' '+f(x1-w1/2)+' '+f(y1)+' L'+f(x1+w1/2)+' '+f(y1)+' Q'+f(mx+(w0+w1)/4)+' '+f(my)+' '+f(x0+w0/2)+' '+f(y0)+'Z" fill="currentColor"/>';}
  function fan(cx,cy,list,o){var s='';list.forEach(function(b){var a=b[0]*Math.PI/180;s+=bract(cx+Math.cos(a)*(o&&o.r||5.5),cy+Math.sin(a)*(o&&o.ry||4.5),b[0],b[1],b[2],b[3],{spines:b[4]||0,fill:b[5]||(o&&o.fill)})});return s;}
  function phyllo(cx,cy,R,n,fill){var s='';for(var i=1;i<=n;i++){var r=R*Math.sqrt(i/n),a=i*137.508*Math.PI/180;s+='<circle cx="'+f(cx+Math.cos(a)*r)+'" cy="'+f(cy+Math.sin(a)*r)+'" r="'+f(.55+R*.055*(1-i/n*.4))+'" fill="'+fill+'"/>';}return s;}
  function guides(cx,cy,r1,r2){return '<g class="guide" fill="none" stroke="#C0563A" stroke-width=".4" stroke-dasharray="1.5 1.5"><circle cx="'+cx+'" cy="'+cy+'" r="'+r1+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r2+'"/><line x1="'+cx+'" y1="2" x2="'+cx+'" y2="98"/><line x1="2" y1="'+cy+'" x2="98" y2="'+cy+'"/><line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r2*Math.cos(-2.6))+'" y2="'+(cy+r2*Math.sin(-2.6))+'"/><line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+r2*Math.cos(-.54))+'" y2="'+(cy+r2*Math.sin(-.54))+'"/></g>';}
  function svg(inner){return '<svg viewBox="0 0 100 100" aria-hidden="true">'+inner+'</svg>';}

  /* bráctea con corte (cut 0..1 = se parte ahí) */
  function bract(bx,by,ang,len,w,curve,o){o=o||{};var a=ang*Math.PI/180,d=[Math.cos(a),Math.sin(a)],n=[-d[1],d[0]],tm=o.cut||1;
    function pt(t,side){var bend=curve*len*t*t,ww=w/2*Math.pow(1-Math.min(t,1),1.25)*(t<.12?1+.6*(.12-t)/.12:1);return [bx+d[0]*len*t+n[0]*(bend+side*ww),by+d[1]*len*t+n[1]*(bend+side*ww)];}
    var L=[],R=[],N=18;for(var i=0;i<=N;i++){var t=i/N*tm;L.push(pt(t,-1));R.push(pt(t,1));}
    if(o.cut){L[N]=pt(tm+.07,-1);L.push(pt(tm+.03,-.2));}
    var s='M'+P(L[0]);for(i=1;i<L.length;i++)s+=' L'+P(L[i]);for(i=N;i>=0;i--)s+=' L'+P(R[i]);s+='Z';
    var out='<path d="'+s+'" fill="'+(o.fill||'currentColor')+'"/>';
    var sp=o.spines||0,side=curve>=0?1:-1;
    for(var k=1;k<=sp;k++){var t=.28+k*(.5/(sp+1));if(t>tm-.05)continue;var p=pt(t,side),q=pt(t+.04,side),dd=[q[0]-p[0],q[1]-p[1]],l=Math.hypot(dd[0],dd[1])||1;dd=[dd[0]/l,dd[1]/l];var nn=[-dd[1]*side,dd[0]*side];
      var sl=len*.11;out+='<path d="M'+P([p[0]-dd[0]*1.3,p[1]-dd[1]*1.3])+' L'+P([p[0]+nn[0]*sl+dd[0]*sl*.6,p[1]+nn[1]*sl+dd[1]*sl*.6])+' L'+P([p[0]+dd[0]*1.4,p[1]+dd[1]*1.4])+'Z" fill="'+(o.fill||'currentColor')+'"/>';}
    return out;}
  function rng(seed){var s=seed||7;return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}}
  function inGap(a,g){if(!g)return false;a=((a%360)+360)%360;var a0=((g[0]%360)+360)%360,a1=((g[1]%360)+360)%360;return a0<=a1?(a>=a0&&a<=a1):(a>=a0||a<=a1);}
  /* estrella del cardo, vista desde arriba, centrada en 50,50 */
  function star(o){o=o||{};var n=o.n||12,A=o.A||38,B=o.B||30,w=o.w||6.6,c=o.c==null?.16:o.c,base=o.base||10,r=o.r||12,rot=o.rot||0,cut=o.cut||{},R=rng(o.seed);
    var back='',front='',jit=o.jit||0;
    for(var i=0;i<n;i++){var ang=-90+rot+i*360/n,L=i%2?B:A,dj=0;if(jit){L*=1+(R()-.5)*jit;dj=(R()-.5)*jit*22;}ang+=dj;
      if(o.grav)L*=1+o.grav*Math.sin(ang*Math.PI/180);
      var cv=o.alt?(i%2?c:-c):c;
      if(o.two!==false&&!inGap(ang+180/n,o.gap)){var ab=ang+180/n,rb=base*.9;back+=bract(50+Math.cos(ab*Math.PI/180)*rb,50+Math.sin(ab*Math.PI/180)*rb,ab,L*.84,w*.85,cv,{fill:'var(--o)',cut:cut['b'+i]});}
      if(inGap(ang,o.gap))continue;
      front+=bract(50+Math.cos(ang*Math.PI/180)*base,50+Math.sin(ang*Math.PI/180)*base,ang,L,w,cv,{spines:i%3?1:0,cut:cut[i]});}
    if(o.inner){for(i=0;i<o.inner;i++){var ai=-90+rot+180/o.inner+i*360/o.inner;front+=bract(50+Math.cos(ai*Math.PI/180)*r*.7,50+Math.sin(ai*Math.PI/180)*r*.7,ai,r*1.25,4,0,{fill:'var(--o)'});}}
    var ctr='';
    if(o.center==='scales'){ctr='<circle cx="50" cy="50" r="'+r*.78+'" fill="currentColor"/>';for(i=0;i<12;i++){var as=i*30+15;ctr+=bract(50+Math.cos(as*Math.PI/180)*r*.35,50+Math.sin(as*Math.PI/180)*r*.35,as,r*.78,r*.34,0,{fill:'currentColor'})}for(i=0;i<8;i++){var a2=i*45;ctr+=bract(50+Math.cos(a2*Math.PI/180)*.6,50+Math.sin(a2*Math.PI/180)*.6,a2,r*.5,1.6,0,{fill:'var(--hole)'})}}
    else if(o.center==='split'){ctr='<circle cx="50" cy="50" r="'+r+'" fill="currentColor"/><path d="M'+P([50+Math.cos(-.5)*r*.5,50+Math.sin(-.5)*r*.5])+' A'+r*.5+' '+r*.5+' 0 1 1 '+P([50+Math.cos(-1.35)*r*.5,50+Math.sin(-1.35)*r*.5])+'" fill="none" stroke="var(--hole)" stroke-width="1.5" stroke-linecap="round"/>';}
    else ctr='<circle cx="50" cy="50" r="'+r+'" fill="currentColor"/>';
    var ray='';(o.rays||[]).forEach(function(q){ray+=bract(50+Math.cos(q[0]*Math.PI/180)*6,50+Math.sin(q[0]*Math.PI/180)*6,q[0],q[1],q[2]||4.4,q[3]==null?.12:q[3],{spines:2})});
    var fr='';(o.frags||[]).forEach(function(q,k){fr+='<g transform="translate('+q[0]+' '+q[1]+') rotate('+q[2]+')"'+(q[4]?' opacity=".8"':'')+'>'+bract(0,0,-90,q[3],q[3]*.3,.15,{fill:q[4]?'var(--o)':'currentColor',cut:.62})+'</g>'});
    return back+front+ray+ctr+fr;}
  function ST(o){return svg(guides(50,50,12,48)+star(o));}
  function G(cx,cy,s,inner){return '<g transform="translate('+cx+' '+cy+') scale('+s+') translate(-50 -50)">'+inner+'</g>';}

  /* ——— sol y luna en Peque (aprox. 42,07 N · 6,27 O) ——— */
  var LAT=42.07,LON=-6.27,RAD=Math.PI/180;
  function madridOffset(d){try{var p=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',hour:'2-digit',minute:'2-digit',hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(d),g={};p.forEach(function(x){g[x.type]=x.value});
    var loc=Date.UTC(+g.year,+g.month-1,+g.day,+g.hour,+g.minute);return Math.round((loc-d.getTime())/60000);}catch(e){return 60}}
  var TODAY=new Date(),OFF=madridOffset(TODAY);
  function dayOfYear(d){var s=Date.UTC(d.getUTCFullYear(),0,0);return Math.floor((d.getTime()-s)/864e5);}
  function solar(hLocal){var N=dayOfYear(TODAY),hu=hLocal-OFF/60,g=2*Math.PI/365*(N-1+(hu-12)/24);
    var eq=229.18*(.000075+.001868*Math.cos(g)-.032077*Math.sin(g)-.014615*Math.cos(2*g)-.040849*Math.sin(2*g));
    var de=.006918-.399912*Math.cos(g)+.070257*Math.sin(g)-.006758*Math.cos(2*g)+.000907*Math.sin(2*g)-.002697*Math.cos(3*g)+.00148*Math.sin(3*g);
    var tst=hu*60+eq+4*LON,ha=(tst/4-180)*RAD,ce=Math.sin(LAT*RAD)*Math.sin(de)+Math.cos(LAT*RAD)*Math.cos(de)*Math.cos(ha);
    var hs=Math.acos(Math.cos(90.833*RAD)/(Math.cos(LAT*RAD)*Math.cos(de))-Math.tan(LAT*RAD)*Math.tan(de))/RAD;
    return {elev:Math.asin(ce)/RAD,rise:(720-4*(LON+hs)-eq)/60+OFF/60,set:(720-4*(LON-hs)-eq)/60+OFF/60};}
  var SUN=solar(12);
  function moonPhase(d){var jd=d.getTime()/864e5+2440587.5;var p=((jd-2451550.1)/29.530588853)%1;return p<0?p+1:p;}
  /* la fase de la noche que se está viendo: antes del mediodía, la de la noche anterior */
  var PH=null;
  function phaseAt(h){if(PH!=null)return PH;var d=new Date(TODAY.getTime());var base=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate());return moonPhase(new Date(base+(h-OFF/60)*36e5));}
  function phaseName(p){var n=['luna nueva','luna creciente','cuarto creciente','creciente gibosa','luna llena','menguante gibosa','cuarto menguante','luna menguante'];return n[Math.round(p*8)%8];}
  function hhmm(h){h=((h%24)+24)%24;var m=Math.round(h*60);return String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}

  /* ——— la luz: color del cielo según la altura del sol ——— */
  var SKY=[[-90,[24,26,34]],[-12,[30,33,46]],[-6,[52,58,82]],[-2,[122,92,96]],[1,[196,124,86]],[5,[226,170,112]],[12,[236,206,160]],[25,[240,232,217]],[90,[243,236,222]]];
  function sky(e){for(var i=1;i<SKY.length;i++){if(e<=SKY[i][0]){var a=SKY[i-1],b=SKY[i],t=(e-a[0])/(b[0]-a[0]);return a[1].map(function(v,k){return Math.round(v+(b[1][k]-v)*t)})}}return SKY[SKY.length-1][1];}
  function rgb(c,a){return a==null?'rgb('+c.join(',')+')':'rgba('+c.join(',')+','+a+')';}
  function lum(c){return (.2126*c[0]+.7152*c[1]+.0722*c[2])/255;}
  function inkFor(c){return lum(c)>.55?{ink:'#2B2621',o:'#75513B',acc:'#75513B'}:{ink:'#F1E4C8',o:'#9C7253',acc:'#E2B98A'};}

  /* ——— el signo ——— */
  var X1={alt:true,c:.14,jit:.22,seed:11,gap:[-62,10],rays:[[-28,46,4.2,.12]]};
  function x1(k,rot){var o=Object.assign({},X1);k=k==null?1:k;o.A=38*k;o.B=30*k;o.r=12+(1-k)*4;
    var a=rot==null?-26:rot;o.gap=[a-36,a+36];o.rays=[[a-2,46*Math.max(k,.55),4.2,.12]];return star(o);}
  var mid=0;
  function moon(p,k){var f=(1-Math.cos(2*Math.PI*p))/2,id='m'+(mid++),inner=x1(k==null?.86:k,-26);
    if(f>.985)return inner;
    var dx=f*98,cxm=p<.5?50-dx:50+dx;
    return '<g opacity=".32" style="color:var(--o)">'+inner+'</g><mask id="'+id+'" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120"><rect x="-10" y="-10" width="120" height="120" fill="#fff"/><circle cx="'+f2(cxm)+'" cy="50" r="49" fill="#000"/></mask><g mask="url(#'+id+')">'+inner+'</g>';}
  function f2(n){return n.toFixed(2)}
  function openK(e){return Math.max(.42,Math.min(1,(e+10)/34));}
  function sunAngle(h){var r=SUN.rise,s=SUN.set;if(h>=r&&h<=s)return 180+(h-r)/(s-r)*180;var n=h>s?h-s:h+24-s,len=24-(s-r);return (n/len)*180;}
  /* devuelve el interior del svg para un comportamiento y una hora */
  function sign(c,h){var e=solar(h).elev;
    if(c==='C1'){if(e>-4)return x1(openK(e));return moon(phaseAt(h));}
    if(c==='C2')return x1(e>-6?openK(e):.42);
    if(c==='C3'){var a=sunAngle(h);return x1(1,a>=360?a-360:a);}
    return x1(1);}
  var CONC=[['C1','Sol y luna','De día, la X1 abierta según la altura del sol. Al anochecer se recoge y se vuelve luna, con la fase real de esa noche.'],['C2','Se abre y se cierra','Siempre la X1, pero las brácteas crecen con el sol: abierta al mediodía y recogida de noche, como un cardo dormido.'],['C3','Reloj de sol','La X1 no cambia de forma: el hueco y la punta giran con el sol y señalan dónde está ahora en el cielo de Peque. De noche apuntan abajo.'],['C4','Solo el color','El signo no cambia. Cambian el papel y la tinta con la luz: es lo más discreto.']];

  /* ——— medición del glifo para el travesaño ——— */
  var cv=document.createElement('canvas');cv.width=900;cv.height=520;var cx=cv.getContext('2d',{willReadFrequently:true});
  function setFont(ff){cx.font=ff.font;try{cx.fontStretch=ff.stretch||'normal'}catch(e){}try{cx.letterSpacing=(ff.ls||0)+'px'}catch(e){}}
  function scan(ff,ch){setFont(ff);cx.clearRect(0,0,900,520);cx.fillStyle='#000';cx.fillText(ch,200,400);var d=cx.getImageData(0,0,900,520).data,rows=[];
    for(var y=0;y<520;y++){var mn=-1,mx=-1,c=0;for(var x=0;x<900;x++){if(d[(y*900+x)*4+3]>120){if(mn<0)mn=x;mx=x;c++}}if(mn>=0)rows.push({h:400-y,a:mn-200,b:mx-200,w:mx-mn+1,c:c})}return rows;}
  var cache={};
  /* la barra: filas de la mitad alta con más tinta; contiguas a la fila más cargada y con al menos el 55% de su tinta */
  function bar(ff,ch){var k=ff.font+ff.stretch+ch;if(cache[k])return cache[k];var rows=scan(ff,ch);if(!rows.length)return null;var top=rows[0].h;
    var up=rows.filter(function(r){return r.h>top*.45});var best=up.reduce(function(m,r){return r.c>m.c?r:m},up[0]);var lim=best.c*.55;
    var i=up.indexOf(best),t=best.h,bo=best.h,a=best.a,b=best.b,j;
    for(j=i;j>=0&&up[j].c>=lim;j--){t=up[j].h;a=Math.min(a,up[j].a);b=Math.max(b,up[j].b)}
    for(j=i;j<up.length&&up[j].c>=lim;j++){bo=up[j].h;a=Math.min(a,up[j].a);b=Math.max(b,up[j].b)}
    return cache[k]={top:t+.5,bot:bo-.5,a:a,b:b+1,cap:top};}
  function capH(ff){var k=ff.font+ff.stretch+'H';if(cache[k])return cache[k];var rows=scan(ff,'H');return cache[k]=rows.length?rows[0].h+.5:ff.size*.7;}
  function width(ff,s){setFont(ff);return cx.measureText(s).width-(ff.ls||0);}
  var SZ=200;
  function ffo(fam,opt){opt=opt||{};var sz=opt.size||SZ;return {font:(opt.it?'italic ':'')+(opt.wt||400)+' '+sz+'px '+fam,stretch:opt.st||'normal',size:sz,fam:fam,it:opt.it,wt:opt.wt||400,ls:opt.ls||0,pct:opt.pct||100};}
  function txt(ff,x,y,s,col){return '<text x="'+f(x)+'" y="'+f(y)+'" font-family="'+ff.fam.replace(/"/g,'')+'" font-size="'+ff.size+'" font-weight="'+ff.wt+'"'+(ff.it?' font-style="italic"':'')+(ff.ls?' letter-spacing="'+ff.ls+'"':'')+' style="font-stretch:'+ff.pct+'%;fill:'+col+'">'+s+'</text>';}
  var FAM={lit:"Literata, Georgia, serif",bask:"'Libre Baskerville', Georgia, serif",arc:"'Archivo Variable', Archivo, system-ui, sans-serif"};
  /* o: w2 ('tardío'|'Tardío'|'TARDÍO'), f2 opts, f1 opts, match (alinear mayúsculas con la barra), len (largo de línea en em), stack */
  function firma(o){var f2=ffo(o.f2fam,o.f2),m=bar(f2,o.w2[0]);if(!m)return '';
    var f1base=ffo(o.f1fam,Object.assign({},o.f1,{size:SZ}));var ch1=capH(f1base);
    var s1=o.mid?SZ*((m.top+m.bot)/ch1)*(o.midk||1):o.match?SZ*(m.top/ch1):SZ*(o.s1||.62);var f1=ffo(o.f1fam,Object.assign({},o.f1,{size:Math.round(s1*10)/10,ls:o.f1&&o.f1.ls?o.f1.ls*s1:0}));
    var w1=width(f1,'CARBALLO'),w2=width(f2,o.w2),gap=SZ*(o.gap==null?.22:o.gap),len=SZ*(o.len||1.6);
    var B=SZ,out='',x1,tx,W,y0,H,B2;
    /* límites reales de tinta, para que nada quede recortado */
    function ext(){var t1=ch1*s1/SZ,r2=scan(f2,o.w2),t2=r2.length?r2[0].h:SZ*.9,b2=r2.length?r2[r2.length-1].h:-SZ*.25;return {t1:t1,top:Math.max(t1,t2)+SZ*.08,bot:Math.min(0,b2)-SZ*.08};}
    if(!o.stack){x1=w1+gap;tx=x1+len-m.a;W=tx+w2+4;out+=txt(f1,0,B,'CARBALLO','var(--ink)')+'<rect x="'+f(x1)+'" y="'+f(B-m.top)+'" width="'+f(tx+m.b-x1)+'" height="'+f(m.top-m.bot)+'" style="fill:var(--acc)"/>'+txt(f2,tx,B,o.w2,'var(--acc)');var ex=ext();y0=B-ex.top;H=ex.top-ex.bot;}
    else{B2=B+SZ*1.22;tx=Math.max(w1-w2,SZ*.9);x1=0;W=Math.max(w1,tx+w2)+4;out+=txt(f1,0,B,'CARBALLO','var(--ink)')+'<rect x="0" y="'+f(B2-m.top)+'" width="'+f(tx+m.b)+'" height="'+f(m.top-m.bot)+'" style="fill:var(--acc)"/>'+txt(f2,tx,B2,o.w2,'var(--acc)');var ex2=ext();y0=B-ex2.t1-SZ*.08;H=(B2-ex2.bot+SZ*.08)-y0;}
    return '<svg viewBox="-2 '+f(y0)+' '+f(W+4)+' '+f(H)+'" role="img" aria-label="Carballo Tardío">'+out+'</svg>';}
  var ARC={wt:800,st:'expanded',pct:125};
  var FIRMAS={
    F1:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.arc,f1:ARC,s1:.6,len:1.5},
    F2:{w2:'Tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.arc,f1:ARC,match:true,len:1.5},
    F3:{w2:'Tardío',f2fam:FAM.lit,f2:{wt:400},f1fam:FAM.arc,f1:ARC,match:true,len:1.5},
    F4:{w2:'TARDÍO',f2fam:FAM.arc,f2:{wt:500},f1fam:FAM.arc,f1:ARC,match:true,len:1.2},
    F5:{w2:'Tardío',f2fam:FAM.lit,f2:{wt:400},f1fam:FAM.arc,f1:ARC,match:true,stack:true},
    F6:{w2:'Tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.arc,f1:ARC,match:true,len:3.2},
    F7:{w2:'Tardío',f2fam:FAM.lit,f2:{it:true,wt:500},f1fam:FAM.arc,f1:{wt:600,st:'normal',pct:100},match:true,len:1.4},
    F8:{w2:'Tardío',f2fam:FAM.bask,f2:{wt:400},f1fam:FAM.bask,f1:{wt:400,ls:.14},match:true,len:1.4}
  };
  Object.assign(FIRMAS,{
    T1:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.arc,f1:ARC,mid:true,len:1.5},
    T2:{w2:'tardío',f2fam:FAM.lit,f2:{wt:400},f1fam:FAM.arc,f1:ARC,mid:true,len:1.5},
    T3:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:500},f1fam:FAM.arc,f1:ARC,mid:true,len:1.5},
    T4:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:300},f1fam:FAM.arc,f1:{wt:700,st:'expanded',pct:125},mid:true,len:1.5},
    T5:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.arc,f1:ARC,mid:true,len:1.6,gap:.03},
    T6:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.arc,f1:ARC,mid:true,len:3.4},
    T7:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.arc,f1:ARC,mid:true,len:.75},
    T8:{w2:'tardío',f2fam:FAM.bask,f2:{it:true,wt:400},f1fam:FAM.arc,f1:ARC,mid:true,len:1.5},
    T9:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.bask,f1:{wt:400,ls:.14},mid:true,len:1.5},
    T10:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.arc,f1:ARC,s1:.62,stack:true},
    T11:{w2:'tardío',f2fam:FAM.arc,f2:{wt:500},f1fam:FAM.arc,f1:ARC,mid:true,len:1.3},
    T12:{w2:'tardío',f2fam:FAM.lit,f2:{it:true,wt:400},f1fam:FAM.arc,f1:{wt:700,st:'normal',pct:100},mid:true,len:1.5}
  });

  function moonFrac(p){return (1-Math.cos(2*Math.PI*p))/2;}
  window.CT={star:star,x1:x1,moon:moon,sign:sign,solar:solar,sky:sky,rgb:rgb,lum:lum,phaseAt:phaseAt,phaseName:phaseName,moonFrac:moonFrac,hhmm:hhmm,firma:function(k){return firma(FIRMAS[k])},resetCache:function(){cache={}},madridOffset:madridOffset,SUN:SUN};
})();
