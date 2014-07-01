// clutch.factory('Lab', function(){
//   'use strict';

//   function toNumbers(lab) {
//     return {
//       l: parseInt(lab.l, 10),
//       a: parseInt(lab.a, 10),
//       b: parseInt(lab.b, 10)
//     }
//   }

//   var scales = {
//     // l: [100, 95, 90, 75, 66, 50, 33, 25, 10, 5, 0],
//     // a: [-128, -115, -102, -64, -44, 0, 41, 64, 102, 115, 127],
//     // b: [-128, -115, -102, -64, -44, 0, 41, 64, 102, 115, 127]
//     l: [ 100,  90,  80,  70,  60,  50,  40,  30,  20,  10, 0],
//     a: [-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
//     b: [-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
//   }

//   var lab = {
//     scales: scales,

//     toNumbers: toNumbers,

//     buildSpectrum: function() {
//       var spectrum = [], row, cells
//       scales.l.forEach(function(l){
//         row = []
//         scales.a.forEach(function(a){
//           cells = []
//           scales.b.forEach(function(b){
//             cells.push( chroma.lab(l, a, b).rgb() )
//           })
//           row.push(cells)
//         })
//         spectrum.push(row)
//       })
//       return spectrum
//     },

//     gridLA: function(b) {
//       var spectrum = [], row = [], cells =[]
//       scales.l.forEach(function(l){
//         cells = []
//         scales.a.forEach(function(a){
//           cells.push( chroma.lab(l, a, b).rgb() )
//         })
//         row.push(cells)
//       })
//       spectrum.push(row)
//       return spectrum
//     },

//     gridAB: function(l) {
//       var spectrum = [], row = [], cells =[]
//       scales.a.forEach(function(a){
//         cells = []
//         scales.b.forEach(function(b){
//           cells.push( chroma.lab(l, a, b).rgb() )
//         })
//         row.push(cells)
//       })
//       spectrum.push(row)
//       return spectrum
//     },

//     gridLB: function(a) {
//       var spectrum = [], row = [], cells =[]
//       scales.l.forEach(function(l){
//         cells = []
//         scales.b.forEach(function(b){
//           cells.push( chroma.lab(l, a, b).rgb() )
//         })
//         row.push(cells)
//       })
//       spectrum.push(row)
//       return spectrum
//     },

//     lScale: function(lab) {
//       var scale = []
//       scales.l.forEach(function(l){
//         scale.push( chroma.lab(l, lab.a, lab.b).rgb() )
//       })
//       return scale
//     },

//     aScale: function(lab) {
//       var scale = []
//       scales.a.forEach(function(a){
//         scale.push( chroma.lab(lab.l, a, lab.b).rgb() )
//       })
//       return scale
//     },

//     bScale: function(lab) {
//       var scale = []
//       scales.b.forEach(function(b){
//         scale.push( chroma.lab(parseInt(lab.l,10), lab.a, b).rgb() )
//       })
//       return scale
//     },

//     toHEX: function(lab) {
//       return chroma.lab(lab.l, lab.a, lab.b).hex()
//     }
//   }

//   return lab

// })

