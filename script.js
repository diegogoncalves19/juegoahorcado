// Variables del juego
const palabras = ["sistemas", "html", "javascript", "informacion"];
let palabra = obtenerPalabraAleatoria(palabras);
let tamaño = palabra.length;
let intento = false;
let letrasIntentadas = [];
let intentos = 6;
let puntaje = 0;
let turnos = 0;
let palabraOculta = generarPalabraOculta(palabra);
let juegoTerminado = false;
let jugadores = [];

// Elementos del DOM
const inputMensaje = document.getElementById("input-mensaje");
const insertarBtn = document.getElementById("insertar");
const hangmanImage = document.getElementById("hangman-image");
const hiddenWordElement = document.getElementById("hidden-word");
const letrasUtilizadasElement = document.getElementById("letras-utilizadas");
const turnosElement = document.getElementById("turnos");
const puntajeElement = document.getElementById("puntaje");
const gameResultMessageElement = document.getElementById("game-result-message");
const gameResultElement = document.getElementById("game-result");
const reiniciarBtn = document.getElementById("reiniciar");
const errorMessageElement = document.getElementById("error-message");

insertarBtn.addEventListener("click", jugar);
reiniciarBtn.addEventListener("click", reiniciarJuego);

actualizarEstadoJuego();

// Funciones del juego:

  /**
    * Función para jugar. Se ejecuta al hacer clic en el botón "insertar".
  */
function jugar() {
  if (juegoTerminado) {
    return;
  }
  
  errorMessageElement.classList.add("hidden");
    const intentoPalabra = inputMensaje.value.toLowerCase();
    const tamañoIntentoPalabra = intentoPalabra.length;
    const incluye = palabra.includes(intentoPalabra);
  
    if (tamañoIntentoPalabra === 1) {
      if (letrasIntentadas.includes(intentoPalabra)) {
        console.log("Ya adivinaste esta letra.");
      } else if (!incluye) {
        console.log(intentoPalabra + " no está en la palabra.");
        intentos--;
        letrasIntentadas.push(intentoPalabra);
        actualizarEstadoJuego();
      } else {
        console.log(intentoPalabra + " está en la palabra.");
        letrasIntentadas.push(intentoPalabra);
        let letrascorrectas = 0;
  
        for (let i = 0; i < palabra.length; i++) {
          if (letrasIntentadas.includes(palabra.charAt(i))) {
            console.log(palabra.charAt(i));
            letrascorrectas++;
          } else {
            console.log("_");
          }
        }
  
        if (letrascorrectas === tamaño) {
          intento = true;
          calcularPuntaje();
          mostrarVictoria();
        } else {
          actualizarEstadoJuego();
          actualizarPalabraOculta();
        }
      }
    } else {
      gameResultMessageElement.textContent = "";
      errorMessageElement.textContent = "Por favor, ingresa solo una letra.";
      errorMessageElement.classList.remove("hidden");
      inputMensaje.value = "";
      inputMensaje.focus();
      return;
      
    }
  
    inputMensaje.value = "";
    inputMensaje.focus();
  }
  
  /**
     * Genera la palabra oculta reemplazando las letras con guiones bajos.
     * @param {string palabra}- La palabra a ocultar.
     * @returns {string} La palabra oculta.
   */
