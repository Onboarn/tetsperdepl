
const quizData = [
    {
        question: "1. На территории каких областей Беларуси расположен Национальный парк «Беловежская пуща»?",
        answers: ["а) Минской и Гродненской", "б) Гомельской и Брестской", "в) Брестской и Гродненской", "г) Витебской и Могилевской"],
        correct: 2
    },
    {
        question: "2. Каким престижным международным статусом обладает Беловежская пуща?",
        answers: [
            "а) Морской биосферный заповедник",
            "б) Объект Всемирного наследия ЮНЕСКО",
            "в) Памятник археологии палеолита",
            "г) Закрытая зона антропогенного контроля"
        ],
        correct: 1
    },
    {
        question: "3. Какое величественное животное является главным символом, «царем» Беловежской пущи и самым крупным млекопитающим Европы?",
        answers: ["а) Бурый медведь", "б) Благородный олень", "в) Зубр европейский", "г) Лось"],
        correct: 2
    },
    {
        question: "4. Какая известная сказочная туристическая локация, открытая круглый год, находится в самом сердце Беловежской пущи?",
        answers: ["а) Замок Снежной Королевы", "б) Поместье Белорусского Деда Мороза", "в) Избушка на курьих ножках", "г) Терем Царевны-Лягушки"],
        correct: 1
    },
    {
        question: "5. Какое историческое событие мирового масштаба произошло в декабре 1991 года в правительственной резиденции «Вискули» на территории пущи?",
        answers: ["а) Подписание мирного договора по итогам Второй мировой войны", "б) Подписание Беловежских соглашений о прекращении существования СССР", "в) Принятие первой Конституции Республики Беларусь", "г) Создание Лиги Наций"],
        correct: 1
    },
    {
        question: "6. Какое дерево-великан, чей возраст превышает 600 лет, является живым памятником природы в пуще?",
        answers: ["а) Царь-Береза", "б) Патриарх-Сосна", "в) Царь-Дуб", "г) Вековая Секвойя"],
        correct: 2
    },
    {
        question: "7. Какая историческая оборонительная башня XIII века (часто ассоциируемая с «Белой вежей») находится в городе Каменец по пути к парку?",
        answers: ["а) Мирский замок", "б) Лидская башня", "в) Каменецкая вежа", "г) Кревский донжон"],
        correct: 2
    },
    {
        question: "8. Какая главная экологическая особенность отличает леса Беловежской пущи от большинства других лесов Европы?",
        answers: ["а) Здесь растут преимущественно тропические лианы", "б) Все деревья были высажены вручную в середине XX века", "в) Наличие больших массивов реликтового первобытного леса", "г) Лес состоит только из хвойных пород деревьев"],
        correct: 2
    },
];

const questionEl = document.getElementById('question');
const answerListEl = document.getElementById('answer-list');
const submitBtn = document.getElementById('submit');
const counterEl = document.getElementById('quiz-counter');
const barFillEl = document.getElementById('quiz-bar-fill');

let currentQuiz = 0;
let score = 0;
let answered = false;

loadQuiz();

function updateProgress(done) {
    if (counterEl) counterEl.textContent = `Вопрос ${currentQuiz + 1} из ${quizData.length}`;
    if (barFillEl) barFillEl.style.width = (done / quizData.length * 100) + '%';
}

