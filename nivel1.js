var nave;
var tiempo=0;
var malos;
var timer;
var puntos=0;
var txtPuntos;
var vidas;
var txtVidas;
var laserSound;
var fondo;
var bgm;
var explosion;
var hitPlayer;
var passLevel;
var flipflop=false;
var weapon;
var Nivel1={
	preload: function () {
		juego.load.image('nave','img/tourist.png');
		juego.load.image('chopstick','img/chopsticks.png');
		juego.load.image('malo','img/sushi1.png');
		juego.load.image('bg','img/sushiBackground.jpg');
		juego.load.audio('laserSound','sounds/woosh.wav');
		juego.load.audio('bgm','sounds/cafeST.wav');
		juego.load.audio('explosion','sounds/eating.wav');
		juego.load.audio('hitPlayer','sounds/hitPlayer.wav');
	},

	create: function(){
		fondo= juego.add.tileSprite(0,0,960,1440,'bg');
		fondo.scale.set(0.7291, 0.5833);
		fondo.alpha=0.75;
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		//stats
		puntos=0;
		
		vidas=3;

		nave = juego.add.sprite(juego.width/2, 785,'nave');
		nave.anchor.setTo(0.5);
		nave.scale.set(0.5);
		
		juego.physics.arcade.enable(nave, true);
		nave.checkWorldBounds = true;
		nave.body.collideWorldBounds = true;

		laserSound= juego.add.audio('laserSound');
		explosion= juego.add.audio('explosion');
		hitPlayer= juego.add.audio('hitPlayer');
		bgm = juego.add.audio('bgm');
		bgm.play();

		weapon= juego.add.weapon(40,'chopstick');
		weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    	weapon.bulletSpeed = 400;
    	weapon.fireRate = 150;
    	weapon.trackSprite(nave,0,0);
    	weapon.bulletAngleOffset=90;
    	
		
		

		teclaDerecha= juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		teclaIzquierda= juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		teclaArriba= juego.input.keyboard.addKey(Phaser.Keyboard.UP);
		teclaAbajo= juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		passLevel = juego.input.keyboard.addKey(Phaser.Keyboard.L);

		balas = juego.add.group();
		balas.enableBody = true;
		balas.setBodyType = Phaser.Physics.ARCADE;
		balas.createMultiple(50,'chopstick');
		balas.setAll('anchor.x',0.5);
		balas.setAll('anchor.y',0.5);
		balas.setAll('checkWorldBounds',true);
		balas.setAll('outOfBoundsKill',true);



		malos=juego.add.group();
  		malos.enableBody=true;
  		malos.physicsBodyType=Phaser.Physics.ARCADE;

  	for (var y =0; y<6; y++) {
  	for (var x = 0;x<10; x++) {
  			var enemigo = malos.create(x*60, y*40,'malo');
  			enemigo.health=4;
  			enemigo.anchor.setTo(0.5);
  			enemigo.scale.set(1.5);

  		}
  	}
  	malos.x=50;
  	malos.y=30;
  	 var animacion = juego.add.tween(malos).to({x:100},1000,Phaser.Easing.Linear.None,true,0,1000,true);
		vidas=3;

		juego.add.text(20,5, "Puntos : ",{font:"16px Revalia",fill: "#7FFF00",stroke:"black",strokeThickness:2});
		txtPuntos=juego.add.text(80,5, "", {font:"16px Revalia",fill: "#7FFF00",stroke:"black",strokeThickness:2});
		txtPuntos.text=puntos;
		
		juego.add.text(610, 5, "Vidas: ", {font:"16px Revalia",fill: "#7FFF00",stroke:"black",strokeThickness:2});
		txtVidas=juego.add.text(660,5, "", {font:"16px Revalia",fill: "#7FFF00",stroke:"black",strokeThickness:2});	
		txtVidas.text=vidas;


// timer

   	timer = juego.time.create(false);
    timer.loop(1000, this.moverEnemigo, this);
    timer.start();

	},
	update: function(){
		fondo.tilePosition.y+=1;

		nave.rotation = juego.physics.arcade.angleToPointer(nave) + Math.PI/2;
		
		if(juego.input.activePointer.isDown)
		{
			
			// this.disparar();
			weapon.fireAtPointer();

		}

		juego.physics.arcade.overlap(weapon.bullets,malos,this.colision,null,this);
		juego.physics.arcade.overlap(nave,malos,this.colisionNave,null,this);
		

		//Movimiento de la nave
		if(teclaDerecha.isDown){
			//flappy.x++;
			nave.position.x+=2;
			if(teclaArriba.isDown){
				nave.position.y-=2;
			}
			else if(teclaAbajo.isDown){
				nave.position.y+=2;
			}
		}
		else if (teclaIzquierda.isDown){
			//flappy.x--;
			nave.position.x-=2;
			if(teclaArriba.isDown){
				nave.position.y-=2;
			}
			else if(teclaAbajo.isDown){
				nave.position.y+=2;
			}
			
		}
		else if(teclaArriba.isDown){
			nave.position.y-=2;
			if(teclaIzquierda.isDown){
				nave.position.x-=2;
			}
			else if(teclaAbajo.isDown){
				nave.position.y+=2;
			}
			
			
		}
		else if(teclaAbajo.isDown){
			nave.position.y+=2;
			if(teclaIzquierda.isDown){
				nave.position.x-=2;
			}
			else if(teclaAbajo.isDown){
				nave.position.y+=2;
			}
		}
		
	//pass level
	if(passLevel.isDown){
			bgm.stop();
		this.nextLevel();
		
	}
	}
	,
	moverEnemigo: function(){
		var flyer = malos.iterate('angle',0,Phaser.Group.RETURN_CHILD);
		if(flyer !== null){
		flyer.angle+=1;
		juego.physics.arcade.moveToObject(flyer,nave,250);
		
		flyer.checkWorldBounds = true;
		flyer.outOfBoundsKill= true;
		flyer.body.collideWorldBounds = true;
		flyer.body.bounce.set(1);
	    }
    
  
    

	},
	nextLevel :function (){
		juego.state.start('Nivel2',true,false,);
	},
	
	colision : function(b, m){

		b.kill();
		m.health-=1;
		
		if(m.health==0)
		{
		explosion.play();
		m.kill();
		puntos+=1;
		txtPuntos.text = puntos;
	    }
	    if(malos.countLiving()==0)
		{
			bgm.stop();
			this.nextLevel();
		}

	},
	colisionNave : function(b, m){
		
		m.kill();
		hitPlayer.play();
		vidas--;
		txtVidas.text = vidas;
		if(vidas==0){
			bgm.stop();
			juego.state.start('Terminado');
		}
	}
};