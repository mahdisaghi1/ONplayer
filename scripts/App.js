// consts
const musicProgress = document.getElementById('music-progress');

const player = document.getElementById("player");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = document.querySelector("audio.Songs");
const imageElement = document.querySelector('.pas-stop');
const playIcon = document.getElementById('play-icon');
const currentT = document.getElementById("current-time");
let songIndex = 1;


// music list 

const song = [
    {
        title: 'Mockingbird',
        source: 'audio/12 Eminem - Mockingbird.mp3',
        cover: 'audio/cover_mockingbird.jpg'
    },
    {
        title: "viguen - chera nemiragsi",
        source: "audio/@audio_editorbot.mp3",
        cover: "audio/cover_mockingbird.jpg",
    },
    {
        title: "eminem - without me",
        source: "audio/@Eminem - Without Me.mp3",
        cover: "audio/cover_mockingbird.jpg",
    },

];
// App
function getSongTitle(song) {
    return song.charAt(0).toUpperCase() + song.slice(1);
}
function loadSong(song) {
    title.innerText = getSongTitle(song.title);
    audio.src = song.source;
    cover.src = song.cover;
}
function playSong() {

    imageElement.setAttribute('src', 'icons/play.svg');

    audio.play();
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
function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = song.length - 1;
    loadSong(song[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > song.length - 1) songIndex = 0;
    loadSong(song[songIndex]);
    playSong();
}

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