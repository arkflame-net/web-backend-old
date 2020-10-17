const express = require("express");
const Router = express.Router();
const paypalController = require("../controllers/paypal.controller");

Router.get("/json", (req, res) => {
    res.json({
        "text": "onii chan uwu",
    })
});

Router.get("/html", (req, res) => {
    res.write("<h1>onii chan uwu</h1>");
    res.end();
});

// pero probare la api sin la app de react
// por una buena razon
Router.post("/buy", async (req, res) => {
    // esto era la url que sera redireccionado el usuario
    let callback = await paypalController.buy().catch(() => { return "/error" });

    // y aqui lo redireccionamos
    res.json({
        redirect: callback
    })

    // para probar q to funcione
    console.log("Redireccionando al usuario a " + callback);
});

Router.get("/success", async (req, res) => {
    console.log("SUCCESS!!!");
    res.end();
});

Router.get("/error", async (req, res) => {
    console.log("ERROR!!!");
    res.end();
});

module.exports = Router;