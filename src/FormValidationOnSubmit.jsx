import React from "react";
import { isValidEmail, isValidLogin } from "./validators";

const getStyle = isValid => {
  if (!isValid) {
    return { border: "solid 1px red" };
  }

  return null;
};

// Функция-заглушка иммитирующая отправку полей на сервер
function sendToServer() {
  console.log("sent to server.");
}

export class FormValidationOnSubmit extends React.Component {
  state = {
    login: "",
    isLoginValid: true,
    isEmailValid: true,
    email: ""
  };

  // onChange = evt => {
  //   const update = {};

  //   update[evt.target.name] = evt.target.value;

  //   this.setState(update);
  // };

  // Обработчик изменения поля формы. Эквивалентен закомментированному выше.
  // Обновляет поле в стейте, соответствующее аттрибуту name тега input.
  onChange = evt =>
    this.setState({
      [evt.target.name]: evt.target.value
    });

  render() {
    return (
      <form
        onSubmit={evt => {
          evt.preventDefault();

          // Валидируем оба поля и только если об валидны, отправлем форму на сервер
          const isLoginValid = isValidLogin(this.state.login);
          const isEmailValid = isValidEmail(this.state.email);

          if (isLoginValid && isEmailValid) {
            sendToServer();
          }

          this.setState({
            isLoginValid,
            isEmailValid
          });
        }}
      >
        {/* 
          Вместо стиля было бы правильнее завести класс в css и передавать в className, если 
          поле не валидно, т.к. свойства css не зависят от переменных, вычисляемых в процессе работы 
          приложения. Так оставлено для простоты.
        */}
        <input
          style={getStyle(this.state.isLoginValid)}
          type="text"
          value={this.state.login}
          name="login"
          onChange={this.onChange}
        />
        <input
          style={getStyle(this.state.isEmailValid)}
          type="text"
          value={this.state.email}
          name="email"
          onChange={this.onChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
