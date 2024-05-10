export function convertDateFormat(dateString: string) {
    const [year, month] = dateString.split("-");
    const monthAbbreviation = new Date(`${dateString}-01`).toLocaleString(
      "default",
      { month: "short" }
    );
    const formattedDate = `${monthAbbreviation}-${year.slice(2)}`;
    return formattedDate;
  }