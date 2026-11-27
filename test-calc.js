#!/usr/bin/env node
/* Comprueba la calculadora de la landing de clínicas. Uso: node test-calc.js */
const assert = require('assert');
const src = require('fs').readFileSync(__dirname + '/index.html', 'utf8')
  .match(/function calcEscapa\([\s\S]*?\n}\n/)[0];
const calc = new Function(src + 'return calcEscapa;')();

// 24 presupuestos/mes sin respuesta, 20 mensajes/semana fuera de horario, factura media 1.200 €
assert.deepStrictEqual(calc(24, 20, 1200),
  { pres: 288, mens: 920, n: 518, total: 621600, decima: 62160 });
assert.deepStrictEqual(calc(0, 0, 1200), { pres: 0, mens: 0, n: 0, total: 0, decima: 0 }); // nada se escapa
assert.deepStrictEqual(calc(10, 0, 0), { pres: 120, mens: 0, n: 120, total: 0, decima: 0 }); // importe cero
assert.strictEqual(calc(NaN, 3, 1200), null);                               // campo vacío
assert.strictEqual(calc(10, NaN, 1200), null);
assert.strictEqual(calc(10, 3, NaN), null);
assert.strictEqual(calc(-1, 0, 1200), null);                                // negativos
assert.strictEqual(calc(10, -2, 1200), null);
assert.strictEqual(calc(10, 3, -5), null);
console.log('calculadora: ok');
