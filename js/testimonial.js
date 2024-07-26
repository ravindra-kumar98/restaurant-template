let mobileWidth = 1080,
    tabWidth = 1080,
    deskWidth = 1220,
    pWidth,
    pHeight,
    screenWidth,
    screenHeight,
    index = document.getElementsByClassName("quote-column"),
    pTransition = 3,
    activeShow = "col-active";
const arrowIcon = "<div class='arrow left-arrow ' onclick='arrowControl(-1)'><i class='arrow-icon'><i></div><div class='arrow right-arrow' onclick='arrowControl(1)'><i class='arrow-icon'><i></div>",
    ArrowParent = document.createElement("div");
ArrowParent.classList.add("arrows-wrap"),
    (ArrowParent.innerHTML = "<div class='arrow left-arrow ' onclick='arrowControl(-1)'><i class='arrow-icon'><i></div><div class='arrow right-arrow' onclick='arrowControl(1)'><i class='arrow-icon'><i></div>");
let arrowEnabled = !1,
    activeQuoteHeight = 400;
function getElem() {
    let t, e;
    index[0].parentElement.style.minHeight = (index.length / 2) * 140 + "px";
    for (let i = 0; i < index.length; i++)
        (pWidth = (e = index[i]).parentElement.offsetWidth),
            (pHeight = e.parentElement.offsetHeight),
            screenWidth > tabWidth &&
                ((t = randomPos(60, screenHeight / (index.length / 1.5)) + "px"),
                i < index.length / 1.9
                    ? ((e.style.left = randomPos(100, e.parentElement.offsetWidth / 3 - 100) + "px"), (e.style.top = (e.parentElement.offsetHeight / (index.length / 2)) * (i - 1) + "px"))
                    : i > index.length / 1.9 &&
                      ((e.style.right = randomPos(100, e.parentElement.offsetWidth / 3 - 100) + "px"), (e.style.left = "auto"), (e.style.top = (e.parentElement.offsetHeight / (index.length / 2)) * (index.length - 1 - i) + "px")),
                arrowEnabled ? (ArrowParent.style.display = "block") : (ArrowParent.style.display = "none")),
            screenWidth <= tabWidth &&
                screenWidth >= mobileWidth &&
                ((t = randomPos(30, screenHeight / (index.length / 1.5)) + "px"),
                (e.parentElement.style.minHeight = "70vh"),
                (e.style.bottom = "0px"),
                (e.style.left = (e.parentElement.offsetWidth / (index.length - 1)) * (i - 1) + "px"),
                (e.style.zIndex = "999"),
                (e.style.top = "auto"),
                arrowEnabled ? (ArrowParent.style.display = "block") : (ArrowParent.style.display = "none")),
            screenWidth < mobileWidth ? ((e.style.left = "50%"), (ArrowParent.style.display = "block")) : arrowEnabled || (ArrowParent.style.display = "none"),
            (e.style.width = t),
            (e.style.height = t),
            0 != i && e.addEventListener("click", quoteShow, !1),
            e.classList.add("moves");
    setTimeout(() => {
        for (let t = 0; t < index.length; t++);
    }, 2e3);
}
getElem();
let clickCheck = !0,
    showClear,
    showClear2;
