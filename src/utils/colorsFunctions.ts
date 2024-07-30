function getRandomColor() {
  // Generates a random integer between 0 and 255
  const randomInt = () => Math.floor(Math.random() * 256);

  // Converts a single integer to a hexadecimal string and ensures it's two digits
  const toHex = (num: any) => num.toString(16).padStart(2, "0");

  // Generates and concatenates three color components (R, G, B)
  const color = `#${toHex(randomInt())}${toHex(randomInt())}${toHex(
    randomInt()
  )}`;

  return color;
}

export function getColor(name: string) {
  const lowerCaseName = (name || "").toLowerCase();

  if (lowerCaseName.includes("shopee")) {
    return "#fb6445";
  } else if (
    lowerCaseName.includes("mercado livre") ||
    lowerCaseName.includes("ml")
  ) {
    return "#ffe600";
  } else if (lowerCaseName.includes("magalu")) {
    return "#0086ff";
  } else if (lowerCaseName.includes("amazon")) {
    return "#c58253";
  } else if (lowerCaseName.includes("americanas")) {
    return "#f80032";
  } else {
    return getRandomColor();
  }
}
