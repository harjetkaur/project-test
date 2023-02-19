function luhn_checksum(card_number) {
  function digits_of(n) {
      return Array.from(String(n), Number);
  }
  let digits = digits_of(card_number);
  let odd_digits = digits.filter((_, i) => i % 2 === 0).reverse();
  let even_digits = digits.filter((_, i) => i % 2 !== 0).reverse();
  let checksum = 0;
  checksum += odd_digits.reduce((acc, val) => acc + val, 0);
  for (let d of even_digits) {
      checksum += digits_of(d * 2).reduce((acc, val) => acc + val, 0);
  }
  return checksum % 10;
}

function calculate_luhn(partial_card_number) {
  let check_digit = luhn_checksum(parseInt(partial_card_number) * 10);
  return check_digit === 0 ? check_digit : 10 - check_digit;
}

function generate_random_string(bin = '', month = '', year = '', cvv = '') {
  const bin_length = 16;
  if (bin.length < bin_length) {
      bin += Math.floor(Math.random() * 10);
  }
  let check_digit = calculate_luhn(bin);
  bin += check_digit;
  let separator_1 = '|';
  if (!month) {
      month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  }
  let separator_2 = '|';
  if (!year) {
      year = String(Math.floor(Math.random() * 9) + 2023);
  }
  let separator_3 = '|';
  if (!cvv) {
      cvv = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  }
  return bin + separator_1 + month + separator_2 + year + separator_3 + cvv;
}

const form = document.getElementById('card-generator');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const bin = form.elements['bin'].value;
  const month = form.elements['month'].value;
  const year = form.elements['year'].value;
  const cvv = form.elements['cvv'].value;
  const number_of_strings = parseInt(form.elements['number_of_strings'].value) || 10;
  const generatedStrings = [];
  for (let i = 0; i < number_of_strings; i++) {
      generatedStrings.push(generate_random_string(bin, month, year, cvv));
  }
  const generatedCardsTextarea = document.getElementById('generated-cards');
  generatedCardsTextarea.value = generatedStrings.join('\n');
});

