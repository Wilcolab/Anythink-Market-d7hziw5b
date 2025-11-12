const assert = require('assert');
const dotCase = require('../lib/dotCase');

const cases = [
  ['HelloWorld', 'hello.world'],
  ['some_text-here', 'some.text.here'],
  ['  multiple   separators ', 'multiple.separators'],
  ['snake_case', 'snake.case'],
  ['kebab-case', 'kebab.case'],
  ['mixedUP_and-Down', 'mixed.up.and.down'],
  ['numbers123AndWords', 'numbers123.and.words'],
  ['', ''],
  [null, ''],
  ['Already.Dot.Case', 'already.dot.case']
];

cases.forEach(([input, expected]) => {
  const out = dotCase(input);
  console.log(`'${input}' -> '${out}'`);
  assert.strictEqual(out, expected);
});

console.log('All dotCase tests passed');
