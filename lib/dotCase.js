/**
 * Convert a value to dot.case (lowercase words separated by dots).
 *
 * This utility accepts strings (and other values which are coerced to
 * string) and normalizes different naming conventions into a compact
 * dot-separated lowercase form:
 * - camelCase / PascalCase -> words separated at case boundaries
 * - snake_case, kebab-case, spaces and punctuation -> treated as separators
 * - consecutive separators collapse to a single dot
 * - leading/trailing separators are ignored
 *
 * Examples:
 *   dotCase('HelloWorld') -> 'hello.world'
 *   dotCase('some_text-here') -> 'some.text.here'
 *   dotCase('  multiple   separators ') -> 'multiple.separators'
 *
 * Contract
 * @param {any} input - Value to convert. `null`/`undefined` become '' (empty string).
 * @returns {string} A dot.case representation (lowercased). Returns '' for
 *                   null/undefined/empty input.
 *
 * Edge cases
 * - Non-string inputs will be coerced to string; `null`/`undefined` -> ''
 * - Numbers inside tokens are preserved (e.g. 'v2Beta' -> 'v2.beta')
 *
 * Complexity: O(n) where n is the length of the input string.
 */

function dotCase(input) {
  if (input == null) return '';
  const s = String(input).trim();
  if (s.length === 0) return '';

  // 1) Insert a separator between camelCase boundaries: aB -> a B
  let step = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

  // 2) Replace any non-alphanumeric runs with a space
  step = step.replace(/[^A-Za-z0-9]+/g, ' ');
function dotCase(input) {
  if (input == null) return '';
  const s = String(input).trim();
  if (s.length === 0) return '';

  // 1) Insert a separator between camelCase boundaries: aB -> a B
  let step = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

  // 2) Replace any non-alphanumeric runs with a space
  step = step.replace(/[^A-Za-z0-9]+/g, ' ');
  // 3) Split on whitespace, filter empties, join with dots, lowercase
  const parts = step.split(/\s+/).filter(Boolean);
  return parts.map(p => p.toLowerCase()).join('.');
  // 3) Split on whitespace, filter empties, join with dots, lowercase
  const parts = step.split(/\s+/).filter(Boolean);
  return parts.map(p => p.toLowerCase()).join('.');
}

module.exports = dotCase;
module.exports.default = dotCase;

// Named export for ES modules
exports.dotCase = dotCase;
