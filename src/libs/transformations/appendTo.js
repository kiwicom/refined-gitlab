import _ from "lodash";
import * as storage from "./../../options/storage";

export default () => {
  const appendToPipelineSectionString = storage.get("appendToPipelineSection");
  const appendToDeploySectionString = storage.get("appendToDeploySection");

  const pipelineEl = document.querySelectorAll(
    ".mr-widget-heading .js-commit-link"
  )[0];

  const options = {
    group: location.pathname.split("/")[1], // FIXME: Nicer
    project: location.pathname.split("/")[2], // FIXME: Nicer
  };

  try {
    options.hash = _.last(pipelineEl.href.split("/")); // FIXME: Nicer
  } catch (e) {
    options.hash = "";
  }

  if (pipelineEl) {
    pipelineEl.insertAdjacentHTML(
      "afterend",
      ` | ${_.template(appendToPipelineSectionString)(options)}`
    );
  }

  const timer = setInterval(() => {
    const deployLinkEl = document.getElementsByClassName("js-deploy-url")[0];
    if (deployLinkEl) {
      clearInterval(timer)
      const mergedOptions = Object.assign({}, options, {
        deployLink: deployLinkEl.href,
      });
      deployLinkEl.insertAdjacentHTML(
        "afterend",
        ` | ${_.template(appendToDeploySectionString)(mergedOptions)}`
      );
    }
  }, 1000);
};
