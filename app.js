const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const MAX_FRET = 17;
const STRINGS = [
  { label: "e", note: "E", midi: 64 },
  { label: "B", note: "B", midi: 59 },
  { label: "G", note: "G", midi: 55 },
  { label: "D", note: "D", midi: 50 },
  { label: "A", note: "A", midi: 45 },
  { label: "E", note: "E", midi: 40 }
];

const SCALES = {
  "major-pentatonic": {
    name: "Major Pentatonic",
    formula: "1 2 3 5 6",
    intervals: [0, 2, 4, 7, 9],
    use: "明亮、開放，適合敬拜歌 intro、interlude、輕快 lead lines。避免彈太密，留空間俾 vocal。"
  },
  "minor-pentatonic": {
    name: "Minor Pentatonic",
    formula: "1 b3 4 5 b7",
    intervals: [0, 3, 5, 7, 10],
    use: "最重要嘅 lead toolbox，適合 rock worship build-up、solo、call-and-response。"
  },
  blues: {
    name: "Blues Scale",
    formula: "1 b3 4 b5 5 b7",
    intervals: [0, 3, 5, 6, 7, 10],
    use: "比 minor pentatonic 多一粒 blue note，適合短句加 tension；敬拜用時要節制，落點回 chord tone。"
  },
  major: {
    name: "Major Scale",
    formula: "1 2 3 4 5 6 7",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    use: "理解 diatonic chords、melody 同 key center 嘅根基。用嚟連接 CAGED positions。"
  },
  minor: {
    name: "Natural Minor",
    formula: "1 2 b3 4 5 b6 b7",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    use: "適合 minor key worship、情緒較深嘅 bridge 或 spontaneous section。"
  },
  dorian: {
    name: "Dorian Mode",
    formula: "1 2 b3 4 5 6 b7",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    use: "minor 感覺但有明亮 6th，適合 modern worship vamp，例如 ii 或 ivm 色彩。"
  },
  mixolydian: {
    name: "Mixolydian Mode",
    formula: "1 2 3 4 5 6 b7",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    use: "dominant / suspended worship groove 好好用，特別係 V chord 上面。"
  },
  lydian: {
    name: "Lydian Mode",
    formula: "1 2 3 #4 5 6 7",
    intervals: [0, 2, 4, 6, 7, 9, 11],
    use: "比 major scale 更漂浮、明亮，#4 令 pad、swells、ambient lead 有開天窗感；落點仍要回 1、3、5。"
  },
  phrygian: {
    name: "Phrygian Mode",
    formula: "1 b2 b3 4 5 b6 b7",
    intervals: [0, 1, 3, 5, 7, 8, 10],
    use: "深色、帶 tension，適合短暫 dramatic build 或 minor vamp；b2 要當經過音，唔好長時間停住。"
  },
  "harmonic-minor": {
    name: "Harmonic Minor",
    formula: "1 2 b3 4 5 b6 7",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    use: "有 strong leading tone，適合 minor key 入面製造回 i 嘅拉力；solo 用少量 phrase 已經好有味道。"
  },
  "melodic-minor": {
    name: "Melodic Minor",
    formula: "1 2 b3 4 5 6 7",
    intervals: [0, 2, 3, 5, 7, 9, 11],
    use: "minor 但比較清亮，適合 fusion/pop worship 嘅過門；6 同 7 會令線條更向前。"
  },
  "major-blues": {
    name: "Major Blues",
    formula: "1 2 b3 3 5 6",
    intervals: [0, 2, 3, 4, 7, 9],
    use: "major pentatonic 加 b3 passing tone，適合 gospel、soul、happy worship hook；b3 要滑入 3 先自然。"
  }
};

const CAGED = [
  { shape: "C", openRoot: "C", range: "Root on A/B strings", advice: "C shape 幫你睇到高音弦嘅 3rd，非常適合 melodic fill。" },
  { shape: "A", openRoot: "A", range: "Root on A string", advice: "A shape 係中把位 rhythm triads 同 double-stops 嘅核心。" },
  { shape: "G", openRoot: "G", range: "Root on low/high E", advice: "G shape 橫跨範圍大，練連接 phrases 時好有用。" },
  { shape: "E", openRoot: "E", range: "Root on E string", advice: "E shape 係 rock lead 最直覺嘅位置，minor pentatonic box 常喺呢度。" },
  { shape: "D", openRoot: "D", range: "Root on D/B strings", advice: "D shape 高把位好唱，適合 intro hook、swells、ambient lead。" }
];

const TRIADS = [
  { type: "Major", formula: "1 3 5", intervals: [0, 4, 7] },
  { type: "Minor", formula: "1 b3 5", intervals: [0, 3, 7] },
  { type: "Diminished", formula: "1 b3 b5", intervals: [0, 3, 6] },
  { type: "Augmented", formula: "1 3 #5", intervals: [0, 4, 8] },
  { type: "Sus2", formula: "1 2 5", intervals: [0, 2, 7] },
  { type: "Sus4", formula: "1 4 5", intervals: [0, 5, 7] }
];

