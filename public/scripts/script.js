// const
const OpenMenu = document.getElementById("openMenu");
const CloseMenu = document.getElementById("closeMenu");
const Main = document.getElementById("main");
const Menu = document.getElementById("menu");
const Shadow = document.getElementById("shadow");
const scanButton = document.getElementById("scanButton");
const MusicList = document.getElementById("musicList");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const playIcon = document.getElementById("play-icon");
const playButton = document.getElementById("play");
const audio = document.getElementById("audio");
const TotalTime = document.getElementById("total-time");
const musicProgress = document.getElementById("music-progress");
const artist = document.getElementById("Artist");
const titleS = document.getElementById("title");
const Cover = document.getElementById("music-cover");
let currentSongIndex = 0;
let isPlaying = false;
const CoverPlace = document.getElementById("CoverHolder");
// Menu

function open() {
  Main.style.width = "100%";
  Menu.style.width = "25%";
  Shadow.style.width = "100%";
}

function close() {
  Main.style.width = "0";
  Menu.style.width = "0";
  Shadow.style.width = "0";
}

OpenMenu.addEventListener("click", open);
CloseMenu.addEventListener("click", close);

// Scan Music

/* global axios */
function scan() {
  axios
    .post("/scanlist")
    .then((response) => {
      console.log("Response:", response.data);
      alert("The scan was completed successfully PLEASE reload The page");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("ERROR!!!!");
    });
}

scanButton.addEventListener("click", scan);

// music list

// adding music names to clint list
axios
  .get("./json/list.json")
  .then((response) => {
    const Musics = response.data;
    Musics.forEach((music, index) => {
      let div = document.createElement("div");
      div.className = "Musicitem";
      div.id = "Musicitem";

      let li = document.createElement("li");
      li.innerHTML = music.Name;
      li.id = `Music-${index}`;
      let hr = document.createElement("hr");
      div.appendChild(hr);
      div.appendChild(li);
      MusicList.appendChild(div);
    });
    //control BTN
    function playNext() {
      currentSongIndex = (currentSongIndex + 1) % Musics.length;
      console.log("Next Song Index:", currentSongIndex);
      loadSong(currentSongIndex);
    }

    function playPrev() {
      currentSongIndex = (currentSongIndex - 1 + Musics.length) % Musics.length;
      console.log("Prev Song Index:", currentSongIndex);
      loadSong(currentSongIndex);
    }

    nextButton.addEventListener("click", playNext);
    prevButton.addEventListener("click", playPrev);
    playButton.addEventListener("click", togglePlay);

    function loadSong(index) {
      // set infromation of music for client side
      let musicAddress = Musics[index].Name;
      let musicTitle = Musics[index].Title;
      let musicArtist = Musics[index].Artist;
      let musicCover = Musics[index].Cover;
      artist.innerHTML = musicArtist;
      titleS.innerHTML = musicTitle;
      if (musicCover === "") {
        Cover.src = "icons/music-icon.svg";
        CoverPlace.className = "cover";
      } else {
        CoverPlace.className = "Music-cover";
        Cover.src = musicCover;
        Cover.className = "ImageCover";
      }
      // load music to player
      let audioSrc = `/audio/${musicAddress}`;
      audio.src = audioSrc;
      audio.removeEventListener("loadedmetadata", updateMetadata);
      audio.addEventListener("loadedmetadata", updateMetadata);

      function updateMetadata() {
        TotalTime.innerHTML = formatTime(audio.duration);
      }
      audio.load();
      audio.removeEventListener("ended", onAudioEnded);
      audio.addEventListener("ended", onAudioEnded);
      function onAudioEnded() {
        playNext();
      }
      if (isPlaying) {
        audio.play();
      }
    }
    function togglePlay() {
      if (audio.paused) {
        audio.play();
        playIcon.src = "icons/pause.svg";
        isPlaying = true;
      } else {
        audio.pause();
        playIcon.src = "icons/play.svg";
        isPlaying = false;
      }
    }
    // updating music progress
    audio.addEventListener("timeupdate", function () {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const formattedCurrentTime = formatTime(currentTime);
      document.getElementById("current-time").innerText = formattedCurrentTime;

      const progressPercent = (currentTime / duration) * 100;
      musicProgress.value = progressPercent;

      const gradientValue = musicProgress.value + "%";
      musicProgress.style.background = `linear-gradient(to right, #1F2544 ${gradientValue}, #639CD9 ${gradientValue}, #639CD9)`;
    });

    musicProgress.addEventListener("input", function () {
      const seekTime = (musicProgress.value / 100) * audio.duration;
      audio.currentTime = seekTime;

      const gradientValue = musicProgress.value + "%";
      musicProgress.style.background = `linear-gradient(to right, #1F2544 ${gradientValue}, #639CD9 ${gradientValue}, #639CD9)`;
    });

    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
  });
