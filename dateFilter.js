import _ from "loadsh";

const dateFilter = (dateArr, startDate, endDate, fieldName) => {
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  console.log(start, end, startDate, endDate)
  let arr = _.filter(dateArr, (data) => {
    const dateData = Date.parse(_.get(data, fieldName));
    if (dateData < end && dateData > start) {
      return true
    } else {
      return false
    }
  })

  return arr;
};

export default dateFilter;