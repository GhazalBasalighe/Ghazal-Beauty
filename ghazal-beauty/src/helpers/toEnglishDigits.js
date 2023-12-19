export default (value) => {
  return parseInt(
    value.replace(/[۰-۹]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - 1728)
    ),
    10
  );
};
