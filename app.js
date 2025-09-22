// EduQuest – SPA logic (vanilla JS)
// Storage keys
const K = {
  user: 'eq_user',
  profile: 'eq_profile',
  progress: 'eq_progress',
  leaderboard: 'eq_leaderboard',
};

// Data models
const SUBJECTS = [
  { id: 'science', name: 'Science', icon: '🔬', gradient: 'bg-gradientLime' },
  { id: 'technology', name: 'Technology', icon: '💻', gradient: 'bg-gradientOcean' },
  { id: 'mathematics', name: 'Mathematics', icon: '➗', gradient: 'bg-gradientRoyal' },
  { id: 'engineering', name: 'Engineering', icon: '🛠️', gradient: 'bg-gradientSunset' },
];

const TOPICS = {
  science: [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
  ],
  technology: [
    { id: 'coding', name: 'Coding Basics' },
    { id: 'web', name: 'Web Fundamentals' },
    { id: 'ai', name: 'Intro to AI' },
  ],
  mathematics: [
  ],
  engineering: [
    { id: 'design', name: 'Design Thinking' },
    { id: 'mechanics', name: 'Mechanics' },
    { id: 'circuits', name: 'Circuits' },
  ],
};

// Topic notes content (concise, real explanations + examples)
const NOTES = {
  arithmetic: [
    {
      title: 'Order of Operations (BODMAS)',
      text: 'When evaluating expressions, follow BODMAS: Brackets, Orders (powers), Division/Multiplication (left→right), Addition/Subtraction (left→right).',
      example: 'Example: 6 + 2 × 3 = 6 + 6 = 12. (Multiply before adding)'
    },
    {
      title: 'Fractions Basics',
      text: 'A fraction a/b represents a parts out of b equal parts. To add: make denominators same, then add numerators.',
      example: 'Example: 1/4 + 1/2 = 1/4 + 2/4 = 3/4.'
    }
  ],
  algebra: [
    {
      title: 'Solving Simple Equations',
      text: 'Isolate the variable by doing the same operation on both sides until x is alone.',
      example: 'Example: x + 5 = 12 → x = 12 − 5 = 7.'
    },
    {
      title: 'Distributive Property',
      text: 'a(b + c) = ab + ac. Useful to expand expressions and simplify.',
      example: 'Example: 3(2x + 4) = 6x + 12.'
    }
  ],
  geometry: [
    {
      title: 'Triangle Angle Sum',
      text: 'Interior angles of any triangle add up to 180°.',
      example: 'Example: If angles are 50° and 60°, the third is 180 − 110 = 70°.'
    },
    {
      title: 'Area vs Perimeter',
      text: 'Perimeter is the boundary length; area is space inside. For rectangles: P = 2(l + w), A = l × w.',
      example: 'Example: l=5, w=3 → P=16, A=15.'
    }
  ],
  physics: [
    { title: 'Speed, Distance, Time', text: 'Speed = Distance / Time. Units must match.', example: 'Example: 120 km in 2 h → 60 km/h.' },
    { title: 'Force Basics', text: 'Force causes acceleration. F = m × a (Newton’s Second Law).', example: 'Example: m=2 kg, a=3 m/s² → F=6 N.' }
  ],
  chemistry: [
    { title: 'States of Matter', text: 'Solid, liquid, gas differ by particle arrangement and energy.', example: 'Ice → liquid water → steam by heating.' },
    { title: 'Mixtures vs Compounds', text: 'Mixtures are physical blends; compounds are chemically bonded with fixed ratios.', example: 'Air is a mixture; water (H₂O) is a compound.' }
  ],
  biology: [
    { title: 'Cells as Basic Units', text: 'All living organisms are made of cells—the basic structural and functional units.', example: 'Plants have cell walls and chloroplasts; animals do not.' },
    { title: 'Photosynthesis', text: 'Plants convert CO₂ and water to glucose and oxygen using sunlight.', example: 'Equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.' }
  ],
  coding: [
    { title: 'Variables', text: 'Variables store data values. Names should be descriptive.', example: 'let score = 0;' },
    { title: 'Conditionals', text: 'Use if/else to run code based on a condition.', example: 'if (score > 10) { level++; }' }
  ],
  web: [
    { title: 'HTML Structure', text: 'HTML defines the content: elements like <div>, <p>, <a>.', example: '<a href="#">Link</a>' },
    { title: 'CSS Basics', text: 'CSS styles HTML with selectors and properties.', example: 'p { color: blue; }' }
  ],
  ai: [
    { title: 'What is AI?', text: 'AI enables machines to perform tasks that typically require human intelligence.', example: 'Image recognition, voice assistants.' },
    { title: 'Training vs Inference', text: 'Training learns patterns from data; inference uses a trained model to make predictions.', example: 'Train on digits, then classify new handwritten numbers.' }
  ]
};

// Practice and quiz banks (expanded, topic-specific)
const PRACTICE_BANK = {
  arithmetic: [
    { q: '7 + 9 = ?', a: '16' },
    { q: '18 − 7 = ?', a: '11' },
    { q: '9 × 6 = ?', a: '54' },
    { q: '48 ÷ 8 = ?', a: '6' },
    { q: '1/3 + 1/6 = ?', a: '1/2' },
  ],
  algebra: [
    { q: 'Solve x: x + 8 = 20', a: '12' },
    { q: 'Solve x: 4x = 28', a: '7' },
    { q: 'Expand: 2(x + 5)', a: '2x+10' },
    { q: 'If 3x − 2 = 10, x = ?', a: '4' },
  ],
  geometry: [
    { q: 'Sum of interior angles of a quadrilateral?', a: '360' },
    { q: 'Perimeter of rectangle l=8, w=3', a: '22' },
    { q: 'Area of triangle base=10, height=6', a: '30' },
    { q: 'Right angle measure (degrees)?', a: '90' },
  ],
  physics: [
    { q: 'Speed if d=150 km, t=3 h (km/h)?', a: '50' },
    { q: 'F=ma: m=5 kg, a=2 m/s^2 → F=?', a: '10' },
  ],
  chemistry: [
    { q: 'Water chemical formula?', a: 'H2O' },
    { q: 'State change: liquid → gas is called?', a: 'evaporation' },
  ],
  biology: [
    { q: 'Organelle for photosynthesis?', a: 'chloroplast' },
    { q: 'Basic unit of life?', a: 'cell' },
  ],
  coding: [
    { q: 'JS keyword to declare a variable?', a: 'let' },
    { q: 'True/False: if blocks run on conditions.', a: 'true' },
  ],
  web: [
    { q: 'HTML stands for HyperText Markup Language (yes/no)?', a: 'yes' },
    { q: 'CSS property to set text color?', a: 'color' },
  ],
  ai: [
    { q: 'Training uses data to learn patterns (yes/no)?', a: 'yes' },
    { q: 'Using a trained model to predict is called?', a: 'inference' },
  ],
};

const QUIZ_BANK = {
  arithmetic: [
    { q: '9 + 8 = ?', options: ['15', '16', '17', '18'], a: 2 },
    { q: '12 ÷ 3 = ?', options: ['2', '3', '4', '6'], a: 2 },
    { q: '7 × 5 = ?', options: ['30', '35', '25', '45'], a: 1 },
    { q: 'BODMAS: 6 + 2 × 4 = ?', options: ['32', '14', '16', '8'], a: 1 },
    { q: '1/2 + 1/4 = ?', options: ['1/6', '1/4', '3/4', '2/3'], a: 2 },
  ],
  algebra: [
    { q: 'x in 3x = 21?', options: ['5', '6', '7', '8'], a: 2 },
    { q: 'x in x − 2 = 5?', options: ['5', '6', '7', '8'], a: 1 },
    { q: 'Expand: 2(x + 3)', options: ['2x + 3', '2x + 6', '2x + 9', 'x + 6'], a: 1 },
    { q: 'If 5x + 5 = 30, x = ?', options: ['4', '5', '6', '7'], a: 0 },
  ],
  geometry: [
    { q: 'Square sides are?', options: ['Equal', 'Unequal', 'Random', 'None'], a: 0 },
    { q: 'A straight angle is?', options: ['90°', '120°', '180°', '360°'], a: 2 },
    { q: 'Perimeter of square with side 4?', options: ['8', '12', '16', '20'], a: 2 },
    { q: 'Area of rectangle 7×3?', options: ['10', '18', '21', '24'], a: 2 },
  ],
  physics: [
    { q: 'Unit of force?', options: ['Joule', 'Pascal', 'Newton', 'Watt'], a: 2 },
    { q: 'Speed formula?', options: ['d×t', 'd/t', 't/d', 'd+t'], a: 1 },
  ],
  chemistry: [
    { q: 'H₂O is', options: ['Hydrogen', 'Oxygen', 'Water', 'Salt'], a: 2 },
    { q: 'Solid → liquid is', options: ['Melting', 'Freezing', 'Condensation', 'Sublimation'], a: 0 },
  ],
  biology: [
    { q: 'Powerhouse of cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Lysosome'], a: 1 },
    { q: 'Plants make food via?', options: ['Respiration', 'Digestion', 'Photosynthesis', 'Transpiration'], a: 2 },
  ],
  coding: [
    { q: 'JS equality that checks type?', options: ['==', '===', '!=', '!=='], a: 1 },
    { q: 'const makes a', options: ['Mutable var', 'Constant', 'Function', 'Loop'], a: 1 },
  ],
  web: [
    { q: 'Tag for a link?', options: ['<link>', '<a>', '<p>', '<div>'], a: 1 },
    { q: 'CSS stands for?', options: ['Cascading Style Sheets', 'Creative Style Set', 'Color Style System', 'Coded Sheet Styles'], a: 0 },
  ],
  ai: [
    { q: 'AI stands for', options: ['Actual Intelligence', 'Artificial Intelligence', 'Applied Inference', 'Auto Inference'], a: 1 },
    { q: 'Process of using a trained model', options: ['Training', 'Labeling', 'Inference', 'Tuning'], a: 2 },
  ],
};

