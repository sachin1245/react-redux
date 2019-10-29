import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
// import {connect} from 'react-redux';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Message from './components/Message';
import Footer from './components/Footer';

function App(props) {
  return (
    <div className="App">
      <Router>
        <div className="Todo-App">
            <Message />
            <TodoForm />

            <Route path='/:filter?' render={({match}) => (
              <TodoList filter={match.params.filter}/>
            )}/>
            <Footer />
        </div>
      </Router>
        
    </div>
  );
}

// const mapDispatchToProps = {updateCurrent};
// const mapStateToProps = (state) => state;
// const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
// export default connectedApp;

export default App;
