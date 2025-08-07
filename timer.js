// Timer değişkenleri
let intervalId = null;
let totalSeconds = 0;

function updateDisplay(saat, dakika, saniye) {
    document.getElementById("hour").innerText = String(saat).padStart(2, "0");
    document.getElementById("minute").innerText = String(dakika).padStart(2, "0");
    document.getElementById("second").innerText = String(saniye).padStart(2, "0");
}

function getInputValues() {
    let saat = parseInt(document.getElementById("input-3").value) || 0;
    let dakika = parseInt(document.getElementById("input-2").value) || 0;
    let saniye = parseInt(document.getElementById("input-1").value) || 0;
    return { saat, dakika, saniye };
}

function startTimer() {
    if (intervalId) return; // Zaten çalışıyorsa tekrar başlatma
    let { saat, dakika, saniye } = getInputValues();
    totalSeconds = saat * 3600 + dakika * 60 + saniye;
    if (totalSeconds <= 0) return;
    intervalId = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            return;
        }
        totalSeconds--;
        let s = totalSeconds % 60;
        let m = Math.floor(totalSeconds / 60) % 60;
        let h = Math.floor(totalSeconds / 3600);
        updateDisplay(h, m, s);
    }, 1000);
}

function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function resetTimer() {
    stopTimer();
    updateDisplay(0, 0, 0);
    document.getElementById("input-1").value = "";
    document.getElementById("input-2").value = "";
    document.getElementById("input-3").value = "";
}

// Butonlara event ekle
document.getElementById("start-button").addEventListener("click", startTimer);
document.getElementById("stop-button").addEventListener("click", stopTimer);
document.getElementById("reset-button").addEventListener("click", resetTimer);

let saat = String(document.getElementById("input-3").value).padStart(2, "0");
let dakika = String(document.getElementById("input-2").value).padStart(2, "0");
let saniye = String(document.getElementById("input-1").value).padStart(2, "0");

document.getElementById("hour").innerText = saat;
document.getElementById("minute").innerText = dakika;
document.getElementById("second").innerText = saniye;

document.getElementById("input-1").addEventListener("input", function () {
    if (this.value < 0 || this.value > 59) {
        document.getElementById("second").innerText = "00";
    } else {
        let saniye = String(this.value).padStart(2, "0");
        document.getElementById("second").innerText = saniye;
    }
});

document.getElementById("input-2").addEventListener("input", function () {
    if (this.value < 0 || this.value > 59) {
        document.getElementById("minute").innerText = "00";
    } else {
        let dakika = String(this.value).padStart(2, "0");
        document.getElementById("minute").innerText = dakika;
    }
});

document.getElementById("input-3").addEventListener("input", function () {
    if (this.value < 0 || this.value > 23) {
        document.getElementById("hour").innerText = "00";
    } else {
        let saat = String(this.value).padStart(2, "0");
        document.getElementById("hour").innerText = saat;
    }
});

