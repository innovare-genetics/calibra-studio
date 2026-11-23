#!/usr/bin/env node
/* Comprueba la calculadora de la landing de clínicas. Uso: node test-calc.js */
const assert = require('assert');
const src = require('fs').readFileSync(__dirname + '/index.html', 'utf8')
  .match(/function calcParado\([\s\S]*?\n}\n/)[0];
const calc = new Function(src + 'return calcParado;')();

assert.deepStrictEqual(calc(300, 40, 350), { n: 340, total: 119000, decima: 11900 });
assert.deepStrictEqual(calc(0, 0, 350), { n: 0, total: 0, decima: 0 });     // nada parado
assert.deepStrictEqual(calc(10, 0, 0), { n: 10, total: 0, decima: 0 });     // importe cero
assert.strictEqual(calc(NaN, 3, 350), null);                                // campo vacío
assert.strictEqual(calc(10, NaN, 350), null);
assert.strictEqual(calc(10, 3, NaN), null);
assert.strictEqual(calc(-1, 0, 350), null);                                 // negativos
assert.strictEqual(calc(10, -2, 350), null);
assert.strictEqual(calc(10, 3, -5), null);
console.log('calculadora: ok');
