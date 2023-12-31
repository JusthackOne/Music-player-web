import "boxicons";
import React from "react";
import wrapper from "./../assets/player-images/kai_angel.jpg";

const Player = () => {
  return (
    <div className="player flex justify-center items-center w-screen h-screen">
        <img src={wrapper} className="player__background absolute w-full h-screen object-cover z-0 blur-lg" />
      
      <div className="player-item flex justify-center items-center flex-col w-2/6 z-10 bg-gray-400 rounded-md">
        <img
          src={wrapper}
          className="player__wrapper w-4/5  -mt-6 drop-shadow-xl rounded-sm max-h-96 object-cover"
        />

        <div className="player__text mt-10 text-center">
          <h3 className="player__title text-2xl font-bold">Title</h3>
          <h4 className="player__subtitle text-xl">Title</h4>
        </div>

        <div className="player__progress w-11/12 mt-5">
          <div className="player__progress-bar bg-white h-2 w-full rounded-lg" />
          <div className="player__music-time flex justify-between mt-2">
            <span className="player__current-time">0:00</span>
            <span className="player__duration">0:00</span>
          </div>
        </div>

        <div className="player__controls mt-5 pb-4">
          <box-icon name="skip-previous" color="#ffffff" size="lg" color="black" ></box-icon>
          <box-icon name="play" color="#ffffff" size="lg" color="black" ></box-icon>
          <box-icon name="skip-next" color="#ffffff" size="lg" color="black" ></box-icon>
        </div>
      </div>
    </div>
  );
};

export default Player;
