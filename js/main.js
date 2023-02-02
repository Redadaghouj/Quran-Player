// Link API
// http://api.alquran.cloud/v1/surah/1/ar.alafasy
// http://api.alquran.cloud/v1/meta

let content = document.querySelector(".content");
let audio = document.querySelector(".quran-player");
let playBtn = document.querySelector(".play"),
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
async function getQuranAudioApi(index) {
  let url = `http://api.alquran.cloud/v1/surah/${index + 1}/ar.alafasy`;
  let res = await fetch(url);
  let data = await res.json();
  surah = data.data.ayahs;

  ayahIndex = -1;
  ayahChange(++ayahIndex);
  paused = false;
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  audio.addEventListener("ended", () => {
    ayahChange(++ayahIndex);
  });
}

let paused = true;
function ayahChange(i) {
  if (i >= surah.length || i < 0) {
    ayahArea.textContent = "اضغط علي السورة للاستماع اليها";
    audio.pause();
  } else {
    audio.setAttribute("src", surah[i].audio);
    ayahArea.innerHTML = surah[i].text;
    audio.play();
  }
}

nextBtn.addEventListener("click", () => {
  ayahChange(++ayahIndex);
});

prevBtn.addEventListener("click", () => {
  ayahChange(--ayahIndex);
});

playBtn.addEventListener("click", () => {
  if (paused) {
    audio.play();
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    paused = false;
  } else {
    audio.pause();
    playBtn.innerHTML = `<i class="fa-solid fa-play">`;
    paused = true;
  }
});
