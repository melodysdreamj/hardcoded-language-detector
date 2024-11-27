const SCRIPT_RANGES = {
  // 라틴 알파벳 계열 (알파벳만 포함)
  LATIN: [
    [0x0041, 0x005A], // Basic Latin - Uppercase
    [0x0061, 0x007A], // Basic Latin - Lowercase
    [0x00C0, 0x00FF], // Latin-1 Supplement (악센트 포함)
    [0x0100, 0x017F], // Latin Extended-A
    [0x0180, 0x024F], // Latin Extended-B
    [0x1E00, 0x1EFF], // Latin Extended Additional
    [0x2C60, 0x2C7F], // Latin Extended-C
    [0xA720, 0xA7FF], // Latin Extended-D
    [0xAB30, 0xAB6F]  // Latin Extended-E
  ],
  
  // 키릴 문자 계열
  CYRILLIC: [
    [0x0400, 0x04FF], // Cyrillic
    [0x0500, 0x052F], // Cyrillic Supplement
    [0x2DE0, 0x2DFF], // Cyrillic Extended-A
    [0xA640, 0xA69F], // Cyrillic Extended-B
    [0x1C80, 0x1C8F]  // Cyrillic Extended-C
  ],
  
  // 아랍 문자 계열
  ARABIC: [
    [0x0600, 0x06FF], // Arabic (기본 아랍 문자)
    [0x0750, 0x077F], // Arabic Supplement (보충 문자)
    [0x08A0, 0x08FF], // Arabic Extended-A
    [0xFB50, 0xFDFF], // Arabic Presentation Forms-A
    [0xFE70, 0xFEFF], // Arabic Presentation Forms-B
    [0x0870, 0x089F]  // Arabic Extended-B
  ],
  
  // 데바나가리 문자 계열
  DEVANAGARI: [
    [0x0900, 0x097F], // Devanagari
    [0xA8E0, 0xA8FF], // Devanagari Extended
    [0x11B00, 0x11B5F] // Devanagari Extended-A
  ],
  
  // 브라흐미 계열
  BRAHMIC: [
    [0x0980, 0x09FF], // Bengali
    [0x0A00, 0x0A7F], // Gurmukhi
    [0x0A80, 0x0AFF], // Gujarati
    [0x0B00, 0x0B7F], // Oriya
    [0x0B80, 0x0BFF], // Tamil
    [0x0C00, 0x0C7F], // Telugu
    [0x0C80, 0x0CFF], // Kannada
    [0x0D00, 0x0D7F], // Malayalam
    [0x0D80, 0x0DFF], // Sinhala
    [0x11C00, 0x11C6F] // Bhaiksuki
  ],
  
  // 한자
  HAN: [
    [0x4E00, 0x9FFF],  // CJK Unified Ideographs
    [0x3400, 0x4DBF],  // CJK Unified Ideographs Extension A
    [0x20000, 0x2A6DF], // CJK Unified Ideographs Extension B
    [0x2A700, 0x2B73F], // CJK Unified Ideographs Extension C
    [0x2B740, 0x2B81F], // CJK Unified Ideographs Extension D
    [0x2B820, 0x2CEAF], // CJK Unified Ideographs Extension E
    [0x2CEB0, 0x2EBEF], // CJK Unified Ideographs Extension F
    [0x30000, 0x3134F], // CJK Unified Ideographs Extension G
    [0x31350, 0x323AF]  // CJK Unified Ideographs Extension H
  ],
  
  // 가나 문자 (히라가나, 카타카나)
  KANA: [
    [0x3040, 0x309F], // Hiragana
    [0x30A0, 0x30FF], // Katakana
    [0x31F0, 0x31FF], // Katakana Phonetic Extensions
    [0xFF65, 0xFF9F]  // Halfwidth Katakana
  ],
  
  // 한글
  HANGUL: [
    [0xAC00, 0xD7AF], // Hangul Syllables
    [0x1100, 0x11FF], // Hangul Jamo
    [0x3130, 0x318F], // Hangul Compatibility Jamo
    [0xA960, 0xA97F], // Hangul Jamo Extended-A
    [0xD7B0, 0xD7FF], // Hangul Jamo Extended-B
    [0xFFA0, 0xFFDC]  // Halfwidth Hangul
  ],
  
  // 태국 문자 계열
  THAI: [
    [0x0E00, 0x0E7F]  // Thai
  ],
  
  // 히브리 문자 계열
  HEBREW: [
    [0x0590, 0x05FF], // Hebrew
    [0xFB1D, 0xFB4F]  // Hebrew Presentation Forms
  ],
  
  // 그리스 문자 계열
  GREEK: [
    [0x0370, 0x03FF], // Greek and Coptic
    [0x1F00, 0x1FFF], // Greek Extended
    [0x10140, 0x1018F] // Ancient Greek Numbers
  ]
};

function isBasicAscii(code) {
  // 기본 ASCII 특수문자, 숫자, 공백 등
  return (code >= 0x0000 && code <= 0x007F) && 
         !/[a-zA-Z]/.test(String.fromCharCode(code));
}

function detectScriptFamily(text) {
  if (!text) return { top: 'un', un: 1 };

  const scriptCounts = {};
  let meaningfulCharCount = 0;
  
  for (const char of text) {
    const code = char.charCodeAt(0);
    
    // 기본 ASCII 특수문자/숫자는 건너뛰기
    if (isBasicAscii(code)) continue;
    
    meaningfulCharCount++;
    
    // 각 스크립트 범위 확인
    for (const [script, ranges] of Object.entries(SCRIPT_RANGES)) {
      for (const [start, end] of ranges) {
        if (code >= start && code <= end) {
          scriptCounts[script] = (scriptCounts[script] || 0) + 1;
          break;
        }
      }
    }
  }
  
  // 의미있는 문자가 없는 경우
  if (meaningfulCharCount === 0) return { top: 'un', un: 1 };
  
  // 각 스크립트의 비율 계산 (1% 이상인 것만 포함)
  const ratios = {};
  let maxRatio = 0;
  let topScript = 'un';
  
  for (const [script, count] of Object.entries(scriptCounts)) {
    const ratio = count / meaningfulCharCount;
    if (ratio >= 0.01) { // 1% 이상인 경우만 포함
      const scriptCode = getScriptCode(script);
      ratios[scriptCode] = Math.round(ratio * 100) / 100;
      
      // 최대 비율 스크립트 확인
      if (ratio > maxRatio) {
        maxRatio = ratio;
        topScript = scriptCode;
      }
    }
  }
  
  return Object.keys(ratios).length ? { top: topScript, ...ratios } : { top: 'un', un: 1 };
}

// 스크립트 코드 매핑 (3자리 고정)
function getScriptCode(script) {
  const codeMap = {
    LATIN: 'la',
    CYRILLIC: 'cy',
    ARABIC: 'ar',
    DEVANAGARI: 'de',
    BRAHMIC: 'br',
    HAN: 'hz',
    KANA: 'kn',
    HANGUL: 'hn',
    THAI: 'th',
    HEBREW: 'he',
    GREEK: 'gr'
  };
  return codeMap[script] || 'un';
}

module.exports = detectScriptFamily;