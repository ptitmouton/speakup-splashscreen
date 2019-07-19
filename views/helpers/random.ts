import * as hbs from 'hbs';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

/*
 * Outputs a random number
 */
hbs.registerHelper('random', () => {
    return String(Math.floor(Math.random() * 1000));
});
