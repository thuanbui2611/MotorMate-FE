//Also use for data request, be careful when edit return format
export function ConvertDatetimeToDisplay(dateTime: string): string {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${day}/${month}/${year}`;
}

export function ConvertToDateTimeDisplay(dateTimeString: string): string {
  const dateUTC = new Date(dateTimeString);
  const dateTimeLocales = new Date(
    dateUTC.getTime() - dateUTC.getTimezoneOffset() * 60 * 1000
  );

  // Extracting the time portion in format HH:mm
  const time = dateTimeLocales.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Extracting the date portion in format DD-MM-YYYY
  const date = dateTimeLocales.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return `${time} ${date}`;
}
