let products = {};

function addProduct(category, name, shortDescription, longDescription, commands, unique, price) {
    products[name] = {
        "category": category,
        "name": name,
        "description": {
            "short": shortDescription,
            "long": longDescription,
        },
        "commands": commands,
        "unique": unique,
        "price": price,
    };
}

function getProduct(name) {
    return products[name];
}

function getProducts() {
    return products;
}

function addProducts() {
    addProduct("ranks", "ULTRA", "Paquete de beneficios de nivel 1.", "Paquete de beneficios de nivel 1.\n\nContiene /kit ULTRA, /fly, /craft, /enderchest y otros beneficios.", "/lp user %name% parent add ULTRA,/broadcast %name% ha comprado rango ULTRA!", true, 3.00);
}

module.exports = { addProducts, getProducts, getProduct };