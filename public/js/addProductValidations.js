

window.onload = function () {
  //capturas
  let name = document.getElementById("name");
  let price = document.getElementById("price");
  let sectionId = document.getElementById("sectionId");
  let categoryId = document.getElementById("categoryId");
  let brandId = document.getElementById("brandId");
  let imagePrev = document.getElementById("imagePrev");
  let imageInput = document.getElementById("image");
  let newBrand = document.getElementById("newBrand");
  let description = document.getElementById("floatingTextarea2");
  let saveButton = document.getElementById("saveButton");
  let form = document.getElementById("form");
  let imageLabel = document.getElementById("imageLabel");

  //error fields
  let nameError = document.querySelector(".nameError");
  let priceError = document.querySelector(".priceError");
  let sectionError = document.querySelector(".sectionError");
  let categoryError = document.querySelector(".categoryError");
  let brandError = document.querySelector(".brandError");
  let newBrandError = document.querySelector(".newBrandError");
  let descriptionError = document.querySelector(".descriptionError");

    //errors express-validators fields//
  let nameMsg = document.getElementById('nameMsg');
  let priceMsg = document.getElementById('priceMsg');
  let descriptionMsg = document.getElementById('descriptionMsg');

  //name validations
  name.addEventListener("focus", function () {
    nameMsg.innerHTML = "";
    name.classList.remove("is-valid") || name.classList.remove("is-invalid");
  });

  name.addEventListener("blur", function (e) {
    switch (true) {
      case name.value !== "":
        name.classList.add("is-valid");
        break;
      case name.value === "":
        name.classList.add("is-invalid");
        nameMsg.innerHTML = "Debe ingresar el nombre del producto";
        break;
    }
  });

  //price validation:
  price.addEventListener("focus", function () {
    priceMsg.innerHTML = "";
    price.classList.remove("is-valid") || price.classList.remove("is-invalid");
  });

  price.addEventListener("blur", function () {
    if (price.value === "") {
      priceMsg.innerHTML = "Debe ingresar un precio";
    }
    else if (price.value <= 0) {
      price.classList.add("is-invalid");
      priceMsg.innerHTML = "El precio debe ser mayor a 0";
    }
    else if (price.value > 0) {
      price.classList.add("is-valid");
    }
  });

  //selection validations
  sectionId.addEventListener("focus", function () {
    sectionError.innerHTML = "";
    sectionId.classList.remove("is-valid") ||
      sectionId.classList.remove("is-invalid");
  });

  sectionId.addEventListener("blur", function () {
    if (sectionId.value == 0) {
      sectionId.classList.add("is-invalid");
      sectionError.innerHTML = "Debe seleccionar una sección";
      console.log(sectionId.value);
    }
    if (sectionId.value != 0) {
      sectionId.classList.add("is-valid");
      console.log(sectionId.value);
    }
  });
  //category validations
  categoryId.addEventListener("focus", function () {
    categoryError.innerHTML = "";
    categoryId.classList.remove("is-invalid") ||
      categoryId.classList.remove("is-valid");
  });

  categoryId.addEventListener("blur", function () {
    if (categoryId.value == 0) {
      categoryId.classList.add("is-invalid");
      categoryError.innerHTML = "Debe seleccionar una categoria";
    }
    if (categoryId.value != 0) {
      categoryId.classList.add("is-valid");
    }
  });

  //brand validation
  brandId.addEventListener("focus", function () {
    brandError.innerHTML = "";
    brandId.classList.remove("is-invalid") ||
      brandId.classList.remove("is-valid");
  });

  brandId.addEventListener("blur", function () {
    if (brandId.value == 0) {
      brandId.classList.add("is-invalid");
      brandError.innerHTML = "Debe seleccionar una marca";
    }
    if (brandId.value != 0) {
      brandId.classList.add("is-valid");
    }
  });

  //"otro" = new brand && no existen validaciónes porque solo funcionará cuando se agregue una nueva marca no existente previamente.
  newBrand.addEventListener("focus", function () {
    newBrandError.innerHTML =
      "ingrese NUEVA marca SÓLO si no existe en la lista";
  });
  newBrand.addEventListener("blur", function () {
    newBrandError.innerHTML = "";
  });

  description.addEventListener("focus", function () {
    descriptionMsg.innerHTML = "";
    description.classList.remove("is-invalid") ||
      description.classList.remove("is-valid");
  });

  description.addEventListener("blur", function () {
    switch (true) {
      case description.value === "":
        descriptionMsg.innerHTML = "Debe ingresar una descripción";
        break;

      case description.value.trim().length < 20:
        descriptionMsg.innerHTML = "Debe tener más de 20 caracteres";
        description.classList.add('is-invalid');
        break;
      case description.value.trim().length > 20:
        description.classList.add("is-valid");
        break;
    }
  });

  //Validación de imagen//
  let imageError = document.querySelector(".imageError");
  let fileInput = document.getElementById("image");

    fileInput.addEventListener("change", function (e) {
      let filePath = this.value;
      let allowedExtensions = /(.jpg|.jpeg|.png)$/i;

      if (!allowedExtensions.exec(filePath)) {
        imagePrev.src = "/images/productsImage/default-image.png";
        imageError.innerHTML = "El formato de la imagen no es válido";
        fileInput.value = "";
        imageLabel.classList.add('is-invalid');
        return false;
      } else {
        imageError.innerHTML = "";
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          imagePrev.src = reader.result;
        };
        imageLabel.classList.add('is-valid');
        return true;
      }
    });
      
      imageLabel.addEventListener("click", function () {
        imageLabel.classList.remove("is-invalid") || imageLabel.classList.remove("is-valid");
      });

  //Button disable
  form.addEventListener("submit", function (e) {
  
    let inputsValid = document.querySelectorAll(".is-valid");
    let inputsInvalid = document.querySelectorAll('.is-invalid');
    if (inputsValid.length < 7 || inputsInvalid.length > 0) {
      console.log("disable");
      e.preventDefault();
    }
  });
};
