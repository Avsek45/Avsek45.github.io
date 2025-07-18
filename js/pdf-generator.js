// Professional PDF Resume Generator
class PDFResumeGenerator {
    constructor() {
        this.resumeData = {
            personal: {
                name: "Abhishek Maharjan",
                title: "Senior Release Engineer | DevOps Architect",
                subtitle: "AI Evangelist | AWS Certified | Kubernetes Expert | CI/CD Pipeline Specialist",
                email: "amaharjan08@gmail.com",
                phone: "(510) 859-5266",
                linkedin: "linkedin.com/in/abhishek-m-98421b26",
                location: "El Cerrito, CA"
            },
            summary: "Passionate AI evangelist orchestrating cutting-edge AI-powered DevOps workflows with 7+ years of automation mastery and 13+ years of technology innovation. Expert in scaling intelligent cloud infrastructure for 70M+ users across fintech, retail, and streaming platforms. Pioneering AI-driven automation, predictive scaling, and machine learning operations while specializing in zero-downtime deployments and Infrastructure as Code.",
            experience: [
                {
                    title: "Senior Release Engineer",
                    company: "Pluto TV (Paramount)",
                    duration: "December 2024 - Present (8 months)",
                    location: "United States",
                    achievements: [
                        "Pioneered AI-powered CI/CD pipelines supporting one of the world's largest free streaming platforms, integrating machine learning for predictive deployment optimization",
                        "Led infrastructure modernization with intelligent automation resulting in 60% faster deployment cycles and 40% reduction in incidents through AI-driven monitoring",
                        "Evangelized AI workflows across cross-functional teams, establishing MLOps practices and intelligent observability using Prometheus, Grafana, and custom ML models",
                        "Designed fault-tolerant systems with AI-driven scaling processing 100M+ daily streaming events with zero downtime using predictive analytics and automated response systems"
                    ]
                },
                {
                    title: "Release Engineer",
                    company: "Pluto TV",
                    duration: "November 2021 - December 2024 (3 years 2 months)",
                    location: "United States",
                    achievements: [
                        "Engineered enterprise-grade deployment pipelines for AWS infrastructure supporting 70M+ global users",
                        "Implemented Infrastructure as Code using Terraform and CloudFormation, reducing provisioning time by 80%",
                        "Orchestrated containerized microservices using Kubernetes and Helm, achieving 99.9% uptime SLA",
                        "Established comprehensive monitoring and alerting ecosystem with Prometheus, Grafana, and ELK stack",
                        "Optimized build processes and deployment workflows, reducing release cycles from days to hours"
                    ]
                },
                {
                    title: "DevOps Engineer",
                    company: "TRC Healthcare",
                    duration: "July 2020 - September 2021 (1 year 3 months)",
                    location: "Stockton, California",
                    achievements: [
                        "Designed and implemented robust CI/CD pipelines using Jenkins and TeamCity for healthcare applications",
                        "Managed multi-region AWS cloud infrastructure with automated disaster recovery capabilities",
                        "Deployed configuration management solutions using Ansible and Puppet across 100+ servers",
                        "Transformed deployment frequency from weekly to daily releases while maintaining quality standards"
                    ]
                },
                {
                    title: "Release Engineer",
                    company: "Green Dot Corporation",
                    duration: "August 2018 - March 2020 (1 year 8 months)",
                    location: "San Diego, California",
                    achievements: [
                        "Orchestrated complex release cycles for mission-critical financial services applications",
                        "Implemented automated testing frameworks reducing deployment failures by 70%",
                        "Managed production deployments across multiple environments with zero financial impact incidents"
                    ]
                }
            ],
            coreSkills: [
                "AWS", "GCP", "Kubernetes", "Helm", "Jenkins", "Terraform", 
                "Docker", "Python", "Bash", "Git/GitHub", "Groovy", "Datadog",
                "New Relic", "Grafana", "Prometheus", "OCI", "Ansible", 
                "Elasticsearch", "GitHub Actions", "GitLab CI/CD"
            ],
            aiSkills: [
                "AI-Powered DevOps Workflows", "Machine Learning Operations (MLOps)",
                "Intelligent Automation Systems", "Predictive Infrastructure Scaling",
                "AI-Driven Incident Response", "Intelligent Monitoring & Analytics"
            ],
            devopsSkills: [
                "CI/CD Pipeline Architecture", "Cloud Infrastructure Design",
                "Release Engineering", "Containerization & Orchestration",
                "Infrastructure as Code", "Observability & Performance"
            ],
            education: {
                degree: "Bachelor of Applied Science (BASc)",
                field: "Computer Science",
                school: "University of California, Santa Cruz",
                duration: "2015 - 2019"
            },
            certifications: [
                "AWS Certified Solutions Architect",
                "HashiCorp Certified Terraform Associate",
                "Certified Jenkins Engineer (2017)",
                "Jenkins & Build Automation",
                "Administering Artifactory"
            ]
        };
    }

