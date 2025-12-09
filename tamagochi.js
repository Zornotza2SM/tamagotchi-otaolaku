// --- VARIABLES DE ESTADO ---
let hambre = 0;      
let felicidad = 10;  

// --- LOOP DEL TIEMPO ---
function pasoDelTiempo() {
    setTimeout(() => {
        if (hambre < 10 && felicidad > 0) {
            hambre++;
            felicidad--;
        }

        if (hambre > 10) hambre = 10;
        if (felicidad < 0) felicidad = 0;

        vista();
        pasoDelTiempo();

    }, 2000); 
}

pasoDelTiempo();

function reiniciarJuego() {
    hambre = 0;
    felicidad = 10;
    vista();
}

// --- VISTA (RENDER) ---
function vista() {
    
    // 1. Estados básicos
    let estaMuerto = (hambre >= 10 || felicidad <= 0);
    let cara = estaMuerto ? "💀" : "👾";
    let mensaje = estaMuerto ? "<div class='game-over'>GAME OVER</div>" : "";
    
    let estiloControles = estaMuerto ? "display: none;" : "display: block;";
    let estiloReset = estaMuerto ? "display: block;" : "display: none;";

    // 2. LÓGICA DE ANIMACIONES LOTTIE (NUEVO)
    // Si felicidad es menor que 4, usamos la animación de corazón roto.
    // Si no, usamos la del corazón latiendo.
    let urlCorazon = felicidad < 4 
        ? "https://assets9.lottiefiles.com/private_files/lf30_434185.json" // Roto
        : "https://assets10.lottiefiles.com/packages/lf20_7z8wtyb0.json"; // Latiendo

    // 3. Generar HTML
    document.getElementById("app").innerHTML = `
        <div class="pet-screen">
            <h1>PIXEL PET</h1>
            
            <div class="pet-face">
                ${cara}
            </div>

            ${mensaje}

            <div class="stats">
                <div style="display:flex; align-items:center; flex-direction:column">
                    <lottie-player 
                        src="Happy Unicorn Dog.json" 
                        background="transparent" 
                        speed="1" 
                        style="width: 50px; height: 50px;" 
                        loop 
                        autoplay>
                    </lottie-player>
                    <span>Hambre: ${hambre}</span>
                </div>

                <div style="display:flex; align-items:center; flex-direction:column">
                    <lottie-player 
                        src="${urlCorazon}" 
                        background="transparent" 
                        speed="1" 
                        style="width: 50px; height: 50px;" 
                        loop 
                        autoplay>
                    </lottie-player>
                    <span>Felicidad: ${felicidad}</span>
                </div>
            </div>

            <div class="controls" style="${estiloControles}">
                <button class="boton" id="btn-comer">🍔 Comer</button>
                <button class="boton" id="btn-jugar">⚽ Jugar</button>
            </div>

            <div style="${estiloReset}">
                <button class="boton boton-reset" id="btn-reset">🔄 Reiniciar</button>
            </div>
        </div>
    `;

    // 4. Eventos
    if (!estaMuerto) {
        document.getElementById("btn-comer").onclick = () => {
            if (hambre > 0) { hambre--; vista(); }
        };
        document.getElementById("btn-jugar").onclick = () => {
            if (felicidad < 10) { felicidad++; vista(); }
        };
    } else {
        document.getElementById("btn-reset").onclick = () => {
            reiniciarJuego();
        };
    }
}

vista();