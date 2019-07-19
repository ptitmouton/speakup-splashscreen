import * as hbs from 'hbs';

/*
 * format a location, making first line bold, changing ', ' into newlines
 */
hbs.registerHelper('locationImage', (locationString: string) => {
    if (locationString) {
        const [, ...lines] = locationString.split(',').map(locComponent => locComponent.trim());
        const mapParams = [
            ['autoscale', '2'],
            ['size', '300x300'],
            ['maptype', 'roadmap'],
            ['format', 'png'],
            ['visual_refresh', 'true'],
            ['markers', `size:mid|color:0x00afd1|label:1|${lines.join(',').replace(/:/, '').replace(/|/, '')}`],
            ['key', process.env.MAPS_STATIC_API_KEY],
        ];
        const query = mapParams.reduce((prev, curr) => {
            return [
                prev,
                '&',
                curr[0],
                '=',
                curr[1].split('|').join('%7C').split(' ').join('+'),
            ].join('');
        }, '');
        return new hbs.handlebars.SafeString(`
            <img width="300" src="https://maps.googleapis.com/maps/api/staticmap?${query}" alt="${locationString}">
        `);
    } else {
        return null;
    }
});
