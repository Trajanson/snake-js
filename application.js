const PERCENT_OF_SCREEN_TO_FIT_GAME             = 100 /100;
const PERCENT_OF_GAME_CANVAS_TO_FIT_GAME_BOARD  = 75 / 100;

var numberOfRowsOnGameBoard                     =   40;
var numberOfColumnsOnGameBoard                  =   40;



function sizeGameElements() {
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
    
    gameCanvasSize = smallestSize * PERCENT_OF_SCREEN_TO_FIT_GAME;
    
    distanceFromTop = (height - gameCanvasSize) / 2;
    distanceFromLeft = (width - gameCanvasSize) / 2;
    
    
    $("#gameCanvas").width(gameCanvasSize);
    $("#gameCanvas").height(gameCanvasSize);
    $("#gameCanvas").css({ top : distanceFromTop, left: distanceFromLeft });
    
    gameBoardSize = PERCENT_OF_GAME_CANVAS_TO_FIT_GAME_BOARD * gameCanvasSize;
    
    gameBoardDistanceFromTop = (gameCanvasSize - gameBoardSize) / 2;
    gameBoardDistanceFromLeft = (gameCanvasSize - gameBoardSize) / 2;
    
    
    $("#gameBoard").width(gameBoardSize);
    $("#gameBoard").height(gameBoardSize);
    $("#gameBoard").css({ top : gameBoardDistanceFromTop, left: gameBoardDistanceFromLeft });
}



function createGameTiles() {
    
}

$(document).ready(function(){
  sizeGameElements();
  
  $(window).resize(function(){
    sizeGameElements();
  });
  
})

