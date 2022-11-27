
console.log('userLogin.js success');


window.onload= function(){
    const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    let email= document.getElementById("email")
    let password= document.getElementById("password")

    let emailError= document.getElementById("emailError")
    let passwordError= document.getElementById("passwordError")


//llamado a la Api
const verifyEmail = async (email) => {
    try{
        const data = JSON.stringify
        
        let response = await fetch ('/api/users/check-email', {
            method : 'POST',
            body : JSON.stringify({
                email : email
            }),
            headers : {
                'content-Type' : 'aplication/json'
            }
        });
            let result = await response.json();
            return result.data;

        } catch (error){
            console.error
    }
}


        //email validations
email.addEventListener("focus", function () {
emailError.innerHTML = "";
email.classList.remove("is-valid") || email.classList.remove("is-invalid");
});



email.addEventListener("blur", async function (e) {
switch (true) {
case exRegEmail.test(email.value):
    email.classList.add("is-valid");
    break;
case email.value === "":
    email.classList.add("is-invalid");
    emailError.innerHTML = "Debe ingresar el email";
    break;
case !exRegEmail.test(this.value):
    email.classList.add("is-invalid");
    emailError.innerHTML = "El email tiene un formato invalido";
    break;
case await verifyEmail(this.value):
    email.classList.add("is-invalid");
    emailError.innerHTML = "El email ya se encuentra registrado";
    break;
default:
    varidFied('errorEmail')
    break;
}
/* console.log(email.value) */
});


//password validations
password.addEventListener("focus", function () {
passwordError.innerHTML = "";
password.classList.remove("is-invalid");
});

password.addEventListener("blur", function () {
switch (true) {
case password.value === "":
password.classList.add("is-invalid");
passwordError.innerHTML = "Debe ingresar la contraseña";
break;
}
})

let formulario = document.getElementById("formulario");

//Button disable
formulario.addEventListener("submit", function (e) {

let inputsValid = document.querySelectorAll(".is-valid");
let inputsInvalid = document.querySelectorAll('.is-invalid');
if (inputsValid.length < 1 || inputsInvalid.length > 0) {
console.log("disable");
e.preventDefault();
}
});
}
