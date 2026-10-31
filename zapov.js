const quizData = [
    {
        question: "1. На территории каких областей Беларуси расположен Березинский заповедник?",
        answers: ["а) Минской и Брестской", "б) Гомельской и Могилевской", "в) Витебской и Минской", "г) Гродненской и Брестской"],
        correct: 2
    },
    {
        question: "2. Каким уникальным статусом, полученным в 1979 году под эгидой ЮНЕСКО, обладает этот заповедник (единственный в Беларуси)?",
        answers: [
            "а) Объект геологического наследия",
            "б) Биосферный заповедник",
            "в) Памятник ландшафтной архитектуры",
            "г) Морской резерват"
        ],
        correct: 1
    },
    {
        question: "3. Какое крупное полуводное грызущее млекопитающее стало причиной создания заповедника в 1925 году, когда этот вид находился на грани полного исчезновения?",
        answers: ["а) Выхухоль", "б) Выдра", "в) Речной бобр", "г) Ондатра"],
        correct: 2
    },
    {
        question: "4. На территории Березинского заповедника находится уникальный водораздел. Бассейны каких двух морей здесь соприкасаются?",
        answers: ["а) Балтийского и Белого", "б) Балтийского и Чёрного", "в) Чёрного и Каспийского", "г) Баренцева и Средиземного"],
        correct: 1
    },
    {
        question: "5. Какое неофициальное звание носит Березинский заповедник среди экологов благодаря тому, что на его территории одновременно и стабильно обитает вся «большая пятёрка» крупных европейских хищников и копытных?",
        answers: ["а) Белорусская тундра", "б) Край вечной мерзлоты", "в) Музей дикой природы под открытым небом", "г) Полесские джунгли"],
        correct: 2
    },
    {
        question: "6. Какая крупная дикая кошка, занесённая в Красную книгу, успешно охотится в глухих лесах Березинского заповедника?",
        answers: ["а) Амурский тигр", "б) Европейская рысь", "в) Кавказский леопард", "г) Снежный барс"],
        correct: 1
    },
    {
        question: "7. Какой уникальный тип экосистем занимает около 60% всей территории заповедника, являясь природным фильтром и регулятором климата?",
        answers: ["а) Песчаные пустыни", "б) Скалистые горы", "в) Естественные болота (верховые, низинные и переходные)", "г) Искусственные водохранилища"],
        correct: 2
    },
    {
        question: "8. Какой редкий лесной великан и символ белорусских лесов, весящий до 800 кг, был успешно расселён в заповеднике и сейчас обитает там на воле?",
        answers: ["а) Буйвол", "б) Овцебык", "в) Зубр европейский", "г) Благородный як"],
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
        id: "b",
        x: 15,
        y: 71.5,
        iconUrl: "image/v.png",
        title: "Высший ранг охраны и статус биосферного резервата",
        summary1: "Подробнее",
        text: "Березинский биосферный заповедник расположен на севере Беларуси, на стыке Витебской (Лепельский и Докшицкий районы) и Минской (Борисовский район) областей. В отличие от национальных парков, где разрешен массовый туризм, заповедник имеет высший ранг охраны. Его главная задача — абсолютное сохранение дикой природы в первозданном виде и проведение научных исследований. В 1979 году Березинский получил престижный международный статус Биосферного резервата ЮНЕСКО. Это означает, что местная природа признана глобальным эталоном естественных экосистем умеренной климатической зоны Европы.",
    },
    {
        id: "bb",
        x: 25,
        y: 31.5,
        iconUrl: "image/v.png",
        title: "Спасение речного бобра: история основания",
        summary1: "Подробнее",
        text: "Березинский заповедник — старейшая охраняемая территория современной Беларуси, основанная в 1925 году. Поводом для его создания стала критическая экологическая ситуация: к началу XX века из-за неконтролируемой охоты на территории всей Европы практически полностью исчезли речные бобры. Ученые обнаружили последнюю уцелевшую популяцию бобров в глухих верховьях реки Березины. Чтобы спасти этих уникальных полуводных грызунов от полного истребления, правительство объявило эти земли неприкосновенными. Благодаря созданию заповедника численность бобров полностью восстановилась.",
    },
    {
        id: "bbb",
        x: 20,
        y: 11.5,
        iconUrl: "image/v.png",
        title: "Болота Березинского — легкие Европы",
        summary1: "Подробнее",
        text: "Около 60% территории Березинского заповедника занимают естественные болота — верховные, низинные и переходные. Это уникальный болотный массив, который никогда не подвергался осушению (мелиорации). Местные болота называют «легкими Европы» и природным фильтром глобального значения. Они аккумулируют колоссальные объемы пресной воды, регулируют локальный климат и поглощают углекислый газ. На верховых сфагновых болотах сформировался суровый микроклимат, где растут карликовые березы, клюква и редкие виды орхидей.",
    },
    {
        id: "bbbb",
        x: 25,
        y: 91.5,
        iconUrl: "image/v.png",
        title: "Великий водораздел двух морей",
        summary1: "Подробнее",
        text: "Через территорию Березинского заповедника проходит уникальная географическая граница — Главный европейский водораздел. Здесь соприкасаются бассейны двух разных морей — Балтийского и Чёрного. Главная река заповедника — Березина — относится к бассейну Днепра и несет свои воды на юг, в Чёрное море. В то же время, в северной и восточной частях заповедника берут начало мелкие реки и ручьи, которые впадают в бассейн Западной Двины и текут на север, в Балтийское море. Это гидрологическое положение делает заповедник важнейшим узлом для мониторинга климатических изменений.",
    },
    {
        id: "bbbbb",
        x: 20,
        y: 71.5,
        iconUrl: "image/v.png",
        title: "Большая европейская пятерка хищников и копытных",
        summary1: "Подробнее",
        text: "Березинский заповедник называют «музеем дикой природы под открытым небом», так как это единственное место в Европе, где на одной территории одновременно и стабильно обитает вся «большая пятерка» крупных европейских млекопитающих. В местных глухих лесах живут и успешно размножаются: бурый медведь, скрытная европейская рысь, волк, а также лесные великаны — лось и переселенный сюда в рамках программ восстановления европейский зубр. Высокая плотность крупных хищников говорит об абсолютном здоровье экосистемы.",
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