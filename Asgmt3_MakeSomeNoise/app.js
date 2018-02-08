!function() {
  'use strict'
  
  let currentGrid =[];
  let nextGrid =[];
  let gridSize = 50;
  let liveNeighborMap =[]; 
  
  let numAlive = 0;
  
  let debug = false;
  
    
  const app = {
    canvas: null,
    ctx: null,
    audCtx: null,
    osc: null,
    
    init() {
      this.canvas = document.getElementsByTagName('canvas')[0];
      this.ctx = this.canvas.getContext( '2d' );
      this.draw = this.draw.bind( this );    
      this.fullScreenCanvas();
      
      // AUDIO
      this.audCtx = new AudioContext();
      this.osc = this.audCtx.createOscillator();
      
      
      window.onresize = this.fullScreenCanvas.bind( this );  
      
      requestAnimationFrame( this.draw );
        
      // Asssign random values to each cell initially 
      for (let i = 0; i < gridSize; i++) {
          currentGrid[i] = [];
          nextGrid[i] = [];
        
          for (let j = 0; j < gridSize; j++) {
              currentGrid [i][j] = Math.random() > .5 ? 1 : 0;
              nextGrid[i][j] = 0;
          }
      }
      
      if (debug) console.log(currentGrid);
    },
      

    
    fullScreenCanvas() {    // in own function b/c so can also assign it to onresize event of window obj
      this.canvas.width  = this.height = window.innerWidth;
      this.canvas.height = this.width  = window.innerHeight;
    },
    
    // update your simulation here
    animate() {
      // for each cell...
      //    count the number of live neighbors
      //    use game of life rules to determine if cell should live or die
      ///   set new cell value in nextGrid based on results
      //
      // assign values in nextGrid to currentGrid
      numAlive = 0;
      
      for (let i = 0; i < gridSize; i++) {
        liveNeighborMap[i] = [];
        
        for (let j = 0; j < gridSize; j++) {
          liveNeighborMap[i][j] = 0;
                    
          //check 4 directions
          if (i !== 0 && currentGrid[i-1][j] === 1) liveNeighborMap[i][j]++;  //left 
          if (i+1 !== gridSize && currentGrid[i+1][j] === 1) liveNeighborMap[i][j]++;  //right
          if (j !== 0 && currentGrid[i][j-1] === 1) liveNeighborMap[i][j]++;  //up 
          if (j+1 !== gridSize && currentGrid[i][j+1] === 1) liveNeighborMap[i][j]++;  //down  
          
          // count live cells
          if (currentGrid[i][j] === 1) numAlive++;
        }
      }
      
      // print new num alive
      document.getElementById('hud-upperRight').innerHTML = "Live Cells: " + numAlive;
      
      
      // Determine nextGrid
      for (let i = 0; i < gridSize; i++) {
        nextGrid[i] = [];
        
        for (let j = 0; j < gridSize; j++) {
          if (currentGrid[i][j] === 0){ // DEAD
            if (liveNeighborMap[i][j] === 3) {
              nextGrid[i][j] = 1;
            }
            else {
              nextGrid[i][j] = 0;
            }
          }
          
          if (currentGrid[i][j] === 1) { //ALIVE
            if (liveNeighborMap[i][j] < 2) {
              nextGrid[i][j] = 0;
            } 
            else if (liveNeighborMap[i][j] > 3) {
              nextGrid[i][j] = 0;
            } 
            else {  // 2 or 3
              nextGrid[i][j] = 1;
            } 
          }          
        }
      }
        
        
      
      let swap = currentGrid;
      currentGrid = nextGrid;
      nextGrid = swap;
      
      
    },
    
    
    draw() {
      requestAnimationFrame( this.draw );
      this.animate();   
      
      const freq = Math.floor((Math.random() * 2200) + 220);
      this.playNote(.10);

      // draw to your canvas here
      
      let cellWidth = this.canvas.width / gridSize;
      let cellHeight = this.canvas.height / gridSize;
      
      // background
      this.ctx.fillStyle = '#b7c8db';
      this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );

      // FILL IN GRID
      
      for (let i = 0; i < gridSize; i++) {
        let row = currentGrid[i];
        let yPos = i * cellHeight;

        for (let j = 0; j < gridSize; j++) {
          let cell = row[j];
          if (cell === 1) {
            let xPos = j * cellWidth;

            this.ctx.fillStyle = "#2c5098";
            this.ctx.fillRect( xPos, yPos, cellWidth, cellHeight );
          }
        }
      }
      
      this.ctx.strokeStyle = 'black';

      
      this.sleep(1500);
    
    },
    
    sleep(milliseconds) {   // bad???
      var start = new Date().getTime();
      for (let i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) break;
      }
    },
    
    playNote(duration) {
      this.osc.type = 'triangle';
      this.osc.frequency = 220; // for now play one tone
      
      //const gainNode = this.audCtx.createGain();
      //gainNode.gain.setValueAtTime(0, this.audCtx.currentTime);
      //gainNode.gain.linearRampToValueAtTime()
      
      //this.osc.connect(gainNode);
      //gainNode.connect( this.audCtx.destination);
      
      this.osc.start();
      osc.stop(this.audCtx.currentTime + duration * 2);
    }
  }
  
  window.onload = app.init.bind( app );
  
}()