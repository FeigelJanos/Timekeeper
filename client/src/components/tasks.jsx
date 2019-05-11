import React, { Component } from 'react';
import { Button, Collapse, Label, Input } from 'reactstrap';

class Tasks extends Component {
    
    componentDidMount(){
       
        let user_id = this.props.user;
        this.props.onList(user_id);
    }
    
    render() { 

       const Tasks = this.props.taskList.map(task =>(
            task.active?'':<span key={`span-${task.task_id}`}>{this.props.delete? <input type="checkbox"/>: ''}<button key={task.task_id}
                                         className="taskButton" 
                                         onClick={this.props.legyenaktiv}>
                                {task.task_name}
                                </button>
                        </span>
            )
        );

        return ( 
            <div className="tasksGrid">
                <div className="taskList">
                <Button color="warning" onClick={this.props.toggle}>Task List:</Button>
                <Collapse isOpen={this.props.collapse}>
                        {Tasks}
                        {this.props.delete?<Button color="danger">Delete Checked</Button>:''}
                        <Button color="primary" onClick={this.props.reveal}>{this.props.newTask?'Dismiss':'New Task'}</Button>
                        <Collapse isOpen={this.props.newTask}>
                        <form>
                        <Label for="task">New Task:</Label>
                        <Input type="text" name="task" id="task" placeholder="Your new task:" style={{maxWidth: "500px"}}/>
                        <Button color="primary">Create</Button>
                        </form>
                        </Collapse>
                        <Button color="danger" onClick={this.props.toggleDelete}>{this.props.delete?'Dismiss':'Delete Tasks'}</Button>
                </Collapse>  
                </div>
                <div className="taskActive">
                    {this.props.taskList.map(task => task.active?<button>{task.task_name}</button>:'')}
                </div>
            </div>
         );
    }
}
 
export default Tasks;