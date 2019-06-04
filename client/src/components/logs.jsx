import React, { Component } from 'react';

class Logs extends Component {

    render() { 
        let time = 0;
        if(this.props.activeLogs&&this.props.activeLogs.length){
        this.props.activeLogs.map(log=>time+=log.log_time)
        }
        let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(time / 3600000)).slice(-2);

        return ( <div className="Logs">
                    <h2>You spent on this task:</h2>
                        <div className="stopwatch-display">
                            {hours} : {minutes} : {seconds}
                        </div>
                    <h2>today.</h2>

            </div> );
    }
}
 
export default Logs;