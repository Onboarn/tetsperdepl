
const quizData = [
    {
        question: "1. В какой области Беларуси расположен Национальный парк «Припятский»?",
        answers: ["а) В Брестской области", "б) В Гомельской области", "в) В Минской области", "г) В Витебской области"],
        correct: 1
    },
    {
        question: "2. В каком году Припятский ландшафтно-гидрологический заповедник был реорганизован в Национальный парк?",
        answers: [
            "а) В 1969 году",
            "б) В 1986 году",
            "в) В 1996 году",
            "г) В 2010 году"
        ],
        correct: 2
    },
    {
        question: "3. Какая река является главной водной артерией парка и определяет его природный ландшафт?",
        answers: ["а) Днепр", "б) Березина", "в) Припять", "г) Неман"],
        correct: 2
    },
    {
        question: "4. Какое поэтичное неофициальное название закрепилось за этим регионом благодаря его дикой водной природе и затопленным лесам?",
        answers: ["а) Белорусская Швейцария", "б) Белорусская Амазония", "в) Край серых валунов", "г) Полесская Скандинавия"],
        correct: 1
    },
    {
        question: "5. Какое уникальное растительное сообщество является визитной карточкой поймы Припяти?",
        answers: ["а) Вековые ельники-черничники", "б) Старовозрастные пойменные дубравы", "в) Сухие березовые рощи", "г) Багульниковые сосняки"],
        correct: 1
    },
    {
        question: "6. Где находится современный административный и туристический центр парка, включая Музей природы?",
        answers: ["а) В городе Житковичи", "б) В древнем городе Туров", "в) В агрогородке Лясковичи", "г) В городе Петриков"],
        correct: 2
    },
    {
        question: "7. Какое международное значение имеют водно-болотные угодья парка?",
        answers: ["а) Там добывают редкие минералы для космонавтики", "б) Это ключевая орнитологическая территория (Рамсарское угодье) для миграции птиц", "в) Это единственное место в Европе, где зимуют фламинго", "г) Здесь проходят испытания глубоководной техники"],
        correct: 1
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
        id: "hall",
        x: 18.0,
        y: 36.0,
        iconUrl: "image/v.png",
        title: "Птичий рай: международное орнитологическое значение",
        summary1: "Подробнее",
        text: "Долина Припяти имеет исключительное международное экологическое значение. Водно-болотные угодья парка включены в глобальный список Рамсарских угодий.Этот статус присваивается территориям, которые служат ключевыми местами обитания водоплавающих птиц. «Припятский» называют «птичьим вокзалом» Европы: во время весенних и осенних миграций здесь останавливаются на пролет, отдых и кормежку сотни тысяч пернатых — гуси, кулики, крачки, свиязи и турухтаны.Разливы реки обеспечивают их обильной пищей.Кроме того, в глухих, труднодоступных лесах парка гнездятся редчайшие скрытные виды.Главным символом нетронутой полесской чащи является черный аист.В отличие от белого аиста, он панически избегает соседства с человеком, строя огромные гнезда на вершинах старых деревьев вблизи глухих болот.",
    },
    {
        id: "as",
        x: 13,
        y: 45,
        iconUrl: "image/v.png",
        title: "Пойменные дубравы и флора полесских болот",
        summary1: "Подробнее",
        text: "Флора национального парка уникальна благодаря мозаичности рельефа. Символом и визитной карточкой «Припятского» являются старовозрастные пойменные дубравы. Эти вековые леса приспособлены к длительному затоплению. Когда весенний паводок заливает могучие стволы дубов великанов, создается полное ощущение пребывания в затопленных тропических джунглях. На более возвышенных участках — песчаных дюнах и грядах, сформированных древним ледником — доминирует сосна обыкновенная, образуя сухие, светлые боры. В низинах же раскинулись бескрайние переходные и верховые болота, где можно встретить редчайшие реликтовые растения. Среди них — росянка промежуточная, уникальное насекомоядное растение из Красной книги, которое ловит мелких насекомых своими клейкими листьями, компенсируя недостаток азота в болотной почве.",

    },
    {
        id: "gs",
        x: 39,
        y: 43,
        iconUrl: "image/v.png",
        title: "Экосистема «Белорусской Амазонии» и пойма Припяти",
        summary1: "Подробнее",
        text: "Река Припять — главная жизненная артерия юга Беларуси, сформировавшая уникальный ландшафтный комплекс, известный во всей Европе как «Белорусская Амазония». Национальный парк расположен в самом центре Белорусского Полесья — на территории Житковичского, Petриковского и Лельчицкого районов Гомельской области.Главная природная особенность этих мест — масштабные весенние разливы.В период таяния снегов Припять и её многочисленные притоки выходят из берегов, затапливая пойму на ширину до 15 километров.Вода держится на лугах и в лесах месяцами, создавая гигантский лабиринт из протоков, стариц, островов и временно затопленных лесных массивов.Этот гидрологический режим определяет жизнь всех местных обитателей и делает ландшафт парка уникальным эталоном первозданной природы равнинной Европы.",
    },
    {
        id: "ia",
        x: 90,
        y: 7,
        iconUrl: "image/v.png",
        title: "История, бортничество и туристический центр Лясковичи",
        summary1: "Подробнее",
        text: "Припятский государственный ландшафтно-гидрологический заповедник был основан в 1969 году. Однако в 1996 году его реорганизовали в Национальный парк с целью развития экологического туризма и просвещения. Главным административным, культурным и туристическим центром парка стал агрогородок Лясковичи (Житковичский район). Сегодня здесь расположены современная штаб-квартира, интерактивный Музей природы и гостиничные комплексы. Одним из культурных брендов парка является сохранение бортничества — древнейшего промысла Полесья по сбору меда диких лесных пчел из искусственных дупел (бортей), которые выбивают прямо в стволах живых деревьев на большой высоте. Здесь до сих пор обитает чистая популяция полесской темной лесной пчелы, устойчивой к суровым зимам.",
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