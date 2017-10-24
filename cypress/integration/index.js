/* eslint-disable import/no-extraneous-dependencies */

import chroma from "chroma-js";

const prioScale = chroma.scale("Blues").padding([0.2, 0]).colors(3);
const statusScale = chroma.scale("Purples").padding([0.2, 0]).colors(5);
const generalScale = {
  warning: "#f0ad4e",
  danger: "#d9534f",
  success: "#5cb85c",
}

const projectName = `refined-gitlab-playground-${Cypress.moment().format("YYYYMMDD")}`;

const createIssue = (
  name,
  description,
  module,
  status,
  prio,
  code,
  design,
  qa,
) => {
  cy.createIssue(
    projectName,
    name,
`
${description}\n
/label ~"module/${module}"\n
/label ~"status/${status}"\n
/label ~"prio/${prio}"\n
/label ~"code/${code}"\n
/label ~"design/${design}"\n
/label ~"qa/${qa}"\n
`);
}

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
    cy.get(".option-title").contains('Public').click();
    cy.get("#new_project").submit();
    cy.get("body").contains("The repository for this project is empty");
  });

  it.skip("should create labels", () => {
    cy.visit(`/${Cypress.env("gitlab_user")}/${projectName}`);

    cy.createLabel(projectName, "module/core", "Module / A", "#cccccc");
    cy.wait(500);
    cy.createLabel(projectName, "module/left", "Module / B", "#cccccc");
    cy.wait(500);
    cy.createLabel(projectName, "module/right", "Module / C", "#cccccc");
    cy.wait(500);

    cy.createLabel(projectName, "status/icebox", "Status / Icebox", statusScale[0]);
    cy.wait(500);
    cy.createLabel(projectName, "status/backlog", "Status / Backlog", statusScale[1]);
    cy.wait(500);
    cy.createLabel(projectName, "status/doing", "Status / Todo", statusScale[2]);
    cy.wait(500);
    cy.createLabel(projectName, "status/done", "Status / Doing", statusScale[3]);
    cy.wait(500);
    cy.createLabel(projectName, "status/validated", "Status / Done", statusScale[4]);
    cy.wait(500);

    cy.createLabel(projectName, "prio/low", "Priority / Low", prioScale[0]);
    cy.wait(500);
    cy.createLabel(projectName, "prio/medium", "Priority / Medium", prioScale[1]);
    cy.wait(500);
    cy.createLabel(projectName, "prio/high", "Priority / High", prioScale[2]);
    cy.wait(500);

    cy.createLabel(projectName, "code/to-review", "Code / To review", generalScale.warning);
    cy.wait(500);
    cy.createLabel(projectName, "code/approved", "Code / Approved", generalScale.success);
    cy.wait(500);
    cy.createLabel(projectName, "code/changes-needed", "Code / Changes needed", generalScale.danger);
    cy.wait(500);

    cy.createLabel(projectName, "design/to-review", "Design / To review", generalScale.warning);
    cy.wait(500);
    cy.createLabel(projectName, "design/approved", "Design / Approved", generalScale.success);
    cy.wait(500);
    cy.createLabel(projectName, "design/changes-needed", "Design / Changes needed", generalScale.danger);
    cy.wait(500);

    cy.createLabel(projectName, "qa/to-review", "QA / To review", generalScale.warning);
    cy.wait(500);
    cy.createLabel(projectName, "qa/approved", "QA / Approved", generalScale.success);
    cy.wait(500);
    cy.createLabel(projectName, "qa/changes-needed", "QA / Changes needed", generalScale.danger);
    cy.wait(500);

    cy.createLabel(projectName, "foo", "Foo", "#cccccc");
    cy.wait(500);
    cy.createLabel(projectName, "foo1", "Foo1", "#cccccc");
    cy.wait(500);
    cy.createLabel(projectName, "foo2", "Foo2", "#cccccc");
    cy.wait(500);
    cy.createLabel(projectName, "foo3", "Foo3", "#cccccc");
    cy.wait(500);
  });

  it.skip("should create issues", () => {
    cy.visit(`/${Cypress.env("gitlab_user")}/${projectName}`);

    // Copied from https://docs.google.com/spreadsheets/d/1fYrJoYTmchFkZuTYsf_DNHOaqHrGe-iPIPhQqzKBMBY

    createIssue("Example issue 1", "Lorem ipsum...", "right", "validated", "medium", "to-review", "approved", "to-review");
    cy.wait(500);
    createIssue("Example issue 2", "Lorem ipsum...", "core", "backlog", "high", "approved", "changes-needed", "to-review");
    cy.wait(500);
    createIssue("Example issue 3", "Lorem ipsum...", "left", "icebox", "low", "changes-needed", "to-review", "to-review", "foo1");
    cy.wait(500);
    createIssue("Example issue 4", "Lorem ipsum...", "core", "doing", "medium", "to-review", "approved", "approved");
    cy.wait(500);
    createIssue("Example issue 5", "Lorem ipsum...", "right", "validated", "low", "changes-needed", "approved", "to-review");
    cy.wait(500);
    createIssue("Example issue 6", "Lorem ipsum...", "left", "backlog", "medium", "approved", "changes-needed", "approved");
    cy.wait(500);
    createIssue("Example issue 7", "Lorem ipsum...", "right", "done", "low", "changes-needed", "to-review", "changes-needed");
    cy.wait(500);
    createIssue("Example issue 8", "Lorem ipsum...", "core", "doing", "medium", "approved", "approved", "changes-needed");
    cy.wait(500);
    createIssue("Example issue 9", "Lorem ipsum...", "core", "backlog", "low", "to-review", "approved", "approved");
    cy.wait(500);
    createIssue("Example issue 10", "Lorem ipsum...", "left", "backlog", "high", "approved", "to-review", "approved");
    cy.wait(500);
    createIssue("Example issue 11", "Lorem ipsum...", "right", "doing", "medium", "to-review", "changes-needed", "approved");
    cy.wait(500);
    createIssue("Example issue 12", "Lorem ipsum...", "core", "icebox", "low", "changes-needed", "to-review", "to-review");
    cy.wait(500);
    createIssue("Example issue 13", "Lorem ipsum...", "left", "icebox", "low", "changes-needed", "changes-needed", "changes-needed");
    cy.wait(500);
    createIssue("Example issue 14", "Lorem ipsum...", "left", "backlog", "medium", "changes-needed", "to-review", "changes-needed");
    cy.wait(500);
    createIssue("Example issue 15", "Lorem ipsum...", "core", "backlog", "medium", "to-review", "changes-needed", "approved");
    cy.wait(500);
  })
});
