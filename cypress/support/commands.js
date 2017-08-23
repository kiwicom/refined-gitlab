Cypress.addParentCommand(
  "createIssue",
  (projectName, title, description) => {
    cy.window().then(win => {
      win.$.ajax({
        type: "POST",
        headers: {
          "X-CSRF-Token": win.$.rails.csrfToken(),
        },
        url: `/${Cypress.env("gitlab_user")}/${projectName}/issues`,
        contentType: "application/x-www-form-urlencoded",
        data: {
          "issue[title]": title,
          "issue[description]": description,
        },
      });
    });

    // Would prefer simulating browser and filling form
    // but cannot find a way to make it work
    // it still fills everything into first input (title)

    // cy
    //   .visit(`/${Cypress.env("gitlab_user")}/${projectName}/labels/new`)
    //   .contains("New Label");
    //
    // cy
    //   .get("#label_title")
    //   .focus()
    //   .type(title)
    //   .should("have.value", title);
    //
    // cy
    //   .get("#label_description")
    //   .focus()
    //   .type(description)
    //   .should("have.value", description);
    //
    // cy
    //   .get("#label_color")
    //   .focus()
    //   .type(background)
    //   .should("have.value", background);
    //
    // cy.get("#new_label").submit();
  }
);


Cypress.addParentCommand(
  "createLabel",
  (projectName, title, description, color) => {
    cy.window().then(win => {
      win.$.ajax({
        type: "POST",
        headers: {
          "X-CSRF-Token": win.$.rails.csrfToken(),
        },
        url: `/${Cypress.env("gitlab_user")}/${projectName}/labels`,
        contentType: "application/x-www-form-urlencoded",
        data: {
          "label[title]": title,
          "label[description]": description,
          "label[color]": color,
        },
      });
    });

    // Would prefer simulating browser and filling form
    // but cannot find a way to make it work
    // it still fills everything into first input (title)

    // cy
    //   .visit(`/${Cypress.env("gitlab_user")}/${projectName}/labels/new`)
    //   .contains("New Label");
    //
    // cy
    //   .get("#label_title")
    //   .focus()
    //   .type(title)
    //   .should("have.value", title);
    //
    // cy
    //   .get("#label_description")
    //   .focus()
    //   .type(description)
    //   .should("have.value", description);
    //
    // cy
    //   .get("#label_color")
    //   .focus()
    //   .type(background)
    //   .should("have.value", background);
    //
    // cy.get("#new_label").submit();
  }
);
