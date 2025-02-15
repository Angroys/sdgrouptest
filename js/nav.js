window.addEventListener('load', function () {
    const navBtn = document.getElementById('navbtn');
    const navmobile = document.getElementById('navmobile');


    navBtn.addEventListener('click', () => {
        if (navmobile.style.display == 'none') navmobile.style.display = 'flex';
        else navmobile.style.display = 'none';
    });

    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var formData = new FormData(this);
            if (formData.get("tel") !== "" || formData.get("email") !== "") {
                fetch("modules/contact.php", {
                    method: "POST",
                    body: formData
                });
                M.toast({ html: "Mulțumim că ne-ați contactat" });
                contactForm.reset();
            } else {
                M.toast({ html: "Vă rugăm introduceți numărul de telefon sau adresa de email" });
                return false;
            }
        });
    }
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var viewOffset = window.innerWidth > 425 ? 240 : 0;

    function animateCSS(element, animationName, callback) {
        function handleAnimationEnd() {
            element.classList.remove(animationName);
            element.removeEventListener("animationend", handleAnimationEnd);
            if (typeof callback === "function") callback();
        }

        element.classList.add("animated", animationName);
        element.addEventListener("animationend", handleAnimationEnd);
    }

    function animateLoad(element, animation, callback) {
        let node = element,
            scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

        if (scrollTop - viewOffset >= node.offsetTop - window.innerHeight) {
            if (node.className.indexOf("animated") == -1) {
                animateCSS(node, animation, callback);
            }
        }
    }

    const animateOnload = document.querySelectorAll('.should_animate');
    animateOnload.forEach(element => {
        if (scrollTop >= element.offsetTop - window.innerHeight) {
            animateLoad(element, element.getAttribute("animate-style"));
        }
    });

    window.onscroll = () => {
        let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        animateOnload.forEach(element => {
            animateLoad(element, "fadeIn");
        });
    }
});