// Scholarships data with metadata for filters
const SCHOLARSHIPS = [
  // Odisha State Scholarships
  {
    title: 'Pre-Matric & Secondary Scholarships',
    category: 'Odisha',
    eligibility: 'Odisha residents (Classes 9–10 Pre-Matric, Classes 11–12 Secondary), typically SC/ST, OBC/SEBC, or General merit-cum-poverty categories. Income criteria apply.',
    benefits: [
      'Junior Merit Scholarship (Class 11–12): ₹40/month',
      'Junior Merit-cum-Poverty Scholarship (<₹24,000/year): ₹40/month',
      'Sports Talent Scholarship: ₹2,000/year',
      'Pre-Matric (Class 9–10): Monthly/annual stipends for day scholars & hostellers'
    ],
    apply: 'Odisha State Scholarship Portal',
    link: 'https://scholarship.odisha.gov.in/',
    deadline: 'Check portal',
    classes: [9,10,11,12],
    incomeCap: 24000,
    type: 'Means+Merit',
    tags: ['state','odisha','pre-matric','post-matric'],
    icons: {
      eligibility: '🧑‍🎓',
      benefits: '💰',
      deadline: '⏰',
      apply: '🌐'
    }
  },
  {
    title: 'Junior Merit Scholarship under e-Medhabruti',
    category: 'Odisha',
    eligibility: 'Students in Class 11–12 (Odisha).',
    benefits: ['Merit-based financial assistance.'],
    apply: 'Odisha State Scholarship Portal',
    link: 'https://scholarship.odisha.gov.in/',
    deadline: 'Check portal',
    classes: [11,12],
    incomeCap: null,
    type: 'Merit',
    tags: ['state','odisha','merit','medhabruti'],
    icons: {
      eligibility: '🧑‍🎓',
      benefits: '💰',
      deadline: '⏰',
      apply: '🌐'
    }
  },
  {
    title: 'Khushi Scheme (Odisha)',
    category: 'Odisha',
    eligibility: 'Female students in Classes 6–12 in govt/aided schools.',
    benefits: ['Free sanitary pads for hygiene & retention.'],
    apply: 'Distributed via schools (no application).',
    link: '',
    deadline: 'Ongoing',
    classes: [6,7,8,9,10,11,12],
    incomeCap: null,
    type: 'Welfare',
    tags: ['health','girls','welfare'],
    icons: {
      eligibility: '👧',
      benefits: '🩸',
      deadline: '⏰',
      apply: '🏫'
    }
  },
  // Central Government Scholarships
  {
    title: 'National Means-cum-Merit Scholarship (NMMS)',
    category: 'Central',
    eligibility: 'Class 9 students in govt/aided/local-body schools, passed Class 8 with ≥55% (50% SC/ST), family income <₹3.5 lakh/year.',
    benefits: ['₹12,000/year for Classes 9–12.'],
    apply: 'State NMMS portals or National Scholarship Portal (NSP).',
    link: 'https://scholarships.gov.in/',
    deadline: 'Check State Boards or NSP',
    classes: [9,10,11,12],
    incomeCap: 350000,
    type: 'Means+Merit',
    tags: ['central','nmms','means','merit'],
    icons: {
      eligibility: '🧑‍🎓',
      benefits: '💰',
      deadline: '⏰',
      apply: '🌐'
    }
  },
  {
    title: 'Pre-Matric & Post-Matric Scholarships for Minorities',
    category: 'Central',
    eligibility: 'Pre-Matric: Class 1–10, family income ≤ ₹1 lakh; Post-Matric: Class 11–PhD, family income ≤ ₹2 lakh; ≥50% marks required, must belong to a notified minority community.',
    benefits: [
      'Pre-Matric: ₹1,000–₹6,000/year',
      'Post-Matric: ₹2,300–₹10,000+/year depending on level'
    ],
    apply: 'National Scholarship Portal (NSP).',
    link: 'https://scholarships.gov.in/',
    deadline: 'Pre-Matric: June 25, 2025; Post-Matric: October 31, 2025',
    classes: [1,2,3,4,5,6,7,8,9,10,11,12],
    incomeCap: 200000,
    type: 'Minority',
    tags: ['central','minority','pre-matric','post-matric'],
    icons: {
      eligibility: '🧑‍🎓',
      benefits: '💰',
      deadline: '⏰',
      apply: '🌐'
    }
  }
];

// Utilities
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const storage = {
  get(k, d = null) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
  remove(k) { localStorage.removeItem(k); },
};

function showSection(id) {
  ['sectionAuth','sectionSetup','sectionSubjects','sectionTopics','sectionTopicDetail','sectionLeaderboard','sectionScholarships','math6-section','sectionGames']
    .forEach(s => document.getElementById(s).classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm shadow-lg z-50';
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 2000);
}

// App state
let currentSubject = null;
let currentTopic = null;
let chartInstance = null;

function getDefaultProgress() {
  const p = { level: 1, points: 0, streak: 0, bestStreak: {}, rank: 'Rookie', topics: {} };
  for (const s of SUBJECTS) {
    p.topics[s.id] = {};
  }
  return p;
}

function updateSummaryUI() {
  const progress = storage.get(K.progress) || getDefaultProgress();
  $('#summaryLevel').textContent = progress.level;
  $('#summaryPoints').textContent = progress.points;
  $('#summaryStreak').textContent = progress.streak;
  $('#summaryRank').textContent = progress.rank;
  const percent = Math.min(100, (progress.points % 100));
  $('#levelBar').style.width = `${percent}%`;
  $('#levelText').textContent = `Level ${progress.level}`;
}

function gainPoints(pts) {
  const progress = storage.get(K.progress) || getDefaultProgress();
  progress.points += pts;
  // level up per 100 points
  const newLevel = Math.floor(progress.points / 100) + 1;
  if (newLevel !== progress.level) {
    progress.level = newLevel;
    toast(`Level Up! You're now level ${progress.level} 🎉`);
  }
  storage.set(K.progress, progress);
  updateSummaryUI();
}

function setRankByScore(scorePct) {
  const progress = storage.get(K.progress) || getDefaultProgress();
  let rank = 'Rookie';
  if (scorePct >= 90) rank = 'Legend';
  else if (scorePct >= 75) rank = 'Pro';
  else if (scorePct >= 60) rank = 'Skilled';
  progress.rank = rank;
  storage.set(K.progress, progress);
  updateSummaryUI();
}

// Auth
function initAuth() {
  const user = storage.get(K.user);
  const profile = storage.get(K.profile);
  if (user && profile) {
    $('#btnAuth').textContent = 'Sign Out';
    $('#userSummary').classList.remove('hidden');
    showSection('sectionSubjects');
    renderSubjects();
  } else if (user && !profile) {
    $('#btnAuth').textContent = 'Sign Out';
    showSection('sectionSetup');
  } else {
    $('#btnAuth').textContent = 'Sign In';
    $('#userSummary').classList.add('hidden');
    showSection('sectionAuth');
  }
}

function handleAuthUI() {
  const tabSignIn = $('#tabSignIn');
  const tabSignUp = $('#tabSignUp');
  const formSignIn = $('#formSignIn');
  const formSignUp = $('#formSignUp');

  tabSignIn.addEventListener('click', () => {
    tabSignIn.classList.add('bg-white','shadow','text-brand-700','font-semibold');
    tabSignUp.classList.remove('bg-white','shadow','text-brand-700','font-semibold');
    formSignIn.classList.remove('hidden');
    formSignUp.classList.add('hidden');
  });
  tabSignUp.addEventListener('click', () => {
    tabSignUp.classList.add('bg-white','shadow','text-brand-700','font-semibold');
    tabSignIn.classList.remove('bg-white','shadow','text-brand-700','font-semibold');
    formSignUp.classList.remove('hidden');
    formSignIn.classList.add('hidden');
  });

  formSignIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#siEmail').value.trim();
    const pw = $('#siPassword').value.trim();
    if (!email || !pw) return toast('Enter email and password');
    storage.set(K.user, { email });
    if (!storage.get(K.progress)) storage.set(K.progress, getDefaultProgress());
    initAuth();
    toast('Signed in');
  });

  formSignUp.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#suName').value.trim();
    const email = $('#suEmail').value.trim();
    const pw = $('#suPassword').value.trim();
    if (!name || !email || !pw) return toast('Fill all fields');
    storage.set(K.user, { email });
    storage.set(K.profile, null); // force setup next
    storage.set(K.progress, getDefaultProgress());
    initAuth();
    toast('Account created');
  });

  $('#btnAuth').addEventListener('click', () => {
    const user = storage.get(K.user);
    if (user) {
      storage.remove(K.user); storage.remove(K.profile);
      // keep progress optionally; for demo reset:
      storage.remove(K.progress);
      initAuth();
    } else {
      // When signed out, show the auth screen
      showSection('sectionAuth');
    }
  });
}

