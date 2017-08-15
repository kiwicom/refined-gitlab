export default () =>
  `${window.location.hostname}/${window.location.pathname
    .split("/")
    .splice(1, 2)
    .join("/")}`;
