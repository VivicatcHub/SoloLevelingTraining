NAME = localStorage.getItem('Name');
if (NAME === null) {
    ModifNom();
}
CLASS = localStorage.getItem('Class');
if (CLASS === null) {
    localStorage.setItem('Class', "AUCUN");
}
TITLE = localStorage.getItem('Title');
if (TITLE === null) {
    localStorage.setItem('Title', "AUCUN");
}
RANK = localStorage.getItem('Rank');
if (RANK === null) {
    localStorage.setItem('Rank', "E");
}
HP = localStorage.getItem('Hp');
if (HP === null) {
    localStorage.setItem('Hp', 100);
}
MP = localStorage.getItem('Mp');
if (MP === null) {
    localStorage.setItem('Mp', 10);
}
LEVEL = localStorage.getItem('Level');
if (LEVEL === null) {
    localStorage.setItem('Level', 1);
}
FORCE = localStorage.getItem('Force');
if (FORCE === null) {
    localStorage.setItem('Force', 10);
}
AGILITE = localStorage.getItem('Agilité');
if (AGILITE === null) {
    localStorage.setItem('Agilité', 10);
}
PERCEPTION = localStorage.getItem('Perception');
if (PERCEPTION === null) {
    localStorage.setItem('Perception', 10);
}
ENDURANCE = localStorage.getItem('Endurance');
if (ENDURANCE === null) {
    localStorage.setItem('Endurance', 10);
}
INTELLIGENCE = localStorage.getItem('Intelligence');
if (INTELLIGENCE === null) {
    localStorage.setItem('Intelligence', 10);
}

document.addEventListener('DOMContentLoaded', (event) => {
    ["Pompes", "Abdos", "Squats", "Course"].forEach(element => {
        checkButtonStatus(element);
    })
    checkDatas();
});

function ModifNom() {
    var userInput = prompt("Votre nom de chasseur:", "Sung Jin Woo");
    localStorage.setItem('Name', userInput);
    document.getElementById("name").textContent = userInput;
}

function checkDatas() {
    document.getElementById("name").textContent = NAME;
    document.getElementById("class").textContent = CLASS;
    document.getElementById("title").textContent = TITLE;
    document.getElementById("rank").textContent = RANK;
    document.getElementById("hp").textContent = HP;
    document.getElementById("mp").textContent = MP;
    document.getElementById("level").textContent = LEVEL;

    document.getElementById("Force").querySelector("#number").textContent = FORCE;
    document.getElementById("Agilité").querySelector("#number").textContent = AGILITE;
    document.getElementById("Perception").querySelector("#number").textContent = PERCEPTION;
    document.getElementById("Endurance").querySelector("#number").textContent = ENDURANCE;
    document.getElementById("Intelligence").querySelector("#number").textContent = INTELLIGENCE;

    compteur = 0;
    Array.from(document.getElementsByClassName("daily-button")).forEach(But => {
        if (But.disabled) {
            compteur++;
        }
    })
    document.getElementById("fatigue").textContent = 25 * compteur;
    if (compteur === 4) {
        document.getElementById("reboot").disabled = true;
    }
}

function handleClick(TYPE) {
    const today = new Date().toLocaleDateString();
    localStorage.setItem(`PreLastClickDate${TYPE}`, localStorage.getItem(`LastClickDate${TYPE}`));
    localStorage.setItem(`LastClickDate${TYPE}`, today);
    alert(`${TYPE}: terminé pour aujourd'hui`);
    disableButton(TYPE);

    document.getElementById("fatigue").textContent = parseInt(document.getElementById("fatigue").textContent) + 25

    compteur = 0;
    Array.from(document.getElementsByClassName("daily-button")).forEach(But => {
        if (But.disabled) {
            compteur++;
        }
    })
    if (compteur === 4) {
        buttonlvlup = document.getElementById("pt-dispo");
        buttonlvlup.textContent = "POINTS DISPONIBLES : 3";
        buttonlvlup.disabled = false;
        document.getElementById("").disabled = true;
    }
}

