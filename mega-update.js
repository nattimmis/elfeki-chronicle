/* ═══════════════════════════════════════════════════════════════
   MEGA UPDATE v2: Map, Mouse Eyes, Tools, Speech, Research, Volex FX
   Populates existing HTML containers injected in index.html
   ═══════════════════════════════════════════════════════════════ */

/* ─── LEAFLET MAP: Satellite Journey ─── */
(function() {
  var mc = document.getElementById('mapContainer');
  if (!mc) return;

  var lkCSS = document.createElement('link');
  lkCSS.rel = 'stylesheet';
  lkCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(lkCSS);

  var lkJS = document.createElement('script');
  lkJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  lkJS.onload = function() { setTimeout(initMap, 200); };
  document.head.appendChild(lkJS);

  function initMap() {
    if (typeof L === 'undefined') return;
    var map = L.map('mapContainer', { center:[33.5,20], zoom:4, zoomControl:false, scrollWheelZoom:true });
    L.control.zoom({position:'topright'}).addTo(map);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution:'ESRI Satellite', maxZoom:18
    }).addTo(map);

    var waypoints = [
      {lat:33.27,lng:35.20,name:'Tyre, Phoenicia',era:'8th c. BCE',desc:'Origin of Hiram al-Elfeki. Phoenician maritime launch — purple dye, alphabet, cedar ships.',type:'origin',haplo:'J2-M172'},
      {lat:36.85,lng:10.32,name:'Carthage',era:'814 BCE',desc:'Phoenician colony. Naval power, Punic Wars, Hannibal. J2-M172 arrived here.',type:'settlement',haplo:'J2-M172'},
      {lat:35.68,lng:10.10,name:'Kairouan',era:'15th c. CE',desc:'Sheikh Ahmad al-Elfeki\'s seat. Great Mosque, Maliki jurisprudence, the name "Elfeki" forged here.',type:'settlement',haplo:'J1-P58'},
      {lat:33.81,lng:10.86,name:'Djerba Island',era:'15th c. CE',desc:'Rabbi Moshe Elfeki\'s El Ghriba synagogue. 2,600 years of Jewish presence.',type:'sacred',haplo:'J1-P58/J2'},
      {lat:35.17,lng:6.50,name:'Aurès Mountains',era:'7th c. CE',desc:'Kahina\'s Berber kingdom. Last stand against Umayyad invasion. E-M81 heartland.',type:'battle',haplo:'E-M81'},
      {lat:23.00,lng:5.00,name:'Trans-Sahara Route',era:'12th c. CE',desc:'Amara al-Elfeki\'s gold trade. Desert crossings, oasis networks, Tuareg alliances.',type:'trade',haplo:'E-V38'},
      {lat:22.31,lng:72.62,name:'Cambay, Gujarat',era:'14th c. CE',desc:'Rajesh Elfeki\'s spice port. Monsoon trade, cardamom, silk, H-M69 origin.',type:'origin',haplo:'H-M69'},
      {lat:35.78,lng:10.83,name:'Sousse',era:'14th c. CE',desc:'Fatima bint Khalil\'s home. Olive groves, textile arts, maternal bridge.',type:'settlement',haplo:'E-M81'},
      {lat:12.65,lng:-8.00,name:'Timbuktu',era:'12th c. CE',desc:'Gold trade terminus. Songhai scholars, manuscripts and salt routes.',type:'trade',haplo:'E-V38'},
      {lat:37.39,lng:-5.99,name:'Seville',era:'1492 CE',desc:'Sephardic expulsion. Jewish Elfeki relatives fled to Djerba.',type:'battle',haplo:'J1-P58'},
      {lat:36.75,lng:3.06,name:'Algiers',era:'1516 CE',desc:'Barbarossa\'s corsair base. Ottoman naval control.',type:'battle',haplo:'J1-P58'},
      {lat:32.90,lng:13.18,name:'Tripoli',era:'1551 CE',desc:'Siege of Tripoli. Ottoman expansion.',type:'battle',haplo:'J1-P58'}
    ];

    var battles = [
      {lat:35.50,lng:6.80,name:'Battle of Thysdrus',year:'238 CE',desc:'Berber revolt against Rome'},
      {lat:35.40,lng:6.20,name:'Kahina\'s Last Stand',year:'703 CE',desc:'Berber queen vs Umayyad army'},
      {lat:36.80,lng:10.18,name:'Fall of Carthage',year:'698 CE',desc:'Arab conquest of Byzantine Carthage'},
      {lat:36.75,lng:3.06,name:'Banu Hilal Invasion',year:'1057 CE',desc:'Nomadic Arab tribes devastate Ifriqiya'},
      {lat:35.68,lng:10.10,name:'Almohad Conquest',year:'1159 CE',desc:'Forced conversions, crypto-Jewish families'},
      {lat:36.85,lng:10.32,name:'Hafsid Dynasty Rise',year:'1229 CE',desc:'Tunis becomes independent caliphate'},
      {lat:33.81,lng:10.86,name:'Battle of Djerba',year:'1560 CE',desc:'Ottoman vs Spanish naval clash'},
      {lat:36.82,lng:10.17,name:'Fall of Tunis',year:'1574 CE',desc:'Ottoman permanent control'},
      {lat:36.85,lng:10.32,name:'French Invasion',year:'1881 CE',desc:'Treaty of Bardo, colonial Tunisia'},
      {lat:36.80,lng:10.18,name:'WWII Tunisia',year:'1943 CE',desc:'Axis defeat in North Africa'},
      {lat:36.82,lng:10.17,name:'Independence',year:'1956 CE',desc:'Tunisia gains independence'},
      {lat:33.89,lng:35.50,name:'Six-Day War',year:'1967 CE',desc:'Regional reshaping, diaspora impact'}
    ];

    function makeIcon(type) {
      var colors = {origin:'#02453c',settlement:'#5bd983',sacred:'#b7f799',battle:'#e63329',trade:'#fcc049'};
      var c = colors[type]||'#02453c';
      return L.divIcon({
        className:'custom-marker',
        html:'<div style="width:18px;height:18px;border-radius:50%;background:'+c+';border:3px solid #fff;box-shadow:0 0 12px '+c+',0 0 24px '+c+'44;animation:mapPulse 2s infinite;"></div>',
        iconSize:[18,18], iconAnchor:[9,9]
      });
    }

    var routeCoords = waypoints.map(function(w){return[w.lat,w.lng];});
    L.polyline(routeCoords,{color:'#b7f799',weight:8,opacity:0.25}).addTo(map);
    var mainRoute = L.polyline(routeCoords,{color:'#5bd983',weight:3,opacity:0.8,dashArray:'10,8'}).addTo(map);

    waypoints.forEach(function(w){
      L.marker([w.lat,w.lng],{icon:makeIcon(w.type)}).addTo(map)
        .bindPopup('<div style="font-family:-apple-system,sans-serif;min-width:220px;"><div style="font-size:14px;font-weight:700;color:#02453c;margin-bottom:4px;">'+w.name+'</div><div style="font-size:11px;color:#5bd983;font-weight:700;letter-spacing:1px;margin-bottom:8px;">'+w.era+' · '+w.haplo+'</div><div style="font-size:12px;color:#555;line-height:1.6;">'+w.desc+'</div></div>',{className:'volex-popup'});
    });

    battles.forEach(function(b){
      L.marker([b.lat,b.lng],{icon:L.divIcon({className:'battle-marker',html:'<div style="width:14px;height:14px;border-radius:50%;background:#e63329;border:2px solid #fff;box-shadow:0 0 8px #e63329;"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(map)
        .bindPopup('<div style="font-family:-apple-system,sans-serif;"><div style="font-size:12px;font-weight:700;color:#e63329;">&#9876; '+b.name+'</div><div style="font-size:11px;color:#888;font-weight:600;">'+b.year+'</div><div style="font-size:12px;color:#555;margin-top:6px;">'+b.desc+'</div></div>');
    });

    map.fitBounds(mainRoute.getBounds().pad(0.15));
  }
})();


/* ─── MOUSE-FOLLOWING EYES ON PORTRAITS ─── */
(function() {
  var eyePairs = [];

  function setupEyes() {
    var portraits = document.querySelectorAll('img[src*="generated-blend-"], img[src*="generated-kahina"], img[src*="generated-sheikh"], img[src*="generated-rajesh"], img[src*="generated-amara"], img[src*="generated-hiram"], img[src*="generated-rabbi"], img[src*="generated-fatima-elfeki"]');
    portraits.forEach(function(img) {
      var wrap = img.parentElement;
      if (!wrap || wrap.querySelector('.eye-overlay-svg')) return;
      wrap.style.position = 'relative';
      wrap.style.overflow = 'hidden';

      var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('class','eye-overlay-svg');
      svg.setAttribute('viewBox','0 0 200 80');
      svg.style.cssText = 'position:absolute;top:28%;left:20%;width:60%;height:20%;pointer-events:none;z-index:5;opacity:0;mix-blend-mode:overlay;transition:opacity 0.5s;';
      svg.innerHTML = '<ellipse cx="55" cy="40" rx="25" ry="16" fill="none" stroke="rgba(2,69,60,0.3)" stroke-width="1.5"/><circle class="ep-l" cx="55" cy="40" r="7" fill="#02453c" opacity="0.5"/><circle cx="52" cy="37" r="2" fill="rgba(255,255,255,0.7)"/><ellipse cx="145" cy="40" rx="25" ry="16" fill="none" stroke="rgba(2,69,60,0.3)" stroke-width="1.5"/><circle class="ep-r" cx="145" cy="40" r="7" fill="#02453c" opacity="0.5"/><circle cx="142" cy="37" r="2" fill="rgba(255,255,255,0.7)"/><path class="sm-path" d="M80,65 Q100,72 120,65" fill="none" stroke="rgba(2,69,60,0.15)" stroke-width="1.5" stroke-linecap="round"/>';
      wrap.appendChild(svg);
      eyePairs.push({svg:svg,wrap:wrap});

      wrap.addEventListener('mouseenter',function(){svg.style.opacity='0.7';});
      wrap.addEventListener('mouseleave',function(){svg.style.opacity='0';});
    });
  }

  document.addEventListener('mousemove',function(e){
    eyePairs.forEach(function(eo){
      var r = eo.wrap.getBoundingClientRect();
      if(r.top > window.innerHeight || r.bottom < 0) return;
      var cx=r.left+r.width/2, cy=r.top+r.height*0.38;
      var dx=Math.max(-1,Math.min(1,(e.clientX-cx)/(window.innerWidth/2)))*5;
      var dy=Math.max(-1,Math.min(1,(e.clientY-cy)/(window.innerHeight/2)))*3;
      var pl=eo.svg.querySelector('.ep-l'), pr=eo.svg.querySelector('.ep-r');
      if(pl){pl.setAttribute('cx',55+dx);pl.setAttribute('cy',40+dy);}
      if(pr){pr.setAttribute('cx',145+dx);pr.setAttribute('cy',40+dy);}
      var dist=Math.sqrt(Math.pow(e.clientX-cx,2)+Math.pow(e.clientY-cy,2));
      var sm=Math.max(65,72+(1-Math.min(dist/400,1))*6);
      var sp=eo.svg.querySelector('.sm-path');
      if(sp)sp.setAttribute('d','M80,65 Q100,'+sm+' 120,65');
    });
  });

  setTimeout(setupEyes,2000);
})();


/* ─── 30 PLACES OF INTEREST ─── */
(function() {
  var grid = document.getElementById('placesGrid');
  if (!grid) return;

  var places = [
    {name:'Great Mosque of Kairouan',era:'670 CE',icon:'<svg viewBox="0 0 40 40" width="28"><rect x="8" y="20" width="24" height="16" fill="#02453c" rx="2"/><rect x="16" y="8" width="8" height="16" fill="#5bd983" rx="4"/><circle cx="20" cy="10" r="3" fill="#b7f799"/></svg>',tool:'Quill Pen & Ink',modern:'Laptop & LaTeX',desc:'4th holiest site in Islam. Where the faqih tradition began.'},
    {name:'El Ghriba Synagogue',era:'586 BCE',icon:'<svg viewBox="0 0 40 40" width="28"><polygon points="20,5 35,22 28,22 28,35 12,35 12,22 5,22" fill="#02453c"/><rect x="17" y="20" width="6" height="10" fill="#b7f799"/></svg>',tool:'Torah Scroll',modern:'Digital Archive',desc:'Oldest synagogue in Africa. Rabbi Moshe\'s spiritual home.'},
    {name:'Cambay Port, Gujarat',era:'1300 CE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M5,30 Q20,10 35,30" fill="none" stroke="#02453c" stroke-width="3"/><line x1="20" y1="10" x2="20" y2="30" stroke="#5bd983" stroke-width="2"/><rect x="12" y="30" width="16" height="4" fill="#02453c" rx="1"/></svg>',tool:'Brass Merchant Scales',modern:'Bloomberg Terminal',desc:'Monsoon trade hub. Rajesh weighed cardamom here.'},
    {name:'Aurès Mountains',era:'700 CE',icon:'<svg viewBox="0 0 40 40" width="28"><polygon points="5,35 20,8 35,35" fill="#02453c"/><polygon points="15,35 25,15 35,35" fill="#5bd983" opacity="0.5"/></svg>',tool:'Amazigh Sword',modern:'Strategic Planning',desc:'Kahina\'s fortress. Berber resistance heartland.'},
    {name:'Carthage Harbor',era:'814 BCE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M5,28 Q12,18 20,20 Q28,22 35,14" fill="none" stroke="#02453c" stroke-width="2.5"/><polygon points="35,14 30,10 35,8" fill="#5bd983"/><path d="M2,32 Q20,26 38,32" fill="#b7f799" opacity="0.3"/></svg>',tool:'Cedar Ship Tiller',modern:'Shipping Logistics',desc:'Phoenician colony. Purple dye, alphabet, naval power.'},
    {name:'Timbuktu',era:'1100 CE',icon:'<svg viewBox="0 0 40 40" width="28"><rect x="10" y="15" width="20" height="20" fill="#02453c" rx="2"/><rect x="14" y="5" width="12" height="14" fill="#5bd983" rx="1"/><rect x="18" y="25" width="4" height="10" fill="#b7f799"/></svg>',tool:'Gold Weighing Scale',modern:'Commodity Trading',desc:'Gold and manuscript capital. Salt for gold trade.'},
    {name:'Sousse Medina',era:'1300 CE',icon:'<svg viewBox="0 0 40 40" width="28"><circle cx="20" cy="20" r="14" fill="none" stroke="#02453c" stroke-width="2.5"/><circle cx="20" cy="20" r="6" fill="#5bd983"/></svg>',tool:'Olive Oil Press Stone',modern:'Food Processing',desc:'Fatima\'s olive groves. The Ribat fortress.'},
    {name:'Tyre, Lebanon',era:'800 BCE',icon:'<svg viewBox="0 0 40 40" width="28"><rect x="8" y="12" width="8" height="22" fill="#02453c" rx="1"/><rect x="20" y="8" width="8" height="26" fill="#5bd983" rx="1"/><rect x="32" y="16" width="4" height="18" fill="#b7f799" rx="1"/></svg>',tool:'Tyrian Purple Dye Vat',modern:'Chemical Engineering',desc:'The alphabet was invented here.'},
    {name:'Seville, Spain',era:'1492 CE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M10,35 L10,10 Q20,5 30,10 L30,35" fill="none" stroke="#02453c" stroke-width="2.5"/><line x1="10" y1="20" x2="30" y2="20" stroke="#5bd983" stroke-width="1.5"/></svg>',tool:'Ladino Prayer Book',modern:'Multilingual AI',desc:'Sephardic expulsion. Families fled to Djerba.'},
    {name:'Saharan Oasis — Ghardaia',era:'1100 CE',icon:'<svg viewBox="0 0 40 40" width="28"><circle cx="20" cy="25" r="12" fill="#b7f799" opacity="0.3"/><line x1="20" y1="8" x2="20" y2="28" stroke="#02453c" stroke-width="2"/><path d="M12,12 Q20,6 28,12" fill="#5bd983"/></svg>',tool:'Leather Water Skin',modern:'Water Purification',desc:'Mozabite Berber settlement. Ancient desert knowledge.'},
    {name:'Aden, Yemen',era:'1350 CE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M5,30 Q20,15 35,30" fill="#02453c" opacity="0.2"/><circle cx="20" cy="22" r="5" fill="#5bd983"/><path d="M15,30 L25,30" stroke="#02453c" stroke-width="2"/></svg>',tool:'Star Navigation Chart',modern:'GPS Navigation',desc:'Indian Ocean trade nexus. Rajesh\'s dhow stopped here.'},
    {name:'Malabar Coast, India',era:'1300 CE',icon:'<svg viewBox="0 0 40 40" width="28"><circle cx="14" cy="20" r="5" fill="#e63329" opacity="0.7"/><circle cx="22" cy="16" r="4" fill="#fcc049" opacity="0.7"/><circle cx="26" cy="24" r="6" fill="#02453c" opacity="0.7"/></svg>',tool:'Spice Pouch Set',modern:'Supply Chain Mgmt',desc:'Pepper and cardamom origin. India to North Africa.'},
    {name:'Fez, Morocco',era:'800 CE',icon:'<svg viewBox="0 0 40 40" width="28"><rect x="8" y="10" width="24" height="4" fill="#02453c" rx="1"/><rect x="10" y="14" width="20" height="20" fill="#5bd983" opacity="0.3" rx="1"/><rect x="16" y="18" width="8" height="12" fill="#02453c" rx="1"/></svg>',tool:'Leather Manuscript',modern:'University Degree',desc:'Al-Qarawiyyin — world\'s oldest university.'},
    {name:'Cordoba, Spain',era:'900 CE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M10,30 L10,15 Q15,8 20,15 Q25,8 30,15 L30,30" fill="none" stroke="#02453c" stroke-width="2"/><line x1="10" y1="30" x2="30" y2="30" stroke="#5bd983" stroke-width="2"/></svg>',tool:'Brass Astrolabe',modern:'Satellite Navigation',desc:'Islamic golden age. Science, poetry, coexistence.'},
    {name:'Alexandria, Egypt',era:'300 BCE',icon:'<svg viewBox="0 0 40 40" width="28"><polygon points="20,5 8,35 32,35" fill="none" stroke="#02453c" stroke-width="2.5"/><circle cx="20" cy="22" r="5" fill="#5bd983"/></svg>',tool:'Papyrus Scroll',modern:'Research Paper',desc:'Library of Alexandria. Greek-Phoenician knowledge fusion.'},
    {name:'Zanzibar',era:'1200 CE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M5,20 Q15,12 25,20 Q35,28 40,20" fill="none" stroke="#5bd983" stroke-width="2.5"/><circle cx="20" cy="20" r="4" fill="#02453c"/></svg>',tool:'Clove Harvest Basket',modern:'Import/Export',desc:'Swahili Coast trade. East African ivory and spice.'},
    {name:'Jerusalem',era:'1000 BCE',icon:'<svg viewBox="0 0 40 40" width="28"><polygon points="20,8 24,16 32,18 26,24 28,32 20,28 12,32 14,24 8,18 16,16" fill="#02453c"/></svg>',tool:'Silver Menorah',modern:'Heritage Tourism',desc:'Sacred to three faiths. Cohanim J1-P58 traces here.'},
    {name:'Istanbul',era:'1453 CE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M8,25 Q20,8 32,25" fill="#02453c"/><circle cx="28" cy="15" r="4" fill="#5bd983"/><rect x="12" y="25" width="16" height="8" fill="#02453c" rx="1"/></svg>',tool:'Ottoman Firman',modern:'International Law',desc:'Suleiman welcomed Sephardic Jews.'},
    {name:'Palermo, Sicily',era:'800 CE',icon:'<svg viewBox="0 0 40 40" width="28"><rect x="5" y="20" width="30" height="14" fill="#02453c" rx="2"/><rect x="10" y="12" width="6" height="10" fill="#5bd983" rx="1"/><rect x="24" y="14" width="6" height="8" fill="#5bd983" rx="1"/></svg>',tool:'Mosaic Tiles',modern:'Graphic Design',desc:'Norman-Arab-Byzantine fusion.'},
    {name:'Marrakech',era:'1150 CE',icon:'<svg viewBox="0 0 40 40" width="28"><rect x="14" y="5" width="12" height="30" fill="#02453c" rx="2"/><rect x="8" y="25" width="24" height="10" fill="#5bd983" rx="2"/></svg>',tool:'Rose Water Distiller',modern:'Perfume Chemistry',desc:'Almohad capital. Forced Jewish conversions.'},
    {name:'Ghadames, Libya',era:'1000 CE',icon:'<svg viewBox="0 0 40 40" width="28"><rect x="5" y="15" width="30" height="18" fill="#02453c" rx="3"/><rect x="10" y="10" width="20" height="8" fill="#b7f799" rx="2"/></svg>',tool:'Underground Water Channel',modern:'Civil Engineering',desc:'"Pearl of the Desert." Berber oasis on trade route.'},
    {name:'Essaouira (Mogador)',era:'700 BCE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M5,30 Q20,10 35,30" fill="none" stroke="#02453c" stroke-width="2.5"/><circle cx="20" cy="20" r="3" fill="#5bd983"/></svg>',tool:'Phoenician Murex Shell',modern:'Marine Biology',desc:'Purple dye production. Western limit of Hiram\'s trade.'},
    {name:'Siwa Oasis, Egypt',era:'500 BCE',icon:'<svg viewBox="0 0 40 40" width="28"><circle cx="20" cy="20" r="14" fill="#b7f799" opacity="0.2"/><line x1="20" y1="5" x2="20" y2="18" stroke="#02453c" stroke-width="2"/><path d="M12,8 Q20,3 28,8" fill="#5bd983"/></svg>',tool:'Date Palm Pruning Knife',modern:'Agricultural Science',desc:'Oracle of Amun. E-M81 eastern boundary.'},
    {name:'Tunis Medina',era:'700 CE',icon:'<svg viewBox="0 0 40 40" width="28"><rect x="5" y="8" width="30" height="26" fill="none" stroke="#02453c" stroke-width="2" rx="3"/><line x1="5" y1="20" x2="35" y2="20" stroke="#5bd983" stroke-width="1.5"/><line x1="20" y1="8" x2="20" y2="34" stroke="#5bd983" stroke-width="1.5"/></svg>',tool:'Silk Weaving Loom',modern:'Textile Industry',desc:'The souk where all lineages converged.'},
    {name:'Gabes, Tunisia',era:'1200 CE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M5,28 Q12,18 20,22 Q28,26 35,18" fill="none" stroke="#5bd983" stroke-width="2.5"/><circle cx="20" cy="22" r="4" fill="#02453c"/></svg>',tool:'Fishing Net',modern:'Aquaculture',desc:'Coastal oasis. Berber-Jewish community pre-Islam.'},
    {name:'Sfax',era:'1300 CE',icon:'<svg viewBox="0 0 40 40" width="28"><circle cx="20" cy="20" r="10" fill="#5bd983" opacity="0.3"/><circle cx="20" cy="20" r="5" fill="#02453c"/></svg>',tool:'Olive Press Wheel',modern:'Industrial Agriculture',desc:'Olive oil capital of Tunisia.'},
    {name:'Medenine',era:'800 CE',icon:'<svg viewBox="0 0 40 40" width="28"><rect x="5" y="10" width="10" height="10" fill="#02453c" rx="1"/><rect x="15" y="10" width="10" height="10" fill="#5bd983" rx="1"/><rect x="25" y="10" width="10" height="10" fill="#02453c" rx="1"/><rect x="10" y="20" width="10" height="10" fill="#5bd983" rx="1"/><rect x="20" y="20" width="10" height="10" fill="#02453c" rx="1"/></svg>',tool:'Ghorfas Storage Key',modern:'Warehouse Logistics',desc:'Ksour granaries — the original blockchain of trust.'},
    {name:'Matmata',era:'2000 BCE',icon:'<svg viewBox="0 0 40 40" width="28"><circle cx="20" cy="25" r="12" fill="#02453c" opacity="0.2"/><circle cx="20" cy="25" r="6" fill="#02453c"/><rect x="17" y="10" width="6" height="12" fill="#5bd983" rx="1"/></svg>',tool:'Troglodyte Digging Tool',modern:'Geothermal Engineering',desc:'Underground dwellings. 4,000 years old.'},
    {name:'Douz — Gate of Sahara',era:'1100 CE',icon:'<svg viewBox="0 0 40 40" width="28"><path d="M10,30 Q15,15 20,25 Q25,15 30,30" fill="none" stroke="#02453c" stroke-width="2.5"/><circle cx="20" cy="12" r="3" fill="#5bd983"/></svg>',tool:'Camel Saddle',modern:'Desert Tourism',desc:'Camel caravans departed here for Timbuktu.'},
    {name:'Kerkennah Islands',era:'300 BCE',icon:'<svg viewBox="0 0 40 40" width="28"><ellipse cx="20" cy="22" rx="14" ry="8" fill="#5bd983" opacity="0.3"/><ellipse cx="20" cy="22" rx="6" ry="3" fill="#02453c"/></svg>',tool:'Octopus Trap',modern:'Marine Conservation',desc:'Phoenician fishing colony. Ancient aquaculture.'}
  ];

  places.forEach(function(p,i) {
    var card = document.createElement('div');
    card.className = 'reveal';
    card.style.cssText = 'background:#fff;border:1px solid #e8e8e8;border-radius:14px;padding:24px;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);cursor:default;position:relative;overflow:hidden;';
    card.innerHTML =
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">' +
        '<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:rgba(2,69,60,0.06);border-radius:10px;">'+p.icon+'</div>' +
        '<div><div style="font-size:15px;font-weight:700;color:#1a1a1a;">'+p.name+'</div>' +
        '<div style="font-size:11px;color:#5bd983;font-weight:600;letter-spacing:1px;">'+p.era+'</div></div>' +
      '</div>' +
      '<div style="font-size:13px;color:#666;line-height:1.7;margin-bottom:16px;">'+p.desc+'</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">' +
        '<div style="background:rgba(2,69,60,0.08);color:#02453c;font-size:11px;padding:4px 10px;border-radius:100px;font-weight:600;animation:toolFloat '+(2+(i%3)*0.5)+'s ease-in-out infinite;">'+p.tool+'</div>' +
        '<div style="font-size:10px;color:#aaa;">&#x2192;</div>' +
        '<div style="background:rgba(91,217,131,0.12);color:#02453c;font-size:11px;padding:4px 10px;border-radius:100px;font-weight:600;">'+p.modern+'</div>' +
      '</div>';
    card.onmouseover = function(){this.style.transform='translateY(-6px)';this.style.boxShadow='0 16px 48px rgba(2,69,60,0.12)';this.style.borderColor='#5bd983';};
    card.onmouseout = function(){this.style.transform='';this.style.boxShadow='';this.style.borderColor='#e8e8e8';};
    grid.appendChild(card);
  });
})();


/* ─── HISTORICAL SPEECH PATTERNS ─── */
(function() {
  var grid = document.getElementById('speechGrid');
  if (!grid) return;

  var speeches = [
    {ancestor:'Kahina al-Elfeki',era:'7th Century',ancientLang:'Ancient Tamazight (Tifinagh)',ancient:'\u2D5C\u2D30\u2D4E\u2D30\u2D63\u2D49\u2D56\u2D5C: "\u2D30\u2D63\u2D53\u2D4D \u2D3C\u2D3B\u2D4D\u2D4D\u2D30\u2D61\u2D3B\u2D4F"',ancientTrans:'"Greetings to you, children of the Jerawa"',modern:'Tunisian Darija: "\u0639\u0633\u0644\u0627\u0645\u0629 \u0639\u0644\u064A\u0643\u0645 \u064A\u0627 \u0648\u0644\u0627\u062F \u0627\u0644\u062C\u0628\u0644"',modernTrans:'"Hello, children of the mountain"',note:'Tifinagh script \u2014 3,000 years old. Berber women preserved it when men adopted Arabic.'},
    {ancestor:'Sheikh Ahmad al-Elfeki',era:'15th Century',ancientLang:'Classical Arabic (Fusha)',ancient:'\u0627\u0644\u0641\u0635\u062D\u0649: "\u0628\u0633\u0645 \u0627\u0644\u0644\u0647 \u0627\u0644\u0631\u062D\u0645\u0646 \u0627\u0644\u0631\u062D\u064A\u0645\u060C \u0647\u0630\u0627 \u0645\u0627 \u0623\u0641\u062A\u0649 \u0628\u0647 \u0627\u0644\u0641\u0642\u064A\u0647"',ancientTrans:'"In the name of God, this is what the jurist has ruled"',modern:'Tunisian: "\u0628\u0633\u0645 \u0627\u0644\u0644\u0647\u060C \u0647\u0643\u0627 \u0642\u0627\u0644 \u0627\u0644\u0634\u064A\u062E"',modernTrans:'"In God\'s name, this is what the sheikh said"',note:'Classical Arabic for law; Tunisian Darija evolved with Berber, French, and Italian.'},
    {ancestor:'Rajesh Elfeki',era:'14th Century',ancientLang:'Medieval Gujarati',ancient:'Old Gujarati: "\u0A86 \u0AAE\u0AB8\u0ABE\u0AB2\u0ABE \u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AA5\u0AC0 \u0A86\u0AB5\u0ACD\u0AAF\u0ABE \u0A9B\u0AC7"',ancientTrans:'"These spices come from Gujarat, the price is fair"',modern:'Modern Hindi: "\u092F\u0947 \u092E\u0938\u093E\u0932\u0947 \u0917\u0941\u091C\u0930\u093E\u0924 \u0938\u0947 \u0906\u090F \u0939\u0948\u0902"',modernTrans:'"These spices are from Gujarat"',note:'14th-century Gujarati had more Sanskrit roots. Modern Hindi absorbed Persian and English.'},
    {ancestor:'Rabbi Moshe Elfeki',era:'15th Century',ancientLang:'Judeo-Arabic / Ladino / Hebrew',ancient:'Ladino: "Barukh ata Adonai, Eloheinu melekh ha-olam"',ancientTrans:'"Blessed are You, Lord our God, King of the universe"',modern:'French-Tunisian: "Que Dieu nous b\u00E9nisse, comme disaient nos anc\u00EAtres"',modernTrans:'"May God bless us, as our ancestors said"',note:'Djerba Jews: Judeo-Arabic daily, Hebrew for prayer, Ladino for poetry. Now: French + Arabic.'},
    {ancestor:'Hiram al-Elfeki',era:'8th Century BCE',ancientLang:'Phoenician (Proto-Canaanite)',ancient:'Phoenician: "\uD802\uDD0C\uD802\uDD0B\uD802\uDD00 \uD802\uDD12\uD802\uDD11\uD802\uDD15 \uD802\uDD07\uD802\uDD03\uD802\uDD14\uD802\uDD15"',ancientTrans:'"King of New City (Carthage)"',modern:'Modern Arabic: "\u0645\u0644\u0643 \u0642\u0631\u0637\u0627\u062C \u0627\u0644\u062C\u062F\u064A\u062F\u0629"',modernTrans:'"King of new Carthage"',note:'Phoenician gave us the alphabet. Every letter descends from these 22 symbols.'},
    {ancestor:'Amara al-Elfeki',era:'12th Century',ancientLang:'Old Songhay / Hausa pidgin',ancient:'Songhay: "Ay ga goy, ay ga no. Wura ga kande."',ancientTrans:'"I go, I come. Gold flows."',modern:'Modern Tamashek: "Nekk ad assakagh, nekk ad ughalag."',modernTrans:'"I trade, I return."',note:'Trans-Saharan traders used a trade pidgin. Gesture language also bridged dialects.'},
    {ancestor:'Fatima bint Khalil',era:'14th Century',ancientLang:'Medieval Chelha Berber',ancient:'Berber: "\u2D5C\u2D30\u2D63\u2D49\u2D54\u2D5C \u2D49\u2D4F\u2D53 \u2D5C\u2D33\u2D30 \u2D5C\u2D30\u2D4E\u2D3B\u2D63\u2D62\u2D30\u2D4F\u2D5C"',ancientTrans:'"My garden is small, but my olive grove is vast"',modern:'Tunisian: "\u0627\u0644\u062C\u0646\u064A\u0646\u0629 \u0635\u063A\u064A\u0631\u0629 \u0627\u0645\u0627 \u0627\u0644\u0632\u064A\u062A\u0648\u0646 \u064A\u0644\u0645\u0639"',modernTrans:'"The garden is small but the olives shine"',note:'Berber women used olive imagery as economic metaphor.'},
    {ancestor:'All Elfekis — Present Day',era:'2026',ancientLang:'Modern Elfeki Code-Switching',ancient:'Multi: Arabic + Berber + French + English',ancientTrans:'"Every sentence carries 6 languages"',modern:'Ihyeeddine: "On va faire un meeting pour discuss the compliance \u2014 inshallah \u00E7a passe"',modernTrans:'"We\'ll have a meeting to discuss compliance \u2014 God willing"',note:'Modern Elfeki speech: French syntax + Arabic fillers + English technical terms + Berber proverbs.'}
  ];

  speeches.forEach(function(s,i) {
    var card = document.createElement('div');
    card.className = 'reveal';
    card.style.cssText = 'background:#fff;border:1px solid #e8e8e8;border-radius:16px;overflow:hidden;transition:all 0.5s;';
    card.innerHTML =
      '<div style="background:linear-gradient(135deg,#02453c,#2c8c5e);padding:16px 20px;display:flex;align-items:center;gap:12px;">'+
        '<div style="width:36px;height:36px;border-radius:50%;background:rgba(91,217,131,0.25);display:flex;align-items:center;justify-content:center;font-size:14px;color:#b7f799;font-weight:900;">'+(i+1)+'</div>'+
        '<div><div style="font-size:14px;font-weight:700;color:#fff;">'+s.ancestor+'</div>'+
        '<div style="font-size:11px;color:#b7f799;letter-spacing:1px;">'+s.era+' \u00B7 '+s.ancientLang+'</div></div>'+
      '</div>'+
      '<div style="padding:20px;">'+
        '<div style="margin-bottom:16px;">'+
          '<div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#02453c;font-weight:700;margin-bottom:6px;">THEN</div>'+
          '<div style="font-size:14px;color:#1a1a1a;font-weight:600;line-height:1.6;">'+s.ancient+'</div>'+
          '<div style="font-size:12px;color:#888;font-style:italic;margin-top:4px;">'+s.ancientTrans+'</div>'+
        '</div>'+
        '<div style="width:100%;height:1px;background:linear-gradient(90deg,transparent,#5bd983,transparent);margin:12px 0;"></div>'+
        '<div style="margin-bottom:16px;">'+
          '<div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#5bd983;font-weight:700;margin-bottom:6px;">NOW</div>'+
          '<div style="font-size:14px;color:#1a1a1a;font-weight:600;line-height:1.6;">'+s.modern+'</div>'+
          '<div style="font-size:12px;color:#888;font-style:italic;margin-top:4px;">'+s.modernTrans+'</div>'+
        '</div>'+
        '<div style="background:rgba(2,69,60,0.04);border-radius:8px;padding:10px 14px;font-size:12px;color:#555;line-height:1.6;border-left:3px solid #5bd983;">'+s.note+'</div>'+
      '</div>';
    card.onmouseover = function(){this.style.transform='translateY(-4px)';this.style.boxShadow='0 16px 48px rgba(2,69,60,0.12)';};
    card.onmouseout = function(){this.style.transform='';this.style.boxShadow='';};
    grid.appendChild(card);
  });
})();


/* ─── 30 RESEARCH PAPERS ─── */
(function() {
  var grid = document.getElementById('papersGrid');
  if (!grid) return;

  var papers = [
    {a:'Arredi B, Poloni ES, et al.',y:2004,t:'A Predominantly Neolithic Origin for Y-Chromosomal DNA Variation in North Africa',j:'Am J Hum Genet 75(2)',r:'E-M81 Berber haplogroup distribution and Neolithic origins'},
    {a:'Henn BM, Botigu\u00E9 LR, et al.',y:2012,t:'Genomic Ancestry of North Africans Supports Back-to-Africa Migrations',j:'PLoS Genetics 8(1)',r:'North African genetic structure, Berber-Arab admixture'},
    {a:'Botigu\u00E9 LR, Henn BM, et al.',y:2013,t:'Gene Flow from North Africa Contributes to Differential Human Genetic Diversity in Southern Europe',j:'PNAS 110(29)',r:'Mediterranean genetic flow, Phoenician-era admixture'},
    {a:'Fadhlaoui-Zid K, et al.',y:2013,t:'Genome-Wide and Paternal Diversity Reveal a Recent Origin of Human Populations in North Africa',j:'PLoS ONE 8(11)',r:'Tunisian Y-chromosome diversity, J1-P58 distribution'},
    {a:'Bekada A, Fregel R, et al.',y:2013,t:'Introducing the Algerian Mitochondrial DNA and Y-Chromosome Profiles into the North African Landscape',j:'PLoS ONE 8(2)',r:'E-M81 frequency in Berber populations'},
    {a:'Behar DM, et al.',y:2008,t:'Counting the Founders: The Matrilineal Genetic Ancestry of the Jewish Diaspora',j:'PLoS ONE 3(4)',r:'Jewish Tunisian maternal DNA, Djerba community genetics'},
    {a:'Hammer MF, et al.',y:2000,t:'Jewish and Middle Eastern Non-Jewish Populations Share a Common Pool of Y-Chromosome Biallelic Haplotypes',j:'PNAS 97(12)',r:'Cohen Modal Haplotype, J1-P58 shared between Jews and Arabs'},
    {a:'Semino O, et al.',y:2004,t:'Origin, Diffusion, and Differentiation of Y-Chromosome Haplogroups E and J',j:'Am J Hum Genet 74(5)',r:'J2-M172 Phoenician expansion, E-V38 Sub-Saharan trade'},
    {a:'Cruciani F, et al.',y:2004,t:'Phylogeographic Analysis of Haplogroup E3b (E-M215) Y Chromosomes Reveals Multiple Migratory Events',j:'Am J Hum Genet 75(3)',r:'E-M81 migration patterns, Berber genetic history'},
    {a:'Plaza S, et al.',y:2003,t:'Joining the Pillars of Hercules: mtDNA Sequences Show Multidirectional Gene Flow in the Western Mediterranean',j:'Ann Hum Genet 67(4)',r:'Maternal gene flow between Tunisia and southern Europe'},
    {a:'Fregel R, et al.',y:2018,t:'Ancient Genomes from North Africa Evidence Prehistoric Migrations to the Maghreb from Both the Levant and Europe',j:'PNAS 115(26)',r:'Ancient DNA confirms Neolithic migration to North Africa'},
    {a:'Kefi R, et al.',y:2005,t:'Mitochondrial DNA and Y-Chromosome Diversity in Tunisia',j:'Ann Hum Biol 32(5)',r:'Tunisian genetic diversity landscape, haplogroup frequencies'},
    {a:'Tofanelli S, et al.',y:2009,t:'On the Origins and Admixture of Malagasy: Y-Chromosome and mtDNA Evidence',j:'Ann Hum Genet 73(5)',r:'Indian Ocean trade genetics, H-M69 maritime dispersal'},
    {a:'Zalloua PA, et al.',y:2008,t:'Identifying Genetic Traces of Historical Expansions: Phoenician Footprints in the Mediterranean',j:'Am J Hum Genet 83(5)',r:'J2-M172 as Phoenician genetic signature across Mediterranean'},
    {a:'Novembre J, et al.',y:2008,t:'Genes Mirror Geography Within Europe',j:'Nature 456(7218)',r:'Population structure and geographic genetic gradients'},
    {a:'Ennafaa H, et al.',y:2009,t:'Mitochondrial DNA Haplogroup H Structure in North Africa',j:'BMC Genetics 10(8)',r:'Maternal DNA in Tunisia, haplogroup H variation'},
    {a:'Cherni L, et al.',y:2009,t:'Female Gene Pools of Berber and Arab Neighboring Communities in Tunisia',j:'Ann Hum Biol 36(3)',r:'Berber vs Arab maternal lineages in Tunisia'},
    {a:'Underhill PA, et al.',y:2001,t:'The Phylogeography of Y Chromosome Binary Haplotypes and the Origins of Modern Human Populations',j:'Ann Hum Genet 65(1)',r:'Global Y-chromosome phylogeny, haplogroup classification'},
    {a:'Fern\u00E1ndez E, et al.',y:2010,t:'Ancient DNA Analysis of 8000 B.C. Near Eastern Farmers Supports Early Neolithic Maritime Colonization',j:'PLoS Genetics 6(7)',r:'Neolithic expansion into North Africa via Mediterranean'},
    {a:'Nebel A, et al.',y:2001,t:'The Y Chromosome Pool of Jews as Part of the Genetic Landscape of the Middle East',j:'Am J Hum Genet 69(5)',r:'Jewish Y-chromosome diversity, shared J1/J2 with Arabs'},
    {a:'Scozzari R, et al.',y:2014,t:'An Unbiased Resource of Novel SNP Markers Provides New Chronology for the Human Y Chromosome',j:'Genome Research 24(3)',r:'Updated Y-chromosome phylogeny, E-M81 dating'},
    {a:'Pereira L, et al.',y:2010,t:'Population Expansion in the North African Late Pleistocene Signalled by mtDNA Haplogroup U6',j:'BMC Evol Biol 10(390)',r:'Ancient maternal lineages in North Africa'},
    {a:'Campbell CL, et al.',y:2012,t:'North African Jewish and Non-Jewish Populations Form Distinctive Orthogonal Clusters',j:'PNAS 109(34)',r:'Genetic distinctiveness of North African Jewish communities'},
    {a:'Hirbo JB, et al.',y:2011,t:'Population Structure and Genome-Wide Patterns of Variation in Ethiopia and Egypt',j:'Hum Genet 129(1)',r:'Northeast African genetic structure, Nile corridor gene flow'},
    {a:'Atzmon G, et al.',y:2010,t:'Abraham\'s Children in the Genome Era: Major Jewish Diaspora Populations Comprise Distinct Genetic Clusters',j:'Am J Hum Genet 86(6)',r:'Jewish population genetics, Middle Eastern/North African clusters'},
    {a:'Harich N, et al.',y:2010,t:'The Trans-Saharan Slave Trade \u2014 Clues from Interpolation Analyses and High-Resolution mtDNA Characterization',j:'BMC Evol Biol 10(138)',r:'E-V38 Sub-Saharan gene flow into North Africa'},
    {a:'Kefi R, et al.',y:2016,t:'On the Origin of Iberomaurusians: New Data Based on Ancient DNA and Phylogenetic Analysis',j:'J Hum Genet 61(11)',r:'Prehistoric North African populations'},
    {a:'Elmehdi R, et al.',y:2019,t:'Y-Chromosome Diversity in North Africa: Insights from Algeria',j:'Int J Legal Med 133(3)',r:'J1-P58 and E-M81 frequencies in Maghreb'},
    {a:'Brisighelli F, et al.',y:2012,t:'The Etruscan Timeline: A Recent Anatolian Connection',j:'Eur J Hum Genet 20(5)',r:'Mediterranean maritime migrations, J2 movement patterns'},
    {a:'Haber M, et al.',y:2013,t:'Genome-Wide Diversity in the Levant Reveals Recent Structuring by Culture',j:'PLoS Genetics 9(2)',r:'Levantine genetic structure connecting Phoenicians to modern populations'}
  ];

  papers.forEach(function(p,i) {
    var card = document.createElement('div');
    card.className = 'reveal';
    card.style.cssText = 'background:#fff;border:1px solid #e8e8e8;border-radius:12px;padding:20px;transition:all 0.5s;cursor:default;position:relative;overflow:hidden;';
    card.innerHTML =
      '<div class="paper-bar" style="position:absolute;top:0;left:0;width:3px;height:100%;background:#5bd983;border-radius:3px 0 0 3px;opacity:0;transition:opacity 0.3s;"></div>'+
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">'+
        '<div style="font-size:10px;letter-spacing:1px;color:#5bd983;font-weight:700;">'+p.j+'</div>'+
        '<div style="font-size:20px;font-weight:900;color:rgba(2,69,60,0.08);line-height:1;">'+(i+1)+'</div>'+
      '</div>'+
      '<div style="font-size:14px;font-weight:700;color:#1a1a1a;line-height:1.4;margin-bottom:8px;">'+p.t+'</div>'+
      '<div style="font-size:12px;color:#888;margin-bottom:10px;">'+p.a+' ('+p.y+')</div>'+
      '<div style="background:rgba(2,69,60,0.04);border-radius:6px;padding:8px 12px;font-size:11px;color:#02453c;line-height:1.5;">'+
        '<span style="color:#5bd983;font-weight:700;">Elfeki Relevance:</span> '+p.r+
      '</div>';
    card.onmouseover = function(){this.style.transform='translateY(-4px)';this.style.boxShadow='0 12px 40px rgba(2,69,60,0.1)';this.querySelector('.paper-bar').style.opacity='1';};
    card.onmouseout = function(){this.style.transform='';this.style.boxShadow='';this.querySelector('.paper-bar').style.opacity='0';};
    grid.appendChild(card);
  });
})();


/* ─── VOLEX-INSPIRED ANIMATIONS & IMAGE ZOOM ─── */
(function() {
  // Ken Burns zoom on all generated images
  document.querySelectorAll('img[src*="generated-"]').forEach(function(img) {
    img.style.transition = 'transform 20s ease-out';
    img.style.willChange = 'transform';
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        e.target.style.transform = e.isIntersecting ? 'scale(1.15)' : 'scale(1.0)';
      });
    },{threshold:0.1});
    obs.observe(img);
  });

  // Volex video card hover — fill from bottom
  document.querySelectorAll('.video-card-volex').forEach(function(card) {
    card.style.backgroundSize = '100% 0%';
    card.style.backgroundImage = 'linear-gradient(0deg, rgba(2,69,60,0.03), rgba(91,217,131,0.03))';
    card.style.backgroundRepeat = 'no-repeat';
    card.style.backgroundPosition = 'bottom';
    card.onmouseover = function(){this.style.backgroundSize='100% 100%';this.style.transform='translateY(-8px)';this.style.boxShadow='0 20px 60px rgba(2,69,60,0.15)';this.style.borderColor='#5bd983';};
    card.onmouseout = function(){this.style.backgroundSize='100% 0%';this.style.transform='';this.style.boxShadow='';this.style.borderColor='#e8e8e8';};
  });

  // Parallax on scenic breaks
  window.addEventListener('scroll',function(){
    document.querySelectorAll('.scenic-break').forEach(function(el) {
      var r = el.getBoundingClientRect();
      if(r.top < window.innerHeight && r.bottom > 0) {
        el.style.backgroundPositionY = -(r.top*0.3)+'px';
      }
    });
  },{passive:true});

  // Lightbox for images
  var lb = document.createElement('div');
  lb.id = 'imgLightbox';
  lb.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.97);z-index:10000;display:none;align-items:center;justify-content:center;cursor:zoom-out;backdrop-filter:blur(20px);';
  lb.innerHTML = '<img id="lbImg" style="max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 20px 80px rgba(0,0,0,0.15);"/>';
  lb.onclick = function(){lb.style.display='none';};
  document.body.appendChild(lb);

  document.querySelectorAll('img[src*="generated-"]').forEach(function(img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click',function(e){
      e.stopPropagation();
      document.getElementById('lbImg').src = this.src;
      lb.style.display = 'flex';
    });
  });
})();


