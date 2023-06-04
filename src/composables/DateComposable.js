export default function formatDate(date) {
  const newDate = new Date(date);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = newDate.toLocaleString("en-US", options);

  return formattedDate;
}
