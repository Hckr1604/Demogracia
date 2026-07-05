/* ============================================================
   PASSPORT TO ENGLISH — trivia engine + question bank
   ============================================================ */

const ROUND_SIZE = 8; // preguntas por ronda (se elige al azar del banco)

const TOPICS = [
  { id: "be", num: 1, title: "El verbo Be", subtitle: "Afirmaciones, negaciones y preguntas", icon: "🪞" },
  { id: "articles", num: 2, title: "Los artículos", subtitle: "A, An y The", icon: "📰" },
  { id: "prepositions", num: 3, title: "Preposiciones", subtitle: "At, on, in — tiempo y lugar", icon: "🧭" },
  { id: "simplePresent", num: 4, title: "Presente simple", subtitle: "Rutinas y hechos", icon: "☀️" },
  { id: "presentContinuous", num: 5, title: "Presente continuo", subtitle: "Acciones en curso", icon: "🏃" },
  { id: "simplePast", num: 6, title: "Pasado simple", subtitle: "Historias de ayer", icon: "📜" },
  { id: "simpleFuture", num: 7, title: "Futuro simple", subtitle: "Planes con will", icon: "🚀" },
  { id: "presentPerfect", num: 8, title: "Presente perfecto", subtitle: "Experiencias y resultados", icon: "🧳" },
  { id: "passive", num: 9, title: "Voz pasiva", subtitle: "Presente simple pasivo", icon: "🏭" },
  { id: "quantity", num: 10, title: "Hay algo por aquí", subtitle: "There is/are, sustantivos y cantidades", icon: "📦" },
  { id: "frequency", num: 11, title: "Adverbios de frecuencia", subtitle: "Always, sometimes, never...", icon: "🔁" },
  { id: "modals", num: 12, title: "Modales y consejos", subtitle: "Can, should, must, had better", icon: "🧩" },
  { id: "demonstratives", num: 13, title: "Demostrativos", subtitle: "This, these, that, those", icon: "👉" },
  { id: "adjectives", num: 14, title: "Comparativos y superlativos", subtitle: "Más... el más...", icon: "📊" },
  { id: "possessives", num: 15, title: "Todo es de alguien", subtitle: "Adjetivos, sustantivos y pronombres posesivos", icon: "🔑" },
  { id: "advanced", num: 16, title: "Preguntas y condicionales", subtitle: "Tag questions, conditionals & would like", icon: "🎯" }
];

/* ------------------------------------------------------------
   QUESTION BANK
   type: "mc"    -> { prompt, options[4], answer }
   type: "fill"  -> { prompt, answers[...] }  (acepta varias formas)
   type: "order" -> { prompt, tokens[...] }   (orden correcto de palabras)
   ------------------------------------------------------------ */
