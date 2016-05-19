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
  background: {
    loaded: false,
  },

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
                  path:         "/cupcup/img/squire/privatewaffles.png",
                  nickname:     "privatewaffles"
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

// Initialization that happens only once before anything else
window.onload = function() {
  var randomIndex = Math.floor(Math.random() * Globals.possibleShapes.length);
  Globals.shape = Globals.possibleShapes[randomIndex];

  randomIndex = Math.floor(Math.random() * Globals.possibleBackgrounds.length);
  Globals.background = Globals.possibleBackgrounds[randomIndex];

  var dims = calculateCoverDimensions();

  Globals.portal = createCanvas(dims.x, dims.y, 'viewport');
  Globals.background.image = loadImage(Globals.background.path, dims);

  // Choose random starting step size and pixel sizes, randomly picked
  // from a range around the initial sizes
  Globals.stepSize = randRange(Globals.stepSize / 2, Globals.stepSize);
  Globals.pixelSize = randRange(Globals.pixelSize / 2, Globals.pixelSize);

  // Adjust all of the pixels by some random value between 0 and 1
  // A value of 1 wont adjust the color at all
  Globals.redAdjust = 1.0;
  Globals.greenAdjust = 1.0;
  Globals.blueAdjust = 1.0;

  window.setInterval(function () {
    draw();
  }, 10);
}

// Called whenever the window is resized
window.onresize = function(event) {
  var dims = calculateCoverDimensions();

  Globals.portal.canvas.width = dims.x;
  Globals.portal.canvas.height = dims.y;

  updateBackground(dims);
};

// Builds an image object and draws it as the background from a path
function loadImage(path, dims) {
  var img = new Image();
  img.src = path;

  img.onload = function() {
    Globals.background.loaded = true;
    drawBackground(dims);
    Globals.background.imageData = Globals.portal.getImageData(0, 0, dims.x, dims.y);
  }

  return img;
}

// Creates a canvas element with the provided dimensions
function createCanvas(dimX, dimY) {
  var canvas = addElement("canvas");
  canvas.setAttribute('width', dimX);
  canvas.setAttribute('height', dimY);
  var ctx = canvas.getContext('2d');
  return ctx;
}

// Converts rgb colors to hex string
function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

