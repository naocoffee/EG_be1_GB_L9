// =====================================================================
// 編集ゾーン：問題を追加・修正するときはここだけを編集
// =====================================================================

const LESSON_TITLE = "Lesson 9　受動態";

const INSTRUCTIONS = {
  form:   "［ ］の動詞の適切な形を選びなさい。",
  order:  "日本語，または【状況】に合うように，語句を並べかえなさい。",
  blanks: "日本語に合うように，（　）に入る語を選びなさい。動詞は枠内の語群から選ぶこと。"
};

// type: "form"   … 正答 answer と ダミー dummies（2つ）の3択
// type: "order"  … chunks（語群）を並べかえ（answer が正しい順番）。文頭チャンクは小文字で保存し表示時に大文字化
// type: "blanks" … template の {} ごとに選択。verb: true の空欄は語群（VERB_CHOICES）から，それ以外は answer＋dummies の3択
// ja: 問題文の日本語／状況，trans: 答え合わせ後に表示する訳，note: 答え合わせ後に表示する解説

const QUESTIONS = [
    // ---- 1 ----
  { src: "1 ⑴ a", type: "form", verb: "clean", before: "I", after: "the room yesterday.",
    answer: "cleaned", dummies: ["was cleaned", "is cleaned"],
    trans: "私は昨日部屋を掃除した。",
    note: "能動態（S が V した）の文なので，clean の過去形が入る。" },
  { src: "1 ⑴ b", type: "form", verb: "clean", before: "The room", after: "yesterday.",
    answer: "was cleaned", dummies: ["cleaned", "was cleaning"],
    trans: "部屋は昨日掃除された。",
    note: "受動態（S が V された）の文なので，be の過去形＋clean の過去分詞が入る。" },
  { src: "1 ⑵ a", type: "form", verb: "speak", before: "Today people", after: "English all over the world.",
    answer: "speak", dummies: ["are spoken", "speaks"],
    trans: "今では人々は世界中で英語を話す。",
    note: "能動態（S が V する）・現在の文。主語 people は複数なので speak の原形が入る。" },
  { src: "1 ⑵ b", type: "form", verb: "speak", before: "Today English", after: "all over the world.",
    answer: "is spoken", dummies: ["speaks", "is speaking"],
    trans: "今では英語は世界中で話される。",
    note: "受動態（S が V される）・現在の文。主語 English は単数なので is＋speak の過去分詞 spoken。" },
  { src: "1 ⑶ a", type: "form", verb: "not invite", before: "She", after: "Tom to the party last night.",
    answer: "did not invite", dummies: ["was not invited", "did not invited"],
    trans: "彼女は昨晩トムをパーティーに招かなかった。",
    note: "能動態・過去の否定文なので did not＋動詞の原形 invite。" },
  { src: "1 ⑶ b", type: "form", verb: "not invite", before: "Tom", after: "to the party last night.",
    answer: "was not invited", dummies: ["did not invite", "was not invite"],
    trans: "昨晩トムはパーティーに招かれなかった。",
    note: "受動態の否定文は be 動詞の後ろに not を置く。was not＋過去分詞 invited。" },
  { src: "1 ⑷ a", type: "form", verb: "will hold", before: "They", after: "the festival next weekend.",
    answer: "will hold", dummies: ["will be held", "will held"],
    trans: "彼らは来週末，祭りを開催するだろう。",
    note: "hold には「（会議やイベント）を開く，開催する」という意味がある。祭りを開くのは来週なので will＋動詞の原形で表す。" },
  { src: "1 ⑷ b", type: "form", verb: "will hold", before: "The festival", after: "next weekend.",
    answer: "will be held", dummies: ["will hold", "will be hold"],
    trans: "来週末，祭りが開催されるだろう。",
    note: "未来の受動態は will be＋過去分詞。hold は不規則動詞で，過去形・過去分詞はどちらも held。" },

  // ---- 2 ----
  { src: "2 ⑴", type: "order", ja: "これらの映画は多くの若い人たちに愛されている。",
    before: "These movies", after: ".",
    chunks: ["young", "loved", "are", "people", "by", "many"],
    answer: ["are", "loved", "by", "many", "young", "people"],
    note: "受動態 be＋過去分詞＋by＋行為者。主語 these movies は複数・現在なので are loved。" },
  { src: "2 ⑵", type: "order", ja: "あなたの家は昨日の台風によって被害を受けましたか。",
    before: "", after: "yesterday’s typhoon?",
    chunks: ["by", "your", "damaged", "was", "house"],
    answer: ["was", "your", "house", "damaged", "by"],
    note: "人や動物が負傷する場合は be injured を用い，物が傷ついたり損害を受ける場合は be damaged を用いる。" },
  { src: "2 ⑶", type: "order", ja: "幸い，その衝突事故で亡くなった人はいなかった。",
    before: "Fortunately,", after: "the crash.",
    chunks: ["was", "in", "no one", "killed"],
    answer: ["no one", "was", "killed", "in"],
    note: "crash「（車などの）衝突」" },
  { src: "2 ⑷", type: "order", ja: "そのイベントは 1 か月延期された。",
    before: "", after: "a month.",
    chunks: ["put", "the event", "for", "was", "off"],
    answer: ["the event", "was", "put", "off", "for"],
    note: "put off「～を延期する（= postpone）」。不規則動詞 put は過去分詞も put なので，「延期された」は was put off。" },
  { src: "2 ⑸", type: "order", ja: "このカメラは祖父から私に贈られたものだ。",
    before: "This camera", after: "my grandfather.",
    chunks: ["to", "was", "by", "me", "given"],
    answer: ["was", "given", "to", "me", "by"],
    note: "give A to B「A を B に与える」の A を主語にした受動態の文。" },

  // ---- 3 ----
  { src: "3 ⑴", type: "order", ja: "この絵は有名な画家によって描かれたのですか。",
    before: "", after: "artist?",
    chunks: ["famous", "a", "painted", "this picture", "was", "by"],
    answer: ["was", "this picture", "painted", "by", "a", "famous"],
    note: "受動態の疑問文は be 動詞を主語の前に出す。Was＋主語＋過去分詞＋by …?" },
  { src: "3 ⑵", type: "order", ja: "私は帰り道で知らない人に話しかけられた。",
    before: "", after: "a stranger on my way home.",
    chunks: ["by", "was", "to", "I", "spoken"],
    answer: ["I", "was", "spoken", "to", "by"],
    note: "A spoke to B（A は B に話しかけた）の受動態は，B was spoken to by A。on one’s way home「～の帰り道で」。" },
  { src: "3 ⑶", type: "order", ja: "彼女は子どものころ友だちにヒメと呼ばれていた。",
    before: "When she was a child,", after: "her friends.",
    chunks: ["called", "was", "by", "she", "Hime"],
    answer: ["she", "was", "called", "Hime", "by"],
    note: "call A B「A を B と呼ぶ」の受動態は A is called B。行為者は by her friends。" },
  { src: "3 ⑷", type: "order", ja: "【状況】割引商品をさらに安く買おうと思って，レジでクーポンを出したら…。",
    before: "“Sorry,", after: "discounted items.”",
    chunks: ["be", "that coupon", "for", "cannot", "used"],
    answer: ["that coupon", "cannot", "be", "used", "for"],
    trans: "「申し訳ありません，そのクーポンは割引商品には使えません」",
    note: "discounted items「割引商品」。discounted は discount「～を割り引く」の過去分詞。" },

  // ---- 5 ----（verb: true の空欄は語群から選択）
  { src: "5 ⑴", type: "blanks", ja: "昨夜，金庫から何が盗まれたのですか。",
    template: "{} {} {} from the safe last night?",
    blanks: [ { answer: "what", dummies: ["who", "how"] },
              { answer: "was", dummies: ["did", "is"] },
              { answer: "stolen", verb: true } ],
    note: "疑問詞 what が主語のはたらきをする文（何が～される［された］か）。what＋was＋過去分詞 stolen。" },
  { src: "5 ⑵", type: "blanks", ja: "この植物はどのようにして日本に持ち込まれたのですか。",
    template: "{} {} this plant {} into Japan?",
    blanks: [ { answer: "how", dummies: ["what", "why"] },
              { answer: "was", dummies: ["did", "is"] },
              { answer: "brought", verb: true } ],
    note: "疑問詞 how が副詞のはたらきをする文（どのように～される［された］か）。how＋was＋主語＋過去分詞 brought。" },
  { src: "5 ⑶", type: "blanks", ja: "それらの美しいグラスはどこで作られているのですか。",
    template: "{} {} those beautiful glasses {}?",
    blanks: [ { answer: "where", dummies: ["when", "what"] },
              { answer: "are", dummies: ["is", "do"] },
              { answer: "made", verb: true } ],
    note: "疑問詞 where の後ろに受動態の疑問文を続ける。主語 those beautiful glasses は複数・現在なので are＋過去分詞 made。" },
  { src: "5 ⑷", type: "blanks", ja: "この写真はいつ撮られたのですか。",
    template: "{} {} this photo {}?",
    blanks: [ { answer: "when", dummies: ["where", "what"] },
              { answer: "was", dummies: ["did", "were"] },
              { answer: "taken", verb: true } ],
    note: "疑問詞 when の後ろに was＋主語＋過去分詞を続ける。take の過去分詞は taken。" },
  { src: "5 ⑸", type: "blanks", ja: "その書類には，だれの名前が印刷されていますか。",
    template: "{} name {} {} on the contract?",
    blanks: [ { answer: "whose", dummies: ["who", "what"] },
              { answer: "is", dummies: ["are", "does"] },
              { answer: "printed", verb: true } ],
    note: "疑問詞句 whose name が主語のはたらきをする文（だれの名前が～される［された］か）。" },
  { src: "5 ⑹", type: "blanks", ja: "ラジウムはだれによって発見されたのですか。",
    template: "Who {} radium {} {}?",
    blanks: [ { answer: "was", dummies: ["did", "is"] },
              { answer: "discovered", verb: true },
              { answer: "by", dummies: ["from", "with"] } ],
    note: "行為者をたずねる文（だれによって～される［された］か）。Who was ～ discovered by? の by を忘れない。" },

  // ---- 6 ----
  { src: "6 ⑴", type: "order", ja: "多くの新しいタイプの機械が発明され続けている。",
    before: "Many new types of", after: ".",
    chunks: ["being", "invented", "are", "machines"],
    answer: ["machines", "are", "being", "invented"],
    note: "進行形の受動態 is [are] being＋過去分詞。" },
  { src: "6 ⑵", type: "order", ja: "この本はたくさんの子どもたちに読まれてきた。",
    before: "This book", after: "many children.",
    chunks: ["been", "by", "has", "read"],
    answer: ["has", "been", "read", "by"],
    note: "現在完了形の受動態 have [has] been＋過去分詞。" },
  { src: "6 ⑶", type: "order", ja: "そのチケットはすでに売り切れている。",
    before: "The tickets", after: "out.",
    chunks: ["sold", "already", "have", "been"],
    answer: ["have", "already", "been", "sold"],
    note: "現在完了形の受動態 have been＋過去分詞。already は have と been の間に置く。" },

  // ---- 7 ----
  { src: "7 ⑴", type: "order", ja: "だれが MVP に選ばれるだろうか。",
    before: "", after: "MVP?",
    chunks: ["will", "who", "chosen", "be"],
    answer: ["who", "will", "be", "chosen"],
    note: "People will choose A MVP.（A を MVP に選ぶだろう）の A が疑問詞 who になった文。" },
  { src: "7 ⑵", type: "order", ja: "この道路はどれくらいの間，通行止めになりますか。",
    before: "", after: "?",
    chunks: ["will", "be", "how long", "closed", "this road"],
    answer: ["how long", "will", "this road", "be", "closed"],
    note: "how long で期間をたずね，未来の受動態の疑問文 will＋主語＋be＋過去分詞 を続ける。" },
  { src: "7 ⑶", type: "order", ja: "その棚は今まで一度も使われたことがない。",
    before: "", after: "before.",
    chunks: ["been", "never", "the shelf", "used", "has"],
    answer: ["the shelf", "has", "never", "been", "used"],
    note: "現在完了形の受動態 has been＋過去分詞。never は has と been の間に置く。" },
  { src: "7 ⑷", type: "order", ja: "【状況】今朝，駅のトイレに入ろうとしたら…。",
    before: "The restroom", after: "I tried to use it.",
    chunks: ["was", "cleaned", "being", "when"],
    answer: ["was", "being", "cleaned", "when"],
    trans: "トイレは私が使おうとしたとき，清掃中だった。",
    note: "進行形の受動態 was being＋過去分詞「～されているところだった」。" }
];

