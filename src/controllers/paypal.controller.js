const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': process.env.PAYPAL_MODE,
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET,
});

/* Generate the product to process */
function createSale() {
    return {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/error"
        },
        transactions: [{
            amount: {
                total: 39.00,
                currency: "USD"
            },

            description: "You are buying... x3 Daedrico"
        }]
    }
}

/* Generate the payment to process */
function createPayment(payment) {
    return new Promise((resolve, reject) => {
        paypal.payment.create(payment, (err, payout) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(payout);
            }
        })
    });
}

/* Generate product and payment then redirect */
/* TODO: Get all products from basket and make a payment from that */
function checkout() {
    return new Promise(async (resolve, reject) => {
        let sale = createSale();
        let payment = await createPayment(sale).catch((e) => { return null });

        if (payment == null) {
            return reject();
        }

        let id = payment.id;
        let links = payment.links;

        for (let i = --links.length; i > 0; i--) {
            let link = links[i];

            if (link != undefined && link.method == "REDIRECT") {
                resolve(link.href);
            }
        }
    });
}

module.exports = { checkout };