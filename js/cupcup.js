var Globals = {
  portal: null,
  backgroundImage: null,

  stepSize: 100,
  pixelSize: 200,
  X: 0,
  Y: 0,

  textPadding: 32,
  siteTitle: "The Cup Cup Club",
  paused: true,

  shape: null,
  background: null,

  //possibleShapes: ["ellipse", "triangle", "quad"],
  possibleShapes: ["ellipse"],
  possibleBackgrounds: [ // (width x height)
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/bus.png",
                  nickname:     "bus"
                },
                { heightRatio:  1.500000, // (500 x 750)
                  path:         "/cupcup/img/butters.png",
                  nickname:     "butters"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/captain.png",
                  nickname:     "captain"
                },
                { heightRatio:  1.269231, // (650 x 825)
                  path:         "/cupcup/img/captainpancake.png",
                  nickname:     "captainpancake"
                },
                { heightRatio:  1.000000, // (600 x 600)
                  path:         "/cupcup/img/cupcup.png",
                  nickname:     "cupcup"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/face.png",
                  nickname:     "face"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/littleewok.png",
                  nickname:     "littleewok"
                },
                { heightRatio:  1.500000, // (500 x 750)
                  path:         "/cupcup/img/natjan.png",
                  nickname:     "natjan"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/pancake.png",
                  nickname:     "pancake"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/poop.png",
                  nickname:     "poop"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/poptart.png",
                  nickname:     "poptart"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/rat.png",
                  nickname:     "rat"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/shithead.png",
                  nickname:     "shithead"
                },
                { heightRatio:  1.500000, // (500 x 750)
                  path:         "/cupcup/img/sir.png",
                  nickname:     "sir"
                },
                { heightRatio:  0.666667, // (750 x 500)
                  path:         "/cupcup/img/turd.png",
                  nickname:     "turd"
                },
              ],
}


function preload() {
  var randomIndex = Math.floor(Math.random() * Globals.possibleShapes.length);
  Globals.shape = Globals.possibleShapes[randomIndex];

  randomIndex = Math.floor(Math.random() * Globals.possibleBackgrounds.length);
  Globals.background = Globals.possibleBackgrounds[randomIndex];
  Globals.background.image = loadImage(Globals.background.path);
}


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


function drawBackground(dims) {
  Globals.background.image.resize(dims.x, dims.y);
  background(Globals.background.image, 0, 0);
  noStroke();

  var text = createA('http://cupcup.club', Globals.siteTitle);
  text.id('site-title');
  text.position(Globals.textPadding, Globals.textPadding);

  text = createElement('small', 'A weekend project by: ');
  text.id('site-author');
  text.position(Globals.textPadding, dims.y - Globals.textPadding + 2);

  text = createA('http://samolds.com', 'Sam Olds');
  text.parent(select('#site-author'));

  text = createA('#!', 'Start!');
  text.id('pause');
  text.position(dims.x / 2 - 20, dims.y - Globals.textPadding);
  text.mouseClicked(function() {
    if (Globals.paused) {
      loop();
      document.getElementById('pause').text = "Pause"
    } else {
      noLoop();
      document.getElementById('pause').text = "Start!"
    }
    Globals.paused = !Globals.paused;
  });

  text = createA('#!', 'Download!');
  text.id('image-download');
  text.position(dims.x - (4 * Globals.textPadding), dims.y - Globals.textPadding);
  text.mouseClicked(function() {
    saveCanvas(Globals.portal, Globals.background.nickname, 'png');
  });
}


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

  author.position(Globals.textPadding, dims.y - Globals.textPadding + 2);
  pause.position(dims.x / 2 - 20, dims.y - Globals.textPadding);
  download.position(dims.x - (4 * Globals.textPadding), dims.y - Globals.textPadding);
}


function windowResized() {
  var dims = calculateCoverDimensions();
  resizeCanvas(dims.x, dims.y);
  updateBackground(dims);
}


function setup() {
  var dims = calculateCoverDimensions();
  Globals.portal = createCanvas(dims.x, dims.y);
  Globals.portal.parent('viewport');
  drawBackground(dims);
  frameRate(90);

  noLoop();
}


function randRange(range, pos) {
  return Math.floor(Math.random() * (range - 1) + pos - (range / 2));
}


function draw() {
  if (Globals.paused) {
    return;
  }

  var x = randRange(Globals.stepSize, Globals.X);
  var y = randRange(Globals.stepSize, Globals.Y);
  var pix = Globals.background.image.get(x, y);
  fill(pix);

  if (Globals.shape === "triangle") {
    // TODO: draw better triangles
    /*
    triangle(randRange(Globals.pixelSize, x), randRange(Globals.pixelSize, y),
             randRange(Globals.pixelSize, x), randRange(Globals.pixelSize, y),
             randRange(Globals.pixelSize, x), randRange(Globals.pixelSize, y)
            );
    */
  } else if (Globals.shape === "quad") {
    /*
    quad(randRange(Globals.pixelSize, x), randRange(Globals.pixelSize, y),
         randRange(Globals.pixelSize, x), randRange(Globals.pixelSize, y),
         randRange(Globals.pixelSize, x), randRange(Globals.pixelSize, y),
         randRange(Globals.pixelSize, x), randRange(Globals.pixelSize, y)
        );
    */
  } else {
    ellipse(x, y, Globals.pixelSize, Globals.pixelSize);
  }

  // TODO: Decrease the size of the shape being drawn each time Y rolls over
  Globals.X = Globals.X + Globals.stepSize;

  if (Globals.X >= Globals.background.image.width) {
    Globals.X = 0;
    Globals.Y = Globals.Y + Globals.stepSize;
  }

  if (Globals.Y >= Globals.background.image.height) {
    Globals.X = 0;
    Globals.Y = 0;
    Globals.pixelSize = Globals.pixelSize / 4;
    Globals.stepSize = Globals.stepSize / 4;
  }

  if (Globals.stepSize <= 5) {
    noLoop();
  }

  if (Globals.pixelSize <= 5) {
    noLoop();
  }
}
