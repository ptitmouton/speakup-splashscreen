import * as hbs from 'hbs';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

/*
 * format Date using date-fns. See https://date-fns.org/v2.0.0-beta.2/docs/format for more formatting information
 */
hbs.registerHelper('formatDate', (date: Date, pattern: string) => {
    return format(date, pattern, { locale: de });
});
