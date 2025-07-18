function generatePDF() {
    var element = document.getElementById('resume');
    var btn = document.getElementById('download-resume');
    
    if (!element) {
        console.error('Resume element not found');
        return;
    }
    
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        btn.disabled = true;
    }
    
    // Hide particles during PDF generation
    const particles = document.getElementById('particles');
    if (particles) {
        particles.style.display = 'none';
    }
    
    var opt = {
        margin: 0.5,
        filename: 'Abhishek_Maharjan_Resume.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#0f172a'
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate PDF with error handling
    html2pdf().set(opt).from(element).save().then(() => {
        // Success
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            btn.disabled = false;
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-download"></i> Download Resume';
            }, 2000);
        }
        
        // Restore particles
        if (particles) {
            particles.style.display = 'block';
        }
    }).catch((error) => {
        console.error('PDF generation failed:', error);
        
        // Error state
        if (btn) {
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
            btn.disabled = false;
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-download"></i> Download Resume';
            }, 3000);
        }
        
        // Restore particles
        if (particles) {
            particles.style.display = 'block';
        }
        
        // Fallback to print
        window.print();
    });
}

// Initialize download button
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            generatePDF();
        });
    }
});
