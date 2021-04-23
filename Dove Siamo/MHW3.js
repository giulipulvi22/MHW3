const KEY = 'AmChAPfiNKbB8dXXlgyw_4z1aAdYZ2A-bNrhJ5VGf5jQrty97t1zIsHcCIGMhdFG';
const latitudine = '45.43412317581483';
const longitudine ='12.339195109199135';

function GetMap() {
    //inizializzo la mappa
    const map = new Microsoft.Maps.Map('#map', {
        credentials: KEY,
        center: new Microsoft.Maps.Location(latitudine, longitudine)
    });

    //attribuisco al pushpin il centro della mappa che corrisponde alla località richiesta
    const center = map.getCenter();

    const pin = new Microsoft.Maps.Pushpin(center, {
        color: 'rgba(94, 43, 43, 0.5)',
        title: 'Polo Foto',
        subTitle: 'Piazza San Marco 12, VE.',
    })
        
    //inserisco il pushpin nella mappa
    map.entities.push(pin);
}