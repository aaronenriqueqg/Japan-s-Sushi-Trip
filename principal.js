window.PhaserGlobal={
	disableWebAudio : true
}

var juego = new Phaser.Game(700, 840, Phaser.CANVAS, 'bloque_juego');

//Agregando los estados del juego

juego.state.add('Nivel1', Nivel1);
juego.state.add('Nivel2', Nivel2);
juego.state.add('Nivel3', Nivel3);
juego.state.add('Nivel4', Nivel4);
juego.state.add('Terminado',Terminado);
juego.state.add('Inicio',Inicio);

//Inicializamos juego en el estado Juego
juego.state.start('Inicio');