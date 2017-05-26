const { pathnameToRoute, ROUTES } = require("./popup");

test('pathnameToRoute', () => {
  expect(pathnameToRoute('/frontend/frontend/issues/2751')).toBe(ROUTES.ISSUE);
  expect(pathnameToRoute('/gitlab-org/gitlab-ce/issues/32954')).toBe(ROUTES.ISSUE);


  expect(pathnameToRoute('/frontend/frontend/issues')).toBe(ROUTES.ISSUES);
  expect(pathnameToRoute('/gitlab-org/gitlab-ce/issues')).toBe(ROUTES.ISSUES);

  expect(pathnameToRoute("/frontend/frontend/merge_requests/1800")).toBe(ROUTES.MR);
  expect(pathnameToRoute("/gitlab-org/gitlab-ce/merge_requests/11726")).toBe(ROUTES.MR);
  expect(pathnameToRoute("/gitlab-org/gitlab-ce/merge_requests/11726/commits")).toBe(ROUTES.MR);


  expect(pathnameToRoute("/frontend/frontend/merge_requests")).toBe(ROUTES.MRS);
  expect(pathnameToRoute("/gitlab-org/gitlab-ce/merge_requests")).toBe(ROUTES.MRS);
});