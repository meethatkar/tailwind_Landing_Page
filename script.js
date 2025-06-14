const nav_mobile_div = document.querySelector("#nav-mobile");
function handleMenu() {
    nav_mobile_div.classList.toggle("hidden");      //hidden is tailwindcss 
}

const initialTranslateLTR = -30 * 4;        //30 is tailwind value and 4 is pixel.
const initialTransalateRTL = 1 * 4;
const fasterScroll_initialTranslate = 20*4;
//this is set so, the htm translate-x-50 will be there or else the animation effect begans from x=0;

function setupIntersectionObserver(element, isLTR, speed) {
    const intersectionCallback = (entries) => {
        //here entries[0] is because entries is array which is returned by observer's callback function, and as we are passing single div at a time, we have only one element in array.
        const isIntersectingVar = entries[0].isIntersecting;
        console.log("scroll",element);
        // console.log("element: ",isIntersectingVar);
        if (isIntersectingVar) {
            document.addEventListener("scroll", scrollHandler);
            // console.log("scroll div");

        }
        else {
            document.removeEventListener("scroll", scrollHandler);
            //this is removed as we dont want to animate once it's outside othe viewport.
        }
    }   //end of callback

    const intersectionObserver = new IntersectionObserver(intersectionCallback);

    intersectionObserver.observe(element);

    function scrollHandler() {
        const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;

        let totalTranslate = 0;
        if (isLTR) {
            totalTranslate = translateX + initialTranslateLTR;
            // console.log(totalTranslate," isLTR");

        }
        else {
            totalTranslate = -(translateX + initialTransalateRTL);
            //set to minus as it's default value is plus and other var's value is in minus and we want animation in minus
            // due to this center dive will move from it's initial point that is set in html.
        }

        element.style.transform = `translateX(${totalTranslate}px)`;
        //here element are #line1, #line2, #line3, etc
    }
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const fasterScrollDiv = document.querySelector("#fast-scroller");

setupIntersectionObserver(line1, true, 0.24);
setupIntersectionObserver(line2, false, 0.24);
setupIntersectionObserver(line3, true, 0.24);
setupIntersectionObserver(fasterScrollDiv,false,0.9);

// GSAP 
var crsr = document.querySelector("#cursor");
var crsr_blur = document.querySelector("#cursor-blur");
document.addEventListener("mousemove", (dets) => {
    crsr.style.left = dets.x - 10 + "px";
    crsr.style.top = dets.y - 10 + "px";
    crsr_blur.style.left = dets.x - 100 + "px";
    console.log(dets);
    crsr_blur.style.top = dets.y - 100 + "px";
})

var navItems = document.querySelectorAll("#nav-menus a");
navItems.forEach((elem) => {
    elem.addEventListener("mouseenter", (dets) => {
        cursorExpand();
    });
    elem.addEventListener("mouseleave", (dets) => {
        cursorNormal();
    });
});

var logo_img = document.querySelector("nav>a");
logo_img.addEventListener("mouseenter", ()=>{
    cursorExpand();
})
logo_img.addEventListener("mouseleave",()=>{
    cursorNormal();
})

function cursorExpand() {
    crsr.style.scale = "4";
    crsr.style.border = "1px solid #E5E7EB";
    crsr.style.backgroundColor = "transparent";
    crsr.style.cursor = "pointer";
}

function cursorNormal() {
    crsr.style.scale = "1";
    crsr.style.border = "0px soild black";
    crsr.style.backgroundColor = "#E5E7EB";
    crsr.style.cursor = "default";
}

const faqDets = document.querySelectorAll(".fa-dets");
const faDetsMsg = document.querySelectorAll(".fa-dets-msg");
const arrowIcon = document.querySelectorAll(".faqI");


faqDets.forEach((elem,index)=>{
    elem.addEventListener("click",()=>{
        faDetsMsg[index].classList.toggle("hidden");
        arrowIcon[index].classList.toggle("-rotate-180");
    })
})