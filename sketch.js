// JavaScript source code
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//All Variables
let CamX = 0, CamY = 0, player, gravity = -1, upArrawPressed = false,blocks = [],blockImg,frame = 0,isOver = false;

function setup() {

    createCanvas(800, 700);

    engine = Engine.create();
    world = engine.world;

    //Give values to variables
    player = { posX: 100, posY: 200, image: loadImage("FlappyBird.png"), applyGravity: applyGravity };
    blockImg = loadImage("Block.bmp");
}

function draw() {
    background("white");
    Engine.update(engine);

    if (isOver) {

        text("Game Over", 200, 200);
        text("Your Score : " + frame, 180, 230);

    }
    else
    {
        applyGravity();
        displayPlayer();
        displayObstacles();

        if (frame % 200 == 0) {
            createObstacles();
        }

        applyXGravity();

        if (checkForEnd()) {
            isOver = true;
        }

        if (frame % 4000 == 0) {
            LagProofing();
        }

        frame++;
    }
    
}

function keyPressed() {
    //catch key presses
    if (keyCode == 38) {
        upArrawPressed = true;
    }
}

let gravityRatio = 1;
function applyGravity() {
    if (!upArrawPressed) {
        gravity++;
    }
    else {
        gravity = -1;
        gravity = -10;
        upArrawPressed = false;
    }

    player.posY += gravity;
}

function displayPlayer() {
    image(player.image, player.posX, player.posY, 40, 30);
}

function createObstacles() {
    var gapY = round(random(0, 30));
    var gapHeight = round(random(6, 18));

    for (var i = 0; i < gapY - gapHeight / 8;i++) {
        blocks[blocks.length] = {posY : i * 20,posX : 800};
    }

    for (var i = gapY + gapHeight/2; i < 50; i++) {
        blocks[blocks.length] = {posY : i * 20,posX : 800};
    }
}

function displayObstacles() {
    for (var i = 0; i < blocks.length; i++) {
        image(blockImg, blocks[i].posX, blocks[i].posY,20,20);
    }
}

function checkForEnd() {
    for (var i = 0; i < blocks.length; i++) {
        if (isTouching(player, blocks[i])) {
            return true;
        }
    }

    if (player.posY > 1000 || player.posY < -100) {
        return true;
    }

    return false;
}

function isTouching(b1, b2) {

    if (b1.posX + 10 > b2.posX && b1.posX - 10 < b2.posX) {
        if (b1.posY + 10 > b2.posY && b1.posY - 10 < b2.posY) {
            return true;
        }
    }

    return false;
}

function applyXGravity() {
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].posX-=5;
    }
}

function LagProofing() {
    var i = 0;

    while (i < blocks.length) {
        if (blocks[i].posX > -20 || blocks[i].posY < 1000) {
            break;
        }
        i++;
    }

    var newArray = [];

    for (var j = i; j < blocks.length; j++) {
        newArray[newArray.length] = blocks[j];
    }

    blocks = newArray;
}