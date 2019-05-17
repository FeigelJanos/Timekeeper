import React, { Component } from 'react';
import { Button, Collapse, Label, Input } from 'reactstrap';
import Stopwatch from './stopwatch';

class Tasks extends Component {
    constructor(props) {
        super(props);
      
      this.state = {
       taskToDelete: [],
       newTaskName: ''
      }
    }



    componentDidMount(){
       
        let user_id = this.props.user;
        this.props.onList(user_id);
    };
    
    handleChange(event) {

        this.setState({newTaskName: event.target.value})
      
      };

    handleCheck(event){
        this.setState({ taskToDelete: [...this.state.taskToDelete, event.target.id] })
        
    };

    submitNewTask = ()=>{
        this.props.postNewTask(this.state.newTaskName);
        this.setState({newTaskName: ''});
    };


    render() { 

       const Tasks = this.props.taskList.map(task =>(
            task.active?'':<span key={`span-${task.task_id}`}>
                                {this.props.delete? <input type="checkbox" id={task.task_id} onChange={this.handleCheck.bind(this)}/>: ''}
                                <button key={task.task_id}
                                        className="taskButton" 
                                        onClick={()=>this.props.activateTask(task.task_id)}>
                                {task.task_name}</button>
                            </span>
            )
        );

        return ( 
            <div className="tasksGrid">
                <h1>Welcome {this.props.name}</h1>
                <div className="taskList">
                <Button color="warning" onClick={this.props.toggle}>Task List:</Button>
                <Collapse isOpen={this.props.collapse}>
                        {Tasks}
                        {this.props.delete?<Button color="danger" onClick={()=>this.props.deleteSelected(this.state.taskToDelete)}>Delete Checked</Button>:''}
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
                        <Button color="primary" onClick={this.submitNewTask}>Create</Button>
                        </form>
                        </Collapse>
                        <Button color="primary" onClick={this.props.reveal}>{this.props.newTask?'Dismiss':'New Task'}</Button>
                        <Button color="danger" onClick={this.props.toggleDelete}>{this.props.delete?'Dismiss':'Delete Tasks'}</Button>
                </Collapse>  
                </div>
                <div className="clock">

                    <div className="timer">
                    <Stopwatch taskList={this.props.taskList} deactivateTask={this.props.deactivateTask} />
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Tasks;