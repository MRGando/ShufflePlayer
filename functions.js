//shuffle the song
function shuffleTheSong(data) {
  //loading song
  waveform.style.display = "block";
  wavesurfer.stop();
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
  loadingScreen.style.display = "unset";
  loadingScreen.style.opacity = 1;
  const randSong = data[Math.floor(Math.random() * data.length)];
  singer.innerHTML = `<span style='font-weight:bold'>${randSong.name}</span><br><p>${randSong.singer}</p>`;
  titleOfShuffledSong.remove();
  songCover.src = randSong.cover;
  wavesurfer.load(randSong.link);
  wavesurfer.on("ready", () => {
    wavesurfer.play();
  });
  wavesurfer.on("finish", () => {
    shuffleTheSong(data);
  });
  cover.addEventListener("load", () => {
    vanishLoadingPage(500, 0);
  });
}

//Template ( removes the rest of a long name )
const template = (songCategory, listOfType) => {
  const slic = songCategory.slice(0, 6);

  for (let song in slic) {
    loopSongs(listOfType, slic, song, "song");
  }
};
function playSelectedSong(id) {
  fetch(localFile)
    .then((response) => response.json())
    .then((data) => {
      selectedSong = data.filter((item) => item.id == id);
      shuffleTheSong(selectedSong);
    });
}
//loop songs
const loopSongs = (place, category, rand, className, hasButton) => {
  place.innerHTML += `<div onclick="playSelectedSong(${
    category[rand].id
  })" class='${className}'> 
  <img class="songCoverImage" src=${category[rand].cover}>
  </br>
  <div class="content">
  ${
    category[rand].name.length <= 13
      ? category[rand].name
      : category[rand].name.slice(0, 13) + " ..."
  }
  </br> 
  <p class="singerName">${category[rand].singer}</p>
  </div>
  ${
    hasButton === true
      ? `<button class="floatPlayButton btn btn-success">
      <i class="fas fa-play"></i>
    </button>`
      : ""
  }
  </div>`;
};
//play function
function playButtonStatus() {
  if (!wavesurfer.isPlaying()) {
    wavesurfer.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    wavesurfer.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
}
//floatList Close button
const close = () => {
  floatSongSection.style.opacity = 0;
  setTimeout(() => {
    floatSongSection.style.display = "none";
  }, 200);
  floatList.innerHTML = "";
};
//when user click on see more button this function we take place
function showProperList(type, title) {
  floatSongSection.style.display = "unset";
  floatSongSection.style.opacity = 1;
  fetch(localFile)
    .then((response) => response.json())
    .then((data) => {
      const songs = data
        .filter((value) => value.category === type)
        .map((value) => value);
      for (let eachSong in songs) {
        loopSongs(floatList, songs, eachSong, "floatSong fix-size", true);
      }
    });
  floatSongList_title.innerHTML = title;
}
//loadingScreen when shuffle button is clicked
function vanishLoadingPage(opacity, display) {
  setTimeout(() => {
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, display);
  }, opacity);
}
