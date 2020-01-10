import React from "react";

// Форма редактирования задачи.
// Принимает от родителя следующие prop'ы
// - taskText - текст задачи, которые можно отредактировать.
// - onSave - функция, которая вызывается, если пользователь нажал кнопку Save и текст не пустой, получает текст из input'а
// - onCancel - функция, которая вызывается, если пользователь нажал кнопку Cancel
export class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.taskText, // начально значения текста в поле берется из prop'а, переданного родителем
      phone: this.props.userPhone
    };
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          value={this.state.text}
          onChange={e =>
            this.setState({
              text: e.target.value
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
            if (this.state.text && this.state.text.trim()) {
              this.setState({ text: "" , phone: "" });
              this.props.onSave(this.state.text, this.state.phone);
            }
          }}
        >
          Save
        </button>
        <button onClick={() => this.props.onCancel()}>Cancel</button>
      </form>
    );
  }
}
