
const cuerpo = document.getElementById('cuerpo')






cargarEventListeners()



// Escuchar cambios en el input de imagen













function cargarEventListeners(){


//     //Limpiar los campos
//     limpiar.addEventListener('click',limpiarDatos)
//     //cargar los datos a la tabla
//     cargar.addEventListener('click', cargarDatos)
//     //detectar un clic en la tabla
     cuerpo.addEventListener('click', verEliminarEditarFila)
}




function verEliminarEditarFila(e){
   // e.preventDefault()
    const fila =  e.target.parentElement.parentElement.parentElement
    let dniSeleccionado = fila.children[0].textContent
    console.log(dniSeleccionado)
      if(e.target.classList.contains('borrar')){ 
        console.log("Borrando " + dniSeleccionado)
        
        //  console.log(e.target.parentElement.parentElement.parentElement.remove)
        // fila.remove()
      }

     if(e.target.classList.contains('ver')){
        var ventanaModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
            keyboard: false
          });
        ventanaModal.show()
        const titulo = document.querySelector('.modal-title')
        //console.log(fila)
        titulo.textContent = fila.querySelector('#tddni').textContent + " " + fila.querySelector('#tdapellido').textContent + " " + fila.querySelector('#tdnombre').textContent
        // const cuerpoModal = document.querySelector('.modal-body')
        // cuerpoModal.innerHTML = `<span class="fs-1 bg-primary"> ${fila.querySelector('#tdespecialidad').textContent} 
        //  ${fila.querySelector('#tdfile').innerHTML}
        // </span>`


        const cuerpoModal = document.querySelector('.modal-body');
        const especialidad = fila.querySelector('#tdespecialidad').textContent;
        const imagenUrl = fila.querySelector('#tdfile img').src;

        // Actualizar el contenido del modal con la imagen y otros datos
        cuerpoModal.innerHTML = `
            <span class="fs-1 text-center">${especialidad}</span>
            <div class="mt-3">
                <img src="${imagenUrl}" alt="Foto" style="width: 200px; height: 200px;">
            </div>
        `;

      
      }

      if(e.target.classList.contains('editar')){
        let dni = fila.querySelector('#tddni').textContent
        let nombre = fila.querySelector('#tdnombre').textContent
        let apellido = fila.querySelector('#tdapellido').textContent
        let especialidad = fila.querySelector('#tdespecialidad').textContent

        


      }

 }

