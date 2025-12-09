
let hambre = 0;      
let felicidad = 10;  


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


function vista() {
    

    let estaMuerto = (hambre >= 10 || felicidad <= 0);
    let cara = estaMuerto ? "💀" : "👾";
    let mensaje = estaMuerto ? "<div class='game-over'>GAME OVER</div>" : "";
    
    
    let estiloControles = estaMuerto ? "display: none;" : "display: block;";
    let estiloReset = estaMuerto ? "display: block;" : "display: none;";

    
    document.getElementById("app").innerHTML = `
        <div class="pet-screen">
            <h1>PIXEL PET</h1>
            
            <div class="pet-face">
                ${cara}
            </div>

            ${mensaje}

            <div class="stats">
                <div>🍗 Hambre: ${hambre} / 10</div>
                <div>❤️ Felicidad: ${felicidad} / 10</div>
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