function renderSubjects() {
  const grid = $('#subjectsGrid');
  grid.innerHTML = '';

// In-SPA Games (fallback) ----------------------------------------------------
let inSpaGamesInitialized = false;
function initInSpaGames(){
  if (inSpaGamesInitialized) return; // init once
  inSpaGamesInitialized = true;

  // Quick Math
  const qEl = {
    time: $('#qmTime'), score: $('#qmScore'), q: $('#qmQuestion'), ans: $('#qmAnswer'),
    submit: $('#qmSubmit'), start: $('#qmStart'), feedback: $('#qmFeedback')
  };
  if (qEl.start){
    let timer = null, timeLeft = 30, score = 0, curAns = 0;
    function makeQ(){
      const a = Math.floor(Math.random()*10)+1;
      const b = Math.floor(Math.random()*10)+1;
      const ops = ['+','-','×'];
      const op = ops[Math.floor(Math.random()*ops.length)];
      let text = `${a} ${op} ${b} = ?`;
      if (op === '+') curAns = a + b; else if (op === '-') curAns = a - b; else curAns = a * b;
      qEl.q.textContent = text;
      qEl.ans.value = '';
      qEl.ans.focus();
    }
    function stop(){ clearInterval(timer); timer=null; qEl.feedback.textContent = `Time! Final score: ${score}`; gainPoints(Math.min(20, score)); }
    qEl.start.addEventListener('click', ()=>{
      if (timer) { stop(); return; }
      score = 0; timeLeft = 30; qEl.score.textContent = '0'; qEl.time.textContent = '30'; qEl.feedback.textContent = 'Go!'; makeQ();
      timer = setInterval(()=>{ timeLeft--; qEl.time.textContent = String(timeLeft); if (timeLeft<=0) stop(); }, 1000);
    });
    function submit(){ if (!timer) return; const v = Number(qEl.ans.value); if (v===curAns){ score++; qEl.score.textContent = String(score); qEl.feedback.textContent = 'Correct!'; makeQ(); } else { qEl.feedback.textContent = 'Try again'; } }
    qEl.submit.addEventListener('click', submit);
    qEl.ans?.addEventListener('keydown', (e)=>{ if (e.key==='Enter') submit(); });
  }

  // Target Tap
  const field = $('#ttField');
  const hitsEl = $('#ttHits');
  const startBtn = $('#ttStart');
  if (field && startBtn){
    let running = false; let hits = 0; let spawnTimer=null; let endTimer=null;
    function spawn(){
      const t = document.createElement('div');
      t.className = 'absolute w-8 h-8 rounded-full bg-indigo-500 shadow-glow cursor-pointer transition-transform duration-150';
      t.style.left = Math.max(4, Math.random()* (field.clientWidth-36)) + 'px';
      t.style.top = Math.max(4, Math.random()* (field.clientHeight-36)) + 'px';
      t.addEventListener('click', ()=>{ hits++; hitsEl.textContent = String(hits); t.remove(); });
      field.appendChild(t);
      setTimeout(()=> t.remove(), 1500);
    }
    function stop(){ running=false; clearInterval(spawnTimer); clearTimeout(endTimer); spawnTimer=null; endTimer=null; toast(`Hits: ${hits}`); gainPoints(Math.min(15,hits)); }
    startBtn.addEventListener('click', ()=>{
      if (running){ stop(); return; }
      running = true; hits=0; hitsEl.textContent='0'; field.innerHTML='';
      spawnTimer = setInterval(spawn, 400);
      endTimer = setTimeout(stop, 15000);
    });
  }

  // Mystery Box
  const mbBtn = $('#mbOpen');
  const mbRes = $('#mbResult');
  if (mbBtn){
    mbBtn.addEventListener('click', ()=>{
      const now = Date.now(); const last = Number(localStorage.getItem('mb_last')||0);
      if (now - last < 60_000){ mbRes.textContent = 'Please wait a minute for the next spin.'; return; }
      localStorage.setItem('mb_last', String(now));
      const rewards = [0, 5, 10, 20, 50]; const weights = [0.25, 0.35, 0.25, 0.12, 0.03];
      const r = Math.random(); let acc=0, idx=0; for (let i=0;i<weights.length;i++){ acc+=weights[i]; if (r<=acc){ idx=i; break; } }
      const pts = rewards[idx];
      if (pts>0){ mbRes.textContent = `You won +${pts} XP!`; gainPoints(pts); } else { mbRes.textContent = 'No luck this time. Try again later!'; }
    });
  }
}
  SUBJECTS.forEach(s => {
    const card = document.createElement('button');
    card.className = `card-hover text-left p-5 bg-white border border-slate-200 rounded-2xl shadow-soft hover:shadow-glow`;
    card.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl ${s.gradient} grid place-items-center text-3xl">${s.icon}</div>
        <div>
          <div class="font-extrabold text-lg">${s.name}</div>
          <div class="text-slate-600 text-sm">Learn & earn badges</div>
        </div>
      </div>`;
    card.addEventListener('click', () => {
      currentSubject = s.id;
      if (s.id === 'mathematics') {
        showSection('math6-section');
        renderMathSubjects();
        clearMath6Content();
      } else {
        renderTopics(s.id);
        showSection('sectionTopics');
        $('#topicsTitle').textContent = `${s.name} Topics`;
      }
    });
    grid.appendChild(card);
  });
  updateSummaryUI();
}

// Topics
function renderTopics(subjectId) {
  const grid = $('#topicsGrid');
  grid.innerHTML = '';
  (TOPICS[subjectId] || []).forEach(t => {
    const card = document.createElement('button');
    card.className = 'card-hover text-left p-5 bg-white border border-slate-200 rounded-2xl shadow-soft hover:shadow-glow';
    card.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-slate-100 grid place-items-center text-2xl">📘</div>
        <div>
          <div class="font-bold">${t.name}</div>
          <div class="text-slate-600 text-sm">Tap to explore</div>
        </div>
      </div>`;
    card.addEventListener('click', () => openTopic(subjectId, t.id, t.name));
    grid.appendChild(card);
  });
}

function openTopic(subjectId, topicId, topicName) {
  currentSubject = subjectId; currentTopic = topicId;
  $('#topicTitle').textContent = topicName;
  showSection('sectionTopicDetail');
  refreshTopicBadges();
  renderNotesContent();
}

function refreshTopicBadges() {
  const progress = storage.get(K.progress) || getDefaultProgress();
  const t = progress.topics?.[currentSubject]?.[currentTopic] || {};
  $('#badgeNotes').textContent = `Notes ${t.notesDone ? 100 : 0}%`;
  $('#badgePractice').textContent = `Practice ${t.practiceScore || 0}%`;
  const best = t.bestQuiz || 0;
  $('#badgeQuiz').textContent = `Best ${best}%`;
}

// Notes mini-game
function initNotes() {
  const btnStart = $('#btnStartNotes');
  const area = $('#notesArea');
  const starField = $('#starField');
  const btnPlay = $('#btnStartStarGame');
  const counter = $('#starsCollected');
  const notesContent = $('#notesContent');

  btnStart.addEventListener('click', () => {
    area.classList.toggle('hidden');
  });

  btnPlay.addEventListener('click', () => {
    starField.innerHTML = '';
    counter.textContent = '0';
    let collected = 0;
    const total = 5;
    function spawnStar(){
      const star = document.createElement('button');
      star.className = 'absolute text-2xl select-none';
      star.textContent = '⭐';
      const x = Math.random() * (starField.clientWidth - 24);
      const y = Math.random() * (starField.clientHeight - 24);
      star.style.left = `${Math.max(0,x)}px`;
      star.style.top = `${Math.max(0,y)}px`;
      star.addEventListener('click', () => {
        collected += 1; counter.textContent = String(collected); star.remove();
        if (collected >= total) { toast('Notes done!'); markNotesDone(); }
      });
      starField.appendChild(star);
      setTimeout(()=> star.remove(), 2500);
    }
    let count = 0; const t = setInterval(()=>{ spawnStar(); count++; if (count>=10) clearInterval(t); }, 400);
  });
}

function renderNotesContent() {
  const notes = NOTES[currentTopic] || [];
  const wrap = $('#notesContent');
  if (!wrap) return;
  if (!notes.length) { wrap.innerHTML = '<p class="text-slate-600">Notes coming soon for this topic.</p>'; return; }
  wrap.innerHTML = notes.map(n => `
    <div class="p-3 rounded-xl border border-slate-200 bg-white">
      <div class="font-semibold">${n.title}</div>
      <p class="mt-1">${n.text}</p>
      <div class="mt-2 text-slate-700"><span class="font-semibold">Example:</span> ${n.example}</div>
    </div>
  `).join('');
}

