const sharp = require('sharp');

async function createSafeVersions() {
    const input = 'C:\\Users\\Gustavo\\Desktop\\Logo_Papel_Crepe_INPI.jpg';
    
    // Version 1: Absolute minimum (under 500px) - Should read as < 13cm
    await sharp(input)
        .resize(480, 760, { fit: 'contain', background: 'white' })
        .withMetadata({ density: 96 })
        .toFile('C:\\Users\\Gustavo\\Desktop\\logo_minimo.jpg');

    // Version 2: Exact pixels that usually map to 15cm at standard 96dpi
    // 15cm * 37.8 px/cm = 567px
    await sharp(input)
        .resize(560, 880, { fit: 'contain', background: 'white' })
        .withMetadata({ density: 96 })
        .toFile('C:\\Users\\Gustavo\\Desktop\\logo_15cm.jpg');

    console.log('Created logo_minimo.jpg and logo_15cm.jpg');
}

createSafeVersions();
