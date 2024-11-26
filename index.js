const REGEX_CACHE = {
  // Cache Japanese character ranges in Set for faster lookup
  // Set.has() is faster than charCodeAt() comparison
  HIRAGANA: new Set(Array.from({length: 0x309F - 0x3040 + 1}, (_, i) => i + 0x3040)),
  KATAKANA: new Set(Array.from({length: 0x30FF - 0x30A0 + 1}, (_, i) => i + 0x30A0)),
  
  // Use Map and Set for languages with special characters for faster lookup
  // Map order is important: Vietnamese -> Turkish -> Spanish
  SPECIAL_CHARS: new Map([
    ['vi', new Set('àằắẳẵặầấẩẫậăâạảãềếểễệìỉĩịòỏõọôồốổỗộơờớởỡợùủũụưừứửữựỳỷỹỵđÀẰẮẲẴẶẦẤẨẪẬĂÂẠẢÃỀẾỂỄỆÌỈĨỊÒỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙỦŨỤƯỪỨỬỮỰỲỶỸỴĐ')],
    ['tr', new Set('çğıöşÇĞİÖŞ')],
    ['es', new Set('áéíóúñüÁÉÍÓÚÑÜ')]
  ]),
  
  // English detection regex with emoji support:
  // - Basic emoticons (U+2600 to U+26FF)
  // - Additional symbols and pictographs (U+2700 to U+27BF)
  // - Other symbols and pictographs (U+2B50 to U+2B59)
  // - Emoji (U+1F300 to U+1F9FF)
  // - Emoji modifier (U+FE0F)
  // - Skin tone modifiers (U+1F3FB to U+1F3FF)
  ENGLISH_CHARS: /^[A-Za-z0-9\s!@#$%^&*()\-–—_=+{};:,<.>/?\\|`~[\]'"''""…\u2600-\u26FF\u2700-\u27BF\u2B50-\u2B59\u{1F300}-\u{1F9FF}\uFE0F\u{1F3FB}-\u{1F3FF}]+$/u,
  HAS_ENGLISH_LETTER: /[A-Za-z]/
};

const hardcodedLanguageDetector = (text) => {
  if (!text) return 'unknown';
  
  // 1. Check English - must contain English letters and only allowed characters
  if (REGEX_CACHE.ENGLISH_CHARS.test(text) && REGEX_CACHE.HAS_ENGLISH_LETTER.test(text)) {
    return 'en';
  }
  
  // 2. Check Vietnamese (order matters, removed chars that overlap with Spanish)
  for (const char of text) {
    if (REGEX_CACHE.SPECIAL_CHARS.get('vi').has(char)) {
      return 'vi';
    }
  }
  
  // 3. Check Turkish (order matters, removed chars that overlap with Spanish)
  for (const char of text) {
    if (REGEX_CACHE.SPECIAL_CHARS.get('tr').has(char)) {
      return 'tr';
    }
  }
  
  // 4. Check Spanish
  for (const char of text) {
    if (REGEX_CACHE.SPECIAL_CHARS.get('es').has(char)) {
      return 'es';
    }
  }
  
  // 5. Check Japanese
  for (const char of text) {
    const code = char.charCodeAt(0);
    if (REGEX_CACHE.HIRAGANA.has(code) || REGEX_CACHE.KATAKANA.has(code)) {
      return 'ja';
    }
  }
  
  // 6. Check Chinese characters
  for (const char of text) {
    const code = char.charCodeAt(0);
    if ((code >= 0x4E00 && code <= 0x9FFF) || // Basic CJK
        (code >= 0x3400 && code <= 0x4DBF) || // Extension A
        (code >= 0xF900 && code <= 0xFAFF)) { // CJK Compatibility
      return 'hanz';
    }
  }
  
  // 7. Check all languages detectable by Unicode ranges
  for (const char of text) {
    const code = char.charCodeAt(0);
    
    if (code >= 0xAC00 && code <= 0xD7A3) return 'ko';      // Korean
    if (code >= 0x0900 && code <= 0x097F) return 'hi';      // Hindi
    if (code >= 0x0600 && code <= 0x06FF) return 'ar';      // Arabic
    if (code >= 0x0400 && code <= 0x04FF) return 'ru';      // Russian
    if (code >= 0x0E00 && code <= 0x0E7F) return 'th';      // Thai
    if (code >= 0x0590 && code <= 0x05FF) return 'iw';      // Hebrew
  }
  
  return 'unknown';
};

module.exports = hardcodedLanguageDetector;
