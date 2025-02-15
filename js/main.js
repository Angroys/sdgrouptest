window.addEventListener('load', function () {
    let body = this.document.querySelector("body");
    if (/Edge/.test(navigator.userAgent))
        body.classList.add("isEdge");
    
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var viwe_offset = window.innerWidth > 425 ? 240 : 0;

    function animateLoad(element, animation, callback) {
        let node = element,
            scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

        if (scrollTop - viwe_offset >= node.offsetTop - window.innerHeight)
            if (node.className.indexOf("animated") == -1)
                animateCSS(node, animation, callback);
    }

    const animate_onload = document.querySelectorAll('.should_animate');
    animate_onload.forEach(element => {
        if (scrollTop >= element.offsetTop - window.innerHeight)
            animateLoad(element, element.getAttribute("animate-style"));
    });

    window.onscroll = () => {
        let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        toogleNav(scrollTop);
        animate_onload.forEach(element => {
            animateLoad(element, "fadeIn");
        });
        startCount(scrollTop + viwe_offset + 200);  // Call startCount when scrolling
    }

    function imageExists(image_url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
    }

    let setImgSrc = function (modal, trigger) {
        let imgSrc = trigger.querySelector("img").getAttribute("src"),
            modalSrc = imgSrc.replace('assets/slider/', 'assets/slider/modal/');
        modal.querySelector("img").setAttribute("src", imgSrc);
        if (imageExists(modalSrc)) {
            modal.querySelector("img").setAttribute("src", modalSrc);
        }
    },
        removeImgSrc = (modal) => {
            modal.querySelector("img").setAttribute("src", '');
        },
        keySlide = function (event) {
            let carousel = M.Carousel.getInstance(document.querySelector("#portofolio_slider.carousel"));
            if (event.which == 39) {
                slideModalNext(carousel);
            } else if (event.which == 37) {
                slideModalPrev(carousel);
            }
        }

    var parallaxElems = document.querySelectorAll('.parallax'),
        sliderElems = document.querySelectorAll('.carousel'),
        sidenavElems = document.querySelectorAll('.sidenav'),
        modalElems = document.querySelectorAll('.modal'),
        sidenavOptions = {
            "edge": 'right'
        },
        carouselOptions = {
            "fullWidth": true,
            "indicators": false,
            "numVisible": 8
        },
        parallaxOptions = {
            "responsiveThreshold": 425
        },
        carousel_item = null,
        modalOptions = {
            "onOpenStart": (modal, trigger) => {
                carousel_item = trigger;
                setImgSrc(modal, carousel_item)
                trigger.classList.add("modal_opened");
                window.addEventListener("keydown", function () {
                    keySlide(this.event)
                });
            },
            "startingTop": "1%",
            "endingTop": "2.5%",
            "onCloseEnd": (modal) => {
                let triggers = document.querySelectorAll('#portofolio_slider .carousel-item');
                removeImgSrc(modal, carousel_item);
                triggers.forEach(element => {
                    element.classList.remove("modal_opened");
                });
            }
        },
        carousel_next = this.document.getElementById("carousel_right"),
        carousel_prev = this.document.getElementById("carousel_left"),
        modal_next = this.document.getElementById("modal_right"),
        modal_prev = this.document.getElementById("modal_left"),
        feedback_next = this.document.getElementById("feedback_right"),
        feedback_prev = this.document.getElementById("feedback_left");

    M.Sidenav.init(sidenavElems, sidenavOptions);
    M.Parallax.init(parallaxElems, parallaxOptions);
    M.Carousel.init(sliderElems, carouselOptions);
    let gallery_modal = M.Modal.init(modalElems, modalOptions);

    let closeBtn = document.querySelector("#modal.modal i");
    closeBtn.onclick = () => {
        gallery_modal[0].close();
    }

    var carouselInstance = M.Carousel.getInstance(sliderElems[0]),
        feedbackInstance = M.Carousel.getInstance(sliderElems[1]);

    carousel_next.onclick = () => {
        carouselInstance.next();
    }
    carousel_prev.onclick = () => {
        carouselInstance.prev();
    }

    function slideModalNext(carouselInstance) {
        carouselInstance.next();
        if (carousel_item.nextElementSibling && carousel_item.nextElementSibling.className.indexOf("controlers") == -1)
            carousel_item = carousel_item.nextElementSibling;
        else
            carousel_item = document.querySelector("#portofolio .carousel-item");
        setImgSrc(gallery_modal[0].el, carousel_item);
    }

    function slideModalPrev(carouselInstance) {
        carouselInstance.prev();
        let last_item = document.querySelectorAll("#portofolio .carousel-item");
        last_item = last_item[last_item.length - 1];
        carousel_item = carousel_item.previousElementSibling || last_item;
        setImgSrc(gallery_modal[0].el, carousel_item);
    }

    modal_next.onclick = () => {
        slideModalNext(carouselInstance);
    }

    modal_prev.onclick = () => {
        slideModalPrev(carouselInstance);
    }

    feedback_next.onclick = () => {
        feedbackInstance.next();
    }

    feedback_prev.onclick = () => {
        feedbackInstance.prev();
    }

    var closestAttr = function (el_class, ev) {
        var target_el = ev.target,
            found = false;
        while (found == false && target_el !== null) {
            if (target_el.getAttribute(el_class) !== null) {
                found = true;
            } else {
                target_el = target_el.parentElement;
            }
        }
        return target_el;
    },
        slideToLocation = function (ev, position) {
            var trigger_el = closestAttr('data-slide', ev),
                location = trigger_el.getAttribute("data-slide");
            location = location.trim();
            document.querySelectorAll('[data-slide]').forEach(element => {
                element.classList.remove("active");
            });
            trigger_el.classList.add("active");
            document.getElementById(location).scrollIntoView({
                behavior: "smooth",
                block: position
            })

        },
        link_triggers = document.querySelectorAll('[data-slide]');
    for (var i = 0; i < link_triggers.length; i++) {
        link_triggers[i].addEventListener('click', function (event) {
            slideToLocation(event, this.getAttribute('data-position'));
        })
    }

    let sidenav_close = document.querySelectorAll(".close_nav"),
        sidenav = M.Sidenav.getInstance(sidenavElems[0]);
    sidenav_close.forEach(element => {
        element.onclick = () => {
            sidenav.close();
        }
    });

    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        if (formData.get("tel") != '' || formData.get("email") != '') {
            fetch('modules/contact.php', {
                method: 'POST',
                body: formData
            });
            M.toast({ html: 'Mulțumim că ne-ați contactat' });
            contactForm.reset();
        }
        else {
            M.toast({ html: 'Vă rugăm introduceți numărul de telefon sau adresa de email' });
            return false;
        }

    });

    const applyForm = document.getElementById("applyForm");

    applyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch('modules/apply.php', {
            method: 'POST',
            body: formData
        })
        M.toast({ html: 'Mulțumim pentru aplicare' });

        applyForm.reset();
    });

    function setCardsHeight() {
        const plans_flip = document.querySelectorAll("#plans .flip_card"),
            plans_card_height = plans_flip[0].querySelector(".flip_card_front img").height,
            services_flip = document.querySelectorAll("#services .flip_card"),
            services_card_height = services_flip[0].querySelector(".flip_card_front img").height;
        plans_flip.forEach(element => {
            element.style.minHeight = plans_card_height + 'px';
        });
        services_flip.forEach(element => {
            element.style.minHeight = services_card_height + 'px';
        });
    }
    setCardsHeight();

    function getEndOfNextMonth() {
        let today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();

        // Check if today is the last day of the month
        let lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        if (today.getDate() === lastDayOfMonth) {
            // Set the date to the last day of the next month
            let endOfNextMonth = new Date(currentYear, currentMonth + 2, 0);
            return endOfNextMonth;
        } else {
            // Otherwise, return the end of the current month
            return new Date(currentYear, currentMonth + 1, 0);
        }
    }

        var count_down = document.getElementById("count_down");
        var endDate = getEndOfNextMonth(); // Get the appropriate end date
        var countDownDate = endDate.getTime();

        var countDown = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(countDown);
                count_down.innerHTML = "EXPIRED";
                document.getElementById("count_down").classList.add("expired");
                return;
            }

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            count_down.innerHTML =
                `<span>${Math.floor(days / 10)}</span>
                <span>${days % 10}</span><b>:</b>
                <span>${Math.floor(hours / 10)}</span>
                <span>${hours % 10}</span><b>:</b>
                <span>${Math.floor(minutes / 10)}</span>
                <span>${minutes % 10}</span><b>:</b>
                <span>${Math.floor(seconds / 10)}</span>
                <span>${seconds % 10}</span>`;
        }, 1000);


    function startCount(windowOffset) {
        let target = document.getElementById("advantages");
        if (windowOffset > target.offsetTop && target.className.indexOf('counting') == -1) {
            target.classList.add('counting');
            let happy_item = document.getElementById("happy_item"),
                feedback_item = document.getElementById("feedback_item"),
                years_item = document.getElementById("years_item");
            animateValue(happy_item, 0, happy_item.getAttribute("data-count"), 3000);
            animateValue(feedback_item, 0, feedback_item.getAttribute("data-count"), 2500);
            animateValue(years_item, 0, years_item.getAttribute("data-count"), 2000);
        }
    }

    let fliping_card = document.querySelectorAll('.flip_card');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        fliping_card.forEach(element => {
            element.classList.add('active');
            element.onclick = () => {
                if (element.className.indexOf('active') == -1)
                    element.classList.add('active');
                else
                    element.classList.remove('active');
            }
        });
    }

    modalElems[0].addEventListener('touchstart', handleTouchStart, false);
    modalElems[0].addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                slideModalNext(carouselInstance);
            } else {
                slideModalPrev(carouselInstance);
            }
        }
        xDown = null;
        yDown = null;
    }

    let carouselImages = this.document.querySelectorAll("#portofolio .carousel-item img");
    setTimeout(() => {
        carouselImages.forEach(element => {
            let imgSrc = element.getAttribute("src"),
                modalSrc = imgSrc.replace('assets/slider/', 'assets/slider/modal/');
            console.log(imageExists(modalSrc));
        });
    }, 10000);
	document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3306/reviews')
        .then(response => response.json())
        .then(data => {
            const carousel = document.querySelector('.carousel.carousel-slider');
            carousel.innerHTML = ''; // Clear existing reviews

            data.forEach(review => {
                const reviewItem = document.createElement('p');
                reviewItem.classList.add('carousel-item');
                reviewItem.innerHTML = `<strong>${review.name}</strong><br>${review.review}`;
                carousel.appendChild(reviewItem);
            });

            // Reinitialize Materialize Carousel
            M.Carousel.init(carousel, { fullWidth: true });
        })
        .catch(error => console.error('Error loading reviews:', error));
});
