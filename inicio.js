var teclaEnter;
var fondo;
var text = null;
var grd;
var Inicio ={
	preload: function () {
		juego.load.image('bg','img/japanBg.jpg');
		juego.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

  
	},

	create: function(){
		fondo= juego.add.tileSprite(0,0,960,1440,'bg');
		fondo.scale.set(0.7291, 0.5833);

		teclaEnter= juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		text = juego.add.text(juego.world.centerX, 300, "Japan's Sushi Trip");
    text.anchor.setTo(0.5);

    text.font = 'Revalia';
    text.fontSize = 70;
    grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    text.fill = grd;

    text.align = 'center';
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

		// juego.add.text(90, 150, "Japan's Trip", {font:"40px Revalia",fill: "0FB7F1"});
		juego.add.text(170, 450, "PRESIONA ENTER", {font:"40px Revalia",fill: "#EC2E08"});


	},

	update : function(){
		if(teclaEnter.isDown)
		{	
			juego.state.start('Nivel1');
		}

	}

};