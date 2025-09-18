 // Mobile menu toggle
            document.querySelector('.menu-toggle').addEventListener('click', function() {
                document.querySelector('nav ul').classList.toggle('show');
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking
                    document.querySelector('nav ul').classList.remove('show');
                });
            });
            
            // Animate skill bars when they come into view
            const skillBars = document.querySelectorAll('.skill-level');
            
            function animateSkillBars() {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
            
            // Use Intersection Observer to trigger animation when skills section is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(document.querySelector('.skills'));

             // Simple animation to make skill bars fill on page load
        document.addEventListener('DOMContentLoaded', function() {
            const skillBars = document.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        });

    // EmailJS integration for contact form
  (function() {
    emailjs.init("JVgrnpBaTcgnIYZ0igbm9"); // from EmailJS dashboard
  })();

  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('service_0zu3rmx', 'template_fyutivh', this)
      .then(() => {
  alert("Message Sent Successfully!");
  document.getElementById('contact-form').reset(); // clears form
}, (error) => {
  alert("Failed to send message. Error: " + error);
});
  });
       