const TRIADS_BY_SCALE = {
  "major-pentatonic": [
    { label: "I", rootDegree: "1", type: "Major", use: "最穩陣嘅 home triad，適合 intro hook 同 chorus landing。" },
    { label: "vi", rootDegree: "6", type: "Minor", use: "同 I 共用好多音，適合柔和轉接同 emotional lift。" },
    { label: "I sus2", rootDegree: "1", type: "Sus2", use: "開放 worship 聲音，backup triad 好安全。" },
    { label: "V sus2", rootDegree: "5", type: "Sus2", use: "明亮但唔太滿，適合 delay arpeggio。" }
  ],
  "minor-pentatonic": [
    { label: "i", rootDegree: "1", type: "Minor", use: "minor pentatonic 最重要落點，solo 要識返屋企。" },
    { label: "bIII", rootDegree: "b3", type: "Major", use: "rock worship 常用上揚色彩，適合 answer phrase。" },
    { label: "iv sus2", rootDegree: "4", type: "Sus2", use: "保留 minor 感但更開放，適合 backup texture。" },
    { label: "bVII sus4", rootDegree: "b7", type: "Sus4", use: "好適合 bridge vamp，同 delay 配合自然。" }
  ],
  blues: [
    { label: "i", rootDegree: "1", type: "Minor", use: "blues scale 入面最安全嘅落點。" },
    { label: "i° color", rootDegree: "1", type: "Diminished", use: "用 b5 製造張力，只適合短暫經過。" },
    { label: "bIII", rootDegree: "b3", type: "Major", use: "rock/blues response，很適合 call-and-response。" },
    { label: "iv sus2", rootDegree: "4", type: "Sus2", use: "比完整 minor chord 更少衝突，適合敬拜隊伴奏。" }
  ],
  major: [
    { label: "I", rootDegree: "1", type: "Major", use: "home chord，melody 最穩陣落點。" },
    { label: "ii", rootDegree: "2", type: "Minor", use: "柔和 pre-chorus 或 passing harmony。" },
    { label: "iii", rootDegree: "3", type: "Minor", use: "連去 IV 或 vi 時好用。" },
    { label: "IV", rootDegree: "4", type: "Major", use: "worship chorus 常用 lift。" },
    { label: "V", rootDegree: "5", type: "Major", use: "建立回 I 嘅方向。" },
    { label: "vi", rootDegree: "6", type: "Minor", use: "emotional color，現代敬拜非常常見。" },
    { label: "vii°", rootDegree: "7", type: "Diminished", use: "leading tension，只用短暫 passing。" }
  ],
  minor: [
    { label: "i", rootDegree: "1", type: "Minor", use: "minor key home chord。" },
    { label: "ii°", rootDegree: "2", type: "Diminished", use: "暗色 passing tension，短暫使用。" },
    { label: "III", rootDegree: "b3", type: "Major", use: "minor key 入面最常用明亮對比。" },
    { label: "iv", rootDegree: "4", type: "Minor", use: "沉實嘅 worship bridge 色彩。" },
    { label: "v", rootDegree: "5", type: "Minor", use: "自然小調色彩，少啲 dominant 壓力。" },
    { label: "VI", rootDegree: "b6", type: "Major", use: "cinematic lift，適合大段落轉折。" },
    { label: "VII", rootDegree: "b7", type: "Major", use: "rock worship 常見上行動力。" }
  ],
  dorian: [
    { label: "i", rootDegree: "1", type: "Minor", use: "minor 但唔太黑暗嘅 home。" },
    { label: "ii", rootDegree: "2", type: "Minor", use: "Dorian 特有流動感，適合 vamp。" },
    { label: "bIII", rootDegree: "b3", type: "Major", use: "minor phrase 入面嘅明亮對比。" },
    { label: "IV", rootDegree: "4", type: "Major", use: "Dorian signature，因為有 natural 6。" },
    { label: "v", rootDegree: "5", type: "Minor", use: "穩定 passing harmony。" },
    { label: "vi°", rootDegree: "6", type: "Diminished", use: "短暫 tension，唔好停太耐。" },
    { label: "bVII", rootDegree: "b7", type: "Major", use: "modern worship vamp 常用。" }
  ],
  mixolydian: [
    { label: "I", rootDegree: "1", type: "Major", use: "dominant/open home chord。" },
    { label: "ii", rootDegree: "2", type: "Minor", use: "柔和 passing harmony。" },
    { label: "iii°", rootDegree: "3", type: "Diminished", use: "b7 帶出 tension，只作經過。" },
    { label: "IV", rootDegree: "4", type: "Major", use: "sus worship groove 好用。" },
    { label: "v", rootDegree: "5", type: "Minor", use: "mixolydian 入面嘅 darker color。" },
    { label: "vi", rootDegree: "6", type: "Minor", use: "連接 I 同 IV 時順耳。" },
    { label: "bVII", rootDegree: "b7", type: "Major", use: "mixolydian signature，rock worship 常見。" }
  ]
};

const TONES = [
  {
    name: "Clean Worship Arp",
    role: "backup",
    settings: ["Clean amp", "Compressor 2:1", "Quarter delay 18-25%", "Plate reverb 20-30%", "High-pass 100 Hz"],
    note: "適合 verse、fingerpicked arpeggio、低動態段落。"
  },
  {
    name: "Edge Rhythm",
    role: "backup",
    settings: ["Edge-of-breakup amp", "Low-gain drive", "Short room reverb", "Dotted 8th delay very low", "Tone slightly dark"],
    note: "適合 chorus strum、palm mute、build-up；要同 acoustic 分工。"
  },
  {
    name: "Ambient Lead",
    role: "lead",
    settings: ["Clean/edge amp", "Transparent OD", "Dotted 8th delay 35-45%", "Hall reverb 35-50%", "Expression pedal on delay/reverb send"],
    note: "適合 intro hook、spontaneous、bridge swell。"
  },
  {
    name: "Rock Lead",
    role: "lead",
    settings: ["Crunch amp", "Mid-focused OD", "Delay 25-35%", "Plate reverb 15-25%", "Solo boost +3 dB"],
    note: "適合 big chorus、instrumental break，但要避開 vocal register。"
  }
];

