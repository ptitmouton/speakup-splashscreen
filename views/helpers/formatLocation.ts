import * as hbs from 'hbs';

/*
 * format a location, making first line bold, changing ', ' into newlines
 */
hbs.registerHelper('formatLocation', (locationString: string) => {
    if (locationString) {
        const [strongLine, ...lines] = locationString.split(',').map(locComponent => locComponent.trim());
        return new hbs.handlebars.SafeString(`
            <p>
                <strong>${strongLine}</strong><br />
                ${lines && lines.map(line => `${line}<br />`)}
                <br />
            </p>
        `);
    } else {
        return null;
    }
});
