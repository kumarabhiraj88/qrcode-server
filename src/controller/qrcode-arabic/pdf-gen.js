//pdf reference-  https://www.geeksforgeeks.org/how-to-create-pdf-document-in-node-js/
//pdfkit table reference- https://www.npmjs.com/package/pdfkit-table
import PDFDocument from 'pdfkit';
//import PdfTable from 'pdfkit-table';

import fs from 'fs';
import path from 'path';

const buildPdf = (invDefaultId, TextToConvert) => {

    let fontNormal = 'Helvetica';
    let fontBold = 'Helvetica-Bold';

    // Create a document
    //const doc = new PDFDocument();

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const customArabicFont = fs.readFileSync(path.resolve("./Amiri-Regular.ttf"));

    //heading
    doc
    .fontSize(16)
    .font(customArabicFont)
    .text(TextToConvert, {
        align: 'center'
      });

      // Adding image in the pdf.
      doc.image('./qrcodes/'+invDefaultId+'.png', {
        fit: [50, 50],
        align: 'center',
        valign: 'center'
    });
    

    // Saving the pdf file in root directory.
    doc.pipe(fs.createWriteStream('./pdfs/'+invDefaultId+'.pdf'));

    

    // Adding functionality
    // doc
    // .fontSize(14)
    // .text('Invoice Number: '+scMasterForm.invoiceNumber, 100, 100);

 
    

    // Finalize PDF file
    doc.end();

}


export default {
    buildPdf
}