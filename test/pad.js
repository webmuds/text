// @ts-check

'use strict'

import { expect } from 'chai'
import { pad } from '../src/pad.js'

describe('#pad', function () {
  it('pads strings', function () {
    const result = pad('This is {%20}padded{%} text')
    expect(result).to.equal('This is padded               text')
  })

  it('pads strings to the right', function () {
    const result = pad('This is {%20r}right-padded{%} text')
    expect(result).to.equal('This is         right-padded text')
  })

  it('pads strings with filler', function () {
    const result = pad('This is {%20=}left-padded{%} text with different filler')
    expect(result).to.equal('This is left-padded========= text with different filler')
  })

  it('pads strings with filler to the right', function () {
    const result = pad('This is {%20r=}right-padded{%} text with different filler')
    expect(result).to.equal('This is ========right-padded text with different filler')
  })

  it('centers text', function () {
    const result = pad('This is {%20c}centered{%} text')
    expect(result).to.equal('This is       centered       text')
  })

  it('does not count color tags', function () {
    const result = pad('This is {%20c}cen{white}te{/}red{%} text with colors')
    expect(result).to.equal('This is       cen{white}te{/}red       text with colors')
  })

  it('cuts text that goes past limits', function () {
    const result = pad('This is {%3}overflowing{%} text')
    expect(result).to.equal('This is ove text')
  })

  it('is fancy', function () {
    const result = pad('+{%40c-} Fancy Title {%}+')
    expect(result).to.equal('+-------------- Fancy Title -------------+')
  })

  it('works with nulls', function () {
    let result = pad(null)
    expect(result).to.equal('')
    result = pad(undefined)
    expect(result).to.equal('')
  })

  it('pads multiple times', function () {
    const result = pad('+{%20c-} Fancy Title {%}+ +{%20c-} Me Too {%}+')
    expect(result).to.equal('+---- Fancy Title ---+ +------ Me Too ------+')
  })
})
