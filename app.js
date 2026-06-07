const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const MAX_FRET = 17;
const STRINGS = [
  { label: "e", note: "E" },
  { label: "B", note: "B" },
  { label: "G", note: "G" },
  { label: "D", note: "D" },
  { label: "A", note: "A" },
  { label: "E", note: "E" }
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


const POWER_SHAPES_BY_CAGED = {
  C: [
    {
      name: "C-shape upper 5-1",
      entries: [{ string: "G", fret: 0 }, { string: "B", fret: 1 }],
      fingers: "1 - 2",
      use: "細聲 backup fragment，只彈兩條高弦，唔會霸住低頻。"
    },
    {
      name: "C-shape root octave",
      entries: [{ string: "A", fret: 3 }, { string: "G", fret: 5 }],
      fingers: "1 - 3，mute D string",
      use: "Lead hook 或 intro octave，用 palm mute 控制乾淨度。"
    },
    {
      name: "C-shape A-root extension",
      entries: [{ string: "A", fret: 3 }, { string: "D", fret: 5 }, { string: "G", fret: 5 }],
      fingers: "1 - 3 - 4",
      use: "由 C shape 嘅 A-string root 長出嚟，適合高把位 chorus hit。"
    }
  ],
  A: [
    {
      name: "A-shape root stack",
      entries: [{ string: "A", fret: 0 }, { string: "D", fret: 2 }, { string: "G", fret: 2 }],
      fingers: "1 - 3 - 4",
      use: "最常用 A-shape power grip，中頻清楚，適合 backup。"
    },
    {
      name: "A-shape upper 5-1",
      entries: [{ string: "D", fret: 2 }, { string: "G", fret: 2 }],
      fingers: "3 - 4 或 barre",
      use: "細聲 double-stop，配 delay 做 verse texture。"
    },
    {
      name: "A-shape octave lead",
      entries: [{ string: "A", fret: 0 }, { string: "G", fret: 2 }],
      fingers: "1 - 3，mute D string",
      use: "只保留 root octave，適合 lead line 同 response。"
    }
  ],
  G: [
    {
      name: "G-shape low wide grip",
      entries: [{ string: "E", fret: 3 }, { string: "A", fret: 5 }, { string: "D", fret: 5 }],
      fingers: "1 - 3 - 4",
      use: "G shape 低音 root 延伸出 classic power chord，適合大段 build。"
    },
    {
      name: "G-shape middle 5-1",
      entries: [{ string: "D", fret: 0 }, { string: "G", fret: 0 }],
      fingers: "1 - 1 或 open-style barre",
      use: "中把位 5-1 fragment，backup 可以彈得短而準。"
    },
    {
      name: "G-shape spread power",
      entries: [{ string: "D", fret: 0 }, { string: "G", fret: 0 }, { string: "e", fret: 3 }],
      fingers: "1 - 1 - 4",
      use: "比較開揚嘅 worship voicing，適合 ambient lead。"
    }
  ],
  E: [
    {
      name: "E-shape low stack",
      entries: [{ string: "E", fret: 0 }, { string: "A", fret: 2 }, { string: "D", fret: 2 }],
      fingers: "1 - 3 - 4",
      use: "最典型 rock power chord，chorus 或 bridge build 最直接。"
    },
    {
      name: "E-shape upper 5-1",
      entries: [{ string: "B", fret: 0 }, { string: "e", fret: 0 }],
      fingers: "1 - 1",
      use: "高音弦 fragment，適合 verse fill 或 dotted delay。"
    },
    {
      name: "E-shape root octave",
      entries: [{ string: "E", fret: 0 }, { string: "D", fret: 2 }],
      fingers: "1 - 3，mute A string",
      use: "Lead octave，彈 riff 時比完整 power chord 更清爽。"
    }
  ],
  D: [
    {
      name: "D-shape upper stack",
      entries: [{ string: "D", fret: 0 }, { string: "G", fret: 2 }, { string: "B", fret: 3 }],
      fingers: "1 - 2 - 4",
      use: "高把位 D-shape power voicing，適合 intro hook。"
    },
    {
      name: "D-shape upper 5-1",
      entries: [{ string: "G", fret: 2 }, { string: "B", fret: 3 }],
      fingers: "2 - 4",
      use: "最輕巧嘅 D-shape fragment，backup 唔會撞 vocal。"
    },
    {
      name: "D-shape high 1-5",
      entries: [{ string: "B", fret: 3 }, { string: "e", fret: 5 }],
      fingers: "1 - 3",
      use: "高音 lead dyad，適合 swells、response、ending tag。"
    }
  ]
};

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

const keySelect = document.querySelector("#keySelect");
const scaleSelect = document.querySelector("#scaleSelect");
const shapeSelect = document.querySelector("#shapeSelect");
const fretboard = document.querySelector("#fretboard");
let mapMode = "scale";
let selectedTriadIndex = 0;
let selectedRiffIndex = 0;
let selectedPowerIndex = 0;

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

function firstFretForNoteOnString(targetNote, openNote, start, end) {
  for (let fret = start; fret <= end; fret += 1) {
    if (noteAt(openNote, fret) === targetNote) return fret;
  }
  for (let fret = 0; fret <= MAX_FRET; fret += 1) {
    if (noteAt(openNote, fret) === targetNote) return fret;
  }
  return null;
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

function resolveRiffPositions(root, riff, position) {
  return riff.degrees.map((degree, index) => {
    const note = degreeNote(root, degree);
    const string = STRINGS.find(candidate => firstFretInRange(note, candidate.note, position.start, position.end) !== null);
    if (string) {
      return {
        degree,
        index,
        note,
        string: string.label,
        fret: firstFretInRange(note, string.note, position.start, position.end)
      };
    }
    return { degree, index, note, string: null, fret: null };
  });
}

function activePowerTemplates() {
  return POWER_SHAPES_BY_CAGED[shapeSelect.value] || POWER_SHAPES_BY_CAGED.E;
}

function powerChordShapes(root, shape = activeCagedShape()) {
  const offset = cagedOffset(root, shape);
  return activePowerTemplates().map(template => ({
    ...template,
    cagedShape: shape.shape,
    entries: template.entries.map(entry => ({
      string: entry.string,
      fret: offset + entry.fret
    }))
  }));
}

function activeMapData(root, position) {
  const focus = new Map();
  const notes = scaleNotes(root, scaleSelect.value);
  const chordType = scaleFamily(scaleSelect.value) === "minor" ? "Minor" : "Major";
  const defaultChordTones = triadNotes(root, chordType);

  if (mapMode === "triad") {
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
      title: `${triad.label} · ${degreeNote(root, triad.rootDegree)} ${triad.type} · ${activeCagedShape().shape} shape`,
      detail: `${triadFormula(triad)}。${triad.use} 喺第 ${position.start}-${position.end} 格內用呢三粒音做 backup voicing 或 lead landing notes。`
    };
  }

  if (mapMode === "riff") {
    const riffs = activeRiffs();
    const riff = riffs[selectedRiffIndex] || riffs[0];
    resolveRiffPositions(root, riff, position).forEach(item => {
      if (item.string && item.fret !== null) focus.set(mapKey(item.string, item.fret), String(item.index + 1));
    });
    return {
      notes: riff.degrees.map(degree => degreeNote(root, degree)),
      chordTones: defaultChordTones,
      focus,
      title: `${riff.name} · ${root} · ${activeCagedShape().shape} shape`,
      detail: `數字係彈奏次序。先慢速跟住 ${riff.degrees.join(" - ")}，然後先加節奏：${riff.rhythm}。`
    };
  }

  if (mapMode === "power") {
    const shape = powerChordShapes(root)[selectedPowerIndex] || powerChordShapes(root)[0];
    shape.entries.forEach((entry, index) => {
      const note = noteAt(STRINGS.find(string => string.label === entry.string).note, entry.fret);
      const tone = note === root ? "1" : "5";
      if (entry.fret >= 0 && entry.fret <= MAX_FRET) focus.set(mapKey(entry.string, entry.fret), tone);
    });
    return {
      notes: [root, transpose(root, 7)],
      chordTones: [root, transpose(root, 7)],
      focus,
      title: `${root}5 · ${shape.name} · ${shape.cagedShape} shape`,
      detail: `黑色標示係 power-chord tones：1 同 5；右上角小圓點係建議手指。Fingers: ${shape.fingers}。${shape.use}`
    };
  }

  return {
    notes,
    chordTones: defaultChordTones,
    focus,
    title: `${root} ${SCALES[scaleSelect.value].name} · ${activeCagedShape().shape} shape`,
    detail: `全部音階音顯示出嚟；第 ${position.start}-${position.end} 格係今次練習手位。`
  };
}

function populateSelects() {
  NOTES.forEach(note => keySelect.add(new Option(note, note)));
  Object.entries(SCALES).forEach(([key, scale]) => scaleSelect.add(new Option(scale.name, key)));
  CAGED.forEach(item => shapeSelect.add(new Option(`${item.shape} shape`, item.shape)));
  keySelect.value = "C";
  scaleSelect.value = "major-pentatonic";
  shapeSelect.value = "C";
}

function renderFretboard() {
  const root = keySelect.value;
  const position = handPosition(root);
  const mapData = activeMapData(root, position);

  fretboard.innerHTML = "";
  fretboard.appendChild(label(""));
  for (let fret = 0; fret <= MAX_FRET; fret += 1) {
    const fretLabel = label(fret === 0 ? "Open" : fret);
    if (fret >= position.start && fret <= position.end) fretLabel.classList.add("in-position");
    fretboard.appendChild(fretLabel);
  }

  STRINGS.forEach(string => {
    fretboard.appendChild(label(string.label, "string-label"));
    for (let fret = 0; fret <= MAX_FRET; fret += 1) {
      const note = noteAt(string.note, fret);
      const cell = document.createElement("div");
      cell.className = "fret-cell";
      if (fret >= position.start && fret <= position.end) cell.classList.add("in-position");
      const dot = document.createElement("span");
      dot.className = "note";
      dot.textContent = note;
      if (mapData.notes.includes(note)) dot.classList.add("in-scale");
      if (note === root) dot.classList.add("root");
      if (mapData.chordTones.includes(note)) dot.classList.add("triad");
      const focusLabel = mapData.focus.get(mapKey(string.label, fret));
      if (focusLabel) {
        dot.classList.add("map-focus");
        dot.textContent = focusLabel;
        dot.setAttribute("aria-label", `${note} ${string.label}${fret}, pattern step ${focusLabel}`);
      }
      const finger = fingerForFret(fret, position);
      if (mapData.notes.includes(note) && finger) {
        const badge = document.createElement("small");
        badge.className = "finger-badge";
        badge.textContent = finger;
        dot.appendChild(badge);
      }
      cell.appendChild(dot);
      fretboard.appendChild(cell);
    }
  });

  document.querySelector("#mapModeTitle").textContent = mapData.title;
  document.querySelector("#mapModeDetail").textContent = mapData.detail;
  document.querySelectorAll("[data-map-mode]").forEach(button => {
    button.classList.toggle("active", button.dataset.mapMode === mapMode);
  });
}

function label(text, extra = "fret-label") {
  const node = document.createElement("div");
  node.className = extra;
  node.textContent = text;
  return node;
}

function renderCurrent() {
  const root = keySelect.value;
  const active = SCALES[scaleSelect.value];
  const shape = activeCagedShape();
  const position = handPosition(root, shape);
  document.querySelector("#currentTitle").textContent = `${root} ${active.name}`;
  document.querySelector("#scaleFormula").textContent = active.formula;
  document.querySelector("#scaleUse").textContent = active.use;
  document.querySelector("#noteChips").innerHTML = scaleNotes(root, scaleSelect.value)
    .map(note => `<span class="chip">${note}</span>`)
    .join("");
  document.querySelector("#positionTitle").textContent = `${root} · ${shape.shape} shape 手指位`;
  document.querySelector("#positionAdvice").textContent = `集中練第 ${position.start}-${position.end} 格。食指負責第 ${position.start} 格，中指第 ${position.start + 1} 格，無名指第 ${position.start + 2} 格，尾指第 ${position.start + 3} 至 ${position.end} 格；先慢速準確，再加速度。`;
  document.querySelector("#fingerGuide").innerHTML = [
    ["1", "食指", `第 ${position.start} 格 / barre anchor`],
    ["2", "中指", `第 ${position.start + 1} 格`],
    ["3", "無名指", `第 ${position.start + 2} 格`],
    ["4", "尾指", `第 ${position.start + 3}-${position.end} 格`]
  ].map(item => `
    <div class="finger-card">
      <b>${item[0]}</b>
      <span>${item[1]}</span>
      <small>${item[2]}</small>
    </div>
  `).join("");
}

function renderScaleCards() {
  document.querySelector("#scaleCards").innerHTML = Object.entries(SCALES)
    .map(([key, scale]) => `
      <article class="card" data-scale-card="${key}">
        <strong>${scale.name}</strong>
        <p>${scale.formula}</p>
        <p>${scale.use}</p>
      </article>
    `)
    .join("");
}

function renderCaged() {
  const activeShape = shapeSelect.value;
  const selected = CAGED.find(item => item.shape === activeShape);
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

function renderTriads() {
  const root = keySelect.value;
  const options = activeTriads();
  document.querySelector("#triadTable").innerHTML = options.map((triad, triadIndex) => `
    <button class="triad-row ${triadIndex === selectedTriadIndex && mapMode === "triad" ? "active" : ""}" type="button" data-triad="${triadIndex}">
      <strong>${triad.label} · ${degreeNote(root, triad.rootDegree)} ${triad.type}</strong>
      <span>${triadFormula(triad)} · ${triadOptionNotes(root, triad).join(" ")}</span>
      <small>${triad.use}</small>
    </button>
  `).join("");
  document.querySelectorAll("[data-triad]").forEach(button => {
    button.addEventListener("click", () => {
      selectedTriadIndex = Number(button.dataset.triad);
      mapMode = "triad";
      update();
      document.querySelector("#scales").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
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
      <article class="riff-card ${riffIndex === selectedRiffIndex && mapMode === "riff" ? "active" : ""}">
        <strong>${riff.name}</strong>
        <p class="riff-notes">${noteLine}</p>
        <p>${riff.rhythm}</p>
        <code>${fretHints}</code>
        <p>${riff.use}</p>
        <button type="button" class="show-map-button" data-riff="${riffIndex}">Show on CAGED map</button>
      </article>
    `;
  }).join("");
  document.querySelectorAll("[data-riff]").forEach(button => {
    button.addEventListener("click", () => {
      selectedRiffIndex = Number(button.dataset.riff);
      mapMode = "riff";
      update();
      document.querySelector("#scales").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderPowerChords() {
  const root = keySelect.value;
  const fifth = transpose(root, 7);
  const cagedShape = activeCagedShape();
  const shapes = powerChordShapes(root, cagedShape);

  document.querySelector("#powerChordCards").innerHTML = shapes.map((shape, powerIndex) => `
    <article class="power-card ${powerIndex === selectedPowerIndex && mapMode === "power" ? "active" : ""}">
      <strong>${root}5 · ${shape.name}</strong>
      <p>CAGED: ${cagedShape.shape} shape</p>
      <p>Notes: ${root} + ${fifth}</p>
      <code>${shape.entries.map(entry => `${entry.string}${entry.fret}`).join("  ")}</code>
      <p>Fingers: ${shape.fingers}</p>
      <p>${shape.use}</p>
      <button type="button" class="show-map-button" data-power="${powerIndex}">Show on CAGED map</button>
    </article>
  `).join("");
  document.querySelectorAll("[data-power]").forEach(button => {
    button.addEventListener("click", () => {
      selectedPowerIndex = Number(button.dataset.power);
      mapMode = "power";
      update();
      document.querySelector("#scales").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function normalizeSelections() {
  selectedTriadIndex = Math.min(selectedTriadIndex, activeTriads().length - 1);
  selectedRiffIndex = Math.min(selectedRiffIndex, activeRiffs().length - 1);
  selectedPowerIndex = Math.min(selectedPowerIndex, activePowerTemplates().length - 1);
}

function renderPracticeSummary() {
  document.querySelector("#practiceSummary").textContent =
    `${keySelect.value} ${SCALES[scaleSelect.value].name} · ${shapeSelect.value} shape · ${mapMode}`;
}

function update() {
  normalizeSelections();
  renderFretboard();
  renderCurrent();
  renderCaged();
  renderTriads();
  renderTones();
  renderRiffs();
  renderPowerChords();
  renderPracticeSummary();
}

populateSelects();
renderScaleCards();
update();

keySelect.addEventListener("change", update);
shapeSelect.addEventListener("change", update);
scaleSelect.addEventListener("change", () => {
  selectedTriadIndex = 0;
  selectedRiffIndex = 0;
  update();
});

document.querySelectorAll("[data-map-mode]").forEach(button => {
  button.addEventListener("click", () => {
    mapMode = button.dataset.mapMode;
    update();
  });
});

const navLinks = [...document.querySelectorAll(".bottom-menu a[href^='#']")];
const observedSections = [...new Set(navLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean))];
let navFrame = null;
let lockedNavId = null;
let navLockUntil = 0;

function normalizeHash() {
  if (window.location.hash === "#workbench") {
    window.history.replaceState(null, "", "#scales");
  }
}

normalizeHash();

function setActiveNav(sectionId) {
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
}

function updateActiveNavFromScroll() {
  if (lockedNavId && Date.now() < navLockUntil) {
    setActiveNav(lockedNavId);
    return;
  }
  lockedNavId = null;

  const hashId = (window.location.hash || "").slice(1);
  const hashTarget = hashId ? document.getElementById(hashId) : null;
  if (hashTarget) {
    const hashTop = hashTarget.getBoundingClientRect().top;
    if (hashTop >= -24 && hashTop <= 150) {
      setActiveNav(hashId);
      return;
    }
  }

  const marker = window.scrollY + Math.min(220, window.innerHeight * 0.32);
  const current = observedSections
    .slice()
    .sort((a, b) => a.offsetTop - b.offsetTop)
    .reduce((active, section) => section.offsetTop <= marker ? section : active, observedSections[0]);
  if (current) setActiveNav(current.id);
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const sectionId = link.getAttribute("href").slice(1);
    lockedNavId = sectionId;
    navLockUntil = Date.now() + 1000;
    setActiveNav(sectionId);
    window.setTimeout(() => setActiveNav(sectionId), 900);
  });
});

window.addEventListener("hashchange", () => {
  normalizeHash();
  setActiveNav((window.location.hash || "#scales").slice(1));
  window.requestAnimationFrame(updateActiveNavFromScroll);
});

window.addEventListener("scroll", () => {
  if (navFrame) return;
  navFrame = window.requestAnimationFrame(() => {
    navFrame = null;
    updateActiveNavFromScroll();
  });
}, { passive: true });

setActiveNav((window.location.hash || "#scales").slice(1));
window.requestAnimationFrame(updateActiveNavFromScroll);

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
