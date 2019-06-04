import React, { Component } from 'react';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
  
  this.state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
    };
  }

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
    this.props.registerTimer('start');
  };

  pauseTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  activateStatistics = () =>{
    this.setState({ timerOn: false });
    clearInterval(this.timer);
    this.props.toggleLogs();
    this.props.selectLogs();
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
    this.props.registerTimer('finish');
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
    this.props.registerTimer('stop');
  };

  componentWillUnmount() {
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
          <button onClick={this.state.timerOn?null:this.activateStatistics} className="task-active" >{this.props.activeTask?
                                                                                                      this.props.activeTask.task_name
                                                                                                      :''}</button>
        </div>
        <div className="stopwatch-display">
          {hours} : {minutes} : {seconds} 
        </div>
        {!this.state.timerOn?
          <button onClick={this.startTimer} className="play-pause"><i className="fas fa-play"></i></button>:
          <button onClick={this.pauseTimer} className="play-pause"><i className="fas fa-pause"></i></button>
        }
          <button onClick={this.finishedTimer} className="check-button"><i className="fas fa-check-square"></i></button>
    
          <button onClick={this.stopTimer} className="stop-button"><i className="fas fa-stop"></i></button>
      </div>
    );
  }
}

export default Stopwatch;