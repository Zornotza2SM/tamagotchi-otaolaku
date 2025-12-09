// --- VARIABLES DE ESTADO ---
let hambre = 0;      
let felicidad = 10;  

// [FASE 8] Variables de bloqueo (Cooldown)
let comiendo = false; // ¿Está ocupado comiendo?
let jugando = false;  // ¿Está ocupado jugando?

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
    }, 3000); 
}
pasoDelTiempo();

// --- REINICIAR ---
function reiniciarJuego() {
    hambre = 0;
    felicidad = 10;
    // Reseteamos también los bloqueos por si acaso
    comiendo = false;
    jugando = false;
    vista();
}

// --- VISTA ---
function vista() {
    
    // 1. Lógica de Muerte
    let estaMuerto = (hambre >= 10 || felicidad <= 0);
    let cara = estaMuerto ? "💀" : "👾"; 
    let mensaje = estaMuerto ? "<div class='game-over'>GAME OVER</div>" : "";
    
    // 2. Visibilidad
    let estiloControles = estaMuerto ? "display: none;" : "display: block;";
    let estiloReset = estaMuerto ? "display: block;" : "display: none;";

    // 3. Emojis (Versión Segura)
    let iconoCorazon = felicidad < 4 ? "💔" : "❤️";
    let iconoComida = "🍔";

    // 4. [FASE 8] Textos y Estados de los Botones
    // Si 'comiendo' es true, ponemos "Masticando...", si no "Comer"
    let textoComer = comiendo ? "Masticando..." : "🍔 Comer";
    // Si 'jugando' es true, ponemos "Cansado...", si no "Jugar"
    let textoJugar = jugando ? "Cansado..." : "⚽ Jugar";

    // Atributo disabled: Si es true, el botón se pone gris y no se puede pulsar
    let disabledComer = comiendo ? "disabled" : "";
    let disabledJugar = jugando ? "disabled" : "";


    // 5. Generar HTML
    document.getElementById("app").innerHTML = `
        <div class="pet-screen">
            <h1>PIXEL PET</h1>
            
            <div class="pet-face">${cara}</div>
            ${mensaje}

            <div class="stats">
                <div style="margin: 0 10px;">
                    <div style="font-size: 40px;">${iconoComida}</div>
                    <div>Hambre: ${hambre}</div>
                </div>
                <div style="margin: 0 10px;">
                    <div style="font-size: 40px;">${iconoCorazon}</div>
                    <div>Felicidad: ${felicidad}</div>
                </div>
            </div>

            <div class="controls" style="${estiloControles}">
                
                <button class="boton" id="btn-comer" ${disabledComer}>
                    ${textoComer}
                </button>

                <button class="boton" id="btn-jugar" ${disabledJugar}>
                    ${textoJugar}
                </button>

            </div>

            <div style="${estiloReset}">
                <button class="boton boton-reset" id="btn-reset">🔄 Reiniciar</button>
            </div>
        </div>
    `;

    // 6. EVENTOS (Aquí está la lógica del temporizador)
    if (!estaMuerto) {
        
        // ACCIÓN DE COMER
        document.getElementById("btn-comer").onclick = () => {
            // Solo come si tiene hambre y NO está ya comiendo
            if (hambre > 0 && !comiendo) {
                hambre--;
                
                // 1. Bloqueamos
                comiendo = true;
                vista(); // Actualizamos para que salga "Masticando..." y se ponga gris

                // 2. Esperamos 1 segundo (1000ms)
                setTimeout(() => {
                    comiendo = false; // Desbloqueamos
                    vista(); // Volvemos a pintar el botón amarillo
                }, 1000);
            }
        };

        // ACCIÓN DE JUGAR
        document.getElementById("btn-jugar").onclick = () => {
            // Solo juega si no está a tope y NO está cansado
            if (felicidad < 10 && !jugando) {
                felicidad++;
                
                // 1. Bloqueamos
                jugando = true;
                vista(); // Actualizamos para que salga "Cansado..."

                // 2. Esperamos 2 segundos (2000ms) -> Jugar cansa más
                setTimeout(() => {
                    jugando = false; // Desbloqueamos
                    vista();
                }, 2000);
            }
        };

    } else {
        document.getElementById("btn-reset").onclick = () => { reiniciarJuego(); };
    }
}

vista();