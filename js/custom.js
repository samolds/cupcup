function setup() {
  port = createCanvas(640, 480);
  port.parent('viewport');
  port.parent('viewport');

  loadImage('/cupcup/img/nathan.png', function(img) {
    image(img, 0, 0);
  });

  loadImage('/cupcup/img/natezilla.png', function(img) {
    image(img, 0, 0);
  });
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
