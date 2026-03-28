-const steps = Array.from(document.querySelectorAll(".form-step"));
const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");
const progressBar = document.getElementById("progressBar");
const stepNum = document.getElementById("stepNum");

// NAVEGAÇÃO
nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(validate()) {
            changePage(1);
        }
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => changePage(-1));
});

function changePage(dir) {
    const active = document.querySelector(".form-step.active");
    let index = steps.indexOf(active);
    active.classList.remove("active");
    
    let nextIndex = index + dir;
    steps[nextIndex].classList.add("active");
    
    // Atualiza barra e número
    progressBar.style.width = ((nextIndex + 1) / 10 * 100) + "%";
    stepNum.innerText = nextIndex + 1;
    window.scrollTo(0,0);
}

function validate() {
    const active = document.querySelector(".form-step.active");
    const required = active.querySelectorAll("[required]");
    let valid = true;
    required.forEach(i => {
        if(!i.value) { i.style.borderColor = "red"; valid = false; }
        else { i.style.borderColor = "#ddd"; }
    });
    return valid;
}

// WHATSAPP
const form = document.getElementById("multiStepForm");
const modal = document.getElementById("modal-aviso");
let zapUrl = "";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let msg = "⭐ *FICHA SIRIUS - OFICIAL* ⭐\n\n";

    data.forEach((val, key) => {
        if(!(val instanceof File) && val != "") msg += `*${key}:* ${val}\n`;
    });

    zapUrl = `https://api.whatsapp.com/send?phone=559291404115&text=${encodeURIComponent(msg)}`;
    modal.style.display = "flex";
});

document.getElementById("btn-entendido").addEventListener("click", () => {
    window.location.href = zapUrl;
});-