const RIFFS_BY_SCALE = {
  "major-pentatonic": [
    { name: "Bright Worship Hook", degrees: ["1", "2", "3", "5", "6", "5", "3", "2"], rhythm: "8th notes, last note hold 1 beat", use: "Intro 或 verse fill：短句問答，最後停喺 2 或 3 等 vocal 入。" },
    { name: "I to vi Lift", degrees: ["1", "3", "5", "6", "5", "3", "1"], rhythm: "quarter + 8th pattern", use: "I 同 vi 之間嘅明亮 lift，適合 chorus 前。" },
    { name: "Dotted 8th Pulse", degrees: ["1", "5", "6", "5", "3", "2", "1"], rhythm: "dotted 8th delay, pick sparse notes", use: "最典型 worship lead texture；右手少彈，俾 delay 幫你填空。" }
  ],
  "minor-pentatonic": [
    { name: "Minor Rock Answer", degrees: ["1", "b3", "4", "5", "b7", "5", "4", "1"], rhythm: "two 16ths + 8th feel", use: "用 minor 色彩回應 vocal；敬拜歌入面要短，不要變成長 solo。" },
    { name: "Bend Target", degrees: ["4", "5", "b7", "5", "b3", "1"], rhythm: "short lead answer", use: "4 去 5 可以做 bend 或 slide，但落點要穩。" },
    { name: "Low Build Motif", degrees: ["1", "1", "b3", "4", "5", "4", "b3", "1"], rhythm: "palm-muted 8ths", use: "適合 build-up，右手由 muted 慢慢打開。" }
  ],
  blues: [
    { name: "Blue Note Turn", degrees: ["1", "b3", "4", "b5", "5", "b7", "5", "4"], rhythm: "shuffle-straight hybrid", use: "b5 只係經過音，彈完要立即 resolve。" },
    { name: "Blues Climb", degrees: ["1", "b3", "4", "b5", "5", "b5", "4", "b3", "1"], rhythm: "16th-note climb", use: "適合短 lead fill，唔好蓋過 vocal。" },
    { name: "Tension Release", degrees: ["b3", "4", "b5", "5", "b7", "5", "1"], rhythm: "syncopated answer", use: "用 b5 製造一秒 tension，最後返 root。" }
  ],
  major: [
    { name: "Major Scale Run", degrees: ["1", "2", "3", "4", "5", "6", "5", "3"], rhythm: "even 8ths", use: "用完整 major scale 練 4 同 7，令旋律更 hymn-like。" },
    { name: "Leading Tone Resolve", degrees: ["5", "6", "7", "8", "7", "6", "5"], rhythm: "hold the 8", use: "練 7 去 1 嘅解決感，適合轉入 chorus。" },
    { name: "IV Lift Line", degrees: ["3", "4", "5", "6", "5", "4", "3"], rhythm: "quarter + 8ths", use: "3-4-5 係敬拜旋律好常見嘅 lift。" }
  ],
  minor: [
    { name: "Natural Minor Rise", degrees: ["1", "2", "b3", "4", "5", "b6", "b7", "8"], rhythm: "ascending 8ths", use: "完整小調上行，練 b6 同 b7 嘅味道。" },
    { name: "Bridge Tension", degrees: ["5", "b6", "b7", "8", "b7", "5", "b3", "1"], rhythm: "slow dotted pulse", use: "適合 minor bridge 或 spontaneous section。" },
    { name: "Minor Fall", degrees: ["8", "b7", "b6", "5", "4", "b3", "2", "1"], rhythm: "descending line", use: "用嚟練落行旋律，最後停喺 root。" }
  ],
  dorian: [
    { name: "Dorian Lift", degrees: ["1", "2", "b3", "5", "6", "b7", "6", "5"], rhythm: "8th-note vamp", use: "natural 6 係重點，令 minor riff 變明亮。" },
    { name: "Minor Bright Hook", degrees: ["b3", "4", "5", "6", "5", "b3", "2", "1"], rhythm: "hook with slide", use: "適合 modern worship vamp，minor 但唔沉。" },
    { name: "Vamp Pulse", degrees: ["1", "5", "6", "b7", "6", "5", "b3", "1"], rhythm: "dotted 8th pulse", use: "用 delay 會好有流動感。" }
  ],
  mixolydian: [
    { name: "Dominant Hook", degrees: ["1", "2", "3", "5", "6", "b7", "6", "5"], rhythm: "driving 8ths", use: "b7 係 mixolydian signature，適合 open worship groove。" },
    { name: "Sus Groove", degrees: ["1", "4", "5", "b7", "5", "4", "3", "1"], rhythm: "syncopated riff", use: "1-4-5-b7 做到 suspended / dominant 感。" },
    { name: "Resolve to I", degrees: ["b7", "6", "5", "3", "2", "1"], rhythm: "short resolution", use: "由 b7 落返 1，適合 turnaround。" }
  ]
};

const POWER_SHAPES = [
  { name: "6 弦 root (E-shape)", rootStringLabel: "E", offsets: [{ string: "E", add: 0 }, { string: "A", add: 2 }, { string: "D", add: 2 }], fingers: "1 - 3 - 4", use: "最典型 rock power chord，chorus / bridge build 最直接。" },
  { name: "5 弦 root (A-shape)", rootStringLabel: "A", offsets: [{ string: "A", add: 0 }, { string: "D", add: 2 }, { string: "G", add: 2 }], fingers: "1 - 3 - 4", use: "中頻清楚嘅 backup grip，避開低頻撞 bass。" },
  { name: "4 弦 root (D-shape)", rootStringLabel: "D", offsets: [{ string: "D", add: 0 }, { string: "G", add: 2 }, { string: "B", add: 3 }], fingers: "1 - 3 - 4", use: "高把位 voicing，適合 intro hook、ambient lead。" }
];

const DEGREE_INTERVALS = {
  "1": 0,
  "2": 2,
  "b3": 3,
  "3": 4,
  "4": 5,
  "b5": 6,
  "5": 7,
  "6": 9,
  "b6": 8,
  "b7": 10,
  "7": 11,
  "8": 12
};

const TABS = ["scale", "triad", "riff", "power"];

const keySelect = document.querySelector("#keySelect");
const scaleSelect = document.querySelector("#scaleSelect");
const shapeSelect = document.querySelector("#shapeSelect");

let activeTab = "scale";
let selectedTriadIndex = 0;
let selectedRiffIndex = 0;
let fingerSystem = "caged"; // "caged" | "3nps" | "penta" — only affects the Scale tab
let scalePos = 0;           // active position/box index for 3NPS or pentatonic systems

function scaleFamily(scaleKey) {
  if (["minor", "minor-pentatonic", "blues", "dorian", "phrygian", "harmonic-minor", "melodic-minor"].includes(scaleKey)) {
    return "minor";
  }
  if (scaleKey === "major-blues") return "major-pentatonic";
  return "major";
}

function noteIndex(note) {
  return NOTES.indexOf(note);
}

function scaleDegreeLabels(scaleKey) {
  return SCALES[scaleKey].formula.split(" ");
}

function isPentatonicFamily(scaleKey) {
  return SCALES[scaleKey].intervals.length < 7;
}

function secondarySystem(scaleKey) {
  return isPentatonicFamily(scaleKey) ? "penta" : "3nps";
}

function positionCount(scaleKey) {
  return SCALES[scaleKey].intervals.length;
}

function normalizeSystem() {
  if (fingerSystem !== "caged" && fingerSystem !== secondarySystem(scaleSelect.value)) {
    fingerSystem = secondarySystem(scaleSelect.value);
  }
  scalePos = Math.min(Math.max(0, scalePos), positionCount(scaleSelect.value) - 1);
}

// Pentatonic / blues box: a 4-fret window anchored on the chosen scale degree (low-E root).
function pentaWindow(root, scaleKey) {
  const intervals = SCALES[scaleKey].intervals;
  const start = (rootFretOnString(root, "E") + intervals[scalePos]) % 12;
  return { offset: start, start, end: Math.min(MAX_FRET, start + 3) };
}

// 3-notes-per-string box: exactly 3 scale tones on every string, climbing the neck.
function build3NPSBox(root, scaleKey) {
  const intervals = SCALES[scaleKey].intervals;
  const labels = scaleDegreeLabels(scaleKey);
  const rootPc = noteIndex(root);
  const pcLabel = new Map();
  intervals.forEach((interval, i) => pcLabel.set((rootPc + interval) % 12, labels[i]));
  const pcSet = new Set(pcLabel.keys());
  const nextTone = midi => {
    let next = midi + 1;
    while (!pcSet.has(((next % 12) + 12) % 12)) next += 1;
    return next;
  };
  const startFret = (rootFretOnString(root, "E") + intervals[scalePos]) % 12;
  let cur = 40 + startFret; // low-E open = MIDI 40
  const box = [];
  [...STRINGS].reverse().forEach(string => {
    const trio = [];
    for (let i = 0; i < 3; i += 1) { trio.push(cur); cur = nextTone(cur); }
    const frets = trio.map(midi => midi - string.midi);
    const midFinger = (frets[1] - frets[0]) <= (frets[2] - frets[1]) ? 2 : 3;
    const fingers = [1, midFinger, 4];
    trio.forEach((midi, i) => {
      box.push({
        stringLabel: string.label,
        fret: frets[i],
        degree: pcLabel.get(((midi % 12) + 12) % 12),
        finger: String(fingers[i])
      });
    });
  });
  return box;
}

