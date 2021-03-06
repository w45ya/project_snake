import * as highScore from './highscore.js'
const canvas = document.getElementById("cnvs");
const gameState = {};
const grid = 50;
//const GameOverAudio = new Audio('./data/GameOver.mp3');
//const FoodEat = new Audio('./data/FoodEat.mp3');
let audioUrl = require('../data/GameOver.mp3');
const GameOverAudio = new Audio(audioUrl);
audioUrl = require('../data/FoodEat.mp3');
const FoodEat = new Audio(audioUrl);
const playButton = document.getElementById('playButton')
const soundChk = document.getElementById('soundChk');
const easymodeChk = document.getElementById('easymodeChk');
const Container = document.getElementById('container');
const CanvasContainer = document.getElementById('canvas_container');
const username = document.getElementById('login');
const mobile_control = document.getElementById('mobile_control');
const leftButton = document.getElementById('leftButton')
const rightButton = document.getElementById('rightButton')
const upButton = document.getElementById('upButton')
const downButton = document.getElementById('downButton')
let FrameCount = 0;
let ShowInfo = 0;
let SoundSet = 1;
let EasyMode = 1;

function setup() {
    canvas.style.background = "#000000";
    canvas.width = window.innerWidth-25-((window.innerWidth-25)%grid);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        canvas.height = window.innerHeight-90-((window.innerHeight-90)%grid)-250;
        mobile_control.style.display = "block";
    }
    else{
        canvas.height = window.innerHeight-90-((window.innerHeight-90)%grid);
    }
    gameState.lastTick = performance.now();
    gameState.lastRender = gameState.lastTick;
    gameState.tickLength = 250; //ms
    FrameCount = 0;
    gameState.snake = {
        x: 5*grid,
        y: grid,
        vx: grid,
        vy: 0,
        cells: [],
        l: 5,
        color: '#114400'
    }

    gameState.food = {
        x: 0,
        y: 0,
        color: '#ffaa00'
    }

    gameState.antiFood = {
        x: -grid,
        y: -grid,
        color: "#6201ff",
        isOnScreen: 0,
        isOnScreenTimer: 0,
        appearTime: 300,
        lifeCycle: 700,
        timer: 0
    }

    gameState.superFruit = {
        x: -grid,
        y: -grid,
        isOnScreen: 0,
        isOnScreenTimer: 0,
        color1: "#ff0000",
        color2: "#004200",
        appearTime: 500,
        lifeCycle: 300,
        timer: 0
    }

    for (let i = 0; i < gameState.snake.l; i++){
        gameState.snake.cells.push({ x: gameState.snake.x - grid*i, y: gameState.snake.y });
    }
}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run);
    const nextTick = gameState.lastTick + gameState.tickLength;
    let numTicks = 0;
    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick;
        numTicks = Math.floor(timeSinceTick/gameState.tickLength)
    }
    queueUpdates(numTicks);
    draw(tFrame);
    gameState.lastRender = tFrame;
}

function randomInt(from,to){
    return Math.floor(Math.random()*(to - from)+from);
}

function freeCell(snake,food,antiFood,superFruit){
    const gridX = Math.floor(canvas.width/grid);
    const gridY = Math.floor(canvas.height/grid);
    let x,y,bool = 0;
    while (bool===0) {
        x = randomInt(0,gridX)*grid;
        y = randomInt(0,gridY)*grid;
        bool = 1;
        for (let i = 0; i < snake.cells.length; i++) {
            if (x === snake.cells[i].x && y === snake.cells[i].y) {
                bool = 0;
            }
        }
        if ((x === food.x && y === food.y)||(x === antiFood.x && y === antiFood.y)||(x === superFruit.x && y === superFruit.y)) {
            bool = 0;
        }
    }
    return {x: x,y: y};
}

