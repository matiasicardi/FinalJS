window.addEventListener("load", iniciaJuego)

let tabla = document.getElementById("tabla")
let piedra = document.getElementById("piedra")
let papel = document.getElementById("papel")
let tijera = document.getElementById("tijera")
let botonEleccionJugador = document.getElementById("eleccion-jugador")
let cerrar = document.getElementById("cerrar")
let caja = document.getElementById("caja")
let marcador = document.getElementById("marcador")
let jugador = ""
let pc = ""
let victorias = []
let empates = []
let derrotas = []
let derrotasJSON = ""
let victoriasJSON = ""
let empatesJSON = ""

piedra.addEventListener("click", eleccionJugador)
papel.addEventListener("click", eleccionJugador)
tijera.addEventListener("click", eleccionJugador)
cerrar.addEventListener("click", esconder)
marcador.addEventListener("click", mostrar)


function iniciaJuego() {
    let botonEleccionJugador = document.getElementById("eleccion-jugador")
    // botonEleccionJugador.addEventListener("click", eleccionJugador)

}

function eleccionJugador(e) {

    if (e.target.value == 1) {
        Swal.fire({
            title: "Elegiste `La buena Piedra` 🥌",
            width:600,
            height: 400,
            showConfirmButton: false,
            timer: 1000
        })
    } else if (e.target.value == 2) {
        Swal.fire({
            title: "Elegiste Papel 🧻",
            width:600,
            height: 400,
            showConfirmButton: false,
            timer: 1000
        })
    } else if (e.target.value == 3) {
        Swal.fire({
            title: "Elegiste Tijera ✂",
            width:600,
            height: 400,
            showConfirmButton: false,
            timer: 1000
        })
    } else {
        Swal.fire("Recuerda seleccionar una opción")
    }
    setTimeout(eleccionPc, 1500)

    jugador = e.target.value
}

function eleccionPc() {
    let aleatorioPc = aleatorio(1, 3)
    if (aleatorioPc == 1) {

        Swal.fire({
            title: "PC seleccionó Piedra 🥌",
            width:600,
            height: 400,
            showConfirmButton: false,
            timer: 1500
        })
    } else if (aleatorioPc == 2) {

        Swal.fire({
            title: "PC seleccionó Papel 🧻",
            width:600,
            height: 400,
            showConfirmButton: false,
            timer: 1500
        })
    } else {

        Swal.fire({
            title: "PC seleccionó Tijera ✂",
            width:600,
            height: 400,
            showConfirmButton: false,
            timer: 1500
        })
    }

    setTimeout(batalla, 2000)
    pc = aleatorioPc

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + 1)
}