// Practice
function initPractice() {
  const btn = $('#btnStartPractice');
  const area = $('#practiceArea');
  const container = $('#practiceContainer');
  const scoreEl = $('#practiceScore');
  const reset = $('#btnResetPractice');

  btn.addEventListener('click', () => {
    area.classList.toggle('hidden');
    if (!area.classList.contains('hidden')) renderPractice();
  });

  reset.addEventListener('click', () => {
    container.innerHTML = ''; scoreEl.textContent = '0';
    const progress = storage.get(K.progress) || getDefaultProgress();
    if (currentSubject && currentTopic) {
      progress.topics[currentSubject] ||= {};
      progress.topics[currentSubject][currentTopic] ||= {};
      progress.topics[currentSubject][currentTopic].practiceScore = 0;
      storage.set(K.progress, progress); refreshTopicBadges();
    }
  });

  function renderPractice() {
    const list = PRACTICE_BANK[currentTopic] || [];
    container.innerHTML = '';
    let correct = 0;
    list.forEach((item, idx) => {
      const row = document.createElement('div');
      row.className = 'p-3 rounded-xl border flex items-center justify-between gap-3';
    row.innerHTML = `
        <div class="text-sm">${idx+1}. ${item.q}</div>
        <div class="flex items-center gap-2">
      <input type="text" class="answer px-3 py-1.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Answer"/>
          <button class="check px-3 py-1.5 rounded-lg bg-indigo-600 text-white">Check</button>
        </div>`;
      const input = row.querySelector('.answer');
      const btnCk = row.querySelector('.check');
      btnCk.addEventListener('click', () => {
        const val = (input.value || '').trim();
        if (!val) return;
        if (val.toLowerCase() === item.a.toLowerCase()) {
          row.classList.remove('border-slate-200');
          row.classList.add('bg-emerald-50','border-emerald-200');
          btnCk.disabled = true; input.disabled = true; correct += 1;
          const pct = Math.round((correct / list.length) * 100);
          scoreEl.textContent = String(pct);
          const progress = storage.get(K.progress) || getDefaultProgress();
          progress.topics[currentSubject] ||= {};
          progress.topics[currentSubject][currentTopic] ||= {};
          progress.topics[currentSubject][currentTopic].practiceScore = pct;
          storage.set(K.progress, progress); refreshTopicBadges();
          gainPoints(5);
        } else {
          row.classList.remove('border-slate-200');
          row.classList.add('bg-rose-50','border-rose-200');
        }
      });
      container.appendChild(row);
    });
  }
}

// Quiz
let quizSelections = [];
function initQuiz() {
  const btn = $('#btnStartQuiz');
  const area = $('#quizArea');
  const list = $('#quizQuestions');
  const sbm = $('#btnSubmitQuiz');
  const rst = $('#btnResetQuiz');
  const streakEl = $('#quizStreak');
  const bestEl = $('#quizBestStreak');

  btn.addEventListener('click', () => {
    area.classList.toggle('hidden');
    if (!area.classList.contains('hidden')) renderQuiz();
  });

  function renderQuiz() {
    const bank = QUIZ_BANK[currentTopic] || [];
    quizSelections = new Array(bank.length).fill(null);
    list.innerHTML = '';
    bank.forEach((q, i) => {
      const card = document.createElement('div');
      card.className = 'p-3 rounded-xl border';
      const ops = q.options.map((opt, idx) => `
        <label class="flex items-center gap-2">
          <input type="radio" name="q${i}" value="${idx}" class="option"> <span>${opt}</span>
        </label>`).join('');
      card.innerHTML = `<div class="font-semibold mb-2">${i+1}. ${q.q}</div><div class="grid grid-cols-2 gap-2">${ops}</div>`;
      card.querySelectorAll('.option').forEach(r => {
        r.addEventListener('change', (e) => {
          quizSelections[i] = Number(e.target.value);
          // track streaks live
          const s = calcStreak(bank, quizSelections);
          streakEl.textContent = String(s.current);
          const progress = storage.get(K.progress) || getDefaultProgress();
          const bestPrev = progress.bestStreak[currentTopic] || 0;
          const best = Math.max(bestPrev, s.best);
          progress.bestStreak[currentTopic] = best;
          bestEl.textContent = String(best);
          storage.set(K.progress, progress); updateSummaryUI();
        });
      });
      list.appendChild(card);
    });
    // set best streak UI
    const progress = storage.get(K.progress) || getDefaultProgress();
    bestEl.textContent = String(progress.bestStreak[currentTopic] || 0);
    streakEl.textContent = '0';
  }

  sbm.addEventListener('click', () => {
    const bank = QUIZ_BANK[currentTopic] || [];
    if (!bank.length) return toast('No quiz questions for this topic');
    const { correct, wrong } = tallyQuiz(bank, quizSelections);
    const scorePct = Math.round((correct / bank.length) * 100);

    // save best percent for topic
    const progress = storage.get(K.progress) || getDefaultProgress();
    progress.topics[currentSubject] ||= {};
    progress.topics[currentSubject][currentTopic] ||= {};
    progress.topics[currentSubject][currentTopic].bestQuiz = Math.max(progress.topics[currentSubject][currentTopic].bestQuiz || 0, scorePct);
    // update streak
    const s = calcStreak(bank, quizSelections);
    progress.streak = s.current;
    storage.set(K.progress, progress);
    updateSummaryUI();
    setRankByScore(scorePct);
    gainPoints(10 + correct * 2);
    openResultsModal(correct, wrong, scorePct);
  });

  rst.addEventListener('click', () => {
    list.innerHTML = ''; quizSelections = [];
    $('#quizStreak').textContent = '0';
  });
}

function calcStreak(bank, selections) {
  let best = 0, cur = 0;
  for (let i = 0; i < bank.length; i++) {
    const sel = selections[i];
    if (sel === null || sel === undefined) continue;
    if (sel === bank[i].a) { cur += 1; best = Math.max(best, cur); }
    else cur = 0;
  }
  return { best, current: cur };
}

function tallyQuiz(bank, selections) {
  let correct = 0, wrong = 0;
  for (let i = 0; i < bank.length; i++) {
    const sel = selections[i];
    if (sel === null || sel === undefined) continue;
    if (sel === bank[i].a) correct++; else wrong++;
  }
  return { correct, wrong };
}

// Results modal with pie chart
function openResultsModal(correct, wrong, scorePct) {
  $('#modalResults').classList.remove('hidden');
  $('#resultsScore').textContent = String(scorePct);
  $('#resultsFeedback').textContent = scorePct >= 80 ? 'Outstanding! Keep it up.' : scorePct >= 60 ? 'Good job! Aim for Pro rank.' : 'Keep practicing—you got this!';
  // topic switcher within subject
  const sw = $('#resultsTopicSwitcher');
  sw.innerHTML = '';
  (TOPICS[currentSubject] || []).forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id; opt.text = t.name;
    if (t.id === currentTopic) opt.selected = true;
    sw.appendChild(opt);
  });
  sw.onchange = (e) => {
    const tId = e.target.value; const tName = (TOPICS[currentSubject]||[]).find(t=>t.id===tId)?.name || 'Topic';
    openTopic(currentSubject, tId, tName);
    $('#modalResults').classList.add('hidden');
  };

  const ctx = document.getElementById('resultsChart');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Correct','Wrong'],
      datasets: [{ data: [correct, wrong], backgroundColor: ['#10b981', '#ef4444'] }]
    },
    options: { plugins: { legend: { position: 'bottom' } } }
  });
}

// Leaderboard
function renderLeaderboard() {
  const list = $('#leaderboardList');
  const profile = storage.get(K.profile) || { name: 'You' };
  const progress = storage.get(K.progress) || getDefaultProgress();
  // mock peers
  const peers = [
    { name: 'Aarav', points: 230, streak: 4, stars: 8 },
    { name: 'Zoya', points: 190, streak: 3, stars: 6 },
    { name: profile.name, points: progress.points, streak: progress.streak, stars: Math.max(1, Math.floor(progress.level/2)) },
    { name: 'Kabir', points: 120, streak: 2, stars: 4 },
    { name: 'Mira', points: 80, streak: 1, stars: 3 },
  ].sort((a,b)=>b.points-a.points);
  list.innerHTML = peers.map((p, i) => `
    <div class="flex items-center justify-between p-4 ${i===0?'bg-amber-50':''}">
      <div class="flex items-center gap-3">
        <div class="w-8 text-center font-extrabold">${i+1}</div>
        <div class="font-semibold">${p.name}</div>
      </div>
      <div class="flex items-center gap-6 text-sm">
        <div class="px-2 py-1 rounded-lg bg-slate-100">Points: <span class="font-bold">${p.points}</span></div>
        <div class="px-2 py-1 rounded-lg bg-slate-100">Streak: <span class="font-bold">${p.streak}</span></div>
        <div class="px-2 py-1 rounded-lg bg-slate-100">⭐ x <span class="font-bold">${p.stars}</span></div>
      </div>
    </div>`).join('');
}

// Scholarships
// Active filters state
let scholarshipFilters = { q: '', category: 'All', class: '', income: 'Any', type: 'All' };

// Simple filter predicate
function matchesFilters(s) {
  const { q, category, class: cls, income, type } = scholarshipFilters;
  const text = `${s.title} ${s.eligibility} ${(Array.isArray(s.benefits)?s.benefits.join(' '):s.benefits||'')} ${(s.tags||[]).join(' ')}`.toLowerCase();
  if (q && !text.includes(q.toLowerCase())) return false;
  if (category !== 'All' && s.category !== category) return false;
  if (cls && !(s.classes||[]).includes(Number(cls))) return false;
  if (income !== 'Any') {
    const sel = Number($('#filterIncome')?.selectedOptions?.[0]?.dataset?.cap || 0);
    if (sel && (s.incomeCap == null || s.incomeCap > sel)) return false;
  }
  if (type !== 'All' && (s.type||'').toLowerCase() !== type.toLowerCase()) return false;
  return true;
}