// Repeatedly called forever until pause is clicked
function draw() {
  if (Globals.paused || !Globals.background.loaded) {
    return;
  }

  var x = randRange(Globals.stepSize, Globals.x);
  var y = randRange(Globals.stepSize, Globals.y);

  // Make sure no pixels are chosen from outside the image
  x = Math.max(0, x)
  x = Math.min(Globals.background.image.width - 1, x);
  y = Math.max(0, y)
  y = Math.min(Globals.background.image.height - 1, y);

  var idx = 4 * (x + y * Globals.background.image.width);
  var pix = [0, 0, 0];
  pix[0] = Globals.background.imageData.data[idx + 0];
  pix[1] = Globals.background.imageData.data[idx + 1];
  pix[2] = Globals.background.imageData.data[idx + 2];

  //pix[0] = pix[0] * Globals.redAdjust; // red
  //pix[1] = pix[1] * Globals.greenAdjust; // green
  //pix[2] = pix[2] * Globals.blueAdjust; // blue

  var hex = "#" + ("000000" + rgbToHex(pix[0], pix[1], pix[2])).slice(-6);
  Globals.portal.fillStyle = hex;

  if (Globals.shape === "ellipse") {
    Globals.portal.arc(x, y, Globals.pixelSize, 0, Math.PI*2, true);
    Globals.portal.fill();
  } else if (Globals.shape === "triangle") {
    var triWidth = randRange(Globals.pixelSize, Globals.pixelSize);
    var triHeight = randRange(Globals.pixelSize, Globals.pixelSize);
    var x1 = x + (triWidth / 1.2);
    var y1 = y + (triHeight / 1.2);
    var x2 = x - (triWidth / 1.2);
    var y2 = y + (triHeight / 1.2);
    var x3 = x - (triWidth / 2.4);
    var y3 = y - (triHeight / 2.4);

    Globals.portal.beginPath();
    Globals.portal.moveTo(x1, y1);
    Globals.portal.lineTo(x2, y2);
    Globals.portal.lineTo(x3, y3);
    Globals.portal.fill();
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

    Globals.portal.beginPath();
    Globals.portal.moveTo(x1, y1);
    Globals.portal.lineTo(x2, y2);
    Globals.portal.lineTo(x3, y3);
    Globals.portal.lineTo(x4, y4);
    Globals.portal.fill();
  } else {
    var randomIndex = Math.floor(Math.random() * Globals.background.nickname.length);
    var randomLetter = Globals.background.nickname[randomIndex];

    Globals.portal.font = (Globals.pixelSize).toString() + "px sans-serif";
    Globals.portal.fillText(randomLetter, x, y);
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

// Picks a random number within a range around a value
function randRange(range, pos) {
  return Math.floor(Math.random() * (range - 1) + pos - (range / 2));
}

// Calculates the necessary dimensions of the image such that the entire
// window is filled without ruining the aspect ratio
function calculateCoverDimensions() {
  var w = window.innerWidth;
  var h = window.innerHeight;
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

// Draws the background and places all html elements on initial page load
function drawBackground(dims) {
  Globals.background.image.width = dims.x;
  Globals.background.image.height = dims.y;
  Globals.portal.drawImage(Globals.background.image, 0, 0, dims.x, dims.y);

  // Pause button
  var text = addElement('a');
  text.setAttribute('href', '#!');
  text.setAttribute('id', 'pause');
  text.text = 'Go!';
  text.style.position = 'absolute';
  text.style.left = (dims.x - 40 - Globals.textPadding).toString() + 'px';
  text.style.top = (Globals.textPadding).toString() + 'px';

  text.onclick = function() {
    // The pause button is clicked
    if (Globals.paused) {
      Globals.downloadable = true;
      document.getElementById('image-download').style.display = "block";
      document.getElementById('pause').text = "Pause"
    } else {
      document.getElementById('pause').text = "Go!"
    }
    Globals.paused = !Globals.paused;
    return false; // prevent browser default
  };

  // Download link
  text = addElement('a');
  text.setAttribute('href', '#!');
  text.setAttribute('id', 'image-download');
  text.text = 'Download!';
  text.style.position = 'absolute';
  text.style.left = (dims.x - 117 - (Globals.textPadding * 2)).toString() + 'px';
  text.style.top = (Globals.textPadding).toString() + 'px';

  text.onclick = function() {
    // The download button is clicked
    Globals.portal.font = "32px sans-serif";
    Globals.portal.fillStyle = '#ffffff'; // white
    Globals.portal.fillText("cupcup.club", (Globals.textPadding / 2), Globals.background.image.height - (Globals.textPadding / 2));
    saveCanvas(this, Globals.background.nickname);
  };

  text.style.display = 'none';

  // Attribution
  text = addElement('small');
  text.setAttribute('id', 'site-author');
  text.innerText = 'A weekend project by: ';
  text.style.position = 'absolute';
  text.style.left = (dims.x - 190 - Globals.textPadding).toString() + 'px';
  text.style.top = (dims.y - Globals.textPadding + 2).toString() + 'px';

  text = addElement('a');
  text.setAttribute('href', 'http://samolds.com');
  text.text = 'Sam Olds';
  document.getElementById('site-author').appendChild(text);
}

// Downloads the canvas as a png
function saveCanvas(link, name) {
  var canvas = document.getElementById('viewport').children[0];
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  link.href = image;
  link.download = name + '.png';
}

// Appends the elemnt to the DOM
function addElement(kind) {
  var el = document.createElement(kind);
  document.getElementById('viewport').appendChild(el);
  return el;
}

// Readjusts place of HTML elements and resizes image whenever the
// window size is changed
function updateBackground(dims) {
  if (Globals.background === null) {
    return;
  }

  Globals.background.image.width = dims.x;
  Globals.background.image.height = dims.y;
  Globals.portal.drawImage(Globals.background.image, 0, 0, dims.x, dims.y);

  var author = document.getElementById('site-author');
  var pause = document.getElementById('pause');
  var download = document.getElementById('image-download');

  if (author === null || download === null || pause === null) {
    return;
  }

  pause.style.left = (dims.x - 40 - Globals.textPadding).toString() + 'px';
  pause.style.top = (Globals.textPadding).toString() + 'px';

  download.style.left = (dims.x - 117 - (Globals.textPadding * 2)).toString() + 'px';
  download.style.top = (Globals.textPadding).toString() + 'px';

  author.style.left = (dims.x - 190 - Globals.textPadding).toString() + 'px';
  author.style.top = (dims.y - Globals.textPadding + 2).toString() + 'px';

  download.style.display = 'none';
}
