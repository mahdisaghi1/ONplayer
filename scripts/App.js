// consts
const Menu = document.getElementById("menu");
const Main = document.getElementById("main");
const Shadow = document.getElementById("shadow");
const Musiclist = document.getElementById("musicList");
const TotalTime = document.getElementById("total-time");
const musicProgress = document.getElementById("music-progress");
const player = document.getElementById("player");
const playButton = document.getElementById("play");
const currentT = document.getElementById("current-time");
const audio = document.getElementById('audio');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const playIcon = document.getElementById("play-icon");
const Artist = document.getElementById("Artist");
let currentSongIndex = 0;

// music list
const song = [
    {
        title: "viguen - chera nemiragsi",
        source: "audio/@audio_editorbot.mp3",
        artist: "viguen",
    },
    {
        title: "Dariush - Shahre Gham [320]",
        source: "audio/Dariush - Shahre Gham [320].mp3",
        artist: "Dariush",
    },
    {
        title: "Hassan Shamaizadeh Berkeh",
        source: "audio/Hassan Shamaizadeh Berkeh.mp3",
        artist: "Hassan Shamaizadeh",
    }
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

// function buttons

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
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrev);
playButton.addEventListener('click', playPause);
// load
function loadSong(index) {
    audio.src = song[index].source;
    audio.load();
    playPause();

    document.getElementById('title').innerText = song[index].title;
    document.getElementById('Artist').innerText = song[index].artist;

    audio.addEventListener('loadedmetadata', function () {
        TotalTime.innerHTML = formatTime(audio.duration);
    });
    audio.addEventListener('ended', function () {
        playNext();
    });
}


// playing songs
function togglePlay() {

    if (audio.paused) {
        audio.play();
        playIcon.src = 'icons/pause.svg';
    } else {
        audio.pause();
        playIcon.src = 'icons/play.svg';
    }
}
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


// updating music progress
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
// changing music at end
audio.addEventListener('ended', function () {

    currentSongIndex = (currentSongIndex + 1) % song.length;

    playSong(currentSongIndex);
});
// updating music time
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

function openMenu() {
    Main.style.width = "100%";
    Menu.style.width = "25%";
    Shadow.style.width = "100%";
}

function closeMenu() {
    Main.style.width = "0";
    Menu.style.width = "0";
    Shadow.style.width = "0";
}