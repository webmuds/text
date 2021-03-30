// @ts-check

'use strict'

import { PAD_RX, STRIP_RX } from './constants.js'

/**
 * Pads a string.
 * @param {?string} text - text to be padded
 * @return {string}
 */
export function pad (text) {
  if (!text) return ''
  return text.replace(PAD_RX, basePad)
}

function basePad (_m1, _m2, length, alignment, repeatString, targetString) {
  let type
  switch (alignment) {
    case 'r':
      type = 'left'
      break
    case 'c':
      type = 'both'
      break
    default:
      type = 'right'
      break
  }
  return underscorePad(targetString, length, repeatString, type)
}

function underscorePad (str, length, padStr, type) {
  // For length calculation purposes, strip color codes from str,
  //   but keep originalString around (with color tags) to be returned.
  const originalString = str
  str = str.replace(STRIP_RX, '')
  const sizeDiff = originalString.length - str.length
  length = ~~length

  let padlen = 0
  let fill1 = ''
  let fill2 = ''
  if (!padStr || padStr === '') {
    padStr = ' '
  }

  let ceil, floor
  switch (type) {
    case 'right':
      padlen = length - str.length
      fill2 = strRepeat(padStr, padlen).substr(0, padlen)
      break
    case 'both':
      padlen = length - str.length
      ceil = Math.ceil(padlen / 2)
      floor = Math.floor(padlen / 2)
      fill1 = strRepeat(padStr, ceil).substr(0, ceil)
      fill2 = strRepeat(padStr, floor).substr(0, floor)
      break
    default: // 'left'
      padlen = length - str.length
      fill1 = strRepeat(padStr, padlen).substr(0, padlen)
      break
  }
  return (fill1 + originalString + fill2).substr(0, length + sizeDiff)
}

function strRepeat (str, qty) {
  if (qty < 1) return ''
  let result = ''
  while (qty > 0) {
    if (qty & 1) result += str
    qty >>= 1
    str += str
  }
  return result
}