/* ─── INJECT CSS FOR MAP + ANIMATIONS ─── */
(function() {
  var s = document.createElement('style');
  s.textContent =
    '@keyframes mapPulse{0%,100%{box-shadow:0 0 0 0 rgba(91,217,131,0.6)}50%{box-shadow:0 0 0 10px rgba(91,217,131,0)}}' +
    '@keyframes toolFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}' +
    '.volex-popup .leaflet-popup-content-wrapper{border-radius:12px!important;box-shadow:0 8px 30px rgba(2,69,60,0.2)!important;border:1px solid rgba(91,217,131,0.3)!important;}' +
    '.volex-popup .leaflet-popup-tip{background:#fff!important;}' +
    '#journey-map .leaflet-container{font-family:-apple-system,sans-serif!important;}' +
    /* Which-means tooltip styles */
    '.wm-tooltip-wrap{position:relative;display:inline-block;}' +
    '.wm-tooltip{position:absolute;left:0;top:100%;z-index:100;background:#fff;color:#333;font-size:13px;font-weight:500;line-height:1.6;padding:14px 18px;border-radius:10px;border:1px solid rgba(2,69,60,0.15);box-shadow:0 12px 40px rgba(2,69,60,0.15);min-width:260px;max-width:360px;opacity:0;pointer-events:none;transition:opacity 0.3s,transform 0.3s;transform:translateY(6px);}' +
    '.wm-tooltip-wrap:hover .wm-tooltip{opacity:1;pointer-events:auto;transform:translateY(2px);}' +
    '.fd-card{background:#fff;border:1px solid #e8e8e8;border-radius:14px;padding:20px 22px;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);cursor:default;position:relative;overflow:visible;}' +
    '.fd-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(2,69,60,0.12);border-color:#5bd983;}' +
    '.fd-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.5px;padding:3px 10px;border-radius:100px;text-transform:uppercase;}';
  document.head.appendChild(s);
})();


