// =====================================================================
// 編集ゾーン：問題を追加・修正するときはここだけを編集
// =====================================================================

const LESSON_TITLE = "Lesson 9　受動態";

// 学習記録：スプレッドシートの「Lesson」列に記録する名前
const LESSON_ID = "Lesson 9";

// 学習記録の送信先（Google Apps Script のウェブアプリ URL を "" の中に貼る）。空のままなら記録は送らない
const LOG_URL = "";


// 最初に選べる問題数（収録問題数を超える数は表示されない）
const COUNT_OPTIONS = [10, 20, 30];

const INSTRUCTIONS = {
  form:   "［ ］の動詞の適切な形を選びなさい。",
  order:  "日本語，または【状況】に合うように，語句を並べかえなさい。",
  blanks: "日本語に合うように，（　）に入る語を選びなさい。動詞は枠内の語群から選ぶこと。"
};

// type: "form"   … 正答 answer と ダミー dummies（2つ）の3択（before / after の間に入る語句）
// type: "order"  … chunks（語群）を並べかえ（answer が正しい順番）。文頭チャンクは小文字で保存し表示時に大文字化
// type: "blanks" … template の {} ごとに選択。verb: true の空欄は語群（VERB_CHOICES）から，それ以外は answer＋dummies の3択
// ja: 問題文の日本語／状況，trans: 答え合わせ後に表示する訳，note: 答え合わせ後に表示する解説

