import React, { Component, useReducer } from "react";
import "../Styles/MyTodos.css";

class MyTodos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      todoData: {
        title: "",
      },
    };
  }

  handleOnChange = (event) => {
    let { todoData } = this.state;
    todoData.title = event.target.value;
    this.setState({ todoData });
  };

  handleOnClickAddBtn = () => {
    let { todoData, arr } = this.state;
    if (todoData.title === "") {
      return alert("Invalid input!!");
    }
    let getIndex = arr.findIndex(
      (enteredTodo) => enteredTodo.title === todoData.title
    );
    if (getIndex > -1) {
      return alert("Todo with this name is already exist!!!");
    }
    arr.push(Object.assign({}, todoData));
    this.setState({ arr });
  };

  handleOnEditTodo = (index) => {
    let { arr } = this.state;
    const newTodoValue = prompt(
      "Make the changes you want to see!!",
      arr[index].title
    );
    if (newTodoValue === "") {
      return alert("You did'nt Entered any Todo!!!");
    } else if (newTodoValue === null) {
      return alert("Dont want to change your Todo!!");
    }
    arr.splice(index, 1, { title: newTodoValue });
    this.setState({ arr });
  };

  handleOnDeleteTodo = (index) => {
    let { arr } = this.state;
    arr.splice(index, 1);
    this.setState({ arr });
  };

  handleOnClickSearchBtn = () => {
    const { todoData, arr } = this.state;
    const getIndex = arr.findIndex(
      (searchedValue) => searchedValue.title === todoData.title
    );
    const serialNumber = getIndex + 1;
    if (todoData.title === "") {
      return alert("Invalid Input");
    }

    if (getIndex > -1) {
      alert(
        `${todoData.title} is available at Serial number ${serialNumber}!!`
      );
    } else {
      alert(`${todoData.title} is not available in the Todo list!!`);
    }
  };

  render() {
    return (
      <div className="mainContainer">
        <section id="dataEntrySection">
          <div className="controls">
            <label htmlFor="todoTitle">Enter Todo Title</label>
            <input
              value={this.state.todoData.title}
              onChange={this.handleOnChange}
              type="text"
              id="todoTitle"
            />
            <div className="btn">
              <button onClick={this.handleOnClickAddBtn} id="addTodoBtn">
                Add
              </button>
              <button onClick={this.handleOnClickSearchBtn} id="searchTodoBtn">
                Search
              </button>
            </div>
          </div>
        </section>
        <section id="todoItemCount">
          <p>Total Number Of added Todos are :- {this.state.arr.length}</p>
        </section>
        {this.state.arr.length?(<section id="todoList">
          <ol>
            {this.state.arr.map((value, index) => (
              <div className="todoListItems" key={index}>
                <li>{value.title}</li>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => this.handleOnEditTodo(index)}
                >
                  <ion-icon name="create-outline"></ion-icon>
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => this.handleOnDeleteTodo(index)}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </span>
              </div>
            ))}
          </ol>
        </section>
      ):(<p id='blankText'>Looks like there is nothing todo :-)</p>)}
        </div>
    );
  }
}
export default MyTodos;