function transpose(root, interval) {
  return NOTES[(noteIndex(root) + interval) % NOTES.length];
}

function scaleNotes(root, scaleKey) {
  return SCALES[scaleKey].intervals.map(interval => transpose(root, interval));
}

function triadNotes(root, triadType = "Major") {
  const triad = TRIADS.find(item => item.type === triadType) || TRIADS[0];
  return triad.intervals.map(interval => transpose(root, interval));
}

function activeTriads(scaleKey = scaleSelect.value) {
  return TRIADS_BY_SCALE[scaleKey] || TRIADS_BY_SCALE[scaleFamily(scaleKey)] || TRIADS_BY_SCALE.major;
}

function activeRiffs(scaleKey = scaleSelect.value) {
  return RIFFS_BY_SCALE[scaleKey] || RIFFS_BY_SCALE[scaleFamily(scaleKey)] || RIFFS_BY_SCALE.major;
}

function triadOptionNotes(root, option) {
  const chordRoot = degreeNote(root, option.rootDegree);
  return triadNotes(chordRoot, option.type);
}

function triadFormula(option) {
  const triad = TRIADS.find(item => item.type === option.type) || TRIADS[0];
  return triad.formula;
}

function noteAt(openNote, fret) {
  return transpose(openNote, fret);
}

function activeCagedShape() {
  return CAGED.find(item => item.shape === shapeSelect.value) || CAGED[0];
}

function cagedOffset(root, shape = activeCagedShape()) {
  return (noteIndex(root) - noteIndex(shape.openRoot) + 12) % 12;
}

function handPosition(root = keySelect.value, shape = activeCagedShape()) {
  const offset = cagedOffset(root, shape);
  const start = offset === 0 ? 1 : offset;
  return {
    offset,
    start,
    end: Math.min(MAX_FRET, start + 4)
  };
}

function fingerForFret(fret, position) {
  if (fret === 0) return "O";
  if (fret < position.start || fret > position.end) return "";
  return String(Math.min(4, Math.max(1, fret - position.start + 1)));
}

function degreeNote(root, degree) {
  return transpose(root, DEGREE_INTERVALS[degree]);
}

function firstFretInRange(targetNote, openNote, start, end) {
  for (let fret = start; fret <= end; fret += 1) {
    if (noteAt(openNote, fret) === targetNote) return fret;
  }
  return null;
}

function mapKey(stringLabel, fret) {
  return `${stringLabel}:${fret}`;
}

/* ---- Audio: tap a fret to hear it (Karplus-Strong plucked string) ---- */
let audioCtx = null;
let masterGain = null;

function getAudioCtx() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.8;
    const comp = audioCtx.createDynamicsCompressor();
    comp.threshold.value = -10;
    comp.knee.value = 18;
    comp.ratio.value = 6;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;
    masterGain.connect(comp);
    comp.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

const TONE_CONFIGS = {
  acoustic: { label: "木結他", damping: 0.9955, dur: 1.7, level: 0.85, hp: 80, lp: 5200, drive: false },
  clean: { label: "電 Clean", damping: 0.997, dur: 2.2, level: 0.8, hp: 110, lp: 6800, drive: false },
  drive: { label: "電 Distortion", damping: 0.9975, dur: 2.4, level: 0.5, hp: 150, lp: 3200, drive: true, preGain: 7 }
};

function makeDriveCurve(amount) {
  const n = 2048;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i += 1) {
    const x = (i / n) * 2 - 1;
    curve[i] = (1 + amount) * x / (1 + amount * Math.abs(x));
  }
  return curve;
}

const DRIVE_CURVE = makeDriveCurve(50);

let toneMode = "clean";
try {
  const saved = localStorage.getItem("egl-tone");
  if (saved && TONE_CONFIGS[saved]) toneMode = saved;
} catch (error) { /* localStorage unavailable */ }

function pluck(midi) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const cfg = TONE_CONFIGS[toneMode] || TONE_CONFIGS.clean;
  const freq = midiToFreq(midi);
  const sr = ctx.sampleRate;
  const dur = cfg.dur;
  const len = Math.floor(sr * dur);
  const buffer = ctx.createBuffer(1, len, sr);
  const out = buffer.getChannelData(0);
  const n = Math.max(2, Math.round(sr / freq));
  const ring = new Float32Array(n);
  for (let i = 0; i < n; i += 1) ring[i] = Math.random() * 2 - 1;
  let pos = 0;
  for (let i = 0; i < len; i += 1) {
    const avg = (ring[pos] + ring[(pos + 1) % n]) * 0.5 * cfg.damping;
    ring[pos] = avg;
    out[i] = avg;
    pos = (pos + 1) % n;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const env = ctx.createGain();
  env.gain.setValueAtTime(cfg.level, ctx.currentTime);
  env.gain.exponentialRampToValueAtTime(0.0008, ctx.currentTime + dur);

  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = cfg.hp;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = cfg.lp;

  let head = src;
  if (cfg.drive) {
    const pre = ctx.createGain();
    pre.gain.value = cfg.preGain;
    const shaper = ctx.createWaveShaper();
    shaper.curve = DRIVE_CURVE;
    shaper.oversample = "4x";
    head.connect(pre);
    pre.connect(shaper);
    head = shaper;
  }
  head.connect(hp);
  hp.connect(lp);
  lp.connect(env);
  env.connect(masterGain || ctx.destination);
  src.start();
  src.stop(ctx.currentTime + dur);
}

function setTone(mode) {
  if (!TONE_CONFIGS[mode]) return;
  toneMode = mode;
  try { localStorage.setItem("egl-tone", mode); } catch (error) { /* ignore */ }
  document.querySelectorAll("#toneSelect [data-tone]").forEach(button => {
    button.classList.toggle("active", button.dataset.tone === mode);
  });
  pluck(52);
}

let seqTimers = [];

function stopSequence() {
  seqTimers.forEach(timer => window.clearTimeout(timer));
  seqTimers = [];
}

