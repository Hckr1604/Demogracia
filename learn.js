/* ============================================================
   PASSPORT TO ENGLISH — página de teoría (aprende.html)
   16 lecciones: explicación breve + ejemplo sencillo por tema.
   Los ids deben coincidir con los de QUESTION_BANK en script.js
   para que el botón "Practicar este tema" abra la ronda correcta.
   ============================================================ */

const LESSONS = [
  {
    id: "be",
    num: 1,
    icon: "🪞",
    title: "El verbo to Be",
    subtitle: "Afirmaciones, negaciones y preguntas",
    rules: [
      "Se usa para decir quién o cómo es alguien/algo (<strong>ser</strong>) o dónde/cómo está (<strong>estar</strong>).",
      "Afirmativo: I <strong>am</strong>, You/We/They <strong>are</strong>, He/She/It <strong>is</strong>.",
      "Negativo: se agrega \"not\" → isn't, aren't, am not.",
      "Preguntas: se invierte el orden → Am/Is/Are + sujeto...?"
    ],
    examples: [
      { en: "I am a student.", es: "Soy estudiante." },
      { en: "She isn't tired.", es: "Ella no está cansada." },
      { en: "Are you ready?", es: "¿Estás listo/a?" }
    ]
  },
  {
    id: "articles",
    num: 2,
    icon: "📰",
    title: "Los artículos",
    subtitle: "A, An y The",
    rules: [
      "\"A\" y \"an\" son artículos indefinidos: hablan de algo no específico (un/una).",
      "Usamos <strong>a</strong> antes de sonido de consonante y <strong>an</strong> antes de sonido de vocal.",
      "\"The\" es el artículo definido: se usa cuando el sustantivo es específico o único para ambas personas."
    ],
    examples: [
      { en: "I have a dog.", es: "Tengo un perro." },
      { en: "She ate an apple.", es: "Ella comió una manzana." },
      { en: "The sun is bright today.", es: "El sol está brillante hoy." }
    ]
  },
  {
    id: "prepositions",
    num: 3,
    icon: "🧭",
    title: "Preposiciones",
    subtitle: "At, on, in — tiempo y lugar",
    rules: [
      "<strong>At</strong>: horas exactas y puntos específicos (at 7 pm, at the door).",
      "<strong>On</strong>: días y superficies (on Monday, on the table).",
      "<strong>In</strong>: meses, años, estaciones y espacios cerrados (in July, in the box)."
    ],
    examples: [
      { en: "I wake up at 7 a.m.", es: "Me despierto a las 7 a.m." },
      { en: "My birthday is in July.", es: "Mi cumpleaños es en julio." },
      { en: "The keys are on the table.", es: "Las llaves están sobre la mesa." }
    ]
  },
  {
    id: "simplePresent",
    num: 4,
    icon: "☀️",
    title: "Presente simple",
    subtitle: "Rutinas y hechos",
    rules: [
      "Se usa para rutinas, hábitos y hechos generales.",
      "Afirmativo: sujeto + verbo (se agrega <strong>-s/-es</strong> con He/She/It).",
      "Negativo: <strong>don't/doesn't</strong> + verbo base.",
      "Preguntas: <strong>Do/Does</strong> + sujeto + verbo base...?"
    ],
    examples: [
      { en: "She works every day.", es: "Ella trabaja todos los días." },
      { en: "I don't like coffee.", es: "No me gusta el café." },
      { en: "Do you like pizza?", es: "¿Te gusta la pizza?" }
    ]
  },
  {
    id: "presentContinuous",
    num: 5,
    icon: "🏃",
    title: "Presente continuo",
    subtitle: "Acciones en curso",
    rules: [
      "Se usa para acciones que están pasando en este momento.",
      "Estructura: <strong>am/is/are</strong> + verbo-<strong>ing</strong>.",
      "Negativo: am not / isn't / aren't + verbo-ing.",
      "Preguntas: Am/Is/Are + sujeto + verbo-ing...?"
    ],
    examples: [
      { en: "I am studying now.", es: "Estoy estudiando ahora." },
      { en: "She isn't working today.", es: "Ella no está trabajando hoy." },
      { en: "Are you listening to me?", es: "¿Me estás escuchando?" }
    ]
  },
  {
    id: "simplePast",
    num: 6,
    icon: "📜",
    title: "Pasado simple",
    subtitle: "Historias de ayer",
    rules: [
      "Se usa para acciones ya terminadas en el pasado.",
      "Verbos regulares: se agrega <strong>-ed</strong> (worked, visited).",
      "Verbos irregulares cambian de forma (go → went, eat → ate).",
      "Negativo: <strong>didn't</strong> + verbo base. Preguntas: <strong>Did</strong> + sujeto + verbo base...?"
    ],
    examples: [
      { en: "I visited my grandma yesterday.", es: "Visité a mi abuela ayer." },
      { en: "He didn't call me.", es: "Él no me llamó." },
      { en: "Did you finish your homework?", es: "¿Terminaste tu tarea?" }
    ]
  },
  {
    id: "simpleFuture",
    num: 7,
    icon: "🚀",
    title: "Futuro simple",
    subtitle: "Planes con will",
    rules: [
      "Se usa para predicciones, decisiones espontáneas y promesas.",
      "Estructura: <strong>will</strong> + verbo base (igual para todos los sujetos).",
      "Negativo: <strong>won't</strong> (will not) + verbo base.",
      "Preguntas: Will + sujeto + verbo base...?"
    ],
    examples: [
      { en: "I will call you tomorrow.", es: "Te llamaré mañana." },
      { en: "She won't come to the party.", es: "Ella no vendrá a la fiesta." },
      { en: "Will you help me?", es: "¿Me ayudarás?" }
    ]
  },
  {
    id: "presentPerfect",
    num: 8,
    icon: "🧳",
    title: "Presente perfecto",
    subtitle: "Experiencias y resultados",
    rules: [
      "Conecta el pasado con el presente: experiencias de vida, resultados o acciones sin un momento específico.",
      "Estructura: <strong>have/has</strong> + participio pasado.",
      "Negativo: haven't/hasn't + participio.",
      "Preguntas: Have/Has + sujeto + participio...?"
    ],
    examples: [
      { en: "I have finished my homework.", es: "Ya terminé mi tarea." },
      { en: "She hasn't called yet.", es: "Ella todavía no ha llamado." },
      { en: "Have you ever been to Peru?", es: "¿Alguna vez has estado en Perú?" }
    ]
  },
  {
    id: "passive",
    num: 9,
    icon: "🏭",
    title: "Voz pasiva",
    subtitle: "Presente simple pasivo",
    rules: [
      "Se usa cuando la acción es más importante que quién la hace, o no sabemos quién la hace.",
      "Estructura: sujeto + <strong>is/are</strong> + participio pasado.",
      "Negativo: isn't/aren't + participio. Preguntas: Is/Are + sujeto + participio...?"
    ],
    examples: [
      { en: "English is spoken in many countries.", es: "El inglés se habla en muchos países." },
      { en: "The letters are sent every day.", es: "Las cartas se envían todos los días." }
    ]
  },
  {
    id: "quantity",
    num: 10,
    icon: "📦",
    title: "Hay algo por aquí",
    subtitle: "There is/are, sustantivos y cantidades",
    rules: [
      "<strong>There is</strong> se usa con sustantivos singulares o incontables; <strong>there are</strong> con plurales.",
      "Los sustantivos contables se pueden contar (book, books); los incontables no (water, money).",
      "<strong>How much</strong> se usa con incontables; <strong>how many</strong> con contables."
    ],
    examples: [
      { en: "There is a book on the table.", es: "Hay un libro sobre la mesa." },
      { en: "There are two cats in the garden.", es: "Hay dos gatos en el jardín." },
      { en: "How much water do you need?", es: "¿Cuánta agua necesitas?" }
    ]
  },
  {
    id: "frequency",
    num: 11,
    icon: "🔁",
    title: "Adverbios de frecuencia",
    subtitle: "Always, sometimes, never...",
    rules: [
      "Indican con qué frecuencia ocurre algo: always, usually, often, sometimes, rarely, never.",
      "Van <strong>antes</strong> del verbo principal (I always drink...).",
      "Pero van <strong>después</strong> del verbo \"be\" (She is always...)."
    ],
    examples: [
      { en: "I always drink coffee in the morning.", es: "Siempre tomo café en la mañana." },
      { en: "She is never late.", es: "Ella nunca llega tarde." }
    ]
  },
  {
    id: "modals",
    num: 12,
    icon: "🧩",
    title: "Modales y consejos",
    subtitle: "Can, should, must, had better",
    rules: [
      "<strong>Can</strong> expresa habilidad, <strong>should</strong> da un consejo, <strong>must/have to</strong> expresan obligación, <strong>may/might</strong> expresan posibilidad.",
      "<strong>Had better</strong> da un consejo urgente o una advertencia.",
      "Todos van seguidos de un verbo en forma base (sin -s, sin \"to\")."
    ],
    examples: [
      { en: "I can swim very well.", es: "Sé nadar muy bien." },
      { en: "You should study more.", es: "Deberías estudiar más." },
      { en: "You'd better hurry, the bus is coming.", es: "Es mejor que te apures, el bus está llegando." }
    ]
  },
  {
    id: "demonstratives",
    num: 13,
    icon: "👉",
    title: "Demostrativos",
    subtitle: "This, these, that, those",
    rules: [
      "<strong>This</strong> (esto/a) y <strong>these</strong> (estos/as) señalan algo cerca.",
      "<strong>That</strong> (eso/aquello) y <strong>those</strong> (esos/aquellos) señalan algo lejos.",
      "This/that son singulares; these/those son plurales."
    ],
    examples: [
      { en: "This is my pen.", es: "Este es mi lápiz." },
      { en: "Those are nice shoes.", es: "Esos son bonitos zapatos." }
    ]
  },
  {
    id: "adjectives",
    num: 14,
    icon: "📊",
    title: "Comparativos y superlativos",
    subtitle: "Más... el más...",
    rules: [
      "<strong>Comparativo</strong> (compara dos cosas): adjetivos cortos + \"-er\" (taller); adjetivos largos usan \"more\" + adjetivo (more interesting).",
      "<strong>Superlativo</strong> (compara tres o más cosas): \"the\" + adjetivo + \"-est\" (the tallest) o \"the most\" + adjetivo (the most interesting)."
    ],
    examples: [
      { en: "She is taller than me.", es: "Ella es más alta que yo." },
      { en: "This is the best restaurant in town.", es: "Este es el mejor restaurante de la ciudad." }
    ]
  },
  {
    id: "possessives",
    num: 15,
    icon: "🔑",
    title: "Todo es de alguien",
    subtitle: "Adjetivos, sustantivos y pronombres posesivos",
    rules: [
      "<strong>Adjetivos posesivos</strong> (my, your, his, her, its, our, their) van antes de un sustantivo.",
      "<strong>Pronombres posesivos</strong> (mine, yours, his, hers, ours, theirs) reemplazan al sustantivo.",
      "<strong>Sustantivos posesivos</strong>: se agrega <strong>'s</strong> (Maria's) para mostrar de quién es algo."
    ],
    examples: [
      { en: "This is my book.", es: "Este es mi libro." },
      { en: "That book is mine.", es: "Ese libro es mío." },
      { en: "This is Maria's book.", es: "Este es el libro de María." }
    ]
  },
  {
    id: "advanced",
    num: 16,
    icon: "🎯",
    title: "Preguntas y condicionales",
    subtitle: "Tag questions, conditionals & would like",
    rules: [
      "Las <strong>tag questions</strong> son preguntas cortas al final de la oración para confirmar algo: si la oración es afirmativa, el tag es negativo (y viceversa).",
      "<strong>Primer condicional</strong> (situación real/probable en el futuro): If + presente simple, + will + verbo base.",
      "<strong>Segundo condicional</strong> (situación hipotética/imaginaria): If + pasado simple, + would + verbo base.",
      "<strong>Would like</strong> se usa para ofrecer o pedir algo de forma cortés."
    ],
    examples: [
      { en: "It's cold, isn't it?", es: "Hace frío, ¿no?" },
      { en: "If it rains, I will stay home.", es: "Si llueve, me quedaré en casa." },
      { en: "If I had more time, I would travel.", es: "Si tuviera más tiempo, viajaría." },
      { en: "Would you like some coffee?", es: "¿Te gustaría un café?" }
    ]
  }
];

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderLessons() {
  const list = document.getElementById("lessons-list");
  list.innerHTML = "";

  LESSONS.forEach((lesson) => {
    const card = el("div", "lesson-card");
    card.id = `lesson-${lesson.id}`;

    const header = el("button", "lesson-header");
    header.setAttribute("type", "button");
    header.setAttribute("aria-expanded", "false");

    const num = el("span", "lesson-num", String(lesson.num).padStart(2, "0"));
    const icon = el("span", "lesson-icon", lesson.icon);
    const titles = el("span", "lesson-titles");
    titles.appendChild(el("span", "lesson-title", lesson.title));
    titles.appendChild(el("span", "lesson-subtitle", lesson.subtitle));
    const chevron = el("span", "lesson-chevron", "⌄");

    header.appendChild(num);
    header.appendChild(icon);
    header.appendChild(titles);
    header.appendChild(chevron);

    const body = el("div", "lesson-body");

    const rulesTitle = el("h3", null, "¿Cómo se usa?");
    const rulesList = el("ul");
    lesson.rules.forEach((rule) => {
      rulesList.appendChild(el("li", null, rule));
    });

    const exampleTitle = el("h3", null, "Ejemplo sencillo");
    const exampleBox = el("div", "example-box");
    lesson.examples.forEach((ex) => {
      const p = el("p");
      p.appendChild(el("span", "ex-en", ex.en));
      p.appendChild(document.createElement("br"));
      p.appendChild(el("span", "ex-es", ex.es));
      exampleBox.appendChild(p);
    });

    const practiceLink = el("a", "lesson-practice-link", `Practicar este tema →`);
    practiceLink.href = `index.html?topic=${lesson.id}`;

    body.appendChild(rulesTitle);
    body.appendChild(rulesList);
    body.appendChild(exampleTitle);
    body.appendChild(exampleBox);
    body.appendChild(practiceLink);

    header.addEventListener("click", () => {
      const isOpen = card.classList.toggle("open");
      header.setAttribute("aria-expanded", String(isOpen));
      body.style.maxHeight = isOpen ? body.scrollHeight + "px" : "0px";
    });

    card.appendChild(header);
    card.appendChild(body);
    list.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderLessons();

  const expandAllBtn = document.getElementById("btn-expand-all");
  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", () => {
      const cards = document.querySelectorAll(".lesson-card");
      const allOpen = Array.from(cards).every((c) => c.classList.contains("open"));
      cards.forEach((card) => {
        const header = card.querySelector(".lesson-header");
        const body = card.querySelector(".lesson-body");
        if (allOpen) {
          card.classList.remove("open");
          header.setAttribute("aria-expanded", "false");
          body.style.maxHeight = "0px";
        } else {
          card.classList.add("open");
          header.setAttribute("aria-expanded", "true");
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
      expandAllBtn.textContent = allOpen ? "Expandir todo" : "Contraer todo";
    });
  }
});