function renderScholarships() {
  const grid = $('#scholarshipsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  // Update count
  const filtered = SCHOLARSHIPS.filter(matchesFilters);
  const countEl = $('#scholarshipsCount');
  if (countEl) countEl.textContent = String(filtered.length);
  // Empty state
  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-8 text-center text-slate-600 shadow-soft';
    empty.innerHTML = '<div class="text-3xl mb-2">🔍</div><div class="font-semibold">No scholarships match your filters</div><div class="text-sm">Try widening your search or clearing some filters.</div>';
    grid.appendChild(empty);
    return;
  }
  // Category capsules config
  const categories = [
    {
      key: 'Odisha',
      label: 'Odisha State Scholarships',
      badge: '<span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-600 mr-2">State</span>',
      border: 'border-pink-400',
      titleColor: 'text-pink-700',
      btnBg: 'bg-pink-500 hover:bg-pink-600',
    },
    {
      key: 'Central',
      label: 'Central Government Scholarships',
      badge: '<span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600 mr-2">Central</span>',
      border: 'border-blue-400',
      titleColor: 'text-blue-700',
      btnBg: 'bg-blue-500 hover:bg-blue-600',
    }
  ];
  categories.forEach(cat => {
    // Capsule-shaped gradient container
    const items = filtered.filter(s => s.category === cat.key);
    if (!items.length) return; // hide capsule if nothing in this category
    const capsule = document.createElement('div');
    capsule.className = `w-full rounded-[2.25rem] bg-gradient-to-r ${cat.key==='Odisha' ? 'from-pink-50 via-rose-50 to-orange-50' : 'from-blue-50 via-sky-50 to-emerald-50'} shadow-soft ring-1 ring-white/60 border border-slate-200/70 px-0 py-8 mb-10 flex flex-col items-stretch justify-center`;
    // Title at top
    const headerWrap = document.createElement('div');
    headerWrap.className = 'flex items-center justify-between px-6 sm:px-10 mb-4';
    const header = document.createElement('h2');
    header.className = 'font-extrabold text-xl sm:text-2xl text-slate-800';
    header.innerHTML = `${cat.badge || ''}${cat.label}`;
    const countPill = document.createElement('div');
    countPill.className = 'text-xs px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-slate-200/70';
    countPill.textContent = `${items.length} result${items.length>1?'s':''}`;
    headerWrap.appendChild(header);
    headerWrap.appendChild(countPill);
    capsule.appendChild(headerWrap);
    // Horizontal scrollable row for cards, full width
    const scrollRow = document.createElement('div');
    scrollRow.className = 'flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 px-6 sm:px-10 w-full';
    scrollRow.style.alignItems = 'stretch';
    scrollRow.style.boxSizing = 'border-box';
    items.forEach(s => {
      const card = document.createElement('div');
      card.className = `min-w-[300px] max-w-sm snap-start rounded-2xl bg-white/90 backdrop-blur shadow-soft border border-slate-200/70 ring-1 ring-white/60 flex flex-col justify-between p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow flex-shrink-0`;
      card.style.height = '100%';
      card.style.overflow = 'hidden';
      card.innerHTML = `
        <h3 class="font-extrabold text-lg ${cat.titleColor} mb-2">${s.title}</h3>
        <div class="flex-1 flex flex-col gap-2 text-[15px] leading-relaxed">
          <div class="font-semibold text-slate-600 flex items-center gap-2 mt-1">${s.icons?.eligibility ? `<span>${s.icons.eligibility}</span>` : ''}<span>Eligibility</span></div>
          <p class="text-slate-700 break-words">${s.eligibility}</p>
          <div class="font-semibold text-slate-600 flex items-center gap-2 mt-2">${s.icons?.benefits ? `<span>${s.icons.benefits}</span>` : ''}<span>Benefits</span></div>
          <ul class="list-disc ml-5 text-slate-700">
            ${(Array.isArray(s.benefits) ? s.benefits : [s.benefits]).map(b=>`<li>${b}</li>`).join('')}
          </ul>
          <div class="font-semibold text-slate-600 flex items-center gap-2 mt-2">${s.icons?.deadline ? `<span>${s.icons.deadline}</span>` : ''}<span>Deadline</span></div>
          <p class="text-slate-700 break-words">${s.deadline}</p>
          <div class="font-semibold text-slate-600 flex items-center gap-2 mt-2">${s.icons?.apply ? `<span>${s.icons.apply}</span>` : ''}<span>How to apply</span></div>
          <p class="text-slate-700 break-words">${s.apply}</p>
          ${(s.tags && s.tags.length) ? `<div class="mt-2 flex flex-wrap gap-1.5">${s.tags.map(t=>`<span class='px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 border border-slate-200'>${t}</span>`).join('')}</div>` : ''}
        </div>
        ${s.link ? `<a href="${s.link}" target="_blank" class="inline-flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-lg ${cat.btnBg} text-white shadow font-bold">Apply/Register <span>↗</span></a>` : ''}
      `;
      scrollRow.appendChild(card);
    });
    capsule.appendChild(scrollRow);
    grid.appendChild(capsule);
  });
}

// Highlights data and carousel
const HIGHLIGHTS = [
  { icon: '🗓️', title: 'Upcoming Deadlines', text: 'Minority Post-Matric closes Oct 31, 2025 (tentative). Check NSP.' },
  { icon: '🆕', title: 'New Scheme', text: 'Odisha Sports Talent Scholarship increased to ₹2,000/year.' },
  { icon: '💡', title: 'Tip', text: 'Filter by your class and income to see most relevant results.' },
];

let hlIndex = 0;
function renderHighlights() {
  const track = document.getElementById('highlightsTrack');
  const dots = document.getElementById('highlightsDots');
  if (!track || !dots) return;
  track.innerHTML = '';
  dots.innerHTML = '';
  HIGHLIGHTS.forEach((h, i) => {
    const slide = document.createElement('div');
    slide.className = 'min-w-full p-4';
    slide.innerHTML = `
      <div class="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 flex items-start gap-3">
        <div class="text-2xl">${h.icon}</div>
        <div>
          <div class="font-bold">${h.title}</div>
          <div class="text-sm text-slate-600">${h.text}</div>
        </div>
      </div>`;
    track.appendChild(slide);
    const dot = document.createElement('button');
    dot.className = 'w-2 h-2 rounded-full bg-slate-300';
    dot.addEventListener('click', () => { hlIndex = i; updateHighlightPosition(); });
    dots.appendChild(dot);
  });
  updateHighlightPosition();
}

function updateHighlightPosition() {
  const track = document.getElementById('highlightsTrack');
  const dots = document.getElementById('highlightsDots');
  if (!track || !dots) return;
  const width = track.parentElement ? track.parentElement.clientWidth : track.clientWidth;
  track.style.transform = `translateX(-${hlIndex * width}px)`;
  Array.from(dots.children).forEach((d, i) => {
    d.className = 'w-2 h-2 rounded-full ' + (i === hlIndex ? 'bg-brand-600' : 'bg-slate-300');
  });
}

// Navigation
function initNav() {
  $$(".nav-btn").forEach(btn => {
    btn.addEventListener('click', () => {
      const dest = btn.dataset.nav;
      if (dest === 'subjects') { showSection('sectionSubjects'); renderSubjects(); }
      if (dest === 'leaderboard') { showSection('sectionLeaderboard'); renderLeaderboard(); }
      if (dest === 'scholarships') { showSection('sectionScholarships'); renderHighlights(); renderScholarships(); attachScholarshipFilterHandlers(); attachCarouselHandlers(); }
      if (dest === 'games') {
        // Try external Games Hub; fallback to internal section if not reachable
        (async ()=>{
          const list = Array.from(new Set([
            window.REACT_GAMES_URL || '',
            'http://localhost:5173/games',
            'http://127.0.0.1:5173/games',
            'http://localhost:4173/games',
            'http://127.0.0.1:4173/games'
          ].filter(Boolean)));
          for (const u of list){
            try { await fetch(u, { mode: 'no-cors' }); window.open(u, '_blank', 'noopener'); return; } catch {}
          }
          showSection('sectionGames');
          initInSpaGames();
        })();
      }
    });
  });
  $('#backToSubjects').addEventListener('click', () => { showSection('sectionSubjects'); });
  $('#backToTopics').addEventListener('click', () => { showSection('sectionTopics'); });
  const backM6 = document.getElementById('backToSubjectsFromMath6');
  if (backM6) backM6.addEventListener('click', () => { showSection('sectionSubjects'); });

  // modal close
  $('#btnCloseResults').addEventListener('click', ()=> $('#modalResults').classList.add('hidden'));
  $('#modalResults').addEventListener('click', (e) => { if (e.target.id === 'modalResults') e.currentTarget.classList.add('hidden'); });
}

function attachScholarshipFilterHandlers() {
  const q = document.getElementById('filterQuery');
  const cat = document.getElementById('filterCategory');
  const cls = document.getElementById('filterClass');
  const inc = document.getElementById('filterIncome');
  const typ = document.getElementById('filterType');
  const apply = document.getElementById('btnApplyFilters');
  const reset = document.getElementById('btnResetFilters');
  if (!q || !cat || !cls || !inc || !typ || !apply || !reset) return;
  const sync = () => {
    scholarshipFilters.q = q.value || '';
    scholarshipFilters.category = cat.value || 'All';
    scholarshipFilters.class = cls.value || '';
    scholarshipFilters.income = inc.value || 'Any';
    scholarshipFilters.type = typ.value || 'All';
  };
  const run = () => { sync(); renderScholarships(); };
  apply.onclick = run;
  reset.onclick = () => {
    q.value = '';
    cat.value = 'All';
    cls.value = '';
    inc.value = 'Any';
    typ.value = 'All';
    run();
  };
  // also react on enter in search box
  q.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); run(); } });
}