function pingDot(dot) {
  if (!dot) return;
  dot.classList.remove("pinged");
  void dot.offsetWidth;
  dot.classList.add("pinged");
}

function playChord(triadOption) {
  if (!triadOption) return;
  const chordRoot = degreeNote(keySelect.value, triadOption.rootDegree);
  const triad = TRIADS.find(item => item.type === triadOption.type) || TRIADS[0];
  const base = 48 + noteIndex(chordRoot);
  triad.intervals.forEach((interval, i) => window.setTimeout(() => pluck(base + interval), i * 34));
}

function playRiff(riff) {
  if (!riff) return;
  const position = handPosition(keySelect.value);
  const positions = resolveRiffPositions(keySelect.value, riff, position);
  const step = 30000 / metro.bpm; // eighth notes
  stopSequence();
  positions.forEach((item, i) => {
    seqTimers.push(window.setTimeout(() => {
      if (item.midi !== undefined) pluck(item.midi);
      const dot = [...document.querySelectorAll("#fretboard-riff .note.map-focus")]
        .find(node => node.textContent === String(i + 1));
      pingDot(dot);
    }, i * step));
  });
}

/* ---- Metronome ---- */
const metro = { running: false, bpm: 90, timer: null, beat: 0 };

function metroClick(accent) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const t = ctx.currentTime;
  osc.type = "square";
  osc.frequency.value = accent ? 2000 : 1300;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(accent ? 0.5 : 0.3, t + 0.001);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.06);
}

function metroRenderBeat(beatInBar) {
  document.querySelectorAll("#metroBeats .beat").forEach((node, i) => {
    node.classList.toggle("on", i === beatInBar);
  });
}

function metroTick() {
  const beatInBar = metro.beat % 4;
  metroClick(beatInBar === 0);
  metroRenderBeat(beatInBar);
  metro.beat += 1;
}

function updateMetroUI() {
  const toggle = document.querySelector("#metroToggle");
  const moreBtn = document.querySelector("#moreBtn");
  if (toggle) {
    toggle.textContent = metro.running ? "停止節拍器" : "開始節拍器";
    toggle.classList.toggle("running", metro.running);
  }
  if (moreBtn) moreBtn.classList.toggle("metro-on", metro.running);
}

function startMetro() {
  if (metro.running) return;
  getAudioCtx();
  metro.running = true;
  metro.beat = 0;
  metroTick();
  metro.timer = window.setInterval(metroTick, 60000 / metro.bpm);
  updateMetroUI();
}

function stopMetro() {
  metro.running = false;
  if (metro.timer) window.clearInterval(metro.timer);
  metro.timer = null;
  document.querySelectorAll("#metroBeats .beat").forEach(node => node.classList.remove("on"));
  updateMetroUI();
}

function setBpm(value) {
  metro.bpm = Math.min(220, Math.max(40, Math.round(value)));
  const valueNode = document.querySelector("#bpmValue");
  const slider = document.querySelector("#bpmSlider");
  if (valueNode) valueNode.textContent = metro.bpm;
  if (slider) slider.value = metro.bpm;
  if (metro.running) {
    window.clearInterval(metro.timer);
    metro.timer = window.setInterval(metroTick, 60000 / metro.bpm);
  }
}

function riffBaseMidi(root, position) {
  const lowFret = (noteIndex(root) - noteIndex("E") + 12) % 12; // root on the low-E string, 0-11
  let base = 40 + lowFret; // low-E open string is MIDI 40
  while (base - 40 < position.start) base += 12; // lift octave so the root sits at/above the hand position
  return base;
}

function resolveRiffPositions(root, riff, position) {
  const base = riffBaseMidi(root, position);
  return riff.degrees.map((degree, index) => {
    const midi = base + DEGREE_INTERVALS[degree];
    const note = NOTES[((midi % 12) + 12) % 12];
    let best = null;
    STRINGS.forEach(candidate => {
      const fret = midi - candidate.midi;
      if (fret < 0 || fret > MAX_FRET) return;
      const dist = fret < position.start
        ? position.start - fret
        : (fret > position.end ? fret - position.end : 0);
      if (!best || dist < best.dist || (dist === best.dist && fret < best.fret)) {
        best = { string: candidate.label, fret, dist };
      }
    });
    return {
      degree,
      index,
      note,
      midi,
      string: best ? best.string : null,
      fret: best ? best.fret : null
    };
  });
}

function rootFretOnString(root, stringLabel) {
  const string = STRINGS.find(item => item.label === stringLabel);
  return (noteIndex(root) - noteIndex(string.note) + 12) % 12;
}

function buildMapData(mode, root, position) {
  const focus = new Map();
  const notes = scaleNotes(root, scaleSelect.value);
  const chordType = scaleFamily(scaleSelect.value) === "minor" ? "Minor" : "Major";
  const defaultChordTones = triadNotes(root, chordType);

  if (mode === "triad") {
    const options = activeTriads();
    const triad = options[selectedTriadIndex] || options[0];
    const triadNoteList = triadOptionNotes(root, triad);
    const degreeLabels = triadFormula(triad).split(" ");
    STRINGS.forEach(string => {
      for (let fret = position.start; fret <= position.end; fret += 1) {
        const note = noteAt(string.note, fret);
        const triadIndex = triadNoteList.indexOf(note);
        if (triadIndex >= 0) focus.set(mapKey(string.label, fret), degreeLabels[triadIndex]);
      }
    });
    return {
      notes: triadNoteList,
      chordTones: triadNoteList,
      focus,
      showPosition: true,
      title: `${triad.label} · ${degreeNote(root, triad.rootDegree)} ${triad.type} · ${activeCagedShape().shape} shape`,
      detail: `${triadFormula(triad)}。喺第 ${position.start}-${position.end} 格亮起呢三粒音，可做 backup voicing 或 lead landing。`
    };
  }

  if (mode === "riff") {
    const riffs = activeRiffs();
    const riff = riffs[selectedRiffIndex] || riffs[0];
    resolveRiffPositions(root, riff, position).forEach(item => {
      if (item.string && item.fret !== null) focus.set(mapKey(item.string, item.fret), String(item.index + 1));
    });
    return {
      notes: riff.degrees.map(degree => degreeNote(root, degree)),
      chordTones: defaultChordTones,
      focus,
      showPosition: true,
      title: `${riff.name} · ${root} · ${activeCagedShape().shape} shape`,
      detail: `數字係彈奏次序。先慢速跟住 ${riff.degrees.join(" - ")}，然後先加節奏：${riff.rhythm}。`
    };
  }

  if (mode === "power") {
    const fifth = transpose(root, 7);
    return {
      notes: [root, fifth],
      chordTones: [],
      focus,
      showPosition: false,
      title: `${root}5 · 全指板 power chords`,
      detail: `紅點 = root (1)，藍點 = 5th。任何一個 root 配上方一條弦 +2 格嘅 5th 就係 power chord；想加 octave 再上一條弦。`
    };
  }

  if (fingerSystem === "3nps") {
    const fingerMap = new Map();
    build3NPSBox(root, scaleSelect.value).forEach(item => {
      if (item.fret < 0 || item.fret > MAX_FRET) return;
      focus.set(mapKey(item.stringLabel, item.fret), item.degree);
      fingerMap.set(mapKey(item.stringLabel, item.fret), item.finger);
    });
    return {
      notes,
      chordTones: defaultChordTones,
      focus,
      fingerMap,
      showPosition: false,
      title: `${root} ${SCALES[scaleSelect.value].name} · 3NPS Pos ${scalePos + 1}`,
      detail: `每弦三粒音（3 NPS），圈內數字 = 音級。順住七個 position 爬上去就連通成條 neck；高把位 = 同一形狀 +12 格。紅／藍圈仍然係 chord-tone 落點。`
    };
  }

  const scalePosition = fingerSystem === "penta" ? pentaWindow(root, scaleSelect.value) : position;
  const systemLabel = fingerSystem === "penta" ? `Box ${scalePos + 1}` : `${activeCagedShape().shape} shape`;
  return {
    notes,
    chordTones: defaultChordTones,
    focus,
    showPosition: true,
    position: scalePosition,
    title: `${root} ${SCALES[scaleSelect.value].name} · ${systemLabel}`,
    detail: `全部音階音顯示出嚟；第 ${scalePosition.start}-${scalePosition.end} 格係今次練習手位。`
  };
}

