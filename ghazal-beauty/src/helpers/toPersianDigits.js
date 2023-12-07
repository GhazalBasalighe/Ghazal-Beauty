export default (number) => {
  const englishDigits = "0123456789";
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  const translationMap = new Map(
    [...englishDigits].map((d, i) => [d, persianDigits[i]])
  );

  const resultString = number
    .split("")
    .map((char) =>
      char === "."
        ? ","
        : translationMap.has(char)
        ? translationMap.get(char)
        : char
    )
    .join("");

  return resultString;
};
