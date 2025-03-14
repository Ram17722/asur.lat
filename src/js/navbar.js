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
    const blogsHref = `${basePath}../content/blogs.html`;
    const projectsHref = `${basePath}../content/projects.html`;
    const contactHref = `${basePath}../content/contact.html`;
    
    // The navbar markup with dynamic href values and a loading bar at the top.
    const navbarMarkup = `
      <div id="loadingBar" style="position: fixed; top: 0; left: 0; height: 3px; width: 0%; background: #c85600; z-index: 200;"></div>
      <div class="menu-icon" id="menuIcon" onclick="openMenu()">&#9776;</div>
      <nav class="navbar">
        <div class="navbar-content">
            <a href="${homeHref}">Home</a>
            <a href="${blogsHref}">Blogs</a>
            <a href="${projectsHref}">Projects</a>
            <a href="${contactHref}">Contact</a>
        </div>
      </nav>
      
      <div class="mobile-menu" id="mobileMenu">
        <div class="close-btn" onclick="closeMenu()">&times;</div>
        <a href="${homeHref}" onclick="closeMenu()">Home</a>
        <a href="${blogsHref}" onclick="closeMenu()">Blogs</a>
        <a href="${projectsHref}" onclick="closeMenu()">Projects</a>
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

    // Inject the CSS styles for the navbar
    const styles = `
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
            transition: all 0.3s ease;
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
            transition: color 0.3s ease;
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
})();
