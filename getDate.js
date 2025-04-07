export const getDate = (date = new Date(), time) => {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - time * 1);

  return previous;
}