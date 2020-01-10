// Функции-валидаторы для всех примеров

// Возвращает true, если символ является валидным символом логина.
export const isValidLoginCharacter = char =>
  (char >= "a" && char <= "z") || char === "_";

// Возвращает true, если все символы строки является валидными символами логина
export const isValidLogin = login =>
  login &&
  login.trim() &&
  login.split("").every(char => isValidLoginCharacter(char));

// Возвращает true, если строка явлется валидным email (не пустая, содержит @).
// Проверка упрощенная, в реальном приложении скорее всего будет несколько сложнее.
export const isValidEmail = email => email === "" || email.includes("@");
