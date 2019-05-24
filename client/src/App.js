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
    login: false,
    register: false,
    collapse: false,
    newTask: false,
    delete: false,
    statistics: false,
    userID: '',
    userName: '',
    logError: '',
    tasks: [],  
    time:'' 
  }
}

toggle = ()=> {
  this.setState(state => ({ collapse: !state.collapse }));
};

toggleDelete = () =>{
  this.setState(state => ({ delete: !state.delete, newTask: false }));
};

getNewTask = () =>{
  this.setState(state => ({ newTask: !state.newTask, delete: false }));
};

redirectToLogReg = () =>{
  this.setState(state => ({register: !state.register, }));
};

getTasks = (user_id) =>{
  fetch(`/tasks/all/${user_id}`)
  .then(res => res.json())
  .then(res => this.setState({tasks: res}));

};

postNewTask = (task) =>{
  fetch(`/tasks/insert`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      task_name: task,
      user_id: this.state.userID
    })
  })
  .then(res => res.json())
  .then(res => {this.getTasks(this.state.userID)});
  this.setState({newTask: false, delete: false});
};

deleteSelected = (selectedArr) =>{
  selectedArr.map(id =>fetch(`/tasks/delete`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      task_id: id,
    })
  })
  .then(res => res.json())
  .then(res => {this.getTasks(this.state.userID)})
  );
  this.setState({newTask: false, delete: false});
};

activateTask = (id) =>{
console.log(id)
};

deactivateTask = (time, finished) =>{
console.log(`${time} time and ${finished}`);
};

login = (username, password) =>{
  if(username && password){
    fetch(`/users/login`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      password: password,
      user_name: username,
    })
  })
  .then(res =>  res.json())
  .then(res => 
    {if (res.error){
      console.log("Database error")
      this.setState({logError: res.error});
    }
    else{
      console.log("Logging in...")
      this.setState(()=>({login: true, userID: res[0].user_id, userName: res[0].user_name, logError: ''}));
    }});
  }
};


logout = () =>{
  this.setState(()=>({login: false, userID: '', userName: ''}));
  };
    
register = (username, password, email) =>{
  if(username && password && email){
    fetch(`/users/insert`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      password: password,
      user_name: username,
      email: email
    })
  })
  .then(res => res.json());
  this.setState({register: false, login: false});
}
  
};


  render(){

    if(!this.state.login){
      return (
        <div className="Login">
          <TopBar aut={this.state.login} logout={this.logout}/>
          {this.state.register?<Register toLogin={this.redirectToLogReg} register={this.register}/>
                              :<Login toRegister={this.redirectToLogReg} 
                                      login={this.login}
                                      logError={this.state.logError}
                              /> }
          <BottomBar />   
        </div>
      );
    }

  return (
    <div className="App">
      <TopBar aut={this.state.login} logout={this.logout}/>
      <Tasks 
      onList={this.getTasks}
      user={this.state.userID}
      name={this.state.userName} 
      taskList={this.state.tasks} 
      toggle={this.toggle} 
      collapse={this.state.collapse} 
      newTask={this.state.newTask} 
      reveal={this.getNewTask}
      delete={this.state.delete}
      toggleDelete={this.toggleDelete}
      activateTask={this.activateTask}
      deactivateTask={this.deactivateTask}
      postNewTask={this.postNewTask}
      deleteSelected={this.deleteSelected}
      />
     
    </div>
  );
  }
}

export default App;
