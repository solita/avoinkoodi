// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
	if (typeof this !== "function") {
	    // closest thing possible to the ECMAScript 5 internal IsCallable function
	    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	}

	var aArgs = Array.prototype.slice.call(arguments, 1),
	    fToBind = this,
	    fNOP = function () {},
	    fBound = function () {
		return fToBind.apply(this instanceof fNOP && oThis
				     ? this
				     : oThis,
				     aArgs.concat(Array.prototype.slice.call(arguments)));
	    };

	fNOP.prototype = this.prototype;
	fBound.prototype = new fNOP();

	return fBound;
    };
}
// https://gist.github.com/jussi-kalliokoski/978329
// Function.prototype.bind=Function.prototype.bind||function(d){var a=Array.prototype.splice.call(arguments,1),c=this;var b=function(){var e=a.concat(Array.prototype.splice.call(arguments,0));if(!(this instanceof b)){return c.apply(d,e)}c.apply(this,e)};b.prototype=c.prototype;return b};
