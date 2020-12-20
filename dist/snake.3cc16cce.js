// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/highscore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showTable = showTable;
exports.addToScore = addToScore;
var Container = document.getElementById('container');
var table = document.createElement('table');
var tbody = document.createElement('tbody');
var highScores = [[1, 'loser'], [100, 'BeatMe'], [42, 'Answer']];

function showTable() {
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  var row = document.createElement('tr');
  var header = document.createElement('th');
  header.textContent = "HighScore";
  header.colSpan = "2";
  row.appendChild(header);
  tbody.appendChild(row);

  for (var i = 0; i < highScores.length; i++) {
    var vals = highScores[i];

    var _row = document.createElement('tr');

    for (var b = 0; b < vals.length; b++) {
      var cell = document.createElement('td');
      cell.textContent = vals[b];

      _row.appendChild(cell);
    }

    tbody.appendChild(_row);
  }

  table.appendChild(tbody);
  Container.appendChild(table);
}

function addToScore(a, b) {
  highScores.push([a, b]);
  highScores.sort(function (a, b) {
    return b[0] - a[0];
  });
}
},{}],"data/GameOver.mp3":[function(require,module,exports) {
module.exports = "/GameOver.828ccf7b.mp3";
},{}],"data/FoodEat.mp3":[function(require,module,exports) {
module.exports = "/FoodEat.fbf122c7.mp3";
},{}],"src/snake.js":[function(require,module,exports) {
"use strict";

var highScore = _interopRequireWildcard(require("./highscore.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var canvas = document.getElementById("cnvs");
var gameState = {};
var grid = 50; //const GameOverAudio = new Audio('./data/GameOver.mp3');
//const FoodEat = new Audio('./data/FoodEat.mp3');

var audioUrl = require('../data/GameOver.mp3');

var GameOverAudio = new Audio(audioUrl);
audioUrl = require('../data/FoodEat.mp3');
var FoodEat = new Audio(audioUrl);
var playButton = document.getElementById('playButton');
var soundChk = document.getElementById('soundChk');
var easymodeChk = document.getElementById('easymodeChk');
var Container = document.getElementById('container');
var CanvasContainer = document.getElementById('canvas_container');
var username = document.getElementById('login');
var mobile_control = document.getElementById('mobile_control');
var leftButton = document.getElementById('leftButton');
var rightButton = document.getElementById('rightButton');
var upButton = document.getElementById('upButton');
var downButton = document.getElementById('downButton');
var FrameCount = 0;
var ShowInfo = 0;
var SoundSet = 1;
var EasyMode = 1;

function setup() {
  canvas.style.background = "#000000";
  canvas.width = window.innerWidth - 25 - (window.innerWidth - 25) % grid;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    canvas.height = window.innerHeight - 90 - (window.innerHeight - 90) % grid - 250;
    mobile_control.style.display = "block";
  } else {
    canvas.height = window.innerHeight - 90 - (window.innerHeight - 90) % grid;
  }

  gameState.lastTick = performance.now();
  gameState.lastRender = gameState.lastTick;
  gameState.tickLength = 250; //ms

  FrameCount = 0;
  gameState.snake = {
    x: 5 * grid,
    y: grid,
    vx: grid,
    vy: 0,
    cells: [],
    l: 5,
    color: '#114400'
  };
  gameState.food = {
    x: 0,
    y: 0,
    color: '#ffaa00'
  };
  gameState.antiFood = {
    x: -grid,
    y: -grid,
    color: "#6201ff",
    isOnScreen: 0,
    isOnScreenTimer: 0,
    appearTime: 300,
    lifeCycle: 700,
    timer: 0
  };
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
  };

  for (var i = 0; i < gameState.snake.l; i++) {
    gameState.snake.cells.push({
      x: gameState.snake.x - grid * i,
      y: gameState.snake.y
    });
  }
}

function run(tFrame) {
  gameState.stopCycle = window.requestAnimationFrame(run);
  var nextTick = gameState.lastTick + gameState.tickLength;
  var numTicks = 0;

  if (tFrame > nextTick) {
    var timeSinceTick = tFrame - gameState.lastTick;
    numTicks = Math.floor(timeSinceTick / gameState.tickLength);
  }

  queueUpdates(numTicks);
  draw(tFrame);
  gameState.lastRender = tFrame;
}

function randomInt(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}

function freeCell(snake, food, antiFood, superFruit) {
  var gridX = Math.floor(canvas.width / grid);
  var gridY = Math.floor(canvas.height / grid);
  var x,
      y,
      bool = 0;

  while (bool === 0) {
    x = randomInt(0, gridX) * grid;
    y = randomInt(0, gridY) * grid;
    bool = 1;

    for (var i = 0; i < snake.cells.length; i++) {
      if (x === snake.cells[i].x && y === snake.cells[i].y) {
        bool = 0;
      }
    }

    if (x === food.x && y === food.y || x === antiFood.x && y === antiFood.y || x === superFruit.x && y === superFruit.y) {
      bool = 0;
    }
  }

  return {
    x: x,
    y: y
  };
}

function draw(tFrame) {
  FrameCount++;
  var context = canvas.getContext('2d');
  var gridX = Math.floor(canvas.width / grid);
  var gridY = Math.floor(canvas.height / grid);
  var food = gameState.food;
  var antiFood = gameState.antiFood;
  var snake = gameState.snake;
  var superFruit = gameState.superFruit;

  if (FrameCount === 1) {
    food.x = randomInt(1, gridX) * grid;
    food.y = randomInt(1, gridY) * grid;
  } //clear canvas


  context.clearRect(0, 0, canvas.width, canvas.height); //draw

  context.fillStyle = food.color;
  context.fillRect(food.x + grid / 4, food.y + grid / 4, grid / 2, grid / 2);
  context.fillStyle = antiFood.color;
  context.fillRect(antiFood.x + grid / 3, antiFood.y + grid / 3, grid / 3, grid / 3);
  context.fillStyle = superFruit.color1;
  context.fillRect(superFruit.x + grid / 4, superFruit.y + grid / 4, grid / 2, grid / 2);
  context.fillStyle = superFruit.color2;
  context.fillRect(superFruit.x + grid / 2, superFruit.y + 2, grid / 5, grid / 5);

  if (antiFood.isOnScreen === 0) {
    if (antiFood.timer < antiFood.appearTime) {
      antiFood.timer += 1;
    }

    if (antiFood.timer === antiFood.appearTime) {
      var cell = freeCell(snake, food, antiFood, superFruit);
      antiFood.x = cell.x;
      antiFood.y = cell.y;
      antiFood.isOnScreen = 1;
      antiFood.timer = 0;
    }
  }

  if (antiFood.isOnScreen) {
    antiFood.isOnScreenTimer += 1;

    if (antiFood.isOnScreenTimer === antiFood.lifeCycle) {
      antiFood.isOnScreen = 0;
      antiFood.x = -grid;
      antiFood.y = -grid;
      antiFood.isOnScreenTimer = 0;
    }
  }

  if (superFruit.isOnScreen === 0) {
    if (superFruit.timer < superFruit.appearTime) {
      superFruit.timer += 1;
    }

    if (superFruit.timer === superFruit.appearTime) {
      var _cell = freeCell(snake, food, antiFood, superFruit);

      superFruit.x = _cell.x;
      superFruit.y = _cell.y;
      superFruit.isOnScreen = 1;
      superFruit.timer = 0;
    }
  }

  if (superFruit.isOnScreen) {
    superFruit.isOnScreenTimer += 1;

    if (superFruit.isOnScreenTimer === superFruit.lifeCycle) {
      superFruit.isOnScreen = 0;
      superFruit.x = -grid;
      superFruit.y = -grid;
      superFruit.isOnScreenTimer = 0;
    }
  }

  if (snake.l <= 0) {
    stopGame(gameState.stopCycle);
  }

  snake.cells.forEach(function (cell, index) {
    if (cell.y >= canvas.height) {
      cell.y = 0;
    } else if (cell.y < 0) {
      cell.y = canvas.height - grid;
    } else if (cell.x >= canvas.width) {
      cell.x = 0;
    } else if (cell.x < 0) {
      cell.x = canvas.width - grid;
    }

    context.fillStyle = snake.color;
    context.fillRect(cell.x, cell.y, grid, grid);
    context.fillStyle = '#000000';

    if (snake.cells.indexOf(cell) !== 0) {
      context.fillRect(cell.x + 2, cell.y + 2, grid - 4, grid - 4);
      context.fillStyle = snake.color;
      context.fillRect(cell.x + 6, cell.y + 6, grid - 12, grid - 12);
    } else if (snake.cells.indexOf(cell) === 0) {
      if (snake.vx === grid && snake.vy === 0) {
        context.fillRect(cell.x + 3 * grid / 5, cell.y + grid / 5, grid / 5, grid / 5);
        context.fillRect(cell.x + 3 * grid / 5, cell.y + 3 * grid / 5, grid / 5, grid / 5);
        context.fillStyle = '#ff0000';
        context.fillRect(cell.x + grid, cell.y + 2 * grid / 5, grid / 5, grid / 5);
      } else if (snake.vx === -grid && snake.vy === 0) {
        context.fillRect(cell.x + grid / 5, cell.y + grid / 5, grid / 5, grid / 5);
        context.fillRect(cell.x + grid / 5, cell.y + 3 * grid / 5, grid / 5, grid / 5);
        context.fillStyle = '#ff0000';
        context.fillRect(cell.x - grid / 5, cell.y + 2 * grid / 5, grid / 5, grid / 5);
      } else if (snake.vx === 0 && snake.vy === grid) {
        context.fillRect(cell.x + grid / 5, cell.y + 3 * grid / 5, grid / 5, grid / 5);
        context.fillRect(cell.x + 3 * grid / 5, cell.y + 3 * grid / 5, grid / 5, grid / 5);
        context.fillStyle = '#ff0000';
        context.fillRect(cell.x + 2 * grid / 5, cell.y + grid, grid / 5, grid / 5);
      } else if (snake.vx === 0 && snake.vy === -grid) {
        context.fillRect(cell.x + grid / 5, cell.y + grid / 5, grid / 5, grid / 5);
        context.fillRect(cell.x + 3 * grid / 5, cell.y + grid / 5, grid / 5, grid / 5);
        context.fillStyle = '#ff0000';
        context.fillRect(cell.x + 2 * grid / 5, cell.y - grid / 5, grid / 5, grid / 5);
      }
    } //context.fillText(snake.cells.indexOf(cell).toString(), cell.x, cell.y)


    if (cell.x === food.x && cell.y === food.y) {
      snake.l++;

      if (SoundSet === 1) {
        FoodEat.play();
      }

      var _cell2 = freeCell(snake, food, antiFood, superFruit);

      food.x = _cell2.x;
      food.y = _cell2.y;
    }

    if (cell.x === antiFood.x && cell.y === antiFood.y) {
      snake.l--;
      snake.cells.pop();

      if (SoundSet === 1) {
        FoodEat.play();
      }

      var _cell3 = freeCell(snake, food, antiFood, superFruit);

      antiFood.isOnScreen = 0;
      antiFood.isOnScreenTimer = 0;
      antiFood.x = -grid;
      antiFood.y = -grid;
    }

    if (cell.x === superFruit.x && cell.y === superFruit.y) {
      snake.l *= 2;

      if (SoundSet === 1) {
        FoodEat.play();
      }

      superFruit.isOnScreen = 0;
      superFruit.isOnScreenTimer = 0;
      superFruit.x = -grid;
      superFruit.y = -grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        stopGame(gameState.stopCycle);
      }
    }
  });

  if (ShowInfo === 1) {
    context.fillStyle = "#ffffff";
    context.font = "10px Arial";
    context.fillText("Frames: " + FrameCount, 0, 10);
    context.fillText("SnakeLength: " + snake.l, 0, 20);
    context.fillText("SoundSet: " + SoundSet, 0, 30);
    context.fillText("EasyMode: " + EasyMode, 0, 40);
    context.fillText('Snake x: ' + snake.x, 0, 50);
    context.fillText('Snake y: ' + snake.y, 0, 60);
    context.fillText('Snake vx: ' + snake.vx, 0, 70);
    context.fillText('Snake vy: ' + snake.vy, 0, 80);
    context.fillText('food x: ' + food.x, 0, 90);
    context.fillText('food y: ' + food.y, 0, 100);
    context.fillText('antiFood x: ' + antiFood.x, 0, 110);
    context.fillText('antiFood y: ' + antiFood.y, 0, 120);
    context.fillText('superFruit x: ' + superFruit.x, 0, 130);
    context.fillText('superFruit y: ' + superFruit.y, 0, 140);
  } else {
    context.fillStyle = "#00966b";
    context.font = "30px Arial";
    context.fillText("Score: " + snake.l, 0, 30);
  }
}

function update(tick) {
  var snake = gameState.snake;
  snake.x += snake.vx;
  snake.y += snake.vy;
  snake.cells.unshift({
    x: snake.x,
    y: snake.y
  });

  if (snake.cells.length > snake.l) {
    snake.cells.pop();
  }

  if (EasyMode === 0) {
    if (snake.y > canvas.height || snake.y < 0 || snake.x > canvas.width || snake.x < 0) {
      stopGame(gameState.stopCycle);
    }
  } else {
    if (snake.y >= canvas.height) {
      snake.y = 0;
    } else if (snake.y < 0) {
      snake.y = canvas.height - grid;
    } else if (snake.x >= canvas.width) {
      snake.x = 0;
    } else if (snake.x < 0) {
      snake.x = canvas.width - grid;
    }
  }

  document.addEventListener('keydown', function (event) {
    if ((event.code === 'KeyW' || event.code === 'ArrowUp') && snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y - grid)) {
      snake.vy = -grid;
      snake.vx = 0;
    } else if ((event.code === 'KeyS' || event.code === 'ArrowDown') && snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y + grid)) {
      snake.vy = grid;
      snake.vx = 0;
    } else if ((event.code === 'KeyA' || event.code === 'ArrowLeft') && snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x - grid)) {
      snake.vx = -grid;
      snake.vy = 0;
    } else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x + grid)) {
      snake.vx = grid;
      snake.vy = 0;
    } else if (event.code === 'KeyZ') {
      SoundSet = 1;
    } else if (event.code === 'KeyX') {
      SoundSet = 0;
    } else if (event.code === 'KeyI') {
      ShowInfo = 1;
    } else if (event.code === 'KeyO') {
      ShowInfo = 0;
    } else if (event.code === 'Escape') {
      SoundSet = 0;
      stopGame(gameState.stopCycle);
    }
  });

  leftButton.onclick = function () {
    if (snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x - grid)) {
      snake.vx = -grid;
      snake.vy = 0;
    }
  };

  rightButton.onclick = function () {
    if (snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x + grid)) {
      snake.vx = grid;
      snake.vy = 0;
    }
  };

  upButton.onclick = function () {
    if (snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y - grid)) {
      snake.vy = -grid;
      snake.vx = 0;
    }
  };

  downButton.onclick = function () {
    if (snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y + grid)) {
      snake.vy = grid;
      snake.vx = 0;
    }
  };

  var gamepad = navigator.getGamepads()[0];
  var gamepadUp = gamepad.buttons[12];
  var gamepadDown = gamepad.buttons[13];
  var gamepadLeft = gamepad.buttons[14];
  var gamepadRight = gamepad.buttons[15];

  if (gamepadUp.touched && snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y - grid)) {
    snake.vy = -grid;
    snake.vx = 0;
  }

  if (gamepadDown.touched && snake.vy === 0 && (snake.l === 1 || snake.cells[1].y !== snake.cells[0].y + grid)) {
    snake.vy = grid;
    snake.vx = 0;
  }

  if (gamepadLeft.touched && snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x - grid)) {
    snake.vy = 0;
    snake.vx = -grid;
  }

  if (gamepadRight.touched && snake.vx === 0 && (snake.l === 1 || snake.cells[1].x !== snake.cells[0].x + grid)) {
    snake.vy = 0;
    snake.vx = grid;
  }
}