function attachCarouselHandlers() {
  const prev = document.getElementById('hlPrev');
  const next = document.getElementById('hlNext');
  if (!prev || !next) return;
  prev.onclick = () => { hlIndex = (hlIndex - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length; updateHighlightPosition(); };
  next.onclick = () => { hlIndex = (hlIndex + 1) % HIGHLIGHTS.length; updateHighlightPosition(); };
  // auto-advance
  if (!window.__hlTimer) {
    window.__hlTimer = setInterval(() => {
      const asideVisible = !document.getElementById('sectionScholarships')?.classList.contains('hidden');
      if (asideVisible) { hlIndex = (hlIndex + 1) % HIGHLIGHTS.length; updateHighlightPosition(); }
    }, 5000);
  }
}

// Setup (profile onboarding) — handles the Save & Continue form
function handleSetup(){
  const form = document.getElementById('formSetup');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const grade = document.getElementById('setupGrade')?.value?.trim() || '';
    const language = document.getElementById('setupLang')?.value?.trim() || '';
    const name = document.getElementById('setupName')?.value?.trim() || '';
    if (!grade || !language || !name){
      toast('Please fill all fields');
      return;
    }
    storage.set(K.profile, { grade, language, name });
    if (!storage.get(K.progress)) storage.set(K.progress, getDefaultProgress());
    // Update UI state
    document.getElementById('btnAuth').textContent = 'Sign Out';
    document.getElementById('userSummary').classList.remove('hidden');
    showSection('sectionSubjects');
    renderSubjects();
    updateSummaryUI();
    toast('Profile saved');
  });
}

// Generic API helper with graceful local fallback
async function apiGet(path, params={}){
  // Build query string
  const qs = Object.entries(params)
    .filter(([,v])=> v!==undefined && v!==null && v!=='')
    .map(([k,v])=> `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  const tryUrls = [];
  // If caller passed an absolute path, use as-is; otherwise try common API bases
  if (/^https?:/i.test(path)) tryUrls.push(path + (qs?`?${qs}`:''));
  else {
    const baseCandidates = [
      '', // relative /api on same origin (served via dev server proxy)
      (typeof location!=='undefined' ? `${location.origin}` : ''),
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ].filter(Boolean);
    baseCandidates.forEach(b => tryUrls.push(`${b}${path}${qs?`?${qs}`:''}`));
  }
  for (const url of tryUrls){
    try {
      const ac = new AbortController();
      const t = setTimeout(()=>ac.abort(), 3500);
      const res = await fetch(url, { signal: ac.signal });
      clearTimeout(t);
      if (res.ok) return res.json();
    } catch {/* try next */}
  }
  // Fallback: synthesize simple data for practice/quiz endpoints
  // Supported paths used by this app:
  // - /api/questions/:chapterIndex
  // - /api/questions/randomOnly/all
  const makeMCQ = (text, options, answer) => ({ type:'mcq', question:text, options, answer });
  const makeFIB = (text, answer) => ({ type:'fib', question:text, answer });
  function mockFor(path){
    if (/\/api\/questions\/randomOnly\/all/.test(path)){
      return [
        makeMCQ('2 + 3 = ?', ['4','5','6','7'], '5'),
        makeFIB('10 - 4 = __', '6'),
        makeMCQ('Which is prime?', ['9','12','11','15'], '11'),
        makeFIB('Area of square side 4 = __', '16'),
        makeMCQ('0.5 =', ['1/3','1/2','2/3','3/4'], '1/2')
      ];
    }
    if (/\/api\/questions\/(\d+)/.test(path)){
      return [
        makeMCQ('Perimeter of square side 5?', ['10','15','20','25'], '20'),
        makeFIB('Simplify 8/12', '2/3'),
        makeMCQ('Angle of a straight line?', ['90°','120°','180°','360°'], '180°'),
        makeFIB('Successor of 999 = __', '1000'),
        makeMCQ('Place value of 7 in 5,7 2,943?', ['7','70','700','7000'], '700')
      ];
    }
    return [];
  }
  return mockFor(path);
}

// Mark notes as done in the light-weight topic notes mini-game
function markNotesDone(){
  if (!currentSubject || !currentTopic) return;
  const progress = storage.get(K.progress) || getDefaultProgress();
  progress.topics[currentSubject] ||= {};
  progress.topics[currentSubject][currentTopic] ||= {};
  progress.topics[currentSubject][currentTopic].notesDone = true;
  storage.set(K.progress, progress);
  refreshTopicBadges();
  updateSummaryUI();
}

// Boot
window.addEventListener('DOMContentLoaded', () => {
  initAuth();
  handleAuthUI();
  handleSetup();
  initNav();
  updateSummaryUI();
});

// Minimal Math 6 data (restored)
const math6Data = [
  {
    id: 'knowing-our-numbers',
    title: 'Knowing Our Numbers',
    concepts: [
      'Whole numbers start at 0; natural numbers start at 1.',
      'Properties: Closure, Commutativity, Associativity, Distributive law.'
    ],
    practice: [
      { q: 'Is subtraction closed for whole numbers? (yes/no)', answer: 'no', hint: '2−5 = −3 not whole.' },
      { q: 'Compute 12×(7+3) using distributive property', answer: '120', hint: '12×7 + 12×3' }
    ],
    quiz: [
      { type: 'mcq', text: 'Identity for addition of whole numbers', options: ['0','1','-1','None'], answer: '0' },
      { type: 'fib', text: 'Successor of 9,999 is ____', answer: '10,000' }
    ]
  }
];

// Math6 state
let math6QuizCurrent = [];
let math6QuizAnswers = [];
let math6QuizStartTime = 0;
let math6CurrentChapter = null;
let math6PracticeCurrent = [];
let math6QuizTimerId = null;
let math6QuizTimeLeft = 0;
let math6QuizMixed = false;

function clearMath6Content(){
  const content = document.getElementById('math6-content');
  if (content) content.innerHTML = '';
}

// getM6Progress(ch) defined below is used to compute real percentages

function renderMathSubjects(){
  const list = document.getElementById('math6-subjects');
  if (!list) return;
  list.innerHTML = '';
  const gradients = [
    'from-indigo-50 to-white','from-emerald-50 to-white','from-rose-50 to-white',
    'from-amber-50 to-white','from-sky-50 to-white','from-fuchsia-50 to-white'
  ];
  math6Data.forEach((c, idx) => {
    const g = gradients[idx % gradients.length];
    const pct = getM6Progress(c).total;
    const wrap = document.createElement('button');
    wrap.className = 'group text-left w-full rounded-2xl border border-slate-200 bg-gradient-to-br '+g+' p-4 shadow-soft transition transform hover:-translate-y-1 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400';
    wrap.setAttribute('data-ch-index', String(idx));
    wrap.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-xs font-bold text-slate-500">Chapter ${idx+1}</div>
          <div class="font-extrabold mt-0.5">${c.title}</div>
        </div>
        <div class="text-right text-xs text-slate-600">
          <div class="flex items-center gap-1"><span>📘</span><span>${c.concepts.length}</span></div>
          <div class="flex items-center gap-1"><span>✏️</span><span>${c.practice.length}</span></div>
          <div class="flex items-center gap-1"><span>❓</span><span>${c.quiz.length}</span></div>
        </div>
      </div>
      <div class="mt-3 flex items-center justify-between text-xs text-slate-600">
        <span>Progress</span>
        <span class="font-semibold" data-m6-card-pct="${idx}">${pct}%</span>
      </div>
      <div class="mt-1.5 h-2 bg-white/70 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-brand-500 to-indigo-500" data-m6-card-bar="${idx}" style="width:${pct}%"></div>
      </div>`;
    wrap.addEventListener('click', () => {
      renderChapter(idx, true);
      // hide grid to focus on chapter detail
      document.getElementById('math6-subjects').classList.add('hidden');
    });
    list.appendChild(wrap);
  });
}

function getM6Progress(ch){
  const progress = storage.get(K.progress) || getDefaultProgress();
  progress.math6 ||= {}; progress.math6[ch.id] ||= {};
  const st = progress.math6[ch.id];
  const notesPct = Math.min(100, Math.round(((st.notesRead || 0) / (ch.concepts.length || 1)) * 100));
  const practiceDoneCount = (st.practiceDoneIds?.length || (st.practiceDone?.filter(Boolean).length || 0));
  const practiceTarget = (st.practiceTarget || ch.practice.length || 1);
  const pracPct = Math.min(100, Math.round((practiceDoneCount / practiceTarget) * 100));
  const quizPct = Math.round(st.bestQuiz || 0);
  const total = Math.round(0.3*notesPct + 0.4*pracPct + 0.3*quizPct);
  return { notesPct, pracPct, quizPct, total };
}

function setM6Progress(chId, patch){
  const progress = storage.get(K.progress) || getDefaultProgress();
  progress.math6 ||= {}; progress.math6[chId] ||= {};
  Object.assign(progress.math6[chId], patch);
  storage.set(K.progress, progress);
}

