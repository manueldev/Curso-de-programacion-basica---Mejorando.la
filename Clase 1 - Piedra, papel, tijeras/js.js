window.onload = function() {
	setOnclickOpciones();
}

opciones = ["Papel", "Tijeras", "Piedra"];

function setOnclickOpciones(){
	document.getElementById('tuJugada').onclick = function(event) {
	    if (event.target.className !== "") {
	    	jugada(event.target.className);	
	    }
	};
	document.getElementById("tuJugada").className = "";
	document.getElementsByClassName("eleccionSheldon")[0].style.bottom = "0px";
	document.getElementsByClassName("eleccionSheldon")[0].style.opacity = "0";

	document.getElementsByClassName("resultado")[0].style.zIndex = "-1";
	document.getElementsByClassName("resultado")[0].style.top = "72px";
	document.getElementsByClassName("resultado")[0].style.opacity = "0";		

}

function jugada(eleccionUsuario){
	eleccionSheldon = generarEleccion(2, 0);
	document.getElementsByClassName("eleccionSheldon")[0].innerHTML = opciones[eleccionSheldon];
	document.getElementsByClassName("eleccionSheldon")[0].style.bottom = "25px";
	document.getElementsByClassName("eleccionSheldon")[0].style.opacity = "1";

	ganador = definirGanador(eleccionUsuario, eleccionSheldon);
	
	console.log("Elegiste: " + opciones[eleccionUsuario] + ", Sheldon eligió: " + opciones[eleccionSheldon]);

	if(ganador == 0){
		empate();
	}else if(ganador == 1){
		ganaUsuario(eleccionUsuario);
	}else{
		ganaSheldon(eleccionSheldon);
	}
}

function actualizarMarcador(classCambio){
	document.getElementsByClassName(classCambio)[0].getElementsByClassName("valor")[0].innerHTML = parseInt(document.getElementsByClassName(classCambio)[0].getElementsByClassName("valor")[0].innerHTML) + 1;
	actualizarMeter();
}

function actualizarMeter(){
	victorias = parseInt(document.getElementsByClassName("victorias")[0].getElementsByClassName("valor")[0].innerHTML);
	empates = parseInt(document.getElementsByClassName("empates")[0].getElementsByClassName("valor")[0].innerHTML);
	derrotas = parseInt(document.getElementsByClassName("derrotas")[0].getElementsByClassName("valor")[0].innerHTML);
	porcentaje = (victorias * 100) / (victorias + empates + derrotas);
	console.log(porcentaje);
	document.getElementsByClassName("resultadometer")[0].getElementsByClassName("indice")[0].style.width = porcentaje + "%";
}

function empate(){
	console.log("Empate.");
	actualizarMarcador("empates");
	document.getElementById("tuJugada").className = "disabled";	
	document.getElementsByClassName("caraSheldon")[0].getElementsByClassName("empatado")[0].style.opacity = "1";
	document.getElementById("tuJugada").onclick = null;
	
	document.getElementsByClassName("resultado")[0].style.zIndex = "10";	
	document.getElementsByClassName("resultado")[0].style.top = "42px";
	document.getElementsByClassName("resultado")[0].style.opacity = "1";

	document.getElementsByClassName("resultado")[0].getElementsByClassName("res_mensaje")[0].innerHTML = "Empate :|";


	setTimeout(function(){
		document.getElementsByClassName("caraSheldon")[0].getElementsByClassName("empatado")[0].style.opacity = "0";
		setOnclickOpciones();
	},1800);
}

function ganaUsuario(eleccion){
	console.log("Ganaste.");
	actualizarMarcador("victorias");	
	document.getElementById("tuJugada").className = "disabled";
	document.getElementsByClassName("caraSheldon")[0].getElementsByClassName("triste")[0].style.opacity = "1";
	document.getElementById("tuJugada").onclick = null;
	
	document.getElementsByClassName("resultado")[0].style.zIndex = "10";	
	document.getElementsByClassName("resultado")[0].style.top = "42px";
	document.getElementsByClassName("resultado")[0].style.opacity = "1";
	document.getElementsByClassName("resultado")[0].getElementsByClassName("res_mensaje")[0].innerHTML = "Ganaste :D";


	setTimeout(function(){
		document.getElementsByClassName("caraSheldon")[0].getElementsByClassName("triste")[0].style.opacity = "0";
		setOnclickOpciones();
	},2500);
}

function ganaSheldon(eleccion){
	console.log("Sheldon te ha ganado.");
	actualizarMarcador("derrotas");	
	document.getElementById("tuJugada").className = "disabled";
	document.getElementsByClassName("caraSheldon")[0].getElementsByClassName("feliz")[0].style.opacity = "1";
	document.getElementById("tuJugada").onclick = null;
	
	document.getElementsByClassName("resultado")[0].style.zIndex = "10";	
	document.getElementsByClassName("resultado")[0].style.top = "42px";
	document.getElementsByClassName("resultado")[0].style.opacity = "1";
	document.getElementsByClassName("resultado")[0].getElementsByClassName("res_mensaje")[0].innerHTML = "Ganó Sheldon :(";

	setTimeout(function(){
		document.getElementsByClassName("caraSheldon")[0].getElementsByClassName("feliz")[0].style.opacity = "0";
		setOnclickOpciones();
	},2000);
}

/*
 * Funcion que define el ganador de piedra, papel, tijeras.
 * Recibe como parametro la eleccion del jugador 1 y el jugador 2.
 * El valor de la eleccion puede ser 0 para papel, 1 para tijeras y 2 para piedra.
 *
 * Devuelve:
 * 0 = Empate, 
 * 1 = Ganador jugador 1
 * 2 = Ganador jugador 2
 */
function definirGanador(eleccionUsuario, eleccionSheldon){
	if (eleccionUsuario == eleccionSheldon){
		return 0;
	} else {
		if (eleccionUsuario - eleccionSheldon == 1 || eleccionUsuario - eleccionSheldon == -1){
			if (eleccionUsuario > eleccionSheldon) {
				return 1;
			} else {
				return 2;
			}
		} else {
			if (eleccionUsuario == 0) {
				return 1;
			} else {
				return 2;
			}
		}
	}
}

function generarEleccion(max, min){
	return Math.floor(Math.random()*(max-min+1)+min);
}