function draw(tFrame) {
    FrameCount++;
    const context = canvas.getContext('2d');
    const gridX = Math.floor(canvas.width/grid);
    const gridY = Math.floor(canvas.height/grid);
    const food = gameState.food;
    const antiFood = gameState.antiFood;
    const snake = gameState.snake;
    const superFruit = gameState.superFruit;
    if (FrameCount === 1) {
        food.x = randomInt(1,gridX)*grid;
        food.y = randomInt(1,gridY)*grid;
    }

    //clear canvas
    context.clearRect(0,0, canvas.width, canvas.height)

    //draw

    context.fillStyle = food.color;
    context.fillRect(food.x+grid/4, food.y+grid/4, grid/2, grid/2);

    context.fillStyle = antiFood.color;
    context.fillRect(antiFood.x+grid/3, antiFood.y+grid/3, grid/3, grid/3);

    context.fillStyle = superFruit.color1;
    context.fillRect(superFruit.x+grid/4, superFruit.y+grid/4, grid/2, grid/2);
    context.fillStyle = superFruit.color2;
    context.fillRect(superFruit.x+grid/2, superFruit.y+2, grid/5, grid/5);

    if (antiFood.isOnScreen===0){
        if(antiFood.timer < antiFood.appearTime){
            antiFood.timer += 1;
        }
        if (antiFood.timer === antiFood.appearTime){
            const cell = freeCell(snake,food,antiFood,superFruit);
            antiFood.x = cell.x;
            antiFood.y = cell.y;
            antiFood.isOnScreen = 1;
            antiFood.timer = 0;
        }
    }
    if (antiFood.isOnScreen){
        antiFood.isOnScreenTimer += 1;
        if (antiFood.isOnScreenTimer === antiFood.lifeCycle){
            antiFood.isOnScreen = 0;
            antiFood.x = -grid;
            antiFood.y = -grid;
            antiFood.isOnScreenTimer = 0;
        }
    }

    if (superFruit.isOnScreen===0){
        if(superFruit.timer < superFruit.appearTime){
            superFruit.timer += 1;
        }
        if (superFruit.timer === superFruit.appearTime){
            const cell = freeCell(snake,food,antiFood,superFruit);
            superFruit.x = cell.x;
            superFruit.y = cell.y;
            superFruit.isOnScreen = 1;
            superFruit.timer = 0;
        }
    }
    if (superFruit.isOnScreen){
        superFruit.isOnScreenTimer += 1;
        if (superFruit.isOnScreenTimer === superFruit.lifeCycle){
            superFruit.isOnScreen = 0;
            superFruit.x = -grid;
            superFruit.y = -grid;
            superFruit.isOnScreenTimer = 0;
        }
    }
	if (snake.l<=0) {stopGame(gameState.stopCycle);}
    snake.cells.forEach(function (cell,index) {
        if (EasyMode === 1) {
            if (cell.y >= canvas.height) {
                cell.y = 0;
            } else if (cell.y < 0) {
                cell.y = canvas.height - grid;
            } else if (cell.x >= canvas.width) {
                cell.x = 0;
            } else if (cell.x < 0) {
                cell.x = canvas.width - grid;
            }
        }
        context.fillStyle = snake.color;
        context.fillRect(cell.x, cell.y, grid, grid);
        context.fillStyle = '#000000';
        if (snake.cells.indexOf(cell)!==0){
            context.fillRect(cell.x+2, cell.y+2, grid-4, grid-4);
            context.fillStyle = snake.color;
            context.fillRect(cell.x+6, cell.y+6, grid-12, grid-12);
        }
        else if (snake.cells.indexOf(cell)===0) {
            if (snake.vx === grid && snake.vy === 0) {
                context.fillRect(cell.x+3*grid/5, cell.y+grid/5, grid/5, grid/5);
                context.fillRect(cell.x+3*grid/5, cell.y+3*grid/5, grid/5, grid/5);
                context.fillStyle = '#ff0000'
                context.fillRect(cell.x+grid, cell.y+2*grid/5, grid/5, grid/5);
            }
            else if (snake.vx === -grid && snake.vy === 0) {
                context.fillRect(cell.x+grid/5, cell.y+grid/5, grid/5, grid/5);
                context.fillRect(cell.x+grid/5, cell.y+3*grid/5, grid/5, grid/5);
                context.fillStyle = '#ff0000'
                context.fillRect(cell.x-grid/5, cell.y+2*grid/5, grid/5, grid/5);
            }
            else if (snake.vx === 0 && snake.vy === grid) {
                context.fillRect(cell.x+grid/5, cell.y+3*grid/5, grid/5, grid/5);
                context.fillRect(cell.x+3*grid/5, cell.y+3*grid/5, grid/5, grid/5);
                context.fillStyle = '#ff0000'
                context.fillRect(cell.x+2*grid/5, cell.y+grid, grid/5, grid/5);
            }
            else if (snake.vx === 0 && snake.vy === -grid) {
                context.fillRect(cell.x+grid/5, cell.y+grid/5, grid/5, grid/5);
                context.fillRect(cell.x+3*grid/5, cell.y+grid/5, grid/5, grid/5);
                context.fillStyle = '#ff0000'
                context.fillRect(cell.x+2*grid/5, cell.y-grid/5, grid/5, grid/5);
            }
        }
       //context.fillText(snake.cells.indexOf(cell).toString(), cell.x, cell.y)

        if (cell.x === food.x && cell.y === food.y) {
            snake.l++;
            if (SoundSet===1){FoodEat.play();}
            const cell = freeCell(snake,food,antiFood,superFruit);
            food.x = cell.x;
            food.y = cell.y;
        }
        if (cell.x === antiFood.x && cell.y === antiFood.y) {
            snake.l--;
            snake.cells.pop();
            if (SoundSet===1){FoodEat.play();}
            const cell = freeCell(snake,food,antiFood,superFruit);
            antiFood.isOnScreen = 0;
            antiFood.isOnScreenTimer = 0;
            antiFood.x = -grid;
            antiFood.y = -grid;
        }
        if (cell.x === superFruit.x && cell.y === superFruit.y) {
            snake.l*=2;
            if (SoundSet===1){FoodEat.play();}
            superFruit.isOnScreen = 0;
            superFruit.isOnScreenTimer = 0;
            superFruit.x = -grid;
            superFruit.y = -grid;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                stopGame(gameState.stopCycle);
            }
        }
    })
    if (ShowInfo===1){
        context.fillStyle = "#ffffff";
        context.font = "10px Arial";
        context.fillText(`Frames: `+FrameCount,0,10);
        context.fillText(`SnakeLength: `+snake.l,0,20);
        context.fillText(`SoundSet: `+SoundSet,0,30);
        context.fillText(`EasyMode: `+EasyMode,0,40);
        context.fillText('Snake x: '+snake.x,0,50);
        context.fillText('Snake y: '+snake.y,0,60);
        context.fillText('Snake vx: '+snake.vx,0,70);
        context.fillText('Snake vy: '+snake.vy,0,80);
        context.fillText('food x: '+food.x,0,90);
        context.fillText('food y: '+food.y,0,100);
        context.fillText('antiFood x: '+antiFood.x,0,110);
        context.fillText('antiFood y: '+antiFood.y,0,120);
        context.fillText('superFruit x: '+superFruit.x,0,130);
        context.fillText('superFruit y: '+superFruit.y,0,140);
    }
	else {
        context.fillStyle = "#00966b";
        context.font = "30px Arial";
        context.fillText(`Score: `+snake.l,0,30);
    }
}