    async generatePDF() {
        try {
            // Check if jsPDF is available
            if (typeof window.jsPDF === 'undefined') {
                throw new Error('jsPDF library not loaded');
            }

            const { jsPDF } = window.jsPDF;
            const doc = new jsPDF('portrait', 'mm', 'a4');
            
            // Set up colors
            const primaryColor = [59, 130, 246]; // Blue
            const darkColor = [15, 23, 42]; // Dark blue
            const textColor = [51, 51, 51]; // Dark gray
            const lightGray = [128, 128, 128]; // Light gray

            let yPosition = 20;
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 20;
            const contentWidth = pageWidth - (margin * 2);

            // Helper function to add text with word wrapping
            const addWrappedText = (text, x, y, maxWidth, fontSize = 10, color = textColor) => {
                doc.setFontSize(fontSize);
                doc.setTextColor(...color);
                const lines = doc.splitTextToSize(text, maxWidth);
                doc.text(lines, x, y);
                return y + (lines.length * (fontSize * 0.4));
            };

            // Header Section
            doc.setFillColor(...primaryColor);
            doc.rect(0, 0, pageWidth, 40, 'F');
            
            // Name
            doc.setFontSize(24);
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.text(this.resumeData.personal.name, margin, 25);
            
            // Title
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.text(this.resumeData.personal.title, margin, 32);

            yPosition = 50;

            // Contact Information
            doc.setFontSize(10);
            doc.setTextColor(...textColor);
            const contactInfo = `${this.resumeData.personal.email} | ${this.resumeData.personal.phone} | ${this.resumeData.personal.linkedin} | ${this.resumeData.personal.location}`;
            doc.text(contactInfo, margin, yPosition);
            yPosition += 8;

            // Subtitle
            doc.setFontSize(11);
            doc.setTextColor(...primaryColor);
            doc.setFont('helvetica', 'bold');
            yPosition = addWrappedText(this.resumeData.personal.subtitle, margin, yPosition, contentWidth, 11, primaryColor);
            yPosition += 5;

            // Professional Summary
            this.addSection(doc, "PROFESSIONAL SUMMARY", yPosition, primaryColor, darkColor);
            yPosition += 15;
            
            doc.setFont('helvetica', 'normal');
            yPosition = addWrappedText(this.resumeData.summary, margin, yPosition, contentWidth, 10);
            yPosition += 10;

            // Core Technologies
            yPosition = this.addSection(doc, "CORE TECHNOLOGIES", yPosition, primaryColor, darkColor);
            yPosition += 15;
            
            const skillsText = this.resumeData.coreSkills.join(' • ');
            yPosition = addWrappedText(skillsText, margin, yPosition, contentWidth, 10);
            yPosition += 10;

            // AI & Automation Evangelism
            yPosition = this.addSection(doc, "AI & AUTOMATION EVANGELISM", yPosition, primaryColor, darkColor);
            yPosition += 15;
            
            const aiSkillsText = this.resumeData.aiSkills.join(' • ');
            yPosition = addWrappedText(aiSkillsText, margin, yPosition, contentWidth, 10);
            yPosition += 10;

            // DevOps Excellence
            yPosition = this.addSection(doc, "DEVOPS EXCELLENCE", yPosition, primaryColor, darkColor);
            yPosition += 15;
            
            const devopsSkillsText = this.resumeData.devopsSkills.join(' • ');
            yPosition = addWrappedText(devopsSkillsText, margin, yPosition, contentWidth, 10);
            yPosition += 15;

            // Professional Experience
            yPosition = this.addSection(doc, "PROFESSIONAL EXPERIENCE", yPosition, primaryColor, darkColor);
            yPosition += 15;

            for (const job of this.resumeData.experience) {
                // Check if we need a new page
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                }

                // Job title and company
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...darkColor);
                doc.text(`${job.title} | ${job.company}`, margin, yPosition);
                yPosition += 6;

                // Duration and location
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...lightGray);
                doc.text(`${job.duration} | ${job.location}`, margin, yPosition);
                yPosition += 8;

                // Achievements
                doc.setTextColor(...textColor);
                for (const achievement of job.achievements) {
                    doc.text('•', margin, yPosition);
                    yPosition = addWrappedText(achievement, margin + 5, yPosition, contentWidth - 5, 10);
                    yPosition += 2;
                }
                yPosition += 5;
            }

            // Education
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 20;
            }

            yPosition = this.addSection(doc, "EDUCATION", yPosition, primaryColor, darkColor);
            yPosition += 15;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...darkColor);
            doc.text(`${this.resumeData.education.degree}, ${this.resumeData.education.field}`, margin, yPosition);
            yPosition += 6;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...textColor);
            doc.text(`${this.resumeData.education.school} | ${this.resumeData.education.duration}`, margin, yPosition);
            yPosition += 15;

            // Certifications
            yPosition = this.addSection(doc, "CERTIFICATIONS", yPosition, primaryColor, darkColor);
            yPosition += 15;

            for (const cert of this.resumeData.certifications) {
                doc.setFontSize(10);
                doc.setTextColor(...textColor);
                doc.text('•', margin, yPosition);
                doc.text(cert, margin + 5, yPosition);
                yPosition += 6;
            }

            // Save the PDF
            doc.save('Abhishek_Maharjan_Resume.pdf');
            return true;

        } catch (error) {
            console.error('PDF generation failed:', error);
            throw error;
        }
    }

    addSection(doc, title, yPosition, primaryColor, darkColor) {
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        
        // Section header background
        doc.setFillColor(...primaryColor);
        doc.rect(margin - 2, yPosition - 8, pageWidth - (margin * 2) + 4, 12, 'F');
        
        // Section title
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(title, margin, yPosition - 1);
        
        return yPosition;
    }
}

// Initialize PDF generator
document.addEventListener('DOMContentLoaded', function() {
    const generator = new PDFResumeGenerator();
    
    // Override the download button functionality
    const downloadBtn = document.getElementById('download-resume');
    if (downloadBtn) {
        // Remove existing event listeners
        downloadBtn.onclick = null;
        
        downloadBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            
            const originalText = this.innerHTML;
            
            try {
                // Show loading state
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
                this.disabled = true;
                
                // Wait a moment for UI update
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Generate PDF
                await generator.generatePDF();
                
                // Success state
                this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                this.disabled = false;
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
                
            } catch (error) {
                console.error('PDF generation failed:', error);
                
                // Error state
                this.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
                this.disabled = false;
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 3000);
                
                // Fallback to print
                window.print();
            }
        });
    }
});