const QUESTIONS = [
    // ---- 1 ----
  { src: "1 ⑴ a", type: "form", verb: "clean", before: "I", after: "the room yesterday.",
    answer: "cleaned", dummies: ["was cleaned", "is cleaned"],
    trans: "私は昨日部屋を掃除した。",
    note: "「私が部屋を掃除した」のように、主語（I）が自分で動作をする文を「能動態」という。yesterday（昨日）があるので過去の文。clean の過去形 cleaned を入れる。\nwas cleaned は「掃除された」という受動態なので、主語が I のこの文には合わない。" },
  { src: "1 ⑴ b", type: "form", verb: "clean", before: "The room", after: "yesterday.",
    answer: "was cleaned", dummies: ["cleaned", "was cleaning"],
    trans: "部屋は昨日掃除された。",
    note: "主語の The room（部屋）は自分で掃除をしない。「部屋が掃除された」のように、主語が動作を受ける文を「受動態」という。受動態の形は〈be動詞＋過去分詞〉。yesterday があるので be動詞は過去形 was にする。\ncleaned だけだと「部屋が掃除をした」という意味になってしまう。" },
  { src: "1 ⑵ a", type: "form", verb: "speak", before: "Today people", after: "English all over the world.",
    answer: "speak", dummies: ["are spoken", "speaks"],
    trans: "今では人々は世界中で英語を話す。",
    note: "主語の people（人々）が英語を話すので能動態。Today（今では）があるので現在の文。people は複数なので、s をつけない speak を使う。\nspeaks は主語が he / she などの3人称単数のときの形。are spoken は「話される」という受動態。" },
  { src: "1 ⑵ b", type: "form", verb: "speak", before: "Today English", after: "all over the world.",
    answer: "is spoken", dummies: ["speaks", "is speaking"],
    trans: "今では英語は世界中で話される。",
    note: "主語の English（英語）は「話される」側なので受動態〈be動詞＋過去分詞〉。現在の文で English は単数なので、be動詞は is。speak の過去分詞は spoken（speak – spoke – spoken）。\nis speaking は「話している」という進行形なので、意味が合わない。" },
  { src: "1 ⑶ a", type: "form", verb: "not invite", before: "She", after: "Tom to the party last night.",
    answer: "did not invite", dummies: ["was not invited", "did not invited"],
    trans: "彼女は昨晩トムをパーティーに招かなかった。",
    note: "主語の She（彼女）がトムを招待する側なので能動態。last night（昨晩）があるので過去の否定文。一般動詞の過去の否定文は〈did not＋動詞の原形〉。\ndid not のあとは必ず原形なので、did not invited は誤り。" },
  { src: "1 ⑶ b", type: "form", verb: "not invite", before: "Tom", after: "to the party last night.",
    answer: "was not invited", dummies: ["did not invite", "was not invite"],
    trans: "昨晩トムはパーティーに招かれなかった。",
    note: "主語の Tom は招待される側なので受動態。受動態の否定文は、be動詞のあとに not を置いて〈be動詞＋not＋過去分詞〉にする。過去の文なので was not invited。\nwas not のあとは過去分詞が来るので、was not invite は誤り。" },
  { src: "1 ⑷ a", type: "form", verb: "will hold", before: "They", after: "the festival next weekend.",
    answer: "will hold", dummies: ["will be held", "will held"],
    trans: "彼らは来週末，祭りを開催するだろう。",
    note: "hold には「（イベントなど）を開く、開催する」という意味がある。主語の They（彼ら）が祭りを開く側なので能動態。next weekend（来週末）なので未来の文。〈will＋動詞の原形〉で表す。\nwill のあとは原形なので、will held は誤り。" },
  { src: "1 ⑷ b", type: "form", verb: "will hold", before: "The festival", after: "next weekend.",
    answer: "will be held", dummies: ["will hold", "will be hold"],
    trans: "来週末，祭りが開催されるだろう。",
    note: "主語の The festival（祭り）は開催される側なので受動態。未来の受動態は〈will be＋過去分詞〉。will のあとの be動詞は原形 be になる。hold の過去分詞は held（hold – held – held）。\nwill be hold は、be のあとが原形になっているので誤り。" },

  // ---- 2 ----
  { src: "2 ⑴", type: "order", ja: "これらの映画は多くの若い人たちに愛されている。",
    before: "These movies", after: ".",
    chunks: ["young", "loved", "are", "people", "by", "many"],
    answer: ["are", "loved", "by", "many", "young", "people"],
    note: "受動態の基本の形は〈be動詞＋過去分詞＋by＋行為者〉で、「～によって…される」という意味。主語 These movies は複数で現在の文なので are loved。\n「多くの若い人たちによって」は by many young people。many（多くの）→ young（若い）→ people（人たち）の順に並べる。" },
  { src: "2 ⑵", type: "order", ja: "あなたの家は昨日の台風によって被害を受けましたか。",
    before: "", after: "yesterday’s typhoon?",
    chunks: ["by", "your", "damaged", "was", "house"],
    answer: ["was", "your", "house", "damaged", "by"],
    note: "受動態の疑問文は、be動詞を主語の前に出して〈be動詞＋主語＋過去分詞＋by …?〉の形にする。「昨日」の話なので be動詞は過去形 Was。主語は your house。\n物が被害を受けるときは be damaged、人がけがをするときは be injured を使う。" },
  { src: "2 ⑶", type: "order", ja: "幸い，その衝突事故で亡くなった人はいなかった。",
    before: "Fortunately,", after: "the crash.",
    chunks: ["was", "in", "no one", "killed"],
    answer: ["no one", "was", "killed", "in"],
    note: "「亡くなった人はいなかった」は、no one（だれも～ない）を主語にして no one was killed と表す。直訳は「だれも殺されなかった」。\n事故や災害で人が亡くなるとき、英語では be killed という受動態をよく使う。in the crash は「その衝突事故で」。" },
  { src: "2 ⑷", type: "order", ja: "そのイベントは 1 か月延期された。",
    before: "", after: "a month.",
    chunks: ["put", "the event", "for", "was", "off"],
    answer: ["the event", "was", "put", "off", "for"],
    note: "put off は「～を延期する」という意味で、2語でひとまとまりの動詞。受動態でも put off をまとめて〈be動詞＋put off〉とする。\nput は過去分詞も put（put – put – put）なので、「延期された」は was put off。for a month は「1か月間」。" },
  { src: "2 ⑸", type: "order", ja: "このカメラは祖父から私に贈られたものだ。",
    before: "This camera", after: "my grandfather.",
    chunks: ["to", "was", "by", "me", "given"],
    answer: ["was", "given", "to", "me", "by"],
    note: "give A to B「A を B に与える」の A（このカメラ）を主語にした受動態。This camera was given（このカメラは与えられた）のあとに、to me（私に）、by my grandfather（祖父によって）を続ける。give の過去分詞は given。" },

  // ---- 3 ----
  { src: "3 ⑴", type: "order", ja: "この絵は有名な画家によって描かれたのですか。",
    before: "", after: "artist?",
    chunks: ["famous", "a", "painted", "this picture", "was", "by"],
    answer: ["was", "this picture", "painted", "by", "a", "famous"],
    note: "受動態の疑問文〈be動詞＋主語＋過去分詞＋by …?〉。過去の文なので Was を文頭に置き、主語 this picture、過去分詞 painted（描かれた）と続ける。\n「有名な画家によって」は by a famous artist。a（1人の）→ famous（有名な）→ artist（画家）の順。" },
  { src: "3 ⑵", type: "order", ja: "私は帰り道で知らない人に話しかけられた。",
    before: "", after: "a stranger on my way home.",
    chunks: ["by", "was", "to", "I", "spoken"],
    answer: ["I", "was", "spoken", "to", "by"],
    note: "speak to ～「～に話しかける」は、2語でひとまとまりの動詞。受動態にしても to は残るので、「話しかけられた」は was spoken to。\nそのあとに by a stranger（知らない人によって）が続くので、to と by が並ぶ形になる。on my way home は「帰り道で」。" },
  { src: "3 ⑶", type: "order", ja: "彼女は子どものころ友だちにヒメと呼ばれていた。",
    before: "When she was a child,", after: "her friends.",
    chunks: ["called", "was", "by", "she", "Hime"],
    answer: ["she", "was", "called", "Hime", "by"],
    note: "call A B は「A を B と呼ぶ」。受動態にすると A is called B「A は B と呼ばれる」になる。ここでは she was called Hime「彼女はヒメと呼ばれていた」。\nそのあとに by her friends（友だちによって）を続ける。" },
  { src: "3 ⑷", type: "order", ja: "【状況】割引商品をさらに安く買おうと思って，レジでクーポンを出したら…。",
    before: "“Sorry,", after: "discounted items.”",
    chunks: ["be", "that coupon", "for", "cannot", "used"],
    answer: ["that coupon", "cannot", "be", "used", "for"],
    trans: "「申し訳ありません，そのクーポンは割引商品には使えません」",
    note: "助動詞を使った受動態は〈助動詞＋be＋過去分詞〉。cannot のあとの be動詞は原形 be になるので、cannot be used「使われることができない＝使えない」。\ndiscounted items は「割引商品」。for discounted items で「割引商品に対して」。" },

  // ---- 5 ----（verb: true の空欄は語群から選択）
  { src: "5 ⑴", type: "blanks", ja: "昨夜，金庫から何が盗まれたのですか。",
    template: "{} {} {} from the safe last night?",
    blanks: [ { answer: "what", dummies: ["who", "how"] },
              { answer: "was", dummies: ["did", "is"] },
              { answer: "stolen", verb: true } ],
    note: "「何が盗まれたか」の「何が」は文の主語。疑問詞 what が主語のときは、What のあとにそのまま〈be動詞＋過去分詞〉を続ける。\n過去の文なので was。steal の過去分詞は stolen（steal – stole – stolen）。" },
  { src: "5 ⑵", type: "blanks", ja: "この植物はどのようにして日本に持ち込まれたのですか。",
    template: "{} {} this plant {} into Japan?",
    blanks: [ { answer: "how", dummies: ["what", "why"] },
              { answer: "was", dummies: ["did", "is"] },
              { answer: "brought", verb: true } ],
    note: "「どのようにして」は how。How のあとに受動態の疑問文〈be動詞＋主語＋過去分詞〉を続ける。\n過去の文なので was。bring の過去分詞は brought（bring – brought – brought）。" },
  { src: "5 ⑶", type: "blanks", ja: "それらの美しいグラスはどこで作られているのですか。",
    template: "{} {} those beautiful glasses {}?",
    blanks: [ { answer: "where", dummies: ["when", "what"] },
              { answer: "are", dummies: ["is", "do"] },
              { answer: "made", verb: true } ],
    note: "「どこで」は where。Where のあとに受動態の疑問文〈be動詞＋主語＋過去分詞〉を続ける。\n主語 those beautiful glasses は複数で現在の文なので、be動詞は are。make の過去分詞は made（make – made – made）。" },
  { src: "5 ⑷", type: "blanks", ja: "この写真はいつ撮られたのですか。",
    template: "{} {} this photo {}?",
    blanks: [ { answer: "when", dummies: ["where", "what"] },
              { answer: "was", dummies: ["did", "were"] },
              { answer: "taken", verb: true } ],
    note: "「いつ」は when。When のあとに受動態の疑問文〈be動詞＋主語＋過去分詞〉を続ける。\n過去の文なので was。写真を「撮る」は take で、過去分詞は taken（take – took – taken）。" },
  { src: "5 ⑸", type: "blanks", ja: "その書類には，だれの名前が印刷されていますか。",
    template: "{} name {} {} on the contract?",
    blanks: [ { answer: "whose", dummies: ["who", "what"] },
              { answer: "is", dummies: ["are", "does"] },
              { answer: "printed", verb: true } ],
    note: "「だれの名前が」は whose name でひとまとまり。これが文の主語なので、そのあとに〈be動詞＋過去分詞〉をそのまま続ける。\nname は単数で現在の文なので is。print の過去分詞は printed。" },
  { src: "5 ⑹", type: "blanks", ja: "ラジウムはだれによって発見されたのですか。",
    template: "Who {} radium {} {}?",
    blanks: [ { answer: "was", dummies: ["did", "is"] },
              { answer: "discovered", verb: true },
              { answer: "by", dummies: ["from", "with"] } ],
    note: "「だれによって～されたか」は、Who のあとに受動態の疑問文を続け、最後に by を置いて Who ～ by? の形にする。\n過去の文なので was radium discovered。discover（発見する）の過去分詞は discovered。最後の by を忘れないこと。" },

  // ---- 6 ----
  { src: "6 ⑴", type: "order", ja: "多くの新しいタイプの機械が発明され続けている。",
    before: "Many new types of", after: ".",
    chunks: ["being", "invented", "are", "machines"],
    answer: ["machines", "are", "being", "invented"],
    note: "「～され続けている」「～されているところだ」は、進行形の受動態〈be動詞＋being＋過去分詞〉で表す。\n主語 Many new types of machines は複数なので are being invented。invent は「発明する」。" },
  { src: "6 ⑵", type: "order", ja: "この本はたくさんの子どもたちに読まれてきた。",
    before: "This book", after: "many children.",
    chunks: ["been", "by", "has", "read"],
    answer: ["has", "been", "read", "by"],
    note: "「～されてきた」は、現在完了形の受動態〈have / has been＋過去分詞〉で表す。\n主語 This book は単数なので has been read。read の過去分詞は read（つづりは同じで、発音は「レッド」）。" },
  { src: "6 ⑶", type: "order", ja: "そのチケットはすでに売り切れている。",
    before: "The tickets", after: "out.",
    chunks: ["sold", "already", "have", "been"],
    answer: ["have", "already", "been", "sold"],
    note: "現在完了形の受動態〈have been＋過去分詞〉。sell out は「売り切る」なので、be sold out で「売り切れている」。sell の過去分詞は sold。\nalready（すでに）は have と been の間に置く。" },

  // ---- 7 ----
  { src: "7 ⑴", type: "order", ja: "だれが MVP に選ばれるだろうか。",
    before: "", after: "MVP?",
    chunks: ["will", "who", "chosen", "be"],
    answer: ["who", "will", "be", "chosen"],
    note: "「だれが選ばれるだろうか」の「だれが」は文の主語。Who のあとに、未来の受動態〈will be＋過去分詞〉をそのまま続ける。\nchoose の過去分詞は chosen（choose – chose – chosen）。" },
  { src: "7 ⑵", type: "order", ja: "この道路はどれくらいの間，通行止めになりますか。",
    before: "", after: "?",
    chunks: ["will", "be", "how long", "closed", "this road"],
    answer: ["how long", "will", "this road", "be", "closed"],
    note: "how long は「どれくらいの間」と期間をたずねる表現。How long のあとに、未来の受動態の疑問文〈will＋主語＋be＋過去分詞〉を続ける。\n「通行止めになる」は be closed（閉じられる）で表す。" },
  { src: "7 ⑶", type: "order", ja: "その棚は今まで一度も使われたことがない。",
    before: "", after: "before.",
    chunks: ["been", "never", "the shelf", "used", "has"],
    answer: ["the shelf", "has", "never", "been", "used"],
    note: "「一度も～されたことがない」は、現在完了形の受動態に never を入れて〈has never been＋過去分詞〉で表す。\nnever は has と been の間に置く。before は「今までに」。" },
  { src: "7 ⑷", type: "order", ja: "【状況】今朝，駅のトイレに入ろうとしたら…。",
    before: "The restroom", after: "I tried to use it.",
    chunks: ["was", "cleaned", "being", "when"],
    answer: ["was", "being", "cleaned", "when"],
    trans: "トイレは私が使おうとしたとき，清掃中だった。",
    note: "「～されているところだった」は、過去進行形の受動態〈was / were being＋過去分詞〉で表す。The restroom was being cleaned で「トイレは掃除されているところだった」。\nwhen I tried to use it は「私がそれを使おうとしたとき」。" }
];

