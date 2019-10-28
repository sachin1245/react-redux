import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { updateCurrent } from './reducers/todo';

function App(props) {
  return (
    <div className="App">
        <div className="Todo-App">
          <TodoForm 
          changeCurrent={props.updateCurrent}
          currentTodo={props.currentTodo} />
          <TodoList todos={props.todos}></TodoList>
        </div>
    </div>
  );
}

const mapDispatchToProps = {updateCurrent};
const mapStateToProps = (state) => state;
const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedApp;
