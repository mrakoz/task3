import React from "react";
import { Status } from "./Status";
import validator from "validator";
import { isValidLoginCharacter } from "../validators";

export class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.userName,
      phone: this.props.userPhone,
      status: this.props.status
    };
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          value={this.state.name}
          onChange={e =>
            this.setState({
              name: e.target.value
            })
          }
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
        test="test"
          current={this.props.status}
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
          disabled={!validator.isMobilePhone(this.state.phone, "be-BY")}
          className={
            validator.isMobilePhone(this.state.phone, "be-BY") ? "green" : ""
          }
          onClick={() => {
            if (this.state.name && this.state.name.trim()) {
              this.setState({ name: "", phone: "" });
              this.props.onSave(
                this.state.name,
                this.state.phone,
                this.state.status
              );
            }
          }}
        >
          Сохранить
        </button>
        <button onClick={() => this.props.onCancel()}>Отмена</button>
      </form>
    );
  }
}
