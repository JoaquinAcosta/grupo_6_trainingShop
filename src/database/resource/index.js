const objectValidate = (arg, msg) => ({arg, msg});

const defaultValidationsRequiredFields = {
    notNull: objectValidate(false, "Campo requerido"),
    notEmpty: objectValidate(false, "Campo requerido"),
}

module.exports= {
    objectValidate,
    defaultValidationsRequiredFields
}