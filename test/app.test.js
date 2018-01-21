// Chai is used as our assertion library
// import chai from 'chai';
var chai = require('../node_modules/chai/chai.js');

// For headless browser
require('jsdom-global')()

// Import js_observable library for test
var state_module = require('../src/App.js');

// Initiallinzg chai
chai.should()

// Helper Objects and functions used to test js_observale
let data = {
	range: {
		    start: 1,
		    end: 5 
		},
	visible: true 
};

var myState = {};

function checkNested(obj) {
  var args = Array.prototype.slice.call(arguments, 1);

  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}

// Setting up the assert variable
var assert = chai.assert;

// test code
describe('js_observables library test',function(){
	
	it('should create a State object', function(){
		myState = state_module.State.create(data);
		assert.equal(typeof(myState),'object');
	});

	it('should return the State object', function(){
		assert.equal(myState.data,myState.getState());
	});

	it('should create new property in the State object at the base level', function(){
		myState.create('newKey',true);
		var result = false;
		if('newKey' in myState.data){
			result = true;
		}
		assert.equal(result,true);
	});

	it('should create new property in the State object even if nested key passed', function(){
		myState.create('range.type',{
			absolute: true
		});

		var result = checkNested(myState.data,'range','type');

		assert.equal(result,true);
	});

	it('should return property value from the State object', function(){
		assert.equal(myState.prop('range.start'),1);
	});

	it('should set value to a property in the State object if present or create new property and set the value', function(){
		myState.prop('range.start', 9);
		assert.equal(myState.prop('range.start'),9);
	});

	it('should register an handler for a property & when property is changed the handler is called', function(){
		var result = false;
		var unsub1 = myState.on('range.start', (oldValue, newValue) => { 
		    result = true;
		});
		myState.prop('range.start', 10);
		assert.equal(result,true);
	});

	it('should register an handler & if a handler is registered on change of a property which has another state property as value, then the handler gets called whenever any state property connected to it gets changed', function(){
		var result = false;
		var unsub1 = myState.on('range', (oldValue, newValue) => { 
		    result = true;
		});
		myState.prop('range.end', 20);
		assert.equal(result,true);
	});
	
	it('should return a function which is when called the listener registered gets unregistered', function(){
		var result = 0;
		var unsub = myState.on('visible', (oldValue, newValue) => { 
		    result = result+1;
		});
		myState.prop('visible', false);
		assert.equal(result,1,'Handler function was called');
		unsub();
		myState.prop('visible', true);
		assert.equal(result,1,'Handler function was not called');
	});

	it('should call the handlers at the start of next event loop (next frame call) with all updates happened in the current frame in single go', function(){
		var result = 0;
		myState.next('range', (oldValue, newValue) => { 
		    result = result + 1;
		});
		myState.prop('range.start', 100);
		assert.equal(result,0);
		myState.prop('range.end', 200);
		assert.equal(result,1);

	});

	it('should caches all the change that comes after lock and when unlock() is called it applies all the changes to the state and the handler is called ', function(){
		var result = 0;
		myState.on('range', (oldVal, newVal) => { 
			result = result + 1;
		});
		myState .lock().prop('range.start', 130) .prop('range.end', 140) ;
		assert.equal(result,0);
		myState.unlock();
		assert.equal(result,1);
	});

});
