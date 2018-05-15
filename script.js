class Stopwatch extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        running: false,
        times: {      
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        },
      }
    }
  
    reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }
  
    formatTime() {
      let{minutes, seconds, miliseconds} = this.state.times;
      return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
    }
  
    start() {
      if (!this.state.running) {
        this.setState({
          running: true,
          watch: setInterval(() => this.step(), 10)
        })
      }
    }  
  
    step() {
      if (!this.state.running) return;
      this.calculate();
    }
  
    calculate() {
      let{minutes, seconds, miliseconds} = this.state.times;
      miliseconds += 1;
      if (miliseconds >= 100) {
        seconds += 1;
        miliseconds = 0;
      }
      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }
      this.setState({
        times: {
          minutes,
          seconds,
          miliseconds
        }  
      });
    }
  
    stop() {
      this.setState({
        running: false
      });
      clearInterval(this.state.watch);
    }
   
    render() {

      return ( 
        <div>
          <nav className="controls">
            <button className="button" onClick={this.start.bind(this)}>Start</button>
            <button className="button" onClick={this.stop.bind(this)}>Stop</button>
            <button className="button" onClick={this.reset.bind(this)}>Reset</button>
          </nav>
          <div>
            {this.formatTime()}
          </div>
        </div> 
      )
    }
  }
  
  function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }
  
  
ReactDOM.render(<Stopwatch />, document.getElementById('app'));