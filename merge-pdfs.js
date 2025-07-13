const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

async function mergePDFs() {
    try {
        console.log('Starting PDF merge...');
        
        // Read the PDF files
        console.log('Reading cover PDF...');
        const coverPdfBytes = await fs.readFile('public/omslag-complete.pdf');
        
        console.log('Reading main book PDF...');
        const mainPdfBytes = await fs.readFile('e-book_weedyourskin.pdf');
        
        // Load PDFs
        console.log('Loading PDFs...');
        const coverPdf = await PDFDocument.load(coverPdfBytes);
        const mainPdf = await PDFDocument.load(mainPdfBytes);
        
        // Create a new PDF
        const mergedPdf = await PDFDocument.create();
        
        // Copy pages from cover
        console.log('Copying cover pages...');
        const coverPages = await mergedPdf.copyPages(coverPdf, coverPdf.getPageIndices());
        coverPages.forEach((page) => mergedPdf.addPage(page));
        
        // Copy pages from main book
        console.log('Copying main book pages...');
        const mainPages = await mergedPdf.copyPages(mainPdf, mainPdf.getPageIndices());
        mainPages.forEach((page) => mergedPdf.addPage(page));
        
        // Save the merged PDF
        console.log('Saving merged PDF...');
        const mergedPdfBytes = await mergedPdf.save();
        
        // Write to file
        await fs.writeFile('merged-ebook.pdf', mergedPdfBytes);
        
        // Get file sizes
        const coverSize = (await fs.stat('public/omslag-complete.pdf')).size / (1024 * 1024);
        const mainSize = (await fs.stat('e-book_weedyourskin.pdf')).size / (1024 * 1024);
        const mergedSize = (await fs.stat('merged-ebook.pdf')).size / (1024 * 1024);
        
        console.log('\nSuccess! Files merged:');
        console.log(`  Cover: ${coverSize.toFixed(1)} MB`);
        console.log(`  Main book: ${mainSize.toFixed(1)} MB`);
        console.log(`  Merged: ${mergedSize.toFixed(1)} MB`);
        
        // Rename files
        console.log('\nBacking up original file...');
        await fs.rename('e-book_weedyourskin.pdf', 'e-book_weedyourskin_backup.pdf');
        await fs.rename('merged-ebook.pdf', 'e-book_weedyourskin.pdf');
        
        console.log('Done! The merged file is now e-book_weedyourskin.pdf');
        console.log('Original file backed up as e-book_weedyourskin_backup.pdf');
        
    } catch (error) {
        console.error('Error merging PDFs:', error);
    }
}

mergePDFs(); 