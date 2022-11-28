const mapped = (errors = []) =>
  errors.reduce(
    (acum, error) => ({ ...acum, [error.path]: error.message }),
    {}
  );

/* const mapped = (errors = []) => {
  return errors.reduce((acum,error) => {
    acum = {...acum, [error.path]: error.message }
    return acum
  },{})
} */

const sendJsonError = (err ,res,codeStatus = /[sequelize|AggregateError]/i.test(err.name)? 422: 500) => {
  let prop = "error";
  let responseError;
  let errorsArray;
  console.log("error", err.message);
  if (typeof err === "string") {
    responseError = err;
  } else if (/[sequelize|AggregateError]/i.test(err.name)) {
    errorsArray = err.errors;

    if (/AggregateError/i.test(err.name)) {
      err.errors[0].errors.errors[0].path = 'images'
      errorsArray = err.errors[0].errors.errors;
    }

    prop += "s";
    responseError = mapped(errorsArray);

  } 
  responseError = err.message ? err.message : responseError 

  return res.status(codeStatus).json({
    ok: false,
    status: codeStatus,
    [prop]: responseError,
  });
};

module.exports = { sendJsonError };