const VERB_BOX = "make / steal / discover / take / print / bring";
// 語群の動詞を空欄に入る形（過去分詞）にしたもの：語群から選ぶ空欄の選択肢
const VERB_CHOICES = ["made", "stolen", "discovered", "taken", "printed", "brought"];

// =====================================================================
// ここから下はロジック（通常は編集不要）
// =====================================================================

// 旧形式（before / answer / after）の form 問題を template 形式にそろえる
QUESTIONS.forEach(q => {
  if (q.type === "form" && !q.template) {
    q.template = [q.before, "{}", q.after].filter(Boolean).join(" ");
    q.answer = [q.answer];
    q.dummies = q.dummies.map(d => [d]);
  }
});

const app = document.getElementById("app");
const progressEl = document.getElementById("progress");

let queue = [];    // 出題する問題（QUESTIONS のインデックス）
let records = [];  // 各問の解答状態 { result, choice, sels, picked, pool }
let pos = 0;
let studentId = "";
let sessionLabel = "";  // 記録用：出題数（例：「10問」「復習5問」）

// ---------- 学籍番号の保存（この端末のブラウザに記憶） ----------
function loadId() {
  try { return localStorage.getItem("studentId") || ""; } catch (e) { return ""; }
}
function saveId(id) {
  try { localStorage.setItem("studentId", id); } catch (e) {}
}

