!function() {
  'use strict'
  
  // interesting rules are 110, 126, 150, 182
  const SELECTED_RULE = 30
  
  const rules = {
    // http://mathworld.wolfram.com/Rule30.html
    30:[ 0,0,0,1,1,1,1,0 ],
    110:[ 0,1,1,0,1,1,1,0 ]    
  }
  
  let generation = 0
  const numGenerations = 500
  const width = 500
  
  const app = {
    canvas: null,
    ctx: null,
    nextState:[],
    currentState:[],
    
    init() {
      this.canvas = document.getElementsByTagName('canvas')[0]
      this.ctx = this.canvas.getContext( '2d' )
      this.draw = this.draw.bind( this )
      this.fullScreenCanvas()
      
      window.onresize = this.fullScreenCanvas.bind( this )  
      
      requestAnimationFrame( this.draw )
      
      for( let i = 0; i < width; i++ ) {
        this.currentState[ i ] = this.nextState[ i ] = 0
      }
      
      this.nextState[ Math.round( width / 2) ] = 1
    },
    
    fullScreenCanvas() {
      this.canvas.width  = this.height = window.innerWidth
      this.canvas.height = this.width  = window.innerHeight
    },
    
    // update your simulation here
    animate() {
      this.currentState = this.nextState.slice( 0 )
      
      for( let i = 0; i < width; i++ ) {
        let sum = ''        
        sum += i > 0 ? this.currentState[ i - 1 ] : 0
        sum += this.currentState[ i ]
        sum += i < width - 1 ? this.currentState[ i + 1 ] : 0
        this.nextState[ i ] = rules[ SELECTED_RULE ][ 7 - Number( '0b'+sum ) ]
      }
      
    },
    
    draw() {
      requestAnimationFrame( this.draw )
      const cellWidth = this.canvas.width / width
      const cellHeight = this.canvas.height / numGenerations
      //debugger
      for( let i = 0; i < width; i++ ) {
        if( this.nextState[ i ] === 1 ) {
          this.ctx.fillRect( cellWidth * i, cellHeight * generation, cellWidth, cellHeight )
        }
      }
      this.animate()
      generation++
      
      // draw to your canvas here
      this.ctx.fillStyle = 'red'
      
    }
  }
  
  window.onload = app.init.bind( app )
  
}()