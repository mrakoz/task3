import React from "react";
import { Status } from "./Status";
import validator from "validator";
import { isValidLoginCharacter } from "../validators";

export class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      status: "none",
      valid: false,
      added: false
    };
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <h3>Форма добавления нового пользователя</h3>
        <input
          type="text"
          placeholder="Имя"
          value={this.state.name}
          onChange={e => {
            this.setState({
              name: e.target.value
            });
          }}
        />
        <input
          value={this.state.phone}
          className={
            validator.isMobilePhone(this.state.phone, "be-BY") ? "green" : "red"
          }
          placeholder="+375 xx xxx xx xx"
          maxLength="13"
          onChange={evt => {
            this.setState({
              phone: evt.target.value
            });
          }}
        />
        {/* <Status
          status={this.state.status}
          onChangeSelect={current => {
            this.setState({
              status: current
            });
          }}
        /> */}
        <select
          value={this.state.status}
          onChange={e => {
            this.setState({ status: e.target.value });
          }}
        >
          <option value="one">Одна покупка</option>
          <option value="moreOne">Больше одной покупки</option>
          <option value="none">Не покупал</option>
        </select>
        <button
          className={
            validator.isMobilePhone(this.state.phone, "be-BY") ? "green" : ""
          }
          type="button"
          disabled={!validator.isMobilePhone(this.state.phone, "be-BY")}
          onClick={() => {
            if (
              this.state.name &&
              this.state.name.trim() &&
              this.state.phone &&
              this.state.phone.trim()
            ) {
              this.setState({
                name: "",
                phone: "",
                status: "none",
                added: true
              });
              this.props.onSave(
                this.state.name,
                this.state.phone,
                this.state.status,
                this.state.added
              );
            }
          }}
        >
          Добавить
        </button>

        <button onClick={() => this.props.Cancel()}>Отмена</button>
      </form>
    );
  }
}
