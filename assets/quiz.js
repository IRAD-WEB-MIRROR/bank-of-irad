/* "Check your banknote": a ten-question quiz on the security features of the 2011 series. Questions are drawn at
   random in the reader's browser; the places of the features on each note are in /data/quiz-zones.json (fractions of
   the note's width and height). Nothing is sent or stored. site.js calls window.BOI_QUIZ(lang) on each render. */
(function () {
  "use strict";
  var S = {
    en: {
      start: "Start the quiz", again: "Try again with other notes", next: "Next question", finish: "See your score",
      qOf: "Question {n} of {t}", score: "Score: {s}",
      z_thread: "Tap the security thread on this {v}-som note.",
      z_watermark: "Hold this {v}-som note to the light. Tap where the watermark appears.",
      z_register: "Tap the see-through register: the half tündük that becomes whole against the light.",
      z_tactile: "Tap the raised bars that let blind and partially sighted people tell the {v} som by touch.",
      z_ovi: "Tap the figure that turns from gold to green when you tilt this {v}-som note.",
      z_foil: "Tap the foil patch on this {v}-som note.",
      z_intaglio: "Where would you feel the raised print most clearly with your fingertip?",
      ok: "Correct.", no: "Not there.", wrong: "Not quite.", shown: "It is marked on the note.",
      x_thread: "The thread runs from top to bottom to the left of the centre and shows on the front in short silver windows, with the words IRAD BANKY and the value. On the 100 and 500 som it is gold.",
      x_watermark: "The clear field at the left shows, against the light, the head of an Akyel horse (on the 100 som, the portrait of Amanbek Alimbekov) and the value in bright figures.",
      x_register: "Half of the tündük is printed on the front and half on the back. Against the light the two halves meet exactly.",
      x_tactile: "There is one bar on the 1 som and one more on each higher note, up to seven on the 500 som. This note has {n}.",
      x_ovi: "Only the 20 and 50 som have the colour-shifting figure, in the lower right corner.",
      x_foil: "Only the 100 and 500 som carry the foil patch with the tündük. It changes colour as the note moves.",
      x_intaglio: "The main picture, the large figure and the Bank's name are printed by intaglio: the ink stands up from the paper and can be felt.",
      m_bars: "How many raised bars are there at the left edge of the {v}-som note?",
      m_micro: "What words does the microtext on the notes repeat?",
      m_micro_o: ["IRAD BANKY", "IRAD SOMU", "ULUTTUK BANK", "TALAS 2011"],
      m_wm100: "What does the watermark of the 100-som note show?",
      m_wm100_o: ["The portrait of Amanbek Alimbekov", "The head of an Akyel horse", "The tündük", "The State Emblem"],
      m_wm: "What does the watermark of the 1, 5, 10, 20, 50 and 500-som notes show?",
      m_wm_o: ["The head of an Akyel horse", "The portrait of Amanbek Alimbekov", "The Church of St. Janyl", "A ram's horn"],
      m_ovi: "On the 20 and 50 som, the figure in the lower right corner, when the note is tilted…",
      m_ovi_o: ["turns from gold to green", "turns from green to red", "disappears", "shows the word SPECIMEN"],
      m_foil: "Which notes carry a foil patch?",
      m_foil_o: ["100 and 500 som", "20 and 50 som", "all notes from 10 som", "only the 500 som"],
      m_report: "You think you have been given a counterfeit note. What should you do?",
      m_report_o: ["Take it to any licensed bank", "Pass it on quickly before anyone notices", "Tear it up", "Post it to the Bank of Irad"],
      x_report: "Report a suspected counterfeit to any licensed bank. Passing on a note you know to be false is an offence.",
      x_micro: "The microtext, too small to read without a magnifying glass, repeats the words IRAD BANKY.",
      x_wm: "Every note except the 100 som has the head of an Akyel horse; the 100 som has the portrait of Amanbek Alimbekov, which is also on its front.",
      x_ovi: "Tilt the note: the figure turns from gold to green. A colour copy cannot do this.",
      x_foil: "The foil patch is on the 100 and 500 som only.",
      r10: "Perfect. You'd have caught the forger.",
      r8: "You'd have caught the forger.",
      r6: "You'd probably have caught the forger, but look again at the features you missed.",
      r0: "This time the forger would have got past you. Read “Checking a banknote” and try again.",
      res: "You scored {s} out of {t}.",
      tip: "Check every note you are not sure of: look at it, feel it, tilt it, and hold it to the light. Report a suspected counterfeit to any licensed bank.",
      share: "Copy the result", copied: "Copied.", shareText: "I scored {s}/{t} in the Bank of Irad banknote quiz: {r} bank.iradgov.org/check-banknote.html",
      noteAlt: "{v}-som banknote, front", load: "The quiz could not be loaded. Please try again later."
    },
    ir: {
      start: "Testti bashtoo", again: "Bashka banknottor menen kayra", next: "Kiyinki suroo", finish: "Upaydı köröö",
      qOf: "{t} suroonun {n}-suroosu", score: "Upay: {s}",
      z_thread: "Bul {v} somduk banknottun korgoo jibin basıñız.",
      z_watermark: "Bul {v} somduk banknottu jarıkka karatıñız. Suu belgisi chıkkan jerdi basıñız.",
      z_register: "Jarıkka karaganda bir bütün bolgon jarım tündüktü basıñız.",
      z_tactile: "Közü azız adamdar {v} somduktu kolu menen tanıy turgan bedireygen sızıktardı basıñız.",
      z_ovi: "Bul {v} somduk banknottu ıyıkkanda altın tüstön jashılga ötkön sandı basıñız.",
      z_foil: "Bul {v} somduk banknottun folga belgisin basıñız.",
      z_intaglio: "Bedireygen basmanı manjañız menen eñ jakshı kayerden sezesiz?",
      ok: "Tuura.", no: "Al jerde emes.", wrong: "Tuura emes.", shown: "Al banknotto belgilengen.",
      x_thread: "Jip ortonun sol jagında joguradan tömön ötöt, betinde kıska kümüsh terezelerde IRAD BANKY degen sözdör jana nominal menen körünöt. 100 jana 500 somdukta al altın tüstüü.",
      x_watermark: "Sol jaktagı ashık talaada jarıkka karaganda Akyel atının bashı (100 somdukta Amanbek Alimbekovdun portreti) jana nominaldın ashık sanı körünöt.",
      x_register: "Tündüktün jarımı betinde, jarımı arkasında basılgan. Jarıkka karaganda eki jarımı dal koshulat.",
      x_tactile: "1 somdukta bir sızık, ar bir choñuraak banknotto birden köp, 500 somdukta jeti. Bul banknotto {n}.",
      x_ovi: "Tüsü özgörgön san 20 jana 50 somdukta gana bar, oñ tömönkü burchta.",
      x_foil: "Tündüktüü folga belgisi 100 jana 500 somdukta gana bar. Banknot kıymıldaganda anın tüsü özgörüp turat.",
      x_intaglio: "Negizgi süröt, choñ san jana Banktın atı bedireygen basma menen basılgan: sıya kagazdan bölünüp turat, anı sezüügö bolot.",
      m_bars: "{v} somduk banknottun sol kırında kancha bedireygen sızık bar?",
      m_micro: "Banknottordogu kichine tamgalar kaysı sözdördü kaytalayt?",
      m_micro_o: ["IRAD BANKY", "IRAD SOMU", "ULUTTUK BANK", "TALAS 2011"],
      m_wm100: "100 somduk banknottun suu belgisinde emne bar?",
      m_wm100_o: ["Amanbek Alimbekovdun portreti", "Akyel atının bashı", "Tündük", "Mamlekettik emblema"],
      m_wm: "1, 5, 10, 20, 50 jana 500 somduk banknottordun suu belgisinde emne bar?",
      m_wm_o: ["Akyel atının bashı", "Amanbek Alimbekovdun portreti", "Iyık Janıl chirköösü", "Koshkar müyüz"],
      m_ovi: "20 jana 50 somdukta oñ tömönkü burchtagı san, banknottu ıyıkkanda…",
      m_ovi_o: ["altın tüstön jashılga ötöt", "jashıldan kızılga ötöt", "jogolot", "SPECIMEN degen sözdü körsötöt"],
      m_foil: "Kaysı banknottordo folga belgisi bar?",
      m_foil_o: ["100 jana 500 somduk", "20 jana 50 somduk", "10 somduktan bashtap baarında", "500 somdukta gana"],
      m_report: "Sizge jasalma banknot berilgen dep oylop jatasız. Emne kılasız?",
      m_report_o: ["Litsenziyası bar kaalagan bankka alıp baram", "Bashkalar baykabay turup tez berip jiberem", "Jırtıp salam", "Irad Bankına pochta menen jiberem"],
      x_report: "Jasalma dep shektelgen banknot jönündö litsenziyası bar kaalagan bankka xabarlañız. Jasalma ekenin bilip turup banknottu berüü ukuk buzuu bolup sanalat.",
      x_micro: "Lupasız okuu kıyın bolgon kichine tamgalar IRAD BANKY degen sözdördü kaytalayt.",
      x_wm: "100 somduktan bashka bardık banknottordo Akyel atının bashı bar; 100 somdukta Amanbek Alimbekovdun portreti, al anın betinde da bar.",
      x_ovi: "Banknottu ıyıkıñız: san altın tüstön jashılga ötöt. Tüstüü köchürmö munu kıla albayt.",
      x_foil: "Folga belgisi 100 jana 500 somdukta gana bar.",
      r10: "Mıktı. Siz jasalmachını karmay alat eleñiz.",
      r8: "Siz jasalmachını karmay alat eleñiz.",
      r6: "Balkim jasalmachını karmay alat eleñiz, birok kaltırıp jibergen belgilerdi kayra karap chıgıñız.",
      r0: "Bul jolu jasalmachı sizdi aldap ketet ele. «Banknottu teksherüü» bölümün okup, kayra araket kılıñız.",
      res: "Siz {t} suroodon {s} upay aldıñız.",
      tip: "Shektüü ar bir banknottu teksheriñiz: karañız, kolu menen sezip köröñüz, ıyıkıñız jana jarıkka karatıñız. Jasalma dep shektelgen banknot jönündö litsenziyası bar kaalagan bankka xabarlañız.",
      share: "Natıyjanı köchürüü", copied: "Köchürüldü.", shareText: "Irad Bankının banknot testinde {s}/{t} upay aldım: {r} bank.iradgov.org/check-banknote.html",
      noteAlt: "{v} somduk banknot, beti", load: "Testti jüktöögö bolbodu. Kiyinireek kayra araket kılıñız."
    },
    ru: {
      start: "Начать тест", again: "Ещё раз с другими банкнотами", next: "Следующий вопрос", finish: "Узнать результат",
      qOf: "Вопрос {n} из {t}", score: "Баллы: {s}",
      z_thread: "Нажмите на защитную нить на этой банкноте {v} сомов.",
      z_watermark: "Посмотрите банкноту {v} сомов на просвет. Нажмите туда, где виден водяной знак.",
      z_register: "Нажмите на совмещающееся изображение: половину тюндюка, которая на просвет становится целой.",
      z_tactile: "Нажмите на рельефные штрихи, по которым незрячие и слабовидящие узнают банкноту {v} сомов на ощупь.",
      z_ovi: "Нажмите на цифру, которая при наклоне этой банкноты {v} сомов меняет цвет с золотого на зелёный.",
      z_foil: "Нажмите на фольгированный элемент на этой банкноте {v} сомов.",
      z_intaglio: "Где кончиками пальцев рельефная печать ощущается лучше всего?",
      ok: "Верно.", no: "Не здесь.", wrong: "Неверно.", shown: "Это место отмечено на банкноте.",
      x_thread: "Нить проходит сверху вниз левее центра и выходит на лицевую сторону короткими серебристыми окошками со словами IRAD BANKY и номиналом. На банкнотах 100 и 500 сомов она золотистая.",
      x_watermark: "В светлом поле слева на просвет видны голова акъельской лошади (на банкноте 100 сомов — портрет Аманбека Алимбекова) и светлые цифры номинала.",
      x_register: "Половина тюндюка напечатана на лицевой стороне, половина — на оборотной. На просвет они точно совпадают.",
      x_tactile: "На банкноте 1 сом один штрих, на каждой следующей — на один больше, на 500 сомах — семь. Здесь их {n}.",
      x_ovi: "Цифра, меняющая цвет, есть только на банкнотах 20 и 50 сомов, в правом нижнем углу.",
      x_foil: "Фольгированный элемент с тюндюком есть только на банкнотах 100 и 500 сомов. При движении банкноты он меняет цвет.",
      x_intaglio: "Основное изображение, крупная цифра и название Банка напечатаны металлографской печатью: краска выступает над бумагой и ощущается на ощупь.",
      m_bars: "Сколько рельефных штрихов у левого края банкноты {v} сомов?",
      m_micro: "Какие слова повторяет микротекст на банкнотах?",
      m_micro_o: ["IRAD BANKY", "IRAD SOMU", "ULUTTUK BANK", "TALAS 2011"],
      m_wm100: "Что изображено на водяном знаке банкноты 100 сомов?",
      m_wm100_o: ["Портрет Аманбека Алимбекова", "Голова акъельской лошади", "Тюндюк", "Государственный герб"],
      m_wm: "Что изображено на водяном знаке банкнот 1, 5, 10, 20, 50 и 500 сомов?",
      m_wm_o: ["Голова акъельской лошади", "Портрет Аманбека Алимбекова", "Церковь Святой Джаныл", "Бараний рог"],
      m_ovi: "На банкнотах 20 и 50 сомов цифра в правом нижнем углу при наклоне…",
      m_ovi_o: ["меняет цвет с золотого на зелёный", "меняет цвет с зелёного на красный", "исчезает", "показывает слово SPECIMEN"],
      m_foil: "На каких банкнотах есть фольгированный элемент?",
      m_foil_o: ["100 и 500 сомов", "20 и 50 сомов", "на всех от 10 сомов", "только на 500 сомах"],
      m_report: "Вам кажется, что вам дали фальшивую банкноту. Что нужно сделать?",
      m_report_o: ["Обратиться в любой лицензированный банк", "Быстро отдать её дальше, пока никто не заметил", "Порвать её", "Отправить её по почте в Банк Ирада"],
      x_report: "О подозрении на подделку сообщите в любой лицензированный банк. Сбыт заведомо поддельной банкноты — правонарушение.",
      x_micro: "Микротекст, который без лупы не прочесть, повторяет слова IRAD BANKY.",
      x_wm: "На всех банкнотах, кроме 100 сомов, — голова акъельской лошади; на 100 сомах — портрет Аманбека Алимбекова, который есть и на лицевой стороне.",
      x_ovi: "Наклоните банкноту: цифра меняет цвет с золотого на зелёный. Цветная копия так не умеет.",
      x_foil: "Фольгированный элемент есть только на банкнотах 100 и 500 сомов.",
      r10: "Отлично. Фальшивомонетчик бы вас не обманул.",
      r8: "Фальшивомонетчик бы вас не обманул.",
      r6: "Скорее всего, вы бы распознали подделку, но посмотрите ещё раз признаки, которые пропустили.",
      r0: "На этот раз фальшивомонетчик бы вас обманул. Прочитайте «Как проверить банкноту» и попробуйте снова.",
      res: "Ваш результат: {s} из {t}.",
      tip: "Проверяйте каждую банкноту, в которой не уверены: посмотрите, ощупайте, наклоните и посмотрите на просвет. О подозрении на подделку сообщите в любой лицензированный банк.",
      share: "Скопировать результат", copied: "Скопировано.", shareText: "Мой результат в тесте Банка Ирада о банкнотах: {s}/{t}. {r} bank.iradgov.org/check-banknote.html",
      noteAlt: "Банкнота {v} сомов, лицевая сторона", load: "Не удалось загрузить тест. Попробуйте позже."
    }
  };
  var NOTES = [1, 5, 10, 20, 50, 100, 500], BARS = { 1: 1, 5: 2, 10: 3, 20: 4, 50: 5, 100: 6, 500: 7 }, TOTAL = 10;
  var LANG = "en", Z = null, st = null, el = null;

  function t(k, v) { var s = (S[LANG] && S[LANG][k] != null) ? S[LANG][k] : S.en[k]; return typeof s === "string" && v ? s.replace(/\{(\w+)\}/g, function (m, x) { return v[x] != null ? v[x] : m; }) : s; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  function makeQuiz() {
    var z = [
      { k: "thread", v: pick(NOTES) }, { k: "watermark", v: pick(NOTES) }, { k: "register", v: pick(NOTES) },
      { k: "tactile", v: pick([10, 20, 50, 100, 500]) }, { k: "ovi", v: pick([20, 50]) }, { k: "foil", v: pick([100, 500]) },
      { k: "intaglio", v: pick(NOTES) }
    ].map(function (q) { q.type = "zone"; return q; });
    var bv = pick(NOTES), bo = shuffle([BARS[bv], BARS[bv] + 1, BARS[bv] + 2, Math.max(0, BARS[bv] - 1) || BARS[bv] + 3]);
    var m = [
      { type: "mc", k: "bars", v: bv, opts: bo.map(String), ans: bo.indexOf(BARS[bv]), x: "x_tactile" },
      { type: "mc", k: "micro", oi: "m_micro_o", x: "x_micro" }, { type: "mc", k: "wm100", oi: "m_wm100_o", x: "x_wm" },
      { type: "mc", k: "wm", oi: "m_wm_o", x: "x_wm" }, { type: "mc", k: "ovi", oi: "m_ovi_o", x: "x_ovi" },
      { type: "mc", k: "foil", oi: "m_foil_o", x: "x_foil" }, { type: "mc", k: "report", oi: "m_report_o", x: "x_report" }
    ];
    m.forEach(function (q) { if (q.oi) { q.order = shuffle([0, 1, 2, 3]); q.ans = q.order.indexOf(0); } });
    // six questions on the notes, four of the others; the counterfeit question always comes last
    var zs = shuffle(z).slice(0, 6), ms = shuffle(m.filter(function (q) { return q.k !== "report"; })).slice(0, 3);
    var qs = shuffle(zs.concat(ms));
    qs.push(m[m.length - 1]);
    return { qs: qs, i: -1, score: 0, done: false, answered: false };
  }

  function noteBox(q) {
    var h = '<div class="qz-note" style="position:relative;overflow:hidden;max-width:900px;margin:12px 0;cursor:crosshair;touch-action:manipulation">' +
      '<img src="/assets/notes/' + q.v + '-front.webp" alt="' + esc(t("noteAlt", { v: q.v })) + '" style="display:block;width:100%;height:auto;border-radius:3px;box-shadow:0 1px 4px rgba(0,0,0,.25)" draggable="false">';
    if (q.answered) {
      var r = Z[q.v][q.k];
      h += '<div style="position:absolute;left:' + r[0] * 100 + "%;top:" + r[1] * 100 + "%;width:" + (r[2] - r[0]) * 100 + "%;height:" + (r[3] - r[1]) * 100 + '%;border:3px solid #B8902F;border-radius:6px;box-shadow:0 0 0 2000px rgba(14,77,58,.18)"></div>';
      if (q.at) h += '<div style="position:absolute;left:' + q.at[0] * 100 + "%;top:" + q.at[1] * 100 + '%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;border:3px solid ' + (q.right ? "#0E4D3A" : "#B3261E") + ';background:rgba(255,255,255,.6)"></div>';
    }
    return h + "</div>";
  }
  function hit(q, x, y) {
    var zs = Z[q.v], order = ["tactile", "register", "ovi", "foil", "thread", "watermark", "intaglio", "numeral"], got = null;
    for (var i = 0; i < order.length; i++) { var r = zs[order[i]]; if (r && x >= r[0] && x <= r[2] && y >= r[1] && y <= r[3]) { got = order[i]; break; } }
    return got === q.k || (q.k === "intaglio" && got === "numeral");
  }

  function render() {
    if (!el) return;
    if (!Z) { el.innerHTML = '<p class="loading">…</p>'; return; }
    if (!st) { el.innerHTML = '<div class="filters"><button type="button" aria-pressed="true" data-q="start">' + esc(t("start")) + "</button></div>"; return bind(); }
    if (st.done) {
      var s = st.score, r = s >= 10 ? "r10" : s >= 8 ? "r8" : s >= 6 ? "r6" : "r0";
      el.innerHTML = '<div class="card"><p style="font-size:1.35em;margin:0 0 6px"><b>' + esc(t("res", { s: s, t: TOTAL })) + "</b></p>" +
        '<p style="font-size:1.15em;margin:0 0 12px">' + esc(t(r)) + "</p><p>" + esc(t("tip")) + "</p>" +
        '<div class="filters" style="align-items:center"><button type="button" aria-pressed="true" data-q="start">' + esc(t("again")) + '</button><button type="button" data-q="share">' + esc(t("share")) + '</button><span class="small muted" id="qzMsg"></span></div></div>';
      return bind();
    }
    var q = st.qs[st.i], h = '<p class="small muted">' + esc(t("qOf", { n: st.i + 1, t: TOTAL })) + " · " + esc(t("score", { s: st.score })) + "</p>";
    if (q.type === "zone") {
      h += '<p style="font-size:1.15em"><b>' + esc(t("z_" + q.k, { v: q.v })) + "</b></p>" + noteBox(q);
    } else {
      var opts = q.oi ? q.order.map(function (j) { return t(q.oi)[j]; }) : q.opts;
      h += '<p style="font-size:1.15em"><b>' + esc(t("m_" + q.k, { v: q.v })) + '</b></p><div class="filters qz-opts" style="flex-direction:column;align-items:stretch;max-width:520px">' +
        opts.map(function (o, j) {
          var mark = q.answered ? (j === q.ans ? " ✓" : j === q.chose ? " ✗" : "") : "";
          return '<button type="button" data-opt="' + j + '"' + (q.answered ? " disabled" : "") + ' style="text-align:left' + (q.answered && j === q.ans ? ";font-weight:700" : "") + '">' + esc(o) + mark + "</button>";
        }).join("") + "</div>";
    }
    if (q.answered) {
      var xk = q.x || "x_" + q.k;
      h += '<div class="card" style="margin-top:12px;padding:12px 16px"><p style="margin:0 0 6px"><b>' + esc(q.right ? t("ok") : q.type === "zone" ? t("no") + " " + t("shown") : t("wrong")) + "</b></p><p style=\"margin:0\">" +
        esc(t(xk, { n: BARS[q.v] })) + '</p></div><div class="filters"><button type="button" aria-pressed="true" data-q="next">' + esc(st.i + 1 < TOTAL ? t("next") : t("finish")) + "</button></div>";
    }
    el.innerHTML = h;
    bind();
  }
  function bind() {
    Array.prototype.forEach.call(el.querySelectorAll("[data-q]"), function (b) {
      b.onclick = function () {
        var a = b.getAttribute("data-q");
        if (a === "start") { st = makeQuiz(); st.i = 0; render(); }
        else if (a === "next") { st.i++; if (st.i >= TOTAL) st.done = true; render(); el.scrollIntoView({ block: "start", behavior: "smooth" }); }
        else if (a === "share") {
          var s = st.score, r = s >= 10 ? "r10" : s >= 8 ? "r8" : s >= 6 ? "r6" : "r0", txt = t("shareText", { s: s, t: TOTAL, r: t(r) }), m = document.getElementById("qzMsg");
          try { navigator.clipboard.writeText(txt).then(function () { if (m) m.textContent = t("copied"); }, function () { if (m) m.textContent = txt; }); } catch (e) { if (m) m.textContent = txt; }
        }
      };
    });
    Array.prototype.forEach.call(el.querySelectorAll("[data-opt]"), function (b) {
      b.onclick = function () { var q = st.qs[st.i]; if (q.answered) return; q.chose = +b.getAttribute("data-opt"); q.right = q.chose === q.ans; q.answered = true; if (q.right) st.score++; render(); };
    });
    var nb = el.querySelector(".qz-note");
    if (nb && st && !st.done && !st.qs[st.i].answered) nb.onclick = function (e) {
      var q = st.qs[st.i], r = nb.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      q.at = [x, y]; q.right = hit(q, x, y); q.answered = true; if (q.right) st.score++; render();
    };
  }

  window.BOI_QUIZ = function (lang) {
    LANG = S[lang] ? lang : "en";
    el = document.getElementById("quiz");
    if (!el) return;
    if (!Z) {
      el.innerHTML = '<p class="loading">…</p>';
      fetch("/data/quiz-zones.json", { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (d) { Z = d; render(); })
        .catch(function () { el.innerHTML = '<p class="loading">' + esc(t("load")) + "</p>"; });
      return;
    }
    render();
  };
})();
