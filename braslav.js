
const quizData = [
    {
        question: "1. В какой области Беларуси расположен Национальный парк «Браславские озера»?",
        answers: ["а) В Минской области", "б) В Гродненской области", "в) В Витебской области", "г) В Могилевской области"],
        correct: 2
    },
    {
        question: "2. Какой древний ледник, отступивший тысячи лет назад, сформировал уникальный холмисто-озерный рельеф этого парка?",
        answers: [
            "а) Днепровский ледник",
            "б) Поозерский (Валдайский) ледник",
            "в) Сожский ледник",
            "г) Березинский ледник"
        ],
        correct: 1
    },
    {
        question: "3. Какое озеро, входящее в состав парка, является самым глубоким в Браславской группе и славится своей прозрачной водой?",
        answers: ["а) Дривяты", "б) Снуды", "в) Волосо Южный", "г) Струсто"],
        correct: 2
    },
    {
        question: "4. Какая знаменитая гора (холм) высотой около 174 метров является лучшей смотровой площадкой парка, откуда открывается панорамный вид сразу на несколько озер?",
        answers: ["а) Лысая гора", "б) Гора Маяк", "в) Замковая гора", "г) Дзержинская гора"],
        correct: 1
    },
    {
        question: "5. Какое озеро Браславской группы является самым большим по площади и именно на его берегу расположен административный центр парка и сам город Браслав?",
        answers: ["а) Дривяты", "б) Неспиш", "в) Потех", "г) Цно"],
        correct: 0
    },
    {
        question: "6. Чем уникален остров Чайчин на озере Струсто, который очень популярен среди водных туристов?",
        answers: ["а) Там находится действующий вулкан", "б) На нем есть собственное маленькое внутреннее озеро", "в) Там круглый год живут дикие зубры", "г) Остров полностью состоит из белого морского песка"],
        correct: 1
    },
    {
        question: "7. Какой редкий хищник из семейства кошачьих, занесенный в Красную книгу Беларуси, обитает в глухих лесных массивах национального парка?",
        answers: ["а) Амурский тигр", "б) Лесной леопард", "в) Европейская рысь", "г) Степной манул"],
        correct: 2
    },
    {
        question: "8. Какой популярный вид экологического и активного туризма наиболее развит на Браславских озерах благодаря их разветвленной и соединенной структуре?",
        answers: ["а) Альпинизм и горные лыжи", "б) Водные походы на байдарках, каяках и лодках", "в) Глубоководный дайвинг с акулами", "г) Спелеотуризм (исследование пещер)"],
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
        id: "a",
        x: 58,
        y: 25,
        iconUrl: "image/v.png",
        title: "Озерное ожерелье Витебского края",
        summary1: "Подробнее",
        text: "Национальный парк «Браславские озера» расположен на самом северо-западе Беларуси, в Браславском районе Витебской области, непосредственно у границ с Литвой и Латвией. Этот край представляет собой уникальное «озерное ожерелье», состоящее из десятков крупных и мелких водоемов, соединенных между собой узкими протоками, ручьями и речушками. Административным центром парка является древний город Браслав, раскинувшийся на холмистом перешейке между озерами. Браславщина славится своей мозаичной структурой ландшафта, где водная гладь чередуется с высокими холмами, сосновыми перелесками и верховыми болотами, создавая неповторимый по красоте панорамный пейзаж.",
    },
    {
        id: "aa",
        x: 52,
        y: 60,
        iconUrl: "image/v.png",
        title: "Наследие ледника: Поозерское оледенение",
        summary1: "Подробнее",
        text: "Современный рельеф Браславского края — это классический результат деятельности мощного древнего ледника. Около 15–18 тысяч лет назад по этой территории проходила граница Поозерского (Валдайского) ледника. Когда колоссальная масса льда начала таять и отступать на север, гигантские ледяные глыбы выпахивали глубокие котловины и оставляли после себя груды песка, глины и валунов. Так сформировался уникальный холмисто-моренный рельеф. Огромные озерные чаши заполнились чистейшей талой водой, а наносы земли образовали крутые гряды, камы и моренные холмы, которые сегодня окружают браславские водоемы.",
    },
    {
        id: "aaa",
        x: 55,
        y: 32,
        iconUrl: "image/v.png",
        title: "Озеро Дривяты и глубоководный Южный Волосо",
        summary1: "Подробнее",
        text: "Главным и самым большим по площади озером Браславской группы является озеро Дривяты (около 36 кв. км). Оно мелководное, быстро прогревается летом и служит основным центром для пляжного отдыха. Совершенно иным характером обладает озеро Южный Волосо — самый глубокий водоем парка (глубина превышает 40 метров). Вода в нем исключительно чистая и прозрачная (видимость достигает 8 метров даже летом), а температура на глубине круглый год остается низкой. Из-за уникальных условий и высокой концентрации кислорода на дне Южного Волосо до сих пор живут реликтовые ракообразные, сохранившиеся со времен ледникового периода.",
    },
    {
        id: "aaaa",
        x: 75,
        y: 15,
        iconUrl: "image/v.png",
        title: "Гора Маяк и остров-матрешка Чайчин",
        summary1: "Подробнее",
        text: "Визуальным символом парка является гора Маяк — высокий моренный холм (около 174 метров над уровнем моря), окруженный озерами Струсто и Снуды. На вершине холма построена смотровая вышка, откуда открывается захватывающая круговая панорама на лабиринты островов. Одним из самых загадочных мест на озере Струсто является остров Чайчин — второй по величине озерный остров в Беларуси. Его уникальная природная особенность заключается в том, что внутри самого острова, среди густого леса, прячется собственное маленькое автономное озерцо. Этот феномен «водоема матрешки» очень популярен среди водных туристов.",
    },
    {
        id: "aaaaa",
        x: 22,
        y: 32,
        iconUrl: "image/v.png",
        title: "Заповедная фауна и водный туризм",
        summary1: "Подробнее",
        text: "Лесные массивы и болота Браславщины характеризуются высокой степенью дикости. В глухих чащах парка обитает скрытный хищник из семейства кошачьих — европейская рысь, занесенная в Красную книгу. Браславские озера являются идеальным местом для водного туризма. Благодаря тому, что большинство крупных озер соединены протоками и рекой Друйка, здесь проложены десятки километров многодневных байдарочных маршрутов. На берегах водоемов обустроены многочисленные туристические стоянки, что позволяет развивать экологический туризм без вреда для прибрежной флоры.",
    },
    {
        id: "aaaaaa",
        x: 61,
        y: 40,
        iconUrl: "image/v.png",
        title: "Природный памятник Парк Бельмонт",
        summary1: "Подробнее",
        text: "Парк Бельмонт в агрогородке Ахремовцы — это второй по величине исторический парк Беларуси, основанный в XVIII веке родом Гильзенов на живописном берегу озера Дривяты. Парк, чьё название переводится с французского как «красивая гора», в прошлом славился роскошным дворцом Плятеров (разрушен в 1940-х годах) и даже служил ставкой маршала Мюрата в 1812 году. Сегодня этот памятник природы республиканского значения привлекает туристов полуразрушенной псевдоготической часовней-каплицей XIX века, романтичной системой вековых прудов и каналов, а также редкими деревьями-гигантами, и открыт для свободного посещения.",
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