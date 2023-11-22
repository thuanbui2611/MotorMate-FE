//Also use for data request, be careful when edit return format
export function ConvertToDateStr(dateTime: string): string {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${day}/${month}/${year}`;
}