function buildFretboard(container, mode) {
  const root = keySelect.value;
  const position = handPosition(root);
  const data = buildMapData(mode, root, position);
  const showPos = data.showPosition !== false;
  const pos = data.position || position;
  const fifth = transpose(root, 7);

  const markerFrets = [3, 5, 7, 9, 12, 15, 17];

  container.innerHTML = "";
  container.appendChild(label("", "corner-label"));
  for (let fret = 0; fret <= MAX_FRET; fret += 1) {
    const fretLabel = label(fret === 0 ? "Open" : fret);
    if (fret === 0) fretLabel.classList.add("open-head");
    if (markerFrets.includes(fret)) fretLabel.classList.add("marker-fret");
    if (showPos && fret >= pos.start && fret <= pos.end) fretLabel.classList.add("in-position");
    container.appendChild(fretLabel);
  }

  STRINGS.forEach(string => {
    container.appendChild(label(string.label, "string-label"));
    for (let fret = 0; fret <= MAX_FRET; fret += 1) {
      const note = noteAt(string.note, fret);
      const cell = document.createElement("div");
      cell.className = fret === 0 ? "open-cell" : "fret-cell";
      if (fret > 0 && markerFrets.includes(fret)) cell.classList.add("marker-fret");
      if (showPos && fret >= pos.start && fret <= pos.end) cell.classList.add("in-position");
      const dot = document.createElement("span");
      dot.className = "note";
      dot.textContent = note;
      dot.dataset.midi = String(string.midi + fret);
      if (data.notes.includes(note)) dot.classList.add("in-scale");
      if (note === root) dot.classList.add("root");
      if (data.chordTones.includes(note)) dot.classList.add("triad");
      if (mode === "power" && note === fifth) dot.classList.add("fifth");
      const focusLabel = data.focus.get(mapKey(string.label, fret));
      if (focusLabel) {
        dot.classList.add("map-focus");
        dot.textContent = focusLabel;
        dot.setAttribute("aria-label", `${note} ${string.label}${fret}, pattern step ${focusLabel}`);
      }
      let finger = "";
      if (data.fingerMap) {
        finger = data.fingerMap.get(mapKey(string.label, fret)) || "";
      } else if (showPos && fret > 0 && data.notes.includes(note)) {
        finger = fingerForFret(fret, pos);
      }
      if (finger) {
        const badge = document.createElement("small");
        badge.className = "finger-badge";
        badge.textContent = finger;
        dot.appendChild(badge);
      }
      cell.appendChild(dot);
      container.appendChild(cell);
    }
  });

  return data;
}

function label(text, extra = "fret-label") {
  const node = document.createElement("div");
  node.className = extra;
  node.textContent = text;
  return node;
}

function setStatus(mode, data) {
  document.querySelector(`#status-${mode}-title`).textContent = data.title;
  document.querySelector(`#status-${mode}-detail`).textContent = data.detail;
}

function populateSelects() {
  NOTES.forEach(note => keySelect.add(new Option(note, note)));
  Object.entries(SCALES).forEach(([key, scale]) => scaleSelect.add(new Option(scale.name, key)));
  CAGED.forEach(item => shapeSelect.add(new Option(`${item.shape} shape`, item.shape)));
  keySelect.value = "C";
  scaleSelect.value = "major-pentatonic";
  shapeSelect.value = "C";
}

function fingerGuideHTML(rows) {
  return rows.map(item => `
    <div class="finger-card">
      <b>${item[0]}</b>
      <span>${item[1]}</span>
      <small>${item[2]}</small>
    </div>
  `).join("");
}

function renderScaleFocus() {
  const root = keySelect.value;
  const active = SCALES[scaleSelect.value];
  document.querySelector("#currentTitle").textContent = `${root} ${active.name}`;
  document.querySelector("#scaleFormula").textContent = active.formula;
  document.querySelector("#scaleUse").textContent = active.use;
  document.querySelector("#noteChips").innerHTML = scaleNotes(root, scaleSelect.value)
    .map(note => `<span class="chip">${note}</span>`)
    .join("");

  const titleNode = document.querySelector("#positionTitle");
  const adviceNode = document.querySelector("#positionAdvice");
  const guideNode = document.querySelector("#fingerGuide");

  if (fingerSystem === "3nps") {
    titleNode.textContent = `3NPS · Position ${scalePos + 1}`;
    adviceNode.textContent = "每條弦彈三粒音，食指 → 中指（或無名指）→ 尾指順住 roll。先 alternate picking 慢練，再連去下一個 position；目標係由低把位一路爬到高把位都唔斷。";
    guideNode.innerHTML = fingerGuideHTML([
      ["3", "每弦音數", "固定三粒，平均對稱"],
      ["7", "Position", "七個形狀鋪滿成條 neck"],
      ["+12", "高把位", "同一形狀上一個八度"],
      ["1·3·5", "Chord tone", "紅／藍圈仍然係落點"]
    ]);
    return;
  }

  const position = fingerSystem === "penta" ? pentaWindow(root, scaleSelect.value) : handPosition(root, activeCagedShape());
  const tag = fingerSystem === "penta" ? `Box ${scalePos + 1}` : `${activeCagedShape().shape} shape`;
  titleNode.textContent = `${root} · ${tag} 手指位`;
  adviceNode.textContent = `集中練第 ${position.start}-${position.end} 格。食指負責第 ${position.start} 格，中指第 ${position.start + 1} 格，無名指第 ${position.start + 2} 格，尾指第 ${position.start + 3} 至 ${position.end} 格；先慢速準確，再加速度。`;
  guideNode.innerHTML = fingerGuideHTML([
    ["1", "食指", `第 ${position.start} 格 / barre anchor`],
    ["2", "中指", `第 ${position.start + 1} 格`],
    ["3", "無名指", `第 ${position.start + 2} 格`],
    ["4", "尾指", `第 ${position.start + 3}-${position.end} 格`]
  ]);
}