const QUESTION_BANK = {
  be: [
    { type: "mc", prompt: "My brother ___ a teacher.", options: ["is", "are", "am", "be"], answer: "is", tip: "He/She/It + is." },
    { type: "mc", prompt: "We ___ very excited about the trip.", options: ["are", "is", "am", "be"], answer: "are", tip: "We/You/They + are." },
    { type: "mc", prompt: "It ___ cold today. (negative)", options: ["isn't", "aren't", "am not", "not is"], answer: "isn't", tip: "It + isn't (is not)." },
    { type: "fill", prompt: "She ___ from Colombia.", answers: ["is"], tip: "She + is." },
    { type: "fill", prompt: "They ___ (not) at school now.", answers: ["aren't", "are not"], tip: "They + are not / aren't." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["Maria", "is", "a", "nurse"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["John", "isn't", "hungry"] },
    { type: "mc", prompt: "___ you a student?", options: ["Are", "Is", "Am", "Be"], answer: "Are", tip: "You + Are en preguntas." },
    { type: "mc", prompt: "___ he your friend?", options: ["Is", "Are", "Am", "Do"], answer: "Is", tip: "He + Is en preguntas." },
    { type: "fill", prompt: "___ is your favorite color?", answers: ["what"], tip: "Pregunta por información: What." },
    { type: "mc", prompt: "___ are you from?", options: ["Where", "What", "Who", "When"], answer: "Where", tip: "Where pregunta por lugar de origen." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Are", "you", "ready"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Where", "is", "she", "from"] },
    { type: "fill", prompt: "Are you tired? — Yes, I ___.", answers: ["am"], tip: "Respuesta corta con am." },
    { type: "fill", prompt: "___ they doctors?", answers: ["are"], tip: "They + Are en preguntas." },
    { type: "mc", prompt: "My parents ___ at home.", options: ["are", "is", "am", "be"], answer: "are", tip: "They + are." },
    { type: "mc", prompt: "She ___ my best friend.", options: ["is", "are", "am", "be"], answer: "is", tip: "She + is." },
    { type: "mc", prompt: "I ___ very happy today.", options: ["am", "is", "are", "be"], answer: "am", tip: "I + am." },
    { type: "mc", prompt: "The dogs ___ in the garden.", options: ["are", "is", "am", "be"], answer: "are", tip: "Plural subjects + are." },
    { type: "mc", prompt: "He ___ busy right now.", options: ["is", "are", "am", "be"], answer: "is", tip: "He + is." },
    { type: "mc", prompt: "You ___ my favorite teacher.", options: ["are", "is", "am", "be"], answer: "are", tip: "You + are." },
    { type: "mc", prompt: "I ___ late. (negative)", options: ["am not", "isn't", "aren't", "not am"], answer: "am not", tip: "I + am not." },
    { type: "mc", prompt: "They ___ tired. (negative)", options: ["aren't", "isn't", "am not", "not are"], answer: "aren't", tip: "They + aren't." },
    { type: "mc", prompt: "She ___ at work. (negative)", options: ["isn't", "aren't", "am not", "not is"], answer: "isn't", tip: "She + isn't." },
    { type: "mc", prompt: "We ___ hungry. (negative)", options: ["aren't", "isn't", "am not", "not are"], answer: "aren't", tip: "We + aren't." },
    { type: "fill", prompt: "He ___ my cousin.", answers: ["is"], tip: "He + is." },
    { type: "fill", prompt: "We ___ classmates.", answers: ["are"], tip: "We + are." },
    { type: "fill", prompt: "I ___ a doctor.", answers: ["am"], tip: "I + am." },
    { type: "fill", prompt: "The cat ___ under the table.", answers: ["is"], tip: "The cat + is." },
    { type: "fill", prompt: "You ___ very kind.", answers: ["are"], tip: "You + are." },
    { type: "fill", prompt: "It ___ a beautiful day.", answers: ["is"], tip: "It + is." },
    { type: "fill", prompt: "She ___ (not) my sister.", answers: ["isn't", "is not"], tip: "She + isn't / is not." },
    { type: "fill", prompt: "We ___ (not) at the office.", answers: ["aren't", "are not"], tip: "We + aren't / are not." },
    { type: "fill", prompt: "I ___ (not) hungry.", answers: ["am not"], tip: "I + am not." },
    { type: "fill", prompt: "It ___ (not) expensive.", answers: ["isn't", "is not"], tip: "It + isn't / is not." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["They", "are", "students"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "am", "happy"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "car", "is", "new"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "are", "friends"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["It", "is", "easy"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["She", "isn't", "busy"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["They", "aren't", "ready"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["I", "am", "not", "late"] },
    { type: "mc", prompt: "___ she at home?", options: ["Is", "Are", "Am", "Do"], answer: "Is", tip: "She + Is en preguntas." },
    { type: "mc", prompt: "___ they your friends?", options: ["Are", "Is", "Am", "Do"], answer: "Are", tip: "They + Are en preguntas." },
    { type: "mc", prompt: "___ I correct?", options: ["Am", "Is", "Are", "Be"], answer: "Am", tip: "I + Am en preguntas." },
    { type: "mc", prompt: "___ we on time?", options: ["Are", "Is", "Am", "Be"], answer: "Are", tip: "We + Are en preguntas." },
    { type: "mc", prompt: "___ it your phone?", options: ["Is", "Are", "Am", "Do"], answer: "Is", tip: "It + Is en preguntas." },
    { type: "fill", prompt: "___ is your name?", answers: ["what"], tip: "What pregunta por información." },
    { type: "fill", prompt: "___ are they?", answers: ["who"], tip: "Who pregunta por personas." },
    { type: "fill", prompt: "___ is your birthday?", answers: ["when"], tip: "When pregunta por tiempo." },
    { type: "fill", prompt: "___ old are you?", answers: ["how"], tip: "How old pregunta por edad." },
    { type: "fill", prompt: "___ is your teacher?", answers: ["who"], tip: "Who pregunta por personas." },
    { type: "mc", prompt: "___ is your backpack?", options: ["Where", "Who", "What", "When"], answer: "Where", tip: "Where pregunta por lugar." },
    { type: "mc", prompt: "___ is your birthday?", options: ["When", "Where", "Who", "What"], answer: "When", tip: "When pregunta por tiempo." },
    { type: "mc", prompt: "___ is that woman?", options: ["Who", "Where", "When", "What"], answer: "Who", tip: "Who pregunta por personas." },
    { type: "mc", prompt: "___ is your job?", options: ["What", "Where", "Who", "When"], answer: "What", tip: "What pregunta por información." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Is", "he", "at", "home"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Are", "they", "happy"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["What", "is", "your", "name"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Who", "is", "your", "teacher"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["When", "is", "the", "meeting"] },
    { type: "fill", prompt: "Is she a student? — Yes, she ___.", answers: ["is"], tip: "Respuesta corta con is." },
    { type: "fill", prompt: "Are they at home? — No, they ___.", answers: ["aren't", "are not"], tip: "Respuesta corta negativa." },
    { type: "fill", prompt: "Am I late? — No, you ___ not.", answers: ["are"], tip: "Con 'you', se usa are." }
  ],

  articles: [
    { type: "mc", prompt: "I saw ___ elephant at the zoo.", options: ["an", "a", "the", "—"], answer: "an", tip: "Antes de sonido vocálico usamos an." },
    { type: "mc", prompt: "She has ___ cat.", options: ["a", "an", "the", "—"], answer: "a", tip: "Antes de sonido consonántico usamos a." },
    { type: "mc", prompt: "___ sun is very hot.", options: ["The", "A", "An", "—"], answer: "The", tip: "Algo único en el mundo: the sun." },
    { type: "fill", prompt: "He is ___ engineer.", answers: ["an"], tip: "\"Engineer\" empieza con sonido vocálico." },
    { type: "fill", prompt: "They live in ___ old house.", answers: ["an"], tip: "\"Old\" empieza con sonido vocálico." },
    { type: "mc", prompt: "Can you pass me ___ salt, please? (la sal específica de la mesa)", options: ["the", "a", "an", "—"], answer: "the", tip: "Algo específico y conocido por ambos: the." },
    { type: "mc", prompt: "___ apples are healthy. (en general)", options: ["—", "The", "An", "A"], answer: "—", tip: "Idea general con sustantivo plural: sin artículo." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "bought", "a", "book"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "moon", "is", "bright"] },
    { type: "fill", prompt: "This is ___ university. (sonido /ju/)", answers: ["a"], tip: "\"University\" suena como consonante /j/, por eso usamos a." },
    { type: "mc", prompt: "___ United States is a big country.", options: ["The", "A", "An", "—"], answer: "The", tip: "Nombres de países con \"States\", \"Kingdom\", etc. usan the." },
    { type: "fill", prompt: "I need ___ umbrella, it's raining.", answers: ["an"], tip: "\"Umbrella\" empieza con sonido vocálico." },
    { type: "mc", prompt: "She plays ___ guitar.", options: ["the", "a", "an", "—"], answer: "the", tip: "Instrumentos musicales usan the." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["He", "is", "an", "honest", "man"] },
    { type: "mc", prompt: "There is ___ hour before the movie starts.", options: ["an", "a", "the", "—"], answer: "an", tip: "\"Hour\" tiene h muda, sonido vocálico." },
        { type: "mc", prompt: "She bought ___ apple at the market.", options: ["an", "a", "the", "—"], answer: "an", tip: "Antes de sonido vocálico usamos an." },
    { type: "mc", prompt: "He has ___ bicycle.", options: ["a", "an", "the", "—"], answer: "a", tip: "Antes de sonido consonántico usamos a." },
    { type: "mc", prompt: "___ Earth goes around the sun.", options: ["The", "A", "An", "—"], answer: "The", tip: "Planetas y cuerpos únicos suelen usar the." },
    { type: "mc", prompt: "I need ___ pencil for class.", options: ["a", "an", "the", "—"], answer: "a", tip: "Pencil empieza con sonido consonántico." },
    { type: "mc", prompt: "She is ___ actress.", options: ["an", "a", "the", "—"], answer: "an", tip: "Actress empieza con sonido vocálico." },
    { type: "mc", prompt: "___ Pacific Ocean is enormous.", options: ["The", "A", "An", "—"], answer: "The", tip: "Los océanos usan the." },
    { type: "mc", prompt: "___ dogs are loyal animals. (en general)", options: ["—", "The", "A", "An"], answer: "—", tip: "Plural en sentido general: sin artículo." },
    { type: "mc", prompt: "Please close ___ door. (la puerta de esta habitación)", options: ["the", "a", "an", "—"], answer: "the", tip: "Puerta específica: the." },
    { type: "fill", prompt: "She wants ___ orange.", answers: ["an"], tip: "\"Orange\" empieza con sonido vocálico." },
    { type: "fill", prompt: "He bought ___ new computer.", answers: ["a"], tip: "\"New\" empieza con sonido consonántico." },
    { type: "fill", prompt: "This is ___ interesting movie.", answers: ["an"], tip: "\"Interesting\" empieza con sonido vocálico." },
    { type: "fill", prompt: "They adopted ___ dog.", answers: ["a"], tip: "\"Dog\" empieza con sonido consonántico." },
    { type: "fill", prompt: "She is ___ honest woman.", answers: ["an"], tip: "\"Honest\" tiene h muda." },
    { type: "fill", prompt: "We visited ___ Eiffel Tower.", answers: ["the"], tip: "Monumento específico: the." },
    { type: "fill", prompt: "___ milk is good for you. (en general)", answers: ["—"], tip: "Sustantivo incontable en sentido general: sin artículo." },
    { type: "fill", prompt: "He needs ___ umbrella.", answers: ["an"], tip: "\"Umbrella\" empieza con sonido vocálico." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "has", "a", "car"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "ate", "an", "orange"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "teacher", "is", "here"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["He", "bought", "an", "egg"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "live", "in", "a", "small", "house"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "children", "are", "playing"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "is", "an", "artist"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "read", "a", "newspaper"] },
    { type: "mc", prompt: "He is ___ doctor.", options: ["a", "an", "the", "—"], answer: "a", tip: "\"Doctor\" empieza con sonido consonántico." },
    { type: "mc", prompt: "She found ___ envelope.", options: ["an", "a", "the", "—"], answer: "an", tip: "\"Envelope\" empieza con sonido vocálico." },
    { type: "mc", prompt: "___ Amazon River is very long.", options: ["The", "A", "An", "—"], answer: "The", tip: "Los ríos usan the." },
    { type: "mc", prompt: "I have ___ idea!", options: ["an", "a", "the", "—"], answer: "an", tip: "\"Idea\" empieza con sonido vocálico." },
    { type: "mc", prompt: "He is reading ___ newspaper I bought yesterday.", options: ["the", "a", "an", "—"], answer: "the", tip: "Objeto específico: the." },
    { type: "mc", prompt: "___ water is essential for life. (en general)", options: ["—", "The", "A", "An"], answer: "—", tip: "Incontable en sentido general: sin artículo." },
    { type: "mc", prompt: "She wants to be ___ astronaut.", options: ["an", "a", "the", "—"], answer: "an", tip: "\"Astronaut\" empieza con sonido vocálico." },
    { type: "mc", prompt: "There is ___ supermarket near my house.", options: ["a", "an", "the", "—"], answer: "a", tip: "\"Supermarket\" empieza con sonido consonántico." },
    { type: "fill", prompt: "This is ___ useful tool. (sonido /ju/)", answers: ["a"], tip: "\"Useful\" empieza con sonido /ju/, por eso usamos a." },
    { type: "fill", prompt: "He is ___ uncle of mine.", answers: ["an"], tip: "\"Uncle\" empieza con sonido vocálico." },
    { type: "fill", prompt: "We saw ___ rainbow after the rain.", answers: ["a"], tip: "\"Rainbow\" empieza con sonido consonántico." },
    { type: "fill", prompt: "They climbed ___ mountain we saw yesterday.", answers: ["the"], tip: "Montaña específica: the." },
    { type: "fill", prompt: "___ life is beautiful. (en general)", answers: ["—"], tip: "Idea general: sin artículo." },
    { type: "fill", prompt: "She drank ___ cup of coffee.", answers: ["a"], tip: "\"Cup\" empieza con sonido consonántico." },
    { type: "mc", prompt: "He works at ___ hospital near here.", options: ["a", "an", "the", "—"], answer: "a", tip: "Hospital no específico: a." },
    { type: "mc", prompt: "I waited for ___ hour.", options: ["an", "a", "the", "—"], answer: "an", tip: "\"Hour\" tiene h muda." },
    { type: "mc", prompt: "___ Himalayas are in Asia.", options: ["The", "A", "An", "—"], answer: "The", tip: "Las cadenas montañosas usan the." },
    { type: "mc", prompt: "She has ___ European passport. (sonido /ju/)", options: ["a", "an", "the", "—"], answer: "a", tip: "\"European\" empieza con sonido /ju/." },
    { type: "mc", prompt: "We visited ___ museum you recommended.", options: ["the", "a", "an", "—"], answer: "the", tip: "Museo específico: the." },
    { type: "mc", prompt: "___ cheese is delicious. (en general)", options: ["—", "The", "A", "An"], answer: "—", tip: "Incontable en sentido general: sin artículo." },
    { type: "fill", prompt: "She is ___ MBA student.", answers: ["an"], tip: "\"MBA\" se pronuncia empezando con sonido vocálico (/em/)." }
  ],

  prepositions: [
    { type: "mc", prompt: "I wake up ___ 7 a.m.", options: ["at", "on", "in", "to"], answer: "at", tip: "Horas exactas: at." },
    { type: "mc", prompt: "We have class ___ Monday.", options: ["on", "at", "in", "to"], answer: "on", tip: "Días de la semana: on." },
    { type: "mc", prompt: "She was born ___ 1998.", options: ["in", "on", "at", "to"], answer: "in", tip: "Años, meses, estaciones: in." },
    { type: "fill", prompt: "The meeting is ___ noon.", answers: ["at"], tip: "Horas exactas: at noon." },
    { type: "fill", prompt: "My birthday is ___ July.", answers: ["in"], tip: "Meses: in July." },
    { type: "mc", prompt: "The keys are ___ the table.", options: ["on", "in", "at", "to"], answer: "on", tip: "Sobre una superficie: on." },
    { type: "mc", prompt: "She lives ___ Lima.", options: ["in", "on", "at", "to"], answer: "in", tip: "Ciudades y países: in." },
    { type: "mc", prompt: "He is waiting ___ the bus stop.", options: ["at", "in", "on", "to"], answer: "at", tip: "Un punto específico: at." },
    { type: "fill", prompt: "There's a spider ___ the wall.", answers: ["on"], tip: "Sobre una superficie vertical: on." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "party", "starts", "at", "midnight"] },
    { type: "mc", prompt: "I'll see you ___ the weekend.", options: ["on", "at", "in", "to"], answer: "on", tip: "\"On the weekend\" (uso americano)." },
    { type: "fill", prompt: "The book is ___ the shelf.", answers: ["on"], tip: "Sobre una superficie: on." },
    { type: "mc", prompt: "They arrived ___ the airport.", options: ["at", "in", "on", "to"], answer: "at", tip: "Puntos/lugares específicos: at." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["It's", "hot", "in", "summer"] },
    { type: "fill", prompt: "We meet ___ 5 o'clock every Friday.", answers: ["at"], tip: "Horas exactas: at." },
    { type: "mc", prompt: "The train leaves ___ 6:30 p.m.", options: ["at", "on", "in", "to"], answer: "at", tip: "Horas exactas: at." },
    { type: "mc", prompt: "We go shopping ___ Saturdays.", options: ["on", "at", "in", "to"], answer: "on", tip: "Días de la semana: on." },
    { type: "mc", prompt: "My parents got married ___ 2005.", options: ["in", "on", "at", "to"], answer: "in", tip: "Años: in." },
    { type: "mc", prompt: "The cat is ___ the box.", options: ["in", "on", "at", "to"], answer: "in", tip: "Dentro de un espacio: in." },
    { type: "mc", prompt: "There's a picture ___ the wall.", options: ["on", "in", "at", "to"], answer: "on", tip: "Pegado o sobre una superficie: on." },
    { type: "mc", prompt: "She studies ___ the library every afternoon.", options: ["at", "in", "on", "to"], answer: "at", tip: "Lugar específico: at." },
    { type: "mc", prompt: "He lives ___ Brazil.", options: ["in", "on", "at", "to"], answer: "in", tip: "Países: in." },
    { type: "mc", prompt: "We arrived ___ school early.", options: ["at", "in", "on", "to"], answer: "at", tip: "Lugares específicos: at." },
    { type: "fill", prompt: "The movie starts ___ 8:00.", answers: ["at"], tip: "Horas exactas: at." },
    { type: "fill", prompt: "She was born ___ December.", answers: ["in"], tip: "Meses: in." },
    { type: "fill", prompt: "We usually travel ___ summer.", answers: ["in"], tip: "Estaciones: in." },
    { type: "fill", prompt: "The notebook is ___ the desk.", answers: ["on"], tip: "Sobre una superficie: on." },
    { type: "fill", prompt: "My brother lives ___ Canada.", answers: ["in"], tip: "Países: in." },
    { type: "fill", prompt: "The children are ___ the classroom.", answers: ["in"], tip: "Dentro de un lugar: in." },
    { type: "fill", prompt: "We have lunch ___ noon.", answers: ["at"], tip: "At noon." },
    { type: "fill", prompt: "Her birthday is ___ Friday.", answers: ["on"], tip: "Días: on." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "arrived", "at", "the", "station"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "keys", "are", "on", "the", "table"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "live", "in", "Peru"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["School", "starts", "at", "8", "a.m."] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["They", "play", "soccer", "on", "Sundays"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "dog", "is", "in", "the", "garden"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["My", "birthday", "is", "in", "October"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "meeting", "is", "at", "3", "p.m."] },
    { type: "mc", prompt: "I usually go to bed ___ midnight.", options: ["at", "on", "in", "to"], answer: "at", tip: "Horas específicas: at midnight." },
    { type: "mc", prompt: "We always visit our grandparents ___ Christmas.", options: ["at", "on", "in", "to"], answer: "at", tip: "Festividades: at Christmas." },
    { type: "mc", prompt: "The flowers are ___ the garden.", options: ["in", "on", "at", "to"], answer: "in", tip: "Dentro de un área: in." },
    { type: "mc", prompt: "Our exam is ___ Tuesday morning.", options: ["on", "at", "in", "to"], answer: "on", tip: "Día específico: on." },
    { type: "mc", prompt: "She works ___ a hospital.", options: ["at", "in", "on", "to"], answer: "at", tip: "Lugar de trabajo específico: at." },
    { type: "mc", prompt: "The children are playing ___ the park.", options: ["in", "on", "at", "to"], answer: "in", tip: "Dentro del parque: in." },
    { type: "mc", prompt: "My family moved here ___ 2018.", options: ["in", "on", "at", "to"], answer: "in", tip: "Años: in." },
    { type: "mc", prompt: "The computer is ___ the desk.", options: ["on", "in", "at", "to"], answer: "on", tip: "Sobre una superficie: on." },
    { type: "fill", prompt: "The concert is ___ Saturday night.", answers: ["on"], tip: "Días específicos: on." },
    { type: "fill", prompt: "We arrived ___ the hotel at 9 p.m.", answers: ["at"], tip: "Lugar específico: at." },
    { type: "fill", prompt: "The toys are ___ the box.", answers: ["in"], tip: "Dentro de un recipiente: in." },
    { type: "fill", prompt: "She studies ___ the evening.", answers: ["in"], tip: "Partes del día: in the evening." },
    { type: "fill", prompt: "The bus arrives ___ 10:15.", answers: ["at"], tip: "Horas exactas: at." },
    { type: "fill", prompt: "We always travel ___ July.", answers: ["in"], tip: "Meses: in." },
    { type: "mc", prompt: "There is a restaurant ___ the corner.", options: ["at", "in", "on", "to"], answer: "at", tip: "Expresión fija: at the corner." },
    { type: "mc", prompt: "The picture is hanging ___ the wall.", options: ["on", "in", "at", "to"], answer: "on", tip: "Sobre una superficie: on." },
    { type: "mc", prompt: "My grandparents live ___ a small village.", options: ["in", "on", "at", "to"], answer: "in", tip: "Pueblos y ciudades: in." },
    { type: "mc", prompt: "The lesson begins ___ 9 o'clock.", options: ["at", "on", "in", "to"], answer: "at", tip: "Horas exactas: at." },
    { type: "mc", prompt: "We don't work ___ Sundays.", options: ["on", "at", "in", "to"], answer: "on", tip: "Días de la semana: on." },
    { type: "fill", prompt: "My parents were born ___ the 1980s.", answers: ["in"], tip: "Décadas: in." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "children", "are", "in", "the", "classroom"] }
  ],

  simplePresent: [
    { type: "mc", prompt: "She ___ (work) in a bank.", options: ["works", "work", "working", "worked"], answer: "works", tip: "He/She/It + verbo con -s." },
    { type: "mc", prompt: "They ___ (not/like) coffee.", options: ["don't like", "doesn't like", "not like", "isn't like"], answer: "don't like", tip: "They + don't + verbo base." },
    { type: "fill", prompt: "He ___ (go) to school every day.", answers: ["goes"], tip: "Go -> goes con He/She/It." },
    { type: "fill", prompt: "I ___ (not/eat) meat.", answers: ["don't eat"], tip: "I + don't + verbo base." },
    { type: "mc", prompt: "My dog ___ (bark) at night.", options: ["barks", "bark", "barking", "barked"], answer: "barks", tip: "It + verbo con -s." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "plays", "tennis", "every", "Sunday"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["He", "doesn't", "smoke"] },
    { type: "mc", prompt: "___ you like pizza?", options: ["Do", "Does", "Are", "Is"], answer: "Do", tip: "You + Do en preguntas." },
    { type: "mc", prompt: "___ she speak English?", options: ["Does", "Do", "Is", "Are"], answer: "Does", tip: "She + Does en preguntas." },
    { type: "fill", prompt: "What time ___ the store open?", answers: ["does"], tip: "The store (it) + does." },
    { type: "mc", prompt: "Where ___ you live?", options: ["do", "does", "are", "is"], answer: "do", tip: "You + do en preguntas." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Where", "does", "he", "work"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Do", "you", "like", "dogs"] },
    { type: "fill", prompt: "My parents ___ (watch) TV every night.", answers: ["watch"], tip: "They + verbo base sin -s." },
    { type: "mc", prompt: "The train ___ (leave) at 8.", options: ["leaves", "leave", "leaving", "left"], answer: "leaves", tip: "It + verbo con -s." },
    { type: "mc", prompt: "He ___ (study) English every day.", options: ["studies", "study", "studying", "studied"], answer: "studies", tip: "He/She/It + verbo terminado en consonante + y → ies." },
    { type: "mc", prompt: "We ___ (play) soccer after school.", options: ["play", "plays", "playing", "played"], answer: "play", tip: "We + verbo base." },
    { type: "mc", prompt: "She ___ (not/watch) TV in the morning.", options: ["doesn't watch", "don't watch", "not watch", "isn't watch"], answer: "doesn't watch", tip: "She + doesn't + verbo base." },
    { type: "mc", prompt: "I ___ (drink) coffee every morning.", options: ["drink", "drinks", "drinking", "drank"], answer: "drink", tip: "I + verbo base." },
    { type: "mc", prompt: "The baby ___ (cry) a lot.", options: ["cries", "cry", "crying", "cried"], answer: "cries", tip: "Cry → cries con He/She/It." },
    { type: "mc", prompt: "My friends ___ (not/play) basketball.", options: ["don't play", "doesn't play", "not play", "aren't play"], answer: "don't play", tip: "They + don't + verbo base." },
    { type: "mc", prompt: "The teacher ___ (teach) math.", options: ["teaches", "teach", "teaching", "taught"], answer: "teaches", tip: "Teach → teaches con He/She/It." },
    { type: "mc", prompt: "You ___ (read) very fast.", options: ["read", "reads", "reading", "readed"], answer: "read", tip: "You + verbo base." },
    { type: "fill", prompt: "She ___ (study) at the university.", answers: ["studies"], tip: "Study → studies." },
    { type: "fill", prompt: "They ___ (not/work) on Sundays.", answers: ["don't work"], tip: "They + don't + verbo base." },
    { type: "fill", prompt: "My father ___ (drive) to work.", answers: ["drives"], tip: "He + verbo con -s." },
    { type: "fill", prompt: "We ___ (have) breakfast at 7.", answers: ["have"], tip: "We + verbo base." },
    { type: "fill", prompt: "He ___ (not/play) video games.", answers: ["doesn't play"], tip: "He + doesn't + verbo base." },
    { type: "fill", prompt: "The cat ___ (sleep) all day.", answers: ["sleeps"], tip: "It + verbo con -s." },
    { type: "fill", prompt: "I ___ (finish) work at 5 p.m.", answers: ["finish"], tip: "I + verbo base." },
    { type: "fill", prompt: "She ___ (wash) her car every Saturday.", answers: ["washes"], tip: "Wash → washes." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["He", "gets", "up", "early"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["They", "eat", "breakfast", "together"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "studies", "English", "every", "day"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "visit", "our", "grandparents", "every", "month"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "baby", "cries", "at", "night"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["She", "doesn't", "drive"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["They", "don't", "eat", "meat"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["I", "don't", "watch", "TV"] },
    { type: "mc", prompt: "___ he play soccer?", options: ["Does", "Do", "Is", "Are"], answer: "Does", tip: "He + Does en preguntas." },
    { type: "mc", prompt: "___ they study English?", options: ["Do", "Does", "Are", "Is"], answer: "Do", tip: "They + Do en preguntas." },
    { type: "mc", prompt: "___ your brother work here?", options: ["Does", "Do", "Is", "Are"], answer: "Does", tip: "Brother (he) + Does." },
    { type: "mc", prompt: "___ we need tickets?", options: ["Do", "Does", "Are", "Is"], answer: "Do", tip: "We + Do." },
    { type: "mc", prompt: "___ your parents live nearby?", options: ["Do", "Does", "Are", "Is"], answer: "Do", tip: "Parents (they) + Do." },
    { type: "mc", prompt: "___ she walk to school?", options: ["Does", "Do", "Is", "Are"], answer: "Does", tip: "She + Does." },
    { type: "mc", prompt: "___ I need a password?", options: ["Do", "Does", "Am", "Is"], answer: "Do", tip: "I + Do." },
    { type: "fill", prompt: "Where ___ she live?", answers: ["does"], tip: "She + does." },
    { type: "fill", prompt: "Why ___ they study English?", answers: ["do"], tip: "They + do." },
    { type: "fill", prompt: "When ___ he finish work?", answers: ["does"], tip: "He + does." },
    { type: "fill", prompt: "How often ___ you exercise?", answers: ["do"], tip: "You + do." },
    { type: "fill", prompt: "What ___ your mother cook on Sundays?", answers: ["does"], tip: "Mother (she) + does." },
    { type: "mc", prompt: "My sister ___ (cook) dinner every night.", options: ["cooks", "cook", "cooking", "cooked"], answer: "cooks", tip: "She + verbo con -s." },
    { type: "mc", prompt: "Birds ___ (fly) in the sky.", options: ["fly", "flies", "flying", "flew"], answer: "fly", tip: "Plural + verbo base." },
    { type: "mc", prompt: "He ___ (not/go) to the gym.", options: ["doesn't go", "don't go", "not go", "isn't go"], answer: "doesn't go", tip: "He + doesn't + verbo base." },
    { type: "mc", prompt: "The bus ___ (stop) here every morning.", options: ["stops", "stop", "stopping", "stopped"], answer: "stops", tip: "It + verbo con -s." },
    { type: "mc", prompt: "Children ___ (love) ice cream.", options: ["love", "loves", "loving", "loved"], answer: "love", tip: "Plural + verbo base." },
    { type: "fill", prompt: "My uncle ___ (fix) cars.", answers: ["fixes"], tip: "Fix → fixes." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Does", "she", "work", "here"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Do", "they", "play", "tennis"] }
  ],

  presentContinuous: [
    { type: "mc", prompt: "I ___ (study) right now.", options: ["am studying", "is studying", "studying", "study"], answer: "am studying", tip: "I + am + verbo-ing." },
    { type: "mc", prompt: "She ___ (not/work) today.", options: ["isn't working", "aren't working", "doesn't working", "not working"], answer: "isn't working", tip: "She + isn't + verbo-ing." },
    { type: "fill", prompt: "They ___ (play) soccer at the moment.", answers: ["are playing"], tip: "They + are + verbo-ing." },
    { type: "fill", prompt: "We ___ (not/watch) TV now.", answers: ["aren't watching", "are not watching"], tip: "We + aren't + verbo-ing." },
    { type: "mc", prompt: "He ___ (cook) dinner.", options: ["is cooking", "are cooking", "cooking", "cooks"], answer: "is cooking", tip: "He + is + verbo-ing." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["It", "is", "raining"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["They", "are", "not", "studying"] },
    { type: "mc", prompt: "___ you listening to me?", options: ["Are", "Is", "Do", "Does"], answer: "Are", tip: "You + Are en preguntas." },
    { type: "mc", prompt: "___ he sleeping?", options: ["Is", "Are", "Does", "Do"], answer: "Is", tip: "He + Is en preguntas." },
    { type: "fill", prompt: "What ___ you doing?", answers: ["are"], tip: "You + are en preguntas de información." },
    { type: "mc", prompt: "Why ___ she crying?", options: ["is", "are", "does", "do"], answer: "is", tip: "She + is en preguntas de información." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["What", "are", "you", "doing"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Is", "he", "working"] },
    { type: "fill", prompt: "Look! The baby ___ (laugh).", answers: ["is laughing"], tip: "The baby (it) + is + verbo-ing." },
    { type: "mc", prompt: "Right now, I ___ (write) an email.", options: ["am writing", "is writing", "write", "writes"], answer: "am writing", tip: "I + am + verbo-ing." },
    { type: "mc", prompt: "We ___ (have) lunch right now.", options: ["are having", "is having", "have", "having"], answer: "are having", tip: "We + are + verbo-ing." },
    { type: "mc", prompt: "They ___ (not/sleep) at the moment.", options: ["aren't sleeping", "isn't sleeping", "don't sleeping", "not sleeping"], answer: "aren't sleeping", tip: "They + aren't + verbo-ing." },
    { type: "mc", prompt: "The dog ___ (run) in the park.", options: ["is running", "are running", "runs", "running"], answer: "is running", tip: "It + is + verbo-ing." },
    { type: "mc", prompt: "You ___ (read) a very interesting book.", options: ["are reading", "is reading", "read", "reading"], answer: "are reading", tip: "You + are + verbo-ing." },
    { type: "mc", prompt: "My parents ___ (travel) this week.", options: ["are traveling", "is traveling", "travel", "traveling"], answer: "are traveling", tip: "They + are + verbo-ing." },
    { type: "mc", prompt: "She ___ (drink) coffee now.", options: ["is drinking", "are drinking", "drinks", "drinking"], answer: "is drinking", tip: "She + is + verbo-ing." },
    { type: "mc", prompt: "I ___ (not/use) my phone now.", options: ["am not using", "isn't using", "aren't using", "don't using"], answer: "am not using", tip: "I + am not + verbo-ing." },
    { type: "mc", prompt: "The students ___ (take) an exam.", options: ["are taking", "is taking", "take", "taking"], answer: "are taking", tip: "Plural + are + verbo-ing." },
    { type: "fill", prompt: "She ___ (study) for her exam.", answers: ["is studying"], tip: "She + is + verbo-ing." },
    { type: "fill", prompt: "I ___ (eat) dinner now.", answers: ["am eating"], tip: "I + am + verbo-ing." },
    { type: "fill", prompt: "They ___ (not/play) basketball.", answers: ["aren't playing", "are not playing"], tip: "They + aren't + verbo-ing." },
    { type: "fill", prompt: "The children ___ (swim) in the pool.", answers: ["are swimming"], tip: "They + are + verbo-ing." },
    { type: "fill", prompt: "He ___ (not/watch) TV.", answers: ["isn't watching", "is not watching"], tip: "He + isn't + verbo-ing." },
    { type: "fill", prompt: "We ___ (wait) for the bus.", answers: ["are waiting"], tip: "We + are + verbo-ing." },
    { type: "fill", prompt: "The teacher ___ (talk) to the students.", answers: ["is talking"], tip: "The teacher + is + verbo-ing." },
    { type: "fill", prompt: "It ___ (snow) outside.", answers: ["is snowing"], tip: "It + is + verbo-ing." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "is", "reading", "a", "book"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "are", "having", "dinner"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "cat", "is", "sleeping"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["They", "are", "playing", "outside"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "am", "learning", "English"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["He", "is", "not", "driving"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["We", "are", "not", "working"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["She", "is", "not", "sleeping"] },
    { type: "mc", prompt: "___ they studying now?", options: ["Are", "Is", "Do", "Does"], answer: "Are", tip: "They + Are en preguntas." },
    { type: "mc", prompt: "___ she wearing a jacket?", options: ["Is", "Are", "Does", "Do"], answer: "Is", tip: "She + Is en preguntas." },
    { type: "mc", prompt: "___ we leaving now?", options: ["Are", "Is", "Do", "Does"], answer: "Are", tip: "We + Are en preguntas." },
    { type: "mc", prompt: "___ it raining outside?", options: ["Is", "Are", "Do", "Does"], answer: "Is", tip: "It + Is en preguntas." },
    { type: "mc", prompt: "___ I speaking too fast?", options: ["Am", "Are", "Is", "Do"], answer: "Am", tip: "I + Am en preguntas." },
    { type: "mc", prompt: "___ the children playing?", options: ["Are", "Is", "Do", "Does"], answer: "Are", tip: "Plural + Are." },
    { type: "mc", prompt: "___ your brother studying?", options: ["Is", "Are", "Does", "Do"], answer: "Is", tip: "Brother (he) + Is." },
    { type: "fill", prompt: "Where ___ they going?", answers: ["are"], tip: "They + are." },
    { type: "fill", prompt: "Why ___ he smiling?", answers: ["is"], tip: "He + is." },
    { type: "fill", prompt: "Who ___ talking?", answers: ["is"], tip: "Who (singular) + is." },
    { type: "fill", prompt: "What ___ she looking at?", answers: ["is"], tip: "She + is." },
    { type: "fill", prompt: "When ___ we leaving?", answers: ["are"], tip: "We + are." },
    { type: "mc", prompt: "Listen! Someone ___ (knock) at the door.", options: ["is knocking", "are knocking", "knocks", "knocking"], answer: "is knocking", tip: "Acción que ocurre ahora." },
    { type: "mc", prompt: "Right now, they ___ (clean) the classroom.", options: ["are cleaning", "is cleaning", "clean", "cleaning"], answer: "are cleaning", tip: "They + are + verbo-ing." },
    { type: "mc", prompt: "Look! The birds ___ (fly) away.", options: ["are flying", "is flying", "fly", "flies"], answer: "are flying", tip: "Plural + are + verbo-ing." },
    { type: "mc", prompt: "My sister ___ (write) a message.", options: ["is writing", "are writing", "writes", "writing"], answer: "is writing", tip: "She + is + verbo-ing." },
    { type: "mc", prompt: "We ___ (not/listen) to music.", options: ["aren't listening", "isn't listening", "don't listening", "not listening"], answer: "aren't listening", tip: "We + aren't + verbo-ing." },
    { type: "fill", prompt: "The baby ___ (cry) because it is hungry.", answers: ["is crying"], tip: "The baby + is + verbo-ing." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Are", "they", "waiting", "for", "us"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Is", "she", "cooking", "dinner"] }
  ],

  simplePast: [
    { type: "mc", prompt: "She ___ (visit) her grandma yesterday.", options: ["visited", "visits", "visiting", "visit"], answer: "visited", tip: "Verbo regular + ed." },
    { type: "mc", prompt: "They ___ (go) to the beach last week.", options: ["went", "goed", "go", "gone"], answer: "went", tip: "Go es irregular: go -> went." },
    { type: "fill", prompt: "He ___ (not/call) me.", answers: ["didn't call", "did not call"], tip: "Negativo: didn't + verbo base." },
    { type: "fill", prompt: "We ___ (eat) pizza last night.", answers: ["ate"], tip: "Eat es irregular: eat -> ate." },
    { type: "mc", prompt: "I ___ (see) that movie last year.", options: ["saw", "seen", "see", "seed"], answer: "saw", tip: "See es irregular: see -> saw." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "finished", "the", "project"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["I", "didn't", "sleep", "well"] },
    { type: "mc", prompt: "___ you finish your homework?", options: ["Did", "Do", "Does", "Were"], answer: "Did", tip: "Preguntas en pasado: Did + sujeto + verbo base." },
    { type: "mc", prompt: "___ she arrive on time?", options: ["Did", "Was", "Does", "Do"], answer: "Did", tip: "Preguntas en pasado: Did." },
    { type: "fill", prompt: "Where ___ you go last summer?", answers: ["did"], tip: "Preguntas de información en pasado: did." },
    { type: "mc", prompt: "What time ___ the movie start?", options: ["did", "does", "was", "is"], answer: "did", tip: "Preguntas de información en pasado: did." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Where", "did", "you", "go"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Did", "they", "arrive", "late"] },
    { type: "fill", prompt: "He ___ (buy) a new car.", answers: ["bought"], tip: "Buy es irregular: buy -> bought." },
    { type: "mc", prompt: "We ___ (not/have) time yesterday.", options: ["didn't have", "don't have", "hasn't have", "not had"], answer: "didn't have", tip: "Negativo en pasado: didn't + verbo base." },
    { type: "mc", prompt: "He ___ (play) soccer yesterday.", options: ["played", "plays", "play", "playing"], answer: "played", tip: "Verbo regular + ed." },
    { type: "mc", prompt: "She ___ (write) a letter last night.", options: ["wrote", "written", "write", "writes"], answer: "wrote", tip: "Write es irregular: write -> wrote." },
    { type: "mc", prompt: "They ___ (not/watch) TV yesterday.", options: ["didn't watch", "don't watch", "doesn't watch", "not watched"], answer: "didn't watch", tip: "Didn't + verbo base." },
    { type: "mc", prompt: "My father ___ (drive) to work yesterday.", options: ["drove", "drived", "drive", "driven"], answer: "drove", tip: "Drive es irregular: drive -> drove." },
    { type: "mc", prompt: "We ___ (study) for the exam.", options: ["studied", "study", "studies", "studying"], answer: "studied", tip: "Study -> studied." },
    { type: "mc", prompt: "The baby ___ (sleep) all night.", options: ["slept", "sleeped", "sleep", "sleeping"], answer: "slept", tip: "Sleep es irregular: sleep -> slept." },
    { type: "mc", prompt: "I ___ (drink) two cups of coffee.", options: ["drank", "drinked", "drink", "drunk"], answer: "drank", tip: "Drink es irregular: drink -> drank." },
    { type: "mc", prompt: "She ___ (clean) her room yesterday.", options: ["cleaned", "clean", "cleans", "cleaning"], answer: "cleaned", tip: "Verbo regular + ed." },
    { type: "fill", prompt: "They ___ (leave) early.", answers: ["left"], tip: "Leave -> left." },
    { type: "fill", prompt: "I ___ (not/see) him yesterday.", answers: ["didn't see", "did not see"], tip: "Didn't + verbo base." },
    { type: "fill", prompt: "She ___ (make) a cake.", answers: ["made"], tip: "Make -> made." },
    { type: "fill", prompt: "We ___ (travel) to Cusco last year.", answers: ["traveled", "travelled"], tip: "Travel + ed." },
    { type: "fill", prompt: "He ___ (find) his keys.", answers: ["found"], tip: "Find -> found." },
    { type: "fill", prompt: "My sister ___ (not/go) to school.", answers: ["didn't go", "did not go"], tip: "Didn't + verbo base." },
    { type: "fill", prompt: "The dog ___ (run) very fast.", answers: ["ran"], tip: "Run -> ran." },
    { type: "fill", prompt: "She ___ (cook) dinner yesterday.", answers: ["cooked"], tip: "Cook + ed." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["He", "washed", "his", "car"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["They", "went", "to", "the", "museum"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "met", "my", "friends"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "read", "a", "book"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "watched", "a", "movie"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["They", "didn't", "eat", "breakfast"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["She", "didn't", "study"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["He", "didn't", "drive", "home"] },
    { type: "mc", prompt: "___ they visit their grandparents?", options: ["Did", "Do", "Does", "Were"], answer: "Did", tip: "Preguntas en pasado: Did." },
    { type: "mc", prompt: "___ he buy a new phone?", options: ["Did", "Was", "Does", "Do"], answer: "Did", tip: "Did + verbo base." },
    { type: "mc", prompt: "___ you enjoy the party?", options: ["Did", "Do", "Does", "Are"], answer: "Did", tip: "Did + verbo base." },
    { type: "mc", prompt: "___ she call you yesterday?", options: ["Did", "Does", "Was", "Is"], answer: "Did", tip: "Preguntas en pasado." },
    { type: "mc", prompt: "___ your parents arrive early?", options: ["Did", "Do", "Does", "Were"], answer: "Did", tip: "Parents + Did." },
    { type: "mc", prompt: "___ the train leave on time?", options: ["Did", "Does", "Was", "Is"], answer: "Did", tip: "Did + verbo base." },
    { type: "mc", prompt: "___ we win the game?", options: ["Did", "Do", "Does", "Were"], answer: "Did", tip: "We + Did." },
    { type: "fill", prompt: "When ___ they arrive?", answers: ["did"], tip: "Preguntas de información: did." },
    { type: "fill", prompt: "Why ___ she leave early?", answers: ["did"], tip: "Why + did." },
    { type: "fill", prompt: "Who ___ you meet yesterday?", answers: ["did"], tip: "Who + did." },
    { type: "fill", prompt: "What ___ he say?", answers: ["did"], tip: "Did + verbo base." },
    { type: "fill", prompt: "How ___ you get home?", answers: ["did"], tip: "Did + verbo base." },
    { type: "mc", prompt: "My brother ___ (lose) his wallet.", options: ["lost", "losed", "lose", "losing"], answer: "lost", tip: "Lose -> lost." },
    { type: "mc", prompt: "The students ___ (finish) the test early.", options: ["finished", "finish", "finishes", "finishing"], answer: "finished", tip: "Finish + ed." },
    { type: "mc", prompt: "She ___ (take) the bus to work.", options: ["took", "taken", "take", "takes"], answer: "took", tip: "Take -> took." },
    { type: "mc", prompt: "I ___ (not/understand) the question.", options: ["didn't understand", "don't understand", "doesn't understand", "not understood"], answer: "didn't understand", tip: "Didn't + verbo base." },
    { type: "mc", prompt: "They ___ (sing) beautifully.", options: ["sang", "singed", "sing", "sung"], answer: "sang", tip: "Sing -> sang." },
    { type: "fill", prompt: "We ___ (win) the match.", answers: ["won"], tip: "Win -> won." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Did", "he", "call", "you"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Where", "did", "they", "stay"] }
  ],

  simpleFuture: [
    { type: "mc", prompt: "I ___ (call) you tomorrow.", options: ["will call", "will calls", "calling", "call"], answer: "will call", tip: "Will + verbo base." },
    { type: "mc", prompt: "She ___ (not/come) to the party.", options: ["won't come", "not will come", "doesn't come", "isn't come"], answer: "won't come", tip: "Won't (will not) + verbo base." },
    { type: "fill", prompt: "They ___ (travel) next month.", answers: ["will travel"], tip: "Will + verbo base." },
    { type: "fill", prompt: "We ___ (not/be) late.", answers: ["won't be"], tip: "Won't + verbo base." },
    { type: "mc", prompt: "He ___ (help) you with that.", options: ["will help", "helps", "is help", "will helps"], answer: "will help", tip: "Will + verbo base." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["It", "will", "rain", "tomorrow"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["I", "won't", "forget"] },
    { type: "mc", prompt: "___ you help me?", options: ["Will", "Do", "Are", "Did"], answer: "Will", tip: "Preguntas de futuro: Will + sujeto." },
    { type: "mc", prompt: "___ she come tomorrow?", options: ["Will", "Does", "Is", "Did"], answer: "Will", tip: "Preguntas de futuro: Will." },
    { type: "fill", prompt: "What ___ you do this weekend?", answers: ["will"], tip: "Preguntas de información en futuro: will." },
    { type: "mc", prompt: "Where ___ they live next year?", options: ["will", "do", "are", "did"], answer: "will", tip: "Preguntas de futuro: will." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["What", "will", "you", "do"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Will", "it", "snow"] },
    { type: "fill", prompt: "I think she ___ (win) the race.", answers: ["will win"], tip: "Will + verbo base para predicciones." },
    { type: "mc", prompt: "We ___ (not/miss) the flight.", options: ["won't miss", "will not misses", "doesn't miss", "aren't miss"], answer: "won't miss", tip: "Won't + verbo base." },
    { type: "mc", prompt: "They ___ (buy) a new house next year.", options: ["will buy", "will buys", "buying", "buy"], answer: "will buy", tip: "Will + verbo base." },
    { type: "mc", prompt: "He ___ (not/forget) your birthday.", options: ["won't forget", "not will forget", "doesn't forget", "isn't forget"], answer: "won't forget", tip: "Won't + verbo base." },
    { type: "mc", prompt: "I ___ (finish) my homework tonight.", options: ["will finish", "finish", "will finishes", "finishing"], answer: "will finish", tip: "Will + verbo base." },
    { type: "mc", prompt: "She ___ (visit) her grandparents next weekend.", options: ["will visit", "visits", "will visiting", "visit"], answer: "will visit", tip: "Will + verbo base." },
    { type: "mc", prompt: "The team ___ (win) the match.", options: ["will win", "wins", "winning", "will wins"], answer: "will win", tip: "Will + verbo base." },
    { type: "mc", prompt: "We ___ (not/stay) at that hotel.", options: ["won't stay", "not will stay", "don't stay", "aren't stay"], answer: "won't stay", tip: "Won't + verbo base." },
    { type: "mc", prompt: "It ___ (be) sunny tomorrow.", options: ["will be", "is", "will is", "be"], answer: "will be", tip: "Will + verbo base." },
    { type: "mc", prompt: "My parents ___ (arrive) this evening.", options: ["will arrive", "arrives", "arriving", "will arrives"], answer: "will arrive", tip: "Will + verbo base." },
    { type: "fill", prompt: "She ___ (study) tonight.", answers: ["will study"], tip: "Will + verbo base." },
    { type: "fill", prompt: "They ___ (not/play) tomorrow.", answers: ["won't play", "will not play"], tip: "Won't + verbo base." },
    { type: "fill", prompt: "I ___ (see) you later.", answers: ["will see"], tip: "Will + verbo base." },
    { type: "fill", prompt: "He ___ (not/work) next Monday.", answers: ["won't work", "will not work"], tip: "Won't + verbo base." },
    { type: "fill", prompt: "We ___ (have) dinner at 8.", answers: ["will have"], tip: "Will + verbo base." },
    { type: "fill", prompt: "The bus ___ (leave) at 7 a.m.", answers: ["will leave"], tip: "Will + verbo base." },
    { type: "fill", prompt: "She ___ (not/tell) anyone.", answers: ["won't tell", "will not tell"], tip: "Won't + verbo base." },
    { type: "fill", prompt: "They ___ (meet) us after work.", answers: ["will meet"], tip: "Will + verbo base." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "will", "study", "tonight"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["They", "will", "arrive", "soon"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "will", "travel", "next", "month"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["He", "will", "call", "you"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "movie", "will", "start", "at", "eight"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["She", "won't", "agree"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["They", "won't", "be", "late"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["We", "won't", "wait"] },
    { type: "mc", prompt: "___ they come with us?", options: ["Will", "Do", "Are", "Did"], answer: "Will", tip: "Preguntas de futuro: Will." },
    { type: "mc", prompt: "___ he call you later?", options: ["Will", "Does", "Is", "Did"], answer: "Will", tip: "Will + sujeto + verbo base." },
    { type: "mc", prompt: "___ we have enough time?", options: ["Will", "Do", "Are", "Did"], answer: "Will", tip: "Will + sujeto." },
    { type: "mc", prompt: "___ your parents travel next month?", options: ["Will", "Do", "Are", "Did"], answer: "Will", tip: "Will + sujeto." },
    { type: "mc", prompt: "___ it be cold tomorrow?", options: ["Will", "Is", "Does", "Did"], answer: "Will", tip: "Will + be." },
    { type: "mc", prompt: "___ she help us?", options: ["Will", "Does", "Is", "Did"], answer: "Will", tip: "Will + verbo base." },
    { type: "mc", prompt: "___ I need a jacket?", options: ["Will", "Do", "Am", "Did"], answer: "Will", tip: "Will + sujeto." },
    { type: "fill", prompt: "When ___ they arrive?", answers: ["will"], tip: "Preguntas de información: will." },
    { type: "fill", prompt: "Why ___ he leave early?", answers: ["will"], tip: "Why + will." },
    { type: "fill", prompt: "Who ___ help us?", answers: ["will"], tip: "Who + will." },
    { type: "fill", prompt: "How ___ you travel there?", answers: ["will"], tip: "How + will." },
    { type: "fill", prompt: "Where ___ she stay?", answers: ["will"], tip: "Where + will." },
    { type: "mc", prompt: "I think it ___ (rain) this afternoon.", options: ["will rain", "rains", "raining", "will rains"], answer: "will rain", tip: "Will para predicciones." },
    { type: "mc", prompt: "The children ___ (enjoy) the trip.", options: ["will enjoy", "enjoy", "enjoying", "will enjoys"], answer: "will enjoy", tip: "Will + verbo base." },
    { type: "mc", prompt: "She ___ (not/accept) the offer.", options: ["won't accept", "not will accept", "doesn't accept", "isn't accept"], answer: "won't accept", tip: "Won't + verbo base." },
    { type: "mc", prompt: "My brother ___ (become) a doctor.", options: ["will become", "becomes", "becoming", "will becomes"], answer: "will become", tip: "Will + verbo base." },
    { type: "mc", prompt: "You ___ (love) this movie.", options: ["will love", "love", "loving", "will loves"], answer: "will love", tip: "Will + verbo base." },
    { type: "fill", prompt: "We ___ (win) the game.", answers: ["will win"], tip: "Will + verbo base." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Will", "you", "join", "us"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Where", "will", "they", "stay"] }
  ],

  presentPerfect: [
    { type: "mc", prompt: "I ___ (finish) my homework.", options: ["have finished", "has finished", "finished", "am finished"], answer: "have finished", tip: "I + have + participio." },
    { type: "mc", prompt: "She ___ (see) that movie.", options: ["has seen", "have seen", "saw", "is seen"], answer: "has seen", tip: "She + has + participio." },
    { type: "fill", prompt: "They ___ (not/arrive) yet.", answers: ["haven't arrived", "have not arrived"], tip: "They + haven't + participio." },
    { type: "fill", prompt: "He ___ (already/eat).", answers: ["has already eaten"], tip: "He + has + already + participio." },
    { type: "mc", prompt: "We ___ (never/be) to Japan.", options: ["have never been", "has never been", "never were", "are never been"], answer: "have never been", tip: "We + have + never + participio." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "have", "finished", "the", "report"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["She", "hasn't", "called", "yet"] },
    { type: "mc", prompt: "___ you ever visited Peru?", options: ["Have", "Has", "Did", "Do"], answer: "Have", tip: "Preguntas: Have + you." },
    { type: "mc", prompt: "___ he finished his work?", options: ["Has", "Have", "Did", "Does"], answer: "Has", tip: "Preguntas: Has + he." },
    { type: "fill", prompt: "How long ___ you lived here?", answers: ["have"], tip: "Preguntas de información: have." },
    { type: "mc", prompt: "What ___ she done today?", options: ["has", "have", "did", "is"], answer: "has", tip: "Preguntas de información: has." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["How", "long", "have", "you", "studied", "English"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Has", "he", "already", "left"] },
    { type: "fill", prompt: "They ___ (just/land).", answers: ["have just landed"], tip: "They + have + just + participio." },
    { type: "mc", prompt: "I ___ (not/see) him since Monday.", options: ["haven't seen", "hasn't seen", "didn't see", "don't seen"], answer: "haven't seen", tip: "I + haven't + participio." },
    { type: "mc", prompt: "She ___ (already/finish) her project.", options: ["has already finished", "have already finished", "already finished", "is already finished"], answer: "has already finished", tip: "She + has + already + participio." },
    { type: "mc", prompt: "They ___ (visit) Paris twice.", options: ["have visited", "has visited", "visited", "are visiting"], answer: "have visited", tip: "They + have + participio." },
    { type: "mc", prompt: "He ___ (not/do) his homework yet.", options: ["hasn't done", "haven't done", "didn't do", "doesn't do"], answer: "hasn't done", tip: "He + hasn't + participio." },
    { type: "mc", prompt: "We ___ (lose) our keys.", options: ["have lost", "has lost", "lost", "are losing"], answer: "have lost", tip: "We + have + participio." },
    { type: "mc", prompt: "My brother ___ (break) his phone.", options: ["has broken", "have broken", "broke", "is broken"], answer: "has broken", tip: "He + has + participio." },
    { type: "mc", prompt: "I ___ (never/try) sushi.", options: ["have never tried", "has never tried", "never tried", "am never tried"], answer: "have never tried", tip: "I + have + never + participio." },
    { type: "mc", prompt: "She ___ (write) three emails today.", options: ["has written", "have written", "wrote", "writes"], answer: "has written", tip: "She + has + participio." },
    { type: "mc", prompt: "They ___ (not/finish) the game.", options: ["haven't finished", "hasn't finished", "didn't finish", "don't finish"], answer: "haven't finished", tip: "They + haven't + participio." },
    { type: "fill", prompt: "I ___ (just/arrive) home.", answers: ["have just arrived"], tip: "I + have + just + participio." },
    { type: "fill", prompt: "She ___ (not/call) me yet.", answers: ["hasn't called", "has not called"], tip: "She + hasn't + participio." },
    { type: "fill", prompt: "We ___ (live) here for five years.", answers: ["have lived"], tip: "We + have + participio." },
    { type: "fill", prompt: "He ___ (already/take) the test.", answers: ["has already taken"], tip: "He + has + already + participio." },
    { type: "fill", prompt: "They ___ (not/finish) their lunch.", answers: ["haven't finished", "have not finished"], tip: "They + haven't + participio." },
    { type: "fill", prompt: "My parents ___ (buy) a new car.", answers: ["have bought"], tip: "They + have + participio." },
    { type: "fill", prompt: "She ___ (just/leave).", answers: ["has just left"], tip: "She + has + just + participio." },
    { type: "fill", prompt: "I ___ (read) that book before.", answers: ["have read"], tip: "I + have + participio." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "has", "already", "finished", "her", "homework"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "have", "visited", "that", "museum"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["They", "have", "just", "arrived"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["He", "has", "lost", "his", "wallet"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "have", "never", "flown", "in", "a", "helicopter"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["She", "hasn't", "finished", "yet"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["We", "haven't", "seen", "that", "movie"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["He", "hasn't", "called", "me"] },
    { type: "mc", prompt: "___ they ever traveled abroad?", options: ["Have", "Has", "Did", "Do"], answer: "Have", tip: "Have + they + participio." },
    { type: "mc", prompt: "___ she already finished?", options: ["Has", "Have", "Did", "Does"], answer: "Has", tip: "Has + she + participio." },
    { type: "mc", prompt: "___ you seen this movie before?", options: ["Have", "Has", "Did", "Do"], answer: "Have", tip: "Have + you + participio." },
    { type: "mc", prompt: "___ he ever eaten sushi?", options: ["Has", "Have", "Did", "Does"], answer: "Has", tip: "Has + he + participio." },
    { type: "mc", prompt: "___ your parents arrived?", options: ["Have", "Has", "Did", "Do"], answer: "Have", tip: "Parents (they) + Have." },
    { type: "mc", prompt: "___ it stopped raining?", options: ["Has", "Have", "Did", "Is"], answer: "Has", tip: "It + Has." },
    { type: "mc", prompt: "___ we met before?", options: ["Have", "Has", "Did", "Do"], answer: "Have", tip: "We + Have." },
    { type: "fill", prompt: "Where ___ she gone?", answers: ["has"], tip: "She + has." },
    { type: "fill", prompt: "Why ___ they left early?", answers: ["have"], tip: "They + have." },
    { type: "fill", prompt: "How many books ___ you read this month?", answers: ["have"], tip: "You + have." },
    { type: "fill", prompt: "How long ___ he worked here?", answers: ["has"], tip: "He + has." },
    { type: "fill", prompt: "What ___ they learned today?", answers: ["have"], tip: "They + have." },
    { type: "mc", prompt: "I ___ (forget) my password.", options: ["have forgotten", "has forgotten", "forgot", "forget"], answer: "have forgotten", tip: "I + have + participio." },
    { type: "mc", prompt: "She ___ (find) her glasses.", options: ["has found", "have found", "found", "finds"], answer: "has found", tip: "She + has + participio." },
    { type: "mc", prompt: "They ___ (not/meet) our teacher yet.", options: ["haven't met", "hasn't met", "didn't meet", "don't meet"], answer: "haven't met", tip: "They + haven't + participio." },
    { type: "mc", prompt: "We ___ (make) a big mistake.", options: ["have made", "has made", "made", "make"], answer: "have made", tip: "We + have + participio." },
    { type: "mc", prompt: "He ___ (be) sick since Monday.", options: ["has been", "have been", "was", "is"], answer: "has been", tip: "He + has been." },
    { type: "fill", prompt: "They ___ (win) three games this season.", answers: ["have won"], tip: "They + have + participio." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Have", "you", "finished", "your", "homework"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Has", "she", "ever", "been", "to", "Canada"] }
  ],

  passive: [
    { type: "mc", prompt: "English ___ (speak) in many countries.", options: ["is spoken", "speaks", "is speaking", "was spoken"], answer: "is spoken", tip: "Sujeto + is/are + participio." },
    { type: "mc", prompt: "The letters ___ (send) every day.", options: ["are sent", "is sent", "send", "sends"], answer: "are sent", tip: "Sujeto plural + are + participio." },
    { type: "fill", prompt: "This car ___ (make) in Japan.", answers: ["is made"], tip: "Sujeto singular + is + participio." },
    { type: "fill", prompt: "The windows ___ (not/clean) often.", answers: ["aren't cleaned", "are not cleaned"], tip: "Negativo: aren't + participio." },
    { type: "mc", prompt: "Rice ___ (grow) in Asia.", options: ["is grown", "grows", "is growing", "grew"], answer: "is grown", tip: "Sujeto + is + participio." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "office", "is", "cleaned", "every", "day"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["Plastic", "isn't", "recycled", "here"] },
    { type: "mc", prompt: "___ this book written in English?", options: ["Is", "Does", "Do", "Are"], answer: "Is", tip: "Preguntas: Is + sujeto singular." },
    { type: "mc", prompt: "___ the cars washed here?", options: ["Are", "Is", "Do", "Does"], answer: "Are", tip: "Preguntas: Are + sujeto plural." },
    { type: "fill", prompt: "Where ___ these products made?", answers: ["are"], tip: "Preguntas de información: are." },
    { type: "mc", prompt: "What language ___ spoken in Brazil?", options: ["is", "are", "does", "do"], answer: "is", tip: "Preguntas de información: is." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["How", "is", "cheese", "made"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Are", "the", "packages", "delivered", "here"] },
    { type: "fill", prompt: "Coffee ___ (export) from Colombia.", answers: ["is exported"], tip: "Sujeto + is + participio." },
    { type: "mc", prompt: "These shoes ___ (not/sell) online.", options: ["aren't sold", "isn't sold", "don't sold", "not sold"], answer: "aren't sold", tip: "Negativo plural: aren't + participio." },
    { type: "mc", prompt: "The food ___ (prepare) every morning.", options: ["is prepared", "prepares", "is preparing", "was prepared"], answer: "is prepared", tip: "Sujeto singular + is + participio." },
    { type: "mc", prompt: "These computers ___ (use) in schools.", options: ["are used", "is used", "use", "uses"], answer: "are used", tip: "Sujeto plural + are + participio." },
    { type: "mc", prompt: "Milk ___ (produce) on this farm.", options: ["is produced", "produces", "is producing", "produced"], answer: "is produced", tip: "Sujeto singular + is + participio." },
    { type: "mc", prompt: "The rooms ___ (clean) every day.", options: ["are cleaned", "is cleaned", "clean", "cleaned"], answer: "are cleaned", tip: "Sujeto plural + are + participio." },
    { type: "mc", prompt: "The newspaper ___ (print) every morning.", options: ["is printed", "prints", "is printing", "printed"], answer: "is printed", tip: "Sujeto singular + is + participio." },
    { type: "mc", prompt: "Books ___ (read) by millions of people.", options: ["are read", "is read", "read", "reads"], answer: "are read", tip: "Sujeto plural + are + participio." },
    { type: "mc", prompt: "The classroom ___ (paint) every year.", options: ["is painted", "paints", "is painting", "painted"], answer: "is painted", tip: "Sujeto singular + is + participio." },
    { type: "mc", prompt: "The emails ___ (check) every morning.", options: ["are checked", "is checked", "check", "checks"], answer: "are checked", tip: "Sujeto plural + are + participio." },
    { type: "fill", prompt: "The homework ___ (check) by the teacher.", answers: ["is checked"], tip: "Sujeto singular + is + participio." },
    { type: "fill", prompt: "The doors ___ (lock) every night.", answers: ["are locked"], tip: "Sujeto plural + are + participio." },
    { type: "fill", prompt: "This song ___ (play) on the radio.", answers: ["is played"], tip: "Sujeto singular + is + participio." },
    { type: "fill", prompt: "The dishes ___ (not/wash) by hand.", answers: ["aren't washed", "are not washed"], tip: "Negativo plural: aren't + participio." },
    { type: "fill", prompt: "The report ___ (write) every month.", answers: ["is written"], tip: "Write → written." },
    { type: "fill", prompt: "The cakes ___ (bake) every morning.", answers: ["are baked"], tip: "Sujeto plural + are + participio." },
    { type: "fill", prompt: "The museum ___ (visit) by many tourists.", answers: ["is visited"], tip: "Visit → visited." },
    { type: "fill", prompt: "These toys ___ (make) in China.", answers: ["are made"], tip: "Make → made." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "books", "are", "sold", "online"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "house", "is", "painted", "every", "year"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "floor", "is", "cleaned", "daily"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "students", "are", "taught", "English"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "packages", "are", "delivered", "every", "morning"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["The", "door", "isn't", "opened"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["These", "cars", "aren't", "made", "here"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["The", "room", "isn't", "used"] },
    { type: "mc", prompt: "___ this machine repaired here?", options: ["Is", "Are", "Do", "Does"], answer: "Is", tip: "Sujeto singular + Is." },
    { type: "mc", prompt: "___ these books translated into Spanish?", options: ["Are", "Is", "Do", "Does"], answer: "Are", tip: "Sujeto plural + Are." },
    { type: "mc", prompt: "___ the homework checked every day?", options: ["Is", "Are", "Do", "Does"], answer: "Is", tip: "Homework es singular." },
    { type: "mc", prompt: "___ the classrooms cleaned every afternoon?", options: ["Are", "Is", "Do", "Does"], answer: "Are", tip: "Classrooms es plural." },
    { type: "mc", prompt: "___ the food served at noon?", options: ["Is", "Are", "Do", "Does"], answer: "Is", tip: "Food es singular." },
    { type: "mc", prompt: "___ these products exported?", options: ["Are", "Is", "Do", "Does"], answer: "Are", tip: "Products es plural." },
    { type: "mc", prompt: "___ this movie shown in theaters?", options: ["Is", "Are", "Do", "Does"], answer: "Is", tip: "Movie es singular." },
    { type: "fill", prompt: "Where ___ this wine produced?", answers: ["is"], tip: "Wine es singular." },
    { type: "fill", prompt: "How ___ these computers assembled?", answers: ["are"], tip: "Computers es plural." },
    { type: "fill", prompt: "Why ___ English taught in many schools?", answers: ["is"], tip: "English es singular." },
    { type: "fill", prompt: "When ___ the letters delivered?", answers: ["are"], tip: "Letters es plural." },
    { type: "fill", prompt: "How ___ paper recycled?", answers: ["is"], tip: "Paper es singular." },
    { type: "mc", prompt: "The answers ___ (write) on the board.", options: ["are written", "is written", "write", "writes"], answer: "are written", tip: "Write → written." },
    { type: "mc", prompt: "The meeting ___ (hold) every Monday.", options: ["is held", "holds", "is holding", "held"], answer: "is held", tip: "Hold → held." },
    { type: "mc", prompt: "The tables ___ (not/use) outside.", options: ["aren't used", "isn't used", "don't use", "not used"], answer: "aren't used", tip: "Negativo plural." },
    { type: "mc", prompt: "The uniforms ___ (wear) at school.", options: ["are worn", "is worn", "wear", "wears"], answer: "are worn", tip: "Wear → worn." },
    { type: "mc", prompt: "The building ___ (protect) by security guards.", options: ["is protected", "protects", "is protecting", "protected"], answer: "is protected", tip: "Protect → protected." },
    { type: "fill", prompt: "The invitations ___ (send) by email.", answers: ["are sent"], tip: "Send → sent." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Is", "coffee", "grown", "here"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Are", "these", "documents", "signed"] }
  ],

  quantity: [
    { type: "mc", prompt: "___ a book on the table.", options: ["There is", "There are", "There isn't", "It is"], answer: "There is", tip: "Singular: There is." },
    { type: "mc", prompt: "___ many students in the class.", options: ["There are", "There is", "It is", "They are"], answer: "There are", tip: "Plural: There are." },
    { type: "fill", prompt: "___ an apple in the fridge.", answers: ["there is", "There is"], tip: "Singular: There is." },
    { type: "fill", prompt: "There ___ (not) any milk.", answers: ["isn't"], tip: "Incontable/singular negativo: isn't." },
    { type: "mc", prompt: "Choose the plural of \"child\":", options: ["children", "childs", "childes", "child"], answer: "children", tip: "Plural irregular: child -> children." },
    { type: "mc", prompt: "Choose the plural of \"box\":", options: ["boxes", "boxs", "box", "boxies"], answer: "boxes", tip: "Termina en -x: agregamos -es." },
    { type: "mc", prompt: "Which of these is uncountable?", options: ["water", "book", "car", "apple"], answer: "water", tip: "Water no se puede contar en unidades individuales." },
    { type: "mc", prompt: "How ___ money do you have?", options: ["much", "many", "a", "some"], answer: "much", tip: "Money es incontable: How much." },
    { type: "mc", prompt: "How ___ friends do you have?", options: ["many", "much", "a", "some"], answer: "many", tip: "Friends es contable: How many." },
    { type: "fill", prompt: "There ___ two cats in the garden.", answers: ["are"], tip: "Plural: There are." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["There", "is", "a", "park", "near", "here"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["There", "aren't", "any", "eggs"] },
    { type: "mc", prompt: "There ___ some information I need.", options: ["is", "are", "am", "be"], answer: "is", tip: "Information es incontable: usa is." },
    { type: "mc", prompt: "Choose the correct question for a cake recipe:", options: ["How much sugar do you need?", "How many sugar do you need?", "How much sugars do you need?", "How many sugars do you need?"], answer: "How much sugar do you need?", tip: "Sugar es incontable: How much + sustantivo singular." },
    { type: "mc", prompt: "___ there a pharmacy nearby?", options: ["Is", "Are", "Does", "Do"], answer: "Is", tip: "Singular: Is there...?" },
    { type: "mc", prompt: "___ a supermarket near my house.", options: ["There is", "There are", "There isn't", "It is"], answer: "There is", tip: "Singular: There is." },
    { type: "mc", prompt: "___ three dogs in the yard.", options: ["There are", "There is", "It is", "They are"], answer: "There are", tip: "Plural: There are." },
    { type: "mc", prompt: "___ any chairs in the room?", options: ["Are there", "Is there", "Do there", "Does there"], answer: "Are there", tip: "Plural: Are there...?" },
    { type: "mc", prompt: "___ a bank on this street?", options: ["Is there", "Are there", "Do there", "Does there"], answer: "Is there", tip: "Singular: Is there...?" },
    { type: "mc", prompt: "Choose the plural of \"person\":", options: ["people", "persons", "peoples", "persones"], answer: "people", tip: "Plural irregular: person → people." },
    { type: "mc", prompt: "Choose the plural of \"city\":", options: ["cities", "citys", "cityes", "city"], answer: "cities", tip: "Consonante + y → ies." },
    { type: "mc", prompt: "Choose the plural of \"knife\":", options: ["knives", "knifes", "knifees", "knife"], answer: "knives", tip: "f → ves." },
    { type: "mc", prompt: "Which of these is uncountable?", options: ["rice", "chair", "computer", "student"], answer: "rice", tip: "Rice es incontable." },
    { type: "fill", prompt: "___ a hospital near here.", answers: ["there is", "There is"], tip: "Singular: There is." },
    { type: "fill", prompt: "___ five books on the desk.", answers: ["there are", "There are"], tip: "Plural: There are." },
    { type: "fill", prompt: "There ___ (not) any students today.", answers: ["aren't"], tip: "Plural negativo: aren't." },
    { type: "fill", prompt: "There ___ (not) a problem.", answers: ["isn't"], tip: "Singular negativo: isn't." },
    { type: "fill", prompt: "There ___ a lot of people outside.", answers: ["are"], tip: "People es plural." },
    { type: "fill", prompt: "There ___ some cheese in the fridge.", answers: ["is"], tip: "Cheese es incontable." },
    { type: "fill", prompt: "How ___ apples do you want?", answers: ["many"], tip: "Apples es contable." },
    { type: "fill", prompt: "How ___ water do you drink every day?", answers: ["much"], tip: "Water es incontable." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["There", "are", "four", "students"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["There", "is", "some", "coffee"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["There", "are", "many", "trees", "here"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["There", "is", "an", "old", "church"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["There", "are", "two", "windows"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["There", "isn't", "any", "juice"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["There", "aren't", "many", "cars"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["There", "isn't", "a", "problem"] },
    { type: "mc", prompt: "How ___ chairs are there?", options: ["many", "much", "some", "any"], answer: "many", tip: "Chairs es contable." },
    { type: "mc", prompt: "How ___ milk do you need?", options: ["much", "many", "some", "any"], answer: "much", tip: "Milk es incontable." },
    { type: "mc", prompt: "There ___ any sugar left.", options: ["isn't", "aren't", "don't", "doesn't"], answer: "isn't", tip: "Sugar es incontable." },
    { type: "mc", prompt: "There ___ twenty students in my class.", options: ["are", "is", "am", "be"], answer: "are", tip: "Plural: are." },
    { type: "mc", prompt: "Choose the plural of \"mouse\":", options: ["mice", "mouses", "mousees", "mouse"], answer: "mice", tip: "Plural irregular." },
    { type: "mc", prompt: "Choose the plural of \"baby\":", options: ["babies", "babys", "babyes", "baby"], answer: "babies", tip: "Consonante + y → ies." },
    { type: "mc", prompt: "Which of these is uncountable?", options: ["advice", "coin", "chair", "apple"], answer: "advice", tip: "Advice es incontable." },
    { type: "fill", prompt: "There ___ three buses waiting.", answers: ["are"], tip: "Plural: are." },
    { type: "fill", prompt: "There ___ an orange on the table.", answers: ["is"], tip: "Singular: is." },
    { type: "fill", prompt: "How ___ students are absent today?", answers: ["many"], tip: "Students es contable." },
    { type: "fill", prompt: "How ___ bread do we have?", answers: ["much"], tip: "Bread es incontable." },
    { type: "fill", prompt: "There ___ some furniture in the living room.", answers: ["is"], tip: "Furniture es incontable." },
    { type: "mc", prompt: "Choose the plural of \"tooth\":", options: ["teeth", "tooths", "toothes", "tooth"], answer: "teeth", tip: "Plural irregular." },
    { type: "mc", prompt: "Choose the plural of \"foot\":", options: ["feet", "foots", "footes", "foot"], answer: "feet", tip: "Plural irregular." },
    { type: "mc", prompt: "___ there any questions?", options: ["Are", "Is", "Do", "Does"], answer: "Are", tip: "Plural: Are there...?" },
    { type: "mc", prompt: "___ there enough food for everyone?", options: ["Is", "Are", "Do", "Does"], answer: "Is", tip: "Food es incontable." },
    { type: "mc", prompt: "Which of these is uncountable?", options: ["homework", "pen", "table", "phone"], answer: "homework", tip: "Homework es incontable." },
    { type: "fill", prompt: "There ___ (not) any information available.", answers: ["isn't"], tip: "Information es incontable." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Are", "there", "any", "restaurants", "nearby"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["How", "many", "books", "are", "there"] }
  ],

  frequency: [
    { type: "mc", prompt: "Choose the correct order: I ___ drink coffee in the morning. (always)", options: ["always drink", "drink always", "am always drink", "drink am always"], answer: "always drink", tip: "Adverbio antes del verbo principal." },
    { type: "mc", prompt: "She is ___ late for work. (often)", options: ["often late", "late often", "is often", "often is"], answer: "often late", tip: "Con el verbo be, el adverbio va después: is often late." },
    { type: "fill", prompt: "He ___ (never) eats vegetables.", answers: ["never eats"], tip: "Adverbio antes del verbo principal." },
    { type: "mc", prompt: "Choose the correct sentence:", options: ["I usually go to bed early.", "I go usually to bed early.", "Usually I to bed go early.", "I go to usually bed early."], answer: "I usually go to bed early.", tip: "El adverbio va antes del verbo principal." },
    { type: "mc", prompt: "We ___ go to the cinema. (sometimes)", options: ["sometimes go", "go sometimes", "are sometimes go", "go are sometimes"], answer: "sometimes go", tip: "Adverbio antes del verbo principal." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "is", "always", "happy"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["He", "rarely", "eats", "meat"] },
    { type: "fill", prompt: "How often do you exercise? — I exercise ___ (three times) a week.", answers: ["three times"], tip: "Frecuencia con número + times." },
    { type: "fill", prompt: "They ___ (usually) arrive on time.", answers: ["usually arrive"], tip: "Adverbio antes del verbo principal." },
    { type: "mc", prompt: "Which adverb means 0% of the time?", options: ["never", "always", "often", "usually"], answer: "never", tip: "Never = 0%." },
    { type: "mc", prompt: "Which adverb means 100% of the time?", options: ["always", "never", "sometimes", "rarely"], answer: "always", tip: "Always = 100%." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["How", "often", "do", "you", "exercise"] },
    { type: "fill", prompt: "I have ___ (never) been to Europe.", answers: ["never"], tip: "Never va entre have y el participio." },
    { type: "mc", prompt: "She ___ (seldom) calls me.", options: ["seldom calls", "calls seldom", "is seldom calls", "seldom is calls"], answer: "seldom calls", tip: "Adverbio antes del verbo principal." },
    { type: "mc", prompt: "My brother is ___ hungry. (always)", options: ["always hungry", "hungry always", "is always", "hungry is always"], answer: "always hungry", tip: "Con be, el adverbio va después: is always hungry." },
    { type: "mc", prompt: "I ___ forget my keys. (sometimes)", options: ["sometimes forget", "forget sometimes", "am sometimes forget", "forget am sometimes"], answer: "sometimes forget", tip: "Adverbio antes del verbo principal." },
    { type: "mc", prompt: "They are ___ tired after work. (usually)", options: ["usually tired", "tired usually", "are usually", "usually are"], answer: "usually tired", tip: "Con el verbo be, el adverbio va después: are usually tired." },
    { type: "mc", prompt: "She ___ visits her grandparents. (often)", options: ["often visits", "visits often", "is often visits", "often is visits"], answer: "often visits", tip: "Adverbio antes del verbo principal." },
    { type: "mc", prompt: "We ___ eat fast food. (rarely)", options: ["rarely eat", "eat rarely", "are rarely eat", "eat are rarely"], answer: "rarely eat", tip: "Adverbio antes del verbo principal." },
    { type: "mc", prompt: "He is ___ nervous before exams. (always)", options: ["always nervous", "nervous always", "is always", "always is"], answer: "always nervous", tip: "Con be, el adverbio va después." },
    { type: "mc", prompt: "Choose the correct sentence:", options: ["They often play soccer after school.", "They play often soccer after school.", "Often they soccer play after school.", "They soccer often play after school."], answer: "They often play soccer after school.", tip: "El adverbio va antes del verbo principal." },
    { type: "mc", prompt: "Choose the correct sentence:", options: ["He is never angry.", "He never is angry.", "Never he is angry.", "He angry is never."], answer: "He is never angry.", tip: "Con be, el adverbio va después." },
    { type: "mc", prompt: "I ___ watch TV before bed. (usually)", options: ["usually watch", "watch usually", "am usually watch", "watch am usually"], answer: "usually watch", tip: "Adverbio antes del verbo principal." },
    { type: "fill", prompt: "She ___ (always) smiles at everyone.", answers: ["always smiles"], tip: "Adverbio antes del verbo principal." },
    { type: "fill", prompt: "We ___ (often) go shopping on Saturdays.", answers: ["often go"], tip: "Adverbio antes del verbo principal." },
    { type: "fill", prompt: "My father is ___ (usually) busy.", answers: ["usually"], tip: "Con be, el adverbio va después." },
    { type: "fill", prompt: "They ___ (rarely) eat dessert.", answers: ["rarely eat"], tip: "Adverbio antes del verbo principal." },
    { type: "fill", prompt: "I visit my grandparents ___ (twice) a month.", answers: ["twice"], tip: "Twice a month = dos veces al mes." },
    { type: "fill", prompt: "He studies English ___ (every) day.", answers: ["every"], tip: "Every day = todos los días." },
    { type: "fill", prompt: "She is ___ (never) late.", answers: ["never"], tip: "Con be, el adverbio va después." },
    { type: "fill", prompt: "We meet ___ (once) a week.", answers: ["once"], tip: "Once a week = una vez por semana." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "usually", "walk", "to", "school"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["They", "are", "often", "busy"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "never", "drinks", "coffee"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "sometimes", "play", "chess"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["He", "is", "rarely", "late"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["My", "parents", "always", "cook", "dinner"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "children", "usually", "wake", "up", "early"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "is", "sometimes", "shy"] },
    { type: "mc", prompt: "How often do you go to the gym? — ___", options: ["Three times a week.", "In the morning.", "At seven.", "Tomorrow."], answer: "Three times a week.", tip: "Responde con una expresión de frecuencia." },
    { type: "mc", prompt: "Which adverb means about 50% of the time?", options: ["sometimes", "always", "never", "usually"], answer: "sometimes", tip: "Sometimes ≈ 50%." },
    { type: "mc", prompt: "Which adverb means almost never?", options: ["rarely", "always", "often", "usually"], answer: "rarely", tip: "Rarely = casi nunca." },
    { type: "mc", prompt: "Which adverb means around 90% of the time?", options: ["usually", "never", "sometimes", "rarely"], answer: "usually", tip: "Usually = normalmente." },
    { type: "mc", prompt: "Which adverb means many times?", options: ["often", "never", "rarely", "once"], answer: "often", tip: "Often = frecuentemente." },
    { type: "mc", prompt: "She ___ forgets her homework. (never)", options: ["never forgets", "forgets never", "is never forgets", "never is forgets"], answer: "never forgets", tip: "Adverbio antes del verbo principal." },
    { type: "mc", prompt: "We are ___ at home on Sundays. (usually)", options: ["usually", "usual", "oftenly", "frequency"], answer: "usually", tip: "Con be, el adverbio va después." },
    { type: "fill", prompt: "How often do they travel? — ___ a year.", answers: ["twice"], tip: "Twice a year = dos veces al año." },
    { type: "fill", prompt: "I clean my room ___ Sunday.", answers: ["every"], tip: "Every Sunday = todos los domingos." },
    { type: "fill", prompt: "She calls her parents ___ a day.", answers: ["once"], tip: "Once a day = una vez al día." },
    { type: "fill", prompt: "He goes running ___ (often) before work.", answers: ["often goes"], tip: "Adverbio antes del verbo principal." },
    { type: "fill", prompt: "We are ___ (always) ready on time.", answers: ["always"], tip: "Con be, el adverbio va después." },
    { type: "mc", prompt: "Choose the correct sentence:", options: ["I am always careful.", "I always am careful.", "Always I am careful.", "I careful am always."], answer: "I am always careful.", tip: "Con be, el adverbio va después." },
    { type: "mc", prompt: "Choose the correct sentence:", options: ["He rarely watches TV.", "He watches rarely TV.", "Rarely he watches TV.", "He TV rarely watches."], answer: "He rarely watches TV.", tip: "Adverbio antes del verbo principal." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["How", "often", "does", "she", "call", "you"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["How", "often", "are", "they", "late"] }
  ],

  modals: [
    { type: "mc", prompt: "You ___ study more. (consejo)", options: ["should", "can", "must", "may"], answer: "should", tip: "Should se usa para dar consejos." },
    { type: "mc", prompt: "It ___ rain later. (posibilidad)", options: ["might", "must", "should", "can"], answer: "might", tip: "Might expresa posibilidad." },
    { type: "fill", prompt: "I ___ (can) speak French.", answers: ["can"], tip: "Can expresa habilidad." },
    { type: "mc", prompt: "Students ___ wear uniforms. (obligación)", options: ["must", "might", "should", "may"], answer: "must", tip: "Must/have to expresan obligación." },
    { type: "fill", prompt: "You ___ (not) smoke here. (prohibición)", answers: ["mustn't", "must not"], tip: "Mustn't expresa prohibición." },
    { type: "mc", prompt: "___ I open the window? (pedir permiso)", options: ["May", "Must", "Should", "Will"], answer: "May", tip: "May se usa para pedir permiso formalmente." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["You", "should", "see", "a", "doctor"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["You", "shouldn't", "worry"] },
    { type: "mc", prompt: "We ___ leave now, it's late. (consejo fuerte)", options: ["had better", "may", "could", "might"], answer: "had better", tip: "Had better da un consejo urgente." },
    { type: "fill", prompt: "She ___ (have to) work on weekends.", answers: ["has to"], tip: "She + has to (obligación)." },
    { type: "mc", prompt: "___ you help me with this box? (pedido)", options: ["Could", "Should", "Must", "May"], answer: "Could", tip: "Could se usa para pedidos educados." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "must", "finish", "the", "project", "today"] },
    { type: "mc", prompt: "It ___ be true, I don't believe it. (duda fuerte)", options: ["can't", "must", "should", "may"], answer: "can't", tip: "Can't expresa una duda muy fuerte / imposibilidad." },
    { type: "fill", prompt: "You'd better ___ (not/be) late.", answers: ["not be"], tip: "Had better + not + verbo base." },
    { type: "mc", prompt: "___ I have another cookie? (pedido educado)", options: ["May", "Must", "Should", "Will"], answer: "May", tip: "May para pedidos educados." },

  ],

  demonstratives: [
    { type: "mc", prompt: "___ is my pen. (cerca, singular)", options: ["This", "These", "That", "Those"], answer: "This", tip: "This: cerca y singular." },
    { type: "mc", prompt: "___ are my keys. (cerca, plural)", options: ["These", "This", "Those", "That"], answer: "These", tip: "These: cerca y plural." },
    { type: "mc", prompt: "___ is a nice city. (lejos, singular)", options: ["That", "This", "These", "Those"], answer: "That", tip: "That: lejos y singular." },
    { type: "mc", prompt: "___ are beautiful flowers. (lejos, plural)", options: ["Those", "That", "This", "These"], answer: "Those", tip: "Those: lejos y plural." },
    { type: "fill", prompt: "Look at ___ car over there!", answers: ["that"], tip: "Lejos y singular: that." },
    { type: "fill", prompt: "___ books on the table are mine.", answers: ["these", "These"], tip: "Cerca y plural: these." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["This", "is", "delicious"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["Those", "mountains", "are", "tall"] },
    { type: "mc", prompt: "Can I try ___ shoes? (cerca, plural)", options: ["these", "this", "those", "that"], answer: "these", tip: "Cerca y plural: these." },
    { type: "mc", prompt: "___ house belongs to my uncle. (lejos, singular)", options: ["That", "This", "These", "Those"], answer: "That", tip: "Lejos y singular: that." },
    { type: "fill", prompt: "I like ___ song. (cerca, singular)", answers: ["this"], tip: "Cerca y singular: this." },
    { type: "fill", prompt: "___ people are my classmates. (lejos, plural)", answers: ["those", "Those"], tip: "Lejos y plural: those." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Is", "that", "your", "phone"] },
    { type: "mc", prompt: "___ is my favorite restaurant. (cerca, singular)", options: ["This", "These", "That", "Those"], answer: "This", tip: "Cerca y singular: this." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Are", "these", "seats", "free"] },
    { type: "mc", prompt: "You ___ wear a helmet when riding a motorcycle. (obligación)", options: ["must", "can", "might", "should"], answer: "must", tip: "Must expresa obligación." },
    { type: "mc", prompt: "She ___ play the piano very well. (habilidad)", options: ["can", "must", "should", "might"], answer: "can", tip: "Can expresa habilidad." },
    { type: "mc", prompt: "You ___ eat more vegetables. (consejo)", options: ["should", "may", "must", "could"], answer: "should", tip: "Should se usa para dar consejos." },
    { type: "mc", prompt: "They ___ arrive late because of the traffic. (posibilidad)", options: ["might", "must", "should", "can"], answer: "might", tip: "Might expresa posibilidad." },
    { type: "mc", prompt: "Visitors ___ park here. (prohibición)", options: ["mustn't", "can", "should", "may"], answer: "mustn't", tip: "Mustn't expresa prohibición." },
    { type: "mc", prompt: "___ you swim when you were five?", options: ["Could", "Must", "Should", "May"], answer: "Could", tip: "Could expresa habilidad en el pasado." },
    { type: "mc", prompt: "We ___ finish this before noon. (necesidad)", options: ["have to", "might", "can", "should"], answer: "have to", tip: "Have to expresa obligación." },
    { type: "mc", prompt: "___ I borrow your pen? (pedido educado)", options: ["Could", "Must", "Should", "Have to"], answer: "Could", tip: "Could se usa para pedir algo cortésmente." },
    { type: "fill", prompt: "He ___ (can) drive a truck.", answers: ["can"], tip: "Can expresa habilidad." },
    { type: "fill", prompt: "We ___ (should) leave early.", answers: ["should"], tip: "Should + verbo base." },
    { type: "fill", prompt: "I ___ (may) come tomorrow.", answers: ["may"], tip: "May expresa posibilidad." },
    { type: "fill", prompt: "You ___ (not) be rude.", answers: ["shouldn't", "should not"], tip: "Shouldn't expresa consejo negativo." },
    { type: "fill", prompt: "She ___ (have to) study tonight.", answers: ["has to"], tip: "She + has to." },
    { type: "fill", prompt: "They ___ (not/have to) work on Sunday.", answers: ["don't have to", "do not have to"], tip: "Don't have to = no es necesario." },
    { type: "fill", prompt: "You ___ (must) be careful.", answers: ["must"], tip: "Must + verbo base." },
    { type: "fill", prompt: "He ___ (could) help us tomorrow.", answers: ["could"], tip: "Could expresa posibilidad o petición." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "can", "dance", "very", "well"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["We", "should", "leave", "now"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["They", "must", "wear", "seatbelts"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["I", "may", "visit", "you", "tomorrow"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["He", "has", "to", "study", "hard"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["You", "mustn't", "run"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["She", "shouldn't", "drive", "fast"] },
    { type: "order", prompt: "Ordena la oración (negativa):", tokens: ["We", "don't", "have", "to", "hurry"] },
    { type: "mc", prompt: "___ I use your phone? (pedir permiso)", options: ["May", "Must", "Should", "Have"], answer: "May", tip: "May se usa para pedir permiso." },
    { type: "mc", prompt: "___ we start the meeting?", options: ["Shall", "Must", "Could", "May"], answer: "Shall", tip: "Shall se usa para hacer sugerencias." },
    { type: "mc", prompt: "___ you repeat that, please?", options: ["Could", "Must", "Should", "May"], answer: "Could", tip: "Could para peticiones educadas." },
    { type: "mc", prompt: "___ I help you?", options: ["Can", "Must", "Should", "Have to"], answer: "Can", tip: "Can se usa para ofrecer ayuda." },
    { type: "mc", prompt: "___ they finish today?", options: ["Will", "Should", "May", "Must"], answer: "Will", tip: "Will se usa para futuro." },
    { type: "mc", prompt: "___ she speak Japanese?", options: ["Can", "Should", "Must", "May"], answer: "Can", tip: "Can expresa habilidad." },
    { type: "mc", prompt: "___ we bring our passports?", options: ["Do", "Have to", "May", "Can"], answer: "Have to", tip: "Have to expresa obligación." },
    { type: "fill", prompt: "Why ___ we wait outside?", answers: ["should"], tip: "Why should...?" },
    { type: "fill", prompt: "When ___ I call you?", answers: ["can"], tip: "Can para posibilidad o permiso." },
    { type: "fill", prompt: "What ___ we do now?", answers: ["should"], tip: "Should para pedir consejo." },
    { type: "fill", prompt: "Where ___ I park my car?", answers: ["can"], tip: "Can para permiso o posibilidad." },
    { type: "fill", prompt: "Who ___ help us?", answers: ["can"], tip: "Can expresa habilidad." },
    { type: "mc", prompt: "You ___ apologize to her. (consejo)", options: ["should", "might", "can", "mustn't"], answer: "should", tip: "Should se usa para dar consejos." },
    { type: "mc", prompt: "The lights are off. They ___ be asleep. (deducción)", options: ["must", "can't", "should", "may"], answer: "must", tip: "Must expresa una deducción fuerte." },
    { type: "mc", prompt: "You ___ touch that wire. (prohibición)", options: ["mustn't", "can", "may", "should"], answer: "mustn't", tip: "Mustn't = prohibido." },
    { type: "mc", prompt: "I ___ finish this today. (obligación)", options: ["have to", "might", "could", "may"], answer: "have to", tip: "Have to expresa obligación." },
    { type: "mc", prompt: "She ___ come to the party, but she isn't sure. (posibilidad)", options: ["might", "must", "should", "can"], answer: "might", tip: "Might expresa posibilidad." },
    { type: "fill", prompt: "You ___ (not/have to) bring any food.", answers: ["don't have to", "do not have to"], tip: "No es necesario hacerlo." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Could", "you", "help", "me"] },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["May", "I", "come", "in"] }
  ],

  adjectives: [
    { type: "mc", prompt: "This book is ___ (interesting) than that one.", options: ["more interesting", "interestinger", "the most interesting", "interesting"], answer: "more interesting", tip: "Adjetivos largos: more + adjetivo." },
    { type: "mc", prompt: "She is ___ (tall) than her brother.", options: ["taller", "more tall", "tallest", "the taller"], answer: "taller", tip: "Adjetivos cortos: adjetivo + er." },
    { type: "fill", prompt: "He is the ___ (smart) student in class.", answers: ["smartest"], tip: "Superlativo corto: the + adjetivo + est." },
    { type: "mc", prompt: "This is the ___ (good) restaurant in town.", options: ["best", "goodest", "better", "most good"], answer: "best", tip: "Good es irregular: good -> best." },
    { type: "fill", prompt: "Today is ___ (hot) than yesterday.", answers: ["hotter"], tip: "Hot dobla la consonante: hotter." },
    { type: "mc", prompt: "That was the ___ (bad) movie I've seen.", options: ["worst", "baddest", "worse", "most bad"], answer: "worst", tip: "Bad es irregular: bad -> worst." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["A", "car", "is", "faster", "than", "a", "bike"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["This", "is", "the", "tallest", "building"] },
    { type: "mc", prompt: "She sings ___ (well) than me.", options: ["better", "more good", "gooder", "best"], answer: "better", tip: "Well/good es irregular: better." },
    { type: "fill", prompt: "This exercise is ___ (easy) than the last one.", answers: ["easier"], tip: "Easy cambia y -> i + er." },
    { type: "mc", prompt: "He is the ___ (young) person in the family.", options: ["youngest", "younger", "most young", "more young"], answer: "youngest", tip: "Superlativo corto: adjetivo + est." },
    { type: "mc", prompt: "My house is ___ (big) than yours.", options: ["bigger", "more big", "biggest", "most big"], answer: "bigger", tip: "Big dobla la consonante: bigger." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["This", "is", "the", "most", "expensive", "phone"] },
    { type: "fill", prompt: "Of all the students, she is the ___ (hardworking).", answers: ["most hardworking"], tip: "Adjetivo largo: the most + adjetivo." },
    { type: "mc", prompt: "This dress is ___ (pretty) than the other one.", options: ["prettier", "more pretty", "prettiest", "most pretty"], answer: "prettier", tip: "Pretty cambia y -> i + er." },
    { type: "mc", prompt: "This bag is ___ (light) than mine.", options: ["lighter", "more light", "lightest", "the lighter"], answer: "lighter", tip: "Adjetivos cortos: adjetivo + er." },
    { type: "mc", prompt: "Mount Everest is the ___ (high) mountain in the world.", options: ["highest", "higher", "most high", "more high"], answer: "highest", tip: "Superlativo corto: adjetivo + est." },
    { type: "mc", prompt: "Math is ___ (difficult) than English.", options: ["more difficult", "difficulter", "most difficult", "difficult"], answer: "more difficult", tip: "Adjetivos largos: more + adjetivo." },
    { type: "mc", prompt: "My sister is ___ (friendly) than I am.", options: ["friendlier", "more friendly", "friendliest", "most friendly"], answer: "friendlier", tip: "Friendly cambia y → i + er." },
    { type: "mc", prompt: "This is the ___ (beautiful) beach I've visited.", options: ["most beautiful", "beautifullest", "more beautiful", "beautiful"], answer: "most beautiful", tip: "Adjetivos largos: the most + adjetivo." },
    { type: "mc", prompt: "My new phone is ___ (fast) than my old one.", options: ["faster", "more fast", "fastest", "the faster"], answer: "faster", tip: "Adjetivos cortos: + er." },
    { type: "mc", prompt: "Winter is the ___ (cold) season.", options: ["coldest", "colder", "more cold", "most cold"], answer: "coldest", tip: "Superlativo corto." },
    { type: "mc", prompt: "She is ___ (careful) than her brother.", options: ["more careful", "carefuller", "most careful", "careful"], answer: "more careful", tip: "Adjetivos largos: more + adjetivo." },
    { type: "fill", prompt: "This test is ___ (simple) than the last one.", answers: ["simpler"], tip: "Adjetivo corto: + er." },
    { type: "fill", prompt: "He is the ___ (strong) player on the team.", answers: ["strongest"], tip: "Superlativo corto." },
    { type: "fill", prompt: "Today is ___ (busy) than yesterday.", answers: ["busier"], tip: "Busy cambia y → i + er." },
    { type: "fill", prompt: "This is the ___ (comfortable) chair in the house.", answers: ["most comfortable"], tip: "Adjetivo largo: the most + adjetivo." },
    { type: "fill", prompt: "My dog is ___ (small) than yours.", answers: ["smaller"], tip: "Adjetivo corto: + er." },
    { type: "fill", prompt: "She is the ___ (kind) teacher at school.", answers: ["kindest"], tip: "Superlativo corto." },
    { type: "fill", prompt: "This road is ___ (wide) than that one.", answers: ["wider"], tip: "Wide + r." },
    { type: "fill", prompt: "The blue whale is the ___ (large) animal on Earth.", answers: ["largest"], tip: "Large + st." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["My", "car", "is", "newer", "than", "yours"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "is", "the", "best", "student"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["This", "book", "is", "more", "interesting"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["My", "dog", "is", "friendlier", "than", "yours"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["It", "was", "the", "happiest", "day"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["English", "is", "easier", "than", "math"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["This", "is", "the", "most", "beautiful", "park"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["My", "brother", "is", "older", "than", "me"] },
    { type: "mc", prompt: "My exam result was ___ (bad) than last time.", options: ["worse", "worst", "more bad", "badder"], answer: "worse", tip: "Bad es irregular: worse." },
    { type: "mc", prompt: "This is the ___ (far) place I've traveled to.", options: ["farthest", "farther", "most far", "more far"], answer: "farthest", tip: "Far → farthest." },
    { type: "mc", prompt: "Your answer is ___ (good) than mine.", options: ["better", "best", "gooder", "more good"], answer: "better", tip: "Good es irregular: better." },
    { type: "mc", prompt: "He is the ___ (bad) player on the team.", options: ["worst", "worse", "baddest", "most bad"], answer: "worst", tip: "Bad es irregular: worst." },
    { type: "mc", prompt: "My little sister is ___ (happy) now.", options: ["happier", "more happy", "happiest", "most happy"], answer: "happier", tip: "Happy cambia y → i + er." },
    { type: "mc", prompt: "This puzzle is ___ (easy) than I expected.", options: ["easier", "more easy", "easiest", "most easy"], answer: "easier", tip: "Easy cambia y → i + er." },
    { type: "mc", prompt: "Today is the ___ (busy) day of the week.", options: ["busiest", "busier", "most busy", "more busy"], answer: "busiest", tip: "Busy cambia y → i + est." },
    { type: "fill", prompt: "This hotel is ___ (cheap) than the other one.", answers: ["cheaper"], tip: "Adjetivo corto: + er." },
    { type: "fill", prompt: "She is the ___ (funny) person I know.", answers: ["funniest"], tip: "Funny cambia y → i + est." },
    { type: "fill", prompt: "This problem is ___ (complicated) than the last one.", answers: ["more complicated"], tip: "Adjetivos largos: more + adjetivo." },
    { type: "fill", prompt: "My grandfather is ___ (old) than my grandmother.", answers: ["older"], tip: "Adjetivo corto: + er." },
    { type: "fill", prompt: "That was the ___ (exciting) game of the season.", answers: ["most exciting"], tip: "Adjetivos largos: the most + adjetivo." },
    { type: "mc", prompt: "Which is correct?", options: ["A lion is stronger than a dog.", "A lion is more stronger than a dog.", "A lion is strongest than a dog.", "A lion stronger is than a dog."], answer: "A lion is stronger than a dog.", tip: "Strong → stronger." },
    { type: "mc", prompt: "Which is correct?", options: ["This is the most important lesson.", "This is the importanter lesson.", "This is the more important lesson.", "This is most important lesson."], answer: "This is the most important lesson.", tip: "Adjetivos largos: the most + adjetivo." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["This", "exercise", "is", "harder", "than", "the", "last", "one"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["She", "is", "the", "most", "talented", "singer"] }
  ],

  possessives: [
    { type: "mc", prompt: "This is ___ book. (pertenece a mí)", options: ["my", "mine", "me", "I"], answer: "my", tip: "Adjetivo posesivo: my + sustantivo." },
    { type: "mc", prompt: "Is this ___ car? (pertenece a ti)", options: ["your", "yours", "you", "you're"], answer: "your", tip: "Adjetivo posesivo: your + sustantivo." },
    { type: "fill", prompt: "That is ___ (Maria) bag.", answers: ["Maria's"], tip: "Sustantivo posesivo: nombre + 's." },
    { type: "mc", prompt: "The dog wagged ___ tail. (pertenece a él/ello)", options: ["its", "it's", "it", "its'"], answer: "its", tip: "Its (sin apóstrofe) es el posesivo de it." },
    { type: "mc", prompt: "This pen is mine, that one is ___. (pertenece a ti)", options: ["yours", "your", "you", "you're"], answer: "yours", tip: "Pronombre posesivo: yours (sin sustantivo después)." },
    { type: "fill", prompt: "This is not my coat, it's ___. (pertenece a él)", answers: ["his"], tip: "Pronombre posesivo: his." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["This", "is", "my", "sister"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["That", "bike", "is", "hers"] },
    { type: "mc", prompt: "The ___ toys are broken. (children)", options: ["children's", "childs'", "childrens", "children"], answer: "children's", tip: "Plural irregular + 's: children's." },
    { type: "fill", prompt: "Those shoes are ___. (pertenecen a nosotros)", answers: ["ours"], tip: "Pronombre posesivo: ours." },
    { type: "mc", prompt: "___ names are Ana and Luis. (pertenece a ellos)", options: ["Their", "Theirs", "They", "Them"], answer: "Their", tip: "Adjetivo posesivo: their + sustantivo." },
    { type: "fill", prompt: "This is ___ (Carlos) car.", answers: ["Carlos's", "Carlos'"], tip: "Sustantivo posesivo: Carlos's / Carlos'." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["Their", "house", "is", "big"] },
    { type: "mc", prompt: "Whose pen is this? It's ___. (pertenece a ella)", options: ["hers", "her", "she", "she's"], answer: "hers", tip: "Pronombre posesivo: hers." },
    { type: "fill", prompt: "This is the ___ (cat) food.", answers: ["cat's"], tip: "Sustantivo posesivo: cat's." },
    { type: "mc", prompt: "This is ___ house. (pertenece a nosotros)", options: ["our", "ours", "us", "we"], answer: "our", tip: "Adjetivo posesivo: our + sustantivo." },
    { type: "mc", prompt: "Those are ___ backpacks. (pertenece a ellos)", options: ["their", "theirs", "them", "they"], answer: "their", tip: "Adjetivo posesivo: their + sustantivo." },
    { type: "mc", prompt: "This notebook is ___. (pertenece a mí)", options: ["mine", "my", "me", "I"], answer: "mine", tip: "Pronombre posesivo: mine (sin sustantivo)." },
    { type: "mc", prompt: "The blue bicycles are ___. (pertenecen a nosotros)", options: ["ours", "our", "us", "we"], answer: "ours", tip: "Pronombre posesivo: ours." },
    { type: "mc", prompt: "That jacket is ___. (pertenece a ellos)", options: ["theirs", "their", "them", "they"], answer: "theirs", tip: "Pronombre posesivo: theirs." },
    { type: "mc", prompt: "She forgot ___ keys at home.", options: ["her", "hers", "she", "herself"], answer: "her", tip: "Adjetivo posesivo: her + sustantivo." },
    { type: "mc", prompt: "We finished ___ homework.", options: ["our", "ours", "us", "we"], answer: "our", tip: "Adjetivo posesivo: our + sustantivo." },
    { type: "mc", prompt: "He washed ___ hands before dinner.", options: ["his", "him", "he", "himself"], answer: "his", tip: "Adjetivo posesivo: his + sustantivo." },
    { type: "fill", prompt: "This is ___ (John) laptop.", answers: ["John's"], tip: "Nombre + 's." },
    { type: "fill", prompt: "The ___ (teacher) desk is near the window.", answers: ["teacher's"], tip: "Sustantivo singular + 's." },
    { type: "fill", prompt: "These books are ___. (pertenecen a ellos)", answers: ["theirs"], tip: "Pronombre posesivo: theirs." },
    { type: "fill", prompt: "That phone is ___. (pertenece a nosotros)", answers: ["ours"], tip: "Pronombre posesivo: ours." },
    { type: "fill", prompt: "This is ___ (my sister) room.", answers: ["my sister's"], tip: "Posesivo con 's." },
    { type: "fill", prompt: "The ___ (students) classroom is on the second floor.", answers: ["students'"], tip: "Plural terminado en s: solo apóstrofe." },
    { type: "fill", prompt: "Is this ___ (you) backpack?", answers: ["your"], tip: "Your + sustantivo." },
    { type: "fill", prompt: "The rabbit is eating ___ carrots.", answers: ["its"], tip: "Its es el posesivo de it." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["This", "is", "our", "classroom"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "teacher's", "car", "is", "new"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["These", "bags", "are", "theirs"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["Her", "brother", "is", "a", "doctor"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "girls'", "toys", "are", "colorful"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["His", "phone", "is", "on", "the", "table"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["This", "computer", "is", "mine"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["Our", "parents", "are", "at", "home"] },
    { type: "mc", prompt: "Whose jacket is this? It's ___. (pertenece a nosotros)", options: ["ours", "our", "us", "we"], answer: "ours", tip: "Pronombre posesivo: ours." },
    { type: "mc", prompt: "The ___ room is very clean. (boys)", options: ["boys'", "boy's", "boys's", "boys"], answer: "boys'", tip: "Plural terminado en s: solo apóstrofe." },
    { type: "mc", prompt: "This isn't my umbrella. It's ___. (pertenece a ella)", options: ["hers", "her", "she", "herself"], answer: "hers", tip: "Pronombre posesivo: hers." },
    { type: "mc", prompt: "___ parents live in Mexico. (pertenece a él)", options: ["His", "Him", "He", "He's"], answer: "His", tip: "Adjetivo posesivo: his + sustantivo." },
    { type: "mc", prompt: "The ___ playground is behind the school. (children)", options: ["children's", "childrens", "child's", "children"], answer: "children's", tip: "Plural irregular + 's." },
    { type: "mc", prompt: "This seat is ___. (pertenece a mí)", options: ["mine", "my", "me", "I"], answer: "mine", tip: "Pronombre posesivo: mine." },
    { type: "mc", prompt: "___ teacher is very friendly. (pertenece a ustedes)", options: ["Your", "Yours", "You", "You're"], answer: "Your", tip: "Adjetivo posesivo: your + sustantivo." },
    { type: "fill", prompt: "The ___ (dog) owner is outside.", answers: ["dog's"], tip: "Sustantivo singular + 's." },
    { type: "fill", prompt: "These pencils are ___. (pertenecen a ustedes)", answers: ["yours"], tip: "Pronombre posesivo: yours." },
    { type: "fill", prompt: "That is ___ (we) classroom.", answers: ["our"], tip: "Our + sustantivo." },
    { type: "fill", prompt: "The ___ (girls) dresses are beautiful.", answers: ["girls'"], tip: "Plural terminado en s: solo apóstrofe." },
    { type: "fill", prompt: "This wallet is ___. (pertenece a él)", answers: ["his"], tip: "Pronombre posesivo: his." },
    { type: "mc", prompt: "Which sentence is correct?", options: ["This is my book.", "This is mine book.", "This is me book.", "This is I book."], answer: "This is my book.", tip: "My + sustantivo." },
    { type: "mc", prompt: "Which sentence is correct?", options: ["The cat's bed is clean.", "The cats's bed is clean.", "The cat bed's is clean.", "The cats bed is clean."], answer: "The cat's bed is clean.", tip: "Singular + 's." },
    { type: "order", prompt: "Ordena la oración:", tokens: ["Whose", "bag", "is", "this"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["The", "students'", "books", "are", "new"] }
  ],

  advanced: [
    { type: "mc", prompt: "You are tired, ___?", options: ["aren't you", "isn't you", "don't you", "aren't they"], answer: "aren't you", tip: "Afirmativa -> tag negativa: aren't you?" },
    { type: "mc", prompt: "She doesn't like coffee, ___?", options: ["does she", "doesn't she", "is she", "isn't she"], answer: "does she", tip: "Negativa -> tag afirmativa: does she?" },
    { type: "fill", prompt: "They can swim, ___?", answers: ["can't they"], tip: "Afirmativa -> tag negativa: can't they?" },
    { type: "mc", prompt: "If it rains, I ___ (stay) home. (primer condicional)", options: ["will stay", "stay", "stayed", "would stay"], answer: "will stay", tip: "If + presente, will + verbo base." },
    { type: "mc", prompt: "If I ___ (have) more money, I would travel. (segundo condicional)", options: ["had", "have", "will have", "would have"], answer: "had", tip: "If + pasado, would + verbo base." },
    { type: "fill", prompt: "If you study, you ___ (pass) the exam.", answers: ["will pass"], tip: "Primer condicional: will + verbo base." },
    { type: "fill", prompt: "If she ___ (be) here, she would help us.", answers: ["were"], tip: "Segundo condicional: usamos were para todos los sujetos con be." },
    { type: "mc", prompt: "Would you like ___ coffee? (ofrecer)", options: ["some", "any", "no", "a"], answer: "some", tip: "Ofrecimientos usan some, no any." },
    { type: "mc", prompt: "___ you like to dance with me?", options: ["Would", "Will", "Do", "Are"], answer: "Would", tip: "Would like para ofrecimientos/invitaciones educadas." },
    { type: "order", prompt: "Ordena la oración (tag question):", tokens: ["It's", "cold", "isn't", "it"] },
    { type: "order", prompt: "Ordena la oración (condicional):", tokens: ["If", "I", "win", "the", "lottery", "I", "will", "buy", "a", "house"] },
    { type: "mc", prompt: "If I were you, I ___ (apologize).", options: ["would apologize", "will apologize", "apologize", "apologized"], answer: "would apologize", tip: "Segundo condicional: would + verbo base." },
    { type: "fill", prompt: "Would you like ___ (help) with your bags?", answers: ["help", "some help"], tip: "Would you like + sustantivo para ofrecer ayuda." },
    { type: "mc", prompt: "He isn't coming, ___?", options: ["is he", "isn't he", "does he", "doesn't he"], answer: "is he", tip: "Negativa -> tag afirmativa: is he?" },
    { type: "order", prompt: "Ordena la oración:", tokens: ["Would", "you", "like", "something", "to", "drink"] },
    { type: "mc", prompt: "You're a teacher, ___?", options: ["aren't you", "don't you", "isn't you", "won't you"], answer: "aren't you", tip: "Con el verbo be: afirmativa -> tag negativa." },
    { type: "mc", prompt: "They weren't late, ___?", options: ["were they", "weren't they", "did they", "didn't they"], answer: "were they", tip: "Negativa -> tag afirmativa." },
    { type: "mc", prompt: "He has finished, ___?", options: ["hasn't he", "doesn't he", "isn't he", "didn't he"], answer: "hasn't he", tip: "Present Perfect usa has." },
    { type: "mc", prompt: "We should leave now, ___?", options: ["shouldn't we", "don't we", "aren't we", "won't we"], answer: "shouldn't we", tip: "Los modales se repiten en la tag question." },
    { type: "mc", prompt: "You won't forget, ___?", options: ["will you", "won't you", "do you", "don't you"], answer: "will you", tip: "Negativa -> tag afirmativa." },
    { type: "mc", prompt: "She can drive, ___?", options: ["can't she", "doesn't she", "isn't she", "won't she"], answer: "can't she", tip: "Can -> can't en la tag." },
    { type: "mc", prompt: "If they leave now, they ___ (arrive) on time.", options: ["will arrive", "arrive", "would arrive", "arrived"], answer: "will arrive", tip: "Primer condicional." },
    { type: "mc", prompt: "If I ___ (know) the answer, I would tell you.", options: ["knew", "know", "will know", "would know"], answer: "knew", tip: "Segundo condicional." },
    { type: "fill", prompt: "She is your sister, ___?", answers: ["isn't she"], tip: "Tag negativa con be." },
    { type: "fill", prompt: "You don't eat meat, ___?", answers: ["do you"], tip: "Negativa -> tag afirmativa." },
    { type: "fill", prompt: "If we hurry, we ___ (catch) the bus.", answers: ["will catch"], tip: "Primer condicional." },
    { type: "fill", prompt: "If I ___ (be) rich, I would buy a yacht.", answers: ["were"], tip: "Segundo condicional: were." },
    { type: "fill", prompt: "Would you like ___ tea?", answers: ["some"], tip: "Ofrecimientos usan some." },
    { type: "fill", prompt: "He has a new car, ___?", answers: ["hasn't he"], tip: "Tag con has." },
    { type: "fill", prompt: "They were at school, ___?", answers: ["weren't they"], tip: "Tag negativa." },
    { type: "fill", prompt: "If she calls, I ___ (answer).", answers: ["will answer"], tip: "Primer condicional." },
    { type: "order", prompt: "Ordena la oración (tag question):", tokens: ["She", "can", "swim", "can't", "she"] },
    { type: "order", prompt: "Ordena la oración (tag question):", tokens: ["They", "were", "here", "weren't", "they"] },
    { type: "order", prompt: "Ordena la oración (condicional):", tokens: ["If", "you", "study", "you", "will", "pass"] },
    { type: "order", prompt: "Ordena la oración (condicional):", tokens: ["If", "I", "were", "you", "I", "would", "accept", "the", "job"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["Would", "you", "like", "some", "cake"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["If", "it", "snows", "we", "will", "stay", "home"] },
    { type: "order", prompt: "Ordena la oración (tag question):", tokens: ["He", "won't", "be", "late", "will", "he"] },
    { type: "order", prompt: "Ordena la oración:", tokens: ["If", "she", "were", "here", "she", "would", "know"] },
    { type: "mc", prompt: "If you heat water to 100°C, it ___.", options: ["boils", "will boil", "would boil", "boiled"], answer: "boils", tip: "Zero conditional: presente + presente." },
    { type: "mc", prompt: "If I had more free time, I ___ a new hobby.", options: ["would start", "will start", "start", "started"], answer: "would start", tip: "Segundo condicional." },
    { type: "mc", prompt: "Let's go for a walk, ___?", options: ["shall we", "will we", "do we", "don't we"], answer: "shall we", tip: "Let's... -> shall we?" },
    { type: "mc", prompt: "Open the window, ___?", options: ["will you", "won't you", "do you", "shall you"], answer: "will you", tip: "Imperativos usan will you?." },
    { type: "mc", prompt: "Would you like ___ cookies?", options: ["some", "any", "much", "many"], answer: "some", tip: "Ofrecimientos: some." },
    { type: "mc", prompt: "She never lies, ___?", options: ["does she", "doesn't she", "is she", "isn't she"], answer: "does she", tip: "Never hace la oración negativa." },
    { type: "mc", prompt: "If they practiced more, they ___ better.", options: ["would play", "will play", "play", "played"], answer: "would play", tip: "Segundo condicional." },
    { type: "fill", prompt: "Let's start, ___?", answers: ["shall we"], tip: "Tag de Let's." },
    { type: "fill", prompt: "Close the door, ___?", answers: ["will you"], tip: "Imperativo + will you?" },
    { type: "fill", prompt: "If it is sunny tomorrow, we ___ (go) to the beach.", answers: ["will go"], tip: "Primer condicional." },
    { type: "fill", prompt: "If he ___ (study) harder, he would get better grades.", answers: ["studied"], tip: "Segundo condicional." },
    { type: "fill", prompt: "Would you like ___ dessert?", answers: ["some"], tip: "Ofrecimientos usan some." },
    { type: "mc", prompt: "Which sentence is correct?", options: ["If I were you, I'd wait.", "If I was you, I'll wait.", "If I were you, I will wait.", "If I am you, I'd wait."], answer: "If I were you, I'd wait.", tip: "Segundo condicional." },
    { type: "mc", prompt: "Which sentence is correct?", options: ["It's raining, isn't it?", "It's raining, doesn't it?", "It's raining, is it?", "It's raining, aren't it?"], answer: "It's raining, isn't it?", tip: "Tag con be." },
    { type: "order", prompt: "Ordena la pregunta:", tokens: ["Would", "you", "like", "some", "coffee"] },
    { type: "order", prompt: "Ordena la oración (tag question):", tokens: ["You", "have", "finished", "haven't", "you"] }
  ]
};

/* ------------------------------------------------------------
   STATE
   ------------------------------------------------------------ */
let state = {
  screen: "home",
  topicId: null,
  round: [],
  index: 0,
  score: 0,
  currentOrderAnswer: [],
  currentOrderPool: [],
  answered: false
};

const STORAGE_KEY = "passportToEnglish_progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveProgress(topicId, percent) {
  const progress = loadProgress();
  const prevBest = progress[topicId] ? progress[topicId].best : 0;
  progress[topicId] = { best: Math.max(prevBest, percent), lastPlayed: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------
   HELPERS
   ------------------------------------------------------------ */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ");
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ------------------------------------------------------------
   HOME SCREEN
   ------------------------------------------------------------ */
function renderHome() {
  const grid = document.getElementById("topics-grid");
  grid.innerHTML = "";
  const progress = loadProgress();

  TOPICS.forEach((topic) => {
    const record = progress[topic.id];
    const card = el("button", "topic-card" + (record ? " completed" : ""));
    card.setAttribute("type", "button");
    card.setAttribute("aria-label", `${topic.title}: ${topic.subtitle}`);

    const numBadge = el("span", "stamp-num", String(topic.num).padStart(2, "0"));
    const iconEl = el("span", "stamp-icon", topic.icon);
    const titleEl = el("span", "stamp-title", topic.title);
    const subEl = el("span", "stamp-sub", topic.subtitle);

    card.appendChild(numBadge);
    card.appendChild(iconEl);
    card.appendChild(titleEl);
    card.appendChild(subEl);

    if (record) {
      const mark = el("span", "stamp-mark", record.best + "%");
      card.appendChild(mark);
    }

    card.addEventListener("click", () => startTopic(topic.id));
    grid.appendChild(card);
  });
}

/* ------------------------------------------------------------
   QUIZ FLOW
   ------------------------------------------------------------ */
function startTopic(topicId) {
  const bank = QUESTION_BANK[topicId];
  const size = Math.min(ROUND_SIZE, bank.length);
  state.topicId = topicId;
  state.round = shuffle(bank).slice(0, size);
  state.index = 0;
  state.score = 0;
  showScreen("quiz");
  document.getElementById("quiz-topic-title").textContent = TOPICS.find((t) => t.id === topicId).title;
  renderQuestion();
}

function currentQuestion() {
  return state.round[state.index];
}

function updateProgressBar() {
  const total = state.round.length;
  const pct = Math.round((state.index / total) * 100);
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-plane").style.left = pct + "%";
  document.getElementById("progress-label").textContent = `Pregunta ${state.index + 1} de ${total}`;
  document.getElementById("score-label").textContent = `⭐ ${state.score}`;
}

function renderQuestion() {
  state.answered = false;
  updateProgressBar();

  const q = currentQuestion();
  const container = document.getElementById("question-container");
  container.innerHTML = "";
  container.classList.remove("fade-in");

  const card = el("div", "question-card");
  const prompt = el("p", "prompt", q.prompt);
  card.appendChild(prompt);

  if (q.type === "mc") {
    const optionsWrap = el("div", "options-grid");
    shuffle(q.options).forEach((opt) => {
      const btn = el("button", "option-btn", opt);
      btn.setAttribute("type", "button");
      btn.addEventListener("click", () => handleMcAnswer(btn, opt, q));
      optionsWrap.appendChild(btn);
    });
    card.appendChild(optionsWrap);
  } else if (q.type === "fill") {
    const row = el("div", "fill-row");
    const input = el("input", "fill-input");
    input.type = "text";
    input.placeholder = "Escribe tu respuesta...";
    input.autocomplete = "off";
    input.id = "fill-input";
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") checkFillAnswer(q);
    });
    row.appendChild(input);
    card.appendChild(row);
  } else if (q.type === "order") {
    state.currentOrderAnswer = [];
    state.currentOrderPool = shuffle(q.tokens);

    const answerRow = el("div", "order-answer");
    answerRow.id = "order-answer";
    const bankRow = el("div", "order-bank");
    bankRow.id = "order-bank";

    card.appendChild(el("p", "order-label", "Tu respuesta:"));
    card.appendChild(answerRow);
    card.appendChild(el("p", "order-label", "Banco de palabras:"));
    card.appendChild(bankRow);
  }

  const feedback = el("div", "feedback-box");
  feedback.id = "feedback-box";
  card.appendChild(feedback);

  container.appendChild(card);
  requestAnimationFrame(() => container.classList.add("fade-in"));

  if (q.type === "order") {
    renderOrderPool();
  }

  const actions = document.getElementById("actions-row");
  actions.innerHTML = "";

  if (q.type === "fill") {
    const checkBtn = el("button", "btn-primary", "Comprobar");
    checkBtn.addEventListener("click", () => checkFillAnswer(q));
    actions.appendChild(checkBtn);
  } else if (q.type === "order") {
    const checkBtn = el("button", "btn-primary", "Comprobar");
    checkBtn.id = "order-check-btn";
    checkBtn.addEventListener("click", () => checkOrderAnswer(q));
    actions.appendChild(checkBtn);
  }
}

function renderOrderPool() {
  const bankRow = document.getElementById("order-bank");
  const answerRow = document.getElementById("order-answer");
  bankRow.innerHTML = "";
  answerRow.innerHTML = "";

  state.currentOrderAnswer.forEach((word, idx) => {
    const chip = el("button", "word-chip in-answer", word);
    chip.setAttribute("type", "button");
    chip.addEventListener("click", () => {
      if (state.answered) return;
      state.currentOrderPool.push(word);
      state.currentOrderAnswer.splice(idx, 1);
      renderOrderPool();
    });
    answerRow.appendChild(chip);
  });

  state.currentOrderPool.forEach((word, idx) => {
    const chip = el("button", "word-chip", word);
    chip.setAttribute("type", "button");
    chip.addEventListener("click", () => {
      if (state.answered) return;
      state.currentOrderAnswer.push(word);
      state.currentOrderPool.splice(idx, 1);
      renderOrderPool();
    });
    bankRow.appendChild(chip);
  });
}

function handleMcAnswer(btn, chosen, q) {
  if (state.answered) return;
  state.answered = true;
  const correct = chosen === q.answer;
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach((b) => {
    b.disabled = true;
    if (b.textContent === q.answer) b.classList.add("correct");
  });
  if (!correct) btn.classList.add("wrong");
  finishAnswer(correct, q);
}

function checkFillAnswer(q) {
  if (state.answered) return;
  const input = document.getElementById("fill-input");
  const value = normalize(input.value || "");
  const correct = q.answers.some((a) => normalize(a) === value);
  state.answered = true;
  input.disabled = true;
  input.classList.add(correct ? "correct" : "wrong");
  finishAnswer(correct, q, correct ? null : q.answers[0]);
}

function checkOrderAnswer(q) {
  if (state.answered) return;
  if (state.currentOrderAnswer.length !== q.tokens.length) return;
  const correct = state.currentOrderAnswer.join(" ") === q.tokens.join(" ");
  state.answered = true;
  document.querySelectorAll("#order-answer .word-chip").forEach((chip) => {
    chip.disabled = true;
    chip.classList.add(correct ? "correct" : "wrong");
  });
  document.querySelectorAll("#order-bank .word-chip").forEach((chip) => (chip.disabled = true));
  finishAnswer(correct, q, correct ? null : q.tokens.join(" "));
}

function finishAnswer(correct, q, correctText) {
  if (correct) state.score++;
  const feedback = document.getElementById("feedback-box");
  feedback.classList.add(correct ? "feedback-correct" : "feedback-wrong");
  let html = correct ? "✅ ¡Correcto!" : "❌ Incorrecto.";
  if (!correct && correctText) html += ` Respuesta: "${correctText}"`;
  if (q.tip) html += `<br><span class="tip">${q.tip}</span>`;
  feedback.innerHTML = html;

  const actions = document.getElementById("actions-row");
  actions.innerHTML = "";
  const nextBtn = el("button", "btn-primary", state.index + 1 < state.round.length ? "Siguiente →" : "Ver resultados →");
  nextBtn.addEventListener("click", nextQuestion);
  actions.appendChild(nextBtn);

  document.getElementById("score-label").textContent = `⭐ ${state.score}`;
}

function nextQuestion() {
  state.index++;
  if (state.index >= state.round.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

/* ------------------------------------------------------------
   RESULT SCREEN
   ------------------------------------------------------------ */
function showResult() {
  const total = state.round.length;
  const percent = Math.round((state.score / total) * 100);
  saveProgress(state.topicId, percent);

  showScreen("result");
  document.getElementById("result-score").textContent = `${state.score} / ${total}`;
  document.getElementById("result-percent").textContent = `${percent}%`;

  let message;
  if (percent >= 90) message = "¡Excelente! Dominas este tema. 🏆";
  else if (percent >= 70) message = "¡Muy bien hecho! Ya casi lo dominas. 🎉";
  else if (percent >= 50) message = "Vas por buen camino. ¡Sigue practicando! 💪";
  else message = "No te desanimes, repasa el tema y vuelve a intentarlo. 🌱";
  document.getElementById("result-message").textContent = message;

  const stamp = document.getElementById("result-stamp");
  stamp.classList.remove("stamp-animate");
  void stamp.offsetWidth;
  stamp.classList.add("stamp-animate");
}

/* ------------------------------------------------------------
   SCREEN NAVIGATION
   ------------------------------------------------------------ */
function showScreen(name) {
  state.screen = name;
  document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden"));
  document.getElementById(`screen-${name}`).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  renderHome();
  showScreen("home");
}

/* ------------------------------------------------------------
   INIT
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  renderHome();

  const params = new URLSearchParams(window.location.search);
  const topicParam = params.get("topic");
  if (topicParam && QUESTION_BANK[topicParam]) {
    startTopic(topicParam);
  }

  document.getElementById("btn-back-home").addEventListener("click", goHome);
  document.getElementById("btn-retry").addEventListener("click", () => startTopic(state.topicId));
  document.getElementById("btn-result-home").addEventListener("click", goHome);
});

document.getElementById("btn-reset-progress").addEventListener("click", () => {
  const confirmar = confirm("¿Seguro que quieres reiniciar TODO el progreso?");

  if (!confirmar) return;

  localStorage.removeItem("passportToEnglish_progress");

  alert("Progreso reiniciado correctamente");

  location.reload();
});