function quoteShow(t) {
    let e = getComputedStyle(this);
    if ((console.log(e), clickCheck)) {
        (clickCheck = !1), clearTimeout(showClear2);
        let i = document.getElementsByClassName(activeShow),
            s;
        for (let n = 0; n < i.length; n++) (s = i[n]).classList.remove("show"), (s.style.transition = "0.4s");
        (this.style.transition = "0.4s"),
            setTimeout(() => {
                (s.style.top = this.offsetTop + "px"),
                    (s.style.left = this.offsetLeft + "px"),
                    (s.style.width = this.offsetWidth + "px"),
                    (s.style.height = this.offsetHeight + "px"),
                    s.addEventListener("click", quoteShow, !1),
                    s.classList.remove(activeShow);
            }, 600),
            setTimeout(() => {
                this.classList.add(activeShow), this.removeEventListener("click", quoteShow, !1);
            }, 1200),
            (showClear2 = setTimeout(() => {
                this.classList.toggle("show"), (s.style.transition = ""), (this.style.transition = ""), (clickCheck = !0);
            }, 1800));
    }
}
let arrowClicked = !0;
function arrowControl(t) {
    if (arrowClicked) {
        arrowClicked = !1;
        for (let e = 0; e < index.length; e++) index[nowActive].classList.remove("show"), (index[nowActive].style.transition = ".4s"), index[nowActive].addEventListener("click", quoteShow, !1);
        setTimeout(() => {
            for (let e = 0; e < index.length; e++) index[e].classList.remove(activeShow);
            (nowActive += t) > index.length - 1 ? (nowActive = 0) : nowActive < 0 && (nowActive = index.length - 1);
        }, 600),
            setTimeout(() => {
                index[nowActive].classList.add(activeShow), index[nowActive].removeEventListener("click", quoteShow, !1);
            }, 610),
            setTimeout(() => {
                index[nowActive].classList.toggle("show"), (index[nowActive].style.transition = ""), (arrowClicked = !0);
            }, 1800);
    }
}
function randomPos(t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t;
}
function getScreenSize() {
    (screenWidth = window.innerWidth), (screenHeight = window.innerHeight), getElem();
}
function arrowFunc() {
    try {
        index[0].parentElement.appendChild(ArrowParent);
    } catch (t) {}
}
(nowActive = 0),
    (window.onresize = getScreenSize),
    window.addEventListener("resize", getScreenSize),
    window.addEventListener(
        "load",
        function () {
            getScreenSize(), getElem();
        },
        !0
    ),
    arrowFunc();
class MoveAnim {
    constructor(t, e) {
        (this.time = e),
            Math.random() > 0.5 ? (this.uDVal = t) : (this.uDVal = 0),
            Math.random() > 0.5 ? (this.lRVal = t) : (this.lRVal = 0),
            (this.max = t),
            Math.random() > 0.5 ? (this.uD = !1) : (this.uD = !0),
            Math.random() > 0.5 ? (this.lR = !1) : (this.lR = !0),
            this.upDown(this.max),
            this.leftRight(this.max),
            (this.scale = 0.01);
    }
    upDown() {
        setInterval(
            () => (
                this.uDVal ? this.uDVal && (this.uD <= -this.max && (this.uDVal = !1), this.uD >= -this.max && (this.uD -= this.scale)) : (this.uD >= this.max && (this.uDVal = !0), this.uD < this.max && (this.uD += this.scale)), this.uD
            ),
            this.time / 1e3
        );
    }
    leftRight() {
        setInterval(
            () => (
                this.lRVal ? this.lRVal && (this.lR <= -this.max && (this.lRVal = !1), this.lR >= -this.max && (this.lR -= this.scale)) : (this.lR >= this.max && (this.lRVal = !0), this.lR < this.max && (this.lR += this.scale)), this.lR
            ),
            this.time / 1e3
        );
    }
    letMove(t, e = !1, i = !1) {
        setInterval(() => {
            !0 === e && !1 === i
                ? (t.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0," + this.uD + ", 0, 1)")
                : !1 === e && !0 === i
                ? (t.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + this.lR + ",0, 0, 1)")
                : (t.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + this.lR + "," + this.uD + ", 0, 1)");
        }, 1);
    }
    start(t, e, i) {
        this.letMove(t, e, i), this.upDown(), this.leftRight();
    }
}
class ShowAnim {
    constructor(t, e, i) {
        (this.mElem = document.getElementsByClassName(t)), (this.pElem = t.parentElement), (this.cElem = t.children), (this.count = 0), (this.max = e), (this.min = 10), (this.times = i), this.randomCount(this.max);
    }
    randomCount(t) {
        return Math.floor(Math.random() * (t - this.min + 1)) + this.min;
    }
    show(t, e) {
        for (this.count = 0; this.count < this.mElem.length; this.count++) (this.moveanim = new MoveAnim(this.randomCount(this.max), this.times)), this.moveanim.start(this.mElem[this.count], t, e);
    }
}
let animShow = new ShowAnim("moves", 40, 50);
animShow.show(!0, !0);