function renderFingerSystem() {
  const seg = document.querySelector("#systemSeg");
  const pills = document.querySelector("#posPills");
  if (!seg || !pills) return;
  const secondary = secondarySystem(scaleSelect.value);
  const options = [
    { id: "caged", label: "CAGED" },
    { id: secondary, label: secondary === "3nps" ? "3NPS" : "5-Box" }
  ];
  seg.innerHTML = options.map(option => `
    <button type="button" class="seg-btn ${fingerSystem === option.id ? "active" : ""}" data-system="${option.id}">${option.label}</button>
  `).join("");
  seg.querySelectorAll("[data-system]").forEach(button => {
    button.addEventListener("click", () => {
      if (fingerSystem === button.dataset.system) return;
      fingerSystem = button.dataset.system;
      scalePos = 0;
      update();
    });
  });

  if (fingerSystem === "caged") {
    pills.innerHTML = "";
    pills.hidden = true;
    return;
  }
  pills.hidden = false;
  const prefix = fingerSystem === "3nps" ? "Pos" : "Box";
  const count = positionCount(scaleSelect.value);
  let html = "";
  for (let i = 0; i < count; i += 1) {
    html += `<button type="button" class="pos-pill ${i === scalePos ? "active" : ""}" data-pos="${i}">${prefix} ${i + 1}</button>`;
  }
  pills.innerHTML = html;
  pills.querySelectorAll("[data-pos]").forEach(button => {
    button.addEventListener("click", () => {
      scalePos = Number(button.dataset.pos);
      update();
    });
  });
}

function renderScaleCards() {
  const current = scaleSelect.value;
  document.querySelector("#scaleCards").innerHTML = Object.entries(SCALES)
    .map(([key, scale]) => `
      <button class="card ${key === current ? "active" : ""}" type="button" data-scale-card="${key}">
        <strong>${scale.name}</strong>
        <p>${scale.formula}</p>
        <p>${scale.use}</p>
      </button>
    `)
    .join("");
  document.querySelectorAll("[data-scale-card]").forEach(button => {
    button.addEventListener("click", () => {
      if (scaleSelect.value === button.dataset.scaleCard) return;
      scaleSelect.value = button.dataset.scaleCard;
      selectedTriadIndex = 0;
      selectedRiffIndex = 0;
      scalePos = 0;
      update();
    });
  });
}

function renderCaged() {
  const activeShape = shapeSelect.value;
  const selected = CAGED.find(item => item.shape === activeShape) || CAGED[0];
  document.querySelector("#cagedFlow").innerHTML = CAGED.map(item => `
    <button class="shape-pill ${item.shape === activeShape ? "active" : ""}" type="button" data-shape="${item.shape}">
      <b>${item.shape}</b>
      <span>${item.range}</span>
    </button>
  `).join("");
  document.querySelector("#cagedAdvice").textContent = `${selected.shape} shape：${selected.advice}`;
  document.querySelectorAll("[data-shape]").forEach(button => {
    button.addEventListener("click", () => {
      shapeSelect.value = button.dataset.shape;
      update();
    });
  });
}

function triadTypeShort(type) {
  return { Major: "", Minor: "m", Diminished: "dim", Augmented: "aug", Sus2: "sus2", Sus4: "sus4" }[type] ?? type;
}

function renderTriads() {
  const root = keySelect.value;
  const options = activeTriads();

  document.querySelector("#triadChips").innerHTML = options.map((triad, triadIndex) => {
    const chord = `${degreeNote(root, triad.rootDegree)}${triadTypeShort(triad.type)}`;
    return `
      <button class="t-chip ${triadIndex === selectedTriadIndex ? "active" : ""}" type="button" data-triad="${triadIndex}">
        <b>${triad.label}</b>
        <span>${chord}</span>
      </button>
    `;
  }).join("");

  const selected = options[selectedTriadIndex] || options[0];
  const chordRoot = degreeNote(root, selected.rootDegree);
  document.querySelector("#triadDetail").innerHTML = `
    <strong>${selected.label} · ${chordRoot} ${selected.type}</strong>
    <p class="triad-detail-notes">${triadFormula(selected)} · ${triadOptionNotes(root, selected).join(" ")}</p>
    <p class="body-copy">${selected.use}</p>
  `;

  document.querySelectorAll("#triadChips [data-triad]").forEach(button => {
    button.addEventListener("click", () => {
      selectedTriadIndex = Number(button.dataset.triad);
      update();
      playChord(activeTriads()[selectedTriadIndex]);
    });
  });
}

function renderRiffs() {
  const root = keySelect.value;
  const position = handPosition(root);
  const riffs = activeRiffs();
  document.querySelector("#riffCards").innerHTML = riffs.map((riff, riffIndex) => {
    const noteLine = riff.degrees.map(degree => `${degree}:${degreeNote(root, degree)}`).join(" · ");
    const fretHints = resolveRiffPositions(root, riff, position)
      .map(item => item.string ? `${item.note} ${item.string}${item.fret}` : `${item.note} outside position`)
      .join("  ");

    return `
      <button class="riff-card ${riffIndex === selectedRiffIndex ? "active" : ""}" type="button" data-riff="${riffIndex}">
        <strong>${riff.name}</strong>
        <p class="riff-notes">${noteLine}</p>
        <p>${riff.rhythm}</p>
        <code>${fretHints}</code>
        <p>${riff.use}</p>
      </button>
    `;
  }).join("");
  document.querySelectorAll("[data-riff]").forEach(button => {
    button.addEventListener("click", () => {
      selectedRiffIndex = Number(button.dataset.riff);
      update();
      playRiff(activeRiffs()[selectedRiffIndex]);
    });
  });
}

