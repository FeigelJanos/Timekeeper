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
    activeTask: {},
    time:'',
    timerRuns: false,
    logActive: false
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
  this.setState(state => ({register: !state.register }));
};

toggleLogs = () =>{
  this.setState(state => ({logActive: !state.logActive }));
};

registerTimer = (status) =>{
  switch(status){
    case 'start':
      this.setState({ timerRuns: true });
      break;
    case 'stop':
        this.setState({ timerRuns: false });
      break;
    case 'finish':
        this.setState({ timerRuns: false });
      break;    
    default:
      break;  
  }
};

deactivateTask = (time, finished) =>{
  fetch(`/times/insert`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      time: time,
      finished: finished,
      task_id: this.state.activeTask.task_id
    })
  })
  .then(res => res.json());
  };

getTasks = (user_id) =>{
  fetch(`/tasks/all/${user_id}`)
  .then(res => res.json())
  .then(res => res.filter(task => task.active===false))
  .then(res => this.setState({tasks: res}, ()=>{this.state.tasks===res?
  console.log('tasks in state and database are the same', this.state.tasks):console.log('tasks are different in state and database')}));
 };

getActiveTask = (user_id) =>{
  fetch(`/tasks/active/${user_id}`)
  .then(res => res.json())
  .then((res) => {
    const at = res[0];
    
    this.setState({activeTask: at}, ()=>{
    this.state.activeTask===at ?
    console.log('active task updated', this.state.activeTask) : console.log('active task not updated')})});
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

activateTask = async (clickedId) =>{
  if(!this.state.timerRuns){
    try {
      await Promise.all([
        fetch(`/tasks/deactivate`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            user_id: this.state.userID
          })
        }).then(value => value.json()),
        fetch(`/tasks/activate`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            toActive_id: clickedId,
          })
        }).then(value => value.json()),
        fetch(`/tasks/all/${this.state.userID}`).then(value => value.json()),
        fetch(`/tasks/active/${this.state.userID}`).then(value => value.json())
      ]).then(allResponses => {
        const getTasks = allResponses[2].filter(res=> res.active === false) 
        const getActiveTask = allResponses[3][0]  
      
      this.setState({tasks: getTasks, activeTask: getActiveTask},()=>{this.state.tasks ===getTasks && this.state.activeTask === getActiveTask 
        ? console.log("Active task switched succesfully"):console.log("Houston, we've got a problem")})
      });
    }
    catch(err) {
      console.log(err);
    };
  }
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
    .then (res =>  {res.error?this.setState({logError: res.error})
    :this.setState(()=>({login: true, userID: res[0].user_id, userName: res[0].user_name, logError: ''}))
  });
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
      onStart={this.getActiveTask}
      user={this.state.userID}
      name={this.state.userName} 
      taskList={this.state.tasks} 
      activeTask={this.state.activeTask}
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
      registerTimer={this.registerTimer}
      logActive={this.state.logActive}
      toggleLogs={this.toggleLogs}
      />
     
    </div>
  );
  }
}

export default App;
