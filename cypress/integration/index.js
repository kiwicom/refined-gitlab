/* eslint-disable import/no-extraneous-dependencies */

import chroma from "chroma-js";

const prioScale = chroma.scale("Blues").padding([0.2, 0]).colors(3);
const wieghtScale = chroma.scale("Purples").padding([0.2, 0]).colors(5);

const projectName = `refined-gitlab-test-${Cypress.moment().format("YYYYMMDD")}`;

describe("Refined Gitlab", () => {
  it.skip("should login", () => {
    cy.visit("/users/sign_in");
    cy.get("#user_login").type(Cypress.env("gitlab_user"));
    cy.get("#user_password").type(Cypress.env("gitlab_pass"));
    cy.get("#new_user").submit();
  });

  it.skip("should create new project", () => {
    cy.visit("/projects/new");
    cy.get("#project_path").type(projectName);
    cy.get("#new_project").submit();
    cy.get("body").contains("The repository for this project is empty");
  });

  it.skip("should create labels", () => {
    cy.visit(`/${Cypress.env("gitlab_user")}/${projectName}`);

    cy.createLabel(projectName, "foo", "Foo", "#cccccc");
    cy.createLabel(projectName, "foo1", "Foo1", "#cccccc");
    cy.createLabel(projectName, "foo2", "Foo2", "#cccccc");
    cy.createLabel(projectName, "foo3", "Foo3", "#cccccc");

    cy.createLabel(projectName, "module/a", "Module / A", "#cccccc");
    cy.createLabel(projectName, "module/b", "Module / B", "#cccccc");
    cy.createLabel(projectName, "module/c", "Module / C", "#cccccc");

    cy.createLabel(projectName, "prio/low", "Priority / Low", prioScale[0]);
    cy.createLabel(
      projectName,
      "prio/medium",
      "Priority / Medium",
      prioScale[1]
    );
    cy.createLabel(projectName, "prio/high", "Priority / High", prioScale[2]);

    cy.createLabel(projectName, "weight/1", "Weight / 1", wieghtScale[0]);
    cy.createLabel(projectName, "weight/2", "Weight / 2", wieghtScale[1]);
    cy.createLabel(projectName, "weight/3", "Weight / 3", wieghtScale[2]);
    cy.createLabel(projectName, "weight/4", "Weight / 4", wieghtScale[3]);
    cy.createLabel(projectName, "weight/5", "Weight / 5", wieghtScale[4]);

    cy.createLabel(projectName, "qa/to-review", "QA / To review", "#cccccc");
    cy.createLabel(projectName, "qa/approved", "QA / Approved", "#cccccc");
    cy.createLabel(
      projectName,
      "qa/changes-needed",
      "QA / Changes needed",
      "#cccccc"
    );

    cy.createLabel(
      projectName,
      "design/to-review",
      "Design / To review",
      "#cccccc"
    );
    cy.createLabel(
      projectName,
      "design/approved",
      "Design / Approved",
      "#cccccc"
    );
    cy.createLabel(
      projectName,
      "design/changes-needed",
      "Design / Changes needed",
      "#cccccc"
    );

    cy.createLabel(
      projectName,
      "code/to-review",
      "Code / To review",
      "#cccccc"
    );
    cy.createLabel(projectName, "code/approved", "Code / Approved", "#cccccc");
    cy.createLabel(
      projectName,
      "code/changes-needed",
      "Code / Changes needed",
      "#cccccc"
    );
  });
});
