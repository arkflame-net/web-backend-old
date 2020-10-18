const express = require("express");
const Router = express.Router();
const paypalController = require("../controllers/paypal.controller");

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
Router.post("/checkout", async (req, res) => {
    let callback = await paypalController.checkout().catch(() => { return "/error" });

    res.json({
        redirect: callback,
    });

    console.log("Redirecting to " + callback);
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