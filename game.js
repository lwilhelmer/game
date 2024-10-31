let basketX, basketY;
let basketWidth = 60;
let basketHeight = 30;
let apples = [];
let numApples = 3; 
let score = 0;
let gameOver = false; 
let level = 1;
let levelThreshold = 10;

function setup() {
  createCanvas(520, 700);
  basketY = height - 50;
  
  // Initialize apples with random positions
  for (let i = 0; i < numApples; i++) {
    let apple = createApple();
    apples.push(apple);
  }
}

function draw() {
  // Background
  background("skyBlue");
  stroke(0);

  // Draw the tree trunk
  fill("brown");
  rect(260, 500, 100, 300);

  // Draw the tree leaves
  fill("green");
  ellipse(160, 300, 200, 200);
  ellipse(360, 300, 200, 200);
  ellipse(260, 240, 200, 200);
  ellipse(260, 340, 200, 200);

 //this is the apples
  fill("red");
  ellipse(160, 310, 40, 40);
  ellipse(300, 210, 40, 40);
  ellipse(280, 300, 40, 40);
  ellipse(380, 300, 40, 40);
  ellipse(380, 360, 40, 40);
  ellipse(265, 385, 40, 40);
  ellipse(180, 240, 40, 40);
  
  //this is the sun
  fill("yellow");
  ellipse(520, 0, 300, 300);

  // Basket
  if (!gameOver) {
    basketX = mouseX;
    drawBasket(basketX, basketY);

    for (let i = 0; i < apples.length; i++) {
      drawApple(apples[i]);
      moveApple(apples[i]);
      checkCatch(apples[i]);
    }

    // Display score and level
    fill(255);
    textSize(20);
    text("Score: " + score, 10, 30);
    text("Level: " + level, 300, 30);
    
    // Check for level advancement
    if (score >= level * levelThreshold) {
      level++;
      increaseDifficulty();
    }
  } else {
    // Display game over message
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2 - 20);
    textSize(20);
    text("Score: " + score, width / 2, height / 2 + 20);
    text("Level: " + level, width / 2, height / 2 + 50);
    text("Refresh to play again", width / 2, height / 2 + 80);
  }
}

// Basket
function drawBasket(x, y) {
  fill(139, 69, 19);
  rectMode(CENTER);
  rect(x, y, basketWidth, basketHeight, 10); 

  // Basket texture
  for (let i = -basketWidth / 2; i < basketWidth / 2; i += 10) {
    stroke(255, 204, 0);
    line(x + i, y, x + i + 10, y + 10);
  }
}

function createApple() {
  return {
    x: random(width),
    y: random(-100, -10),
    size: 20,
    speed: random(1, 3)
  };
}

// Apple
function drawApple(apple) {
  // Draw a gradient for the apple
  let red = color(255, 0, 0);
  let darkRed = color(200, 0, 0);
  let brown = color(139, 69, 19); // Brown color

  // Create a gradient for the red apple
  noStroke();
  push();
  translate(apple.x, apple.y);
  
  // Gradient effect
  for (let i = 0; i < apple.size; i++) {
    let inter = map(i, 0, apple.size, 0, 1);
    let c = lerpColor(darkRed, red, inter);
    fill(c);
    ellipse(0, 0, apple.size - i, apple.size - i);
  }

  // Draw a small highlight on the apple
  fill(255, 255, 255, 150);
  ellipse(-apple.size / 4, -apple.size / 4, apple.size / 4);

  // Draw a small brown area to give a realistic look
  fill(brown);
  ellipse(apple.size / 4, apple.size / 4, apple.size / 8, apple.size / 8);
  
  pop();
}

function moveApple(apple) {
  apple.y += apple.speed;

  if (apple.y > height) {
    gameOver = true; // End game if the apple falls below the canvas
  }
}

function resetApple(apple) {
  apple.y = random(-100, -10);
  apple.x = random(width);
}

function checkCatch(apple) {
  // Check if apple is within the basket's range
  if (
    apple.y + apple.size / 2 > basketY &&
    apple.x > basketX - basketWidth / 2 &&
    apple.x < basketX + basketWidth / 2
  ) {
    score++;
    resetApple(apple);
  }
}

function increaseDifficulty() {
  // Increase the speed of apples
  for (let i = 0; i < apples.length; i++) {
    apples[i].speed += 0.2; 
  }
  
  if (numApples < 15) { 
    numApples++;
    let newApple = createApple();
    apples.push(newApple);
  }
}
