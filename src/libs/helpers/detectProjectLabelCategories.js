export default () => {
  const projectUrl = `${window.location.pathname
    .split("/")
    .splice(1, 2)
    .join("/")}`;

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: `/${projectUrl}/labels.json`,
      headers: {
        "X-CSRF-Token": $.rails.csrfToken(),
      },
      success: res => {
        const labels = res.map(x => x.title);
        resolve(
          labels.reduce((categories, x) => {
            const parts = x.split(/[/:]/);
            if (parts.length === 2) {
              const category = parts[0];
              if (!categories.includes(category)) {
                categories.push(category);
              }
            }
            return categories;
          }, [])
        );
      },
      error: err => reject(err),
    });
  });
};
