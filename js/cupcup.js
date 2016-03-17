// Global variables used throughout this script crawling with side effects
var Globals = {
  portal: null,
  backgroundImage: null,

  stepSize: 100,
  pixelSize: 200,
  x: 0,
  y: 0,
  iterations: 7,

  redAdjust: 1.0,
  greenAdjust: 1.0,
  blueAdjust: 1.0,

  textPadding: 32,
  paused: true,
  downloadable: false,

  shape: null,
  background: null,

  possibleShapes: ["ellipse", "triangle", "quad", "text"],
  possibleBackgrounds: [                  // (width x height)
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/bus.png",
                  nickname:     "bus"
                },
                { heightRatio:  1.500000, // (500 x 750)
                  path:         "/cupcup/img/master/butters.png",
                  nickname:     "butters"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/captain.png",
                  nickname:     "captain"
                },
                { heightRatio:  1.269231, // (650 x 825)
                  path:         "/cupcup/img/master/captainpancake.png",
                  nickname:     "captainpancake"
                },
                { heightRatio:  1.000000, // (600 x 600)
                  path:         "/cupcup/img/master/cupcup.png",
                  nickname:     "cupcup"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/face.png",
                  nickname:     "face"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/littleewok.png",
                  nickname:     "littleewok"
                },
                { heightRatio:  1.500000, // (500 x 750)
                  path:         "/cupcup/img/master/nugget.png",
                  nickname:     "nugget"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/pancake.png",
                  nickname:     "pancake"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/poop.png",
                  nickname:     "poop"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/poptart.png",
                  nickname:     "poptart"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/rat.png",
                  nickname:     "rat"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/shithead.png",
                  nickname:     "shithead"
                },
                { heightRatio:  1.500000, // (500 x 750)
                  path:         "/cupcup/img/master/sir.png",
                  nickname:     "sir"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/master/turd.png",
                  nickname:     "turd"
                },

                { heightRatio:  1.000000, // (600 x 600)
                  path:         "/cupcup/img/squire/a.png",
                  nickname:     "a"
                },
                { heightRatio:  1.000000, // (600 x 600)
                  path:         "/cupcup/img/squire/b.png",
                  nickname:     "b"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/squire/c.png",
                  nickname:     "c"
                },
                { heightRatio:  1.000000, // (600 x 600)
                  path:         "/cupcup/img/squire/d.png",
                  nickname:     "d"
                },
                { heightRatio:  1.000000, // (600 x 600)
                  path:         "/cupcup/img/squire/e.png",
                  nickname:     "e"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/squire/fonzie.png",
                  nickname:     "fonzie"
                },
              ],
}


// P5 Specific function
// Initialization that happens only once before anything else
function preload() {
  var randomIndex = Math.floor(Math.random() * Globals.possibleShapes.length);
  Globals.shape = Globals.possibleShapes[randomIndex];

  randomIndex = Math.floor(Math.random() * Globals.possibleBackgrounds.length);
  Globals.background = Globals.possibleBackgrounds[randomIndex];
  Globals.background.image = loadImage(Globals.background.path);
}


// P5 Specific function
// Initialization that runs once after 'preload'
function setup() {
  var dims = calculateCoverDimensions();
  Globals.portal = createCanvas(dims.x, dims.y);
  Globals.portal.parent('viewport');
  drawBackground(dims);
  frameRate(90);

  // Choose random starting step size and pixel sizes, randomly picked
  // from a range around the initial sizes
  Globals.stepSize = randRange(Globals.stepSize / 2, Globals.stepSize);
  Globals.pixelSize = randRange(Globals.pixelSize / 2, Globals.pixelSize);

  // Adjust all of the pixels by some random value between 0 and 1
  // A value of 1 wont adjust the color at all
  Globals.redAdjust = 1.0;
  Globals.greenAdjust = 1.0;
  Globals.blueAdjust = 1.0;

  noLoop(); // "turn off" calling the draw loop
}


// P5 Specific function
// Called whenever the window is resized
function windowResized() {
  var dims = calculateCoverDimensions();
  resizeCanvas(dims.x, dims.y);
  updateBackground(dims);
}


