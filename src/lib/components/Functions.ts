import { jsPDF } from 'jspdf';
 
 interface ExportItem {
    Chapter: string;
    HiRes: string;
    Filename: string;
    Title: string;
    Medium: string;
    Size: string;
    Year: string;
    Provenance: string;
    Annotation: string;
}


function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        // Add cache-busting parameter
        const cacheBuster = `?v=${Date.now()}`;
        img.src = src + cacheBuster;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}



export async function exportPDF(items: ExportItem[]) {
    console.log(`Starting PDF export for ${items.length} items...`);

    const doc = new jsPDF();
    const margin = 10;
    const topMargin = 20;
    const bottomMargin = 15;
    const imagesPerPage = 4;
    const { width: pageWidth, height: pageHeight } = doc.internal.pageSize;
    const cardWidth = (pageWidth - margin * 3) / 2;
    const cardHeight = (pageHeight - topMargin - bottomMargin - margin * 2) / 2;

    const imagePromises = items.map(async (item) => {
        try {
            const img = await loadImage(`https://streetkonect.com/object_curator/pepito/main/${item.Filename}.jpg`);
            return { item, img };
        } catch (error) {
            return null;
        }
    });

    const loadedImages = (await Promise.all(imagePromises))
        .filter((x): x is { item: ExportItem; img: HTMLImageElement } => x !== null);

    const totalPages = Math.ceil(loadedImages.length / imagesPerPage);
    let currentPage = 1;

    loadedImages.forEach(({ item, img }, index) => {
        if (index > 0 && index % imagesPerPage === 0) {
            console.log(`Completed page ${currentPage} of ${totalPages}`);
            doc.addPage();
            currentPage++;
        }

        const row = Math.floor((index % imagesPerPage) / 2);
        const col = (index % imagesPerPage) % 2;
        const xPos = margin + col * (cardWidth + margin);
        const yPos = topMargin + row * (cardHeight + margin);

        const aspectRatio = img.width / img.height;
        const imgHeight = cardWidth / aspectRatio;
        const finalImgHeight = Math.min(imgHeight, cardHeight * 0.7);
        const finalImgWidth = finalImgHeight * aspectRatio;
        const imgXPos = xPos + (cardWidth - finalImgWidth) / 2;

        try {
            doc.addImage(img, 'JPEG', imgXPos, yPos, finalImgWidth, finalImgHeight);
            
            let textYPos = yPos + finalImgHeight + 5;
            doc.setFontSize(8);
            doc.text(item.Filename, xPos, textYPos, { maxWidth: cardWidth });
            textYPos += 7;
            doc.setFontSize(12);
            doc.text(item.Title, xPos, textYPos, { maxWidth: cardWidth });
            doc.setFontSize(9);
            textYPos += 7;
            doc.text(item.Medium, xPos, textYPos, { maxWidth: cardWidth });
            textYPos += 5;
            doc.text(item.Size, xPos, textYPos, { maxWidth: cardWidth });
            textYPos += 5;
            doc.text(item.Year, xPos, textYPos, { maxWidth: cardWidth });
            textYPos += 5;
            doc.text(item.Provenance, xPos, textYPos, { maxWidth: cardWidth });
        } catch (error) {
            console.error(`Failed to process: ${item.Filename}`);
        }
    });

    doc.save('artwork-catalog.pdf');
    console.log('Export completed');
}