try {
  //fetching data - External JSON file
  fetch(localFile)
    .then((response) => response.json())
    .then((data) => {
      //filter pop songs then show them
      const pops = data
        .filter((value) => value.category === "pop")
        .map((value) => value);
      template(pops, listOfPop);

      //filter rock songs then show them
      const rocks = data
        .filter((value) => value.category === "rock")
        .map((value) => value);
      template(rocks, listOfRock);

      //filter INS songs then show them
      const INS = data
        .filter((value) => value.category === "Instrumental")
        .map((value) => value);
      template(INS, listOfINS);

      shuffleButton.addEventListener("click", () => shuffleTheSong(data));
      // //checks if song is finished , then plays the next one randomly
      // if (audio.ended) {
      //   shuffleTheSong(data);
      // }
    });

  playButton.addEventListener("click", playButtonStatus);
  floatListCloseButton.addEventListener("click", () => {
    close();
  });
  floatSongSection.addEventListener("click", () => {
    close();
  });
  //loadingScreen
  window.addEventListener("load", () => {
    vanishLoadingPage(2000, 100);
  });
} catch (e) {
  console.log(e);
}