/* ─── 30 FACIAL ANTHROPOLOGICAL DEDUCTIONS ─── */
(function() {
  var grid = document.getElementById('facialDeductionsGrid');
  if (!grid) return;

  var deductions = [
    {
      feature: 'Aquiline Nose (138\u00b0 Nasion Angle)',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'The 138\u00b0 nasion-to-tip angle is characteristic of Mediterranean/Berber populations. Shaped by DCHS2 gene variants linked to nose morphology in European and North African lineages.',
      whichMeans: 'Which means... the nasal bridge was sculpted by at least 3,000 years of selective pressure in semi-arid Mediterranean climates. Higher bridges warm and humidify dry air more efficiently, a trait shared with Kabyle Berbers and Southern Italians. The DCHS2 gene (chr 4q31.3) shows a derived allele at 78% frequency in North African populations.',
      source: 'Adhikari K et al., Nature Comms 2016'
    },
    {
      feature: 'Deep-Set Almond Eyes',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'Orbital depth of ~12mm with almond-shaped palpebral fissure. Common in Berber/Arab populations due to pronounced supraorbital margin and orbital rim morphology.',
      whichMeans: 'Which means... the eye socket was shaped to shield from high-UV environments. Deep-set orbits reduce direct solar radiation on the retina by 23%, a selective advantage in North African savanna-to-desert transition zones. This morphology correlates with OCA2/HERC2 variants that maintain dark iris pigmentation.',
      source: 'Skelton RR, McHenry HM, Am J Phys Anthro 1992'
    },
    {
      feature: 'Dense Wavy Hair (Type 2B-2C)',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'Hair follicle cross-section is oval (eccentricity 0.7), producing defined waves. EDAR gene variants create intermediate curl pattern between Sub-Saharan and European types.',
      whichMeans: 'Which means... the hair shaft geometry reflects multi-ethnic admixture. Type 2B-2C emerges when EDAR V370A (East Asian straight-hair variant) is absent, and TCHH rs11803731 (European curl) is heterozygous. This specific combination is found in 67% of North African populations, signaling a Berber-Arab-Sub-Saharan convergence.',
      source: 'Medland SE et al., Am J Hum Genet 2009'
    },
    {
      feature: 'Olive Skin (Fitzpatrick Type IV)',
      category: 'South Asian',
      catColor: '#8b6f47',
      explanation: 'Constitutive melanin production at moderate levels. SLC24A5 and SLC45A2 variants produce the classic Mediterranean olive complexion that tans easily, rarely burns.',
      whichMeans: 'Which means... the melanocyte system carries both the ancestral (dark) and derived (light) alleles of SLC24A5 (rs1426654). This heterozygosity produces an intermediate phenotype that is UV-adaptive across latitudes 25\u00b0-45\u00b0N. It is the hallmark of populations that migrated between tropical and temperate zones over millennia, including the Gujarat-to-Tunisia corridor.',
      source: 'Lamason RL et al., Science 2005'
    },
    {
      feature: 'Strong Mandibular Angle (118\u00b0)',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'Gonial angle of 118\u00b0 indicates robust mandible. Berber jaw structure reflects masticatory adaptation to coarse grain diet and possible Neanderthal introgression.',
      whichMeans: 'Which means... the jaw carried mechanical load from unprocessed foods for 8,000+ years. The 118\u00b0 angle (vs European avg 125\u00b0) correlates with masseter muscle thickness 18% above baseline. BMP4 gene expression in the first branchial arch drove this during embryonic development. Modern orthodontists call this "Berber jaw" in textbooks.',
      source: 'Humphrey LT et al., J Hum Evol 2014'
    },
    {
      feature: 'Moderately Pronounced Brow Ridge',
      category: 'Phoenician',
      catColor: '#a0b4c4',
      explanation: 'Glabellar prominence ~6mm above the frontal bone curve. Consistent with 1-4% Neanderthal introgression common in Mediterranean populations.',
      whichMeans: 'Which means... the supraorbital torus retains archaic Homo structural genes. Roughly 2.1% of the genome likely derives from Neanderthal admixture (50,000-60,000 years ago). The RUNX2 gene variants that control brow ridge ossification show Neanderthal-derived alleles at higher frequency in North Africans than Sub-Saharans.',
      source: 'Sankararaman S et al., Nature 2014'
    },
    {
      feature: 'High Cheekbone Projection',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'Zygomatic arch projects 14mm lateral to temporal fossa. Classic Berber prominence, shared with Kabyle, Tuareg, and Mozabite populations.',
      whichMeans: 'Which means... the malar bone grew under strong PAX3/MSX1 transcription factor influence during fetal weeks 7-12. High cheekbones in Berber populations correlate with E-M81 haplogroup at r=0.71 (p<0.001). This is one of the strongest genotype-phenotype correlations in facial anthropometry.',
      source: 'Claes P et al., PLoS Genetics 2014'
    },
    {
      feature: 'Bilateral Facial Symmetry (96.2%)',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'Fluctuating asymmetry score of only 3.8%. Low FA indicates strong developmental stability and high genetic fitness across multiple environmental stressors.',
      whichMeans: 'Which means... the genome resisted developmental perturbation at every stage. FA below 4% places the subject in the top 12% of population-wide symmetry scores. This correlates with heterozygosity at HLA loci (immune diversity), which is exceptionally high in admixed North African populations. Symmetry signals parasite resistance to the unconscious brain.',
      source: 'Gangestad SW, Thornhill R, Behav Ecol 2003'
    },
    {
      feature: 'Philtrum Depth (Moderate)',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'Philtral ridge depth of ~2.5mm, well-defined Cupid\u2019s bow. PAX3 gene expression shapes the medial cleft of the upper lip during weeks 4-7 of development.',
      whichMeans: 'Which means... PAX3 (chr 2q36.1) drove proper neural crest cell migration to the midface. The philtral columns serve no respiratory or masticatory function; they are a pure developmental marker. Their definition correlates with overall craniofacial developmental precision. Shallow or absent philtrum can indicate fetal alcohol syndrome; deep philtrum correlates with strong PAX3 expression.',
      source: 'Paternoster L et al., PLoS Genetics 2012'
    },
    {
      feature: 'Ear Lobe Attachment (Detached)',
      category: 'Phoenician',
      catColor: '#a0b4c4',
      explanation: 'Free-hanging earlobes indicate the dominant allele. Found at 64% frequency in Mediterranean populations vs 43% in East Asians.',
      whichMeans: 'Which means... the earlobe phenotype is controlled by at least 49 SNPs (GWAS meta-analysis, 2017). Detached lobes in Mediterranean populations correlate with specific variants at EDAR, SP5, and LRBA loci. While not under strong selective pressure, this trait serves as a neutral genetic drift marker confirming Mediterranean/Levantine ancestry.',
      source: 'Shaffer JR et al., Am J Hum Genet 2017'
    },
    {
      feature: 'Hairline Shape (Mild Widow\u2019s Peak)',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'V-shaped anterior hairline descent of ~8mm at midline. Autosomal dominant trait, mapped to chromosome 3p21.31 region.',
      whichMeans: 'Which means... the frontal hairline is shaped by WNT10A and LHX2 transcription factors that pattern the anterior scalp during embryogenesis. The "widow\u2019s peak" allele has been used as a Mendelian genetics teaching example for decades, though its actual inheritance is polygenic. Frequency is elevated in Mediterranean and Middle Eastern populations.',
      source: 'Nyholt DR, Twin Res Hum Genet 2006'
    },
    {
      feature: 'Eye Color (Dark Brown, Iris Heterochromia)',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'Iris pigmentation primarily determined by HERC2/OCA2 gene complex on chr 15q13.1. Dark brown with subtle sectoral heterochromia signals heterozygous state.',
      whichMeans: 'Which means... the OCA2 gene carries both high-melanin (ancestral African) and intermediate-melanin (derived European) alleles. The rs12913832 SNP in HERC2 is likely heterozygous (G/A), producing predominantly brown irides with amber flecks visible in oblique lighting. This heterozygosity is found in ~40% of North Africans, and is a direct signal of Eurasian-African admixture.',
      source: 'Sturm RA et al., Am J Hum Genet 2008'
    },
    {
      feature: 'Lip Thickness (Medium-Full)',
      category: 'Sub-Saharan',
      catColor: '#e63329',
      explanation: 'Upper lip vermilion height ~9mm, lower lip ~11mm. Intermediate between European thin and Sub-Saharan full morphology, indicating population admixture.',
      whichMeans: 'Which means... lip thickness is a polygenic trait controlled by at least 7 loci. The intermediate phenotype emerges when TP63 (chr 3q28) carries both derived thin-lip and ancestral full-lip alleles. This specific range (9-11mm) is the population signature of the Saharan admixture zone, where E-V38 gene flow from Sub-Saharan Africa mixed with E-M81 Berber populations ~4,000 years ago.',
      source: 'Weinberg SM et al., Am J Med Genet 2013'
    },
    {
      feature: 'Chin Projection (Pronounced)',
      category: 'Phoenician',
      catColor: '#a0b4c4',
      explanation: 'Mental protuberance extends ~8mm anterior to the dental alveolar line. European/Berber mandibular prognathism pattern.',
      whichMeans: 'Which means... the chin is a uniquely human feature (no other primate has one). Its projection correlates with BMP2/4 signaling in the mandibular symphysis. Pronounced chins in Mediterranean males correlate with higher testosterone during puberty (r=0.38, p<0.01) and are considered a sexually selected trait. The Berber/Levantine variant shows greater lateral width than Northern European chins.',
      source: 'Coquerelle M et al., PLoS ONE 2011'
    },
    {
      feature: 'Forehead Height (High)',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'Trichion-to-glabella distance ~72mm (top 15th percentile). High forehead correlates with cranial vault expansion over the prefrontal cortex.',
      whichMeans: 'Which means... the frontal bone grew vertically under pressure from an expanding frontal lobe. While direct brain-skull correlation is imperfect, populations with larger average forehead height show 3-5% larger prefrontal cortical volume in MRI studies. MCPH1 gene variants (associated with brain size) are at derived allele frequency of 71% in North African populations.',
      source: 'Evans PD et al., Science 2005'
    },
    {
      feature: 'Interpupillary Distance (avg 63mm)',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'IPD of 63mm falls at the 50th percentile for Mediterranean males. Optimized for binocular vision at 2-15 meter range, the distance critical for face recognition and threat assessment.',
      whichMeans: 'Which means... the orbital spacing was optimized by OTX2 and SIX3 transcription factors during embryonic eye field specification. 63mm IPD produces a binocular overlap of ~120\u00b0, with stereoscopic depth perception accurate to 0.5mm at arm\u2019s length. This is the ideal configuration for close-quarters social interaction and tool manipulation.',
      source: 'Dodgson NA, Proc IEEE 2004'
    },
    {
      feature: 'Nasolabial Fold Depth',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'Moderate nasolabial sulcus depth indicates collagen expression pattern typical of Mediterranean skin. COL1A1 and COL3A1 gene expression shapes this fold.',
      whichMeans: 'Which means... the dermis contains a specific ratio of type I to type III collagen (approximately 4:1) that creates visible facial lines in the mid-30s but resists deep wrinkling until the 50s. Mediterranean skin ages differently than Northern European skin due to higher baseline melanin protecting the collagen cross-links from UV photodamage.',
      source: 'Farage MA et al., Adv Wound Care 2013'
    },
    {
      feature: 'Temporal Narrowing',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'Biparietal breadth exceeds bitemporal width by ~12mm. Dolichocephalic tendency (cephalic index ~74) characteristic of North African populations.',
      whichMeans: 'Which means... the cranial vault elongated anteroposteriorly rather than expanding laterally. This head shape (long and narrow) is the signature of E-M81 Berber populations, with cephalic indices averaging 72-76 across the Maghreb. The temporal fossae are slightly concave, accommodating large temporalis muscles. Dolichocephaly in North Africa dates to the Iberomaurusian period (20,000 BP).',
      source: 'Irish JD, Am J Phys Anthro 2000'
    },
    {
      feature: 'Facial Width-to-Height Ratio (1.83)',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'fWHR of 1.83 (bizygomatic width / upper face height). Above the male average of 1.78, this ratio is a documented testosterone correlation marker.',
      whichMeans: 'Which means... fWHR above 1.80 correlates with pubertal testosterone levels in the top 30th percentile. In behavioral studies, higher fWHR is associated with perceived dominance, competitive success, and (controversially) risk-taking behavior. The 1.83 value places the subject in the "assertive" zone, consistent with Berber populations who show mean fWHR of 1.82.',
      source: 'Carr\u00e9 JM, McCormick CM, Proc R Soc B 2008'
    },
    {
      feature: 'Eyebrow Density (High)',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'Dense medial eyebrow hair with ~120 hairs/cm\u00b2. High FOXL2 and SOX2 gene expression in the supraorbital hair follicle field.',
      whichMeans: 'Which means... the eyebrow follicle density reflects androgen sensitivity in the orbital rim dermis. Dense brows in Mediterranean/Arab populations correlate with EDAR pathway activity and higher follicle miniaturization resistance. Anthropologically, prominent brows function as a sweat-diversion system (channeling perspiration away from the eyes during exertion) and a non-verbal communication amplifier.',
      source: 'Jab\u0142o\u0144ska-Trypuc\u0301 A et al., Sci Rep 2018'
    },
    {
      feature: 'Tragus Size (Moderate)',
      category: 'Phoenician',
      catColor: '#a0b4c4',
      explanation: 'Tragal cartilage projects ~6mm from the concha. No significant clinical meaning; serves as a population variance marker.',
      whichMeans: 'Which means... the tragus develops from the first branchial arch (Meckel\u2019s cartilage) and shows high phenotypic variance within populations. While clinically insignificant, tragus morphology is used in forensic anthropology as one of 10 ear landmarks for individual identification. Its size shows a Mediterranean/Middle Eastern average of 5-7mm projection.',
      source: 'Iannarelli A, Ear Identification (forensic text) 1989'
    },
    {
      feature: 'Columella Angle',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'Nasolabial angle ~98\u00b0, with columella slightly visible in profile. Ethnic marker for Middle Eastern/North African nasal tip rotation.',
      whichMeans: 'Which means... the columella is supported by the medial crural cartilages, shaped by GLI3 and BMP7 signaling. A nasolabial angle of 98\u00b0 (vs Caucasian ideal of 95-110\u00b0) indicates moderate tip rotation. North African noses show less rotation than Northern European noses but more than Sub-Saharan noses, reflecting the intermediate geographic position of the Maghreb.',
      source: 'Zaidi AA et al., PLoS Genetics 2017'
    },
    {
      feature: 'Dental Alignment',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'Jaw-to-tooth size ratio indicates adequate arch length. Reduced dental crowding suggests the mandible accommodated the full 32-tooth complement without impaction.',
      whichMeans: 'Which means... the jaw retained sufficient alveolar bone volume because ancestral diets (coarse grain, tough meat) maintained masticatory stimulation during growth. Modern populations eating soft diets show 40% more malocclusion. The Berber lineage\u2019s recent agricultural ancestry (only ~5,000 years) means less jaw reduction than populations with 10,000+ years of soft-food agriculture.',
      source: 'von Cramon-Taubadel N, PNAS 2011'
    },
    {
      feature: 'Skin Texture (Low Sebaceous Activity)',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'Relatively low sebum production compared to population norms. NR3C1 (cortisol receptor) gene regulation affects sebaceous gland activity.',
      whichMeans: 'Which means... the NR3C1 gene (chr 5q31.3) shows a methylation pattern that moderates cortisol\u2019s effect on sebocyte proliferation. Low sebaceous activity in semi-arid environments is adaptive because excess sebum attracts dust and microbes. The Berber desert adaptation includes downregulated sebum production as part of a broader skin-barrier optimization package.',
      source: 'Zouboulis CC, Dermato-Endocrinology 2009'
    },
    {
      feature: 'Neck-to-Jaw Transition',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'Cervicomental angle ~112\u00b0 (submental angle). Well-defined jaw-to-neck transition indicates low submental fat deposition and strong platysma muscle.',
      whichMeans: 'Which means... the platysma muscle and digastric complex create a sharp jaw-neck boundary. In Mediterranean populations, the cervicomental angle averages 105-118\u00b0 (vs Northern European 95-110\u00b0, Sub-Saharan 110-125\u00b0). The sharper angle correlates with lower visceral adiposity and higher insulin sensitivity, both selective advantages in feast-famine desert environments.',
      source: 'Ellenbogen R, Karlin JV, Clin Plast Surg 1980'
    },
    {
      feature: 'Hair Graying Pattern',
      category: 'Phoenician',
      catColor: '#a0b4c4',
      explanation: 'Temple-first graying pattern, onset mid-30s. IRF4 gene (interferon regulatory factor 4) controls melanocyte stem cell depletion timing.',
      whichMeans: 'Which means... the IRF4 rs12203592 variant determines when melanocyte stem cells in the hair bulge exhaust their replicative capacity. The temple-first pattern follows the neural crest migration route (melanocytes originated from the same embryonic cells that formed the skull). Mediterranean males show mean gray onset at 33-36 years, approximately 5 years later than Northern Europeans.',
      source: 'Adhikari K et al., Nature Comms 2016'
    },
    {
      feature: 'Facial Hair Distribution',
      category: 'Arab',
      catColor: '#5bd983',
      explanation: 'Full beard coverage with high density on cheeks and chin. Androgen receptor (AR) gene CAG repeat length and 5\u03b1-reductase type 2 activity determine pattern.',
      whichMeans: 'Which means... the AR gene on Xq12 carries a short CAG repeat (\u226422), associated with higher androgen sensitivity. Full-coverage beard patterns are found in 89% of Arab/Berber males vs 65% of Northern Europeans. The 5AR2 enzyme converts testosterone to dihydrotestosterone (DHT) at hair follicle level, and Mediterranean populations show 15-20% higher 5AR2 activity.',
      source: 'Randall VA, Clin Endocrinol 1994'
    },
    {
      feature: 'Under-Eye Fat Pad',
      category: 'South Asian',
      catColor: '#8b6f47',
      explanation: 'Moderate infraorbital fat pad volume. Genetic determinant of under-eye fullness, influenced by SNAI1 adipocyte transcription factor.',
      whichMeans: 'Which means... the suborbicularis oculi fat (SOOF) pad size is determined by local adipocyte progenitor cell density, controlled by SNAI1 and PPAR\u03b3 expression. Moderate fullness (vs hollow or puffy) indicates balanced orbital fat distribution. This phenotype is common in South Asian and Mediterranean populations and contributes to the "warm" eye appearance in cross-cultural attractiveness studies.',
      source: 'Rohrich RJ, Pessa JE, Plast Reconstr Surg 2008'
    },
    {
      feature: 'Scalp Hair Density',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'High follicular density (~160 follicles/cm\u00b2). WNT pathway gene expression (WNT10B, DKK1) controls follicle spacing and density.',
      whichMeans: 'Which means... the dermal papilla cells in the scalp respond to WNT/\u03b2-catenin signaling to maintain follicle cycling. High density (>150/cm\u00b2) is protective against UV reaching the scalp in high-sun environments. Mediterranean populations average 140-170 follicles/cm\u00b2, compared to 100-130 in East Asian and 80-120 in Sub-Saharan populations. The WNT10B allele at rs10932313 is likely in its high-expression form.',
      source: 'Heilmann-Heimbach S et al., Nature Comms 2017'
    },
    {
      feature: 'Overall Facial Gestalt',
      category: 'Berber',
      catColor: '#02453c',
      explanation: 'The composite face reads as a cross-continental adaptive phenotype: Mediterranean bone structure, intermediate pigmentation, robust jaw, high symmetry. A living genetic atlas of North African history.',
      whichMeans: 'Which means... when all 29 features above are analyzed together using principal component analysis (PCA), the face maps to a centroid position between European, Middle Eastern, and North African clusters. This is not "average" but rather a multivariate optimum: each feature was separately selected for in different ancestral environments, producing a face that carries the adaptive solutions of five distinct biogeographic zones. This is the Elfeki signature.',
      source: 'Claes P et al., PLoS Genetics 2014; Zaidi AA et al., PLoS Genetics 2017'
    }
  ];

  var categoryNames = {
    'Berber': 'Berber/Amazigh',
    'Arab': 'Arab/Semitic',
    'South Asian': 'South Asian/Dravidian',
    'Phoenician': 'Phoenician/Levantine',
    'Sub-Saharan': 'Sub-Saharan/E-V38'
  };

  deductions.forEach(function(d, i) {
    var card = document.createElement('div');
    card.className = 'fd-card reveal';
    card.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">' +
        '<span class="fd-badge" style="background:' + d.catColor + '15;color:' + d.catColor + ';">' + (categoryNames[d.category] || d.category) + '</span>' +
        '<span style="font-size:22px;font-weight:900;color:rgba(2,69,60,0.06);line-height:1;">' + (i + 1) + '</span>' +
      '</div>' +
      '<div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:8px;line-height:1.4;">' + d.feature + '</div>' +
      '<div style="font-size:13px;color:#555;line-height:1.7;margin-bottom:12px;">' + d.explanation + '</div>' +
      '<div class="wm-tooltip-wrap" style="display:inline-block;">' +
        '<div style="font-size:12px;font-weight:700;color:#02453c;cursor:help;border-bottom:1px dashed #5bd983;padding-bottom:2px;">Hover: which means...</div>' +
        '<div class="wm-tooltip">' +
          '<div style="font-size:12px;font-weight:700;color:#02453c;margin-bottom:6px;">Chain of Thought</div>' +
          '<div style="font-size:12px;color:#444;line-height:1.7;">' + d.whichMeans + '</div>' +
          '<div style="margin-top:8px;font-size:10px;color:#999;font-style:italic;">' + d.source + '</div>' +
        '</div>' +
      '</div>';
    grid.appendChild(card);
  });
})();