// P5 Specific function
// Repeatedly called forever after 'preload' and 'setup'
function draw() {
  if (Globals.paused) {
    return;
  }
  if (Globals.iterations <= 0) {
    noLoop(); // "turn off" calling the draw loop
  }

  var x = randRange(Globals.stepSize, Globals.x);
  var y = randRange(Globals.stepSize, Globals.y);

  // Make sure no pixels are chosen from outside the image
  x = Math.max(0, x)
  x = Math.min(Globals.background.image.width - 1, x);
  y = Math.max(0, y)
  y = Math.min(Globals.background.image.height - 1, y);

  var pix = Globals.background.image.get(x, y);

  pix[0] = pix[0] * Globals.redAdjust; // red
  pix[1] = pix[1] * Globals.greenAdjust; // green
  pix[2] = pix[2] * Globals.blueAdjust; // blue

  fill(pix);

  if (Globals.shape === "ellipse") {
    ellipse(x, y, Globals.pixelSize, Globals.pixelSize);
  } else if (Globals.shape === "triangle") {
    var triWidth = randRange(Globals.pixelSize, Globals.pixelSize);
    var triHeight = randRange(Globals.pixelSize, Globals.pixelSize);
    var x1 = x + (triWidth / 1.2);
    var y1 = y + (triHeight / 1.2);
    var x2 = x - (triWidth / 1.2);
    var y2 = y + (triHeight / 1.2);
    var x3 = x - (triWidth / 2.4);
    var y3 = y - (triHeight / 2.4);
    triangle(x1, y1, x2, y2, x3, y3);
  } else if (Globals.shape === "quad") {
    var quadWidth = randRange(Globals.pixelSize, Globals.pixelSize);
    var quadHeight = randRange(Globals.pixelSize, Globals.pixelSize);
    var x1 = x + (quadWidth / 1.2);
    var y1 = y + (quadHeight / 1.2);
    var x2 = x - (quadWidth / 1.4);
    var y2 = y + (quadHeight / 1.4);
    var x3 = x - (quadWidth / 1.3);
    var y3 = y - (quadHeight / 1.3);
    var x4 = x + (quadWidth / 1.5);
    var y4 = y - (quadHeight / 1.5);
    quad(x1, y1, x2, y2, x3, y3, x4, y4);
  } else {
    var randomIndex = Math.floor(Math.random() * Globals.background.nickname.length);
    var randomLetter = Globals.background.nickname[randomIndex];
    textSize(Globals.pixelSize);
    text(randomLetter, x, y);
  }

  Globals.x = Globals.x + Globals.stepSize;

  // Reached the end of the row. Restart on the next row.
  if (Globals.x >= Globals.background.image.width) {
    Globals.x = 0;
    Globals.y = Globals.y + Globals.stepSize;
  }

  // Reached the last row. Restart on the first row.
  if (Globals.y >= Globals.background.image.height) {
    Globals.iterations--;
    Globals.x = 0;
    Globals.y = 0;
    Globals.pixelSize = Globals.pixelSize / 2;
    Globals.stepSize = Globals.stepSize / 2;
  }
}


// Custom Helper Function
// Picks a random number within a range around a value
function randRange(range, pos) {
  return Math.floor(Math.random() * (range - 1) + pos - (range / 2));
}


// Custom Helper Function
// Calculates the necessary dimensions of the image such that the entire
// window is filled without ruining the aspect ratio
function calculateCoverDimensions() {
  var w = windowWidth;
  var h = windowHeight;
  var expectedHeight = Math.ceil(w * Globals.background.heightRatio);
  var expectedWidth = Math.ceil(h / Globals.background.heightRatio);

  if (expectedWidth < w && expectedHeight > h) {
    w = w;
    h = expectedHeight;
  } else {
    w = expectedWidth;
    h = h
  }

  return {x: w, y: h};
}


// Custom Helper Function
// Draws the background and places all html elements on initial page load
function drawBackground(dims) {
  Globals.background.image.resize(dims.x, dims.y);
  background(Globals.background.image, 0, 0);
  noStroke();

  // Pause button
  text = createA('#!', 'Go!');
  text.id('pause');
  text.position(dims.x - 40 - Globals.textPadding, Globals.textPadding);
  text.mouseClicked(function() {
    // The pause button is clicked
    if (Globals.paused) {
      Globals.downloadable = true;
      select('#image-download').show();
      loop(); // "turn on" calling the draw loop
      document.getElementById('pause').text = "Pause"
    } else {
      noLoop(); // "turn off" calling the draw loop
      document.getElementById('pause').text = "Go!"
    }
    Globals.paused = !Globals.paused;
    return false; // prevent browser default
  });

  // Download link
  text = createA('#!', 'Download!');
  text.id('image-download');
  text.position(dims.x - 117 - (Globals.textPadding * 2), Globals.textPadding);
  text.mouseClicked(function() {
    // The download button is clicked
    Globals.portal.textSize(32);
    Globals.portal.fill('#fff'); // white
    Globals.portal.text("cupcup.club", (Globals.textPadding / 2), Globals.background.image.height - (Globals.textPadding / 2));
    saveCanvas(Globals.portal, Globals.background.nickname, 'png');
    return false; // prevent browser default
  });
  text.hide();

  // Attribution
  var text = createElement('small', 'A weekend project by: ');
  text.id('site-author');
  text.position(dims.x - 190 - Globals.textPadding, dims.y - Globals.textPadding + 2);

  text = createA('http://samolds.com', 'Sam Olds');
  text.parent(select('#site-author'));
}


// Custom Helper Function
// Readjusts place of HTML elements and resizes image whenever the
// window size is changed
function updateBackground(dims) {
  if (Globals.background === null) {
    return;
  }

  Globals.background.image.resize(dims.x, dims.y);
  background(Globals.background.image, 0, 0);

  var author = select('#site-author');
  var pause = select('#pause');
  var download = select('#image-download');

  if (author === null || download === null || pause === null) {
    return;
  }

  pause.position(dims.x - 40 - Globals.textPadding, Globals.textPadding);
  download.position(dims.x - 117 - (Globals.textPadding * 2), Globals.textPadding);
  author.position(dims.x - 190 - Globals.textPadding, dims.y - Globals.textPadding + 2);
  download.hide();
}
