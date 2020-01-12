import React from "react";
import { Status } from "./Status";

export class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      status: "none"
    };
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Имя"
          value={this.state.name}
          onChange={e =>
            this.setState({
              name: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Номер телефона"
          value={this.state.phone}
          onChange={e =>
            this.setState({
              phone: e.target.value
            })
          }
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
          onClick={() => {
            if (
              this.state.name &&
              this.state.name.trim() &&
              this.state.phone &&
              this.state.phone.trim()
            ) {
              this.setState({ name: "", phone: "", status: "none" });
              this.props.onSave(
                this.state.name,
                this.state.phone,
                this.state.status
              );
            }
          }}
        >
          Добавить
        </button>
      </form>
    );
  }
}
