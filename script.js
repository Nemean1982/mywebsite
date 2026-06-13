document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SYSTEM BOOT PRELOADER
       ========================================================================== */
    const bootLines = [
        "hardik@trivedi-cloud-host:~$ dotnet run --project Portfolio.csproj",
        "  Setting up environment contexts... [OK]",
        "  Loading enterprise modules...",
        "  -> SAMLAuthService.dll loaded.",
        "  -> AzureEventHubAuditor.dll loaded.",
        "  -> VMwareBrokerService.dll loaded.",
        "  Compiling schemas and DB validators... [OK]",
        "  Initializing health probe endpoints... [OK]",
        "  Starting portfolio thread... [OK]",
        "  Status: Principal Systems Engineer Online."
    ];

    const preloaderBody = document.getElementById('preloader-body');
    const preloader = document.getElementById('preloader');
    let bootLineIndex = 0;

    function typeBootLine() {
        if (bootLineIndex < bootLines.length) {
            const p = document.createElement('p');
            const line = bootLines[bootLineIndex];

            if (line.startsWith('hardik@')) {
                p.innerHTML = `<span style="color:#00f5a0;font-weight:600;">hardik@trivedi-cloud-host</span>:<span style="color:#7c3aed;">~$</span> <span style="color:#fff;">${line.substring(29)}</span>`;
            } else if (line.includes('[OK]')) {
                p.innerHTML = line.replace('[OK]', '<span style="color:#00f5a0;font-weight:600;">[OK]</span>');
                p.style.color = '#9ca3af';
            } else if (line.includes('->')) {
                p.innerHTML = line.replace('->', '<span style="color:#7c3aed;">&gt;</span>');
                p.style.color = '#d8b4fe';
            } else {
                p.textContent = line;
                p.style.color = '#9ca3af';
            }

            preloaderBody.appendChild(p);
            bootLineIndex++;

            // Dynamic line printing speed
            setTimeout(typeBootLine, Math.random() * 150 + 100);
        } else {
            // Fade out preloader
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflowY = 'auto'; // Unlock scroll
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Trigger initial animations
                    document.querySelector('.hero-content').classList.add('active');
                }, 800);
            }, 600);
        }
    }

    // Initialize boot sequence
    document.body.style.overflowY = 'hidden';
    setTimeout(typeBootLine, 400);

    /* ==========================================================================
       2. INTERACTIVE CUSTOM CURSOR
       ========================================================================== */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const cursorText = cursorOutline.querySelector('.cursor-text');

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        // Outer ring trails with a smooth spring lag
        cursorOutline.animate({
            left: `${mouseX}px`,
            top: `${mouseY}px`
        }, { duration: 400, fill: "forwards" });
    });

    // Expand cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .glass-card, .tab-btn, .skill-card, .timeline-header');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
        });
        item.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
        });
    });

    // Custom Section-Based Cursor Labels
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        sec.addEventListener('mouseenter', () => {
            if (sec.id === 'projects') {
                cursorText.textContent = 'View Flow';
                cursorOutline.classList.add('cursor-text-active');
            } else if (sec.id === 'experience') {
                cursorText.textContent = 'Expand';
                cursorOutline.classList.add('cursor-text-active');
            } else if (sec.id === 'contact') {
                cursorText.textContent = 'Talk';
                cursorOutline.classList.add('cursor-text-active');
            } else {
                cursorOutline.classList.remove('cursor-text-active');
                cursorText.textContent = '';
            }
        });
        sec.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-text-active');
            cursorText.textContent = '';
        });
    });

    /* ==========================================================================
       3. MAGNETIC BUTTONS PHYSICS
       ========================================================================== */
    const magneticItems = document.querySelectorAll('.btn, .logo, .theme-toggle-btn, .social-links a, .nav-links a');
    magneticItems.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            // Calculate center of element
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move item 35% towards cursor
            elem.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0px, 0px)';
        });
    });

    /* ==========================================================================
       4. TYPING ROLE TEXT
       ========================================================================== */
    const typedRole = document.querySelector('.typed-role');
    const roles = [
        "scalable cloud systems.",
        "secure enterprise APIs.",
        "robust system architectures.",
        "high-performing tech teams."
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeRoles() {
        const currentText = roles[roleIdx];
        if (isDeleting) {
            typedRole.textContent = currentText.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 40; // delete faster
        } else {
            typedRole.textContent = currentText.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIdx === currentText.length) {
            typeSpeed = 1600; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typeSpeed = 500; // Brief pause before typing next
        }

        setTimeout(typeRoles, typeSpeed);
    }
    setTimeout(typeRoles, 1500);

    /* ==========================================================================
       5. INTERACTIVE C# IDE CODE TOOLTIP
       ========================================================================== */
    const codeTips = {
        mentoring: {
            title: "Team Leadership & Appraisals",
            desc: "Mentors teams of 8+ engineers across FSP Consulting. Manages 1:1 goals, coordinates releases concurrently, and aligns techno-functional frameworks."
        },
        deploy: {
            title: "Zero-Downtime Releases",
            desc: "Automates multi-tenant environments using Infrastructure as Code (Bicep) and manages robust build pipelines on GitHub Actions."
        },
        saml: {
            title: "SAML Gateway SSO Middleware",
            desc: "Coded C# authorization policies, custom token inspectors, and automatic ticket renewal handlers under Windows Identity Foundation (WIF)."
        },
        audit: {
            title: "Azure Event Hub Logging Stream",
            desc: "Designed highly concurrent asynchronous queues, taking database load off SQL Server by caching and logging JSON streams asynchronously."
        },
        dbpolicy: {
            title: "Automated DB Action Validator",
            desc: "Built a custom C# static analyzer executing in GitHub Actions to check database schemas and comment query health directly back to PR reviewers."
        }
    };

    const codeTooltip = document.getElementById('code-tooltip');
    const tooltipTitle = document.getElementById('tooltip-title');
    const tooltipDesc = document.getElementById('tooltip-desc');
    const codeTriggers = document.querySelectorAll('.field[data-tip], .func[data-tip]');

    codeTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', (e) => {
            const key = trigger.getAttribute('data-tip');
            if (codeTips[key]) {
                tooltipTitle.style.opacity = '0';
                tooltipDesc.style.opacity = '0';
                setTimeout(() => {
                    tooltipTitle.textContent = codeTips[key].title;
                    tooltipDesc.textContent = codeTips[key].desc;
                    tooltipTitle.style.opacity = '1';
                    tooltipDesc.style.opacity = '1';
                }, 120);
                codeTooltip.style.borderColor = 'var(--accent-mint)';
                codeTooltip.style.boxShadow = '0 8px 20px var(--accent-glow-mint)';
            }
        });
        
        trigger.addEventListener('mouseleave', () => {
            tooltipTitle.style.opacity = '0';
            tooltipDesc.style.opacity = '0';
            setTimeout(() => {
                tooltipTitle.textContent = "Interactive Code";
                tooltipDesc.textContent = "Hover over highlighted lines in the IDE code to explore Hardik's responsibilities and architectural highlights.";
                tooltipTitle.style.opacity = '1';
                tooltipDesc.style.opacity = '1';
            }, 120);
            codeTooltip.style.borderColor = 'var(--card-border)';
            codeTooltip.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    });

    /* ==========================================================================
       6. SCROLL REVEALS & VALUE BARS
       ========================================================================== */
    // Dynamic Stagger Delay Injector
    document.querySelectorAll('.stagger-grid, .stagger-list').forEach(parent => {
        const children = parent.querySelectorAll('.reveal');
        children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.08}s`;
        });
    });

    const reveals = document.querySelectorAll('.reveal');
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate stats value bar inside about-stats reveal card
                if (entry.target.classList.contains('about-stats')) {
                    const bars = entry.target.querySelectorAll('.val-fill');
                    bars.forEach(bar => {
                        const targetWidth = bar.style.width || '100%';
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 150);
                    });
                }
                
                // Animate numerical metrics in Hero
                if (entry.target.classList.contains('hero-content')) {
                    document.querySelectorAll('.metric-number').forEach(num => {
                        const target = parseInt(num.getAttribute('data-target'), 10);
                        let current = 0;
                        const duration = 1500;
                        const stepTime = Math.abs(Math.floor(duration / target));
                        const timer = setInterval(() => {
                            current += 1;
                            num.textContent = current;
                            if (current >= target) {
                                  clearInterval(timer);
                                  num.textContent = target;
                            }
                        }, stepTime);
                    });
                }
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       7. COLLAPSIBLE EXPERIENCE TIMELINE
       ========================================================================== */
    const timelineHeaders = document.querySelectorAll('.timeline-header');
    timelineHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const bodyId = header.getAttribute('data-toggle');
            const body = document.getElementById(bodyId);
            const isOpen = body.classList.contains('open');

            // Close others and reset delays
            document.querySelectorAll('.collapse-content').forEach(c => {
                c.classList.remove('open');
                c.querySelectorAll('ul > li').forEach(li => li.style.transitionDelay = '0s');
            });
            document.querySelectorAll('.timeline-header').forEach(h => h.classList.remove('active'));

            if (!isOpen) {
                body.classList.add('open');
                header.classList.add('active');
                
                // Inject staggered transition-delay on expand
                const listItems = body.querySelectorAll('ul > li');
                listItems.forEach((li, index) => {
                    li.style.transitionDelay = `${index * 0.08}s`;
                });
            }
        });
    });
    
    // Auto expand first experience card
    if (timelineHeaders.length > 0) {
        timelineHeaders[0].click();
    }

    /* ==========================================================================
       8. PROJECTS SHOWCASE TABS & SVG ANIMATION
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.showcase-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const activePane = document.getElementById(targetId);
            activePane.classList.add('active');

            // Force redraw SVG to retrigger animations
            const svg = activePane.querySelector('.arch-svg');
            if (svg) {
                const newSvg = svg.cloneNode(true);
                svg.parentNode.replaceChild(newSvg, svg);
            }
        });
    });

    /* ==========================================================================
       9. TECHNICAL SKILLS CATEGORY FILTERING & TAB FOCUS
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            skillCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.classList.remove('dimmed');
                } else {
                    card.classList.add('dimmed');
                }
            });
        });
    });



    /* ==========================================================================
       11. NAV MOBILE MENU TOGGLING
       ========================================================================== */
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Close mobile nav on links select
    const navItems = document.querySelectorAll('.nav-item-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.querySelector('i').classList.replace('bx-x', 'bx-menu');
        });
    });

    /* ==========================================================================
       11. UNIFIED SCROLL INTERACTIONS & PARALLAX
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const scrollProgressBar = document.getElementById('scroll-progress');
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    const blob3 = document.querySelector('.blob-3');
    const navLinksList = document.querySelectorAll('.nav-links a');
    const scrollSections = document.querySelectorAll('section');

    let lastScrollY = window.scrollY;
    let scrollSpeedTimer;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // A. Toggle Navbar Scroll State
        if (currentScrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // B. Update Scroll Progress Bar
        if (scrollProgressBar && docHeight > 0) {
            const scrolledPercent = (currentScrollY / docHeight) * 100;
            scrollProgressBar.style.width = `${scrolledPercent}%`;
        }
        
        // C. Parallax Background Mesh Blobs
        if (blob1) blob1.style.transform = `translateY(${currentScrollY * 0.12}px)`;
        if (blob2) blob2.style.transform = `translateY(${currentScrollY * -0.08}px)`;
        if (blob3) blob3.style.transform = `translateY(${currentScrollY * 0.04}px) scale(${1 + currentScrollY * 0.00012})`;
        
        // D. Custom Cursor Velocity Scale Stretch
        const diff = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        
        if (cursorOutline) {
            const cursorScale = 1 + Math.min(diff * 0.04, 0.4);
            cursorOutline.style.setProperty('--cursor-scale', cursorScale);
            
            clearTimeout(scrollSpeedTimer);
            scrollSpeedTimer = setTimeout(() => {
                cursorOutline.style.setProperty('--cursor-scale', '1');
            }, 80);
        }
        
        // E. Scroll Spy Navbar Section Highlighting
        let activeSectionId = '';
        scrollSections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.clientHeight;
            if (currentScrollY >= (secTop - 160)) {
                activeSectionId = sec.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.slice(1);
                if (targetId === activeSectionId || (activeSectionId === 'home' && targetId === '')) {
                    link.classList.add('active');
                }
            }
        });

        // F. Update Scroll Down Indicator Opacity
        const scrollIndicator = document.querySelector('.scroll-indicator-container');
        if (scrollIndicator) {
            const opacity = Math.max(1 - currentScrollY / 300, 0);
            scrollIndicator.style.opacity = opacity;
            scrollIndicator.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
        }

        // G. Experience Timeline Line Filling
        const experienceSec = document.getElementById('experience');
        const timelineLine = document.querySelector('.timeline-line');
        if (experienceSec && timelineLine) {
            const rect = experienceSec.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            if (rect.top < viewHeight && rect.bottom > 0) {
                const scrolledPast = viewHeight - rect.top;
                const totalHeight = rect.height;
                const pct = Math.min(Math.max(scrolledPast / (totalHeight + viewHeight * 0.1), 0), 1);
                timelineLine.style.setProperty('--timeline-scroll-pct', pct);
            }
        }
    });

    /* ==========================================================================
       12. PERSISTENT LIGHT & DARK THEMES
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Load theme setting (defaults to 'dark')
    let savedTheme = localStorage.getItem('portfolio-theme');
    if (!savedTheme) {
        savedTheme = 'dark';
        localStorage.setItem('portfolio-theme', 'dark');
    }

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        let currentTheme = 'dark';

        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.replace('bx-sun', 'bx-moon');
            currentTheme = 'light';
        } else {
            themeIcon.classList.replace('bx-moon', 'bx-sun');
        }
        localStorage.setItem('portfolio-theme', currentTheme);
    });

    /* ==========================================================================
       13. BACK TO TOP BUTTON
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       14. 3D TILT EFFECT & RADIAL GLARE FOR CARDS
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.glass-card, .skill-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Subtle rotation angles (max 5.5 degrees)
            const rotateX = ((centerY - y) / centerY) * 5.5; 
            const rotateY = ((x - centerX) / centerX) * 5.5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            
            // Dynamic glare placement
            let glare = card.querySelector('.card-glare');
            if (!glare) {
                glare = document.createElement('div');
                glare.className = 'card-glare';
                card.appendChild(glare);
            }
            glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = ''; // Fallback to stylesheet layout (reveal active styles)
            const glare = card.querySelector('.card-glare');
            if (glare) glare.style.background = 'transparent';
        });
    });
});
