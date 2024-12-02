const cargar = document.getElementById("cargar");
const dni = document.getElementById("dni");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const especialidad = document.getElementById("especialidad");
const imagen = document.getElementById("image");
const error = document.getElementById("error");

const inputImage = document.getElementById('image');
const previewImage = document.getElementById('previewImage');

console.log(inputImage)
console.log(previewImage)



eventListeners();

function eventListeners() {
    cargar.addEventListener("click", cargarAlumno)
    inputImage.addEventListener('change', cargarFoto)
}

function cargarFoto(event) {
    const file = event.target.files[0];
    
    if (file) {
        // Verificar que el archivo sea de tipo imagen (jpg o png)
        const fileType = file.type;
        const validImageTypes = ['image/jpeg', 'image/png'];
        
        if (validImageTypes.includes(fileType)) {
            // Mostrar la imagen seleccionada
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block'; // Mostrar la imagen
            };
            reader.readAsDataURL(file); // Leer el archivo como Data URL
        } else {
            alert('Por favor selecciona un archivo de imagen válido (JPG o PNG)');
            inputImage.value = ''; // Limpiar el campo si no es una imagen válida
            previewImage.style.display = 'none'; // Ocultar la vista previa
        }
    }
  };
  


function cargarAlumno(e) {
    e.preventDefault();
    //console.log(dni.value.length)

    // Verificar los datos
    error.textContent = "";
    error.classList.remove("alert");
    error.classList.remove("alert-danger");
    if (
        dni.value.length == 0 ||
        nombre.value.length == 0 ||
        apellido.value.length == 0 ||
        especialidad.value.length == 0
    ) {
        error.textContent = "ERROR EN LOS DATOS";
        error.classList.add("alert");
        error.classList.add("alert-danger");
    } else {
    

        //1
        const formElement = document.getElementById("fileForm");
        const formData = new FormData(formElement);

        //
        const alumno = {
            dni: dni.value,
            apellido: apellido.value,
            nombre: nombre.value,
            especialidad: especialidad.value,
            img_url: imagen.value,
            activo: activo.value
        };
        //1
        console.log("Form DATA");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }
        //
        //Enviar los datos para insertar
        fetch("/confirmaAgregarUsuario", {
            method: "POST",
            //1
            body: formData,
            // headers: {
            //   'Content-Type': 'application/json'
            // },
            // body:JSON.stringify(alumno)
            //1
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Error al tratar de conectarse  " + response.statusText
                    );
                }

                return response.json();
            })
            .then((data) => {
                //  console.log('Datos recibidos:', data);
                error.textContent = data.mensaje;
                error.classList.add("alert");
                error.classList.add("alert-success");
            })
            .catch((error) => {
                console.error("Error agarrado:", error);
            });
    }
}
