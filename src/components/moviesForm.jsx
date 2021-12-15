import React from "react";
import onSave from "../functionsJS/handleSaveButton";
const MoviesForm = ({ match, history }) => {
  return(
      <div>
        <h1> Movie id = {match.params.id} and name is = { match.params.title } </h1>

        <button
            className={"btn btn-outline-info my-2 my-sm-0"}
            onClick={() => onSave(history)}>
          Save
        </button>

      </div>

  );
}

export default MoviesForm;