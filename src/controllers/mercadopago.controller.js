const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'PROD_ACCESS_TOKEN'
});

/* Generate the product to process */
function createPreference() {
    return {
        items: [
            {
                title: 'Mi producto',
                unit_price: 100,
                quantity: 1,
            }
        ]
    }
}

/* Generate product and payment then redirect */
exports.buy = () => {
    return new Promise(async (resolve, reject) => {
        let preference = createPreference();

        mercadopago.preferences.create(preference)
            .then(function (response) {
                // Este valor reemplazará el string "<%= global.id %>" en tu HTML
                global.id = response.body.id;
            }).catch(function (error) {
                console.log(error);
            });
    });
}