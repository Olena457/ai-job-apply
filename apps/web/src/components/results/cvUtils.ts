export const parseDateForSort = (dateString?: string): number => {
  if (!dateString) return 0;

  const lowerDate = dateString.toLowerCase();
  if (lowerDate.includes("present") || lowerDate.includes("наразі")) {
    return Infinity;
  }

  const match = dateString.match(/([a-zA-Za-яА-Я]+\s\d{4})|(\d{4})/g);
  if (match) {
    return new Date(match[match.length - 1]).getTime();
  }

  return 0;
};
