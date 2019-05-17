import React, { Component } from 'react';

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  pauseTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  finishedTimer = () => {
    let time = this.state.timerTime;
    this.props.deactivateTask(time, true);
   
    this.setState({
      timerStart: 0,
      timerTime: 0,
      timerOn: false
    });
    
    clearInterval(this.timer);
  };

  stopTimer = () => {
    let time = this.state.timerTime;
    this.props.deactivateTask(time, false);

    this.setState({
      timerStart: 0,
      timerTime: 0,
      timerOn: false
    });
    
    clearInterval(this.timer);
  };

  render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <div className="Stopwatch">
         <div className="activeTask">
          {this.props.taskList.map(task => task.active?<button key={task.task_id} onClick={this.stopTimer}>{task.task_name}</button>:'')}
        </div>
        <div className="Stopwatch-display">
          {hours} : {minutes} : {seconds} 
        </div>
        {!this.state.timerOn?
          <button onClick={this.startTimer}><i className="fas fa-play"></i></button>:
          <button onClick={this.pauseTimer}><i className="fas fa-pause"></i></button>
        }
          <button onClick={this.finishedTimer}><i className="fas fa-check-square"></i></button>
    
          <button onClick={this.stopTimer}><i className="fas fa-stop"></i></button>
        
      </div>
    );
  }
}

export default Stopwatch;