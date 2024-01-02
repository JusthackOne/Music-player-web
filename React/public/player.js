const background = document.getElementById('player__background'),
    wrapper = document.getElementById('player__wrapper'),
    title = document.getElementById('player__title'),
    subtitle = document.getElementById('player__subtitle'),
    progressBar = document.getElementById('player__progress-bar'),
    currentTimeEl = document.getElementById('player__current-time'),
    durationEl = document.getElementById('player__duration'),
    btnPlay = document.getElementById('player__play'),
    btnPrev = document.getElementById('player__prev'),
    btnNext = document.getElementById('player__next');

const music = new Audio();


const songs = [
    {
        path: './../music/Scally Milano, uglystephan - Тюрбан.mp3',
        title: 'Тюрбан',
        subtitle: 'Scally Milano, uglystephan',
        cover: './../player-images/turban.jpg',
    },
    {
        path: './../music/Toxi$ - TALEZ.mp3',
        title: 'TALEZ',
        subtitle: 'Toxi$',
        cover: './../player-images/talez.jpg',
    },
    {
        path: './../music/ФакШиза, deadlytoo - Hey, Guys!.mp3',
        title: 'Hey, Guys!',
        subtitle: 'ФакШиза, deadlytoo',
        cover: './../player-images/siza.jpg',
    },
]

let musicIndex = 0;
let isPlaying = false;

function toggleMusic () {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic () {
    isPlaying = true;
    console.log('12')
    btnPlay.setAttribute('name', 'pause');
    music.play();
}

function pauseMusic () {
    isPlaying = false;

    btnPlay.setAttribute('name', 'play');
    music.pause();
}

function loadMusic (song) {
    music.src = song.path;
    title.textContent = song.title;
    subtitle.textContent = song.subtitle;
    background.src = song.cover;
    wrapper.src = song.cover;
}

function changeMusic (direction) {
    musicIndex = (direction + musicIndex + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar () {
    const {duration, currentTime} = music;
    const progressPercent = (currentTime/duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`
}

function setProgressBar (e) {
    const width = progressBar.clientWidth;
    const clickX = e.offseX;

    music.currentTime = (clickX / width) * music.duration;
}

btnPlay.addEventListener('click', toggleMusic);
btnPrev.addEventListener('click', () => changeMusic(-1));
btnNext.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1))
music.addEventListener('timeupdate', updateProgressBar)
progressBar.addEventListener('click', setProgressBar)

loadMusic(songs[musicIndex]);
