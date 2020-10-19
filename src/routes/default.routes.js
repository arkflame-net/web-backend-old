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
});

/* TODO: Return available products */
Router.get("/products", async (req, res) => {
    res.json({
        "categories": [
            {
                "id": 1,
                "name": "Rangos",
                "items": [
                    {
                        "name": "HEROE",
                        "price": 24.00,
                        "image": "",
                        "description": "Lorem ipsum dolor sit amet"
                    },
                    {
                        "name": "TITAN",
                        "price": 12.00,
                        "image": "",
                        "description": "Lorem ipsum dolor sit amet"
                    },
                    {
                        "name": "MEGA",
                        "price": 6.00,
                        "image": "",
                        "description": "Lorem ipsum dolor sit amet"
                    },
                    {
                        "name": "ULTRA",
                        "price": 3.00,
                        "image": "",
                        "description": "Lorem ipsum dolor sit amet"
                    }
                ]
            },
            {
                "id": 2,
                "name": "Apelaciones",
                "items": [
                    {
                        "name": "Limpieza Total",
                        "price": 10.00,
                        "image": "",
                        "description": "Lorem ipsum dolor sit amet"
                    },
                    {
                        "name": "Unban",
                        "price": 5.00,
                        "image": "",
                        "description": "Lorem ipsum dolor sit amet"
                    },
                    {
                        "name": "Unmute",
                        "price": 3.00,
                        "image": "",
                        "description": "Lorem ipsum dolor sit amet"
                    }
                ]
            }
        ]
    });
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