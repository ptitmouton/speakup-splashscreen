import * as hbs from 'hbs';

/*
 * format a price, given in cents
 */
hbs.registerHelper('formatPrice', (price: number) => {
    const priceString = price.toString();
    return `${priceString.slice(0, priceString.length - 2)},${priceString.slice(priceString.length - 2)} €`;
});
