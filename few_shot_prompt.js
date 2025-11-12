// few_shot_prompt.js

/**
 * Convert a value to camelCase (lowerCamelCase).
 *
 * This utility normalizes common separators (spaces, underscores, hyphens and
 * other non-alphanumeric characters) into tokens, then produces a lowerCamelCase
 * string: the first token is lowercased and subsequent tokens are capitalized.
 *
 * Key behaviors:
 * - Accepts any input; non-strings are treated as invalid and result in ''.
 * - Trims leading/trailing whitespace.
 * - If no separators are present the function preserves interior casing but
 *   forces the first character to lowercase (e.g. `HelloWorld` -> `helloWorld`).
 * - Uses a Unicode-aware separator regex to handle letters and numbers from
 *   various languages (\p{L}, \p{N}).
 *
 * @param {string} input - The input string to convert. If `input` is not a
 *   string (including `null`/`undefined`), the function returns an empty string.
 * @returns {string} A lowerCamelCase representation of the input. Returns ''
 *   for non-string, null, undefined or empty inputs.
 *
 * @example
 * // Basic examples
 * toCamelCase('first name') // 'firstName'
 * toCamelCase('user_id') // 'userId'
 * toCamelCase('SCREEN_NAME') // 'screenName'
 * toCamelCase('mobile-number') // 'mobileNumber'
 *
 * @example
 * // Edge cases and notes
 * toCamelCase('  leading and trailing  ') // 'leadingAndTrailing'
 * toCamelCase('version 2 update') // 'version2Update'  // numbers preserved
 * toCamelCase(null) // ''
 *
 * @remarks
 * Complexity: O(n) where n is the input length.
 */
function toCamelCase(input) {
    if (typeof input !== 'string') return '';

    const s = input.trim();
    if (s === '') return '';

    // Split on any non-letter/number characters (unicode-aware)
    const sepRegex = /[^\p{L}\p{N}]+/u;
    if (sepRegex.test(s)) {
        const parts = s
            .split(sepRegex)
            .filter(Boolean)
            .map(p => p.toLowerCase());

        if (parts.length === 0) return '';

        return parts[0] + parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    }

    // No separators: preserve existing interior casing but ensure first char is lowercase
    return s.charAt(0).toLowerCase() + s.slice(1);
}

function addNumbers(a, b) {
    const validateNumber = (value, name) => {
        if (value === undefined || value === null) {
            throw new TypeError(`${name} is ${value === null ? 'null' : 'undefined'}`);
        }
        if (typeof value !== 'number' || !Number.isFinite(value)) {
            throw new TypeError(`${name} must be a finite number, received ${String(value)} (${typeof value})`);
        }
    };

    validateNumber(a, 'First argument');
    validateNumber(b, 'Second argument');

    return a + b;
}

module.exports = { toCamelCase, addNumbers };