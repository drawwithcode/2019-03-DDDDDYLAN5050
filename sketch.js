var myStar;
var num_star = 1000;
var allStars = [];
var hit = 0;
var hitwig = 0;

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  perspective(PI / 2.0, width / height, 0.01, 50000);
  // setAttributes('antialias', true);
  colorMode(HSB);
  for (var i = 0; i < num_star; i++) {
    var stars = new star(300, random() * 150 + 150, color(random(220,320),200,180));
    allStars.push(stars);
  }
  noCursor();
  frameRate(144);
}

function draw() {
  orbitControl();
  background(0);
  push();
  translate(mouseX - width / 2, mouseY - height / 2);
  rotateY(PI);
  rotateX(PI / 2);
  rotateY((mouseX - width / 2) / 1000);
  stroke(0, 255, 255);
  strokeWeight(3);
  noFill();
  scale(1, 1, 0.5);
  cone(50, 300, 3, 1, 0);
  translate(0, -50, 0);
  scale(1, 1, 0.2);
  cone(200, 100, 3, 1, 0);
  pop();

  hitwig = constrain(hitwig - 0.6, 0, 30);
  myCanvas.position(random(hitwig), random(hitwig));

  for (var i = 0; i < allStars.length; i++) {
    var b = allStars[i];
    b.move();
    b.display();
  }
}

function star(_speed, _size, _color) {
  this.x = random(-8, 8) * windowWidth;
  this.y = random(-8, 8) * windowHeight;
  this.z = random(-50000);
  this.speed = _speed;
  this.color = _color;
  this.size = _size;
  var zpos = this.z;
  this.move = function () {
    if (zpos < 0) {
      zpos += this.speed;
    } else {
      this.x = random(-8, 8) * windowWidth;
      this.y = random(-8, 8) * windowHeight;
      zpos -= 50000;
    }
  }
  this.display = function () {
    stroke(this.color);
    strokeWeight(15);
    noFill();
    push();
    translate(this.x, this.y, zpos);
    box(this.size);
    var dis = dist(this.x, this.y, zpos, mouseX - width / 2, mouseY - height / 2, 0);
    if (dis < 250) {
      hit++;
      hitwig = 30;
      console.log(hit);
    }
    pop();
  }
}
