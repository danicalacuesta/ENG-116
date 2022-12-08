//"I pledge my honor that I abided the Stevens honor system"- Danica Lacuesta

//---Requirements are all met---//
//(i)Intelligent decision making (if/switch)
//^^if statements are used throughout almost all functions
//(ii)repeating a set of operations to compute something meaningful (for/while)
//^^For loop is used in checkWinner function
//(iii)graceful and scalable software design (classes/objects)
//^^classes are used in all of the functions
//(iv)dealing with large data sets by using arrays, and whereapplicable, using files.
//array is on lines 122-131, and html text file is used to showcaase game
//(V)250+ lines of code if working alone
//^^total of 294 lines of code for this project
//------------------//

const tiles = document.querySelectorAll(".tile");
const PLAYER_X="X";
const PLAYER_O="O";
let turn=PLAYER_X;

const gameboardState= Array(tiles.length);
gameboardState.fill(null);

//elements
const strikeline=document.getElementById("strikeline");
const gameoverBoard=document.getElementById("gameoverboard");
const gameoverText=document.getElementById("gameovertext");
const playAgainbutton=document.getElementById("playagainbutton");
playAgainbutton.addEventListener("click",newgame);

tiles.forEach((tile)=>tile.addEventListener("click", tileClick));

function sethoverText(){
    //initiates the hover when the user goes over a tile, but it is called in the tileClick function
    tiles.forEach((tile)=>{
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });

    const hoverClass= `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile)=>{
        if (tile.innerText==""){
            tile.classList.add(hoverClass);
        }
    });
}



function tileClick(event){
    //this function takes turns between x and o when pressed on the board
    //console shows which number tile is filled and if it is filled with x and o
    //if tile is not filled, it says null on console
    if(gameoverBoard.classList.contains("visible")){
        return;
    }
    const tile=event.target;
    const tileNumber=tile.dataset.index;
    if (tile.innerText != ""){
        return;
    }
    if (turn === PLAYER_X){
        tile.innerText=PLAYER_X;
        gameboardState[tileNumber-1]=PLAYER_X;
        turn=PLAYER_O;
    }
    else {
        tile.innerText=PLAYER_O;
        gameboardState[tileNumber-1]=PLAYER_O;
        turn=PLAYER_X;
    }
    sethoverText();
    //^^function is set over here so it lines up when the user clicks on a tile
    checkWinner();
}

function checkWinner(){
    //checks for winner
    for (const winningCombo of winningCombos){
        const {combo,strikelineClass}=winningCombo;
        const tileValue1=gameboardState[combo[0]-1];
        const tileValue2=gameboardState[combo[1]-1];
        const tileValue3=gameboardState[combo[2]-1];

        if(
            tileValue1 != null &&
            tileValue1=== tileValue2 &&
            tileValue1=== tileValue3
        ){
            strikeline.classList.add(strikelineClass);
            gameOver(tileValue1);
            return;
        }
    }
    //checks for draw/tie
    const filledtiles= gameboardState.every((tile)=>tile!==null);
    if (filledtiles){
        gameOver(null);
    }
}

function gameOver(winnerText){
    //text once game is completed
    let text= 'Draw!';
    if (winnerText!=null){
        text= `Winner is ${winnerText}!`;
    }
    gameoverBoard.className="visible";
    gameoverText.innerText=text;
}

function newgame(){
    strikeline.className="strikeline";
    gameoverBoard.className="hidden";
    gameboardState.fill(null);
    tiles.forEach((tile)=>(tile.innerText=""));
    turn=PLAYER_X;
    sethoverText();

}

const winningCombos=[
    //ways to win in row
    {combo: [1,2,3], strikelineClass: "strikeline-row-1"},
    {combo: [4,5,6], strikelineClass: "strikeline-row-2"},
    {combo: [7,8,9], strikelineClass: "strikeline-row-3"},
    //ways to win in columns
    {combo: [1,4,7], strikelineClass: "strikeline-column-1"},
    {combo: [2,5,8], strikelineClass: "strikeline-column-2"},
    {combo: [3,6,9], strikelineClass: "strikeline-column-3"},
    //ways to win diagonally
    {combo: [1,5,9], strikelineClass: "strikeline-diagonal-1"},
    {combo: [3,5,7], strikelineClass: "strikeline-diagonal-2"},
];
