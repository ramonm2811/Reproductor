import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareRight,
  faPlayCircle,
  faPauseCircle,
  faCaretSquareLeft,
} from "@fortawesome/free-solid-svg-icons";

//create your first component

const Home = () => {
  const [musica, setMusica] = useState([]);

  useEffect(() => {
    getMusica();
  }, []);

  const getMusica = () => {
    fetch("https://assets.breatheco.de/apis/sound/songs", {
      method: "GET",
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMusica(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let audioRef = useRef();

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const songURL = musica.map((song) => {
    return "https://assets.breatheco.de/apis/sound/" + song.url;
  });

  const songs = musica.map((song, index) => {
    return (
      <li
        key={index}
        className={isPlaying == true && current === index ? "active" : ""}
        onClick={() => playSong(index)}
      >
        <span className="text-secondary me-5">{index + 1}</span>
        {song.name}
      </li>
    );
  });

  const playSong = (index) => {
    setIsPlaying(true);
    audioRef.current.src = songURL[index];
    setCurrent(index);
    audioRef.current.play();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    audioRef.current.src = songURL[current];
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  const nextSong = () => {
    if (current === songs.length - 1) {
      setCurrent(0);
      audioRef.current.src = songURL[0];
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      audioRef.current.src = songURL[current + 1];
      setCurrent(current + 1);

      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const previousSong = () => {
    if (current === 0) {
      setCurrent(songs.length - 1);
      audioRef.current.src = songURL[songs.length - 1];
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      audioRef.current.src = songURL[current - 1];
      setCurrent(current - 1);
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary">
        <div className="container w-50 rounded bg-dark">
          <div className="songs">
            <ul>{songs}</ul>
            <div className="buttonsNav bg-secondary">
              <button
                className="btn fs-2"
                type="button"
                name="previous"
                onClick={previousSong}
              >
                <FontAwesomeIcon icon={faCaretSquareLeft} />
              </button>
              <button
                className="btn fs-1"
                type="button"
                name="play"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <FontAwesomeIcon icon={faPauseCircle} />
                ) : (
                  <FontAwesomeIcon icon={faPlayCircle} />
                )}
              </button>
              <button
                className="btn fs-2"
                type="button"
                name="next"
                onClick={nextSong}
              >
                <FontAwesomeIcon icon={faCaretSquareRight} />
              </button>
              <audio ref={audioRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
