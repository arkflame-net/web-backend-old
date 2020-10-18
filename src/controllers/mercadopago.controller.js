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
            },
        ],
        back_urls: {
            success: "https://www.tu-sitio/success",
            failure: "http://www.tu-sitio/failure",
            pending: "http://www.tu-sitio/pending"
        },
        auto_return: "approved",
    }
}

function updatePending() {
    mercadopago.payment.update({
        id: paymentId,
        status: "cancelled"
      }).then().catch();
}

/* Generate product and payment then redirect */
/* TODO: Get all products from basket and make a payment from that */
exports.checkout = () => {
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