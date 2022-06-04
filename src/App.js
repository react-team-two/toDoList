import React from "react";
import "./App.css";
import "./media.css";
import feather from "./images/feather.png";
import attach from "./images/attach.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskValue: "",
    };
  }

  handleChange = (event) => {
    this.setState({ taskValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let arr = this.state.tasks;
    arr.push(this.state.taskValue);
    this.setState({ tasks: arr });
    const state = this.state.tasks[this.state.tasks.length - 1];
    // Put the object into storage
    const localStorageList =
      JSON.parse(localStorage?.getItem("toDoList")) || [];
    localStorage.setItem(
      "toDoList",
      JSON.stringify([...localStorageList, state])
    );
  };

  deleteItem = (i) => {
    const list = JSON.parse(localStorage.getItem("toDoList"));
    const filterArr = list.filter((element, index) => index !== i);
    this.setState({ tasks: filterArr });
    localStorage.setItem("toDoList", JSON.stringify(filterArr));
  };


  render() {
    const list = JSON.parse(localStorage?.getItem("toDoList")) || [];
    return (
      <>
        <img className="feather" src={feather} alt="feather" />

        <section className="container">
          <form className="head" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="enter you task"
              className="inpHead"
              onChange={this.handleChange}
              value={this.state.taskValue}
            />

            <button className="btnHead"> add </button>
          </form>
          

          <div className="lists">
            {list.map((element, index) => (
              <div className="listItem">
                <div className="box">
                  <div>
                    <p>
                      <input type={"checkbox"} /> {element}
                    </p>
                  </div>

                  <div>
                    <button
                      className="btnEdit"
                      onClick={() => {}}
                    >
                      edit
                    </button>
                    <button
                      className="btnDelete"
                      onClick={() => this.deleteItem(index)}
                    >
                      delete
                    </button>
                  </div>
                </div>
                <img className="attach" src={attach} alt="attach" />
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }
}

export default App;