// VIEW
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const SNAKE_COLOR = `red`;
const BOARD_COLOR = '#6D9ED0';
const FOOD_COLOR = '#6AFF2C';

const PERCENT_OF_SCREEN_TO_FIT_GAME             = 100 /100;
const PERCENT_OF_GAME_CANVAS_TO_FIT_GAME_BOARD  = 75 / 100;
const BORDER_WIDTH_OF_GAME_BOARD_IN_PIXELS      = 10;


const PROBABILITY_OF_FOOD_APPEARING = .5;

const rowCreationSpecs = `<div class="gameBoardRow"></div>`;
const cellCreationSpecs = `<div class="gameBoardCell"></div>`;

var numberOfRowsOnGameBoard                     =   20;
var numberOfColumnsOnGameBoard                  =   20;


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
        gameBoardDistanceFromLeft,
        heightBelowGameBoard,
        scoreKeeperDivDistanceFromTop;

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
    $("#gameBoard").css({ top : gameBoardDistanceFromTop, left: gameBoardDistanceFromLeft, 'border-width': (BORDER_WIDTH_OF_GAME_BOARD_IN_PIXELS+'px') });
    
    // Sizing Game Board Rows
    $(".gameBoardRow").height(gameBoardSize / numberOfRowsOnGameBoard );
    $(".gameBoardRow").css({ width: "100%", border: "1px" });
    
    // Sizing Score Containing Div
    heightBelowGameBoard = height - (gameBoardDistanceFromTop + gameBoardSize + (2*BORDER_WIDTH_OF_GAME_BOARD_IN_PIXELS));
    scoreKeeperDivDistanceFromTop = (gameBoardDistanceFromTop + gameBoardSize + (2*BORDER_WIDTH_OF_GAME_BOARD_IN_PIXELS));
    var heightOfScoreKeeper = .65 * (heightBelowGameBoard);
    var scoreKeeperDistanceFromLeftOfViewPort = distanceFromLeft + (.85 * gameBoardSize) ;
    var widthOfScoreKeeper = (gameBoardSize + 2* BORDER_WIDTH_OF_GAME_BOARD_IN_PIXELS) * .5;
    
    $("#scoreKeeper").css({ top : scoreKeeperDivDistanceFromTop, height: heightOfScoreKeeper, left: scoreKeeperDistanceFromLeftOfViewPort, width: widthOfScoreKeeper });

  
    // New Game Button
    var distanceFromTopOfCanvasForNewGameButton = gameBoardDistanceFromTop * 1.21 + 10 + gameBoardSize;
    $('#newGameBox').css({ left: gameBoardDistanceFromLeft, top: distanceFromTopOfCanvasForNewGameButton });
  
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
  var j = 1;
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
      });
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

function paintFoodSquare (num) {
  var square = "gameBoardCell-" + (num).toString();
  $("#" + square).css({'background-color': FOOD_COLOR});
}



function updateScore (num) {
  $('#scoreTally').text(num);
}




















function SetNewGameButton(game) {
  $('#newGameBox').fadeIn(600);
  $('#newGameBox').click(function () {
    console.log(game.fullBody);
    repaintGameBoard();
    game.resetGame();
    $('#newGameBox').fadeOut();
    // this.resetGame
  });
};

function repaintGameBoard () {
  $('.gameBoardCell').css({'background-color': BOARD_COLOR});
};


function launchGame () {
 var newestGame = new game();
 
  newestGame.engageGameEngine();

  $(document).keydown(function (event) {
    newestGame.acceptKeyboardInput(event.which);
  });

 
}

var intervalID = null;




// taken from http://stackoverflow.com/questions/10935026/how-to-clear-interval-and-set-it-again
function intervalManager(flag, animate, time, context) {
  console.log("this was called!");
   if(flag) {
     console.log("Let's GOOOO!!!");
     intervalID =  setInterval(animate.bind(context), time);
   } else {
     clearInterval(intervalID);
     console.log("INTERVAL WAS CLEARED");
   }
}




