(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var parser_1 = __importDefault(require("./parser/parser"));
var textbox_1 = require("./display/textbox");
var grid_1 = require("./grid/grid");
var canvas_1 = require("./display/canvas");
var Controller = (function () {
    function Controller(size) {
        this.grid = new grid_1.Grid(size);
        this.canvas = new canvas_1.Canvas(size);
        this.runState = false;
        textbox_1.setupTextbox(this);
    }
    Controller.prototype.setConfiguration = function (inputJson, hotStart) {
        if (hotStart === void 0) { hotStart = false; }
        var config;
        try {
            config = parser_1.default(inputJson);
        }
        catch (e) {
            console.log("error at parsing configuration " + e.message);
            throw e;
        }
        this.config = config;
        this.configString = inputJson;
        if (!hotStart) {
            this.grid.createInitialCondition(config);
            var changeSet = this.grid.getChangeSet(config);
            this.canvas.updateMapSquares(changeSet);
        }
    };
    Controller.prototype.setRunState = function (runState) {
        this.runState = runState;
        if (this.runState) {
            this.run();
        }
    };
    Controller.prototype.runOnce = function () {
        this.grid.updateGrid(this.config);
        var changeSet = this.grid.getChangeSet(this.config);
        this.canvas.updateMapSquares(changeSet);
    };
    Controller.prototype.run = function () {
        var controller = this;
        controller.runOnce();
        setTimeout(function () {
            if (controller.runState) {
                controller.run();
            }
        }, controller.config.timeStep);
    };
    return Controller;
}());
exports.Controller = Controller;

},{"./display/canvas":2,"./display/textbox":5,"./grid/grid":11,"./parser/parser":16}],2:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
var square_1 = require("./square");
var CONSTANTS = __importStar(require("./constants"));
var gridUtil_1 = require("../grid/gridUtil");
var Canvas = (function () {
    function Canvas(size) {
        this.app = new PIXI.Application({
            width: CONSTANTS.DEFAULT_PIXEL_SIZE,
            height: CONSTANTS.DEFAULT_PIXEL_SIZE,
        });
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);
        this.addBackgroundSprite();
        this.populateMapSquares(size);
    }
    Canvas.prototype.addBackgroundSprite = function () {
        this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.background.x = 0;
        this.background.y = 0;
        this.background.height = CONSTANTS.DEFAULT_PIXEL_SIZE;
        this.background.width = CONSTANTS.DEFAULT_PIXEL_SIZE;
        this.background.tint = 0x101010;
        this.background.zIndex = -999;
        this.container.addChild(this.background);
    };
    Canvas.prototype.populateMapSquares = function (size) {
        this.mapSquares = new Map();
        for (var y = 0; y < size; y++) {
            for (var x = 0; x < size; x++) {
                var location_1 = { x: x, y: y };
                var square = new square_1.Square(location_1);
                this.mapSquares.set(gridUtil_1.getLocString(location_1), square);
                this.container.addChild(square);
            }
        }
    };
    Canvas.prototype.updateMapSquares = function (changeSet) {
        var _this = this;
        changeSet.forEach(function (value, key) {
            _this.mapSquares.get(key).setColor(value);
        });
    };
    return Canvas;
}());
exports.Canvas = Canvas;

},{"../grid/gridUtil":12,"./constants":3,"./square":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAMPLE_SELECT_MAP = exports.INITIAL_SELECT_NAME = exports.SELECT_SAMPLE_ELEMENT_ID = exports.STEP_BUTTON_ELEMENT_ID = exports.STOP_BUTTON_ELEMENT_ID = exports.CONTINUE_BUTTON_ELEMENT_ID = exports.START_BUTTON_ELEMENT_ID = exports.TEXTBOX_ELEMENT_ID = exports.CANVAS_ELEMENT_ID = exports.DEFAULT_COLOR_MAP = exports.DEFAULT_PIXEL_SIZE = exports.DEFAULT_MAP_SIZE = exports.DEFAULT_SQUARE_AND_BORDER_SIZE = exports.COLOR_MAP = exports.DEFAULT_SQUARE_SIZE = void 0;
exports.DEFAULT_SQUARE_SIZE = 7;
exports.COLOR_MAP = new Map();
exports.COLOR_MAP.set("darkred", 0x8b0000);
exports.COLOR_MAP.set("red", 0xff0000);
exports.COLOR_MAP.set("darkcyan", 0x009696);
exports.COLOR_MAP.set("cyan", 0x00ffff);
exports.COLOR_MAP.set("navy", 0x000080);
exports.COLOR_MAP.set("blue", 0x0000ff);
exports.COLOR_MAP.set("black", 0x000000);
exports.COLOR_MAP.set("tintblack", 0x202020);
exports.COLOR_MAP.set("white", 0xffffff);
exports.COLOR_MAP.set("gray", 0x808080);
exports.COLOR_MAP.set("darkgray", 0x646464);
exports.COLOR_MAP.set("brightgreen", 0x00ff00);
exports.COLOR_MAP.set("lightgreen", 0x90ee90);
exports.COLOR_MAP.set("green", 0x008000);
exports.COLOR_MAP.set("brown", 0xa52a2a);
exports.COLOR_MAP.set("darkgreen", 0x006400);
exports.COLOR_MAP.set("yellow", 0xffff00);
exports.COLOR_MAP.set("olive", 0x808000);
exports.COLOR_MAP.set("purple", 0x800080);
exports.COLOR_MAP.set("turd", 0x7b5c00);
exports.COLOR_MAP.set("sand", 0xc2b280);
exports.DEFAULT_SQUARE_AND_BORDER_SIZE = 8;
exports.DEFAULT_MAP_SIZE = 100;
exports.DEFAULT_PIXEL_SIZE = 800;
exports.DEFAULT_COLOR_MAP = new Map();
exports.DEFAULT_COLOR_MAP.set(0, "tintblack");
exports.DEFAULT_COLOR_MAP.set(1, "cyan");
exports.DEFAULT_COLOR_MAP.set(2, "darkred");
exports.DEFAULT_COLOR_MAP.set(3, "green");
exports.DEFAULT_COLOR_MAP.set(4, "navy");
exports.DEFAULT_COLOR_MAP.set(5, "yellow");
exports.DEFAULT_COLOR_MAP.set(6, "purple");
exports.DEFAULT_COLOR_MAP.set(7, "darkcyan");
exports.CANVAS_ELEMENT_ID = "canvas";
exports.TEXTBOX_ELEMENT_ID = "textbox";
exports.START_BUTTON_ELEMENT_ID = "start";
exports.CONTINUE_BUTTON_ELEMENT_ID = "continue";
exports.STOP_BUTTON_ELEMENT_ID = "stop";
exports.STEP_BUTTON_ELEMENT_ID = "step";
exports.SELECT_SAMPLE_ELEMENT_ID = "select-sample";
exports.INITIAL_SELECT_NAME = "Forest Fire";
exports.SAMPLE_SELECT_MAP = new Map();
exports.SAMPLE_SELECT_MAP.set("Forest Fire", "forestFire.json");
exports.SAMPLE_SELECT_MAP.set("Conway Game of Life", "conwayGameOfLife.json");
exports.SAMPLE_SELECT_MAP.set("Build A Maze", "maze.json");
exports.SAMPLE_SELECT_MAP.set("Maze Runner", "mazeRunner.json");
exports.SAMPLE_SELECT_MAP.set("Sandbar and Waves", "sandbarAndWave.json");
exports.SAMPLE_SELECT_MAP.set("Forest Fire with Dirt", "forestFireDirt.json");
exports.SAMPLE_SELECT_MAP.set("Slow Forest Fire", "forestFireSlow.json");
exports.SAMPLE_SELECT_MAP.set("Forest Fire with Grassland", "grassLandAndForest.json");
exports.SAMPLE_SELECT_MAP.set("Lakes of Titan", "lakesOfTitan.json");
exports.SAMPLE_SELECT_MAP.set("Maze Struggler", "mazeStragglers.json");
exports.SAMPLE_SELECT_MAP.set("Generate Pretty Logos", "prettyLogos.json");
exports.SAMPLE_SELECT_MAP.set("Three Kingdoms", "threeKingdoms.json");
exports.SAMPLE_SELECT_MAP.set("Modified Game of Life", "conwayGameOfLifeCrazy.json");

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
var CONSTANTS = __importStar(require("./constants"));
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(location) {
        var _this = _super.call(this, PIXI.Texture.WHITE) || this;
        _this.location = location;
        _this.height = CONSTANTS.DEFAULT_SQUARE_SIZE;
        _this.width = CONSTANTS.DEFAULT_SQUARE_SIZE;
        _this.x = CONSTANTS.DEFAULT_SQUARE_AND_BORDER_SIZE * location.x;
        _this.y = CONSTANTS.DEFAULT_SQUARE_AND_BORDER_SIZE * location.y;
        _this.setColor("tintblack");
        return _this;
    }
    Square.prototype.setColor = function (color) {
        if (!CONSTANTS.COLOR_MAP.has(color)) {
            color = "black";
        }
        this.tint = CONSTANTS.COLOR_MAP.get(color);
    };
    return Square;
}(PIXI.Sprite));
exports.Square = Square;

},{"./constants":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTextbox = void 0;
var CONSTANTS = __importStar(require("./constants"));
var FOREST_FIRE = "{\n  \"0\": [\n    \"SpontaneousChange 1 0.02\",\n    \"CountAdjacentChance gt 1 0 1 0.1\"\n  ],\n  \"1\": [\n    \"SpontaneousChange 2 0.002\",\n    \"CountAdjacent gt 2 0 2\"\n  ],\n  \"2\": [\n    \"SpontaneousChange 0 1\"\n  ],\n  \"colorMap\": {\n    \"0\": \"black\",\n    \"1\": \"green\",\n    \"2\": \"red\"\n  },\n  \"timeStep\": 100\n}";
function updateConfiguration(inputJson, controller, runState) {
    if (inputJson != controller.configString) {
        try {
            controller.setConfiguration(inputJson, true);
        }
        catch (e) {
            alert("JSON Parse error: " + e.message);
            return;
        }
    }
    controller.setRunState(runState);
}
function loadJson(name, textbox) {
    var path = "/sample/" + CONSTANTS.SAMPLE_SELECT_MAP.get(name);
    if (!(location.hostname == "0.0.0.0")) {
        path = "/cellular-automata" + path;
    }
    var request = new XMLHttpRequest();
    request.onload = function () {
        var result = this.response;
        textbox.value = result;
    };
    request.open("GET", path);
    request.send();
}
function setupSelectSample(textbox) {
    var e_1, _a;
    var selectSample = document.getElementById(CONSTANTS.SELECT_SAMPLE_ELEMENT_ID);
    try {
        for (var _b = __values(CONSTANTS.SAMPLE_SELECT_MAP.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var name_1 = _c.value;
            var option = document.createElement("option");
            option.setAttribute("value", name_1);
            option.textContent = name_1;
            selectSample.appendChild(option);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    selectSample.onchange = function () {
        var name = selectSample.value;
        loadJson(name, textbox);
    };
    selectSample.value = CONSTANTS.INITIAL_SELECT_NAME;
    loadJson(selectSample.value, textbox);
}
function setupTextbox(controller) {
    var textbox = document.getElementById(CONSTANTS.TEXTBOX_ELEMENT_ID);
    var startButton = document.getElementById(CONSTANTS.START_BUTTON_ELEMENT_ID);
    var continueButton = document.getElementById(CONSTANTS.CONTINUE_BUTTON_ELEMENT_ID);
    var stopButton = document.getElementById(CONSTANTS.STOP_BUTTON_ELEMENT_ID);
    var stepButton = document.getElementById(CONSTANTS.STEP_BUTTON_ELEMENT_ID);
    setupSelectSample(textbox);
    startButton.addEventListener("click", function () {
        var inputJson = textbox.value;
        try {
            controller.setConfiguration(inputJson);
            if (!controller.runState) {
                controller.setRunState(true);
            }
        }
        catch (e) {
            alert("JSON Parse error: " + e.message);
        }
    });
    continueButton.addEventListener("click", function () {
        if (controller.runState) {
            return;
        }
        updateConfiguration(textbox.value, controller, true);
    });
    stopButton.addEventListener("click", function () {
        controller.setRunState(false);
    });
    stepButton.addEventListener("click", function () {
        controller.setRunState(false);
        updateConfiguration(textbox.value, controller, false);
        controller.runOnce();
    });
}
exports.setupTextbox = setupTextbox;

},{"./constants":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUNCTION_REGISTRY = void 0;
var countAdjacent_1 = require("./gridFunctions/countAdjacent");
var spontaneousChange_1 = require("./gridFunctions/spontaneousChange");
var changeByBlockAge_1 = require("./gridFunctions/changeByBlockAge");
exports.FUNCTION_REGISTRY = new Map();
exports.FUNCTION_REGISTRY.set("countadjacent", countAdjacent_1.countAdjacent);
exports.FUNCTION_REGISTRY.set("spontaneouschange", spontaneousChange_1.spontaneousChange);
exports.FUNCTION_REGISTRY.set("countadjacentchance", countAdjacent_1.countAdjacentChance);
exports.FUNCTION_REGISTRY.set("changebyblockage", changeByBlockAge_1.changeByBlockAge);
exports.FUNCTION_REGISTRY.set("countdirectlyadjacent", countAdjacent_1.countDirectlyAdjacent);
exports.FUNCTION_REGISTRY.set("countdirectlyadjacentchance", countAdjacent_1.countDirectlyAdjacentChance);

},{"./gridFunctions/changeByBlockAge":8,"./gridFunctions/countAdjacent":9,"./gridFunctions/spontaneousChange":10}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPARISONS = void 0;
exports.COMPARISONS = {
    "eq": function (a, b) { return a == b; },
    "le": function (a, b) { return a <= b; },
    "lt": function (a, b) { return a < b; },
    "gt": function (a, b) { return a > b; },
    "ge": function (a, b) { return a >= b; },
    "ne": function (a, b) { return a != b; }
};

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeByBlockAge = void 0;
var gridFunction_1 = require("../gridFunction");
exports.changeByBlockAge = {
    parameterCount: 4,
    description: "ChangeByBLockAge [comparison-operator] [threshold] [destination] [chance]",
    getParameterizedFunc: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var comparisonType = args[0];
        var threshold = parseInt(args[1]);
        var destination = parseInt(args[2]);
        var chance = parseFloat(args[3]);
        if (!Number.isInteger(threshold) || !Number.isInteger(destination)) {
            throw new Error("Parameter threshold and destination of ChangeByBlockAge must be integer");
        }
        if (!(comparisonType in gridFunction_1.COMPARISONS)) {
            throw new Error("Comparison-operator " + comparisonType + " is not supported");
        }
        if (chance < 0 || chance > 1) {
            throw new Error("Parameter chance of ChangeByBlockAge must be between 0 and 1");
        }
        return function (grid, location) {
            var currAge = grid.gridAge[location.y][location.x];
            if (gridFunction_1.COMPARISONS[comparisonType](currAge, threshold)) {
                if (Math.random() < chance) {
                    return destination;
                }
            }
            return grid.grid[location.y][location.x];
        };
    }
};

},{"../gridFunction":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countDirectlyAdjacentChance = exports.countAdjacentChance = exports.countDirectlyAdjacent = exports.countAdjacent = void 0;
var gridFunction_1 = require("../gridFunction");
var gridUtil_1 = require("../../grid/gridUtil");
var getCountAdjacentGridFunction = function (name, func, isChanceFunc) {
    if (isChanceFunc === void 0) { isChanceFunc = false; }
    var parameterCount = isChanceFunc ? 5 : 4;
    var chanceStr = isChanceFunc ? " [chance]" : "";
    return {
        parameterCount: parameterCount,
        description: name + " [comparison-operator] [target] [threshold] [destination]" + chanceStr,
        getParameterizedFunc: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var comparisonType = args[0];
            var target = parseInt(args[1]);
            var threshold = parseInt(args[2]);
            var destination = parseInt(args[3]);
            var chance = 1;
            if (isChanceFunc) {
                chance = parseFloat(args[4]);
                if (chance < 0 || chance > 1) {
                    throw new Error("Parameter chance of " + name + " must be between 0 and 1");
                }
            }
            if (!Number.isInteger(target) || !Number.isInteger(threshold) || !Number.isInteger(destination)) {
                throw new Error("Parameter target, threshold, destination of " + name + " must be integer");
            }
            if (!(comparisonType in gridFunction_1.COMPARISONS)) {
                throw new Error("Comparison-operator " + comparisonType + " is not supported");
            }
            return function (grid, location) {
                var adjacents = func(grid.size, location);
                var targetCounter = adjacents.filter(function (loc) { return grid.grid[loc.y][loc.x] == target; }).length;
                if (gridFunction_1.COMPARISONS[comparisonType](targetCounter, threshold)) {
                    if (Math.random() < chance) {
                        return destination;
                    }
                }
                return grid.grid[location.y][location.x];
            };
        }
    };
};
exports.countAdjacent = getCountAdjacentGridFunction("CountAdjacent", gridUtil_1.getAdjacentLocations);
exports.countDirectlyAdjacent = getCountAdjacentGridFunction("CountDirectlyAdjacent", gridUtil_1.getDirectlyAdjacentLocations);
exports.countAdjacentChance = getCountAdjacentGridFunction("CountAdjacentChance", gridUtil_1.getAdjacentLocations, true);
exports.countDirectlyAdjacentChance = getCountAdjacentGridFunction("CountAdjacentChance", gridUtil_1.getDirectlyAdjacentLocations, true);

},{"../../grid/gridUtil":12,"../gridFunction":7}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spontaneousChange = void 0;
exports.spontaneousChange = {
    parameterCount: 2,
    description: "SpontaneousChange [destination] [chance]",
    getParameterizedFunc: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var destination = parseInt(args[0]);
        var chance = parseFloat(args[1]);
        if (!Number.isInteger(destination)) {
            throw new Error("Parameter destination of SpontaneousChange must be integer");
        }
        if (chance < 0 || chance > 1) {
            throw new Error("Parameter chance of SpontaneousChange must be between 0 and 1");
        }
        return function (grid, location) {
            if (Math.random() < chance) {
                return destination;
            }
            return grid.grid[location.y][location.x];
        };
    }
};

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
var gridUtil_1 = require("./gridUtil");
var Grid = (function () {
    function Grid(size) {
        this.size = size;
        this.grid = Array.apply(null, new Array(size)).map(function (e) { return Array(10).fill(0); });
        this.gridAge = Array.apply(null, new Array(size)).map(function (e) { return Array(10).fill(0); });
        this.previousGrid = JSON.parse(JSON.stringify(this.grid));
    }
    Grid.prototype.createInitialCondition = function (config) {
        this.previousGrid = JSON.parse(JSON.stringify(this.grid));
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                this.grid[y][x] = 0;
            }
        }
        if (config.initialCondition === undefined) {
            return;
        }
        config.initialCondition.createInitialCondition(this.grid, this.size);
    };
    Grid.prototype.updateGrid = function (config) {
        var gridCopy = JSON.parse(JSON.stringify(this.grid));
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                this.gridAge[y][x] += 1;
                var currNum = this.grid[y][x];
                if (!config.funcMap.has(currNum)) {
                    continue;
                }
                var paramFuncs = config.funcMap.get(currNum);
                for (var i = 0; i < paramFuncs.length; i++) {
                    var currResult = paramFuncs[i](this, { x: x, y: y });
                    if (currResult != currNum) {
                        gridCopy[y][x] = currResult;
                        this.gridAge[y][x] = 0;
                        break;
                    }
                }
            }
        }
        this.previousGrid = JSON.parse(JSON.stringify(this.grid));
        this.grid = gridCopy;
    };
    Grid.prototype.getChangeSet = function (config) {
        var changeSet = new Map();
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                if (this.grid[y][x] != this.previousGrid[y][x]) {
                    var locStr = gridUtil_1.getLocString({ x: x, y: y });
                    if (!config.colorMap.has(this.grid[y][x])) {
                        changeSet.set(locStr, "turd");
                    }
                    changeSet.set(locStr, config.colorMap.get(this.grid[y][x]));
                }
            }
        }
        return changeSet;
    };
    return Grid;
}());
exports.Grid = Grid;

},{"./gridUtil":12}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectlyAdjacentLocations = exports.getAdjacentLocations = exports.getLocation = exports.getLocString = void 0;
function getLocString(loc) {
    return JSON.stringify(loc);
}
exports.getLocString = getLocString;
function getLocation(locStr) {
    return JSON.parse(locStr);
}
exports.getLocation = getLocation;
function getAdjacentLocations(size, loc) {
    var x = loc.x;
    var y = loc.y;
    var rangeFilter = function (i) { return i >= 0 && i < size; };
    var xRange = [x - 1, x, x + 1].filter(rangeFilter);
    var yRange = [y - 1, y, y + 1].filter(rangeFilter);
    var results = [];
    xRange.forEach(function (ix) {
        yRange.forEach(function (iy) {
            if (!(ix == x && iy == y)) {
                results.push({ x: ix, y: iy });
            }
        });
    });
    return results;
}
exports.getAdjacentLocations = getAdjacentLocations;
function getDirectlyAdjacentLocations(size, loc) {
    var x = loc.x;
    var y = loc.y;
    var rangeFilter = function (i) { return i >= 0 && i < size; };
    var xRange = [x - 1, x + 1].filter(rangeFilter);
    var yRange = [y - 1, y + 1].filter(rangeFilter);
    var results = [];
    results = results.concat(xRange.map(function (ix) { return { x: ix, y: y }; }));
    results = results.concat(yRange.map(function (iy) { return { x: x, y: iy }; }));
    return results;
}
exports.getDirectlyAdjacentLocations = getDirectlyAdjacentLocations;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var controller = new controller_1.Controller(100);
var canvasDiv = document.getElementById('canvas');
canvasDiv.appendChild(controller.canvas.app.view);

},{"./controller":1}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
var Configuration = (function () {
    function Configuration() {
    }
    Configuration.prototype.setInitialCondition = function (initialCondition) {
        this.initialCondition = initialCondition;
    };
    Configuration.prototype.setFuncMap = function (funcMap) {
        this.funcMap = funcMap;
    };
    Configuration.prototype.setColorMap = function (colorMap) {
        this.colorMap = colorMap;
    };
    Configuration.prototype.setTimeStep = function (timeStep) {
        this.timeStep = timeStep;
    };
    return Configuration;
}());
exports.Configuration = Configuration;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialCondition = void 0;
var CENTRAL_DOT_START = "centraldot";
var CORNER_DOT_START = "cornerdot";
var CENTRAL_SQUARE_START = "centralsquare";
var CONDITION_TYPES = new Map();
CONDITION_TYPES.set(CENTRAL_DOT_START, "CENTRAL_DOT");
CONDITION_TYPES.set(CORNER_DOT_START, "CORNER_DOT");
CONDITION_TYPES.set(CENTRAL_SQUARE_START, "CENTRAL_SQUARE");
var InitialCondition = (function () {
    function InitialCondition(conditionType, target, chance) {
        if (chance === void 0) { chance = 0; }
        this.conditionType = conditionType;
        this.target = target;
        this.chance = chance;
    }
    InitialCondition.prototype.createInitialCondition = function (grid, size) {
        var halfIndex;
        if (size % 2 == 0) {
            halfIndex = Math.floor(size / 2) - 1;
        }
        else {
            halfIndex = Math.floor(size / 2);
        }
        switch (this.conditionType) {
            case "DEFAULT": {
                for (var y = 0; y < size; y++) {
                    for (var x = 0; x < size; x++) {
                        if (Math.random() < this.chance) {
                            grid[y][x] = this.target;
                        }
                    }
                }
                break;
            }
            case "CENTRAL_DOT": {
                grid[halfIndex][halfIndex] = this.target;
                break;
            }
            case "CENTRAL_SQUARE": {
                grid[halfIndex][halfIndex] = this.target;
                grid[halfIndex + 1][halfIndex] = this.target;
                grid[halfIndex][halfIndex + 1] = this.target;
                grid[halfIndex + 1][halfIndex + 1] = this.target;
                break;
            }
            case "CORNER_DOT": {
                grid[0][0] = this.target;
                break;
            }
        }
    };
    InitialCondition.parse = function (input) {
        var conds = input.split(/\s+/);
        var conditionType = "DEFAULT";
        var target;
        var chance = 1;
        if (conds.length != 2) {
            throw new Error("Initial condition parse error, see readme for instruction");
        }
        if (CONDITION_TYPES.has(conds[0].toLowerCase())) {
            conditionType = CONDITION_TYPES.get(conds[0].toLowerCase());
            target = parseInt(conds[1]);
        }
        else {
            target = parseInt(conds[0]);
            chance = parseFloat(conds[1]);
        }
        if (!Number.isInteger(target)) {
            throw new Error("Parameter target of initial condition must be integer");
        }
        if (chance < 0 || chance > 1) {
            throw new Error("Parameter chance of initial condition must be between 0 and 1");
        }
        return new InitialCondition(conditionType, target, chance);
    };
    return InitialCondition;
}());
exports.InitialCondition = InitialCondition;

},{}],16:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var funcRegistry_1 = require("../func/funcRegistry");
var configuration_1 = require("./configuration");
var initialCondition_1 = require("./initialCondition");
var CONSTANTS = __importStar(require("../display/constants"));
function parse(inputJson) {
    inputJson = inputJson.toLowerCase();
    var rawConfig = JSON.parse(inputJson);
    var config = new configuration_1.Configuration();
    if ("initialcondition" in rawConfig) {
        var initialConditionString = rawConfig["initialcondition"];
        if (typeof initialConditionString != "string") {
            throw new Error("initial condition must be string");
        }
        config.setInitialCondition(initialCondition_1.InitialCondition.parse(initialConditionString));
        delete rawConfig.initialcondition;
    }
    else {
        config.setInitialCondition(new initialCondition_1.InitialCondition("NONE", 0));
    }
    if ("colormap" in rawConfig) {
        var colorMap = rawConfig["colormap"];
        config.setColorMap(parseColorMap(colorMap));
        delete rawConfig.colormap;
    }
    else {
        config.setColorMap(CONSTANTS.DEFAULT_COLOR_MAP);
    }
    if ("timestep" in rawConfig) {
        var timeStep = rawConfig["timestep"];
        config.setTimeStep(parseTimeStep(timeStep));
        delete rawConfig.timestep;
    }
    else {
        config.setTimeStep(100);
    }
    var funcMap = parseFuncMap(rawConfig);
    config.setFuncMap(funcMap);
    return config;
}
exports.default = parse;
function parseTimeStep(timeStep) {
    var time = parseInt(timeStep);
    if (!Number.isInteger(time)) {
        throw new Error("Timestep must be an integer value");
    }
    if (time < 0) {
        throw new Error("Timestep cannot be lower than 0");
    }
    return time;
}
function parseColorMap(colorMap) {
    var e_1, _a;
    var result = new Map();
    if (typeof colorMap != "object") {
        throw new Error("Color map must be object");
    }
    try {
        for (var _b = __values(Object.entries(colorMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), numStr = _d[0], color = _d[1];
            if (typeof color != "string") {
                throw new Error("Color type must be string, not " + typeof color);
            }
            var num = parseInt(numStr);
            if (!Number.isInteger(num)) {
                throw new Error("Color Map keys must be integers, not " + numStr);
            }
            if (!CONSTANTS.COLOR_MAP.has(color)) {
                throw new Error("Color " + color + " is not found");
            }
            result.set(num, color);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
function parseInitialCondition(cond) {
    var conds = cond.split(/\s+/);
    if (conds.length != 2) {
        throw new Error("Initial condition must be 2 numbers");
    }
    var target = parseInt(conds[0]);
    var chance = parseFloat(conds[1]);
    if (!Number.isInteger(target)) {
        throw new Error("Parameter target of initial condition must be integer");
    }
    if (chance < 0 || chance > 1) {
        throw new Error("Parameter chance of initial condition must be between 0 and 1");
    }
    return [target, chance];
}
function parseFuncMap(inputs) {
    var e_2, _a;
    var result = new Map();
    var _loop_1 = function (targetStr, paramList) {
        var target = parseInt(targetStr);
        if (!Number.isInteger(target)) {
            throw new Error("Key " + targetStr + " must be integer");
        }
        if (!Array.isArray(paramList)) {
            throw new Error("Parameter values of key " + targetStr + " must be lists");
        }
        var funcResults = [];
        paramList.forEach(function (param) {
            funcResults.push(parseFunc(param));
        });
        result.set(target, funcResults);
    };
    try {
        for (var _b = __values(Object.entries(inputs)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), targetStr = _d[0], paramList = _d[1];
            _loop_1(targetStr, paramList);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return result;
}
function parseFunc(inputString) {
    if (typeof inputString != "string") {
        throw new Error("Input " + inputString + " need to be string");
    }
    var inputs = inputString.split(/\s+/);
    var funcName = inputs.shift();
    if (!funcRegistry_1.FUNCTION_REGISTRY.has(funcName)) {
        throw new Error("Function name " + funcName + " is unrecognized");
    }
    var funcFactory = funcRegistry_1.FUNCTION_REGISTRY.get(funcName);
    if (inputs.length != funcFactory.parameterCount) {
        throw new Error("Function " + funcName + " takes in " + funcFactory.parameterCount + " parameters, but only " + inputs.length + " is given");
    }
    return funcFactory.getParameterizedFunc.apply(funcFactory, __spreadArray([], __read(inputs)));
}

},{"../display/constants":3,"../func/funcRegistry":6,"./configuration":14,"./initialCondition":15}]},{},[13]);
