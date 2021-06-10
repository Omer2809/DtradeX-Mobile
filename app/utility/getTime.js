export default function getTime(days, startDate) {
  const oneDay = 1000 * 60 * 60 * 24;
  const today = new Date();
  const createdDate = new Date(startDate);

  // console.log();
  return (
    days -
    (Math.round(today.getTime() - createdDate.getTime()) / oneDay).toFixed(0)
  );
}
