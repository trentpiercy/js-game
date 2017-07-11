function start1v1() {
	canvas=document.getElementById("game_canvas");
	ctx=canvas.getContext("2d");
	document.addEventListener("keydown",keyPush2);
  bg_color = "white";
  apl_color = "#d32f2f";
  snake_color = "#64dd17";
  cooldown = 0;
  startCountdown2();
}

function startCountdown2() {
  count = 3;

  countdown2();
  game_interval = setInterval(countdown2,1000);
}

function countdown2() {
  if (count == 0) {
    clearInterval(game_interval);
    startGame2();
  } else {
    ctx.fillStyle=bg_color;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = "100px sans-serif";
    ctx.fillStyle="black";
    ctx.textAlign = "center";
    ctx.fillText(count,game_canvas.width/2,game_canvas.height/2);
    count--;
  }
}

function drawMenu2(text) {
  ctx.fillStyle=bg_color;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.font = "50px sans-serif";
  ctx.fillStyle="black";
  ctx.textAlign = "center";
  ctx.fillText(text,game_canvas.width/2,game_canvas.height/2);
}

function overdrawMenu2(text) {
  ctx.font = "50px sans-serif";
  ctx.fillStyle="black";
  ctx.textAlign = "center";
  ctx.fillText(text,game_canvas.width/2,game_canvas.height/2);
}

function startGame2() {

  game_interval = setInterval(gameLoop2,1000/20);
  game_end = false;
  px=py=1;
  tiles=40;
  block_size=game_canvas.width/tiles;
  seperation_size = 4;
  ended = false;

  ax=Math.floor(Math.random()*tiles);
  ay=Math.floor(Math.random()*tiles);

  xv=1;
  yv=0;
  tail_coords=[];
  tail_length = 1;
}

function endGame() {
  ended = true;
  clearInterval(game_interval);
  overdrawMenu2("Press Space to Play Again");
}

function clearGame() {
  clearInterval(game_interval);
  drawMenu2("");
}

function gameLoop2() {

	document.getElementById("score").innerHTML = "Score: " + (tail_length-1).toString();

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

  // Remove for Tron Mode :)
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

  cooldown--;

}

// Remove "//" for easy mode
function keyPush2(evt) {
  if (cooldown<=0) {
  	switch(evt.keyCode) {
  		case 37:
        //if (xv !== 1) {
          xv=-1;yv=0;
          cooldown = 1;
        //}
  			break;
  		case 38:
        //if (yv !== 1) {
          xv=0;yv=-1;
          cooldown = 1;
        //}
  			break;
  		case 39:
        //if (xv !== -1) {
          xv=1;yv=0;
          cooldown = 1;
        //}
  			break;
  		case 40:
        //if (yv !== -1) {
          xv=0;yv=1;
          cooldown = 1;
        //}
  			break;
      case 32:
        if (ended == true) {
          startcountdown2();
        }
        break;
  	}
  }
}
