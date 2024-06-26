gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis(
    {
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 2,
    }
)
lenis.on('scroll', (e) => {
    console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

const tl = gsap.timeline(
    {
        scrollTrigger: {
            trigger: ".wrapp",
            start: "top center",
            end: "bottom bottom",
            scrub: 2,
            markers: true,
        }
    }
)
tl.from('.gallery__item', {
    opacity: 0,
    y: 100,
    stagger: 0.2,
})

Fancybox.bind('[data-fancybox="gallery"]', {
    dragToClose: false,

    closeButton: "top",

    Image: {
        zoom: false,
    },

    on: {
        initCarousel: (fancybox) => {
            const slide = fancybox.Carousel.slides[fancybox.Carousel.page];

            fancybox.$container.style.setProperty(
                "--bg-image",
                `url("${slide.$thumb.src}")`
            );
        },
        "Carousel.change": (fancybox, carousel, to, from) => {
            const slide = carousel.slides[to];

            fancybox.$container.style.setProperty(
                "--bg-image",
                `url("${slide.$thumb.src}")`
            );
        },
    },
});