const VERB_BOX = "make / steal / discover / take / print / bring";
// 語群の動詞を空欄に入る形（過去分詞）にしたもの：語群から選ぶ空欄の選択肢
const VERB_CHOICES = ["made", "stolen", "discovered", "taken", "printed", "brought"];

// =====================================================================
// ここから下はロジック（通常は編集不要）
// =====================================================================

const app = document.getElementById("app");
const progressEl = document.getElementById("progress");

let queue = [];
let pos = 0;
let score = 0;
let wrong = [];
let checked = false;
let picked = [];    // order 用：選択済みチャンクの pool インデックス
let pool = [];      // order 用：シャッフル後のチャンク
let choice = null;  // form 用：選んだ選択肢

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function esc(s) {
  return s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function joinSentence(parts) {
  return parts.filter(Boolean).join(" ").replace(/ ([.,?!])/g, "$1");
}

function fullAnswer(q) {
  if (q.type === "form") return cap(joinSentence([q.before, q.answer, q.after]));
  if (q.type === "order") return cap(joinSentence([q.before, ...q.answer, q.after]));
  let i = 0;
  return cap(q.template.replace(/\{\}/g, () => q.blanks[i++].answer));
}

// 文頭にくる語句だけ大文字で表示
function displayChunk(q, text, isFirst) {
  return isFirst && !q.before ? cap(text) : text;
}

function blankOptions(b) {
  return b.verb ? VERB_CHOICES : shuffle([b.answer, ...b.dummies]);
}

function start(indices) {
  queue = shuffle(indices);
  pos = 0;
  score = 0;
  wrong = [];
  renderQuestion();
}

function renderQuestion() {
  checked = false;
  picked = [];
  choice = null;
  const q = QUESTIONS[queue[pos]];
  progressEl.textContent = `${pos + 1} / ${queue.length}`;

  let html = `<p class="source">EXERCISES ${esc(q.src)}</p>`;
  html += `<p class="instruction">${INSTRUCTIONS[q.type]}</p>`;
  if (q.ja) html += `<p class="ja">${esc(q.ja)}</p>`;

  if (q.type === "form") {
    html += `<p class="hint">［ ${esc(q.verb)} ］</p>`;
    html += `<p class="sentence">${esc(q.before)} <span class="slot" id="slot">&nbsp;</span> ${esc(q.after)}</p>`;
    html += `<div class="pool" id="options">` +
      shuffle([q.answer, ...q.dummies]).map(o => `<button class="chunk" data-v="${esc(o)}">${esc(o)}</button>`).join("") +
      `</div>`;
  }

  if (q.type === "blanks") {
    const atStart = q.template.startsWith("{}");
    let i = 0;
    const body = esc(q.template).replace(/\{\}/g, () => {
      const k = i++;
      const opts = blankOptions(q.blanks[k])
        .map(o => `<option value="${esc(o)}">${esc(k === 0 && atStart ? cap(o) : o)}</option>`).join("");
      return `<select id="sel${k}"><option value="">―</option>${opts}</select>`;
    });
    html += `<div class="verbs">${VERB_BOX}</div>`;
    html += `<p class="sentence">${body}</p>`;
  }

  if (q.type === "order") {
    do { pool = shuffle(q.chunks); } while (pool.join(" ") === q.answer.join(" "));
    html += `<p class="sentence" id="line"></p><div class="pool" id="pool"></div>`;
  }

  html += `<div class="actions"><button class="primary" id="main" disabled>答え合わせ</button></div>`;
  html += `<div id="fb"></div>`;
  app.innerHTML = html;

  document.getElementById("main").addEventListener("click", onMain);

  if (q.type === "form") {
    app.querySelectorAll("#options button").forEach(b => b.addEventListener("click", () => {
      if (checked) return;
      choice = b.dataset.v;
      app.querySelectorAll("#options button").forEach(x => x.classList.toggle("selected", x === b));
      document.getElementById("slot").textContent = choice;
      document.getElementById("main").disabled = false;
    }));
  }
  if (q.type === "blanks") {
    const sels = app.querySelectorAll("select");
    sels.forEach(el => el.addEventListener("change", () => {
      document.getElementById("main").disabled = [...sels].some(x => !x.value);
    }));
  }
  if (q.type === "order") renderOrder(q);
}

function renderOrder(q) {
  const line = document.getElementById("line");
  const poolEl = document.getElementById("pool");

  const chosen = picked.map((pi, k) =>
    `<button class="chunk" data-k="${k}" ${checked ? "disabled" : ""}>${esc(displayChunk(q, pool[pi], k === 0))}</button>`
  ).join(" ");
  const rest = pool.length - picked.length;
  const slots = rest > 0 ? ` <span class="slot">&nbsp;</span>` : "";
  line.innerHTML = joinSentence([esc(q.before), chosen + slots, esc(q.after)]);

  poolEl.innerHTML = pool.map((text, pi) =>
    picked.includes(pi) ? "" : `<button class="chunk" data-pi="${pi}" ${checked ? "disabled" : ""}>${esc(text)}</button>`
  ).join("");

  line.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    picked.splice(Number(b.dataset.k), 1);
    renderOrder(q);
  }));
  poolEl.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    picked.push(Number(b.dataset.pi));
    renderOrder(q);
  }));

  if (!checked) document.getElementById("main").disabled = picked.length !== pool.length;
}

