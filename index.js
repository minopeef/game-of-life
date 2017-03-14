class Game extends React.Component {
    constructor(props) {
    super(props);     
    this.play = this.play.bind(this);  
    this.pause = this.pause.bind(this); 
    this.clear = this.clear.bind(this); 
    this.random = this.random.bind(this); 
    this.handleCell = this.handleCell.bind(this); 
                          //height, width, random/ current level/ for sake enable/disable buttons 
    this.state = {cells:generateGrid(30, 50, true), count: 0, isRunning: true};
  }
  
  componentDidMount() {
   this.interval = setInterval(() => this.nextGeneration(), 400); //invokes to compute next level
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  random() {
    clearInterval(this.interval); //prevent MULTIPLE INTERVAL 
    this.setState({cells: generateGrid(30, 50, true), count: 0, isRunning: true});
    this.interval = setInterval(() => this.nextGeneration(), 400); 
  } 
  
  play() {
    clearInterval(this.interval); //prevent MULTIPLE INTERVAL
    this.interval = setInterval(() => this.nextGeneration(), 400); 
    this.setState({isRunning: true}); //for buttons
  } 
  
  pause() {
    clearInterval(this.interval); //prevent MULTIPLE INTERVAL
    this.setState({isRunning: false}); //for buttons
  } 
  
  clear() {
    clearInterval(this.interval);
    this.setState({cells: generateGrid(30, 50), count: 0, isRunning: false});
  } 
    
  handleCell(row, column, value) { //when user clicks a cell, toggle value
    let newCells = this.state.cells;
    newCells[row][column] = value == 1 ? 0 : 1;
    this.setState({cells: newCells}); 
  }
  
  nextGeneration() {
    if(isEmptyGrid(this.state.cells)) {
      return; //if all cells are 0, stop
    }
    let neighbors = countNeighbors(this.state.cells); 
    let oldGrid = this.state.cells;
    let newGrid = generateGrid(30, 50);
    for(let i=0, rows = oldGrid.length; i < rows; i++) {
      for(let j=0, columns = oldGrid[0].length; j < columns; j++) {
          if (oldGrid[i][j] == 1 && neighbors[i][j] == 2 || neighbors[i][j] == 3) { //if alive and neighb 2 or 3, stays alive
              newGrid[i][j] = 1;
         } else if (oldGrid[i][j] == 0 && neighbors[i][j] == 3) {//if dead and has 3 neighb new cell will be born
              newGrid[i][j] = 1;
         } else { //otherwise death
              newGrid[i][j] = 0;
         }
       }
     }
    this.setState({cells: newGrid, count: ++this.state.count}); //update grid and count
  }
            
  render() {
    return ( <div>
               <div className="header">
                 <h1>React</h1>
                 <a href="https://www.youtube.com/watch?v=CgOcEZinQ2I" target="blank"><h1 className="right">The game of life</h1></a>
               </div>    
              
               <div className="board">
                 <button className="random" onClick={this.random}>random</button>
                 <button className="play" onClick={this.play} disabled={this.state.isRunning}>play</button>
                 <button className="pause" onClick={this.pause} disabled={!this.state.isRunning}>pause</button>
                 <button className="clear" onClick={this.clear}>clear</button>
                 <span>Generation: {this.state.count}</span>
                 <div className="grid">                 
                   <table>
                      <tbody> 
                        {this.state.cells.map((row,i) =>
                          <tr key={i}> {row.map((cell,j) =>
                              <Cell key={j} row={i} column={j} value={this.state.cells[i][j]} 
                                    click={this.handleCell} class={this.state.cells[i][j] ? "alive" : "dead"} />)}
                          </tr> )}
                      </tbody>
                    </table>
                 </div> 
               </div>        
               <div className="footer" />                                   
             </div> 
    )
  }
}

class Cell extends React.Component {//we need this Component, coz we need props to hold the data
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {    
    this.props.click(this.props.row, this.props.column, this.props.value); //lift state up
  }
  
  render() {
    return (//toggle between dark and light background
      <td className={this.props.class} onClick={this.handleClick} /> 
    )
  }
}

const generateGrid = (rows, columns, random=false) => {
  let cells = [];
  for(let i=0; i < rows; i++) {//for every row, makes columns
    let row = [];
    cells.push(row);
      for(let j=0; j < columns; j++) {//if 3rd argument is true, push 1(alive), otherwise push 0 (dead cell) 
        row.push(random? (Math.random() < 0.2? 1 : 0) : 0);
      }
    }
  return cells;
}

const isEmptyGrid = (grid) => {
  let empty = true; //assume by default as empty
  grid.map(row => {
       row.map(cell => { //if found alive return true
         if(cell == 1) empty = false;
    });
  });
  return empty;
}

const countNeighbors = (grid) => { //2d array, each cell contain a number of neighbors
  let count = generateGrid(30, 50);
     grid.map((row, rowIndex, grid) => {
       row.map((cell, cellIndex) => {
        const left = torus(cellIndex - 1, row.length);
        const right = torus(cellIndex + 1, row.length);
        const up = torus(rowIndex - 1, grid.length);
        const down = torus(rowIndex + 1, grid.length);
        const neighbours = [grid[up][left],
                            grid[up][cellIndex],
                            grid[up][right],
                            grid[rowIndex][left],
                            grid[rowIndex][right],
                            grid[down][left],
                            grid[down][cellIndex],
                            grid[down][right]];
         
        count[rowIndex][cellIndex] = neighbours.reduce((x,y)=>x+y); //counts numbers and puts in a cell
        return cell;
    });
  });
  return count;
}

const torus = (index, length) => { // handle connecting edges together
   if (index === -1) {
    return length - 1;
  } else if (index === length) {
    return 0;
  } else {
    return index;
  }
}

ReactDOM.render(<Game/>, document.getElementById('game'));

