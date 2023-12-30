// Varibles
const carrito = document.querySelector('#carrito'),
    contenedor = document.querySelector('#lista-carrito tbody'),
    vaciarCarrito = document.querySelector('#vaciar-carrito') ,
    listaCurso = document.querySelector('#lista-cursos');
let articulosCarrito = [];

registrar();

function registrar(){
    // Cuando agregas un curso presionando "Agregar Carrito"
    listaCurso.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);
    
    // Muestras los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito')) ?? [];
        // articulosCarrito = JSON.parse(  localStorage.getItem('carrito') ) || [];
        carritoHTML();
    });
    
    // Vaciar el carrito
    vaciarCarrito.addEventListener("click", () =>{
        // console.log("vaciar carrito");
        articulosCarrito = []; // reseteamos el carrito

        limpiarHTML(); // Eliminamos todo el HTML
    });
};
    
// Function
function agregarCurso(e){
    e.preventDefault()
    // console.log(e.target.classList);
    if(e.target.classList.contains('agregar-carrito')){
        // console.log('Agregar al carrito');

        const cursoSeleccionado = e.target.parentElement.parentElement; 
        leerDatosCurso(cursoSeleccionado);
        // console.log(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    // console.log('desde eliminar curso');
    // console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        // console.log(e.target.getAttribute('data-id'));
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    
        // console.log(articulosCarrito);    

        carritoHTML(); // Iterar sobre el carrito y mostrar el HTML
    }
};

// Lee el contenido del HTML, al que dimos click t extrae la informacion del curso
function leerDatosCurso(curso){
    // console.log(curso);

    // Crear un objeto con el contenido actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    // console.log(infoCurso);

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    // console.log(existe);

    if(existe){
        // Actualizamos la cantidad
        const curso = articulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // // retorna los objetos que no son duplicados
            }
        });

        articulosCarrito = [...curso];

    } else {
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    };

    // console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el Carrito de compras en el HTML
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();
    
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso =>{
        // console.log(curso)
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');       

        row.innerHTML =`
            <td>
                <img src="${imagen}" width="100" >
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a> 
            </td>
        `;

        // Agregar el HTML del carrito en el body
        contenedor.appendChild(row);
    });

    // Agregar el carrito de compras al storage
    sincronizarStorage();
};

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
};

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedor.innerHTML = '';

    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}