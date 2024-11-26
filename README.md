# hardcoded-language-detector

A simple and fast language detection library that uses hardcoded Unicode ranges and special characters to detect languages.

## Supported Languages

- English (en)
- Vietnamese (vi) 
- Turkish (tr)
- Spanish (es)
- Japanese (ja)
- Chinese (hanz)
- Korean (ko)
- Hindi (hi)
- Arabic (ar)
- Russian (ru)
- Thai (th)
- Hebrew (iw)

## Installation

```bash
npm install hardcoded-language-detector
```

## Usage

```javascript
const detectLanguage = require('hardcoded-language-detector');

// Basic usage
console.log(detectLanguage('Hello World')); // 'en'
console.log(detectLanguage('안녕하세요')); // 'ko'
console.log(detectLanguage('こんにちは')); // 'ja'
console.log(detectLanguage('你好')); // 'hanz'

// With special characters
console.log(detectLanguage('¿Cómo estás?')); // 'es'
console.log(detectLanguage('Günaydın')); // 'tr'
console.log(detectLanguage('Xin chào')); // 'vi'

// With emojis
console.log(detectLanguage('Hello 👋')); // 'en'
console.log(detectLanguage('Hello 😊 World')); // 'en'

// Mixed text (returns first detected language)
console.log(detectLanguage('Hello 안녕')); // 'ko'
```

## Features

- Fast detection using hardcoded Unicode ranges
- Support for special characters and diacritics
- Emoji support for English text
- Prioritized language detection order
- No external dependencies
- Lightweight

## Language Detection Priority

1. English (if text only contains English letters, numbers, punctuation, and emojis)
2. Vietnamese
3. Turkish
4. Spanish
5. Japanese
6. Chinese
7. Other languages (Korean, Hindi, Arabic, Russian, Thai, Hebrew)

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