function queueUpdates(numTicks) {
  for (var i = 0; i < numTicks; i++) {
    gameState.lastTick = gameState.lastTick + gameState.tickLength;
    update(gameState.lastTick);
  }
}

function stopGame(handle) {
  var timeout;
  highScore.addToScore(gameState.snake.l, username.value);
  highScore.showTable();
  window.cancelAnimationFrame(handle);
  canvas.style.background = "#ff0000";

  if (SoundSet === 1) {
    GameOverAudio.play();
    timeout = 10500;
  } else {
    timeout = 2000;
  }

  setTimeout(function () {
    Container.style.display = "block";
    CanvasContainer.style.display = "none";

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      mobile_control.style.display = "none";
    }
  }, timeout);
}

playButton.onclick = function () {
  Container.style.display = "none";
  CanvasContainer.style.display = "block";

  if (soundChk.checked) {
    SoundSet = 1;
  } else {
    SoundSet = 0;
  }

  if (easymodeChk.checked) {
    EasyMode = 1;
  } else {
    EasyMode = 0;
  }

  setup();
  canvas.style.border = "3px solid #0be2c0";
  run();
};
},{"./highscore.js":"src/highscore.js","../data/GameOver.mp3":"data/GameOver.mp3","../data/FoodEat.mp3":"data/FoodEat.mp3"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52992" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/snake.js"], null)
//# sourceMappingURL=/snake.3cc16cce.js.map