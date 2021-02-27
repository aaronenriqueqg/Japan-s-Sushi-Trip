var resetBoton;
var flipflop;
var bg;
var text;
var Terminado ={
	preload: function () {
		juego.load.image('endBg','img/endBg.jpg');
  
	},

	create: function(){
		bg= juego.add.tileSprite(0,0,736,721,'endBg');
		bg.scale.set(0.9575, 1.165);
		resetBoton= juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		text = juego.add.text(juego.world.centerX, 300, "GAME OVER");
   		text.anchor.setTo(0.5);

    	text.font = 'Revalia';
    	text.fontSize = 70;
    	grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    	grd.addColorStop(0, '#DC143C');   
    	grd.addColorStop(1, '#F0F8FF');
    	text.fill = grd;

    	text.align = 'center';
    	text.stroke = '#000000';
    	text.strokeThickness = 2;
    	text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    	juego.add.text(juego.world.centerX-150, 450, "PRESIONA ENTER \n PARA REINICIAR", {font:"40px Revalia",fill: "#EC2E08"});

		
	},
	update :function(){
		if(resetBoton.isDown){
			
			juego.state.start('Inicio',true,true);
			
		}
	}

};