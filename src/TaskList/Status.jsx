import React from "react";

export class Status extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: this.props.status,
    };
   console.log("Status props:", this.props.status)
   console.log("Status state:", this.state.current)
   console.log("Test props:", this.props.test)
  }

  render() {
    return (
      <select
        value={this.state.current}
        onChange={e => {
          this.setState({ current: e.target.value }, function() {
            console.log("Callback", this.state.current);
           })
          this.props.onChangeSelect(e.target.value);
        }}
      >
        <option value="one">Одна покупка</option>
        <option value="moreOne">Больше одной покупки</option>
        <option value="none">Не покупал</option>
      </select>
    );
  }
}
