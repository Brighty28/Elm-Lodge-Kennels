// Elm Lodge Kennels - Site JavaScript

(function () {
    'use strict';

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            siteNav.classList.toggle('active');
        });

        // Close nav when clicking a link
        siteNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                siteNav.classList.remove('active');
            });
        });
    }

    // Sticky Header Shadow on Scroll
    const header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Close mobile nav on outside click
    document.addEventListener('click', function (e) {
        if (siteNav && siteNav.classList.contains('active')) {
            if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                siteNav.classList.remove('active');
            }
        }
    });
})();
