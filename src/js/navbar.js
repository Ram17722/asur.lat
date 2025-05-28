(function() {
    // Determine the base URL for the website
    const getBasePath = () => {
        const scriptTags = document.getElementsByTagName('script');
        for (let tag of scriptTags) {
            if (tag.src.includes('navbar.js')) {
                return tag.src.split('navbar.js')[0];
            }
        }
        return '/';
    };

    const basePath = getBasePath();
    const homeHref = `${basePath}../../index.html`;
    const blogsHref = `${basePath}../content/blog.html`;

    const contactHref = `${basePath}../content/contact.html`;
    
    // Update the navbarMarkup with the menu icon
    const navbarMarkup = `
        <div id="loadingBar" style="position: fixed; top: 0; left: 0; height: 3px; width: 0%; background: #c85600; z-index: 200;"></div>
        <button id="lightModeToggle" class="theme-toggle">
            <i class="fas fa-sun"></i>
        </button>
        <div class="menu-icon" id="menuIcon" onclick="openMenu()">&#9776;</div>
        <nav class="navbar">
            <div class="navbar-content">
                <a href="${homeHref}">Home</a>
                <a href="${blogsHref}">Blog</a>
                <a href="${contactHref}">Contact</a>
            </div>
        </nav>
        
        <div class="mobile-menu" id="mobileMenu">
            <div class="close-btn" onclick="closeMenu()">&times;</div>
            <a href="${homeHref}" onclick="closeMenu()">Home</a>
            <a href="${blogsHref}" onclick="closeMenu()">Blog</a>
            <a href="${contactHref}" onclick="closeMenu()">Contact</a>
        </div>
    `;
    
    // Inject the navbar markup into the placeholder element.
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarMarkup;
    } else {
        console.error('Navbar container element not found. Please add a <div id="navbar-container"></div> in your HTML.');
    }
    
    // Expose the openMenu and closeMenu functions to the global scope.
    window.openMenu = function() {
        document.getElementById('mobileMenu').style.right = '0';
    };
    
    window.closeMenu = function() {
        document.getElementById('mobileMenu').style.right = '-250px';
    };
    
    // Function to start the loading bar animation.
    function startLoadingBar() {
        const loadingBar = document.getElementById('loadingBar');
        if (loadingBar) {
            loadingBar.style.transition = 'none';
            loadingBar.style.width = '0%';
            void loadingBar.offsetWidth;
            loadingBar.style.transition = 'width 0.5s ease';
            loadingBar.style.width = '80%';
        }
    }

    // Function to complete and reset the loading bar
    function completeLoadingBar() {
        const loadingBar = document.getElementById('loadingBar');
        if (loadingBar) {
            loadingBar.style.transition = 'width 0.2s ease';
            loadingBar.style.width = '100%';
            setTimeout(() => {
                loadingBar.style.transition = 'none';
                loadingBar.style.width = '0%';
            }, 200);
        }
    }
    
    // Attach click listeners to all internal links within the navbar container.
    const navbarLinks = document.querySelectorAll('#navbar-container a[href]:not([href^="#"])');
    navbarLinks.forEach(link => {
        link.addEventListener('click', startLoadingBar);
    });

    // Handle page load and back/forward navigation
    window.addEventListener('pageshow', (event) => {
        // If navigating back from browser cache (bfcache)
        if (event.persisted) {
            completeLoadingBar();
        }
    });
    
    window.addEventListener('beforeunload', startLoadingBar);

    // Update the styles constant
    const styles = `
        .theme-toggle {
            position: fixed;
            top: 15px;
            left: 15px;
            background: rgba(51, 51, 51, 0.7);
            padding: 8px;
            border-radius: 50%;
            color: #fff;
            cursor: pointer;
            font-size: 1.4rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 1000;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
     
        }

        .theme-toggle:hover {
            transform: rotate(15deg);
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
            background: rgba(51, 51, 51, 0.7);
            padding: 10px 2.5%;
            border-radius: 20px;
            width: auto;
        }

        .navbar-content {
            display: flex;
            gap: 20px;
        }

        .navbar-content a {
            color: #fff;
            text-decoration: none;
            font-size: 1.2rem;
            text-transform: uppercase;
        }

        .navbar-content a:hover {
            color: var(--main-color);
        }

        .menu-icon {
            display: none;
            font-size: 2rem;
            cursor: pointer;
            color: #fff;
            position: fixed;
            top: 15px;
            right: 20px;
            z-index: 101;
            background: none;
            border: none;
            outline: none;
        }

        .mobile-menu {
            position: fixed;
            top: 0;
            right: -250px;
            width: 250px;
            height: 100%;
            background: rgba(51, 51, 51, 0.9);
            transition: right 0.3s ease;
            padding-top: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 102;
        }

        .mobile-menu a {
            color: white;
            text-decoration: none;
            font-size: 1.5rem;
            margin: 15px 0;
        }

        .close-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2rem;
            cursor: pointer;
            color: white;
        }

        @media (max-width: 768px) {
            .navbar {
                display: none;
            }
            .menu-icon {
                display: block;
            }
        }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    
    // Update light mode styles
    const lightModeStyles = `
        body.light-mode .navbar {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(8px);
            border: 1px solid var(--glass-border);
            box-shadow: 0 4px 6px -1px var(--glass-shadow);
        }

        body.light-mode .navbar-content a {
            color: var(--light-text);
        }

        body.light-mode .navbar-content a:hover {
            color: var(--light-main);
        }

        body.light-mode .theme-toggle {
            background: rgba(255, 255, 255, 0.9);
            color: var(--light-text);
            border: 1px solid rgba(0, 0, 0, 0.1);
        }

        body.light-mode .theme-toggle:hover {
            background: rgba(255, 255, 255, 1);
        }

        body.light-mode .menu-icon {
            color: var(--light-text);
        }

        body.light-mode .mobile-menu {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        }

        body.light-mode .mobile-menu a,
        body.light-mode .close-btn {
            color: var(--light-text);
        }

        body.light-mode .mobile-menu a:hover {
            color: var(--light-main);
        }
    `;

    const lightModeStyleSheet = document.createElement("style");
    lightModeStyleSheet.type = "text/css";
    lightModeStyleSheet.innerText = lightModeStyles;
    document.head.appendChild(lightModeStyleSheet);
    
    // Add theme toggle functionality
    function initThemeToggle() {
        const toggle = document.getElementById('lightModeToggle');
        const body = document.body;
        const icon = toggle.querySelector('i');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
        }

        toggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Initialize theme toggle after DOM content is loaded
    document.addEventListener('DOMContentLoaded', initThemeToggle);
})();