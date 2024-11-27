# hardcoded-language-detector

A powerful script family detection library that analyzes text using Unicode ranges to determine the ratio of different writing systems present in the text.

## Features

- Fast and accurate script family detection using Unicode ranges
- Returns ratios of different script families in the text
- Identifies the dominant script family
- Supports mixed script detection
- Handles special characters and numbers
- No external dependencies
- Lightweight (~20KB)

## Installation

```bash
npm install hardcoded-language-detector
```

## Supported Script Families

Each script family is represented by a two-letter code:

- Latin (la) - Basic Latin, Extended Latin-A to E
  - English, French, German, Spanish, Portuguese, Vietnamese, Turkish, etc.
  - Includes diacritics and special characters used in European languages

- Cyrillic (cy) - Cyrillic and Extensions
  - Russian, Ukrainian, Bulgarian, Serbian, Belarusian, etc.

- Arabic (ar) - Arabic and Extensions
  - Arabic, Persian (Farsi), Urdu, Kurdish, Sindhi
  - Includes all Arabic presentation forms and supplements

- Devanagari (de) - Devanagari and Extensions
  - Hindi, Marathi, Sanskrit, Nepali, etc.

- Brahmic (br) - Various Brahmic family scripts
  - Bengali, Tamil, Telugu, Kannada, Malayalam
  - Gujarati, Gurmukhi (Punjabi), Oriya, Sinhala

- Han (hz) - CJK Unified Ideographs
  - Chinese (Traditional & Simplified)
  - Japanese Kanji
  - Korean Hanja
  - Includes all CJK extensions (A through H)

- Kana (kn) - Japanese syllabaries
  - Hiragana
  - Katakana (including half-width forms)
  - Phonetic extensions

- Hangul (hn) - Korean writing system
  - Modern Hangul syllables
  - Archaic Korean letters
  - Compatibility Jamo
  - Half-width forms

- Thai (th) - Thai script
  - Thai language characters
  - Thai digits and symbols

- Hebrew (he) - Hebrew script
  - Modern Hebrew
  - Biblical Hebrew
  - Includes presentation forms

- Greek (gr) - Greek and Coptic
  - Modern Greek
  - Ancient Greek
  - Extended Greek
  - Ancient Greek numbers

- Unknown (un) - Unrecognized scripts or special characters
  - Numbers
  - Punctuation marks
  - Special symbols
  - Emojis
  - Other Unicode characters not in above categories

## Usage

```javascript
const detectScriptFamily = require('hardcoded-language-detector');

// Single script
console.log(detectScriptFamily('Hello World'));
// Output: { top: 'la', la: 1 }

console.log(detectScriptFamily('안녕하세요'));
// Output: { top: 'hn', hn: 1 }

// Mixed scripts
console.log(detectScriptFamily('Hello 안녕 こんにちは'));
// Output: { top: 'la', la: 0.33, hn: 0.33, kn: 0.34 }

// Special cases
console.log(detectScriptFamily('123!@#'));
// Output: { top: 'un', un: 1 }

console.log(detectScriptFamily(''));
// Output: { top: 'un', un: 1 }
```

## Return Value Format

The function returns an object with:
- `top`: The dominant script family code (highest ratio)
- Script family codes as keys with their ratios as values
- Ratios are rounded to 2 decimal places
- Only ratios >= 0.01 (1%) are included
- Unknown or special characters are marked as 'un'

## Error Handling

- Empty strings return `{ top: 'un', un: 1 }`
- Strings with only numbers/special characters return `{ top: 'un', un: 1 }`
- Invalid input (null/undefined) returns `{ top: 'un', un: 1 }`

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Note on Code Blocks

When using this library in documentation, please be careful with code blocks containing CJK characters. Some markdown processors might have issues with Unicode characters in code blocks. Always test the documentation rendering with CJK examples.
