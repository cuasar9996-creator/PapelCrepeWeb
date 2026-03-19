const sharp = require('sharp');
async function inspect() {
    try {
        const metadata = await sharp('C:\\Users\\Gustavo\\Desktop\\Logo_Papel_Crepe_INPI.jpg').metadata();
        console.log(JSON.stringify(metadata, null, 2));
    } catch (e) {
        console.error(e);
    }
}
inspect();
