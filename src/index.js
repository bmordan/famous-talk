var famous = require('famous')
var FamousEngine = famous.core.FamousEngine
var DOMElement = famous.domRenderables.DOMElement

var scene = FamousEngine.createScene()

var someList = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']

FamousEngine.init()

var ulNode = scene.addChild()
  .setSizeMode(0, 1, 1)
  .setProportionalSize(0.5, 0, 0)
  .setAbsoluteSize(0, 120, 0)
  .setAlign(0.5, 0.6, 0)
  .setOrigin(0.5, 0, 0)
  .setMountPoint(0.5, 1, 0)
new DOMElement(ulNode, {tagName: 'ul'})



















// Bernard's Helpers
addTitle('Positioning')
addControls()
addLabels()
function addTitle (title) {
  var titleNode = scene.addChild()
    .setSizeMode(0, 1, 0)
    .setProportionalSize(0.5, 0, 0)
    .setAbsoluteSize(0, 120, 0)
    .setAlign(0.5, 0.2, 0)
    .setOrigin(0.5, 0.5, 0)
    .setMountPoint(0.5, 0.5, 0)
  var logoNode = titleNode.addChild()
    .setSizeMode(1, 1, 2)
    .setAbsoluteSize(50, 50, 0)
    .setOrigin(0.5, 0.5, 0.5)
    .setMountPoint(0, 0, 1)
  new DOMElement(titleNode, {
    tagName: 'h1',
    content: title,
    properties: {
      'text-align': 'center',
      'line-height': '97px'
    }
  })
  new DOMElement(logoNode, {
    tagName: 'img'
  }).setAttribute('src', './images/famous_logo.png')
}
function addControls () {
  var controlNode = scene.addChild()
    .setSizeMode(0, 1, 0)
    .setProportionalSize(1, 0, 0)
    .setAbsoluteSize(0, 60, 0)
    .setOrigin(0, 1, 0)
    .setMountPoint(0, 1, 0)
    .setAlign(0, 1, 0)
  new DOMElement(controlNode, {tagName: 'section'})
  var inputNode = controlNode.addChild()
    .setSizeMode(1, 1, 0)
    .setAbsoluteSize(60, 30, 0)
    .setAlign(0, 0.5, 0)
    .setOrigin(0, 0.5, 0)
    .setMountPoint(0, 0.5, 0)
    .setPosition(20, 0, 0)
  new DOMElement(inputNode, {
    tagName: 'input'
  }).setAttribute('name', 'value').setAttribute('placeholder', 'x,y')
  addEvents(inputNode)
}
function addEvents (node) {
  node.addUIEvent('blur')
  node.onReceive = function (event, payload) {
    if (event === 'blur') {
      var values = payload.value.split(',').map(function (v) {
        var decimal = v.split('.')[1]
        if (decimal) return parseInt(decimal)/10
        return parseInt(v)
      })
      console.log(values)
      ulNode.setAlign(values[0], values[1], 0)
    }
  }
}
function addLabels () {
  var topLeft = ulNode.addChild()
    .setSizeMode(1, 1)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setAlign(0, 0, 1)
    .setAbsoluteSize(100, 27)
  new DOMElement(topLeft, {
    tagName: 'li',
    content: '[0, 0]'
  })
  var topCenter = ulNode.addChild()
    .setSizeMode(1, 1)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setAlign(0.5, 0, 1)
    .setAbsoluteSize(100, 27)
  new DOMElement(topCenter, {
    tagName: 'li',
    content: '[0.5, 0]'
  })
  var topRight = ulNode.addChild()
    .setSizeMode(1, 1)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setAlign(1, 0, 1)
    .setAbsoluteSize(100, 27)
  new DOMElement(topRight, {
    tagName: 'li',
    content: '[1, 0]'
  })
  var midLeft = ulNode.addChild()
    .setSizeMode(1, 1)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setAlign(0, 0.5, 1)
    .setAbsoluteSize(100, 27)
  new DOMElement(midLeft, {
    tagName: 'li',
    content: '[0, 0.5]'
  })
  var midCenter = ulNode.addChild()
    .setSizeMode(1, 1)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setAlign(0.5, 0.5, 1)
    .setAbsoluteSize(100, 27)
  new DOMElement(midCenter, {
    tagName: 'li',
    content: '[0.5, 0.5]'
  })
  var midRight = ulNode.addChild()
    .setSizeMode(1, 1)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setAlign(1, 0.5, 1)
    .setAbsoluteSize(100, 27)
  new DOMElement(midRight, {
    tagName: 'li',
    content: '[1, 0.5]'
  })
  var baseLeft = ulNode.addChild()
    .setSizeMode(1, 1)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setAlign(0, 1, 1)
    .setAbsoluteSize(100, 27)
  new DOMElement(baseLeft, {
    tagName: 'li',
    content: '[0, 1]'
  })
  var baseCenter = ulNode.addChild()
    .setSizeMode(1, 1)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setAlign(0.5, 1, 1)
    .setAbsoluteSize(100, 27)
  new DOMElement(baseCenter, {
    tagName: 'li',
    content: '[0.5, 1]'
  })
  var baseRight = ulNode.addChild()
    .setSizeMode(1, 1)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setAlign(1, 1, 1)
    .setAbsoluteSize(100, 27)
  new DOMElement(baseRight, {
    tagName: 'li',
    content: '[1, 1]'
  })
}