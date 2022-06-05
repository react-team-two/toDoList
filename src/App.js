import React from "react";
import "./App.css";
import "./media.css";
import feather from "./images/feather.png";
import ListTasks from "./components/ListTasks";
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
  changeTasks=(val,index)=>{
    const filterA= this.state.tasks.map((element,po)=>index===po?element=val:element);
    this.setState({ tasks: filterA });
    console.log(`tasks= ${this.state.tasks}, index=${index}, val= ${val}, filterArr= ${filterA}`);
  }

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
              <ListTasks element={element} index={index} delete={this.deleteItem} changeTasks={this.changeTasks}/>
            ))}
          </div>
        </section>
      </>
    );
  }
}

export default App;