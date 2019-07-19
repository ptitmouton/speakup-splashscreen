import * as hbs from 'hbs';

/*
 * Fetches a value from process.env
 */
hbs.registerHelper('getEnv', (key: string) => {
    return process.env[key];
});
