var backgroundImage;
var heightRatio = 1.0;
var fontSize = 32;
var siteTitle = "The Cup Cup Club";


function calculateCoverDimensions() {
  var w = windowWidth;
  var h = windowHeight;
  var maxDim = Math.max(w, h);
  var expectedWidth = Math.ceil(h / heightRatio);

  if (w > h || (h > w && w > expectedWidth)) {
    w = w;
    h = w * heightRatio;
  } else {
    w = expectedWidth;
    h = h
  }

  return {x: w, y: h};
}


function preload() {
  var bgPath = '/cupcup/img/natezilla.png';
  if (Math.random() > 0.5) {
    bgPath = '/cupcup/img/nathan.png';
    heightRatio = 1.269231;
  }
  backgroundImage = loadImage(bgPath);
}


function drawBackground(dims) {
  background(backgroundImage);
  text = createA('/', siteTitle);
  text.id("site-title");
  text.position(fontSize, fontSize);

  text = createA('http://samolds.com', "By Sam Olds");
  text.id("site-author");
  text.position(fontSize, dims.y - fontSize);
}

function updateBackground(dims) {
  background(backgroundImage);
  text = select("#site-author");
  text.position(fontSize, dims.y - fontSize);
}


function windowResized() {
  var dims = calculateCoverDimensions();
  resizeCanvas(dims.x, dims.y);
  updateBackground(dims);
}


function setup() {
  var dims = calculateCoverDimensions();
  port = createCanvas(dims.x, dims.y);
  port.parent('viewport');
  drawBackground(dims);
}


// TODO:
// http://p5js.org/examples/demos/Hello_P5_Flocking.php
function draw() {
  if (mouseIsPressed) {
    fill(255);
    ellipse(mouseX, mouseY, 5, 5);
  }
}
