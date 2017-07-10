start = function() {
	canvas=document.getElementById("game_canvas");
	ctx=canvas.getContext("2d");
	document.addEventListener("keydown",keyPush);
  bg_color = "#F8F9F9";
  apl_color = "#d32f2f";
  snake_color = "#64dd17";
  drawMenu("Press Space to Play");
}

drawMenu = function(text) {
  ctx.fillStyle=bg_color;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.font = "50px Droid Sans";
  ctx.fillStyle="black";
  ctx.textAlign = "center";
  ctx.fillText(text,game_canvas.width/2,game_canvas.height/2);
}

overdrawMenu = function(text) {
  ctx.font = "50px Droid Sans";
  ctx.fillStyle="black";
  ctx.textAlign = "center";
  ctx.fillText(text,game_canvas.width/2,game_canvas.height/2);
}

startGame = function() {
  game_interval = setInterval(gameLoop,1000/20);
  game_end = false;
  px=py=1;
  tiles=40;
  block_size=game_canvas.width/tiles;
  seperation_size = 4;

  ax=Math.floor(Math.random()*tiles);
  ay=Math.floor(Math.random()*tiles);

  xv=1;
  yv=0;
  tail_coords=[];
  tail_length = 1;
}

endGame = function() {
  clearInterval(game_interval);
  overdrawMenu("Press Space to Play Again");
}

function gameLoop() {

	document.getElementById("score").innerHTML = "score: " + (tail_length-1).toString();

	px+=xv;
	py+=yv;

	if(px<0) {
		px = tiles-1;
	}
	if(px>tiles-1) {
		px = 0;
	}
	if(py<0) {
		py = tiles-1;
	}
	if(py>tiles-1) {
		py = 0;
	}

	ctx.fillStyle=bg_color;
	ctx.fillRect(0,0,canvas.width,canvas.height);

	ctx.fillStyle=snake_color;
	for(var i=0;i<tail_coords.length;i++) {
		ctx.fillRect(tail_coords[i].x*block_size,tail_coords[i].y*block_size,block_size-seperation_size,block_size-seperation_size);
		if(tail_coords[i].x==px && tail_coords[i].y==py) {
      game_end = true;
		}
	}

	tail_coords.push({x:px,y:py});

	while(tail_coords.length>tail_length) {
	  tail_coords.shift();
	}

	if(ax==px && ay==py) {
		tail_length++;
		ax=Math.floor(Math.random()*tiles);
		ay=Math.floor(Math.random()*tiles);
	}

	ctx.fillStyle=apl_color;
	ctx.fillRect(ax*block_size,ay*block_size,block_size-2,block_size-2);

  if (game_end == true) {
    endGame();
  }
}

function keyPush(evt) {
	switch(evt.keyCode) {
		case 37:
			xv=-1;yv=0;
			break;
		case 38:
			xv=0;yv=-1;
			break;
		case 39:
			xv=1;yv=0;
			break;
		case 40:
			xv=0;yv=1;
			break;
    case 32:
      startGame();
      break;
	}
}
