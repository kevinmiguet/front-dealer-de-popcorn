
function getLazyLoadIntersectionObserver(): IntersectionObserver {
    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target as HTMLImageElement;
                // data-src become src
                image.src = image.dataset.src;
                // remove lazy class
                image.classList.remove("lazy");
                // remove observer because image is now loaded
                observer.unobserve(image);
            }
        });
    });
}
const lazyLoadImages = () => {
    const lazyloadImages = document.querySelectorAll("img.lazy") as NodeListOf<HTMLImageElement>;
    // browser supports intersectionObserver
    if ("IntersectionObserver" in window) {
        const imageObserver = getLazyLoadIntersectionObserver();
        lazyloadImages.forEach(image => imageObserver.observe(image));
    } else {
        let lazyloadThrottleTimeout;
        const lazyloadOnEvent = () => {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }
            lazyloadThrottleTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                lazyloadImages.forEach(img => {
                    const imageIsInView = img.offsetTop < (window.innerHeight + scrollTop);
                    if (imageIsInView) {
                        // data-src become src
                        img.src = img.dataset.src;
                        // remove lazy class
                        img.classList.remove('lazy');
                    }
                });
                const areAllImagesLoaded = lazyloadImages.length == 0;
                if (areAllImagesLoaded) {
                    document.removeEventListener("scroll", lazyloadOnEvent);
                    window.removeEventListener("resize", lazyloadOnEvent);
                    window.removeEventListener("orientationChange", lazyloadOnEvent);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyloadOnEvent);
        window.addEventListener("resize", lazyloadOnEvent);
        window.addEventListener("orientationChange", lazyloadOnEvent);
    }
};
document.addEventListener("DOMContentLoaded", lazyLoadImages)