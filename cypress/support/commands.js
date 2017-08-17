Cypress.addParentCommand(
  "createLabel",
  (project, title, description, background) => {
    const opts = { delay: 50 };

    cy
      .visit(`/${Cypress.env("gitlab_user")}/${project}/labels/new`, opts)
      .contains("New Label", opts);

    cy
      .get("#label_title")
      .focus()
      .type(title, opts)
      .should("have.value", title);

    cy
      .get("#label_description")
      .focus()
      .type(description, opts)
      .should("have.value", description);

    cy
      .get("#label_color")
      .focus()
      .type(background, opts)
      .should("have.value", background);

    cy.get("#new_label", opts).submit(opts);
  }
);
