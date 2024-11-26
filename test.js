const hardcodedLanguageDetector = require('./index');

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
  ["नमस्ते कैसे हैं आप", "Hindi"],
  ["मैं ठीक हूं", "Hindi sentence"],
  ["שלום איך אתה", "Hebrew"],
  ["אני מדבר עברית", "Hebrew sentence"],
  ["Merhaba nasılsın", "Basic Turkish"],
  ["Günaydın", "Turkish with special characters"],
  ["Şeker şemsiye", "Turkish with Ş character"],
  ["Xin chào", "Basic Vietnamese"],
  ["Tôi yêu Việt Nam", "Vietnamese sentence"],
  ["สวัสดี", "Thai"],
  ["ผมสบายดี", "Thai sentence"],
  
  // Mixed text tests
  ["Hello 안녕 こんにちは", "Mixed Korean+Japanese+English"],
  ["新しい日本語と漢字", "Mixed Chinese and Hiragana"],
  ["こんにちは。漢字です。", "Mixed Hiragana and Chinese"],
  ["English with 한글", "Mixed English and Korean"],
  ["Русский with English", "Mixed Russian and English"],
  ["한글과 English와 漢字", "Mixed Korean+English+Chinese"],
  ["Español y English", "Mixed Spanish and English"],
  ["Türkçe and English", "Mixed Turkish and English"],
  ["العربية and English", "Mixed Arabic and English"],
  
  // Special cases
  ["12345!@#$%", "Numbers and special characters"],
  ["", "Empty string"],
  ["     ", "Whitespace only"],
  ["😊👋", "Emoji only"],
  ["Hello😊World", "English with emoji"],
  ["123.456,789", "Numbers with punctuation"],
  ["@#$%^&*()", "Special characters only"],
  
  // Long sentence tests
  ["これは日本語で書いた長い文章です。漢字も含まれています。", "Long Japanese sentence"],
  ["This is a long English sentence with some special characters !@#$%", "Long English sentence"],
  ["이것은 한글로 작성된 긴 문장입니다.", "Long Korean sentence"],
  ["这是一个用汉字写的长句子。", "Long Chinese sentence"],
  ["Это длинное предложение на русском языке.", "Long Russian sentence"],
  ["هذه جملة طويلة باللغة العربية.", "Long Arabic sentence"],
  ["यह एक लंबा हिंदी वाक्य है।", "Long Hindi sentence"],
  ["זהו משפט ארוך בעברית.", "Long Hebrew sentence"],
  ["Bu uzun bir Türkçe cümledir.", "Long Turkish sentence"],
  ["Đây là một câu tiếng Việt dài.", "Long Vietnamese sentence"],
  ["นี่คือประโยคภาษาไทยที่ยาว", "Long Thai sentence"],
  
  // Tests with special characters
  ["Español con números 123", "Spanish with numbers"],
  ["Türkçe şğı karakterler", "Turkish with special characters"],
  ["Tiếng Việt với dấu", "Vietnamese with diacritics"],
  ["한글123!@#", "Korean with special characters"],
  ["русский 123", "Russian with numbers"],
  ["عربي ١٢٣", "Arabic with Arabic numerals"],
  ["עברית 123", "Hebrew with numbers"]
];

console.log("=== Language Detection Test Start ===\n");

tests.forEach(([text, description]) => {
  console.log(`Test: ${description}`);
  console.log(`Input: "${text}"`);
  console.log(`Result: ${hardcodedLanguageDetector(text)}\n`);
});

console.log("=== Language Detection Test End ===");
