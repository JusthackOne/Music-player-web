import "boxicons";
import React, { useEffect, useRef, useState } from "react";
import useSound from "use-sound";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  
  const [seconds, setSeconds] = useState(); // текущая позиция звука в секундах
  const [songTime, setSongTime] = useState({min: '0', sec: '00'})
  const [currTime, setCurrTime] = useState({
    min: "0",
    sec: "0",
  }); // текущее положение звука в минутах и секундах
  const [song, setSong] = useState({})
  const [indexMusic, setIndexMusic] = useState(0)

  const progressWrapper = useRef();
  const progress = useRef();

  const [currentSong, setCurrentSong] = useState('./assets/music/1.mp3');
  const [play, { pause, duration, sound, stop }] = useSound(currentSong, { interrupt: true });

  const songs = [
    {
        path: './assets/music/1.mp3',
        title: 'Тюрбан',
        subtitle: 'Scally Milano, uglystephan',
        cover: 'assets/player-images/1.jpg',
    },
    {
        path: './assets/music/2.mp3',
        title: 'TALEZ',
        subtitle: 'Toxi$',
        cover: './assets/player-images/2.jpg',
    },
    {
        path: '../assets/music/3.mp3',
        title: 'Hey, Guys!',
        subtitle: 'ФакШиза, deadlytoo',
        cover: './assets/player-images/3.jpg',
    },
]


  function setProgress(e) {
    const width = progressWrapper.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    console.log(clickX)
    sound.seek([(clickX / width) * (duration / 1000)])
  }
  
  useEffect(() => {
    setCurrentSong(songs[indexMusic].path)
    console.log(songs[indexMusic].path)
  }, [indexMusic])

  useEffect(() => {
    if (isPlaying) {
      play()
    }
    
  }, [play])

  useEffect(() => {
    const sec = duration / 1000;
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    const time = {
      min: min,
      sec: secRemain
    }
    
    setSong(songs[indexMusic])
    setSongTime(time)
  });


  useEffect(() => {
    const lastIndex = indexMusic;
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // устанавливаем состояние с текущим значением в секундах
        
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      
        progress.current.style.width = `${((sound.seek([]) * 1000) / duration) * 100}%`
      } else {
        
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);


  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };


  function nextMusic() {
    stop();
    setIndexMusic((1 + indexMusic + songs.length) % songs.length)
    setCurrentSong(songs[indexMusic].path)
  }

  function prevMusic() {
    stop();
    setIndexMusic((indexMusic - 1 + songs.length) % songs.length)
    setCurrentSong(songs[indexMusic].path)
    
  }


  return (
    <div className="player flex justify-center items-center w-screen h-screen">
      <img src={song.cover} className="player__background absolute w-full h-screen object-cover z-0 blur-lg" id="player__background" />

      <div className="player-item flex justify-center items-center flex-col w-2/6 z-10 bg-gray-400 rounded-md">
        <img
          src={song.cover}
          className="player__wrapper w-4/5  -mt-6 drop-shadow-xl rounded-sm max-h-96 object-cover"
          id="player__wrapper"
        />

        <div className="player__text mt-10 text-center">
          <h3 className="player__title text-2xl font-bold" id="player__title">Title{duration  }</h3>
          <h4 className="player__subtitle text-xl" id="player__subtitle">Title</h4>
        </div>

        <div  ref={progressWrapper}  onClick={setProgress} className="player__progress w-11/12 h-2 rounded-lg bg-white mt-5" id="player__progress-wrapper">
          <div className="player__progress-bar bg-gray-900 h-2 w-0 rounded-lg" id="player__progress-bar"
           ref={progress}
          />
          <div className="player__music-time flex justify-between mt-2">
            <span className="player__current-time" id="player__current-time">{currTime.min}:{currTime.sec}</span>
            <span className="player__duration" id="player__duration">{songTime.min}:{songTime.sec}</span>
          </div>
        </div>

        <div className="player__controls mt-5 pb-4 text-center align-middle w-full">
          <div className="inline">
          <box-icon name="skip-previous" color="#ffffff" onClick={prevMusic} size="lg" color="black" id='player__prev'></box-icon>
          <box-icon name={isPlaying ? 'pause' : 'play'} onClick={playingButton} color="#ffffff" size="lg" color="black" id="player__play"></box-icon>
          <box-icon name="skip-next" color="#ffffff" onClick={nextMusic} size="lg" color="black" id='player__next'></box-icon>
          </div>
     
        </div>
       
      </div>
    </div>
  );
};

export default Player;