// ---------- 学習記録の送信 ----------
const RESULT_LABELS = { correct: "正解", wrong: "不正解", skipped: "とばした" };

function chosenText(q, rec) {
  if (rec.result === "skipped") return "";
  if (q.type === "form") return optionLabel(q, rec.options[rec.choice]);
  if (q.type === "blanks") return rec.sels.join(" / ");
  return rec.picked.map(pi => rec.pool[pi]).join(" ");
}

function sendLog(q, rec) {
  if (!LOG_URL) return;
  const body = JSON.stringify({
    student: studentId,
    lesson: LESSON_ID,
    question: q.src,
    result: RESULT_LABELS[rec.result],
    choice: chosenText(q, rec),
    count: sessionLabel
  });
  try {
    fetch(LOG_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body })
      .catch(() => {});
  } catch (e) {}
}

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
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function joinSentence(parts) {
  return parts.filter(Boolean).join(" ").replace(/ ([.,?!])/g, "$1");
}

function fullAnswer(q) {
  if (q.type === "form") return fillTemplate(q.template, q.answer);
  if (q.type === "order") return cap(joinSentence([q.before, ...q.answer, q.after]));
  return fillTemplate(q.template, q.blanks.map(b => b.answer));
}

function fillTemplate(template, words) {
  let i = 0;
  return cap(template.replace(/\{\}/g, () => words[i++]));
}

