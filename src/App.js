import './App.css';
import React from 'react';
import shortid from 'shortid'
import ListItem from './components/ListItem';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component{

  state = {
    items: [],
    currentItem:{
      text: '',
      key: ''
    }
  }
  handleInput = (input) => {
    this.setState({
      currentItem:{
        text: input.target.value,
        key: shortid.generate()
      }
    })
  }
  addTodo = (todo) => {
    todo.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !== ""){
      this.setState(state=>({
        items: [newItem, ...state.items],
        currentItem:{
          text: "",
          key: ""
        }
      }))
    }
  }
  deleteTodo = id => {
    const filtered = this.state.items.filter(item => item.key !== id)
    this.setState({
      items: filtered
    })
  }

  setUpdate = (text, key) => {
    const updatedItems = this.state.items;
    updatedItems.map(item => {
      if(item.key === key){
          item.text = text
      }
      this.setState({
        items: updatedItems
      })
      
    })
  }

  render(){
    return(
      <div className='App'>
        <header>
          <form id='todo-form' onSubmit={this.addTodo}>
            <input type="text" placeholder="Add todo..."
            value={this.state.currentItem.text}
            onChange={this.handleInput}/>
            <button type='submit'>Add Todo</button>
          </form>
      </header>
      <ListItem items={this.state.items} deleteTodo={this.deleteTodo} setUpdate={this.setUpdate}/>
      </div>
    );
  }
}

export default App;
