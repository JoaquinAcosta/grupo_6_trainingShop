console.log("userRegister success!");

const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
const exRegPass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/;

const msgError = (element, msg, { target }) => {
    console.log("errrorrr", element);
    $(element).innerText = msg;
    target.classList.add('is-invalid');

};

const cleanField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove('is-invalid', 'is-valid')
};

const validField = (element, { target }) => {
    cleanField(element, target)
    target.classList.add('is-valid');
};
const viewPass = function(e) {
    document.querySelector('#viewPass i').classList.toggle('fa-eye')
    document.querySelector('#viewPass i').classList.toggle('fa-eye-slash')

   $('pass').type = $('pass').type === "text" ? 'password' : 'text';
};


//Validacion Nombre
$('name').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('nameError',"El nombre es obligatorio", e);
            break;
        case this.value.trim().length < 2 :
            msgError('nameError',"El nombre debe tener como mínimo dos caracteres", e);
            break
        case !exRegAlfa.test(this.value):
            msgError('nameError',"Solo se permiten caracteres alfabéticos", e);
            break
        default:
            validField('nameError',e)
            break;
    }
});

$('name').addEventListener('focus', function({target}){
    cleanField('nameError', target)
});

//Validacion apellido
$('lastName').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('lastNameError',"El apellido es obligatorio", e);
            break;
        case this.value.trim().length < 2 :
            msgError('lastNameError',"El apellido debe tener como mínimo dos caracteres", e);
            break
        case !exRegAlfa.test(this.value):
            msgError('lastNameError',"Solo se permiten caracteres alfabéticos", e);
            break
        default:
            validField('lastNameError',e)
            break;
    }
});

$('lastName').addEventListener('focus', function({target}){
    cleanField('lastNameError', target)
});

//Validacion Email
$('email').addEventListener('blur', async function(e){
    switch (true) {
        case !this.value.trim():
            msgError('emailError',"El email es obligatorio", e);
            break;
        case !exRegEmail.test(this.value):
            msgError('emailError',"El email tiene un formato inválido", e);
            break
        case await verifyEmail(this.value):
            msgError('emailError',"El email ya se encuentra registrado", e);
            break
        default:
            validField('emailError',e)
            break;
    }
});

$('email').addEventListener('focus', function({target}){
    cleanField('emailError', target)
});

//Validacion password 
$('pass').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('passError',"La contraseña es obligatoria", e);
            break;
        case !exRegPass.test(this.value):
            msgError('passError',"La contraseña debe tener entre 6 y 12 caracteres, un número, una mayúscula y un caracter especial", e);
            break
        default:
            validField('passError',e)
            break;
    }
});

$('pass').addEventListener('focus', function({target}){
    cleanField('passError', target)
});

// Validacion reingresar password
$('pass2').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('pass2Error',"Debes confirmar tu contraseña", e);
            break;
        case this.value !== $('pass').value:
            msgError('pass2Error',"Las contraseñas no coinciden", e);
            break
        default:
            validField('pass2Error',e)
            break;
    }
});

$('pass2').addEventListener('focus', function({target}){
    cleanField('pass2Error', target)
});

/* $('formRegister').addEventListener('submit', (e) => {
    e.preventDefault();
    let error = false;
    const elements = $('formRegister').elements;
    console.log(elements);

    if(!$('terms').checked){
        error = true;
        $('termsError').innerText = "Debe aceptar las bases y condiciones"
    }
    for (let i = 0; i < elements.length - 2; i++) {
        
        if(!elements[i].value || elements[i].classList.contains('is-invalid')){
            error = true;
            elements[i].classList.add('is-invalid')
            $('msgError').innerText = "Algunos tienen errores y/o están vacíos."
        }
        
    }
    !error &&  $('formRegister').submit()
}) */
let terms = $('terms');
terms.addEventListener('click', function(){
    console.log(terms.checked);
})

console.log(); 
    const isInvalid = document.querySelectorAll('.is-invalid')
    let form = document.getElementById('formRegister')
    form.addEventListener("submit", function (e) {
        if (isInvalid.length > 0 || terms.checked === false) {
            e.preventDefault() 
            $('termsError').innerText = "* Debe aceptar las bases y condiciones"
            $('msgError').innerText = "* Algunos tienen errores y/o están vacíos."
        }
    
    })






/* window.onload = function () {
  const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
  const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const exRegPass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/;

  //Capturas
  let name = document.getElementById("name");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  //Error fields
  let nameError = document.querySelector(".nameError");
  let lastNameError = document.querySelector(".lastNameError");
  let emailError = document.querySelector(".emailError");
  let passwordError = document.querySelector(".passwordError");

  //Name validations
  name.addEventListener("focus", function () {
    nameError.innerHTML = "";
    name.classList.remove("is-valid") || name.classList.remove("is-invalid");
  });

  name.addEventListener("blur", function (e) {
    switch (true) {
      case name.value === "":
        name.classList.add("is-invalid");
        nameError.innerHTML = "El nombre es obligatorio";
        break;
      case this.value.trim().length < 2:
        msgError(
          "errorNombre",
          "El nombre debe tener como mínimo dos caracteres",
          e
        );
        break;
      case !exRegAlfa.test(this.value):
        msgError("errorNombre", "Solo se permiten caracteres alfabéticos", e);
        break;
    }
  });

  //Button disable
  form.addEventListener("submit", function (e) {
    let inputsValid = document.querySelectorAll(".is-valid");
    let inputsInvalid = document.querySelectorAll(".is-invalid");
    if (inputsValid.length < 6 || inputsInvalid.length > 0) {
      console.log("disable");
      e.preventDefault();
    }
  });
};
 */
