let producto,precio;  //declaro variables

//--------------------------------LISTA-----------------------------//
       
let productos = []



//--------------------------------FUNCIONES-----------------------------//


function agregarProducto(producto,valor,img){
  img?productos.push({nombre:producto,precio:valor,imagen:img}):productos.push({nombre:producto,precio:valor,imagen:"./img/sinImagen.jpg"});  //agrega el producto al final del array
  localStorage.setItem("array",JSON.stringify(productos))
  Toastify({
    text: "Producto agregado!",
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}

function eliminarProducto(producto){
  let arrayDeNombres=productos.map(el=>el.nombre) //creo un array solo con los nombres, para buscarlo con indexOF
  let posicion=arrayDeNombres.indexOf(producto) //retorna -1 si no lo encuentra, por eso ponemos un IF a continuacion
  if(posicion>=0){
    productos.splice(posicion,1);
    Toastify({
      text: "Producto eliminado!",
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #ff3c38, #dc2f02)",
      },
    }).showToast();
  } else {
    eliminado.classList.remove("noVisible")
    setTimeout(() => {
      eliminado.classList.add("noVisible")
    }, 3000);
    
  }
  localStorage.setItem("array",JSON.stringify(productos))
}

function buscarProducto(producto){
  let resultado=productos.find(el=>el.nombre===producto)
  if(resultado){
  Swal.fire({
    title: `${resultado.nombre}`,
    text: `$${resultado.precio}`,
    imageUrl: `${resultado.imagen}`,
    imageWidth: 200,
    imageAlt: "Custom image"
  });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Producto no encontrado",
    });
  }

}



function ordenarPorPrecio(opcion){
  let menu;
  do {
    menu = opcion
    
      switch(menu){
        case 1:                              //ordena ascendente
          productos.sort((a,b)=>{    
            if(a.precio>b.precio){
              return 1
            }

            if(a.precio<b.precio){
              return -1
            }

            if(a.precio=b.precio){
              return 0
            }
          })
        break;
        case 2:                               //ordena descendente
          productos.sort((a,b)=>{           
            if(a.precio<b.precio){
              return 1
            }

            if(a.precio>b.precio){
              return -1
            }

            if(a.precio=b.precio){
              return 0
            }
          })
          
        break;
        case 3:
        break;
    }
    
  } while((menu<1||menu>3)||isNaN(menu));    //si la opcion es distinta a 1,2 o 3 se repite el do-while 
}

function filtrarPorPrecio(min,max){
  if(min==""||max==""){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe introducir un mínimo y un máximo",
    });
  } else{
  const filtro = productos.filter(el=>el.precio<max&&el.precio>min)
  imprimirProductos(filtro)
  }
}

function limpiarFiltros(){
  textMin.value="";
  textMax.value="";
  imprimirProductos(productos)
}

function imprimirProductos(array){   
  // Eliminamos todos los elementos hijos de la lista
  while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
  }
console.log(array);
  for(let i=0;i<array.length;i++){  
      const div = document.createElement("div");
      div.className=`card col-xl-3 col-md-6 col-sm-12 m-3`;
      div.style=`width: 18rem`
      div.innerHTML= `
      <img src="${array[i].imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text negrita">${array[i].nombre} </p>
        <p class="card-text">$${array[i].precio}</p>
      </div>
      `;
  
      lista.append(div);
  };

  
  
   //imprimo respuesta
}

function modificarProducto(producto){
  let imagen2;
  let resultado=productos.find(el=>el.nombre===producto)     //busca el producto en el array
  if(resultado==undefined){ 
    eliminado2.classList.remove("noVisible")
    setTimeout(() => {
      eliminado2.classList.add("noVisible")
    }, 3000);          
  } else {
  imagen2=imagenNueva.value||resultado.imagen;
  eliminarProducto(producto);
  agregarProducto(productoNuevo.value,parseInt(precioNuevo.value),imagen2);
  }
}



//Programa principal:


let lista = document.querySelector("#muestraProductos")
let text1 = document.querySelector("#producto")
let text2 = document.querySelector("#precio")
let text3 = document.querySelector("#imagen")
let btnAgregar=document.querySelector("#agregar")
let btnEliminar=document.querySelector("#eliminar")
let eliminado=document.querySelector("#eliminado")
let productoViejo = document.querySelector("#productoViejo")
let productoNuevo = document.querySelector("#producto2")
let precioNuevo = document.querySelector("#precio2")
let imagenNueva = document.querySelector("#imagen2")
let btnModificar=document.querySelector("#modificar")
let eliminado2=document.querySelector("#eliminado2")
let productoBusqueda = document.querySelector("#productoBusqueda")
let btnBuscar=document.querySelector("#buscar")
let resultadoBusqueda=document.querySelector("#resultadoBusqueda")
let Ordenar=document.querySelector("#orden")
let btnFiltrar=document.querySelector("#filtrar")
let btnlimpiarFiltros=document.querySelector("#limpiarFiltros")
let textMin = document.querySelector("#min")
let textMax = document.querySelector("#max")
        
fetch("./js/api.json")
  .then(res => res.json())
  .then(res => {
  productos = JSON.parse(localStorage.getItem("array")) || res  // toma la info como quedo en el local storage, y si no encuentra nada, obtiene la info de la api simulada en api.json
       
productos && imprimirProductos(productos)
       

btnAgregar.addEventListener("click",(e)=>{
  e.preventDefault()
  producto=text1.value
  precio=parseInt(text2.value)
  imagen=text3.value
  agregarProducto(producto,precio,imagen)
  imprimirProductos(productos)

})

btnEliminar.addEventListener("click",(e)=>{
  e.preventDefault()
  producto=text1.value
  eliminarProducto(producto);
  imprimirProductos(productos)
          
})

btnModificar.addEventListener("click",(e)=>{
  e.preventDefault()
  producto=productoViejo.value
  modificarProducto(producto)
  imprimirProductos(productos)
          
})

btnBuscar.addEventListener("click",(e)=>{
  e.preventDefault()
  producto=productoBusqueda.value
  buscarProducto(producto);
  imprimirProductos(productos)
          
})

Ordenar.addEventListener("click",(e)=>{
  e.preventDefault()
  let aux=parseInt(Ordenar.value)
  console.log(aux)
  ordenarPorPrecio(aux)
          
  imprimirProductos(productos)
          
})
      
btnFiltrar.addEventListener("click",(e)=>{
  e.preventDefault()
  filtrarPorPrecio(textMin.value,textMax.value);
          
})

btnlimpiarFiltros.addEventListener("click",(e)=>{
  e.preventDefault()
  limpiarFiltros();
})


  })
