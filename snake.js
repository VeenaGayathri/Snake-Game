function init()
{
	canvas=document.getElementById("mycanvas");
	W=H=canvas.width=canvas.height=650;
	pen=canvas.getContext('2d');
	cell_size=66;
	gameOver=false;
	score=0;

	myfood = new Array("static/food/mango.png","static/food/orange.png","static/food/pineapple.png","static/food/apple.png","static/food/banana.png","static/food/cherry.png");

	score_img=new Image()
	score_img.src='static/trophy.png';

	foodpos=food();

	snake=
	{
		init_length:5,
		color:'#008080',
		cells:[],
		direction:'right',
		
		create_snake: function()
		{
			for(var i=1; i<= this.init_length;i++)
				this.cells.push({x:i,y:0});
		},
		
		draw_snake: function()
		{
			for (var i=0; i<this.cells.length;i++)
			{
			
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cell_size,this.cells[i].y*
					cell_size,cell_size-4,cell_size-4);
				//0*50,1*50....new cellss
			}
			
		},

		update_snake: function()
		{
			// for movement, pop this first cell and add it to last
			
			var X=this.cells[this.cells.length-1].x;
			var Y=this.cells[this.cells.length-1].y;

			//if snake has eaten , increase len, generate new foodpos
			if (X==foodpos.x && Y==foodpos.y)
			{
				foodpos=food();	
				score++;
			}
			else
				this.cells.shift();	

			//Move acc to dirn
			if (this.direction=='right')
				this.cells.push({x:X+1,y:Y});
			else if (this.direction=='left')
				this.cells.push({x:X-1,y:Y});
			else if (this.direction=='down')
				this.cells.push({x:X,y:Y+1});
			else
				this.cells.push({x:X,y:Y-1});

			//no going out
			if (this.cells[this.cells.length-1].x<0 || this.cells[this.cells.length-1].y<0 
				|| this.cells[this.cells.length-1].x*cell_size>W 
				|| this.cells[this.cells.length-1].y*cell_size>H)
				gameOver=true;
		},

	};

	snake.create_snake();

	function change_direction(e)
	{
		if (e.key=='ArrowRight')
			snake.direction="right";
		else if (e.key=='ArrowLeft')
			snake.direction="left";
		else if (e.key=='ArrowDown')
			snake.direction="down";
		else
			snake.direction="up";
	}
	
	document.addEventListener('keydown',change_direction);

}

function draw()
{
	//erase old frame
	pen.clearRect(0,0,W,H);
	snake.draw_snake();
	pen.fillStyle=foodpos.color;
	pen.drawImage(food_img,foodpos.x*cell_size,foodpos.y*cell_size,cell_size,cell_size);

	pen.drawImage(score_img,18,20,cell_size,cell_size);
	pen.fillStyle='blue';
	pen.font='25px Roboto';
	pen.fillText(score,45,50);
}

function update()
{
	snake.update_snake();
}

function food()
{
	var foodX=Math.round(Math.random()*(W-cell_size)/cell_size);
	var foodY=Math.round(Math.random()*(H-cell_size)/cell_size);
	// div so that location is in multiples of cellsize 
	var randomNum = Math.floor(Math.random() * myfood.length);
    
	//images
	food_img=new Image();
	food_img.src=myfood[randomNum];

	var foodobj={
		x:foodX,
		y:foodY,
		color:'red',
	}
	return foodobj;
}

function game_loop()
{
	if (gameOver==true)
	{
		clearInterval(f);
		alert('Game Over');
	}
	draw();
	update();
}

init();
var f= setInterval(game_loop,100);