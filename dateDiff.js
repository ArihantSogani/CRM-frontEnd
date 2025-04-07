import datetimeDifference from "datetime-difference";
import { get } from "loadsh";

const dateDiff = (date2, date1) => {
  let d2 = new Date(date2);
  let d1 = new Date(date1);

  const result = datetimeDifference(d1, d2);

  return get(result, "months") !== 0
    ? get(result, "months") + " months "
    : get(result, "days") !== 0
    ? get(result, "days") + " days "
    : get(result, "hours") !== 0
    ? get(result, "hours") + " hrs "
    : get(result, "minutes") !== 0
    ? get(result, "minutes") + " min "
    : get(result, "seconds") + " sec ";
};

export default dateDiff;
