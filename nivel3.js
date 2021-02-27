var nave;
var balas;
var tiempoEntreBalas=600;
var tiempo=0;
var malos;
var timer;
var timer2;
var timer3;
var puntos;
var txtPuntos;
var vidas;
var txtVidas;
var laserSound;
var fondo;
var bgm;
var explosion;
var impacto;
var hitPlayer;
var malosNivel2;
var malosNivel3;
var passLevel;
var flipflop;
var count=0;
var weapon2;
var weapon;
var Nivel3 ={
	
preload: function () {
		//sprites
		juego.load.image('nave','img/tourist.png');
		juego.load.image('chopstick','img/chopsticks.png');
		juego.load.image('malo','img/sushi1.png');
		juego.load.image('bg','img/sushiBackgroundNivel3.jpg');
		juego.load.image('sushiNivel2','img/sushiNivel2.png');
		juego.load.image('sushiNivel3','img/sushiNivel3.png');
		juego.load.image('salmonEgg','img/salmonEgg.png');
		//audio
		juego.load.audio('laserSound','sounds/woosh.wav');
		juego.load.audio('bgm','sounds/cafeST3.wav');
		juego.load.audio('explosion','sounds/eating.wav');
		juego.load.audio('hitPlayer','sounds/hitPlayer.wav');
		juego.load.audio('impacto','sounds/impacto.ogg');
	},

	init: function(){
		vidas++;
		flipflop=false;
		count=0;
		
	},


	create: function(){
		fondo= juego.add.tileSprite(0,0,960,1440,'bg');
		fondo.scale.set(0.7291, 0.5833);
		fondo.alpha=0.75;
		juego.physics.startSystem(Phaser.Physics.ARCADE);

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
		impacto= juego.add.audio('impacto');
		bgm.play();

		
		

		teclaDerecha= juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		teclaIzquierda= juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		teclaArriba= juego.input.keyboard.addKey(Phaser.Keyboard.UP);
		teclaAbajo= juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		passLevel = juego.input.keyboard.addKey(Phaser.Keyboard.L);

	

		weapon = juego.add.weapon(120, 'salmonEgg');
		weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    	weapon.bulletSpeed = 200;
    	weapon.fireRate = 0;

		weapon2 = juego.add.weapon(50, 'chopstick');
		weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    	weapon2.bulletSpeed = 400;
    	weapon2.fireRate = 100;
     	weapon2.trackSprite(nave,0,0);
     	weapon2.bulletAngleOffset=90;

		malos=juego.add.group();
  		malos.enableBody=true;
  		malos.physicsBodyType=Phaser.Physics.ARCADE;

  		malosNivel2=juego.add.group();
  		malosNivel2.enableBody=true;
  		malosNivel2.physicsBodyType=Phaser.Physics.ARCADE;

  		malosNivel3=juego.add.group();
  		malosNivel3.enableBody=true;
  		malosNivel3.physicsBodyType=Phaser.Physics.ARCADE;
  		

  		tempEggs=juego.add.group();
  		tempEggs.enableBody=true;
  		tempEggs.physicsBodyType=Phaser.Physics.ARCADE;

  		//malos nivel 1
  		malos.x=50;
  		malos.y=30;
	  	for (var y =0; y<3; y++) {
	  	for (var x = 0;x<10; x++) {
	  			var enemigo = malos.create(x*60, y*40,'malo');
	  			enemigo.health=6;
	  			enemigo.anchor.setTo(0.5);
	  			enemigo.scale.set(1.5);
	  		}
	  	}
	  	var animacion1 = juego.add.tween(malos).to({x:100},1000,Phaser.Easing.Linear.None,true,0,1000,true);
	  	//malos nivel 2
	  	malosNivel2.x=30;
	  	malosNivel2.y=150;
	  	for (var y =0; y<2; y++) {
	  	for (var x = 0;x<10; x++) {
	  			var enemigo = malosNivel2.create(x*60, y*40,'sushiNivel2');
	  			enemigo.anchor.setTo(0.5);
	  			enemigo.scale.set(1.5);
	  			enemigo.health=10;
	  		}
	  	}
  	 	var animacion2 = juego.add.tween(malosNivel2).to({x:100},1000,Phaser.Easing.Linear.None,true,0,1000,true);

		juego.add.text(20,5, "Puntos : ",{font:"16px Revalia",fill: "#7FFF00",stroke:"black",strokeThickness:2});
		txtPuntos=juego.add.text(80,5, "", {font:"16px Revalia",fill: "#7FFF00",stroke:"black",strokeThickness:2});
		txtPuntos.text=puntos;
		
		juego.add.text(610, 5, "Vidas: ", {font:"16px Revalia",fill: "#7FFF00",stroke:"black",strokeThickness:2});
		txtVidas=juego.add.text(660,5, "", {font:"16px Revalia",fill: "#7FFF00",stroke:"black",strokeThickness:2});	
		txtVidas.text=vidas;



// timer

    timer= juego.time.create(false);
    timer.loop(1000, this.moverEnemigo, this);
    timer.start();
    //timer salmon

    timer2= juego.time.create(false);
    timer2.loop(5000,this.salmonSpawn ,this);
    timer2.start();

	},
	update: function(){
		fondo.tilePosition.y+=1;

		nave.rotation = juego.physics.arcade.angleToPointer(nave) + Math.PI/2;
		if(juego.input.activePointer.isDown)
		{
			
			weapon2.fireAtPointer();

		}
		//colissiones
		juego.physics.arcade.overlap(weapon2.bullets,malos,this.colision,null,this);
		juego.physics.arcade.overlap(nave,malos,this.colisionNave,null,this);
		juego.physics.arcade.overlap(weapon2.bullets,malosNivel2,this.colisionLvl2,null,this);
		juego.physics.arcade.overlap(nave,malosNivel2,this.colisionNave,null,this);
		juego.physics.arcade.overlap(weapon2.bullets,malosNivel3,this.colisionLvl3,null,this);
		juego.physics.arcade.overlap(nave,malosNivel3,this.colisionNave,null,this);
		juego.physics.arcade.overlap(nave,weapon.bullets,this.colisionNave,null,this);

	
		//Movimiento de la nave
		if(teclaDerecha.isDown){
			
			nave.position.x+=2;
			if(teclaArriba.isDown){
				nave.position.y-=2;
			}
			else if(teclaAbajo.isDown){
				nave.position.y+=2;
			}
		}
		else if (teclaIzquierda.isDown){
			
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
		
	//pasar al siguiente nivel
	if(passLevel.isDown){
		
			bgm.stop();
		this.nextLevel();

	}

	},
	salmonSpawn: function(){

		var salmon= malosNivel3.create(1+(count*60), 1,'sushiNivel3');
	  	salmon.anchor.setTo(0.5);
	  	salmon.scale.set(1.2);
	  	salmon.health=5;
	  	
	  	salmon.checkWorldBounds = true;
		salmon.outOfBoundsKill= true;
		salmon.body.collideWorldBounds = true;
		salmon.body.bounce.set(1);
	  	juego.physics.arcade.moveToXY(salmon,1+(count*60), 50,70);
	  	count+=1;
	  	
	  	if(count>10)timer2.stop();

	},
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

	
	colision : function(b, m){
		b.kill();
		m.health-=1;
		
		if(m.health==0)
		{
		explosion.play();
		m.kill();
		puntos+=1;
		txtPuntos.text = puntos;
		 this.contarEnemigos();
	    }
	  
	},
	colisionLvl2 : function(b, m){
		b.kill();
		m.health-=1;
		
		if(m.health==0)
		{
		explosion.play();
		m.kill();
		puntos+=2;
		this.contarEnemigos();
	    } 		
	},
	colisionLvl3 : function(b, m){
		m.angle+=5;
		weapon.trackSprite(m,0,0);
		for(var i=0;i<20;i++){
			
			weapon.fireAngle=360*(i/20) +(m.health*5);
			weapon.fire();
		}
		b.kill();
		m.health-=1;
		
		if(m.health==0)
		{
		explosion.play();
		m.kill();
		puntos+=5;
		this.contarEnemigos();
	    } 		
	},
	contarEnemigos : function(){
		  if(malos.countLiving()==0 && malosNivel2.countLiving()==0 && malosNivel3.countLiving()==0)
		{
			bgm.stop();
			this.nextLevel();
		}
	},
	nextLevel :function (){
		juego.state.start('Nivel4',true,false,++vidas,puntos);
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