/* ── Scroll-driven section reveal ─────────────────────────── */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('section').forEach((s) => {
    if (
      !s.classList.contains('hero') &&
      !s.classList.contains('viewer-section') &&
      !s.classList.contains('end-cover') &&
      !s.classList.contains('transition-section') &&
      !s.classList.contains('lavell-section') &&
      !s.classList.contains('datasources-section') &&
      !s.classList.contains('methodology-section')
    ) {
      observer.observe(s);
    } else {
      s.classList.add('visible');
    }
  });
})();

/* ── Navigation dot active state ──────────────────────────── */
(function () {
  const dots = Array.from(document.querySelectorAll('.nav-dot'));
  const sectionIds = dots.map((d) => d.getAttribute('href'));

  function updateDots() {
    const mid = window.scrollY + window.innerHeight / 2;
    let active = 0;
    sectionIds.forEach((id, i) => {
      const el = document.querySelector(id);
      if (el && el.offsetTop <= mid) active = i;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }

  window.addEventListener('scroll', updateDots, { passive: true });
  updateDots();
})();

/* ── Flood globe (D3 + TopoJSON) ──────────────────────────── */
(function () {
  const data = [
    {country:'India',lat:20,lon:78,count:327,highlight:true},
    {country:'China',lat:35,lon:105,count:324,highlight:false},
    {country:'Indonesia',lat:-2,lon:118,count:276,highlight:false},
    {country:'United States of America',lat:38,lon:-97,count:212,highlight:false},
    {country:'Brazil',lat:-10,lon:-55,count:185,highlight:false},
    {country:'Philippines',lat:13,lon:122,count:163,highlight:false},
    {country:'Pakistan',lat:30,lon:70,count:122,highlight:false},
    {country:'Colombia',lat:4,lon:-74,count:110,highlight:false},
    {country:'Afghanistan',lat:33,lon:65,count:109,highlight:false},
    {country:'Viet Nam',lat:16,lon:108,count:107,highlight:false},
    {country:'Bangladesh',lat:24,lon:90,count:102,highlight:false},
    {country:'Thailand',lat:15,lon:101,count:100,highlight:false},
    {country:'Iran',lat:32,lon:53,count:96,highlight:false},
    {country:'Sri Lanka',lat:7,lon:81,count:84,highlight:false},
    {country:'Mexico',lat:23,lon:-102,count:80,highlight:false},
    {country:'Peru',lat:-10,lon:-76,count:75,highlight:false},
    {country:'Malaysia',lat:4,lon:109,count:74,highlight:false},
    {country:'Australia',lat:-25,lon:133,count:73,highlight:false},
    {country:'Russian Federation',lat:60,lon:90,count:71,highlight:false},
    {country:'Argentina',lat:-34,lon:-64,count:69,highlight:false},
    {country:'Haiti',lat:19,lon:-72,count:68,highlight:false},
    {country:'France',lat:46,lon:2,count:65,highlight:false},
    {country:'Kenya',lat:0,lon:38,count:64,highlight:false},
    {country:'Bolivia',lat:-17,lon:-65,count:63,highlight:false},
    {country:'Ethiopia',lat:9,lon:40,count:62,highlight:false},
    {country:'Japan',lat:36,lon:138,count:61,highlight:false},
    {country:'Nigeria',lat:9,lon:8,count:60,highlight:false},
    {country:'Nepal',lat:28,lon:84,count:59,highlight:false},
    {country:'Tanzania',lat:-6,lon:35,count:58,highlight:false},
    {country:'South Africa',lat:-29,lon:25,count:56,highlight:false},
    {country:'Italy',lat:42,lon:12,count:55,highlight:false},
    {country:'Romania',lat:46,lon:25,count:53,highlight:false},
    {country:'Algeria',lat:28,lon:2,count:52,highlight:false},
    {country:'Somalia',lat:6,lon:46,count:50,highlight:false},
    {country:'Turkey',lat:39,lon:35,count:50,highlight:false},
    {country:'Canada',lat:56,lon:-96,count:47,highlight:false},
    {country:'Angola',lat:-12,lon:18,count:45,highlight:false},
    {country:'Malawi',lat:-13,lon:34,count:45,highlight:false},
    {country:'Ecuador',lat:-2,lon:-78,count:44,highlight:false},
    {country:'Mozambique',lat:-18,lon:35,count:44,highlight:false},
    {country:'Sudan',lat:15,lon:30,count:44,highlight:false},
    {country:'DR Congo',lat:-4,lon:22,count:43,highlight:false},
    {country:'New Zealand',lat:-41,lon:174,count:43,highlight:false},
    {country:'Venezuela',lat:8,lon:-66,count:43,highlight:false},
    {country:'Yemen',lat:15,lon:48,count:43,highlight:false},
    {country:'South Korea',lat:36,lon:128,count:42,highlight:false},
    {country:'Spain',lat:40,lon:-4,count:42,highlight:false},
    {country:'Panama',lat:9,lon:-80,count:41,highlight:false},
    {country:'Guatemala',lat:15,lon:-90,count:39,highlight:false},
    {country:'Myanmar',lat:17,lon:96,count:39,highlight:false},
    {country:'Chile',lat:-30,lon:-71,count:38,highlight:false},
    {country:'Honduras',lat:15,lon:-87,count:38,highlight:false},
    {country:'Uganda',lat:1,lon:32,count:38,highlight:false},
    {country:'United Kingdom',lat:54,lon:-2,count:36,highlight:false},
    {country:'Morocco',lat:32,lon:-6,count:35,highlight:false},
    {country:'Niger',lat:17,lon:8,count:35,highlight:false},
    {country:'Dominican Republic',lat:19,lon:-71,count:34,highlight:false},
    {country:'Tajikistan',lat:39,lon:71,count:34,highlight:false},
    {country:'Burundi',lat:-3,lon:30,count:33,highlight:false},
    {country:'Costa Rica',lat:10,lon:-84,count:31,highlight:false},
    {country:'Laos',lat:18,lon:103,count:31,highlight:false},
    {country:'North Korea',lat:40,lon:127,count:30,highlight:false},
    {country:'Ghana',lat:8,lon:-2,count:30,highlight:false},
    {country:'Greece',lat:39,lon:22,count:30,highlight:false},
    {country:'Paraguay',lat:-23,lon:-58,count:30,highlight:false},
    {country:'Rwanda',lat:-2,lon:30,count:29,highlight:false},
    {country:'Mali',lat:17,lon:-4,count:28,highlight:false},
    {country:'Cuba',lat:22,lon:-80,count:26,highlight:false},
    {country:'Cambodia',lat:12,lon:105,count:25,highlight:false},
    {country:'Uruguay',lat:-33,lon:-56,count:25,highlight:false},
    {country:'Zambia',lat:-14,lon:28,count:25,highlight:false},
    {country:'Burkina Faso',lat:12,lon:-2,count:24,highlight:false},
    {country:'Chad',lat:15,lon:19,count:24,highlight:false},
    {country:'Saudi Arabia',lat:24,lon:45,count:24,highlight:false},
    {country:'Senegal',lat:14,lon:-14,count:24,highlight:false},
    {country:'Bulgaria',lat:43,lon:25,count:23,highlight:false},
    {country:'Nicaragua',lat:13,lon:-85,count:23,highlight:false},
    {country:'Benin',lat:9,lon:2,count:22,highlight:false},
    {country:'Mauritania',lat:20,lon:-12,count:21,highlight:false},
    {country:'Cameroon',lat:5,lon:12,count:20,highlight:false},
    {country:'Central African Republic',lat:7,lon:21,count:20,highlight:false},
    {country:'Georgia',lat:42,lon:44,count:20,highlight:false},
    {country:'Papua New Guinea',lat:-6,lon:147,count:20,highlight:false},
    {country:'Serbia',lat:44,lon:21,count:19,highlight:false},
    {country:'Austria',lat:47,lon:14,count:18,highlight:false},
    {country:'El Salvador',lat:14,lon:-89,count:18,highlight:false},
    {country:'Germany',lat:51,lon:10,count:18,highlight:false},
    {country:'Guinea',lat:11,lon:-12,count:18,highlight:false},
    {country:'Tunisia',lat:34,lon:9,count:18,highlight:false},
    {country:'Belgium',lat:51,lon:4,count:17,highlight:false},
    {country:'Iraq',lat:33,lon:44,count:17,highlight:false},
    {country:'Namibia',lat:-22,lon:18,count:17,highlight:false},
    {country:'Ukraine',lat:49,lon:32,count:17,highlight:false},
    {country:'Albania',lat:41,lon:20,count:16,highlight:false},
    {country:'Congo',lat:-1,lon:15,count:16,highlight:false},
    {country:"Côte d'Ivoire",lat:7,lon:-5,count:16,highlight:false},
    {country:'Hungary',lat:47,lon:19,count:16,highlight:false},
    {country:'Poland',lat:52,lon:20,count:16,highlight:false},
    {country:'South Sudan',lat:7,lon:30,count:16,highlight:false},
    {country:'Czechia',lat:50,lon:16,count:15,highlight:false},
    {country:'Kazakhstan',lat:48,lon:68,count:15,highlight:false},
    {country:'Mongolia',lat:46,lon:105,count:15,highlight:false},
    {country:'Togo',lat:8,lon:1,count:15,highlight:false},
    {country:'Croatia',lat:45,lon:16,count:14,highlight:false},
    {country:'Egypt',lat:27,lon:31,count:14,highlight:false},
    {country:'Slovakia',lat:49,lon:19,count:14,highlight:false},
    {country:'Jamaica',lat:18,lon:-77,count:13,highlight:false},
    {country:'Portugal',lat:39,lon:-8,count:13,highlight:false},
    {country:'Zimbabwe',lat:-20,lon:30,count:13,highlight:false},
    {country:'Sierra Leone',lat:8,lon:-12,count:12,highlight:false},
    {country:'Madagascar',lat:-20,lon:47,count:11,highlight:false},
    {country:'Fiji',lat:-18,lon:178,count:10,highlight:false},
    {country:'Guyana',lat:5,lon:-59,count:10,highlight:false},
    {country:'Djibouti',lat:12,lon:43,count:9,highlight:false},
    {country:'Switzerland',lat:47,lon:8,count:9,highlight:false},
    {country:'Jordan',lat:31,lon:36,count:8,highlight:false},
    {country:'Azerbaijan',lat:40,lon:48,count:7,highlight:false},
    {country:'Kyrgyzstan',lat:41,lon:75,count:7,highlight:false},
    {country:'Liberia',lat:6,lon:-10,count:7,highlight:false},
    {country:'Syria',lat:35,lon:38,count:7,highlight:false},
    {country:'Ireland',lat:53,lon:-8,count:6,highlight:false},
    {country:'Oman',lat:22,lon:58,count:6,highlight:false},
    {country:'Belarus',lat:54,lon:28,count:5,highlight:false},
    {country:'Belize',lat:17,lon:-88,count:5,highlight:false},
    {country:'Israel',lat:31,lon:35,count:5,highlight:false},
    {country:'Lesotho',lat:-29,lon:28,count:5,highlight:false},
    {country:'Netherlands',lat:52,lon:5,count:5,highlight:false},
    {country:'Slovenia',lat:46,lon:15,count:5,highlight:false},
    {country:'Suriname',lat:4,lon:-56,count:5,highlight:false},
    {country:'Timor-Leste',lat:-9,lon:126,count:5,highlight:false},
    {country:'Armenia',lat:40,lon:45,count:4,highlight:false},
    {country:'Bhutan',lat:27,lon:90,count:4,highlight:false},
    {country:'Libya',lat:27,lon:17,count:4,highlight:false},
    {country:'Eswatini',lat:-26,lon:31,count:3,highlight:false},
    {country:'Gabon',lat:-1,lon:12,count:3,highlight:false},
    {country:'Lebanon',lat:34,lon:36,count:3,highlight:false},
    {country:'Maldives',lat:3,lon:73,count:3,highlight:false},
    {country:'Norway',lat:60,lon:10,count:3,highlight:false},
    {country:'Sweden',lat:60,lon:18,count:3,highlight:false},
    {country:'UAE',lat:24,lon:54,count:3,highlight:false},
    {country:'Uzbekistan',lat:41,lon:64,count:3,highlight:false},
    {country:'Eritrea',lat:15,lon:39,count:2,highlight:false},
    {country:'Kuwait',lat:29,lon:48,count:2,highlight:false},
    {country:'Cabo Verde',lat:16,lon:-24,count:2,highlight:false},
    {country:'Vanuatu',lat:-16,lon:168,count:2,highlight:false},
    {country:'Finland',lat:62,lon:26,count:1,highlight:false},
    {country:'Iceland',lat:65,lon:-18,count:1,highlight:false},
    {country:'Cyprus',lat:35,lon:33,count:1,highlight:false},
    {country:'Qatar',lat:25,lon:51,count:1,highlight:false},
    {country:'Mauritius',lat:-20,lon:57,count:1,highlight:false},
    {country:'Samoa',lat:-14,lon:-172,count:1,highlight:false},
  ];

  const container = document.getElementById('flood-globe');
  const tooltip   = document.getElementById('flood-tooltip');
  const W = container.offsetWidth || 800;
  const H = container.offsetHeight || 500;

  const svg = d3.select('#flood-globe').append('svg')
    .attr('width', W).attr('height', H);

  const projection = d3.geoNaturalEarth1()
    .scale(W / 5.5)
    .translate([W / 2, H / 2 + 40]);

  const path = d3.geoPath().projection(projection);
  const r    = d3.scaleSqrt().domain([0, 327]).range([1, 18]);

  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);

      svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#ffffff');

      svg.append('g').selectAll('path')
        .data(countries.features)
        .join('path')
        .attr('d', path)
        .attr('fill', '#e8e8e8')
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5);

      svg.append('g').selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', (d) => projection([d.lon, d.lat])[0])
        .attr('cy', (d) => projection([d.lon, d.lat])[1])
        .attr('r',  (d) => r(d.count))
        .attr('fill',   (d) => d.highlight ? '#0000FF' : 'rgba(0,0,255,0.25)')
        .attr('stroke', (d) => d.highlight ? '#0000FF' : 'rgba(0,0,255,0.5)')
        .attr('stroke-width', (d) => d.highlight ? 2 : 0.8)
        .style('cursor', 'pointer')
        .on('mousemove', function (event, d) {
          tooltip.style.display = 'block';
          tooltip.style.left = (event.clientX + 3) + 'px';
          tooltip.style.top  = (event.clientY - 3) + 'px';
          tooltip.innerHTML = `<strong>${d.country}</strong><br>${d.count}`;
          d3.select(this).attr('fill', '#0000FF').attr('stroke-width', 2);
        })
        .on('mouseleave', function (event, d) {
          tooltip.style.display = 'none';
          d3.select(this)
            .attr('fill',         d.highlight ? '#0000FF' : 'rgba(0,0,255,0.25)')
            .attr('stroke-width', d.highlight ? 2 : 0.8);
        });
    })
    .catch(() => {
      svg.append('text')
        .attr('x', W / 2).attr('y', H / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#999').attr('font-size', '12px')
        .text('Map requires internet connection');
    });
})();