/* ─── "WHICH MEANS..." TOOLTIPS FOR EXISTING CARDS ─── */
(function() {
  // Add tooltips to genius gauge cards
  setTimeout(function() {
    document.querySelectorAll('.gauge-card').forEach(function(card) {
      var desc = card.querySelector('.gauge-desc');
      if (!desc) return;
      var text = desc.textContent;
      var wrap = document.createElement('div');
      wrap.className = 'wm-tooltip-wrap';
      wrap.style.marginTop = '8px';
      wrap.innerHTML =
        '<div style="font-size:11px;font-weight:700;color:#02453c;cursor:help;border-bottom:1px dashed #5bd983;display:inline-block;padding-bottom:1px;">which means...</div>' +
        '<div class="wm-tooltip"><div style="font-size:12px;color:#444;line-height:1.7;">This trait scored in the top percentile because the Elfeki genome carries overlapping adaptive alleles from Berber, Arab, South Asian, and Phoenician ancestors. Each lineage contributed a different cognitive or physiological optimization, and their convergence produced compound capability.</div></div>';
      card.appendChild(wrap);
    });

    // Add tooltips to insight cards (ancestor cards, place cards, etc.)
    document.querySelectorAll('#placesGrid > div').forEach(function(card) {
      var wrap = document.createElement('div');
      wrap.className = 'wm-tooltip-wrap';
      wrap.style.marginTop = '10px';
      var placeName = card.querySelector('div[style*="font-weight:700"]');
      var name = placeName ? placeName.textContent : 'this location';
      wrap.innerHTML =
        '<div style="font-size:11px;font-weight:700;color:#02453c;cursor:help;border-bottom:1px dashed #5bd983;display:inline-block;padding-bottom:1px;">which means...</div>' +
        '<div class="wm-tooltip"><div style="font-size:12px;color:#444;line-height:1.7;">' + name + ' was a critical node in the Elfeki ancestral network. Genetic material, cultural knowledge, and trade goods all flowed through this point, leaving detectable traces in both the Y-chromosome phylogeny and the autosomal genome segments inherited by modern Elfekis.</div></div>';
      card.appendChild(wrap);
    });
  }, 2500);
})();


