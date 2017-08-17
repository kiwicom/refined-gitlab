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

  it("should create labels", () => {
    cy.createLabel(projectName, "foo", "Foo", "#cccccc");
  });
});