function generarPalabraOculta(palabra) {
    return "_".repeat(palabra.length);
  }

  /**
   * Actualiza la palabra oculta
   */
  function actualizarPalabraOculta() {
    let nuevaPalabraOculta = "";
  
    for (let i = 0; i < palabra.length; i++) {
      if (letrasIntentadas.includes(palabra.charAt(i))) {
        nuevaPalabraOculta += palabra.charAt(i);
      } else {
        nuevaPalabraOculta += "_";
      }
    }
  
    palabraOculta = nuevaPalabraOculta;
    hiddenWordElement.textContent = palabraOculta;
  }

  /**
   * Actualiza el estado del juego en el elemento del DOM.
   */
  function actualizarEstadoJuego() {
    turnos++;

    letrasUtilizadasElement.textContent = letrasIntentadas.join(", ");
    turnosElement.textContent = turnos;

    if (intentos === 0) {
      mostrarDerrota();
    } else {
      mostrarImagenAhorcado(intentos);
    }
  }
  
  /**
   * Muestra la imagen del ahorcado correspondiente al número de intentos restantes.
   * @param {int intentosRestantes} - El número de intentos restantes.
   */
  function mostrarImagenAhorcado(intentosRestantes) {
    const imagenPath = "img/hangman_" + (6 - intentosRestantes) + ".png";
    hangmanImage.src = imagenPath;
  }
  
  /**
   * Calcula el puntaje del jugador.
   */
  function calcularPuntaje() {
    if (intento) {
      puntaje = Math.round((tamaño / turnos) * 100);
    } else {
      puntaje -= 20;
    }
    puntajeElement.textContent = puntaje;
  }
  
  /**
   * Muestra el mensaje de victoria y finaliza el juego.
   */
  function mostrarVictoria() {
    juegoTerminado = true;
    actualizarPalabraOculta();
    gameResultMessageElement.textContent = "¡Felicidades! Adivinaste la palabra";
    gameResultElement.classList.remove("hidden");
    calcularPuntaje();
    const nombreJugador = document.getElementById("nombre-jugador").value;
    agregarJugador(nombreJugador, puntaje, 1);
    incrementarVictorias(nombreJugador);
    mostrarTablaPuntajes();
  }
  
  /**
   * Muestra el mensaje de derrota y finaliza el juego.
   */
  function mostrarDerrota() {
    juegoTerminado = true;
    mostrarImagenAhorcado(0);
    gameResultMessageElement.textContent = "Perdón. La palabra era " + palabra + ".";
    gameResultElement.classList.remove("hidden");
    calcularPuntaje();
    agregarJugador(nombreJugador, puntaje, intento ? 1 : 0);
    agregarJugador(nombreJugador, puntaje, 0);
    mostrarTablaPuntajes();
  }
  
  /**
   * Reinicia el juego y restablece todas las variables.
   */
  function reiniciarJuego() {
    juegoTerminado = false;
    palabra = obtenerPalabraAleatoria(palabras);
    tamaño = palabra.length;
    palabraOculta = generarPalabraOculta(palabra);
    intento = false;
    letrasIntentadas = [];
    intentos = 6;
    puntaje = 0;
    turnos = 0;
    hangmanImage.src = "img/hangman_0.png";
    gameResultElement.classList.add("hidden");
    actualizarEstadoJuego();
    actualizarPalabraOculta();
    inputMensaje.value = "";
    inputMensaje.focus();
  }
  
  /**
   * Obtiene una palabra aleatoria del array de palabras.
   * @param {string[] array}  - El array de palabras.
   * @returns {string} Una palabra aleatoria del array.
   */
  function obtenerPalabraAleatoria(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
  }


  /**
   * Agrega un jugador al array de jugadores o actualiza su puntaje y victorias si ya existe.
   * @param {string} nombre - El nombre del jugador. Si es null, se asignará un nombre genérico automáticamente.
   * @param {number} puntaje - El puntaje del jugador.
   * @param {number} victorias - El número de victorias del jugador.
   */
  function agregarJugador(nombre, puntaje, victorias) {
    const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
  
    
    if (!nombre) {
      nombre = "jugador" + (jugadores.length + 1);
    }

    if (jugadorExistente) {
      jugadorExistente.puntaje += puntaje;
      jugadorExistente.victorias += victorias;
    } else {
      jugadores.push({ nombre, puntaje, victorias });
    }
  
    actualizarTablaPuntajes();
  }

  /**
   * Si el jugador se encuentra en la tabla se aumenta el número de victorias
   */
  function incrementarVictorias(nombre) {
    const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
  
    if (jugadorExistente) {
      jugadorExistente.victorias += 1;
    }
  }

  /**
   * Actualiza la tabla de puntajes en el DOM.
   */
  function actualizarTablaPuntajes() {
    const tbody = document.querySelector("#score-table tbody");
  
    jugadores.sort((a, b) => b.puntaje - a.puntaje);
    tbody.innerHTML = "";

    jugadores.forEach((jugador, indice) => {
      const fila = document.createElement("tr");
  
      const columnaNombre = document.createElement("td");
      columnaNombre.textContent = jugador.nombre;
      fila.appendChild(columnaNombre);
  
      const columnaPuntaje = document.createElement("td");
      columnaPuntaje.textContent = jugador.puntaje;
      fila.appendChild(columnaPuntaje);
  
      const columnaVictorias = document.createElement("td");
      columnaVictorias.textContent = jugador.victorias;
      fila.appendChild(columnaVictorias);
  
      tbody.appendChild(fila);
    });
  }
