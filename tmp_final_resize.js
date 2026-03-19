const sharp = require('sharp');
const path = require('path');

const inputPath = 'C:\\Users\\Gustavo\\Desktop\\Logo_Papel_Crepe_INPI.jpg';
const outputPath = 'C:\\Users\\Gustavo\\Desktop\\Logo_Papel_Crepe_FINAL_INPI.jpg';

async function processImage() {
    try {
        // We target 640px width which at 96 DPI is approx 16.9cm
        // This avoids the '2008' pixel count that is triggering the 18cm error
        await sharp(inputPath)
            .resize({
                width: 640,
                height: 1000,
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            })
            .withMetadata({ density: 96 })
            .toFile(outputPath);

        console.log('Successfully created Logo_Papel_Crepe_FINAL_INPI.jpg (640x1000 pixels)');
    } catch (err) {
        console.error('Error:', err);
    }
}

processImage();
