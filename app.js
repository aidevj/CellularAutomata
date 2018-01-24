!function() {
  'use strict'
  
  let currentGrid =[];
  let nextGrid =[];
  let gridSize = 20;
  let liveNeighborMap =[];    // holds number of live neighbors in each cell of current grid
  
  var once = false;
  var mouseX, mouseY;
    
  const app = {
    canvas: null,
    ctx: null,
    
    init() {
      this.canvas = document.getElementsByTagName('canvas')[0];
      this.ctx = this.canvas.getContext( '2d' );
      this.draw = this.draw.bind( this );    
      this.fullScreenCanvas();
      
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
      
      console.log(currentGrid);
         
      
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
      /*let swap = currentGrid;
      currentGrid = nextGrid;
      nextGrid = swap;*/
      
      for (let i = 0; i < gridSize; i++) {
        liveNeighborMap[i] = [];
        
        for (let j = 0; j < gridSize; j++) {
          liveNeighborMap[i][j] = 0;
                    
          //check 4 directions
          //if (currentGrid[i-1][j] === 1) liveNeighborMap[i][j]++;  //left     
          //if (currentGrid[i+1][j] === 1) liveNeighborMap[i][j]++;  //right    
          if (currentGrid[i][j-1] === 1) liveNeighborMap[i][j]++;  //up 
          if (currentGrid[i][j+1] === 1) liveNeighborMap[i][j]++;  //down  
          }
        }
      
      
        if (!once) {
          console.log(liveNeighborMap);
          once = true;
        }
        
      
      
    },
    
    
    draw() {
      requestAnimationFrame( this.draw );
      this.animate();
      
      
      
      
      // draw to your canvas here
      
      let cellWidth = this.canvas.width / gridSize;
      let cellHeight = this.canvas.height / gridSize;
      
      // background
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect( 0,0, this.canvas.width, this.canvas.height );

      // FILL IN GRID
      
      for (let i = 0; i < gridSize; i++) {
        let row = currentGrid[i];
        let yPos = i * cellHeight;

        for (let j = 0; j < gridSize; j++) {
          let cell = row[j];
          if (cell === 1) {
            let xPos = j * cellWidth;

            this.ctx.fillStyle = 'green';
            this.ctx.fillRect( xPos, yPos, cellWidth, cellHeight );
          }
        }
      }
      
      this.ctx.strokeStyle = 'black';
      
      // DRAW GRID LINES
      for (let i = 0; i < gridSize; i++) {
        let yPos = i * cellHeight;
        let xPos = i * cellWidth;
        
        // draw horizantals
        this.ctx.beginPath();
        this.ctx.moveTo(0, yPos);
        this.ctx.lineTo(this.canvas.width, yPos);
        this.ctx.stroke();
        this.ctx.closePath(); 
        
        // draw verticals
        this.ctx.beginPath();
        this.ctx.moveTo(xPos, 0);
        this.ctx.lineTo(xPos, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();      
      }
    
      
    }
  }
  
  window.onload = app.init.bind( app );
  
}()