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
  backgroundLoaded: false,

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
