console.log('user profile conectado');
const $ = e => document.getElementById(e);
const formUserProfile = $("formUserProfile");
const elements = formUserProfile.elements;
const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
const exRegPhone = /^\d{10}$/ ;

const verifyEmail = async (email) => {
  try {
      const data = JSON.stringify({
          email : email
      });
      let response = await fetch('/api/users/verify-email',{
          method : 'POST',
          body : data,
          headers : {
              'Content-Type': 'application/json'}
  });
      let result = await response.json();
      console.log(result.data)
      return result.data   
  } catch (error) {
      console.error}
}


const checkFields = () => {
    let error = false;
    for (let i = 0; i < elements.length - 1; i++) {
      console.log(elements)
      if(!elements[i].value) {
        error = true
      }
      console.log(error)
    }
    if(!error){
      $('submit').disabled = false;
    }else {
      $('submit').disabled = true;
    }
  }

$("name").addEventListener("focus", function (e) {
    $('nameMsg').innerHTML = "Ingrese un nombre";
    $('nameMsg').style.color = "green"
  });
$("name").addEventListener("blur", function (e) {
    switch (true){
        case !this.value.trim():
            $("nameMsg").style.color = "red";
            $("nameMsg").innerHTML = "Debe colocar un nombre";
            break;
        case this.value.trim().length < 3:
            $("nameMsg").style.color = "red";
            $("nameMsg").innerHTML = "El nombre debe tener como minimo 3 carácteres";
            break;
        case  !exRegAlfa.test(this.value):
            $("nameMsg").style.color = "red";
            $("nameMsg").innerHTML = "Solo se permiten caracteres alfabéticos", e;
            break;
        default: $('nameMsg').innerHTML = null;
            break;
    }
    checkFields()
  });

$("lastName").addEventListener("focus", function (e) {
    $('lastNameMsg').innerHTML = "Ingrese un apellido";
    $('lastNameMsg').style.color = "green"
  });
$("lastName").addEventListener("blur", function (e) {
    switch (true){
        case !this.value.trim():
            $("lastNameMsg").style.color = "red";
            $("lastNameMsg").innerHTML = "Debe colocar un apellido";
            break;
        case this.value.trim().length < 3:
            $("lastNameMsg").style.color = "red";
            $("lastNameMsg").innerHTML = "El apellido debe tener como minimo 3 carácteres";
            break;
        case  !exRegAlfa.test(this.value):
            $("lastNameMsg").style.color = "red";
            $("lastNameMsg").innerHTML = "Solo se permiten caracteres alfabéticos", e;
            break;
        default: $('lastNameMsg').innerHTML = null;
            break;
    }
    checkFields()
  });

$('avatar').addEventListener('change', (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      $('imagePrev').src = reader.result
    };
    checkFields()
});

$("email").addEventListener("focus", function (e) {
    $('emailMsg').innerHTML = "Ingrese un email";
    $('emailMsg').style.color = "green"
  });
$("email").addEventListener("blur",async function (e) {
    switch (true){
        case !this.value.trim():
            $("emailMsg").style.color = "red";
            $("emailMsg").innerHTML = "Debe colocar un email";
            break;
        case  !exRegEmail.test(this.value):
            $("emailMsg").style.color = "red";
            $("emailMsg").innerHTML = "El email tiene un formato inválido", e;
            break;
        case await verifyEmail(this.value):
            msgError('errorEmail',"El email ya se encuentra registrado", e);
            break;
        default: $('emailMsg').innerHTML = null;
            break;
    }
    checkFields()
  });

$("phone").addEventListener("focus", function (e) {
    $('phoneMsg').innerHTML = "Ingrese un número telefonico";
    $('phoneMsg').style.color = "green"
  });
$("phone").addEventListener("blur", function (e) {
    switch (true){
        case !this.value.trim():
            $("phoneMsg").style.color = "red";
            $("phoneMsg").innerHTML = "Debe colocar un telefono";
            break;
        case  !exRegPhone.test(this.value):
            $("phoneMsg").style.color = "red";
            $("phoneMsg").innerHTML = "Ingrese número valido ej:1198765432", e;
            break;
        default: $('phoneMsg').innerHTML = null;
            break;
    }
    checkFields()
  });

/* $('formUserProfile').addEventListener('keydown', (e) => {
  if(e.key === "Enter" ){
      e.preventDefault()
  }
}); */

/* $('formUserProfile').addEventListener('submit', (e) => {
    e.preventDefault();
    let error = false;
    const elements = $('formUserProfile').elements;
    /* return console.log(elements) 

    for (let i = 0; i < elements.length -1 ; i++) {
       /* console.log(elements[i].value) 
        if (!elements[i].value) {
          error = true}
    }

    !error && $('formUserProfile').submit()
}) */ 