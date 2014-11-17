function SnowflakeMouseTail(nDots, imagePath, imageBaseName) {

	this.nDots = nDots + 1;
	this.imagePath = imagePath;
	this.imageBaseName = imageBaseName;
	
	this.x = 0;
	this.y = 0;

	this.deltat = .01;
	this.seglen = 10;
	this.springk = 10;
	this.mass = 1;
	this.gravity = 50;
	this.resistance = 10;
	this.stopvel = 0.1;
	this.stopacc = 0.1;
	this.dotsize = 10;
	this.bounce = 0.75;

	this.dots = new Array();

	this.init = function()
	{
	
		if (document.createElement) {
		
			for (var i = 0; i < this.nDots; i++) {
			
				var tempImg = document.createElement("img");
				tempImg.src = this.imagePath + ((i > 0) ? i : 1) + this.imageBaseName;
				tempImg.alt = "";
				tempImg.style.position = "absolute";
				tempImg.style.display = "block";
				tempImg.style.zIndex = 1000;
				tempImg.style.visibility = "hidden";
				document.body.appendChild(tempImg);
				
				this.dots[i] = { obj: tempImg, X: this.x, Y: this.y, dx: 0, dy: 0 };
			}

			this.dots[0].X = this.dots[1].X;
			this.dots[0].Y = this.dots[1].Y - this.seglen;
			
			for (var i = 0; i < this.dots.length; i++) {
			
				this.dots[i].obj.style.left = this.x + "px";
				this.dots[i].obj.style.top = this.y + "px";
			}
		
			window.snowFlakesMouseTail = this;
		
			document.onmousemove = function(evt) { window.snowFlakesMouseTail.moveHandler(evt); };
		
			window.setInterval(function() { window.snowFlakesMouseTail.animate(); }, 20);
		}
	}
	
	this.disable = function() {
	
		for (var i = 0; i < this.dots.length; i++) {
		
			this.dots[i].obj.style.display = "none";
		}
	}
	
	this.enable = function() {
	
		for (var i = 0; i < this.dots.length; i++) {
		
			this.dots[i].obj.style.display = "block";
		}
	}
	
	this.moveHandler = function(evt) {
	
		if (!evt) evt = window.event;
		
		if (evt.x) {
		
			if (document.documentElement) {
			
				this.x = evt.clientX + document.documentElement.scrollLeft;
				this.y = evt.clientY + document.documentElement.scrollTop;
			}
			else {
			
				this.x = evt.x;
				this.y = evt.y;
			}
		}
		else {
		
			this.x = evt.pageX;
			this.y = evt.pageY;
		}
	}

	this.springForce = function(i, j, spring) {

		var dx = (this.dots[i].X - this.dots[j].X);
		var dy = (this.dots[i].Y - this.dots[j].Y);
		var len = Math.sqrt(dx*dx + dy*dy);
		
		if (len > this.seglen) {
		
			var springF = this.springk * (len - this.seglen);
			spring.X += (dx / len) * springF;
			spring.Y += (dy / len) * springF;
		}
		
		return spring;
	}

	this.animate = function() {
 
 		this.dots[0].X = this.x;
		this.dots[0].Y = this.y;
		
		this.dots[0].obj.style.left = this.dots[0].X + "px";
		this.dots[0].obj.style.top =  this.dots[0].Y + "px";

		for (var i = 1; i < this.nDots; i++) {

			var spring = { X: 0, Y: 0 }
  
			if (i > 0) {

				spring = this.springForce(i - 1, i, spring);
  			}
  
			if (i < (this.nDots - 1)) {
			
				spring = this.springForce(i + 1, i, spring);
			}

			var resist = { X: (-this.dots[i].dx * this.resistance), Y: (-this.dots[i].dy * this.resistance) };

			var accel = { X: ((spring.X + resist.X) / this.mass), Y: ((spring.Y + resist.Y) / this.mass + this.gravity) };
  
			this.dots[i].dx += (this.deltat * accel.X);
			this.dots[i].dy += (this.deltat * accel.Y);
  
			if ((Math.abs(this.dots[i].dx) < this.stopvel) && (Math.abs(this.dots[i].dy) < this.stopvel) && (Math.abs(accel.X) < this.stopacc) && (Math.abs(accel.Y) < this.stopacc)) {

				this.dots[i].dx = 0;
				this.dots[i].dy = 0;
			}

			this.dots[i].X += this.dots[i].dx;
			this.dots[i].Y += this.dots[i].dy;

			if (this.dots[i].X < 0) {

				if (this.dots[i].dx < 0) {

					this.dots[i].dx = this.bounce * -this.dots[i].dx;
				}

				this.dots[i].X = 0;
			}

			if (this.dots[i].obj.style.visibility == "hidden") this.dots[i].obj.style.visibility = "";

			this.dots[i].obj.style.left = this.dots[i].X + "px";
			this.dots[i].obj.style.top =  this.dots[i].Y + "px";
		}
	}
}

var mySnowflakeMouseTail = new SnowflakeMouseTail(6, "images/", "fl.gif");

mySnowflakeMouseTail.init();