// 選択肢の表示：隣り合う空所はスペース，離れた空所は「…」でつなぐ
function optionLabel(q, words) {
  const parts = q.template.split("{}");
  const atStart = q.template.startsWith("{}");
  return words.map((w, k) => (k === 0 && atStart ? cap(w) : w) +
    (k < words.length - 1 ? (parts[k + 1].trim() === "" ? " " : " … ") : "")).join("");
}

// 文頭にくる語句だけ大文字で表示
function displayChunk(q, text, isFirst) {
  return isFirst && !q.before ? cap(text) : text;
}

// 答え合わせ済み、またはとばした問題は解答を確定（解説を表示）
function isChecked(rec) { return !!rec.result; }

// ---------- 画面：問題数の選択 ----------
function renderHome() {
  progressEl.textContent = "";
  const counts = [...new Set(COUNT_OPTIONS.map(n => Math.min(n, QUESTIONS.length)))];
  let html = `<p class="ja">学籍番号（4桁）</p>`;
  html += `<p><input type="text" id="sid" inputmode="numeric" maxlength="4" autocomplete="off" value="${esc(studentId || loadId())}"></p>`;
  html += `<p class="ja">問題数を選んでください（全${QUESTIONS.length}問から出題）</p><div class="actions">`;
  html += counts.map(n => `<button class="primary count" data-n="${n}">${n}問</button>`).join("");
  html += `</div>`;
  app.innerHTML = html;

  const sid = document.getElementById("sid");
  const buttons = app.querySelectorAll("button.count");
  const update = () => {
    sid.value = sid.value.replace(/[０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
                         .replace(/\D/g, "").slice(0, 4);
    buttons.forEach(b => b.disabled = !/^\d{4}$/.test(sid.value));
  };
  sid.addEventListener("input", update);
  update();

  buttons.forEach(b => b.addEventListener("click", () => {
    studentId = sid.value;
    saveId(studentId);
    start(shuffle(QUESTIONS.map((_, i) => i)).slice(0, Number(b.dataset.n)), `${b.dataset.n}問`);
  }));
}

function start(indices, label) {
  sessionLabel = label;
  queue = shuffle(indices);
  records = queue.map(() => ({}));
  pos = 0;
  renderQuestion();
}

// ---------- 画面：問題 ----------
function renderQuestion() {
  const q = QUESTIONS[queue[pos]];
  const rec = records[pos];
  const checked = isChecked(rec);
  progressEl.textContent = `${studentId}｜${pos + 1} / ${queue.length}`;

  let html = `<p class="source">EXERCISES ${esc(q.src)}</p>`;
  html += `<p class="instruction">${INSTRUCTIONS[q.inst || q.type]}</p>`;
  if (q.ja) html += `<p class="ja">${esc(q.ja)}</p>`;

  if (q.type === "form") {
    if (!rec.options) rec.options = shuffle([q.answer, ...q.dummies]);
    const fills = rec.choice === undefined ? null : rec.options[rec.choice];
    const atStart = q.template.startsWith("{}");
    let i = 0;
    const body = esc(q.template).replace(/\{\}/g, () => {
      const k = i++;
      return `<span class="slot">${fills ? esc(k === 0 && atStart ? cap(fills[k]) : fills[k]) : "&nbsp;"}</span>`;
    });
    if (q.verb) html += `<p class="hint">［ ${esc(q.verb)} ］</p>`;
    html += `<p class="sentence">${body}</p>`;
    html += `<div class="pool" id="options">` + rec.options.map((o, oi) =>
      `<button class="chunk${oi === rec.choice ? " selected" : ""}" data-i="${oi}" ${checked ? "disabled" : ""}>${esc(optionLabel(q, o))}</button>`
    ).join("") + `</div>`;
  }

  if (q.type === "blanks") {
    if (!rec.sels) rec.sels = q.blanks.map(() => "");
    if (!rec.opts) rec.opts = q.blanks.map(b => b.verb ? VERB_CHOICES : shuffle([b.answer, ...b.dummies]));
    const atStart = q.template.startsWith("{}");
    let i = 0;
    const body = esc(q.template).replace(/\{\}/g, () => {
      const k = i++;
      const opts = rec.opts[k].map(o =>
        `<option value="${esc(o)}" ${o === rec.sels[k] ? "selected" : ""}>${esc(k === 0 && atStart ? cap(o) : o)}</option>`
      ).join("");
      return `<select data-k="${k}" ${checked ? "disabled" : ""}><option value="">―</option>${opts}</select>`;
    });
    if (VERB_BOX) html += `<div class="verbs">${VERB_BOX}</div>`;
    html += `<p class="sentence">${body}</p>`;
  }

  if (q.type === "order") {
    if (!rec.pool) {
      do { rec.pool = shuffle(q.chunks); } while (rec.pool.join(" ") === q.answer.join(" "));
      rec.picked = [];
    }
    html += `<p class="sentence" id="line"></p><div class="pool" id="pool"></div>`;
  }

  html += `<div class="actions">`;
  html += `<button id="back" ${pos === 0 ? "disabled" : ""}>もどる</button>`;
  if (!checked) html += `<button id="skip">とばす</button>`;
  html += `<button class="primary" id="main">${checked ? (pos + 1 < queue.length ? "次へ" : "結果を見る") : "答え合わせ"}</button>`;
  html += `</div><div id="fb"></div>`;
  app.innerHTML = html;

  document.getElementById("back").addEventListener("click", () => { pos--; renderQuestion(); });
  if (!checked) document.getElementById("skip").addEventListener("click", onSkip);
  document.getElementById("main").addEventListener("click", onMain);

  if (q.type === "form" && !checked) {
    app.querySelectorAll("#options button").forEach(b => b.addEventListener("click", () => {
      rec.choice = Number(b.dataset.i);
      renderQuestion();
    }));
  }
  if (q.type === "blanks" && !checked) {
    app.querySelectorAll("select").forEach(el => el.addEventListener("change", () => {
      rec.sels[Number(el.dataset.k)] = el.value;
      updateMain(q, rec);
    }));
  }
  if (q.type === "order") renderOrder(q, rec, checked);

  if (checked) renderFeedback(q, rec.result);
  else updateMain(q, rec);
}

function renderOrder(q, rec, checked) {
  const line = document.getElementById("line");
  const poolEl = document.getElementById("pool");

  const chosen = rec.picked.map((pi, k) =>
    `<button class="chunk" data-k="${k}" ${checked ? "disabled" : ""}>${esc(displayChunk(q, rec.pool[pi], k === 0))}</button>`
  ).join(" ");
  const slots = rec.picked.length < rec.pool.length ? ` <span class="slot">&nbsp;</span>` : "";
  line.innerHTML = joinSentence([esc(q.before), chosen + slots, esc(q.after)]);

  poolEl.innerHTML = rec.pool.map((text, pi) =>
    rec.picked.includes(pi) ? "" : `<button class="chunk" data-pi="${pi}" ${checked ? "disabled" : ""}>${esc(text)}</button>`
  ).join("");

  if (checked) return;
  line.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    rec.picked.splice(Number(b.dataset.k), 1);
    renderOrder(q, rec, false);
  }));
  poolEl.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    rec.picked.push(Number(b.dataset.pi));
    renderOrder(q, rec, false);
  }));
  updateMain(q, rec);
}