function renderChapter(index, animate=false){
  const c = math6Data[index]; if (!c) return;
  const content = document.getElementById('math6-content');
  math6CurrentChapter = index;
  const prog = getM6Progress(c);
  content.innerHTML = `
    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft transition duration-300 ${animate ? 'opacity-0 translate-y-2' : ''}">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button id="m6BackChapters" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200">← Chapters</button>
          <div>
            <div class="text-xs text-slate-500 font-bold">Chapter ${index+1}</div>
            <h3 class="font-bold text-lg">${c.title}</h3>
          </div>
        </div>
        <div class="w-48">
          <div class="text-xs text-slate-500 mb-1" id="m6HeaderProgText">Progress ${prog.total}%</div>
          <div class="h-2 bg-slate-100 rounded-full overflow-hidden" id="m6HeaderProgWrap">
            <div class="h-full bg-gradient-to-r from-brand-500 to-indigo-500" id="m6HeaderProgBar" style="width:${prog.total}%"></div>
          </div>
        </div>
      </div>
      <div class="mt-4 flex items-center gap-2">
        <button data-tab="notes" class="m6tab px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200">📖 Notes</button>
        <button data-tab="practice" class="m6tab px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200">✏️ Practice</button>
        <button data-tab="quiz" class="m6tab px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200">❓ Quiz</button>
      </div>
      <div class="mt-4">
        <div id="m6TabNotes" class="hidden"></div>
        <div id="m6TabPractice" class="hidden"></div>
        <div id="m6TabQuiz" class="hidden"></div>
      </div>
    </div>`;
  // tab logic
  const tabs = Array.from(content.querySelectorAll('.m6tab'));
  const showTab = (name) => {
    ['notes','practice','quiz'].forEach(t => {
      const b = content.querySelector(`.m6tab[data-tab="${t}"]`);
      const pane = content.querySelector(`#m6Tab${t.charAt(0).toUpperCase()+t.slice(1)}`);
      if (t === name) {
        b.classList.add('bg-brand-600','text-white');
        b.classList.remove('bg-slate-100');
        pane.classList.remove('hidden');
        pane.classList.add('transition','duration-300','opacity-0','translate-y-2');
        requestAnimationFrame(()=>{
          pane.classList.remove('opacity-0','translate-y-2');
          pane.classList.add('opacity-100','translate-y-0');
        });
      } else {
        b.classList.remove('bg-brand-600','text-white');
        b.classList.add('bg-slate-100');
        content.querySelector(`#m6Tab${t.charAt(0).toUpperCase()+t.slice(1)}`).classList.add('hidden');
      }
    });
  };
  tabs.forEach(btn => btn.addEventListener('click', () => {
    const name = btn.dataset.tab;
    if (name === 'notes') renderNotesTab(index);
    if (name === 'practice') renderPracticeTab(index);
    if (name === 'quiz') renderQuizTab(index);
    showTab(name);
  }));
  // Default to Notes on open
  renderNotesTab(index); showTab('notes');
  // Back to chapters
  document.getElementById('m6BackChapters').onclick = () => {
    // hide content, show chapters grid
    document.getElementById('math6-subjects').classList.remove('hidden');
    content.innerHTML = '';
  };
  if (animate) requestAnimationFrame(() => {
    const box = content.firstElementChild;
    if (box) { box.classList.remove('opacity-0','translate-y-2'); box.classList.add('opacity-100','translate-y-0'); }
  });
}

function renderNotesTab(index){
  const c = math6Data[index];
  const pane = document.getElementById('m6TabNotes');
  const chId = c.id;
  const progress = storage.get(K.progress) || getDefaultProgress();
  progress.math6 ||= {}; progress.math6[chId] ||= { notesRead: 0 };
  const st = progress.math6[chId];
  pane.innerHTML = '';
  c.concepts.forEach((text, i) => {
    const card = document.createElement('div');
    card.className = 'rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-soft';
    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-2"><span class="text-2xl">📘</span><div class="font-semibold">Concept ${i+1}</div></div>
        <button class="toggle px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm">Expand</button>
      </div>
      <div class="content mt-2 text-sm text-slate-700 hidden">
        <p>${text}</p>
        <div class="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">Highlight: Focus on keywords and examples.</div>
        <div class="mt-3 flex items-center gap-2">
          <button class="mark px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm">Mark as read</button>
          <span class="status text-xs text-slate-500">${(st.notesReadIdx?.[i])?'Read':''}</span>
        </div>
      </div>`;
    const toggle = card.querySelector('.toggle');
    const contentEl = card.querySelector('.content');
    const mark = card.querySelector('.mark');
    toggle.addEventListener('click', ()=>{
      contentEl.classList.toggle('hidden');
    });
    mark.addEventListener('click', ()=>{
      const p = storage.get(K.progress) || getDefaultProgress();
      p.math6 ||= {}; p.math6[chId] ||= {}; p.math6[chId].notesReadIdx ||= [];
      if (!p.math6[chId].notesReadIdx[i]) {
        p.math6[chId].notesReadIdx[i] = true;
        p.math6[chId].notesRead = (p.math6[chId].notesRead || 0) + 1;
        storage.set(K.progress, p);
        gainPoints(5); // small reward for reading
        updateChapterProgressHeader(index);
        card.querySelector('.status').textContent = 'Read';
      }
    });
    pane.appendChild(card);
  });
}

function updateChapterProgressHeader(index){
  const c = math6Data[index]; const prog = getM6Progress(c);
  const headerPct = document.getElementById('m6HeaderProgText');
  const bar = document.getElementById('m6HeaderProgBar');
  if (headerPct) headerPct.textContent = `Progress ${prog.total}%`;
  if (bar) bar.style.width = `${prog.total}%`;
  updateChapterCardProgress(index);
}

function updateChapterCardProgress(index){
  const c = math6Data[index]; const prog = getM6Progress(c);
  const pctEl = document.querySelector(`[data-m6-card-pct="${index}"]`);
  const barEl = document.querySelector(`[data-m6-card-bar="${index}"]`);
  if (pctEl) pctEl.textContent = `${prog.total}%`;
  if (barEl) barEl.style.width = `${prog.total}%`;
}

function renderPracticeTab(index){
  const c = math6Data[index]; if (!c) return;
  const work = document.getElementById('m6TabPractice');
  work.innerHTML = '';
  const controls = document.createElement('div');
  controls.className = 'flex items-center gap-2 mb-3';
  controls.innerHTML = `
    <label class="text-sm text-slate-600">Difficulty</label>
    <select id="m6PracDiff" class="px-3 py-2 rounded-lg border border-slate-200">
      <option value="">All</option>
      <option>easy</option>
      <option>medium</option>
      <option>hard</option>
    </select>
    <button id="m6LoadPractice" class="px-3 py-2 rounded-lg bg-indigo-600 text-white">Load Questions</button>`;
  work.appendChild(controls);
  const list = document.createElement('div'); list.id = 'm6PracticeList'; list.className = 'space-y-3'; work.appendChild(list);
  const btn = document.getElementById('m6LoadPractice');
  const diffSel = document.getElementById('m6PracDiff');
  const load = async () => {
    try {
      btn.disabled = true; btn.textContent = 'Loading...';
      const qs = await apiGet(`/api/questions/${index+1}`, { count: 10, difficulty: diffSel.value || undefined });
      math6PracticeCurrent = qs;
      // set practice target for progress percent
      setM6Progress(c.id, { practiceTarget: qs.length });
      renderPracticeList(index, qs);
    } catch (e) {
      toast('Failed to load practice');
    } finally { btn.disabled = false; btn.textContent = 'Load Questions'; }
  };
  btn.addEventListener('click', load);
  // auto-load on open
  load();
}

function renderPracticeList(index, items){
  const list = document.getElementById('m6PracticeList'); if (!list) return;
  list.innerHTML = '';
  items.forEach((q, i) => {
    const row = document.createElement('div');
    row.className = 'p-3 rounded-2xl border bg-white shadow-soft hover:shadow-glow transition';
    const stem = document.createElement('div'); stem.className = 'text-sm font-medium'; stem.textContent = `${i+1}. ${q.question || q.text || ''}`; row.appendChild(stem);
    const actions = document.createElement('div'); actions.className = 'mt-2 flex items-center gap-2';
    if (q.type === 'mcq' && q.options?.length) {
      const ops = document.createElement('div'); ops.className = 'grid grid-cols-2 gap-2';
      q.options.forEach(opt => {
        const lab = document.createElement('label'); lab.className = 'flex items-center gap-2 text-sm';
        const inp = document.createElement('input'); inp.type = 'radio'; inp.name = 'm6p'+i; inp.addEventListener('change', ()=> actions.dataset.selected = opt);
        lab.appendChild(inp); const sp = document.createElement('span'); sp.textContent = opt; lab.appendChild(sp); ops.appendChild(lab);
      });
      row.appendChild(ops);
    } else {
      const input = document.createElement('input'); input.type = 'text'; input.className = 'px-3 py-1.5 rounded-lg border border-slate-300'; input.placeholder = 'Answer';
      actions.appendChild(input);
    }
    const check = document.createElement('button'); check.className = 'px-3 py-1.5 rounded-lg bg-blue-600 text-white check'; check.textContent = 'Check';
    const sol = document.createElement('button'); sol.className = 'px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200'; sol.textContent = 'Solution';
    sol.addEventListener('click', ()=> toast('Solution: ' + (q.explanation || q.hint || 'Think step by step')));
    check.addEventListener('click', ()=>{
      const val = actions.querySelector('input[type="text"]')?.value ?? actions.dataset.selected ?? '';
      checkPractice(index, i, val, row, { answer: q.answer, hint: q.explanation || q.hint, id: q._id });
    });
    actions.appendChild(check); actions.appendChild(sol); row.appendChild(actions);
    list.appendChild(row);
  });
}

function normalizeAns(s){
  return (s||'')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\u2212/g, '-') // unicode minus to hyphen
    .replace(/[,\s]/g, '')   // remove commas and spaces for numeric compare
    .replace(/°/g, '');       // drop degree symbol
}

function checkPractice(chIndex, qIndex, val, rowEl, p){
  const correct = normalizeAns(val) === normalizeAns(p.answer);
  if (correct) {
    rowEl.classList.add('bg-emerald-50','border-emerald-200');
    rowEl.querySelector('.check').disabled = true;
    gainPoints(10);
    // streak increment
    const progress = storage.get(K.progress) || getDefaultProgress();
    progress.streak += 1;
    // track practice completion for this question (avoid double count)
    const ch = math6Data[chIndex];
    progress.math6 ||= {}; progress.math6[ch.id] ||= { practiceDone: [] };
    if (!progress.math6[ch.id].practiceDone) progress.math6[ch.id].practiceDone = [];
    if (p.id) {
      progress.math6[ch.id].practiceDoneIds ||= [];
      if (!progress.math6[ch.id].practiceDoneIds.includes(p.id)) progress.math6[ch.id].practiceDoneIds.push(p.id);
    } else {
      if (!progress.math6[ch.id].practiceDone[qIndex]) progress.math6[ch.id].practiceDone[qIndex] = true;
    }
    storage.set(K.progress, progress);
    updateSummaryUI();
    updateChapterProgressHeader(chIndex);
    toast('✅ Correct! +10 XP');
  } else {
    rowEl.classList.add('bg-rose-50','border-rose-200');
    toast('❌ Try again. Hint: ' + (p.hint||'review concepts'));
  }
}

function renderQuizTab(index){
  const c = math6Data[index]; if (!c) return;
  const work = document.getElementById('m6TabQuiz');
  clearInterval(math6QuizTimerId); math6QuizTimerId = null;
  work.innerHTML = `
    <div class="p-3 rounded-2xl border bg-white">
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div class="font-semibold">Quiz • ${c.title}</div>
        <div class="flex items-center gap-2 text-sm">
          <label>Difficulty</label>
          <select id="m6QuizDiff" class="px-2 py-1 rounded-lg border border-slate-200">
            <option value="">All</option>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>
          <label>Count</label>
          <select id="m6QuizCount" class="px-2 py-1 rounded-lg border border-slate-200">
            ${[5,6,7,8,9,10].map(n=>`<option>${n}</option>`).join('')}
          </select>
          <label class="flex items-center gap-1"><input id="m6QuizMixed" type="checkbox"/> Mixed</label>
          <div class="px-2 py-1 rounded-lg bg-slate-100">⏱ <span id="m6Timer">0s</span></div>
          <button id="m6StartQuiz" class="px-3 py-2 rounded-lg bg-indigo-600 text-white">Start</button>
          <button id="m6SubmitQuiz" class="px-3 py-2 rounded-lg bg-emerald-600 text-white" disabled>Submit</button>
        </div>
      </div>
      <div id="m6QuizList" class="mt-3 space-y-3"></div>
    </div>`;
  const list = document.getElementById('m6QuizList');
  list.innerHTML = '';
  const startBtn = document.getElementById('m6StartQuiz');
  const submitBtn = document.getElementById('m6SubmitQuiz');
  const diffSel = document.getElementById('m6QuizDiff');
  const countSel = document.getElementById('m6QuizCount');
  const mixedCb = document.getElementById('m6QuizMixed');
  const timerEl = document.getElementById('m6Timer');
  const renderQuizList = () => {
    list.innerHTML = '';
    math6QuizCurrent.forEach((q, i) => {
      const card = document.createElement('div');
      card.className = 'p-3 rounded-xl border bg-white shadow-soft';
      card.innerHTML = `<div class=\"font-semibold mb-2\">${i+1}. ${q.question || q.text || ''}</div>`;
      if (q.type === 'mcq') {
        const ops = document.createElement('div'); ops.className = 'grid grid-cols-2 gap-2';
        (q.options||[]).forEach(opt => {
          const lab = document.createElement('label'); lab.className = 'flex items-center gap-2';
          const inp = document.createElement('input'); inp.type = 'radio'; inp.name = 'm6q'+i; inp.addEventListener('change', ()=> math6QuizAnswers[i] = opt);
          lab.appendChild(inp); const sp = document.createElement('span'); sp.textContent = opt; lab.appendChild(sp); ops.appendChild(lab);
        });
        card.appendChild(ops);
      } else if (q.type === 'fib') {
        const inp = document.createElement('input'); inp.type = 'text'; inp.className = 'px-3 py-2 rounded-lg border border-slate-300'; inp.placeholder = 'Your answer';
        inp.addEventListener('input', (e)=> math6QuizAnswers[i] = e.target.value); card.appendChild(inp);
      } else {
        const ta = document.createElement('textarea'); ta.rows = 2; ta.className = 'w-full px-3 py-2 rounded-lg border border-slate-300'; ta.placeholder = 'Brief answer';
        ta.addEventListener('input', (e)=> math6QuizAnswers[i] = e.target.value); card.appendChild(ta);
      }
      list.appendChild(card);
    });
  };
  const start = async () => {
    try {
      startBtn.disabled = true; submitBtn.disabled = true; startBtn.textContent = 'Loading...';
      const count = Number(countSel.value);
      const difficulty = diffSel.value || undefined;
      math6QuizMixed = !!mixedCb.checked;
      let qs = [];
      if (math6QuizMixed) qs = await apiGet('/api/questions/randomOnly/all', { count, difficulty });
      else qs = await apiGet(`/api/questions/${index+1}`, { count, difficulty });
      math6QuizCurrent = qs; math6QuizAnswers = new Array(qs.length).fill('');
      renderQuizList();
      math6QuizTimeLeft = Math.max(30, qs.length * 20);
      timerEl.textContent = `${math6QuizTimeLeft}s`;
      clearInterval(math6QuizTimerId);
      math6QuizTimerId = setInterval(() => {
        math6QuizTimeLeft -= 1; timerEl.textContent = `${math6QuizTimeLeft}s`;
        if (math6QuizTimeLeft <= 0) { clearInterval(math6QuizTimerId); submitQuiz(); }
      }, 1000);
      math6QuizStartTime = Date.now();
      submitBtn.disabled = false;
    } catch (e) {
      toast('Failed to start quiz');
    } finally {
      startBtn.disabled = false; startBtn.textContent = 'Start';
    }
  };
  startBtn.addEventListener('click', start);
  submitBtn.addEventListener('click', submitQuiz);
}

