// Link API
// http://api.alquran.cloud/v1/quran/ar.alafasy

let content = document.querySelector(".content");
let audio = document.querySelector(".quran-player");
let playBtn = document.querySelector(".play"),
  prevBtn = document.querySelector(".prev"),
  nextBtn = document.querySelector(".next");

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
let i = 0;
async function getQuranAudioApi(index) {
  let url = "http://api.alquran.cloud/v1/quran/ar.alafasy";

  let res = await fetch(url);
  let data = await res.json();
  surah = data.data.surahs[index].ayahs;
  //   setInterval(() => {
  audio.setAttribute("src", surah[i].audio);
  audio.play();

  //   });
}

nextBtn.addEventListener("click", () => {
  audio.setAttribute("src", surah[++i].audio);
  audio.play();
});

prevBtn.addEventListener("click", () => {
  audio.setAttribute("src", surah[--i].audio);
  audio.play();
});

playBtn.addEventListener("click", () => {
  audio.pause();
});
