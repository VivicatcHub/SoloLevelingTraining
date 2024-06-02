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

function ChangeColor() {
    box = document.getElementById("container2");
    box.className = "containerGold"
    box.innerHTML = `
    <div class="MissionsGold">
        <div class="HeadGold">
            <div class="Box20">STATUT</div>
            <div class="Box21">- X</div>
            <div class="Box22">
                <span id="Nom">NOM : <span id="name">${localStorage.getItem('Name')}</span> <button onclick="ModifNom()"><i class="fi fi-rr-settings" style="font-size: x-small"></i></button></span>
            </div>
            <div class="Box23">
                <span id="Niveau">NIV. <span id="level">${formatNumberWithSpaces(localStorage.getItem('Level'))}</span></span><br>
            </div>
            <div class="Box24">
                <span id="Classe">CLASSE : <span id="class">${localStorage.getItem('Class')}</span></span><br>
                <span id="Rang">RANG : <span id="rank">${localStorage.getItem('Rank')}</span></span><br>
            </div>
        </div>
        <div class="MIDGold">
            <div class="Box25">
                <span id="HP">HP : <span id="hp">${formatNumberWithSpaces(localStorage.getItem('Hp'))}</span></span><br>
                <span id="Fatigue">FATIGUE : <span id="fatigue">0</span></span>
            </div>
            <div class="Box26">
                <span id="MP">MP : <span id="mp">${formatNumberWithSpaces(localStorage.getItem('Mp'))}</span></span>
            </div>
        </div>
        <div class="BodyGold">
            <div class="Box27">
                <span id="Force">FORCE : <span id="number">${formatNumberWithSpaces(localStorage.getItem('Force'))}</span></span><br>
                <span id="Agilité">AGILITÉ : <span id="number">${formatNumberWithSpaces(localStorage.getItem('Agilité'))}</span></span><br>
                <span id="Perception">PERCEPTION : <span id="number">${formatNumberWithSpaces(localStorage.getItem('Perception'))}</span></span>
            </div>
            <div class="Box28">
                <span id="Endurance">ENDURANCE : <span id="number">${formatNumberWithSpaces(localStorage.getItem('Endurance'))}</span></span><br>
                <span id="Intelligence">INTELLIGENCE : <span id="number">${formatNumberWithSpaces(localStorage.getItem('Intelligence'))}</span></span><br>
                <button id="pt-dispo" onclick="LevelUp()">AP : <span id="ap">0</span></button>
            </div>
            <div class="Box29">
            </div>
        </div>
    </div>`
}

function checkDatas() {
    NAME = localStorage.getItem('Name');
    if (NAME === null) {
        ModifNom();
    }
    CLASS = localStorage.getItem('Class');
    if (CLASS === null) {
        localStorage.setItem('Class', "AUCUN");
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
    LEVEL = localStorage.getItem('Level');
    if (LEVEL === null) {
        localStorage.setItem('Level', 1);
    } else if (parseInt(LEVEL) >= 120) {
        ChangeColor();
    }

    document.getElementById("name").textContent = localStorage.getItem('Name');
    document.getElementById("class").textContent = localStorage.getItem('Class');
    document.getElementById("rank").textContent = localStorage.getItem('Rank');
    document.getElementById("hp").textContent = formatNumberWithSpaces(localStorage.getItem('Hp'));
    document.getElementById("mp").textContent = formatNumberWithSpaces(localStorage.getItem('Mp'));
    document.getElementById("level").textContent = formatNumberWithSpaces(localStorage.getItem('Level'));

    document.getElementById("Force").querySelector("#number").textContent = formatNumberWithSpaces(localStorage.getItem('Force'));
    document.getElementById("Agilité").querySelector("#number").textContent = formatNumberWithSpaces(localStorage.getItem('Agilité'));
    document.getElementById("Perception").querySelector("#number").textContent = formatNumberWithSpaces(localStorage.getItem('Perception'));
    document.getElementById("Endurance").querySelector("#number").textContent = formatNumberWithSpaces(localStorage.getItem('Endurance'));
    document.getElementById("Intelligence").querySelector("#number").textContent = formatNumberWithSpaces(localStorage.getItem('Intelligence'));

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
        buttonlvlup.disabled = false;
        document.getElementById("ap").textContent = 3;
        document.getElementById("reboot").disabled = true;
    }
}

function checkButtonStatus(TYPE) {
    const today = new Date().toLocaleDateString();
    const lastClickDate = localStorage.getItem(`LastClickDate${TYPE}`);
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
    buttonlvlup.disabled = true;
    document.getElementById("ap").textContent = 0;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function LevelUp() {
    document.getElementById("fatigue").textContent = 0;
    newLevel = parseInt(LEVEL) + 1
    document.getElementById("level").textContent = newLevel;
    localStorage.setItem('Level', newLevel);
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
    buttonlvlup.disabled = true;
    document.getElementById("ap").textContent = 0;

    localStorage.setItem('Hp', 100 + ((newLevel - 1) * 475));
    document.getElementById("hp").textContent = formatNumberWithSpaces(100 + ((newLevel - 1) * 475));
    localStorage.setItem('Mp', 10 + ((newLevel - 1) * 330));
    document.getElementById("mp").textContent = formatNumberWithSpaces(10 + ((newLevel - 1) * 330));

    if (newLevel >= 15) {
        localStorage.setItem('Rank', "D");
        document.getElementById("rank").textContent = "D";
    }
    if (newLevel >= 30) {
        localStorage.setItem('Rank', "C");
        document.getElementById("rank").textContent = "C";
    }
    if (newLevel >= 60) {
        localStorage.setItem('Rank', "B");
        document.getElementById("rank").textContent = "B";
    }
    if (newLevel >= 120) {
        localStorage.setItem('Class', "NECROMANCIEN");
        document.getElementById("class").textContent = "NECROMANCIEN";
        ChangeColor();
    }
    if (newLevel >= 183) {
        localStorage.setItem('Rank', "A");
        document.getElementById("rank").textContent = "A";
    }
    if (newLevel >= 240) {
        localStorage.setItem('Class', "MONARQUE DES OMBRES");
        document.getElementById("class").textContent = "MONARQUE DES OMBRES";
    }
    if (newLevel >= 365) {
        localStorage.setItem('Rank', "S");
        document.getElementById("rank").textContent = "S";
    }
    if (newLevel >= 1000) {
        localStorage.setItem('Rank', "Nation");
        document.getElementById("rank").textContent = "Nation";
    }

}

function updateTextColor() {
    const now = new Date();
    const hours = now.getHours();
    const textElement = document.getElementById('dynamicText');

    if (hours >= 0 && hours < 12) {
        textElement.style.color = 'white';
    } else if (hours >= 12 && hours < 16) {
        textElement.style.color = '#98ec6f';
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