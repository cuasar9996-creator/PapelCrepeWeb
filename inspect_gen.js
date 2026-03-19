const sharp = require('sharp');
async function inspect() {
    try {
        const m1 = await sharp('C:\\Users\\Gustavo\\Desktop\\Logo_Papel_Crepe_17x27.jpg').metadata();
        console.log('300 DPI file:', m1.density, m1.width, 'x', m1.height);
        const m2 = await sharp('C:\\Users\\Gustavo\\Desktop\\Logo_Papel_Crepe_17x27_WEB.jpg').metadata();
        console.log('96 DPI file:', m2.density, m2.width, 'x', m2.height);
    } catch (e) {
        console.error(e);
    }
}
inspect();
