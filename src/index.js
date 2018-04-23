import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)
  

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      secondsElapsed: 0, 
      laps: [],
      lastClearedIncrementer: null,
      started:false
    };
    this.incrementer = null;
  }  
    
  handleStartClick() {
  	if (this.state.started === false || (this.state.started === true && this.state.secondsElapsed > 0)) {
   		this.incrementer = setInterval( () =>
      		this.setState({
        		secondsElapsed: this.state.secondsElapsed + 1
      	})
    	, 1000);
    	this.setState({started: true});
    }
  }
  
  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }
  
  handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: 0,
      laps: [],
      started: false
    });
  }
  
  handleLapClick() {
    this.setState({
      laps: this.state.laps.concat([this.state.secondsElapsed])
    })
  }
  
  render() {
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
   
        {(this.state.secondsElapsed === 0 ||
          this.incrementer === this.state.lastClearedIncrementer
          ? <Button className="start-btn" onClick={this.handleStartClick.bind(this)}>start</Button>
          : <Button className="stop-btn" onClick={this.handleStopClick.bind(this)}>stop</Button>
        )}
        
        {(this.state.secondsElapsed !== 0 &&
          this.incrementer !== this.state.lastClearedIncrementer
          ? <Button onClick={this.handleLapClick.bind(this)}>lap</Button>
          : null
        )}

        {(this.state.secondsElapsed !== 0 &&
          this.incrementer === this.state.lastClearedIncrementer
          ? <Button onClick={this.handleResetClick.bind(this)}>reset</Button>
          : null
        )}

        <ul className="stopwatch-laps">
          { this.state.laps.map((lap, i) =>
              <li className="stopwatch-lap"><strong>{i + 1}</strong> {formattedSeconds(lap)}</li>)
          }
        </ul>
      </div>
    );
  }
}


const Button = (props) =>
  <button type="button" {...props} className={"btn " + props.className } />;

ReactDOM.render(<Stopwatch />, document.body);