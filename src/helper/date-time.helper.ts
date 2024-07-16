export const simpleDateFormat = (dateString: string) => {
  const date = new Date(dateString);
  
  return date.toDateString();
}