import moment from "moment"

const dateConverter = (date) => {
  return moment(date).format("MMMM Do, YYYY HH:mm:ss");
}

export default dateConverter;