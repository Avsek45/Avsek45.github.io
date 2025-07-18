// Node.js script to generate PDF resume
const puppeteer = require('puppeteer');
const fs = require('fs');

async function generateResumePDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Read the resume template HTML
    const resumeHTML = fs.readFileSync('./resume-template.html', 'utf8');
    
    // Set content and generate PDF
    await page.setContent(resumeHTML, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
        path: './resume.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in'
        }
    });
    
    await browser.close();
    console.log('PDF generated successfully!');
}

generateResumePDF().catch(console.error);