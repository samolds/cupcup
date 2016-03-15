var backgroundImage;
var stepSize;
var pixelSize;
var X = 0;
var Y = 0;
var heightRatio = 1.0;
var fontSize = 32;
var siteTitle = "The Cup Cup Club";
var triangles = false;
var paused = false;


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

  if (Math.random() > 0.5) {
    triangles = true;
  }

  backgroundImage = loadImage(bgPath);
}


function drawBackground(dims) {
  backgroundImage.resize(dims.x, dims.y);
  backgroundImage.loadPixels();

  text = createA('http://cupcup.club', siteTitle);
  text.id("site-title");
  text.position(fontSize, fontSize);

  // TODO: Create nested element with small and "A spring break project by: "
  text = createA('http://samolds.com', "Sam Olds");
  text.id("site-author");
  text.position(dims.x - (5 * fontSize), dims.y - fontSize);

  stepSize = Math.floor(dims.x / 20);
  pixelSize = Math.floor(dims.x / 10);
}


function updateBackground(dims) {
  backgroundImage.resize(dims.x, dims.y);
  backgroundImage.loadPixels();

  text = select("#site-author");
  text.position(dims.x - (5 * fontSize), dims.y - fontSize);

  stepSize = Math.floor(dims.x / 20);
  pixelSize = Math.floor(dims.x / 10);
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
  frameRate(90);
}


function randRange(range, point) {
  return Math.floor(Math.random() * (range - 1) + point - (range / 2));
}


function draw() {
  var x = randRange(100, X);
  var y = randRange(100, Y);
  var pix = backgroundImage.get(x, y);
  fill(pix);
  if (triangles) {
    triangle(randRange(pixelSize, x), randRange(pixelSize, y),
             randRange(pixelSize, x), randRange(pixelSize, y),
             randRange(pixelSize, x), randRange(pixelSize, y)
            );
  } else {
    var pixSize = randRange(fontSize, Math.floor(pixelSize / 4));
    ellipse(x, y, pixSize, pixSize);
  }

  X = X + stepSize;
  if (X >= backgroundImage.width) {
    X = 0;
    Y = Y + stepSize;
  }

  if (Y >= backgroundImage.height) {
    X = 0;
    Y = 0;
  }
}


function mousePressed() {
  if (paused) {
    loop();
    paused = false;
  } else {
    noLoop();
    paused = true;
  }
  return false; // prevent default
}
