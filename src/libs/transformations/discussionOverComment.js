// eslint-disable-next-line import/prefer-default-export
export const agent = () => {
  const timer = setInterval(() => {
    const el = document.querySelector(".js-main-target-form .qa-discussion-option");
    if (el) {
      clearInterval(timer)
      console.log("CLICKING");
      el.click();
    }
  }, 1000);
};
