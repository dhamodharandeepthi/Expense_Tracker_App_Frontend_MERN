export const convertToCSV = (data) => {
  const header = ["Amount", "Category", "Date", "Description"];
  const rows = data.map((expense) => [
    expense.amount,
    expense.category,
    new Date(expense.date).toLocaleDateString(),
    expense.description,
  ]);
  return [header, ...rows].map((e) => e.join(",")).join("\n");
};
