// VIEW
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const SNAKE_COLOR = `red`;
const BOARD_COLOR = '#6D9ED0';

const PERCENT_OF_SCREEN_TO_FIT_GAME             = 100 /100;
const PERCENT_OF_GAME_CANVAS_TO_FIT_GAME_BOARD  = 75 / 100;

var numberOfRowsOnGameBoard                     =   20;
var numberOfColumnsOnGameBoard                  =   20;

const rowCreationSpecs = `<div class="gameBoardRow"></div>`
const cellCreationSpecs = `<div class="gameBoardCell"></div>`;


function sizeGameElements () {
    var viewPort = $(window);
    var width = viewPort.width();
    var height = viewPort.height();
    var smallestSize,
        gameCanvasSize,
        distanceFromTop,
        distanceFromLeft,
        gameBoardSize,
        gameBoardDistanceFromTop,
        gameBoardDistanceFromLeft;

    if (width > height) {
        smallestSize = height;
    } else {
        smallestSize = width;
    }
    
    // Sizing Game Canvas
    gameCanvasSize = smallestSize * PERCENT_OF_SCREEN_TO_FIT_GAME;
    
    distanceFromTop = (height - gameCanvasSize) / 2;
    distanceFromLeft = (width - gameCanvasSize) / 2;
    
    
    $("#gameCanvas").width(gameCanvasSize);
    $("#gameCanvas").height(gameCanvasSize);
    $("#gameCanvas").css({ top : distanceFromTop, left: distanceFromLeft });
    
    // Sizing Game Board
    gameBoardSize = PERCENT_OF_GAME_CANVAS_TO_FIT_GAME_BOARD * gameCanvasSize;
    
    gameBoardDistanceFromTop = (gameCanvasSize - gameBoardSize) / 2;
    gameBoardDistanceFromLeft = (gameCanvasSize - gameBoardSize) / 2;
    
    
    $("#gameBoard").width(gameBoardSize);
    $("#gameBoard").height(gameBoardSize);
    $("#gameBoard").css({ top : gameBoardDistanceFromTop, left: gameBoardDistanceFromLeft });
    
    // Sizing Game Board Rows
    $(".gameBoardRow").height(gameBoardSize / numberOfRowsOnGameBoard );
    $(".gameBoardRow").css({ width: "100%", border: "1px"});
    
    //
}

function resizeGameCells () {
  var rowHeight = $("#gameBoard").height() / numberOfRowsOnGameBoard;
  var cellHeight = ($("#gameBoard").height() - numberOfRowsOnGameBoard) / numberOfRowsOnGameBoard;  
  var columnLength = ($("#gameBoard").width() - numberOfColumnsOnGameBoard - 1)  / numberOfColumnsOnGameBoard;

    $(".gameBoardRow").css({height: rowHeight});
    $(".gameBoardCell").css({height: cellHeight, width: columnLength});
  
}



function createGameTiles () {
  var rowHeight = $("#gameBoard").height() / numberOfRowsOnGameBoard;
  var cellHeight = ($("#gameBoard").height() - numberOfRowsOnGameBoard) / numberOfRowsOnGameBoard;  
  var columnLength = ($("#gameBoard").width() - numberOfColumnsOnGameBoard - 1)  / numberOfColumnsOnGameBoard;
  var j = 1
  for (var i = 0; i < numberOfRowsOnGameBoard; i++) {
    var rowName = "gameBoardRow-" + (i+1).toString();
    $("#gameBoard").append(rowCreationSpecs);
    $("#gameBoard").children().last().attr("id", function () {
      return rowName;
    });
    $("#gameBoard").children().last().css({height: rowHeight});
    for (var k=0; k < numberOfColumnsOnGameBoard; k++, j++) {
      $("#" + rowName).append(cellCreationSpecs);
      $("#" + rowName).children().last().attr("id", function () {
        return "gameBoardCell-" + (j).toString();
      })
      $("#" + rowName).children().last().css({height: cellHeight, width: columnLength});
      
      
    }
  }
    
}





















function paintSnakeSquare (num) {
  var square = "gameBoardCell-" + (num).toString();
  $("#" + square).css({'background-color': SNAKE_COLOR});

}

function unpaintSnakeSquare (num) {
  var square = "gameBoardCell-" + (num).toString();
  $("#" + square).css({'background-color': BOARD_COLOR});
}


















 var newestGame = new game();


$(document).ready(function(){
  sizeGameElements();
  createGameTiles();
  
  paintSnakeSquare(newestGame.startLocation);
  
  $(window).resize(function(){
    sizeGameElements();
    resizeGameCells();
  });
  

  
  
  newestGame.engageGameEngine();



  $(document).keydown(function (event) {
    console.log(event.which);
    newestGame.acceptKeyboardInput(event.which);
  });
  
})



// LOGIC
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function game() {
  this.startLocation = (numberOfColumnsOnGameBoard / 2) + (numberOfRowsOnGameBoard/2) * numberOfColumnsOnGameBoard;
  this.headDirection = 'right';
  this.tailDirection = 'right';
  this.head = this.startLocation - 0;
  this.tail = this.startLocation - 1;
  
  this.tailPath = [this.headDirection];
  
  this.gameIsOver = false;
  
  this.makeTurn = function () {
    switch(this.headDirection) {
      case 'right':
        this.head++;
        break;
      case 'left':
        this.head--;
        break;
      case 'up':
        this.head -= (numberOfColumnsOnGameBoard);
        break;
      case 'down':
        this.head += (numberOfColumnsOnGameBoard);
        break;
    }

    this.tailPath.push(this.headDirection);
    this.tailDirection = this.tailPath.shift();
    
    switch(this.tailDirection) {
      case 'right':
        this.tail++;
        break;
      case 'left':
        this.tail--;
        break;
      case 'up':
        this.tail -= (numberOfColumnsOnGameBoard);
        break;
      case 'down':
        this.tail += (numberOfColumnsOnGameBoard);
        break;
    }
    
    
    paintSnakeSquare(this.head);
    unpaintSnakeSquare(this.tail);
  };  
  
  this.engageGameEngine = function () {
    window.setInterval( function () {
      this.makeTurn();
    }.bind(this)  
    , 1000);
  
  };
  
  this.acceptKeyboardInput = function (input) {
    switch (input) {
      case 38:
        this.headDirection = 'up';
        break;
      case 39:
        this.headDirection = 'right';
        break;
      case 40:
        this.headDirection = 'down';
        break;
      case 37:
        this.headDirection = 'left';
        break;            
    }
  }
  
}

 




function gameOver () {
  var gameIsOver = true;
}

function checkGameOver (location) {
  if (  location % numberOfColumnsOnGameBoard  === 1 || location % numberOfColumnsOnGameBoard  === 0 ||
        location % numberOfRowsOnGameBoard     === 1 || location % numberOfRowsOnGameBoard     === 0
  ) {
    return true;
  } else {
    return false;
  }
}