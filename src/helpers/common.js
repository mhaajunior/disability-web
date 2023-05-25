export const thousandSeparator = (num) => {
  const numberFormatter = Intl.NumberFormat("en-US");
  const formatted = numberFormatter.format(num);
  return formatted;
};

export const isNull = (data, json) => {
  const content = json ? JSON.parse(data) : data;
  if (content && content !== " ") {
    return content;
  } else {
    return "-";
  }
};

export const removeLeadZero = (num) => {
  if (parseInt(num) !== 0) {
    const str = num.replace(/^0+/, "");
    return str;
  }
  return num;
};

export const padZero = (num, length) => {
  const trail = String(num).padStart(length, "0");
  return trail;
};
