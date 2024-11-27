const detectScriptFamily = require('./index');

const tests = [
  // Basic language tests
  ["Hello, how are you?", "Basic English"],
  ["What's your name?", "English with apostrophe"],
  ["¡Hola! ¿Cómo estás?", "Spanish with special characters"],
  ["¿Qué tal el día?", "Spanish with question marks"],
  ["こんにちは", "Hiragana"],
  ["コンニチハ", "Katakana"],
  ["ひらがなとカタカナ", "Mixed Hiragana and Katakana"],
  ["안녕하세요", "Korean"],
  ["한글 테스트 입니다", "Korean with spaces"],
  ["你好", "Chinese characters"],
  ["我是中国人", "Chinese sentence"],
  ["Привет как дела?", "Russian"],
  ["Здравствуйте", "Russian greeting"],
  ["مرحبا كيف حالك", "Arabic"],
  ["السَّلامُ عَلَيْكُمْ", "Arabic with diacritics"],
  ["नमस्ते कैसे हैं आप", "Hindi/Devanagari"],
  ["বাংলা টেক্সট", "Bengali/Brahmic"],
  ["שלום איך אתה", "Hebrew"],
  ["สวัสดี", "Thai"],
  
  // Mixed text tests
  ["Hello 안녕 こんにちは", "Mixed Latin+Hangul+Kana"],
  ["新しい日本語と漢字", "Mixed Kana and Han"],
  ["English with 한글", "Mixed Latin and Hangul"],
  ["Русский with English", "Mixed Cyrillic and Latin"],
  ["한글과 English와 漢字", "Mixed Hangul+Latin+Han"],
  
  // Special cases
  ["12345!@#$%", "Numbers and special characters"],
  ["", "Empty string"],
  ["     ", "Whitespace only"],
  ["😊👋", "Emoji only"],
  ["Hello😊World", "Latin with emoji"],
  
  // Tests with special characters
  ["한글123!@#", "Hangul with special characters"],
  ["Latin ABC 123", "Latin with numbers"],
  ["русский 123", "Cyrillic with numbers"],
  ["漢字123", "Han with numbers"]
];

console.log("=== Script Family Detection Test Start ===\n");

tests.forEach(([text, description]) => {
  console.log(`Test: ${description}`);
  console.log(`Input: "${text}"`);
  console.log(`Result: ${JSON.stringify(detectScriptFamily(text))}\n`);
});

console.log("=== Script Family Detection Test End ===");
