// @ts-check

'use strict'

import { COLOR_RX } from './constants.js'

/**
 * Convert color tags into HTML tags.
 * @param {string} text
 * @return {string}
 */
export function html (text) {
  return text.replace(COLOR_RX, '<span class="wm$2">$3</span>')
}
