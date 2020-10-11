const canvas = document.getElementById("cnvs");
const gameState = {};
const grid = 20

function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameState.lastTick = performance.now();
    gameState.lastRender = gameState.lastTick;
    gameState.tickLength = 200; //ms

    gameState.snake = {
        x: grid*10,
        y: grid*15,
        vx: grid,
        vy: 0,
        cells: [],
        l: 5
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

function draw(tFrame) {
    const context = canvas.getContext('2d');

    //clear canvas
    context.clearRect(0,0, canvas.width, canvas.height)

    //draw
    const snake = gameState.snake;
    snake.cells.forEach(function (cell,index) {
        context.fillStyle = '#114400'
        context.fillRect(cell.x, cell.y, grid, grid);
        context.fillStyle = '#000000'
        context.fillRect(cell.x+2, cell.y+2, grid-4, grid-4);
        context.fillStyle = '#114400'
        context.fillRect(cell.x+6, cell.y+6, grid-12, grid-12);
        //context.fillText(snake.cells.indexOf(cell).toString(), cell.x, cell.y)
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                stopGame(gameState.stopCycle);
            }
        }
    })
    }

function update(tick){
    const snake = gameState.snake;
    if (snake.y > canvas.height || snake.y < 0 ||
        snake.x > canvas.width || snake.x < 0)
    {stopGame(gameState.stopCycle);}
    snake.x += snake.vx;
    snake.y += snake.vy;
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.l) { snake.cells.pop(); }


    document.addEventListener('keydown', event =>{
        if ((event.code === 'KeyW'||event.code === 'ArrowUp') && snake.vy === 0){
            snake.vy = -grid;
            snake.vx = 0;
        }
        else if ((event.code === 'KeyS'||event.code === 'ArrowDown') && snake.vy === 0){
            snake.vy = grid;
            snake.vx = 0;
        }
        else if ((event.code === 'KeyA'||event.code === 'ArrowLeft') && snake.vx === 0){
            snake.vx = -grid;
            snake.vy = 0;
        }
        else if ((event.code === 'KeyD'||event.code === 'ArrowRight') && snake.vx === 0){
            snake.vx = grid;
            snake.vy = 0;
        }
    })

}

function stopGame(handle){
    window.cancelAnimationFrame(handle);
    const GameOverAudio = new Audio('./data/GameOver.mp3');
    GameOverAudio.play();
    document.body.style.background = "#ff0000";
    const snake = gameState.snake;
    snake.vy = 0;
    snake.vx = 0;
}

function queueUpdates(numTicks){
    for (let i=0; i<numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength;
        update(gameState.lastTick)
    }
}

setup();
run();