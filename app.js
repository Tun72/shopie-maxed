const tlLeave = new gsap.timeline({
  default: { duration: 0.75, ease: "Power2.easeOut" },
});

const tlEnter = gsap.timeline({
  default: { duration: 0.75, ease: "Power2.easeOut" },
});

const leaveAni = (cur, done) => {
  const product = cur.querySelector(".img-container");
  const text = cur.querySelector(".showcase-text");
  const circles = cur.querySelectorAll(".circle");
  const arrow = cur.querySelector(".showcase-arrow");
  tlEnter.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 });
  tlEnter.fromTo(product, { y: 0, opacity: 1 }, { y: 100, opacity: 0 }, "<");
  tlEnter.fromTo(text, { y: 0, opacity: 1 }, { y: 100, opacity: 0 }, "<");
  tlEnter.fromTo(
    circles,
    { y: 0, opacity: 1 },
    {
      y: -200,
      opacity: 0,
      stagger: 0.15,
      ease: "back.out(1.7)",
      onComplete: done,
    },
    "<10%"
  );
};

const enterAni = (cur, done) => {
  const product = cur.querySelector(".img-container");
  const text = cur.querySelector(".showcase-text");
  const circles = cur.querySelectorAll(".circle");
  const arrow = cur.querySelector(".showcase-arrow");

  tlLeave.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
  tlLeave.fromTo(product, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "<");
  tlLeave.fromTo(text, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "<");
  tlLeave.fromTo(
    circles,
    { y: -200, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      ease: "back.out(1.7)",
      onComplete: done,
    },
    "<10%"
  );
};

barba.init({
  preventRunning: true,
  transitions: [
    {
      name: "default",
      once(data) {
        // const done = this.async();
        // let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        console.log(gradient);
        gsap.set("body", { background: gradient });
      },
      leave(data) {
        const cur = data.current.container;
        const done = this.async();
        leaveAni(cur, done);

        let gradient = getGradient(data.current.namespace);
        gsap.set("body", { background: gradient });
      },
      enter(data) {
        const cur = data.next.container;
        const done = this.async();
        let gradient = getGradient(data.next.namespace);
        gsap.set("body", { background: gradient });
        enterAni(cur, done);
      },
    },
    {
      name: "product-transition",
      sync: true,
      from: { namespace: ["hangbag", "product"] },
      to: { namespace: ["product", "hangbag"] },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAni(next, done);
      },
      leave(data) {
        const done = this.async();
        let next = data.current.container;
        console.log(next);
        productLeaveAni(next, done);
      },
    },
  ],
});

function productEnterAni(next, done) {
  tlEnter.fromTo(next, { y: "100%" }, { y: "0%" });
  tlEnter.fromTo(
    ".crd",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, stagger: 0.2, onComplete: done }
  );
}

function productLeaveAni(current, done) {
  tlLeave.fromTo(current, { y: "0%" }, { y: "100%", onComplete: done });

  //   tlLeave.fromTo(
  //     ".crd",
  //     { opacity: 1, y: 0 },
  //     { opacity: 0, y: 50, stagger: 0.2, onComplete: done }
  //   );
}
function getGradient(name) {
  switch (name) {
    case "hangbag":
      return "linear-gradient(260deg, #b75d62, #754d4f)";
    case "boot":
      return "linear-gradient(260deg, #5d8cb7, #4c4f70)";
    case "hat":
      return "linear-gradient(260deg, #b27a5c, #7f5450)";
  }
}