function isReady(q, rec) {
  if (q.type === "form") return rec.choice !== undefined;
  if (q.type === "blanks") return rec.sels.every(v => v);
  return rec.picked.length === rec.pool.length;
}

function updateMain(q, rec) {
  document.getElementById("main").disabled = !isReady(q, rec);
}

function judge(q, rec) {
  if (q.type === "form") return rec.options[rec.choice].join(" ") === q.answer.join(" ");
  if (q.type === "blanks") return q.blanks.every((b, i) => rec.sels[i] === b.answer);
  return rec.picked.map(pi => rec.pool[pi]).join(" ") === q.answer.join(" ");
}

function renderFeedback(q, result) {
  const marks = {
    correct: `<p class="mark ok">○ 正解</p>`,
    wrong:   `<p class="mark ng">× 不正解</p>`,
    skipped: `<p class="mark">とばした問題</p>`
  };
  let fb = `<div class="feedback">`;
  fb += marks[result];
  fb += `<p class="answer">${esc(fullAnswer(q))}</p>`;
  if (q.trans) fb += `<p>${esc(q.trans)}</p>`;
  if (q.note) fb += `<p class="note">${esc(q.note).replace(/\n/g, "<br>")}</p>`;
  fb += `</div>`;
  document.getElementById("fb").innerHTML = fb;
}

