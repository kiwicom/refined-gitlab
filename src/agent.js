import FUNCTIONS from "./libs/FUNCTIONS";

document.addEventListener("refined-gitlab", e => {
  if (e.detail.fn === FUNCTIONS.SELF_ASSIGN_MR) {
    const { id, userId, group, project } = e.detail;
    $.ajax({
      type: "PUT",
      headers: {
        "X-CSRF-Token": $.rails.csrfToken(),
      },
      url: `/${group}/${project}/issues/${id}.json?basic=true`,
      contentType: "application/x-www-form-urlencoded",
      data: `issue%5Bassignee_ids%5D%5B%5D=${userId}`,
    });
  }
});
