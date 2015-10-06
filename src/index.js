var famous = require('famous')
var FamousEngine = famous.core.FamousEngine
var DOMElement = famous.domRenderables.DOMElement

var scene = FamousEngine.createScene()

var someList = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']

FamousEngine.init()

var ulNode = scene.addChild()
  .setSizeMode(0, 1, 0)
  .setProportionalSize(0.5, 0, 0)
  .setAbsoluteSize(0, 120, 0)
  .setAlign(0.5, 0.5, 0)
  .setOrigin(0.5, 0, 0)
  .setMountPoint(0.5, 1, 0)
new DOMElement(ulNode, {
  tagName: 'ul',
  properties: {
    'background-color': 'hotpink'
  }
})













// Bernard's Helpers
addTitle('Layout')
addControls()
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
  }).setAttribute('name', 'value').setAttribute('placeholder', 'AlignX')
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