function onMain() {
  const q = QUESTIONS[queue[pos]];
  const rec = records[pos];
  if (isChecked(rec)) { next(); return; }
  rec.result = judge(q, rec) ? "correct" : "wrong";
  sendLog(q, rec);
  renderQuestion();
  document.getElementById("main").focus();
}

function onSkip() {
  records[pos].result = "skipped";
  sendLog(QUESTIONS[queue[pos]], records[pos]);
  renderQuestion();
  document.getElementById("main").focus();
}

function next() {
  pos++;
  if (pos < queue.length) renderQuestion();
  else renderResult();
}

// ---------- 画面：結果 ----------
function renderResult() {
  progressEl.textContent = "";
  const score = records.filter(r => r.result === "correct").length;
  const skipped = records.filter(r => r.result === "skipped").length;
  const missed = queue.filter((_, i) => records[i].result !== "correct");

  let html = `<p class="result">${score} / ${queue.length} 問正解</p>`;
  if (skipped) html += `<p class="ja">とばした問題：${skipped}問</p>`;
  html += `<div class="actions">`;
  if (missed.length) html += `<button class="primary" id="retryWrong">間違えた・とばした問題（${missed.length}問）</button>`;
  html += `<button id="home">問題数を選び直す</button></div>`;
  app.innerHTML = html;

  if (missed.length) document.getElementById("retryWrong").addEventListener("click", () => start(missed, `復習${missed.length}問`));
  document.getElementById("home").addEventListener("click", renderHome);
}

document.getElementById("title").textContent = LESSON_TITLE;
renderHome();
