import React, { useState } from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskValue: '',
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
  };

  deleteItem = (i) => {
    const filterArr = this.state.tasks.filter((element, index) => index != i);
    this.setState({ tasks: filterArr });
  };

  render() {
    return (
      <section className='container'>
        <form className='head' onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='enter you task'
            className='inpHead'
            value={this.state.taskValue}
            onChange={(e) => this.setState({ taskValue: e.target.value })}
          />
          <button className='btnHead'> add </button>
        </form>

        <div className='lists'>
          {this.state.tasks.map((element, index) => (
            <ListItems
              key={index}
              element={element}
              deleteItem={() => this.deleteItem(index)}
            />
          ))}
        </div>
      </section>
    );
  }
}

const ListItems = ({ element, deleteItem }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className='listItem'>
      <input
        type='checkbox'
        checked={checked}
        onChange={() => setChecked(!checked)}
      ></input>
      <p className={checked ? 'checked' : 'notchecked'}>{element}</p>
      <div>
        <button className='btnEdit'>edit</button>
        <button className='btnDelete' onClick={deleteItem}>
          delete
        </button>
      </div>
    </div>
  );
};

export default App;
