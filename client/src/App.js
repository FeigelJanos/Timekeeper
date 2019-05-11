import React, {Component} from 'react';
import Login from './components/login';
import TopBar from './components/topbar';
import BottomBar from './components/bottombar';
import Tasks from './components/tasks';
import Register from './components/register';


class App extends Component {
  constructor(props) {
    super(props);
  
  this.state = {
    login: true,
    register: false,
    collapse: false,
    newTask: false,
    delete: false,
    user: {
      name: '',
      password: '',
      id: 1
    },
    tasks: [],
    active: 0,
    time: new Date()
  }
}

toggle = ()=> {
  this.setState(state => ({ collapse: !state.collapse }));
};

getNewTask = () =>{
  this.setState(state => ({ newTask: !state.newTask, delete: false }));
};

postNewTask = () =>{

};

changeTaskStatus = () =>{

};

toggleDelete = () =>{
  this.setState(state => ({ delete: !state.delete, newTask: false }));
}

deleteSelected = () =>{

}

getTime = () =>{

};

addTime = () =>{

};

login=()=>{

  };

logout = ()=>{

};
  
getTasks = (user_id) =>{
    fetch(`/tasks/all/${user_id}`)
    .then(res => res.json())
    .then(res => this.setState({tasks: res}));

  };

  render(){
    if(!this.state.login){
      return (
        <div className="Login">
          <TopBar aut={this.state.login}/>
          {this.state.register?<Register />:<Login />}
          <BottomBar />   
        </div>
      );
    }

  return (
    <div className="App">
      <TopBar aut={this.state.login}/>
      <Tasks 
      onList={this.getTasks}
      user={this.state.user.id} 
      taskList={this.state.tasks} 
      toggle={this.toggle} 
      collapse={this.state.collapse} 
      newTask={this.state.newTask} 
      reveal={this.getNewTask}
      delete={this.state.delete}
      toggleDelete={this.toggleDelete}
      />
    </div>
  );
  }
}

export default App;