function submitQuiz(){
  if (!math6QuizCurrent.length) { toast('No questions to submit'); return; }
  clearInterval(math6QuizTimerId); math6QuizTimerId = null;
  let correct = 0;
  math6QuizCurrent.forEach((q, i) => {
    const a = normalizeAns(math6QuizAnswers[i]);
    const exp = normalizeAns(q.answer);
    if (a && exp && a === exp) correct += 1;
  });
  const total = math6QuizCurrent.length;
  // +20 XP per correct
  const xpGained = correct * 20;
  if (correct > 0) gainPoints(xpGained);
  // streak += correct
  const progress = storage.get(K.progress) || getDefaultProgress();
  progress.streak += correct; storage.set(K.progress, progress); updateSummaryUI();
  const pct = Math.round((correct/total)*100);
  setRankByScore(pct);
  // persist best quiz for this chapter
  if (!math6QuizMixed && math6CurrentChapter !== null) {
    const ch = math6Data[math6CurrentChapter];
    const p = storage.get(K.progress) || getDefaultProgress();
    p.math6 ||= {}; p.math6[ch.id] ||= {};
    p.math6[ch.id].bestQuiz = Math.max(p.math6[ch.id].bestQuiz || 0, pct);
    p.math6[ch.id].attempts = (p.math6[ch.id].attempts || 0) + 1;
    p.math6[ch.id].lastTimeMs = (Date.now() - (math6QuizStartTime || Date.now()));
    storage.set(K.progress, p);
    updateChapterProgressHeader(math6CurrentChapter);
  }
  const elapsed = Date.now() - (math6QuizStartTime || Date.now());
  openMath6ResultsModal(correct, total - correct, pct, elapsed, xpGained, () => {
    renderQuizTab(math6CurrentChapter);
    document.getElementById('modalResults').classList.add('hidden');
  });
}

function openMath6ResultsModal(correct, wrong, scorePct, elapsedMs, xpGained, onRetry){
  $('#modalResults').classList.remove('hidden');
  $('#resultsScore').textContent = String(scorePct);
  const seconds = Math.max(1, Math.round(elapsedMs/1000));
  $('#resultsFeedback').textContent = `Time: ${seconds}s • XP: +${xpGained}`;
  // hide or clear topic switcher
  const sw = $('#resultsTopicSwitcher'); if (sw) { sw.innerHTML = ''; sw.onchange = null; }
  // add retry button if not present
  let retry = document.getElementById('m6RetryQuizBtn');
  if (!retry) {
    retry = document.createElement('button');
    retry.id = 'm6RetryQuizBtn';
    retry.className = 'mt-3 px-3 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700';
    const rightCol = $('#modalResults .space-y-3');
    if (rightCol) rightCol.appendChild(retry);
  }
  retry.textContent = 'Retry Quiz';
  retry.onclick = onRetry;
  // chart
  const ctx = document.getElementById('resultsChart');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: { labels: ['Correct','Wrong'], datasets: [{ data: [correct, wrong], backgroundColor: ['#10b981','#ef4444'] }] },
    options: { plugins: { legend: { position: 'bottom' } } }
  });
}
