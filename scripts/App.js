const Musiclist = document.getElementById("musicList");
const musicProgress = document.getElementById("music-progress");
const player = document.getElementById("player");
const playButton = document.getElementById("play");
const currentT = document.getElementById("current-time");
const audio = document.getElementById('audio');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const playIcon = document.getElementById("play-icon");
let currentSongIndex = 0;


const song = [
    {
        title: 'Mockingbird',
        source: 'audio/12 Eminem - Mockingbird.mp3',
    },
    {
        title: "viguen - chera nemiragsi",
        source: "audio/@audio_editorbot.mp3",
    },
    {
        title: "eminem - without me",
        source: "audio/Eminem - Without Me .mp3",
    },
];

for (let index = 0; index < song.length; index++) {
    let div = document.createElement("div");
    div.className = "Musicitem";
    div.id = "Musicitem";

    let li = document.createElement("li");
    li.innerHTML = song[index].title;
    li.id = "Music-" + index;
    let hr = document.createElement("hr");
    div.appendChild(hr);
    div.appendChild(li);
    Musiclist.appendChild(div);
}
let isPlaying = false;

function playPause() {
    if (!isPlaying) {
        audio.play();
        playIcon.src = 'icons/pause.svg';
    } else {
        audio.pause();
        playIcon.src = 'icons/play.svg';
    }
    isPlaying = !isPlaying;
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % song.length;
    console.log("Next Song Index:", currentSongIndex);
    loadSong(currentSongIndex);
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + song.length) % song.length;
    console.log("Prev Song Index:", currentSongIndex);
    loadSong(currentSongIndex);
}

function loadSong(index) {
    audio.src = song[index].source;
    audio.load();
    playPause();
}
function togglePlay() {

    if (audio.paused) {
        audio.play();
        playIcon.src = 'icons/pause.svg';
    } else {
        audio.pause();
        playIcon.src = 'icons/play.svg';
    }
}
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrev);
playButton.addEventListener('click', playPause);

audio.addEventListener('timeupdate', function () {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const formattedCurrentTime = formatTime(currentTime);
    document.getElementById('current-time').innerText = formattedCurrentTime;

    const progressPercent = (currentTime / duration) * 100;
    musicProgress.value = progressPercent;

    const gradientValue = musicProgress.value + '%';
    musicProgress.style.background = `linear-gradient(to right, #1F2544 ${gradientValue}, #639CD9 ${gradientValue}, #639CD9)`;
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

musicProgress.addEventListener('input', function () {
    const seekTime = (musicProgress.value / 100) * audio.duration;
    audio.currentTime = seekTime;

    const gradientValue = musicProgress.value + '%';
    musicProgress.style.background = `linear-gradient(to right, #1F2544 ${gradientValue}, #639CD9 ${gradientValue}, #639CD9)`;
});