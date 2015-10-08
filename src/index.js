var famous = require('famous')
var FamousEngine = famous.core.FamousEngine
var DOMElement = famous.domRenderables.DOMElement
var scene = FamousEngine.createScene()

addTitle('What is Famous?')
addPhotos()
FamousEngine.init()

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
function addPhotos () {
  var opacity = new famous.transitions.Transitionable(0)
    .set(1, {duration: 120000, curve: 'inQuart'})

  var photosNode = scene.addChild()
    .setSizeMode(0, 0)
    .setProportionalSize(0.5, 0.5)
    .setAlign(0.5, 0.6)
    .setOrigin(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
  var photos = new DOMElement(photosNode, {
    tagName: 'article',
    properties: {
      'opacity': '0',
      'border-radius': '5px',
      'border': 'solid 2px #E7E7E6'
    }
  })

  var update = photosNode.addComponent({
    onUpdate: function (time) {
      var op = opacity.get().toFixed(5)
      photos.setProperty('opacity', op)
      photosNode.requestUpdateOnNextTick(update)
    }
  })
  photosNode.requestUpdate(update)
  var steveNode = photosNode.addChild()
    .setSizeMode(0, 0)
    .setProportionalSize(0.5, 1)
    .setAlign(1, 0)
    .setOrigin(1, 0)
    .setMountPoint(1, 0)
  var markNode = photosNode.addChild()
    .setSizeMode(0, 0)
    .setProportionalSize(0.5, 1)
    .setAlign(0, 0)
    .setOrigin(0, 0)
    .setMountPoint(0, 0)
  new DOMElement(markNode, {tagName: 'img'})
    .setAttribute('src', '/images/mark.jpg')
  new DOMElement(steveNode, {tagName: 'img'})
    .setAttribute('src', '/images/steve.jpg')
}
