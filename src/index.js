var famous = require('famous')
var FamousEngine = famous.core.FamousEngine
var DOMElement = famous.domRenderables.DOMElement
var Transitionable = famous.transitions.Transitionable
var Position = famous.components.Position
var Particle = famous.physics.Particle
var Vec3 = famous.math.Vec3
var PhysicsEngine = famous.physics.PhysicsEngine
var Spring = famous.physics.Spring

var someList = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']

FamousEngine.init()
var physicsEngine = new PhysicsEngine()
var scene = FamousEngine.createScene()
var physicsTick = scene.addComponent({
  onUpdate: function (time) {
    physicsEngine.update(time)
    scene.requestUpdateOnNextTick(physicsTick)
  }
})
scene.requestUpdate(physicsTick)

var listItemY = new Transitionable(0)

var ulNode = scene.addChild()
  .setSizeMode(0, 1, 1)
  .setProportionalSize(0.5, 0, 0)
  .setAbsoluteSize(0, 120, 0)
  .setAlign(0, 0.2, 0)
  .setOrigin(0.5, 0.5, 0)
  .setMountPoint(0.5, 1, 0)
new DOMElement(ulNode, {
  tagName: 'ul',
  properties: {
    'background-color': 'transparent'
  }
})



var force = addGravity(physicsEngine)




someList.forEach(function (item, i) {
  var x = (window.innerWidth/100)*50
  var y = ((window.innerHeight/100)*25) + (i*36) 
  var liNode = ulNode.addChild()
    .setSizeMode(0, 1, 0)
    .setProportionalSize(1, 0, 0)
    .setAbsoluteSize(0, 30)
    .setOrigin(0, 0)
    .setAlign(0, 0)
    .setPosition(x, y, 0)
  new DOMElement(liNode, {
    id: 'li'+i,
    tagName: 'li',
    content: item,
    properties: {
      'line-height': '30px',
      'border-radius': '5px'
    }
  })
  console.log(item,':',x, y)
  new addPhysics(liNode, x, y)
})




function positionListItems (curve) {
  curve = curve || 'inBack'
  var list = ulNode.getChildren()
  list.forEach(function (li, i) {
    new famous.components.Position(li).setY(i*36, {
      duration: 2000,
      curve: curve
    })
  })
}








function addGravity (physicsEngine) {
  var gravity = new famous.physics.Gravity3D(null, physicsEngine.bodies, {
    strength: -3e7,
    max: 3000,
    anchor: new Vec3(0, 0, 0)
  })
  physicsEngine.add(gravity)
  return gravity  
}












function addPhysics (node, x, y) {
  this.id = node.addComponent(this)
  this.node = node
  this.body = new Particle({
    mass: 1,
    position: new Vec3(x, y, 0)
  })
  this.force = new Spring(null, this.body, {
    period: 1,
    dampingRatio: 0.12,
    anchor: new Vec3(x, y, 0)
  })
  physicsEngine.add(this.body, this.force)
  node.requestUpdate(this.id)
}
addPhysics.prototype.onUpdate = function () {
  var pos = this.body.position
  this.node.setPosition(pos.x, pos.y, pos.z)
  this.node.requestUpdateOnNextTick(this.id)
}





























// Bernard's Helpers
addTitle('Adding Physics')
addControls()


function addTitle (title) {
  var titleNode = scene.addChild()
    .setSizeMode(0, 1, 0)
    .setProportionalSize(0.5, 0, 0)
    .setAbsoluteSize(0, 120, 0)
    .setAlign(0.5, 0.1, 0)
    .setOrigin(0.5, 0.5, 0)
    .setMountPoint(0.5, 0.5, 0)
  var linkNode = titleNode.addChild()
  new DOMElement(linkNode, {
    tagName: 'a'
  }).setAttribute('href', 'http://famous.org/learn/easing-curves.html')
  var logoNode = linkNode.addChild()
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
  new DOMElement(inputNode, {tagName: 'input'})
    .setAttribute('name', 'value')
    .setAttribute('placeholder', 'x, y')
  var animationNode = controlNode.addChild()
    .setSizeMode(1, 1, 0)
    .setAbsoluteSize(90, 30, 0)
    .setAlign(0, 0.5, 0)
    .setOrigin(0, 0.5, 0)
    .setMountPoint(0, 0.5, 0)
    .setPosition(90, 0, 0)
  new DOMElement(animationNode, {tagName: 'input'})
    .setAttribute('name', 'ease')
    .setAttribute('placeholder', 'curve')
  var mouseNode = controlNode.addChild()
    .setSizeMode(1, 1)
    .setAbsoluteSize(60, 60)
    .setPosition(190, 0)
  new DOMElement(mouseNode, {
    id: 'mouseOn',
    tagName: 'input'
  }).setAttribute('type', 'checkbox').setAttribute('value', 'mouse')
  var scaleNode = controlNode.addChild()
    .setSizeMode(0, 0)
    .setProportionalSize(0.5, 0.5)
    .setAlign(1, 1)
    .setOrigin(1, 1)
    .setMountPoint(1, 1)
  new DOMElement(scaleNode, {
    properties: {'border-top': 'solid 2px #E7E7E6'}
  })
  var slideNode = scaleNode.addChild()
    .setSizeMode(1, 1)
    .setAbsoluteSize(15, 40)
    .setOrigin(0.5, 0.5)
    .setAlign(0.5, 0)
    .setMountPoint(0.5, 0.5)
  new DOMElement(slideNode, {
    id: 'slide',
    properties: {'background-color': '#4FB8E9'}
  })

  addMouseEvents(mouseNode)
  addAlignEvents(inputNode)
  addAnimationEvents(animationNode)
  addSlideEvents(slideNode, scaleNode)
}
function addAlignEvents (node) {
  node.addUIEvent('blur')
  node.onReceive = function (event, payload) {
    if (event === 'blur') {
      var values = payload.value.split(',').map(function (v) {
        var decimal = v.split('.')[1]
        if (decimal) return parseInt(decimal)/10
        return parseInt(v)
      })
      console.log(values)
      force.anchor.set(values[0], values[1], 0)
    }
  }
}
function addAnimationEvents (node) {
  node.addUIEvent('blur')
  node.onReceive = function (event, payload) {
    if (event === 'blur') {
      var curve = payload.value || 'inBack'
      resetList()
      positionListItems(curve)
    }
  }
}
function addMouseEvents (node) {
  node.addUIEvent('click')
  node.onReceive = function (event, payload) {
    var mouseOn = document.getElementById('mouseOn').checked
    if (mouseOn) {
      document.addEventListener('mousemove', mouseGravity)
    } else {
      document.removeEventListener('mousemove', mouseGravity)
    }
  }
}
function mouseGravity (e) {
  force.anchor.set(e.pageX, e.pageY)
}
function resetList () {
  return ulNode.getChildren().map(function (li) {
    li.setPosition(0, 0, 0)
  })
}
function addSlideEvents (slideNode, scaleNode) {
  var bounds = window.innerWidth/4
  document.onkeypress = function (e) {
    var position = new Position(slideNode)
    var x = position.getX()
    if (e.keyIdentifier === 'U+002C' && x > (0-bounds)) {
      position.setX(x - 3)
    }
    if (e.keyIdentifier === 'U+002E' && x < bounds) {
      position.setX(x + 3)
    }
  }
}
