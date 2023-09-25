const arr = [
  {
    index: 0,
    name: "a",
  },
  {
    index: 1,
    name: "b",
  },
  {
    index: 2,
    name: "c",
  },
  {
    index: 3,
    name: "d",
  },
];

const index = arr.indexOf(arr.find(item => item.name === "c"));
if (index !== -1 && index > 0) {
  const previousItem = arr[index - 1];
  console.log('前一项:', previousItem.name);
} else {
  console.log('未找到或没有前一项');
}


