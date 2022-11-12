// ************ Require's ************
const express = require("express");
const router = express.Router();



// ************ Controller Require ************
const {
  detail,
  image,
} = require("../../controllers/APIs/apiProductsController");

/* /products */

/*** GET ALL PRODUCTS ***/
/* QUERIES: --> 
limit(number),
offset(number),
page(number)
sales(boolean),
salesDiscount(number)
sort(string)
sortBy(string) 
          <--
*/
router


/*** GET ONE PRODUCT ***/
.get("/:id", detail)

/*** PREVIEW IMAGE ***/
.get("/image/:img", image)


module.exports = router;
