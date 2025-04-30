            // Navigasi mobile toggle
            document.querySelector('.hamburger').addEventListener('click', function() {
                document.querySelector('.nav-links').classList.toggle('show');
            });

        // Smooth scroll untuk navigasi
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                // Menutup menu mobile setelah klik
                document.querySelector('.nav-links').classList.remove('show');
            });
        });

        // Aktifkan link navigasi berdasarkan scroll
        window.addEventListener('scroll', function() {
            let sections = document.querySelectorAll('section');
            let navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Ngemebed Google Form
        document.getElementById('google-form').src = "https://docs.google.com/forms/d/e/1FAIpQLSdHk_bV_DJMW0GKG3WsuzAlg4tUIOTNEt3FT54yqr8kpbnhJw/viewform?embedded=true";

        // Toggle accordion FAQ-nya
        document.querySelectorAll('.accordion-header').forEach(button => {
            button.addEventListener('click', () => {
                const accordionItem = button.parentElement;
                
                // Toggle active class untuk item yang diklik
                accordionItem.classList.toggle('active');
                
                // Tutup accordion item lain
                document.querySelectorAll('.accordion-item').forEach(item => {
                    if (item !== accordionItem) {
                        item.classList.remove('active');
                    }
                });
            });
        });

        // Track Ticket Simulation
        document.getElementById('ticket-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validasi nomor tiket
            const ticketNumber = document.getElementById('ticket-number').value;
            const ticketRegex = /^ECO-\d{5}$/;
            
            if (!ticketRegex.test(ticketNumber)) {
                document.getElementById('ticket-error').style.display = 'block';
                hideAllTicketResults();
                return;
            }
            
            document.getElementById('ticket-error').style.display = 'none';
            
            // Simulasi status tiket dengan hasil acak
            hideAllTicketResults();
            
            // Mendapatkan status acak berdasarkan nomor tiket
            const randomNum = getNumberFromTicket(ticketNumber);
            const status = getStatusByNumber(randomNum);
            
            // Menampilkan hasil status
            document.getElementById(status).style.display = 'block';
        });
        
        function hideAllTicketResults() {
            document.querySelectorAll('.ticket-result').forEach(result => {
                result.style.display = 'none';
            });
        }
        
        function getNumberFromTicket(ticket) {
            const matches = ticket.match(/\d+/);
            if (matches && matches.length > 0) {
                return parseInt(matches[0]);
            }
            return 0;
        }
        
        function getStatusByNumber(num) {
            // Menentukan status berdasarkan angka
            const lastDigit = num % 10;
            
            if (lastDigit >= 0 && lastDigit <= 3) {
                return 'ticket-processing';
            } else if (lastDigit >= 4 && lastDigit <= 6) {
                return 'ticket-completed';
            } else if (lastDigit >= 7 && lastDigit <= 8) {
                return 'ticket-waiting';
            } else {
                return 'ticket-not-found';
            }
        }
