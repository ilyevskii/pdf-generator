import {User} from "../entities/user.entity";
import {PDFDocument, PDFFont, PDFImage, PDFPage, StandardFonts} from 'pdf-lib';
import * as fs from 'fs';

export async function generatePDF(user: User): Promise<Buffer> {

    const pdfDoc: PDFDocument = await PDFDocument.create();

    const page: PDFPage = pdfDoc.addPage();

    const font: PDFFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const fontSize: number = 30;
    const text: string = `${user.firstName} ${user.lastName}`;
    const textWidth: number = font.widthOfTextAtSize(text, fontSize);
    const textHeight: number = font.heightAtSize(fontSize);

    page.drawText(text, {
        x: (page.getWidth() - textWidth) / 2,
        y: (page.getHeight() - textHeight) / 2,
        size: fontSize,
        font: font,
    });

    const imageBytes: Buffer = fs.readFileSync(`../../public/images/${user.id}.jpg`);
    const image: PDFImage = await pdfDoc.embedJpg(imageBytes);
    page.drawImage(image, {
        width: image.width,
        height: image.height,
    });

    const pdfBytes: Uint8Array = await pdfDoc.save();

    return Buffer.from(pdfBytes);
}