function renderPowerShapes() {
  const root = keySelect.value;
  const fifth = transpose(root, 7);
  document.querySelector("#powerShapeCards").innerHTML = POWER_SHAPES.map(shape => {
    const base = rootFretOnString(root, shape.rootStringLabel);
    const grip = shape.offsets
      .map(off => `${off.string}${base + off.add}`)
      .join("  ");
    return `
      <article class="power-card">
        <strong>${root}5 · ${shape.name}</strong>
        <p>Notes: ${root} + ${fifth}</p>
        <code>${grip}</code>
        <p>Fingers: ${shape.fingers}</p>
        <p>${shape.use}</p>
      </article>
    `;
  }).join("");
}

function renderTones() {
  document.querySelector("#toneCards").innerHTML = TONES
    .map(tone => `
      <article class="tone-card">
        <strong>${tone.name}</strong>
        <p>${tone.role === "lead" ? "Lead 主音" : "Backup 伴奏"}</p>
        <p>${tone.note}</p>
        <ul>${tone.settings.map(setting => `<li>${setting}</li>`).join("")}</ul>
      </article>
    `)
    .join("");
}

function renderPracticeSummary() {
  let systemTag = `${shapeSelect.value} shape`;
  if (activeTab === "scale") {
    if (fingerSystem === "3nps") systemTag = `3NPS Pos ${scalePos + 1}`;
    else if (fingerSystem === "penta") systemTag = `Box ${scalePos + 1}`;
  }
  document.querySelector("#practiceSummary").textContent =
    `${keySelect.value} ${SCALES[scaleSelect.value].name} · ${systemTag}`;
}

function normalizeSelections() {
  selectedTriadIndex = Math.min(Math.max(0, selectedTriadIndex), activeTriads().length - 1);
  selectedRiffIndex = Math.min(Math.max(0, selectedRiffIndex), activeRiffs().length - 1);
}

function renderActiveView() {
  document.querySelectorAll("[data-view]").forEach(view => {
    view.hidden = view.dataset.view !== activeTab;
  });
  document.querySelectorAll(".bottom-menu [data-tab]").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === activeTab);
  });

  if (activeTab === "scale") {
    renderFingerSystem();
    setStatus("scale", buildFretboard(document.querySelector("#fretboard-scale"), "scale"));
    renderScaleFocus();
    renderScaleCards();
  } else if (activeTab === "triad") {
    renderTriads();
    setStatus("triad", buildFretboard(document.querySelector("#fretboard-triad"), "triad"));
  } else if (activeTab === "riff") {
    renderRiffs();
    setStatus("riff", buildFretboard(document.querySelector("#fretboard-riff"), "riff"));
  } else if (activeTab === "power") {
    setStatus("power", buildFretboard(document.querySelector("#fretboard-power"), "power"));
    renderPowerShapes();
  }
}

function update() {
  normalizeSelections();
  normalizeSystem();
  renderActiveView();
  renderCaged();
  renderPracticeSummary();
}

function setTab(tab, { scroll = true } = {}) {
  activeTab = TABS.includes(tab) ? tab : "scale";
  if (`#${activeTab}` !== window.location.hash) {
    window.history.replaceState(null, "", `#${activeTab}`);
  }
  update();
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

function openOverlay(name) {
  const overlay = document.querySelector(`.overlay[data-overlay="${name}"]`);
  if (!overlay) return;
  document.querySelectorAll(".overlay[data-overlay]").forEach(node => { node.hidden = true; });
  if (name === "tone") renderTones();
  overlay.hidden = false;
  document.body.classList.add("overlay-open");
}

function closeOverlay() {
  document.querySelectorAll(".overlay[data-overlay]").forEach(overlay => {
    overlay.hidden = true;
  });
  document.body.classList.remove("overlay-open");
}

const HASH_TO_TAB = {
  scale: "scale", scales: "scale", workbench: "scale", map: "scale",
  triad: "triad", triads: "triad",
  riff: "riff", riffs: "riff",
  power: "power"
};

function applyHash({ scroll = false } = {}) {
  const hash = (window.location.hash || "").slice(1).toLowerCase();
  if (hash === "caged") {
    setTab("scale", { scroll });
    openOverlay("caged");
    return;
  }
  if (hash === "mainstage" || hash === "tone") {
    setTab("scale", { scroll });
    openOverlay("tone");
    return;
  }
  setTab(HASH_TO_TAB[hash] || "scale", { scroll });
}

// --- wiring ---
populateSelects();
applyHash();

keySelect.addEventListener("change", update);
shapeSelect.addEventListener("change", update);
scaleSelect.addEventListener("change", () => {
  selectedTriadIndex = 0;
  selectedRiffIndex = 0;
  scalePos = 0;
  update();
});

document.querySelectorAll(".bottom-menu [data-tab]").forEach(button => {
  button.addEventListener("click", () => setTab(button.dataset.tab));
});

document.querySelectorAll(".fretboard").forEach(board => {
  board.addEventListener("click", event => {
    const dot = event.target.closest(".note");
    if (!dot || dot.dataset.midi === undefined) return;
    pluck(Number(dot.dataset.midi));
    dot.classList.remove("pinged");
    void dot.offsetWidth;
    dot.classList.add("pinged");
  });
});

document.querySelectorAll("[data-open-overlay]").forEach(button => {
  button.addEventListener("click", () => openOverlay(button.dataset.openOverlay));
});

document.querySelectorAll("[data-close-overlay]").forEach(button => {
  button.addEventListener("click", closeOverlay);
});

const bpmSlider = document.querySelector("#bpmSlider");
if (bpmSlider) bpmSlider.addEventListener("input", event => setBpm(Number(event.target.value)));
const bpmDown = document.querySelector("#bpmDown");
if (bpmDown) bpmDown.addEventListener("click", () => setBpm(metro.bpm - 4));
const bpmUp = document.querySelector("#bpmUp");
if (bpmUp) bpmUp.addEventListener("click", () => setBpm(metro.bpm + 4));
const metroToggle = document.querySelector("#metroToggle");
if (metroToggle) metroToggle.addEventListener("click", () => (metro.running ? stopMetro() : startMetro()));

document.querySelectorAll("#toneSelect [data-tone]").forEach(button => {
  button.classList.toggle("active", button.dataset.tone === toneMode);
  button.addEventListener("click", () => setTone(button.dataset.tone));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeOverlay();
});

window.addEventListener("hashchange", () => applyHash());

let deferredInstallPrompt = null;
const installAppButton = document.querySelector("#installAppButton");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.warn("Service worker registration failed:", error);
    });
  });
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installAppButton) installAppButton.hidden = false;
});

if (installAppButton) {
  installAppButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    installAppButton.hidden = true;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  });
}

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  if (installAppButton) installAppButton.hidden = true;
});
