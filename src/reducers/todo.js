import {getTodos, createTodo, updateTodo, destroyTodo} from '../lib/todoServices';
import { showMessage} from './messages';

const initState = {
    todos: [],
    currentTodo: ''
};

const CURRENT_UPDATE = 'CURRENT_UPDATE';
export const  TODO_ADD = 'TODO_ADD';
export const TODOS_LOAD = 'TODOS_LOAD';
export const TODO_REPLACE = 'TODO_REPLACE';
export const TODO_REMOVE = 'TODO_REMOVE'

export const updateCurrent = (val) => ({type:CURRENT_UPDATE , payload: val});
export const loadTodos = (todos) => ({type: TODOS_LOAD, payload: todos});
export const addTodo = (todo) => ({type: TODO_ADD,  payload: todo});
export const replaceTodo = (todo) => ({type: TODO_REPLACE, payload: todo});
export const removeTodo = (id) => ({type: TODO_REMOVE, payload: id});
export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(showMessage('Loading todos'));
        getTodos()
            .then(todos => dispatch(loadTodos(todos)));
    }
}
export const saveTodo = (name) => {
    return (dispatch) => {
        dispatch(showMessage('Saving todo'))
        createTodo(name)
        .then(todo => dispatch(addTodo(todo)));
    }
}

export const toggleTodo = (id) => {
    return (dispatch, getState) => {
        dispatch(showMessage('showing todo update'));
        const {todos} = getState().todo
        const todo = todos.find(t=> t.id === id);
        const toggled = {...todo, isCompleted: !todo.isCompleted};

        updateTodo(toggled)
            .then(res => dispatch(replaceTodo(res)));
    }
}

export const deleteTodo = (id) => {
    return (dispatch, getState) => {
        dispatch(showMessage('Removing Todo'));
        destroyTodo(id)
            .then(() => dispatch(removeTodo(id)))
    }
}

export const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case 'active':
            return todos.filter(t => !t.isCompleted);
        case 'completed':
            return todos.filter(t => t.isCompleted);
        default:
            return todos;
    }
}

export default (state = initState, action) => {

    switch (action.type){
        case TODO_ADD:
            return {...state,currentTodo: '', todos: state.todos.concat(action.payload)};
        case CURRENT_UPDATE:
            return {...state, currentTodo: action.payload};
        case TODOS_LOAD:
            return {...state, todos: action.payload}
        case TODO_REPLACE:
            return {...state,
                 todos: state.todos
                    .map(t => t.id === action.payload.id ? action.payload: t)};
        case TODO_REMOVE: 
            return {...state,
                todos: state.todos.filter(t => t.id !== action.payload)
            }
        default:
            return state;
    }
}