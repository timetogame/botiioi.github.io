(function () {

	var canvas = document.querySelector('canvas');
	var c = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	window.addEventListener('resize', function () {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		init();
	});

	

	var maxRadius = 20;
	// minRadius = 8;

	var colorArray = [
		'#3A7D7C',
		'#03A6A6',
		'#EC5A31',
		'#FE736C',
		'#FF7801',
	];


var touch = {
		x: undefined,
		y: undefined
}

window.addEventListener('touchmove', function(e) {
  
  touch.x = e.touches[0].clientX;
  touch.y = e.touches[0].clientY;
    
}, false);

	function Circle(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.minRadius = radius;
		this.color = colorArray[Math.floor(Math.random() * colorArray.length)]; //округляем рандомное число до целого значения

		this.draw = function () {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
		}

		this.update = function () {
			if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
				this.dx = -this.dx;
			}
			if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
				this.dy = -this.dy;
			}

			this.x += this.dx;
			this.y += this.dy;

			//interactiviti

			if (touch.x - this.x < 50 && touch.x - this.x > -50 && touch.y - this.y < 50 && touch.y - this.y > -
				50) { //финт ушами!
				if (this.radius < maxRadius) {
					this.radius += 1;
				}
			} else if (this.radius > this.minRadius) {
				this.radius -= 1; // исходя(после) из предыдущего условия, уменьшить радиус
			}

			this.draw();
		}
	}

	
	var circleArray = [];

	function init() {

		circleArray = []; //не дает запускать каждый цикл при динамическом расширении окна

		for (var i = 0; i < 550; i++) {
			var radius = Math.random() * 3 + 1;
			var x = Math.random() * (innerWidth - radius * 2) + radius;
			var y = Math.random() * (innerHeight - radius * 2) + radius;
			var dx = (Math.random() - 0.5);
			var dy = (Math.random() - 0.5);
			circleArray.push(new Circle(x, y, dx, dy, radius));
		}
	}

	function animate() {
		requestAnimationFrame(animate);

		c.clearRect(0, 0, innerWidth, innerHeight);

		for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
		}
	}

	init();
	animate();
})();
