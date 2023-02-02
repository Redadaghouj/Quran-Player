let content = document.querySelector(".content");
let audio = document.querySelector(".quran-player");
let playToggleBtn = document.querySelector(".play"),
  prevBtn = document.querySelector(".prev"),
  nextBtn = document.querySelector(".next");
let ayahArea = document.querySelector(".ayah");

async function getQuranApi() {
  url = "http://api.alquran.cloud/v1/meta";
  let res = await fetch(url);
  let data = await res.json();
  let quran = data.data.surahs.references;
  quran.forEach((surah) => {
    drawUi(surah);
  });
  let surahBoxes = document.querySelectorAll(".surah-box");
  surahBoxes.forEach((box, i) => {
    box.addEventListener("click", () => {
      getQuranAudioApi(i);
    });
  });
}

getQuranApi();

function drawUi(surah) {
  content.innerHTML += `
    <div class="surah-box">
        <p class="ar-name">${surah.name}</p>
        <p class="en-name">${surah.englishName}</p>
    </div>
    `;
}

let surah;
let ayahIndex;
let paused = true;

async function getQuranAudioApi(index) {
  let url = `http://api.alquran.cloud/v1/surah/${index + 1}/ar.alafasy`;
  let res = await fetch(url);
  let data = await res.json();
  surah = data.data.ayahs;

  ayahIndex = 0;
  ayahChange();
  paused = false;
  playToggleBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  audio.addEventListener("ended", () => {
    ayahIndex++;
    ayahChange();
  });
}

function ayahChange() {
  if (surah) {
    if (ayahIndex >= surah.length) {
      ayahIndex = 0;
    } else if (ayahIndex < 0) {
      ayahIndex = surah.length - 1;
    }
    audio.setAttribute("src", surah[ayahIndex].audio);
    ayahArea.innerHTML = surah[ayahIndex].text;
  }
}

nextBtn.addEventListener("click", () => {
  ayahIndex++;
  ayahChange();
});

prevBtn.addEventListener("click", () => {
  ayahIndex--;
  ayahChange();
});

playToggleBtn.addEventListener("click", () => {
  if (surah) {
    if (paused) {
      audio.play();
      playToggleBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      paused = false;
    } else {
      audio.pause();
      playToggleBtn.innerHTML = `<i class="fa-solid fa-play">`;
      paused = true;
    }
  }
});
