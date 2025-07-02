const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const getDateRangesForDropdown = () => {
  const today = new Date();
  const ranges = [];

  // Current Week
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay());
  currentWeekStart.setHours(0, 0, 0, 0);

  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
  currentWeekEnd.setHours(23, 59, 59, 999);

  ranges.push({
    label: "Current Week",
    value: {
      startDate: formatDate(currentWeekStart),
      endDate: formatDate(currentWeekEnd),
    },
  });

  // Last Week
  const lastWeekStart = new Date(currentWeekStart);
  lastWeekStart.setDate(currentWeekStart.getDate() - 7);

  const lastWeekEnd = new Date(currentWeekEnd);
  lastWeekEnd.setDate(currentWeekEnd.getDate() - 7);

  ranges.push({
    label: "Last Week",
    value: {
      startDate: formatDate(lastWeekStart),
      endDate: formatDate(lastWeekEnd),
    },
  });

  // Current Month
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentMonthEnd = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );
  currentMonthStart.setHours(0, 0, 0, 0);
  currentMonthEnd.setHours(23, 59, 59, 999);

  ranges.push({
    label: "Current Month",
    value: {
      startDate: formatDate(currentMonthStart),
      endDate: formatDate(currentMonthEnd),
    },
  });

  // Last Month
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  lastMonthStart.setHours(0, 0, 0, 0);
  lastMonthEnd.setHours(23, 59, 59, 999);

  ranges.push({
    label: "Last Month",
    value: {
      startDate: formatDate(lastMonthStart),
      endDate: formatDate(lastMonthEnd),
    },
  });

  return ranges;
};
