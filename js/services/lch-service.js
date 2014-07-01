// gooey.factory('Lch', function(){
//   'use strict';

//   function toNumbers(lch) {
//     return {
//       l: parseInt(lch.l, 10),
//       c: parseInt(lch.c, 10),
//       h: parseInt(lch.h, 10)
//     }
//   }

//   // TODO: add an offset
//   function buildScale(min, max, by, off) {
//     var scale = []
//     var i

//     off =  parseInt(off, 10) || 0
//     min = (parseInt(min, 10) || 0) + off
//     max = (parseInt(max, 10) || 100) + off
//     by  =  parseInt(by,  10) || 1

//     for (i = min; i <= max; i += by) {
//       scale.push(i)
//     }

//     return scale
//   }

//   var scales = {
//     l: [5, 10, 15, 25, 33, 50, 66, 75, 85, 90, 95],
//     c: [5, 10, 15, 25, 33, 50, 66, 75, 85, 90, 95],
//     h: buildScale(0, 360-10, 10, 0)
//   }

//   var Lch = {
//     scales: scales,

//     toNumbers: toNumbers,

//     toHEX: function(lch) {
//       return chroma.lch(lch.l, lch.c, lch.h).hex()
//     },

//     buildScales: function(lch) {
//       // var scales = {
//       //   l: buildScale(0, 100, 1),
//       //   c: buildScale(0, 100, 1, lch.oc),
//       //   h: buildScale(0, 360-5, 5, lch.oh)
//       // }
//       return scales
//     },

//     // build one of each
//     grids: function(lch) {
//       var grids = {
//         l: {
//           ch: [],
//           scale: []
//         },
//         c: {
//           lh: [],
//           scale: []
//         },
//         h: {
//           lc: [],
//           scale: []
//         },
//         palette: []
//       }

//       var lightnessRow = []
//       // var cells = []
//       // var cell

//       scales.l.forEach(function(l, li){
//         // reset each loop
//         lightnessRow = []

//         // placing empty arrays for gaps
//         // if (li == 3 || li == 8) grids.palette.unshift(['transparent'])

//         // build the stuff we need off of this loop
//         if (grids.l.scale.length < scales.l.length) {
//           grids.l.scale.push( chroma.lch(l, lch.c, lch.h).hex() )
//         }

//         scales.c.forEach(function(c){
//           if (grids.c.scale.length < scales.c.length) {
//             grids.c.scale.push( chroma.lch(lch.l, c, lch.h).hex() )
//           }
//         })

//         scales.h.forEach(function(h){
//           if (grids.h.scale.length < scales.h.length) {
//             grids.h.scale.push( chroma.lch(lch.l, lch.c, h).hex() )
//           }
//           lightnessRow.push( chroma.lch(l, lch.c, h).hex() )
//         })

//         // close off
//         grids.palette.unshift(lightnessRow)

//       })

//       return grids
//     }

//   }

//   return Lch

// })
