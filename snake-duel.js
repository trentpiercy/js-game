function start1v1() {
	canvas=document.getElementById("game_canvas");
	ctx=canvas.getContext("2d");
	document.addEventListener("keydown",keyPush2);
  bg_color = "white";
  apl_color = "#d32f2f";
  snake_color = "#64dd17";
	snake2_color = "#42a5f5";
  cooldown = 0;
	cooldown2 = 0;
	ended1 = false;
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
	document.getElementById("score").innerHTML = "P1: 0 P2: 0";

  game_interval = setInterval(gameLoop2,1000/20);
  game_end = false;
  px=py=1;
	px2=py2=38;
  tiles=40;
  block_size=game_canvas.width/tiles;
  seperation_size = 4;
  ended1 = false;

  ax=Math.floor(Math.random()*tiles);
  ay=Math.floor(Math.random()*tiles);

  xv=1;
  yv=0;

	xv2=-1;
	yv2=0;

  tail_coords=[];
  tail_length = 1;

	tail_coords2=[];
	tail_length2 = 1;
}

function P1Win() {
  ended1 = true;
  clearInterval(game_interval);
  overdrawMenu2("Player One Wins!");
}

function P2Win() {
  ended1 = true;
  clearInterval(game_interval);
  overdrawMenu2("Player Two Wins!");
}

function clearGame() {
  clearInterval(game_interval);
  drawMenu2("");
}

function gameLoop2() {

	px+=xv;
	py+=yv;

	px2+=xv2;
	py2+=yv2;

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

	if(px2<0) {
		px2 = tiles-1;
	}
	if(px2>tiles-1) {
		px2 = 0;
	}
	if(py2<0) {
		py2 = tiles-1;
	}
	if(py2>tiles-1) {
		py2 = 0;
	}

	ctx.fillStyle=bg_color;
	ctx.fillRect(0,0,canvas.width,canvas.height);

	// P1 Priority
	ctx.fillStyle=snake2_color;
	for(var i=0;i<tail_coords2.length;i++) {
		ctx.fillRect(tail_coords2[i].x*block_size,tail_coords2[i].y*block_size,block_size-seperation_size,block_size-seperation_size);

		if(tail_coords2[i].x==px2 && tail_coords2[i].y==py2) {
			P1Win()
		}

		for(var n=0;n<tail_coords.length;n++) {
			if(px2==tail_coords[n].x && py2==tail_coords[n].y) {
				P1Win()
			}
		}
	}

	ctx.fillStyle=snake_color;
	for(var i=0;i<tail_coords.length;i++) {
		ctx.fillRect(tail_coords[i].x*block_size,tail_coords[i].y*block_size,block_size-seperation_size,block_size-seperation_size);

		if(tail_coords[i].x==px && tail_coords[i].y==py) {
      P2Win()
		}

		for(var n=0;n<tail_coords2.length;n++) {
			if(px==tail_coords2[n].x && py==tail_coords2[n].y) {
	      P2Win()
			}
		}
	}

	tail_coords.push({x:px,y:py});
	tail_coords2.push({x:px2,y:py2});

	while(tail_coords.length>tail_length) {
	  tail_coords.shift();
	}

	while(tail_coords2.length>tail_length2) {
		tail_coords2.shift();
	}

	if(ax==px && ay==py) {
		tail_length++;
		ax=Math.floor(Math.random()*tiles);
		ay=Math.floor(Math.random()*tiles);
		document.getElementById("score").innerHTML = "P1: " + (tail_length-1).toString() +  " P2: " + (tail_length2-1).toString();
	}

	if(ax==px2 && ay==py2) {
		tail_length2++;
		ax=Math.floor(Math.random()*tiles);
		ay=Math.floor(Math.random()*tiles);
		document.getElementById("score").innerHTML = "P1: " + (tail_length-1).toString() +  " P2: " + (tail_length2-1).toString();
	}

	ctx.fillStyle=apl_color;
	ctx.fillRect(ax*block_size,ay*block_size,block_size-2,block_size-2);

  cooldown--;
	cooldown2--;

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
		}
	}

	if (cooldown2<=0) {
		switch(evt.keyCode) {
			case 65:
	      //if (xv !== 1) {
	        xv2=-1;yv2=0;
	        cooldown2 = 1;
	      //}
				break;
			case 87:
	      //if (yv !== 1) {
	        xv2=0;yv2=-1;
	        cooldown2 = 1;
	      //}
				break;
			case 68:
	      //if (xv !== -1) {
	        xv2=1;yv2=0;
	        cooldown2 = 1;
	      //}
				break;
			case 83:
	      //if (yv !== -1) {
	        xv2=0;yv2=1;
	        cooldown2 = 1;
	      //}
				break;
  	}
  }
	if (ended1 == true) {
		if (evt) {
			document.getElementById("score").innerHTML = "P1: 0 P2: 0";
			ended1 = false;
			startCountdown2();
		}
	}
}
