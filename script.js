const form = document.getElementById("card-generator");
const generatedCards = document.getElementById("generated-cards");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const bin = form.bin.value || "";
  const month = form.month.value || "";
  const year = form.year.value || "";
  const cvv = form.cvv.value || "";
  const numberOfStrings = Number(form.number_of_strings.value);
  
  const generatedStrings = [];
  for (let i = 0; i < numberOfStrings; i++) {
    generatedStrings.push(generateRandomString(bin, month, year, cvv));
  }
  
  generatedCards.value += generatedStrings.join("\n") + "\n";
});

function generateRandomString(bin = "", month = "", year = "", cvv = "") {
  const binLength = 16;
  if (bin.length < binLength) {
    for (let i = bin.length; i < binLength; i++) {
      bin += String(Math.floor(Math.random() * 10));
    }
  }
  const checkDigit = calculateLuhn(bin);
  bin += String(checkDigit);
  const separator1 = "|";
  if (!month) {
    month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  }
  const separator2 = "|";
  if (!year) {
    year = String(Math.floor(Math.random() * 9) + 2023);
  }
  const separator3 = "|";
  if (!cvv) {
    cvv = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  }
  return bin + separator1 + month + separator2 + year + separator3 + cvv;
}

function calculateLuhn(partialCardNumber) {
  const digitsOf = (n) => [...String(n)].map(Number);
  const digits = digitsOf(partialCardNumber);
  const oddDigits = digits.slice(-1, -digits.length - 1, -2);
  const evenDigits = digits.slice(-2, -digits.length - 1, -2);
  let checksum = 0;
  checksum += oddDigits.reduce((sum, digit) => sum + digit, 0);
  for (const d of evenDigits) {
    checksum += digitsOf(d * 2).reduce((sum, digit) => sum + digit, 0);
  }
  return checksum % 10 === 0 ? 0 : 10 - (checksum % 10);
}
