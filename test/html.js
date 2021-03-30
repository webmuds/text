// @ts-check

'use strict'

import { expect } from 'chai'
import { html } from '../src/html.js'

describe('#html', function () {
  it('replaces colors', function () {
    const result = html('{yellow}Yellow{/} Text')
    expect(result).to.equal('<span class="wmyellow">Yellow</span> Text')
  })

  it('auto-closes open tags when another tag is used', function () {
    const result = html('{yellow}Yellow{red}Red{/} Text')
    expect(result).to.equal('<span class="wmyellow">Yellow</span><span class="wmred">Red</span> Text')
  })

  it('auto-closes open tags at end of string', function () {
    const result = html('It is {lime}green')
    expect(result).to.equal('It is <span class="wmlime">green</span>')
  })
})