function update(tick){
    const snake = gameState.snake;
    snake.x += snake.vx;
    snake.y += snake.vy;
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.l) { snake.cells.pop(); }
    if (EasyMode === 0){
        if (snake.y >= canvas.height || snake.y < 0 || snake.x >= canvas.width || snake.x < 0) {
            stopGame(gameState.stopCycle);
        }
    }
    else{
        if (snake.y >= canvas.height) {snake.y = 0;}
        else if (snake.y < 0) {snake.y = canvas.height-grid;}
        else if (snake.x >= canvas.width) {snake.x = 0;}
        else if (snake.x < 0) {snake.x = canvas.width-grid;}
    }

    document.addEventListener('keydown', event =>{
        if ((event.code === 'KeyW' || event.code === 'ArrowUp') && snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y - grid)){
            snake.vy = -grid;
            snake.vx = 0;
        }
        else if ((event.code === 'KeyS' || event.code === 'ArrowDown') && snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y + grid)){
            snake.vy = grid;
            snake.vx = 0;
        }
        else if ((event.code === 'KeyA' || event.code === 'ArrowLeft') && snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x - grid)){
            snake.vx = -grid;
            snake.vy = 0;
        }
        else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x + grid)){
            snake.vx = grid;
            snake.vy = 0;
        }
        else if (event.code === 'KeyZ') {
            SoundSet = 1;
        }
        else if (event.code === 'KeyX') {
            SoundSet = 0;
        }
        else if (event.code === 'KeyI') {
            ShowInfo = 1;
        }
        else if (event.code === 'KeyO') {
            ShowInfo = 0;
        }
        else if (event.code === 'Escape'){
            SoundSet = 0;
            stopGame(gameState.stopCycle);
        }
    })

    leftButton.onclick = function(){
        if(snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x - grid)){
            snake.vx = -grid;
            snake.vy = 0;
        }
    }
    rightButton.onclick = function(){
        if(snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x + grid)){
            snake.vx = grid;
            snake.vy = 0;
        }
    }
    upButton.onclick = function(){
        if(snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y - grid)){
            snake.vy = -grid;
            snake.vx = 0;
        }
    }
    downButton.onclick = function() {
        if (snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y + grid)) {
            snake.vy = grid;
            snake.vx = 0;
        }
    }
    const gamepad = navigator.getGamepads()[0];
    const gamepadUp = gamepad.buttons[12];
    const gamepadDown = gamepad.buttons[13];
    const gamepadLeft = gamepad.buttons[14];
    const gamepadRight = gamepad.buttons[15];
    if (gamepadUp.touched && snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y - grid)){
        snake.vy = -grid;
        snake.vx = 0;
    }
    if (gamepadDown.touched && snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y + grid)){
        snake.vy = grid;
        snake.vx = 0;
    }
    if (gamepadLeft.touched && snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x - grid)){
        snake.vy = 0;
        snake.vx = -grid;
    }
    if (gamepadRight.touched && snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x + grid)){
        snake.vy = 0;
        snake.vx = grid;
    }
}

function queueUpdates(numTicks){
    for (let i=0; i<numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength;
        update(gameState.lastTick)
    }
}

function stopGame(handle){
    let timeout;
    highScore.addToScore(gameState.snake.l,username.value);
    highScore.showTable();
    window.cancelAnimationFrame(handle);
    canvas.style.background = "#ff0000";

    if (SoundSet===1){
        GameOverAudio.play();
        timeout = 10500;
    }
    else{
        timeout = 2000;
    }
    setTimeout(() => {
        Container.style.display = "block";
        CanvasContainer.style.display = "none";
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            mobile_control.style.display = "none";
        }
    }, timeout);

}

playButton.onclick = function(){
    Container.style.display = "none";
    CanvasContainer.style.display = "block";
    if (soundChk.checked) {SoundSet = 1} else {SoundSet = 0}
    if (easymodeChk.checked) {EasyMode = 1} else {EasyMode = 0}
    setup();
    canvas.style.border = "3px solid #0be2c0";
    run();
};