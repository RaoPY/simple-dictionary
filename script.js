const body = document.querySelector("body");
const container = document.querySelector(".container");
const wordInput = document.querySelector("#wordInput");
const btn = document.querySelector("#btn");
const wordMeaning = document.querySelector("#wordMeaning");

document.querySelector("#themeDot1").addEventListener("click", theme1);
document.querySelector("#themeDot2").addEventListener("click", theme2);
document.querySelector("#themeDot3").addEventListener("click", theme3);
document.querySelector("#themeDot4").addEventListener("click", theme4);
document.querySelector("#themeDot5").addEventListener("click", theme5);
document.querySelector("#themeDot6").addEventListener("click", theme6);

// for input box to be in focus by default
wordInput.focus();

// enter key (keyCode = 13) for search button press when input box is in focus
wordInput.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        btn.click();
    }
});

function changeThemeColor (lightColor, darkColor) {
    body.style.background = lightColor;
    btn.style.background = lightColor;
    container.setAttribute("style", `box-shadow: 8px 12px 5px ${darkColor};`);
    btn.addEventListener("mouseenter", () => btn.style.background = darkColor);
    btn.addEventListener("mouseleave", () => btn.style.background = lightColor);
}

function changeThemeGradient (color1, color2) {
    body.setAttribute("style", `background: linear-gradient(135deg, ${color1}, ${color2});`);
    btn.setAttribute("style", `background: linear-gradient(135deg, ${color1}, ${color2});`);
    container.setAttribute("style", "box-shadow: 8px 12px 5px #27272750;");
    btn.addEventListener("mouseenter", () => btn.setAttribute("style", `background: linear-gradient(135deg, ${color2}, ${color1});`));
    btn.addEventListener("mouseleave", () => btn.setAttribute("style", `background: linear-gradient(135deg, ${color1}, ${color2});`));
}

function theme1() {
    changeThemeColor("#6366f1", "#5046e5");
}

function theme2() {
    changeThemeColor("#f49e0b", "#d87706");
}

function theme3() {
    changeThemeColor("#48bb78", "#05976a");
}

function theme4() {
    changeThemeGradient("#B06AB3", "#4568DC");
}

function theme5() {
    changeThemeGradient("#ee0979", "#ff6a00");
}

function theme6() {
    changeThemeGradient("#38ef7d", "#11998e");
}

btn.addEventListener("click", searchBtn);

function searchBtn() {
    let word = wordInput.value;
    
    // https://api.dictionaryapi.dev/api/v2/entries/en/<word>
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            let data = JSON.parse(request.response);
            let meaning = data[0].meanings[0].definitions[0].definition;

            wordMeaning.setAttribute("style", "color: #6f767e; font-weight: normal;");
            wordMeaning.innerText = meaning;
        }
        else {
            wordMeaning.setAttribute("style", "color: #ff4848; font-weight: bold;");
            wordMeaning.innerText = "word not found.";
        }
    }
}