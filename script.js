// SPLASH
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 2000);
});

// NAVEGAÇÃO
const steps = Array.from(document.querySelectorAll(".form-step"));
const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");
const progressBar = document.querySelector(".progress-bar");
const stepNum = document.getElementById("stepNum");

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(validate()) {
            let active = document.querySelector(".form-step.active");
            let index = steps.indexOf(active);
            active.classList.remove("active");
            steps[index + 1].classList.add("active");
            updateProgress(index + 2);
        }
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let active = document.querySelector(".form-step.active");
        let index = steps.indexOf(active);
        active.classList.remove("active");
        steps[index - 1].classList.add("active");
        updateProgress(index);
    });
});

function updateProgress(step) {
    progressBar.style.width = (step / 10) * 100 + "%";
    stepNum.innerText = step;
    window.scrollTo(0,0);
}

function validate() {
    const active = document.querySelector(".form-step.active");
    const req = active.querySelectorAll("[required]");
    let ok = true;
    req.forEach(i => {
        if(!i.value) { i.style.borderColor = "red"; ok = false; }
        else { i.style.borderColor = "#ddd"; }
    });
    return ok;
}

// WHATSAPP
const form = document.getElementById("multiStepForm");
const modal = document.getElementById("modal-aviso");
let zapUrl = "";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let msg = "⭐ *FICHA SIRIUS* ⭐\n\n";

    data.forEach((val, key) => {
        if(!(val instanceof File) && val != "") msg += `*${key}:* ${val}\n`;
    });

    zapUrl = `https://api.whatsapp.com/send?phone=559291404115&text=${encodeURIComponent(msg)}`;
    modal.style.display = "flex";
});

document.getElementById("btn-entendido").addEventListener("click", () => {
    window.location.href = zapUrl;
});
