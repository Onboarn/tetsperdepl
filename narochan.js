
const quizData = [
    {
        question: "1. В каком регионе (области) Беларуси расположена основная часть Национального парка «Нарочанский»?",
        answers: ["а) В Витебской области", "б) В Гродненской области", "б) В Гродненской области", "г) В Брестской области"],
        correct: 2
    },
    {
        question: "2. Какое озеро, являющееся самым большим по площади в Беларуси, дало название парку?",
        answers: [
            "а) Освейское",
            "б) Свитязь",
            "в) Нарочь",
            "г) Червоное"
        ],
        correct: 2
    },
    {
        question: "3. Какое неофициальное поэтичное название закрепилось за регионом, где находится национальный парк?",
        answers: ["а) Белорусская Амазония", "б) Синеокая жемчужина (или край Белорусского Поозерья)", "в) Полесские джунгли", "г) Страна каменных курганов"],
        correct: 1
    },
    {
        question: "4. Какая уникальная группа из 14 мелких и глубоких лесных озер на территории парка славится своим живописным рельефом?",
        answers: ["а) Браславские озера", "б) Голубые озера", "в) Сорочанские озера", "г) Ушачские озера"],
        correct: 1
    },
    {
        question: "5. Какое направление является главным для Нарочанского региона со времен СССР и до наших дней?",
        answers: ["а) Тяжелая промышленность и добыча руды", "б) Курортно-санаторное лечение и оздоровление", "в) Интенсивное лесозаготовительное производство", "г) Крупномасштабное промышленное рыболовство"],
        correct: 1
    },
    {
        question: "6. Какая редкая, ценная и хищная рыба, похожая на змею, является символом и живым брендом нарочанских водоемов?",
        answers: ["а) Щука", "б) Сом обыкновенный", "в) Европейский угорь", "г) Форель ручьевая"],
        correct: 2
    },
    {
        question: "7. Какой уникальный рукотворный объект, где собраны сотни видов лекарственных, пряных и редких растений, открыт для туристов в парке?",
        answers: ["а) Сафари-парк диких копытных", "б) Дендрологический сад имени С. А. Гомзы и «Аптекарский сад»", "в) Тропическая оранжерея орхидей", "г) Подземный спелеокомпликс"],
        correct: 1
    },
    {
        question: "8. Какая птица, занесенная в Красную книгу Беларуси и являющаяся символом чистоты водоемов, гнездится на озерах парка?",
        answers: ["а) Лебедь-шипун", "б) Розовый пеликан", "в) Черный гриф", "г) Императорский пингвин"],
        correct: 0
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
        id: "f",
        x: 40,
        y: 57,
        iconUrl: "image/v.png",
        title: "Озеро Нарочь и край Белорусского Поозерья",
        summary1: "Подробнее",
        text: "Национальный парк «Нарочанский» расположен на северо-западе Беларуси, преимущественно в Мядельском районе Минской области. Этот живописный регион называют Белорусским Поозерьем или «Синеокой жемчужиной». Главным элементом парка является озеро Нарочь — самый большой по площади естественный водоем страны (около 80 квадратных километров). Котловина озера сформировалась в результате таяния и отступления мощного Валдайского ледника. Озеро обладает уникальным гидрологическим режимом: вода в нем очень медленно обновляется, благодаря чему имеет высокую прозрачность и чистоту. Нарочь окружена живописными песчаными пляжами и холмами, покрытыми вековыми сосновыми лесами, что делает этот ландшафтный комплекс одним из красивейших в Восточной Европе.",
    },
    {
        id: "ff",
        x: 68,
        y: 72,
        iconUrl: "image/v.png",
        title: "Природный комплекс «Голубые озера»",
        summary1: "Подробнее",
        text: "Одной из самых ярких и экологически ценных зон парка является ландшафтный заказник «Голубые озера» (Балдукская группа). Это компактная система из 14 мелких, но необычайно глубоких лесных озер, спрятанных среди крутых моренных холмов и глубоких оврагов с перепадами высот до 50 метров. Такие озера, как Балдук, Глубля и Глубелька, поражают своей прозрачностью и необычным цветом воды — от изумрудного до глубокого бирюзового. Рельеф здесь настолько пересеченный и необычный для равнинной Беларуси, что эту местность часто называют «Белорусской Швейцарией». На территории Голубых озер оборудованы экологические тропы, которые позволяют туристам увидеть редкие виды таёжных растений, не нарушая хрупкую экосистему ледникового рельефа.",
    },
    {
        id: "fff",
        x: 55,
        y: 18,
        iconUrl: "image/v.png",
        title: "Символы живой природы: угорь и лебедь-шипун",
        summary1: "Подробнее",
        text: "Ихтиофауна и орнитофауна Нарочанского края тесно связаны с чистотой местных вод. Настоящим живым брендом и символом нарочанских глубин является европейский угорь. Эта удивительная хищная рыба, внешне похожая на змею, обладает сложнейшим жизненным циклом. Угорь рождается в Саргассовом море на другом конце Атлантики, после чего его личинки годами дрейфуют к берегам Европы и поднимаются по рекам в озера Нарочанской группы, где растут и живут много лет. На водной глади Нарочи главным украшением служит лебедь-шипун. Долгое время эта грациозная птица была редким гостем и заносилась в Красную книгу, но благодаря строгому заповедному режиму лебеди стали полноправными и многочисленными обитателями нарочанских курортных зон.",
    },
    {
        id: "ffff",
        x: 15,
        y: 29,
        iconUrl: "image/v.png",
        title: "Курортная столица Беларуси и оздоровление",
        summary1: "Подробнее",
        text: "В отличие от других национальных парков, Нарочанский имеет ярко выраженную курортно-санаторную специфику. Развитие региона как здравницы началось еще в первой половине XX века, а в советские годы Курортный поселок Нарочь стал всесоюзной базой отдыха. Главное богатство парка, помимо чистейшего воздуха сосновых боров — это минеральные лечебные воды и сапропелевые грязи. На побережье озера построены десятки санаториев, детских оздоровительных центров и туристических баз. Национальный парк успешно совмещает строгую охрану диких зон (где запрещена любая хозяйственная деятельность) с регулируемым медицинским и экологическим туризмом, принимая сотни тысяч отдыхающих ежегодно.",
    },
    {
        id: "fffff",
        x: 20,
        y: 37,
        iconUrl: "image/v.png",
        title: "Рукотворное чудо: Дендросад и «Аптекарский сад»",
        summary1: "Подробнее",
        text: "Для сохранения редких видов флоры и привлечения туристов на территории парка созданы уникальные ботанические объекты. На берегу озера Нарочь раскинулся Дендрологический сад имени С. А. Гомзы, где собрана коллекция из более чем 400 видов деревьев и кустарников со всех континентов мира. Другим популярным объектом стал экскурсионно-туристический комплекс «Аптекарский сад». Он создан по подобию старинных монастырских садов. Здесь на специально оформленных плантациях выращивают сотни видов лекарственных, пряных, ароматических и редких растений. Туристы могут не только прогуляться среди целебных трав, но и продегустировать уникальные фиточаи, собранные вручную в экологически чистой зоне парка.",
    }

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