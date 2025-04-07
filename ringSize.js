let ringSize = [];
let i = 3;
while (i <= 16) {
  ringSize.push(i.toFixed(2));
  i = i + 0.25;
}

export default ringSize;