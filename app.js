class loading {
  constructor(options) {
    this.defaultOptions = {
      isJS: true,
      isLoad: false,
      isMove: true,
      isIos: true,
      isResize: true,
      introSelector: ".js-intro",
      targetSelector: "html",
    };
    this.options = Object.assign(this.defaultOptions, options);
    this.introElem = document.querySelector(this.options.introSelector);
    this.targetElem = document.querySelector(this.options.targetSelector);
    this._init();
  }
  _init() {
    if (this.options.isJS) {
      this.targetElem.classList.add("is-useJs");
    }
    if (this.options.isLoad) {
      window.addEventListener("load", () => {
        this.targetElem.classList.add("is-load");
        if (this.introElem !== null) {
          this._loaded();
        }
      });
    }
    if (this.options.isMove) {
      window.addEventListener("load", () => {
        this.targetElem.classList.add("is-load");
        if (this.introElem !== null) {
          this._move();
        }
      });
    }
  }
  _loaded() {
    function asyncFunc(time, num) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          document.querySelector("html").classList.add(`number${num}`);
          resolve();
        }, time);
      });
    }
    async function load() {
      await asyncFunc(2000, 1);
      await asyncFunc(2000, 2);
      await asyncFunc(2000, 3);
      await asyncFunc(2000, 4);
    }
    load().then(() => {
      document.querySelector("html").classList.remove(`number1`, `number2`, `number3`, `number4`);
    });
  }
  _move() {
    const counter3 = document.querySelector(".counter-3");
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);
    function animate(counter, duration, delay = 0) {
      const numHeight = counter.querySelector(".num").clientHeight;

      const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;
      console.log(totalDistance);
      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    }

    animate(document.querySelector(".counter-3"), 5);
    animate(document.querySelector(".counter-2"), 6);
    animate(document.querySelector(".counter-1"), 2, 4);
    gsap.to(".digit", {
      top: "-150px",
      stagger: {
        amount: 0.25,
      },
      delay: 6,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        document.querySelector("body").classList.add("is-finish");
      },
    });
  }
  _resized() {
    this.targetElem.classList.add("is-resized");
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      this.targetElem.classList.remove("is-resized");
    }, 500);
  }
}
new loading();