function checkButtonStatus(TYPE) {
    const today = new Date().toLocaleDateString();
    const lastClickDate = localStorage.getItem(`LastClickDate${TYPE}`);
    console.log(lastClickDate, today, lastClickDate === today);
    if (lastClickDate === today) {
        disableButton(TYPE);
    }
}

function disableButton(TYPE) {
    const button = document.getElementById(`daily-button-${TYPE}`);
    button.disabled = true;
    switch (TYPE) {
        case "Course":
            button.textContent = "[10/10min]";
            break;
        default:
            button.textContent = "[100/100]";
    }
}

function reboot() {
    ["Pompes", "Abdos", "Squats", "Course"].forEach(element => {
        const button = document.getElementById(`daily-button-${element}`);
        button.disabled = false;
        switch (element) {
            case "Course":
                button.textContent = "[0/10min]";
                break;
            default:
                button.textContent = "[0/100]";
        }
        localStorage.setItem(`LastClickDate${element}`, localStorage.getItem(`PreLastClickDate${element}`));
    })
    document.getElementById("fatigue").textContent = 0;
    buttonlvlup = document.getElementById("pt-dispo");
    buttonlvlup.textContent = "POINTS DISPONIBLES : 0"
    buttonlvlup.disabled = true;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function LevelUp() {
    document.getElementById("fatigue").textContent = 0;
    document.getElementById("level").textContent = parseInt(LEVEL) + 1;
    localStorage.setItem('Level', parseInt(LEVEL) + 1);
    for (let i = 1; i <= 3; i++) {
        var randomNumber = getRandomInt(1, 5);
        switch (randomNumber) {
            case 1:
                var nb = parseInt(document.getElementById("Force").querySelector("#number").textContent);
                document.getElementById("Force").querySelector("#number").textContent = nb + 1;
                localStorage.setItem("Force", nb + 1);
                break;
            case 2:
                var nb = parseInt(document.getElementById("Endurance").querySelector("#number").textContent);
                document.getElementById("Endurance").querySelector("#number").textContent = nb + 1;
                localStorage.setItem("Endurance", nb + 1);
                break;
            case 3:
                var nb = parseInt(document.getElementById("Agilité").querySelector("#number").textContent);
                document.getElementById("Agilité").querySelector("#number").textContent = nb + 1;
                localStorage.setItem("Agilité", nb + 1);
                break;
            case 4:
                var nb = parseInt(document.getElementById("Intelligence").querySelector("#number").textContent);
                document.getElementById("Intelligence").querySelector("#number").textContent = nb + 1;
                localStorage.setItem("Intelligence", nb + 1);
                break;
            case 5:
                var nb = parseInt(document.getElementById("Perception").querySelector("#number").textContent);
                document.getElementById("Perception").querySelector("#number").textContent = nb + 1;
                localStorage.setItem("Perception", nb + 1);
                break;

        }
    }
    buttonlvlup = document.getElementById("pt-dispo");
    buttonlvlup.textContent = "POINTS DISPONIBLES : 0"
    buttonlvlup.disabled = true;
}

function updateTextColor() {
    const now = new Date();
    const hours = now.getHours();
    const textElement = document.getElementById('dynamicText');

    if (hours >= 0 && hours < 12) {
        textElement.style.color = 'white';
    } else if (hours >= 12 && hours < 16) {
        textElement.style.color = 'green';
    } else if (hours >= 16 && hours < 20) {
        textElement.style.color = 'yellow';
    } else {
        textElement.style.color = 'red';
    }
}


buttonlvlup = document.getElementById("pt-dispo");
buttonlvlup.disabled = true;
// Update the text color when the page loads
updateTextColor();
// Optionally, update the text color every hour
setInterval(updateTextColor, 3600000);