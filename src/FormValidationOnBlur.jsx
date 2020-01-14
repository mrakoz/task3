import React from "react";
import { isValidEmail, isValidLogin } from "./validators";

const getStyle = (isTouched, isValid) => {
  if (isTouched && !isValid) {
    return { border: "solid 1px red" };
  }

  return null;
};

export class FormValidationOnBlur extends React.Component {
  state = {
    login: "",
    email: "",

    // Состояние того, взаимодействовал ли пользователь с полем.
    // Если пользователь, например, фокусировался на поле login, а потом перемещал каретку на другое, то
    // state.isTouched.login будет true (см. this.onBlur).
    // Только те поля, с которым пользователь взаимодействовал валидируеются.
    isTouched: {
      login: false,
      email: false
    }
  };

  onChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  onBlur = evt => {
    this.setState({
      isTouched: {
        ...this.state.isTouched,
        [evt.target.name]: true
      }
    });
  };

  render() {
    return (
      <form
        onSubmit={evt => {
          evt.preventDefault();
        }}
      >
        <input
          style={getStyle(
            this.state.isTouched.login,
            // Вместо того, чтобы держать состояние валидности поля в this.state,
            // вычисляем его на основе текущего значения поля для упрощения стурктуры state и
            // кода компонента
            isValidLogin(this.state.login)
          )}
          onBlur={this.onBlur}
          type="text"
          value={this.state.login}
          name="login"
          onChange={this.onChange}
        />
        <input
          style={getStyle(
            this.state.isTouched.email,
            isValidEmail(this.state.email)
          )}
          type="text"
          value={this.state.email}
          name="email"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