function loadQuiz() {
    deselectAnswers();
    answered = false;
    answerListEl.classList.remove('answered');
    submitBtn.textContent = 'Ответить';
    updateProgress(currentQuiz);

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;

    answerListEl.innerHTML = '';

    currentQuizData.answers.forEach((ansText, idx) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="radio" name="answer" id="ans${idx}" value="${idx}">
            <label for="ans${idx}">${ansText}</label>
        `;

        answerListEl.appendChild(li);
    });
}

function getSelected() {
    const checked = document.querySelector('input[name="answer"]:checked');
    return checked ? Number(checked.value) : undefined;
}

function deselectAnswers() {
    document.querySelectorAll('input[name="answer"]').forEach(el => el.checked = false);
    document.querySelectorAll('#answer-list li').forEach(li => li.classList.remove('selected'));
}

answerListEl.addEventListener('change', function (e) {
    if (e.target.name === 'answer') {
        document.querySelectorAll('#answer-list li').forEach(li => {
            li.classList.remove('selected');
        });
        e.target.closest('li').classList.add('selected');
    }
});

function goNext() {
    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        document.getElementById('quiz').innerHTML = `
            <div class="quiz-complete">
                <h2>Вы ответили на ${score} из ${quizData.length} вопросов!</h2>
                <button class="restart-btn" onclick="location.reload()">Пройти заново</button>
            </div>
        `;
    }
}

submitBtn.addEventListener('click', () => {
    if (answered) {
        goNext();
        return;
    }

    const answer = getSelected();

    if (answer === undefined) {
        alert("Пожалуйста, выберите вариант ответа!");
        return;
    }

    answered = true;
    const correct = quizData[currentQuiz].correct;

    if (answer === correct) {
        score++;
    }

    answerListEl.classList.add('answered');
    answerListEl.querySelectorAll('li').forEach((li, idx) => {
        li.querySelector('input').disabled = true;
        if (idx === correct) {
            li.classList.add('correct');
        } else if (idx === answer) {
            li.classList.add('wrong');
        }
    });

    updateProgress(currentQuiz + 1);
    submitBtn.textContent = currentQuiz === quizData.length - 1 ? 'Показать результат' : 'Следующий вопрос';
});



const hotspots = [
    {
        id: "r",
        x: 65,
        y: 71.5,
        iconUrl: "image/v.png",
        title: "Последний первобытный лес Европы и статус ЮНЕСКО",
        summary1: "Подробнее",
        text: "Национальный парк «Беловежская пуща» раскинулся на юго-западе Беларуси, занимая территорию Брестской (Каменецкий и Пружанский районы) и Гродненской (Свислочский район) областей, а также продолжается на территории Польши. Пуща — это древнейший заповедный лес в Европе. Ее главная экологическая особенность — наличие огромных массивов реликтового первобытного леса. В то время как практически все леса Европы в прошлые века вырубались и засаживались человеком заново, Беловежская пуща веками развивалась по естественным законам. За эту исключительную экологическую ценность парк включен в список Всемирного наследия ЮНЕСКО. Здесь сохранились уникальные биоценозы, гигантские деревья и виды млекопитающих, исчезнувшие на остальной части континента.",
    },
    {
        id: "rr",
        x: 66,
        y: 45,
        iconUrl: "image/v.png",
        title: "Зубр — царь пущи и символ спасения вида",
        summary1: "Подробнее",
        text: "Главным символом, «царем» Беловежской пущи и самым крупным млекопитающим европейского континента является европейский зубр. Судьба этого животного трагична: к началу XX века из-за браконьерства и войн зубры были полностью истреблены в дикой природе. Последний дикий беловежский зубр был убит в пуще в 1921 году. Спасти вид удалось буквально в последний момент благодаря нескольким десяткам особей, сохранившихся в зоопарках мира. В Беловежской пуще была развернута колоссальная научная работа по разведению и возвращению зубров в дикую природу. Сегодня популяция беловежских зубров полностью восстановлена, они живут большими вольными стадами и больше не находятся под угрозой мгновенного вымирания.",
    },
    {
        id: "rrr",
        x: 65,
        y: 57,
        iconUrl: "image/v.png",
        title: "Деревья-патриархи и феномен Царь-Дуба",
        summary1: "Подробнее",
        text: "Леса Беловежской пущи знамениты своими гигантскими старовозрастными деревьями, возраст многих из которых исчисляется веками. Самым известным живым памятником природы является знаменитый Царь-Дуб. Возраст этого лесного исполина превышает 600 лет. Его высота составляет 46 метров, а диаметр ствола — более двух метров. Царь-Дуб рос здесь еще во времена Великого княжества Литовского и помнит королевские охоты Ягайло и Витовта. Помимо дубов, в пуще растут сосны-патриархи, вековые ели и ясени, создавая уникальный многоярусный лесной полог, под защитой которого находят убежище сотни видов мхов, лишайников и редких грибов-трутовиков.",
    },
    {
        id: "rrrr",
        x: 45,
        y: 64,
        iconUrl: "image/v.png",
        title: "Историческое наследие: от Каменецкой вежи до Вискулей",
        summary1: "Подробнее",
        text: "История Беловежской пущи неразрывно связана с историей Европы. У самых ворот в национальный парк, в городе Каменец, высится знаменитая Каменецкая вежа — оборонительная башня-донжон XIII века. Из-за ошибочных исторических описаний её долгое время называли «Белой вежей», от чего, по одной из версий, и произошло название самой пущи. В самом сердце леса находится правительственная резиденция «Вискули». В декабре 1991 года здесь произошло событие мирового масштаба: лидеры Беларуси, России и Украины подписали знаменитые Беловежские соглашения, которые юридически зафиксировали прекращение существования СССР и ознаменовали создание Содружества Независимых Государств (СНГ).",
    },
    {
        id: "rrrrr",
        x: 65,
        y: 71.5,
        iconUrl: "image/v.png",
        title: "Сказка круглый год: Поместье Деда Мороза",
        summary1: "Подробнее",
        text: "Беловежская пуща — это не только строгий научный резерват, но и один из главных центров семейного туризма в Беларуси. В 2003 году на территории парка открылась уникальная сказочная локация — Поместье Белорусского Деда Мороза. Усадьба раскинулась на площади около 15 гектаров и работает круглый год. Все объекты поместья — Терем Деда Мороза, Скарбница, Волшебная мельница — выполнены искусными мастерами из резного дерева. Территорию украшают многочисленные деревянные скульптуры сказочных персонажей. Зимой усадьбу подсвечивают тысячи огней, а летом туристы могут прогуляться по волшебному лесу и увидеть Снегурочку, Матушку Зиму и загадать желание у столетней живой ели.",
    },

];

const layer = document.querySelector(".hotspot-layer");
const popup = document.querySelector(".map-popup");
const overlay = document.querySelector(".popup-overlay");
const popupTitle = document.querySelector(".popup-title");
const popupText = document.querySelector(".popup-text");
const popupClose = document.querySelector(".popup-close");
const popupDetails1 = document.querySelector(".popup-details1");
const popupDetails2 = document.querySelector(".popup-details2");
const popupSummary1 = document.querySelector(".popup-summary1");
const popupSummary2 = document.querySelector(".popup-summary2");
const popupVideo = document.querySelector(".popup-video");

let activeId = null;

function stopVideo() {
    if (!popupVideo) return;
    popupVideo.pause();
    popupVideo.removeAttribute("src");
    popupVideo.load();
    popupVideo.hidden = true;
}

function renderMarkers() {
    if (!layer) return;
    layer.innerHTML = "";

    hotspots.forEach((spot, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "marker";
        btn.dataset.id = spot.id;
        btn.setAttribute("aria-label", (spot.title || "").replace("{{img}}", "") || "Метка");
        btn.style.left = spot.x + "%";
        btn.style.top = spot.y + "%";
        btn.style.setProperty("--i", index);

        const img = document.createElement("img");
        img.src = spot.iconUrl;
        img.alt = "";
        btn.appendChild(img);

        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            openPopup(spot.id);
        });

        layer.appendChild(btn);
    });
}

function getSpot(id) {
    return hotspots.find((spot) => spot.id === id);
}

function fillTitle(spot) {
    if (!popupTitle) return;

    const icon = spot.titleImg
        ? '<img class="popup-inline" src="' + spot.titleImg + '" alt="">'
        : "";

    if (spot.title && spot.title.includes("{{img}}") && icon) {
        popupTitle.innerHTML = spot.title.replace("{{img}}", icon);
    } else {
        popupTitle.textContent = (spot.title || "").replace("{{img}}", "");
    }
}

function openPopup(id) {
    const spot = getSpot(id);
    if (!spot || !popup) return;

    if (activeId === id) {
        closePopup();
        return;
    }

    activeId = id;
    stopVideo();
    fillTitle(spot);

    if (popupSummary1) {
        popupSummary1.textContent = spot.summary1 || "Подробнее";
    }
    if (popupText) {
        popupText.textContent = spot.text || "";
    }
    if (popupDetails1) {
        popupDetails1.open = false;
        popupDetails1.hidden = !spot.text;
    }

    if (popupSummary2) {
        popupSummary2.textContent = spot.summary2 || "Видео";
    }
    if (popupVideo && spot.video) {
        popupVideo.src = spot.video;
        popupVideo.hidden = false;
    }
    if (popupDetails2) {
        popupDetails2.open = false;
        popupDetails2.hidden = !spot.video;
    }

    popup.hidden = false;
    if (overlay) overlay.hidden = false;

    setTimeout(function () {
        placePopupNearMarker(id);
    }, 0);

    highlightActiveMarker();
}

function isMobileView() {
    return window.innerWidth < 900;
}

function placePopupNearMarker(id) {
    if (!popup) return;

    if (isMobileView()) {
        popup.style.left = "50%";
        popup.style.right = "auto";
        popup.style.top = "auto";
        popup.style.bottom = "16px";
        popup.style.transform = "translateX(-50%)";
        popup.style.width = "calc(100vw - 24px)";
        popup.style.maxWidth = "none";
        return;
    }

    popup.style.transform = "";
    popup.style.right = "auto";
    popup.style.bottom = "auto";
    popup.style.width = "";
    popup.style.maxWidth = "";

    const marker = layer.querySelector('.marker[data-id="' + id + '"]');
    if (!marker) return;

    const r = marker.getBoundingClientRect();
    const gap = 12;

    let left = r.right + gap;
    let top = r.top + r.height / 2 - popup.offsetHeight / 2;

    if (left + popup.offsetWidth > window.innerWidth - 8) {
        left = r.left - gap - popup.offsetWidth;
    }
    if (left < 8) left = 8;
    if (top + popup.offsetHeight > window.innerHeight - 8) {
        top = window.innerHeight - popup.offsetHeight - 8;
    }
    if (top < 8) top = 8;

    popup.style.left = left + "px";
    popup.style.top = top + "px";
}

function closePopup() {
    activeId = null;
    if (popup) popup.hidden = true;
    if (overlay) overlay.hidden = true;
    stopVideo();
    highlightActiveMarker();
}

function highlightActiveMarker() {
    if (!layer) return;
    layer.querySelectorAll(".marker").forEach((btn) => {
        const isActive = btn.dataset.id === activeId;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-expanded", String(isActive));
    });
}

if (popupClose) {
    popupClose.addEventListener("click", function (event) {
        event.stopPropagation();
        closePopup();
    });
}
if (overlay) overlay.addEventListener("click", closePopup);
if (popup) {
    popup.addEventListener("click", function (event) {
        event.stopPropagation();
    });
}
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closePopup();
});

if (popupDetails1) {
    popupDetails1.addEventListener("toggle", function () {
        if (activeId) placePopupNearMarker(activeId);
    });
}
if (popupDetails2) {
    popupDetails2.addEventListener("toggle", function () {
        if (activeId) placePopupNearMarker(activeId);
    });
}

renderMarkers();