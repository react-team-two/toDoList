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
      fields: {},
      errors: {},
    };
  }
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }


    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange = (field, event) => {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({ fields });
    this.setState({ taskValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.handleValidation()) {
      alert("Form has errors.");
    }

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

  /**Start... Edit Task */
  editItem = (i) => {
    let tasktitle = this.refs["taskName"];
    tasktitle.setAttribute("contenteditable", "true");

    let check = this.refs["doneEdit"];
    check.style.display = "block";
  };
  checkDone = (i) => {
    const listofItem = JSON.parse(localStorage.getItem("toDoList"));
    const valuetoEdit = listofItem.filter((element, index) => index === i);

    let tasktitle = this.refs["taskName"];
    tasktitle.setAttribute("contenteditable", "false");
    listofItem.splice(
      listofItem.indexOf(valuetoEdit[i]),
      1,
      tasktitle.textContent
    );
    localStorage.setItem("toDoList", JSON.stringify(listofItem));

    let check = this.refs["doneEdit"];
    check.style.display = "none";

    this.setState({ tasks: listofItem });
  };
  /**End... Edit Task */

  render() {
    const list = JSON.parse(localStorage?.getItem("toDoList")) || [];
    return (
      <>
        <img className="feather" src={feather} alt="feather" />

        <section className="container">
          <form className="head" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              placeholder="enter you task"
              className="inpHead"
              onChange={this.handleChange.bind(this, "name")}
              value={this.state.fields["name"]}
            />

            <button className="btnHead"> add </button>
          </form>
          <span className="span-error">
            <mark>{this.state.errors["name"]}</mark>
          </span>

          <div className="lists">
            {list.map((element, index) => (
              <div className="listItem">
                <div className="box">
                  <div>
                    <p ref="taskName">
                      {" "}
                      <input type={"checkbox"} /> {element}
                    </p>
                    <button
                      className="btnDone"
                      ref="doneEdit"
                      onClick={() => this.checkDone(index)}
                    >
                      Done
                    </button>
                  </div>

                  <div>
                    <button
                      ref="btnEdit"
                      className="btnEdit"
                      onClick={() => this.editItem(index)}
                    >
                      edit
                    </button>
                    <button
                      ref="btnDelete"
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
