import _ from "loadsh";

const sumOfData = (array, key) => {
  return _.sumBy(array, function (data) {
    return _.get(data, key, 0) * 1
  })
}

export default sumOfData;