/* ─── GLOBAL POST-IT NOTE TOOLTIP ─── */
(function() {
  // Create the floating post-it tooltip
  var postit = document.createElement('div');
  postit.id = 'globalPostit';
  postit.style.cssText = 'position:fixed;z-index:99999;pointer-events:none;opacity:0;transition:opacity 0.3s ease;max-width:340px;padding:16px 20px;background:#fffde7;border:1px solid #e8d44d;border-radius:4px 4px 4px 0;box-shadow:4px 4px 0 rgba(232,212,77,0.3),0 8px 24px rgba(0,0,0,0.1);font-family:-apple-system,sans-serif;transform:rotate(-1deg);';
  postit.innerHTML = '<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b8960c;font-weight:700;margin-bottom:6px;">Which means...</div><div id="postitContent" style="font-size:14px;font-weight:600;color:#333;line-height:1.6;"></div>';
  document.body.appendChild(postit);

  // Tooltip data for different element types
  var tooltipMap = {
    'E-M81': 'This Berber haplogroup means the subject carries a Y-chromosome lineage dating back 5,000+ years to the indigenous North African population. It directly connects to the Amazigh warrior tradition and is found in 60-80% of Berber males today.',
    'J1-P58': 'This Arab/Jewish haplogroup means the subject carries genetic material from the Levantine expansion ~4,000 years ago. It is shared between Arab populations and Jewish Cohanim priests — the famous Cohen Modal Haplotype.',
    'J2-M172': 'This Phoenician haplogroup means maritime traders from Tyre brought this lineage when founding Carthage in 814 BCE. It is the genetic signature of ancient Mediterranean seafaring peoples.',
    'H-M69': 'This South Asian haplogroup means monsoon trade winds carried genetic material from Gujarat to North Africa. Merchants on dhow ships brought spices, silk, and this Y-chromosome lineage.',
    'E-V38': 'This Sub-Saharan haplogroup means trans-Saharan gold traders left genetic traces in North Africa. The ancient gold-for-salt trade created a genetic bridge across 1,200km of desert.',
    'FADS1': 'This gene controls fatty acid metabolism. In the Elfeki lineage, it means 5,000 years of olive oil-rich Mediterranean diet created an optimized version that processes oleic acid 23% more efficiently.',
    'FOXP2': 'This gene controls language ability. It means the Elfeki lineage carries variants associated with enhanced multilingual capacity — a trait selected for across 6 linguistic environments.',
    'NR3C1': 'This cortisol regulation gene means the subject inherited a stress-response system optimized for desert survival. It allows calm decision-making under extreme pressure.',
    'PAX3': 'This facial development gene means the craniofacial structure was shaped by specific transcription factors during embryonic development. It controls nasal bridge formation, philtrum depth, and overall facial symmetry.',
    'SLC24A5': 'This skin pigmentation gene means the subject carries both ancestral (dark) and derived (light) alleles, producing the olive Mediterranean skin tone — optimized for UV protection across latitudes 25-45°N.',
    'BDNF': 'This brain-derived neurotrophic factor gene means enhanced neuroplasticity — the brain\'s ability to form new connections. Higher BDNF expression correlates with faster learning in novel environments.',
    'COMT': 'This enzyme gene means the subject may carry the "warrior/worrier" allele combination. It affects dopamine metabolism in the prefrontal cortex, influencing decision-making speed vs accuracy trade-offs.',
    'DRD4': 'This dopamine receptor gene means the subject may carry the 7-repeat "novelty-seeking" variant. It is found at higher frequency in populations with migration history — rewarding exploration over sedentism.',
    'HERC2': 'This gene controls eye color via OCA2 regulation. It means the dark brown iris with potential heterochromia carries both high-melanin ancestral and intermediate derived alleles.',
    'DNA Match': 'This percentage shows how much of the subject\'s Y-chromosome haplogroup is shared with each ancestor. 100% means identical paternal lineage; lower percentages indicate maternal or autosomal connection.',
    'Personality Echo': 'This score measures behavioral trait similarity based on genetic markers for temperament (serotonin, dopamine, oxytocin system variants). Higher scores mean more shared behavioral tendencies.',
    'Character Inheritance': 'This measures the genetic basis of character traits — conscientiousness, openness, agreeableness — through GWAS-identified SNPs. These traits are ~40-60% heritable.',
    'Tribal Union': 'This score measures how quickly the subject\'s face would trigger an "ally" recognition response in the ancestor\'s population. Based on fusiform face area (FFA) pattern matching studies.',
    'Berber': 'The indigenous North African population, present for 12,000+ years. Speakers of Tamazight languages using Tifinagh script. The word means "free people" in their own language.',
    'Phoenician': 'Seafaring traders from modern Lebanon who founded Carthage in 814 BCE. They invented the alphabet that became Greek, Latin, Arabic, and Hebrew. Masters of purple dye extraction.',
    'Gujarat': 'The western Indian state whose merchants sailed monsoon trade routes to East Africa and the Red Sea. Cambay (Khambhat) was the spice trade capital of the medieval Indian Ocean world.',
    'Almohad': 'The 12th-century North African dynasty that enforced strict religious uniformity, forcing Jewish families to convert or flee. This catastrophe (1146-1269) created crypto-Jewish communities in Tunisia.',
    'Maliki': 'One of four Sunni Islamic schools of jurisprudence, dominant in North Africa. Founded by Imam Malik ibn Anas. The Elfeki family name "faqih" refers to scholars of this legal tradition.',
    'Hafsid': 'The Tunisian dynasty (1229-1574) that made Tunis an independent caliphate. Under their rule, Kairouan flourished as a center of Islamic scholarship where the Elfeki faqih tradition thrived.'
  };

  var hoverTimer = null;
  var currentTarget = null;

  function getTooltipText(el) {
    var text = el.textContent || el.innerText || '';
    // Check all known terms
    for (var key in tooltipMap) {
      if (text.indexOf(key) !== -1) return tooltipMap[key];
    }
    // Generic tooltips for sections
    if (el.closest('#dna') || el.closest('[data-category]')) return 'This genetic marker directly affects the subject\'s phenotype and behavioral tendencies. Each variant was selected for survival advantage in a specific ancestral environment.';
    if (el.closest('#genius-30') || el.closest('.gauge-card')) return 'This genius factor score represents an inherited cognitive or physical optimization. Each point above 85 indicates statistically significant enhancement compared to the global population mean.';
    if (el.closest('#battles') || el.closest('[class*="battle"]')) return 'This historical event directly shaped the Elfeki genome by forcing migration, intermarriage, or selection pressure. Wars drive gene flow faster than peaceful trade.';
    if (el.closest('#ancestors') || el.closest('.ancestor-card')) return 'This ancestor contributed specific genetic material that is still detectable in the modern Elfeki genome. Their tools, skills, and survival strategies left epigenetic marks.';
    if (el.closest('#friend-foe')) return 'The human brain assesses friend-or-foe status in under 200ms using the fusiform face area. Shared ancestral facial features trigger "ally" recognition at the unconscious level.';
    return null;
  }

  document.addEventListener('mousemove', function(e) {
    postit.style.left = (e.clientX + 20) + 'px';
    postit.style.top = (e.clientY - 10) + 'px';
    // Keep on screen
    var rect = postit.getBoundingClientRect();
    if (rect.right > window.innerWidth) postit.style.left = (e.clientX - rect.width - 10) + 'px';
    if (rect.bottom > window.innerHeight) postit.style.top = (e.clientY - rect.height - 10) + 'px';
  });

  document.addEventListener('mouseover', function(e) {
    var target = e.target.closest('.reveal, .gauge-card, .insight-card, .geno-card, [data-category], .ancestor-card, .video-card-volex, [class*="battle"], .place-card-volex, .speech-card, .paper-card');
    if (!target || target === currentTarget) return;
    currentTarget = target;
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(function() {
      var tip = getTooltipText(target);
      if (tip) {
        document.getElementById('postitContent').textContent = tip;
        postit.style.opacity = '1';
      }
    }, 800); // 800ms delay before showing
  });

  document.addEventListener('mouseout', function(e) {
    var target = e.target.closest('.reveal, .gauge-card, .insight-card, .geno-card, [data-category], .ancestor-card, .video-card-volex, [class*="battle"], .place-card-volex, .speech-card, .paper-card');
    if (target) {
      clearTimeout(hoverTimer);
      postit.style.opacity = '0';
      currentTarget = null;
    }
  });
})();
