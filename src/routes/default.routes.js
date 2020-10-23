const express = require("express");
const Router = express.Router();
const mercadoPagoController = require("../controllers/mercadopago.controller");
const paypalController = require("../controllers/paypal.controller");
const productController = require("../controllers/product.controller");

productController.addProducts();

Router.get("/json", (req, res) => {
    res.json({
        "text": "Test JSON",
    })
});

Router.get("/html", (req, res) => {
    res.write("<h1>Test HTML</h1>");
    res.end();
});

/* TODO: Switch between Paypal and MercadoPago controller */
Router.get("/checkout", async (req, res) => {
    let method = req.query.method;
    let callback;

    console.log(method);

    if (method == "mercadopago") {
        callback = await mercadoPagoController.checkout().catch(() => { return "/error" });
    } else if (method == "paypal") {
        callback = await paypalController.checkout().catch(() => { return "/error" });
    } else {
        callback = "/error";
    }

    res.json({
        redirect: callback,
    });
});

/* TODO: Return available products */
Router.get("/products", async (req, res) => {
    res.json(productController.getProducts());
});

Router.get("/success", async (req, res) => {
    res.write("<h1>Success</h1>");
    res.end();
});

Router.get("/error", async (req, res) => {
    res.write("<h1>Error</h1>");
    res.end();
});

module.exports = Router;