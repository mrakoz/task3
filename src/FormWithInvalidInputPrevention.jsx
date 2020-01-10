import React from "react";
import { isValidLoginCharacter } from "./validators";

export class FormWithInvalidInputPrevention extends React.Component {
  state = {
    login: ""
  };

  render() {
    return (
      <form
        onSubmit={evt => {
          evt.preventDefault();
        }}
      >
        <input
          type="text"
          value={this.state.login}
          name="login"
          onChange={e => this.setState({ login: e.target.value })}
          onKeyPress={e => {
            // Если нажатый символ не валиден, то отменяем действие, символ не вводится
            // и onChange не вызывается
            if (!isValidLoginCharacter(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </form>
    );
  }
}
