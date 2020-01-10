import React from "react";

// Форма добавления задачи.
// Принимает от родительского компонента функцию onSave, которую вызывает,
// если текст задачи не пустой и пользователь жмет кнопку Add, передае в onSave текст из input'а
export class AddForm extends React.Component {
  state = {
    name: "",
    phone: ""
  };

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
          type="text"
          value={this.state.phone}
          onChange={e =>
            this.setState({
              phone: e.target.value
            })
          }
        />
        <button
          onClick={() => {
            if (this.state.name && this.state.name.trim() && this.state.phone && this.state.phone.trim()) {
              this.setState({ name: "", phone: "" });
              this.props.onSave(this.state.name, this.state.phone);
            }
          }}
        >
          Добавить
        </button>
      </form>
    );
  }
}
