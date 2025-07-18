// Resume Download Functionality
class ResumeDownloader {
    constructor() {
        this.button = document.getElementById('download-resume');
        this.init();
    }

    init() {
        if (this.button) {
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadResume();
            });
        }
    }

    async downloadResume() {
        const btn = this.button;
        const originalText = btn.innerHTML;
        
        try {
            // Show loading state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
            btn.disabled = true;
            
            // Hide particles during generation
            const particles = document.getElementById('particles');
            if (particles) {
                particles.style.display = 'none';
            }
            
            // Scroll to top for better capture
            window.scrollTo(0, 0);
            
            // Wait a moment for scroll to complete
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if html2pdf is available
            if (typeof html2pdf === 'undefined') {
                console.error('html2pdf library not loaded');
                this.fallbackDownload();
                return;
            }
            
            const element = document.querySelector('.resume-container');
            if (!element) {
                throw new Error('Resume container not found');
            }
            
            const options = {
                margin: [0.5, 0.5],
                filename: 'Abhishek_Maharjan_Resume.pdf',
                image: { 
                    type: 'jpeg', 
                    quality: 0.9
                },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    logging: false,
                    backgroundColor: '#0f172a',
                    width: element.offsetWidth,
                    height: element.offsetHeight
                },
                jsPDF: { 
                    unit: 'in', 
                    format: 'a4', 
                    orientation: 'portrait',
                    compress: true
                }
            };
            
            // Generate PDF
            await html2pdf().set(options).from(element).save();
            
            // Success state
            btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            btn.disabled = false;
            
            // Reset after 2 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
            
        } catch (error) {
            console.error('PDF generation failed:', error);
            
            // Error state
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
            btn.disabled = false;
            
            // Reset after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 3000);
            
            // Try fallback
            this.fallbackDownload();
            
        } finally {
            // Restore particles
            const particles = document.getElementById('particles');
            if (particles) {
                particles.style.display = 'block';
            }
        }
    }
    
    fallbackDownload() {
        // Fallback: Open print dialog
        console.log('Using fallback: opening print dialog');
        
        // Create a new window with just the resume content
        const printWindow = window.open('', '_blank');
        const resumeContent = document.querySelector('.resume-container').outerHTML;
        const styles = Array.from(document.styleSheets)
            .map(styleSheet => {
                try {
                    return Array.from(styleSheet.cssRules)
                        .map(rule => rule.cssText)
                        .join('\n');
                } catch (e) {
                    return '';
                }
            })
            .join('\n');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Abhishek Maharjan - Resume</title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.6.0/css/bootstrap.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <style>
                    ${styles}
                    @media print {
                        body { margin: 0; }
                        .particles { display: none !important; }
                        .resume-container { box-shadow: none !important; }
                    }
                </style>
            </head>
            <body>
                ${resumeContent}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 1000);
                    }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
}

// Alternative simple download function
function simpleDownload() {
    // Create a direct download link to a pre-made PDF
    const link = document.createElement('a');
    link.href = 'assets/Abhishek_Maharjan_Resume.pdf'; // You can upload a PDF file here
    link.download = 'Abhishek_Maharjan_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on GitHub Pages (where html2pdf might not work)
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
        // For GitHub Pages, use a simpler approach
        const btn = document.getElementById('download-resume');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Change button text
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-print"></i> Opening Print...';
                
                // Open print dialog after a short delay
                setTimeout(() => {
                    window.print();
                    
                    // Reset button
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                    }, 1000);
                }, 500);
            });
        }
    } else {
        // For local development or other hosting, use full PDF generation
        new ResumeDownloader();
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ResumeDownloader, simpleDownload };
}