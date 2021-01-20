exports.justify = (maxLineLength, text) => {
  const textArray = text.split(' ');
  const resultArray = [];
  let textLine = "";
  textArray.map(word => {
    if (textLine.length + word.length <= maxLineLength) {
      textLine += word;
      if (textLine.length < 80) {
        textLine += " ";
      }
    } else {
      textLine += "\n";
      resultArray.push(textLine);
      textLine = word + " ";
    }
  })
  resultArray.push(textLine);
  return ("".concat(...resultArray));
};
