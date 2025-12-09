
let hambre = 0;
let felicidad = 10;


function pasoDelTiempo() {
    
    if (hambre < 10) {
        hambre = hambre + 1;
    }

    
    if (felicidad > 0) {
        felicidad = felicidad - 1;
    }

    
    console.log(`Tic-Tac Gozea: ${hambre}, Poztazuna: ${felicidad}`);
}


const reloj = setInterval(pasoDelTiempo, 500);

// --- BISTA ---
function vista() {
    // 1. HTMLa sortzen dugu
    document.getElementById("app").innerHTML = `
        <div class="pet-screen">
            <h1>PIXEL PET</h1>
            
            <div class="pet-face">
                👾 
            </div>

            <div class="stats">
                <div>🍗 Gosea: ${"🍗", (hambre)}</div>
                <div>❤️ Zoriontasuna: ${"❤️", (felicidad)}</div>
            </div>

            <div class="controls">
                <button class="boton" id="btn-comer">Jana eman</button>
                <button class="boton" id="btn-jugar">Jolastu</button>
            </div>
        </div>
    `



    
    document.getElementById("btn-comer").onclick = () => {
        if (hambre > 0) {
            hambre--
        }
        vista()
    }

    document.getElementById("btn-jugar").onclick = () => {
        if (felicidad < 10) 
            felicidad++
     
        vista()
    }
}
vista()