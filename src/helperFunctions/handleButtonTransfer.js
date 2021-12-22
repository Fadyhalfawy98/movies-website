import {saveMovie} from "../services/fakeMovieService";

const HandleButtonTransfer = (history, path, label, movie)  => {

  if (label === "Signup") return history.replace(path);


  if (label === "Save") {
    saveMovie(movie);
    return history.replace(path);
  }

  return history.push(path);
}

export default HandleButtonTransfer;