function playGame (gameObject) {
  gameObject = this;
  console.log(this);
      if (! gameObject.checkGameOver() && ! gameObject.gameIsOver) {
        if (gameObject.head === gameObject.foodLocation) {
          gameObject.swallowFood();
        } else {
        console.log("A move is still being made.");
          gameObject.makeTurn();        
        }
        if (Math.random() < PROBABILITY_OF_FOOD_APPEARING && gameObject.foodLocation == 0) {gameObject.createFood();}
      } else {
        //intervalManager(false);
      }  
}
























$(document).ready(function(){
  sizeGameElements();
  createGameTiles();
  $('#newGameBox').hide();
  

  $(window).resize(function(){
    sizeGameElements();
    resizeGameCells();
  });
  

  launchGame();
  



  

});



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
  this.fullBody = [this.startLocation];
  
  this.tailPath = [this.headDirection];
  
  this.foodLocation = 0;
  
  this.score = 1;
  this.gameIsOver = false;
  
  this.engageGameEngine = function () {
    
    intervalManager(true, playGame, 250, this);

  };


  this.swallowFood = function () {
    this.setHeadDirection();
    
    this.fullBody.push(this.head);    
    
    this.tailPath.push(this.headDirection);

    paintSnakeSquare(this.head);
    this.foodLocation = 0;
    
    this.score++;
    updateScore(this.score);
    
  };

  this.makeTurn = function () {
    this.setHeadDirection();

    this.fullBody.push(this.head);    
    this.fullBody.shift();
  
    this.tailPath.push(this.headDirection);
    this.tailDirection = this.tailPath.shift();
    
    this.setTailDirection();

    
    
    paintSnakeSquare(this.head);
    if (this.fullBody.indexOf(this.tail) === -1 ) {
      unpaintSnakeSquare(this.tail);
    }
  };  




  this.setHeadDirection = function () {
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
  };
  
  this.setTailDirection = function () {
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
  };

  this.createFood = function () {
    if (this.fullBody.length >= (numberOfRowsOnGameBoard * numberOfColumnsOnGameBoard) -2 ) {return true;}
    var successfulAction = false,
        randomLocation;
    while (!successfulAction) {
      randomLocation = Math.floor(Math.random() * numberOfRowsOnGameBoard * numberOfColumnsOnGameBoard);
      if ( this.fullBody.indexOf(randomLocation) == -1 ) {
        paintFoodSquare(randomLocation);
        this.foodLocation = randomLocation;
        successfulAction = true;            
      }
    }
  };



  this.declareGameOver = function () {
    this.gameIsOver = true;
    SetNewGameButton(this);
  };
  
  this.checkGameOver = function (location) {
    console.log(this.fullBody.filter( onlyUnique ));
    if (  (this.head % numberOfColumnsOnGameBoard  === 1 && this.headDirection == 'left' )  ||
          (this.head % numberOfColumnsOnGameBoard  === 0 && this.headDirection == 'right')  ||
          (this.head <= numberOfRowsOnGameBoard          && this.headDirection == 'up'   )  ||
          (this.head >= (numberOfRowsOnGameBoard - 1) * numberOfColumnsOnGameBoard && this.headDirection == 'down'   ) ||
          (this.fullBody.filter( onlyUnique ).length < this.score) ||
          (this.fullBody.indexOf(this.tail) !== -1 && this.fullBody.length === 2 )
    ) {
      this.declareGameOver();
      return true;
    } else {
      return false;
    }
  };
  
  this.resetGame = function () {
    this.startLocation = (numberOfColumnsOnGameBoard / 2) + (numberOfRowsOnGameBoard/2) * numberOfColumnsOnGameBoard;
    this.headDirection = 'right';
    this.tailDirection = 'right';
    this.head = this.startLocation - 0;
    this.tail = this.startLocation - 1;
    this.fullBody = [this.startLocation];
    
    this.tailPath = [this.headDirection];
    
    this.foodLocation = 0;
    
    this.score = 1;
    updateScore(1);
    this.gameIsOver = false;
  }

}

 




// UTILITY FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// taken from http://stackoverflow.com/questions/1960473/unique-values-in-an-array
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
