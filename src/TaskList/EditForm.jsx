import React from "react";

export class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.userName, 
      phone: this.props.userPhone
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
            if (this.state.name && this.state.name.trim()) {
              this.setState({ name: "" , phone: "" });
              this.props.onSave(this.state.name, this.state.phone);
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
