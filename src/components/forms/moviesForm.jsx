import React from "react";
import HandleButtonTransfer from "../../helperFunctions/handleButtonTransfer";
const MoviesForm = ({ match, history }) => {
  return(
      <div>
        <h1> Movie id = {match.params.id} and name is = { match.params.title } </h1>
          
        <button
            className={"btn btn-outline-info my-2 my-sm-0"}
            onClick={() => HandleButtonTransfer(history, "/movies")}>
          OK!
        </button>

      </div>

  );
}

export default MoviesForm;