function batalla() {

    if (jugador == pc) {
        if (empatesJSON[0] != 0) {
            empates++
            empatesJSON = JSON.stringify(empates)
            localStorage.setItem("Empates", empatesJSON)
        } else {
            empates.push(1)
            empatesJSON = JSON.stringify(empates)
            localStorage.setItem("Empates", empatesJSON)

        }
        Swal.fire({
            title: "Empate, juega de nuevo",
            icon: 'info',
            
            showConfirmButton: false,
            timer: 1500
        })

    } else if ((jugador == 1 && pc == 3) || (jugador == 2 && pc == 1) || (jugador == 3 && pc == 2)) {

        if (victoriasJSON[0] != 0) {
            victorias++
            victoriasJSON = JSON.stringify(victorias)
            localStorage.setItem("Victorias", victoriasJSON)
        } else {
            victorias.push(1)
            victoriasJSON = JSON.stringify(victorias)
            localStorage.setItem("Victorias", victoriasJSON)

        }

        Swal.fire({
            title: "Ganaste, felicitaciones 👌",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        })

    } else {

        if (derrotasJSON[0] != 0) {
            derrotas++
            derrotasJSON = JSON.stringify(derrotas)
            localStorage.setItem("Derrotas", derrotasJSON)

        } else {
            derrotas.push(1)
            derrotasJSON = JSON.stringify(derrotas)
            localStorage.setItem("Derrotas", derrotasJSON)

        }
        Swal.fire({
            title: "Perdiste, mejor suerte la próxima",
            icon: 'warning',
            showConfirmButton: false,
            timer: 1500
        })
    }
    renderizarTabla(victorias, empates, derrotas)
}
comprobar()
function comprobar() {
    if (localStorage.getItem("Victorias") && localStorage.getItem("Empates") && localStorage.getItem("Derrotas")) {
        victorias = JSON.parse(localStorage.getItem("Victorias"))
        empates = JSON.parse(localStorage.getItem("Empates"))
        derrotas = JSON.parse(localStorage.getItem("Derrotas"))
        renderizarTabla(victorias, empates, derrotas)
    }
    else if (localStorage.getItem("Victorias") && localStorage.getItem("Empates")) {
        victorias = JSON.parse(localStorage.getItem("Victorias"))
        empates = JSON.parse(localStorage.getItem("Empates"))
        renderizarTabla(victorias, empates, 0)
    }
    else if (localStorage.getItem("Victorias") && localStorage.getItem("Derrotas")) {
        victorias = JSON.parse(localStorage.getItem("Victorias"))
        derrotas = JSON.parse(localStorage.getItem("Derrotas"))
        renderizarTabla(victorias, 0, derrotas)
    }
    else if (localStorage.getItem("Empates") && localStorage.getItem("Derrotas")) {
        empates = JSON.parse(localStorage.getItem("Empates"))
        derrotas = JSON.parse(localStorage.getItem("Derrotas"))
        renderizarTabla(0, empates, derrotas)
    }
    else if (localStorage.getItem("Victorias")) {
        victorias = JSON.parse(localStorage.getItem("Victorias"))
        empates = 0
        derrotas = 0
        renderizarTabla(victorias, empates, derrotas)
    }
    else if (localStorage.getItem("Empates")) {
        empates = JSON.parse(localStorage.getItem("Empates"))
        victorias = 0
        derrotas = 0
        renderizarTabla(victorias, empates, derrotas)
    }
    else if (localStorage.getItem("Derrotas")) {
        derrotas = JSON.parse(localStorage.getItem("Derrotas"))
        victorias = 0
        empates = 0
        renderizarTabla(victorias, empates, derrotas)
    }
    else {
        renderizarTablaVacia()
    }
}

function renderizarTabla(v, e, d) {
    tabla.innerHTML = ""
    let res = document.createElement("div")
    res.innerHTML = `
                <div class="tabla">
                <div style="flex:1"><p>${v}</p></div>
                <div style="flex:1"><p>${e}</p></div>
                <div style="flex:1"><p>${d}</p></div>
                </div>
                <button id="nuevo">Juego nuevo</button>
                `
    tabla.append(res)
    let nuevo = document.getElementById("nuevo")
    nuevo.addEventListener("click", borrar)
    comprobar()
}

function renderizarTablaVacia(v, e, d) {
    tabla.innerHTML = ""
    let res = document.createElement("div")

    res.innerHTML = `
                <div class="tabla">
                <div style="flex:1"><p>0</p></div>
                <div style="flex:1"><p>0</p></div>
                <div style="flex:1"><p>0</p></div>
                `
    tabla.append(res)
}

function mostrar() {
    caja.className = "caja"
}
function esconder() {
    caja.className = "esconder"
}
function borrar() {
    localStorage.removeItem("Victorias")
    localStorage.removeItem("Empates")
    localStorage.removeItem("Derrotas")
    Swal.fire({
        title: '<hr><strong>Gracias por la partida!</strong><br><br><br>',
        imageUrl: 'https://www.shutterstock.com/image-vector/monkeys-saying-see-hear-speak-260nw-1395334604.jpg',
        imageHeight: 100,
        imageAlt: 'logo',
        icon: "success",
        showConfirmButton: false,
        backdrop: `rgba(193, 188, 190, 0.65)`,
        timer: 2500,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })

    caja.className = "esconder"
    victorias = []
    empates = []
    derrotas = []
    renderizarTablaVacia(victorias, empates, derrotas)
}