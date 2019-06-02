import React, { Component } from 'react';
import { Button, Collapse, Label, Input } from 'reactstrap';
import Stopwatch from './stopwatch';
import Logs from './logs';

class Tasks extends Component {
    constructor(props) {
        super(props);
      
      this.state = {
       taskToDelete: [],
       newTaskName: '',
       activeLogs: []
      }
    }



    componentWillMount(){
       
        let user_id = this.props.user;
        this.props.onList(user_id);
        this.props.onStart(user_id)
    };

    componentDidUpdate(){

    };

    handleChange(event) {

        this.setState({newTaskName: event.target.value})
      
      };

    handleCheck(event){
        this.setState({ taskToDelete: [...this.state.taskToDelete, event.target.id] })
        
    };

    submitNewTask = ()=>{
        if(this.state.newTaskName){
            this.props.postNewTask(this.state.newTaskName);
            this.setState({newTaskName: ''});
        }
        
    };
    
    selectLogs = (user=this.props.user, task=this.props.activeTask.task_id) =>{
        let now = new Date();
        let dd = String(now.getDate()).padStart(2, '0');
        let mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = now.getFullYear();

        now = yyyy + '-' + mm + '-' + dd;
       
        
        fetch(`/times/from`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            task_id: task,
            user_id: user,
            date: now
          })
        })
        .then(res => res.json())
        .then(res => {this.setState({activeLogs: res})});
    };

    render() { 

        return ( 
            <div className="tasksGrid">
                <h1 className="task-title">Welcome {this.props.name}</h1>
                <div className="taskList">
                <Button color="warning" onClick={this.props.toggle} className="list-button">Task List:</Button>
                <Collapse isOpen={this.props.collapse}>
                        <div className="tasks-div">
                            <ul className="tasks-ul">
                                {this.props.taskList.map(task =>(
                                    <li key={`span-${task.task_id}`}>
                                {this.props.delete? 
                                    <input type="checkbox" 
                                           id={task.task_id} 
                                           onChange={this.handleCheck.bind(this)} 
                                           style={{marginRight: ".2em", marginLeft: ".2em"}}/>: ''}
                                <button key={task.task_id}
                                        className="task-button" 
                                        onClick={()=>this.props.activateTask(task.task_id)}>
                                {task.task_name}</button>
                            </li>
            )
        )}
                            </ul>
                        </div>
                        {this.props.delete?<Button color="danger" onClick={()=>this.props.deleteSelected(this.state.taskToDelete)} className="median-button">Delete Checked</Button>:''}
                        <Collapse isOpen={this.props.newTask}>
                        <form>
                        <Label for="task">New Task:</Label>
                        <Input type="text" 
                                name="task" 
                                id="task" 
                                placeholder="Your new task:" 
                                style={{maxWidth: "500px"}} 
                                value={this.state.newTaskName} 
                                onChange={this.handleChange.bind(this)}/>
                        <Button color="primary" onClick={this.submitNewTask} className="median-button">Create</Button>
                        </form>
                        </Collapse>
                        <Button color="primary" onClick={this.props.reveal} className="bottom-button">{this.props.newTask?'Dismiss':'New Task'}</Button>
                        <Button color="danger" onClick={this.props.toggleDelete} className="bottom-button">{this.props.delete?'Dismiss':'Delete Tasks'}</Button>
                </Collapse>  
                </div>
                <div className="clock">

                    <div className="timer">
                    <Stopwatch taskList={this.props.taskList} 
                               activeTask={this.props.activeTask}
                               deactivateTask={this.props.deactivateTask}
                               registerTimer={this.props.registerTimer}
                               toggleLogs={this.props.toggleLogs}
                               selectLogs={this.selectLogs}   
                    />
                    </div>
                </div>
                <div className="logs">
                    <div className="log-box">
                        {this.props.logActive?<Logs  />:''}                 
                    </div>
                </div> 
            </div>
         );
    }
}
 
export default Tasks;