function judge(q) {
  if (q.type === "form") return choice === q.answer;
  if (q.type === "blanks") return q.blanks.every((b, i) => document.getElementById(`sel${i}`).value === b.answer);
  return picked.map(pi => pool[pi]).join(" ") === q.answer.join(" ");
}

function onMain() {
  if (checked) { next(); return; }
  const q = QUESTIONS[queue[pos]];
  const ok = judge(q);
  checked = true;
  if (ok) score++; else wrong.push(queue[pos]);

  app.querySelectorAll("select, #options button").forEach(el => el.disabled = true);
  if (q.type === "order") renderOrder(q);

  let fb = `<div class="feedback">`;
  fb += `<p class="mark ${ok ? "ok" : "ng"}">${ok ? "○ 正解" : "× 不正解"}</p>`;
  fb += `<p class="answer">${esc(fullAnswer(q))}</p>`;
  if (q.trans) fb += `<p>${esc(q.trans)}</p>`;
  if (q.note) fb += `<p class="note">${esc(q.note)}</p>`;
  fb += `</div>`;
  document.getElementById("fb").innerHTML = fb;

  const main = document.getElementById("main");
  main.disabled = false;
  main.textContent = pos + 1 < queue.length ? "次へ" : "結果を見る";
  main.focus();
}

function next() {
  pos++;
  if (pos < queue.length) renderQuestion();
  else renderResult();
}

function renderResult() {
  progressEl.textContent = "";
  let html = `<p class="result">${score} / ${queue.length} 問正解</p><div class="actions">`;
  if (wrong.length) html += `<button class="primary" id="retryWrong">間違えた問題（${wrong.length}問）</button>`;
  html += `<button id="retryAll">全問をもう一度</button></div>`;
  app.innerHTML = html;

  const missed = wrong.slice();
  if (missed.length) document.getElementById("retryWrong").addEventListener("click", () => start(missed));
  document.getElementById("retryAll").addEventListener("click", startAll);
}

function startAll() { start(QUESTIONS.map((_, i) => i)); }

document.getElementById("title").textContent = LESSON_TITLE;
startAll();
