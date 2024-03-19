"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/denque";
exports.ids = ["vendor-chunks/denque"];
exports.modules = {

/***/ "(rsc)/./node_modules/denque/index.js":
/*!**************************************!*\
  !*** ./node_modules/denque/index.js ***!
  \**************************************/
/***/ ((module) => {

eval("\n\n/**\n * Custom implementation of a double ended queue.\n */\nfunction Denque(array, options) {\n  var options = options || {};\n  this._capacity = options.capacity;\n\n  this._head = 0;\n  this._tail = 0;\n\n  if (Array.isArray(array)) {\n    this._fromArray(array);\n  } else {\n    this._capacityMask = 0x3;\n    this._list = new Array(4);\n  }\n}\n\n/**\n * --------------\n *  PUBLIC API\n * -------------\n */\n\n/**\n * Returns the item at the specified index from the list.\n * 0 is the first element, 1 is the second, and so on...\n * Elements at negative values are that many from the end: -1 is one before the end\n * (the last element), -2 is two before the end (one before last), etc.\n * @param index\n * @returns {*}\n */\nDenque.prototype.peekAt = function peekAt(index) {\n  var i = index;\n  // expect a number or return undefined\n  if ((i !== (i | 0))) {\n    return void 0;\n  }\n  var len = this.size();\n  if (i >= len || i < -len) return undefined;\n  if (i < 0) i += len;\n  i = (this._head + i) & this._capacityMask;\n  return this._list[i];\n};\n\n/**\n * Alias for peekAt()\n * @param i\n * @returns {*}\n */\nDenque.prototype.get = function get(i) {\n  return this.peekAt(i);\n};\n\n/**\n * Returns the first item in the list without removing it.\n * @returns {*}\n */\nDenque.prototype.peek = function peek() {\n  if (this._head === this._tail) return undefined;\n  return this._list[this._head];\n};\n\n/**\n * Alias for peek()\n * @returns {*}\n */\nDenque.prototype.peekFront = function peekFront() {\n  return this.peek();\n};\n\n/**\n * Returns the item that is at the back of the queue without removing it.\n * Uses peekAt(-1)\n */\nDenque.prototype.peekBack = function peekBack() {\n  return this.peekAt(-1);\n};\n\n/**\n * Returns the current length of the queue\n * @return {Number}\n */\nObject.defineProperty(Denque.prototype, 'length', {\n  get: function length() {\n    return this.size();\n  }\n});\n\n/**\n * Return the number of items on the list, or 0 if empty.\n * @returns {number}\n */\nDenque.prototype.size = function size() {\n  if (this._head === this._tail) return 0;\n  if (this._head < this._tail) return this._tail - this._head;\n  else return this._capacityMask + 1 - (this._head - this._tail);\n};\n\n/**\n * Add an item at the beginning of the list.\n * @param item\n */\nDenque.prototype.unshift = function unshift(item) {\n  if (arguments.length === 0) return this.size();\n  var len = this._list.length;\n  this._head = (this._head - 1 + len) & this._capacityMask;\n  this._list[this._head] = item;\n  if (this._tail === this._head) this._growArray();\n  if (this._capacity && this.size() > this._capacity) this.pop();\n  if (this._head < this._tail) return this._tail - this._head;\n  else return this._capacityMask + 1 - (this._head - this._tail);\n};\n\n/**\n * Remove and return the first item on the list,\n * Returns undefined if the list is empty.\n * @returns {*}\n */\nDenque.prototype.shift = function shift() {\n  var head = this._head;\n  if (head === this._tail) return undefined;\n  var item = this._list[head];\n  this._list[head] = undefined;\n  this._head = (head + 1) & this._capacityMask;\n  if (head < 2 && this._tail > 10000 && this._tail <= this._list.length >>> 2) this._shrinkArray();\n  return item;\n};\n\n/**\n * Add an item to the bottom of the list.\n * @param item\n */\nDenque.prototype.push = function push(item) {\n  if (arguments.length === 0) return this.size();\n  var tail = this._tail;\n  this._list[tail] = item;\n  this._tail = (tail + 1) & this._capacityMask;\n  if (this._tail === this._head) {\n    this._growArray();\n  }\n  if (this._capacity && this.size() > this._capacity) {\n    this.shift();\n  }\n  if (this._head < this._tail) return this._tail - this._head;\n  else return this._capacityMask + 1 - (this._head - this._tail);\n};\n\n/**\n * Remove and return the last item on the list.\n * Returns undefined if the list is empty.\n * @returns {*}\n */\nDenque.prototype.pop = function pop() {\n  var tail = this._tail;\n  if (tail === this._head) return undefined;\n  var len = this._list.length;\n  this._tail = (tail - 1 + len) & this._capacityMask;\n  var item = this._list[this._tail];\n  this._list[this._tail] = undefined;\n  if (this._head < 2 && tail > 10000 && tail <= len >>> 2) this._shrinkArray();\n  return item;\n};\n\n/**\n * Remove and return the item at the specified index from the list.\n * Returns undefined if the list is empty.\n * @param index\n * @returns {*}\n */\nDenque.prototype.removeOne = function removeOne(index) {\n  var i = index;\n  // expect a number or return undefined\n  if ((i !== (i | 0))) {\n    return void 0;\n  }\n  if (this._head === this._tail) return void 0;\n  var size = this.size();\n  var len = this._list.length;\n  if (i >= size || i < -size) return void 0;\n  if (i < 0) i += size;\n  i = (this._head + i) & this._capacityMask;\n  var item = this._list[i];\n  var k;\n  if (index < size / 2) {\n    for (k = index; k > 0; k--) {\n      this._list[i] = this._list[i = (i - 1 + len) & this._capacityMask];\n    }\n    this._list[i] = void 0;\n    this._head = (this._head + 1 + len) & this._capacityMask;\n  } else {\n    for (k = size - 1 - index; k > 0; k--) {\n      this._list[i] = this._list[i = (i + 1 + len) & this._capacityMask];\n    }\n    this._list[i] = void 0;\n    this._tail = (this._tail - 1 + len) & this._capacityMask;\n  }\n  return item;\n};\n\n/**\n * Remove number of items from the specified index from the list.\n * Returns array of removed items.\n * Returns undefined if the list is empty.\n * @param index\n * @param count\n * @returns {array}\n */\nDenque.prototype.remove = function remove(index, count) {\n  var i = index;\n  var removed;\n  var del_count = count;\n  // expect a number or return undefined\n  if ((i !== (i | 0))) {\n    return void 0;\n  }\n  if (this._head === this._tail) return void 0;\n  var size = this.size();\n  var len = this._list.length;\n  if (i >= size || i < -size || count < 1) return void 0;\n  if (i < 0) i += size;\n  if (count === 1 || !count) {\n    removed = new Array(1);\n    removed[0] = this.removeOne(i);\n    return removed;\n  }\n  if (i === 0 && i + count >= size) {\n    removed = this.toArray();\n    this.clear();\n    return removed;\n  }\n  if (i + count > size) count = size - i;\n  var k;\n  removed = new Array(count);\n  for (k = 0; k < count; k++) {\n    removed[k] = this._list[(this._head + i + k) & this._capacityMask];\n  }\n  i = (this._head + i) & this._capacityMask;\n  if (index + count === size) {\n    this._tail = (this._tail - count + len) & this._capacityMask;\n    for (k = count; k > 0; k--) {\n      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;\n    }\n    return removed;\n  }\n  if (index === 0) {\n    this._head = (this._head + count + len) & this._capacityMask;\n    for (k = count - 1; k > 0; k--) {\n      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;\n    }\n    return removed;\n  }\n  if (i < size / 2) {\n    this._head = (this._head + index + count + len) & this._capacityMask;\n    for (k = index; k > 0; k--) {\n      this.unshift(this._list[i = (i - 1 + len) & this._capacityMask]);\n    }\n    i = (this._head - 1 + len) & this._capacityMask;\n    while (del_count > 0) {\n      this._list[i = (i - 1 + len) & this._capacityMask] = void 0;\n      del_count--;\n    }\n    if (index < 0) this._tail = i;\n  } else {\n    this._tail = i;\n    i = (i + count + len) & this._capacityMask;\n    for (k = size - (count + index); k > 0; k--) {\n      this.push(this._list[i++]);\n    }\n    i = this._tail;\n    while (del_count > 0) {\n      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;\n      del_count--;\n    }\n  }\n  if (this._head < 2 && this._tail > 10000 && this._tail <= len >>> 2) this._shrinkArray();\n  return removed;\n};\n\n/**\n * Native splice implementation.\n * Remove number of items from the specified index from the list and/or add new elements.\n * Returns array of removed items or empty array if count == 0.\n * Returns undefined if the list is empty.\n *\n * @param index\n * @param count\n * @param {...*} [elements]\n * @returns {array}\n */\nDenque.prototype.splice = function splice(index, count) {\n  var i = index;\n  // expect a number or return undefined\n  if ((i !== (i | 0))) {\n    return void 0;\n  }\n  var size = this.size();\n  if (i < 0) i += size;\n  if (i > size) return void 0;\n  if (arguments.length > 2) {\n    var k;\n    var temp;\n    var removed;\n    var arg_len = arguments.length;\n    var len = this._list.length;\n    var arguments_index = 2;\n    if (!size || i < size / 2) {\n      temp = new Array(i);\n      for (k = 0; k < i; k++) {\n        temp[k] = this._list[(this._head + k) & this._capacityMask];\n      }\n      if (count === 0) {\n        removed = [];\n        if (i > 0) {\n          this._head = (this._head + i + len) & this._capacityMask;\n        }\n      } else {\n        removed = this.remove(i, count);\n        this._head = (this._head + i + len) & this._capacityMask;\n      }\n      while (arg_len > arguments_index) {\n        this.unshift(arguments[--arg_len]);\n      }\n      for (k = i; k > 0; k--) {\n        this.unshift(temp[k - 1]);\n      }\n    } else {\n      temp = new Array(size - (i + count));\n      var leng = temp.length;\n      for (k = 0; k < leng; k++) {\n        temp[k] = this._list[(this._head + i + count + k) & this._capacityMask];\n      }\n      if (count === 0) {\n        removed = [];\n        if (i != size) {\n          this._tail = (this._head + i + len) & this._capacityMask;\n        }\n      } else {\n        removed = this.remove(i, count);\n        this._tail = (this._tail - leng + len) & this._capacityMask;\n      }\n      while (arguments_index < arg_len) {\n        this.push(arguments[arguments_index++]);\n      }\n      for (k = 0; k < leng; k++) {\n        this.push(temp[k]);\n      }\n    }\n    return removed;\n  } else {\n    return this.remove(i, count);\n  }\n};\n\n/**\n * Soft clear - does not reset capacity.\n */\nDenque.prototype.clear = function clear() {\n  this._list = new Array(this._list.length);\n  this._head = 0;\n  this._tail = 0;\n};\n\n/**\n * Returns true or false whether the list is empty.\n * @returns {boolean}\n */\nDenque.prototype.isEmpty = function isEmpty() {\n  return this._head === this._tail;\n};\n\n/**\n * Returns an array of all queue items.\n * @returns {Array}\n */\nDenque.prototype.toArray = function toArray() {\n  return this._copyArray(false);\n};\n\n/**\n * -------------\n *   INTERNALS\n * -------------\n */\n\n/**\n * Fills the queue with items from an array\n * For use in the constructor\n * @param array\n * @private\n */\nDenque.prototype._fromArray = function _fromArray(array) {\n  var length = array.length;\n  var capacity = this._nextPowerOf2(length);\n\n  this._list = new Array(capacity);\n  this._capacityMask = capacity - 1;\n  this._tail = length;\n\n  for (var i = 0; i < length; i++) this._list[i] = array[i];\n};\n\n/**\n *\n * @param fullCopy\n * @param size Initialize the array with a specific size. Will default to the current list size\n * @returns {Array}\n * @private\n */\nDenque.prototype._copyArray = function _copyArray(fullCopy, size) {\n  var src = this._list;\n  var capacity = src.length;\n  var length = this.length;\n  size = size | length;\n\n  // No prealloc requested and the buffer is contiguous\n  if (size == length && this._head < this._tail) {\n    // Simply do a fast slice copy\n    return this._list.slice(this._head, this._tail);\n  }\n\n  var dest = new Array(size);\n\n  var k = 0;\n  var i;\n  if (fullCopy || this._head > this._tail) {\n    for (i = this._head; i < capacity; i++) dest[k++] = src[i];\n    for (i = 0; i < this._tail; i++) dest[k++] = src[i];\n  } else {\n    for (i = this._head; i < this._tail; i++) dest[k++] = src[i];\n  }\n\n  return dest;\n}\n\n/**\n * Grows the internal list array.\n * @private\n */\nDenque.prototype._growArray = function _growArray() {\n  if (this._head != 0) {\n    // double array size and copy existing data, head to end, then beginning to tail.\n    var newList = this._copyArray(true, this._list.length << 1);\n\n    this._tail = this._list.length;\n    this._head = 0;\n\n    this._list = newList;\n  } else {\n    this._tail = this._list.length;\n    this._list.length <<= 1;\n  }\n\n  this._capacityMask = (this._capacityMask << 1) | 1;\n};\n\n/**\n * Shrinks the internal list array.\n * @private\n */\nDenque.prototype._shrinkArray = function _shrinkArray() {\n  this._list.length >>>= 1;\n  this._capacityMask >>>= 1;\n};\n\n/**\n * Find the next power of 2, at least 4\n * @private\n * @param {number} num \n * @returns {number}\n */\nDenque.prototype._nextPowerOf2 = function _nextPowerOf2(num) {\n  var log2 = Math.log(num) / Math.log(2);\n  var nextPow2 = 1 << (log2 + 1);\n\n  return Math.max(nextPow2, 4);\n}\n\nmodule.exports = Denque;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZGVucXVlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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ZWN0Ly4vbm9kZV9tb2R1bGVzL2RlbnF1ZS9pbmRleC5qcz9lNTdkIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDdXN0b20gaW1wbGVtZW50YXRpb24gb2YgYSBkb3VibGUgZW5kZWQgcXVldWUuXG4gKi9cbmZ1bmN0aW9uIERlbnF1ZShhcnJheSwgb3B0aW9ucykge1xuICB2YXIgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMuX2NhcGFjaXR5ID0gb3B0aW9ucy5jYXBhY2l0eTtcblxuICB0aGlzLl9oZWFkID0gMDtcbiAgdGhpcy5fdGFpbCA9IDA7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgdGhpcy5fZnJvbUFycmF5KGFycmF5KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9jYXBhY2l0eU1hc2sgPSAweDM7XG4gICAgdGhpcy5fbGlzdCA9IG5ldyBBcnJheSg0KTtcbiAgfVxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tXG4gKiAgUFVCTElDIEFQSVxuICogLS0tLS0tLS0tLS0tLVxuICovXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhlIGxpc3QuXG4gKiAwIGlzIHRoZSBmaXJzdCBlbGVtZW50LCAxIGlzIHRoZSBzZWNvbmQsIGFuZCBzbyBvbi4uLlxuICogRWxlbWVudHMgYXQgbmVnYXRpdmUgdmFsdWVzIGFyZSB0aGF0IG1hbnkgZnJvbSB0aGUgZW5kOiAtMSBpcyBvbmUgYmVmb3JlIHRoZSBlbmRcbiAqICh0aGUgbGFzdCBlbGVtZW50KSwgLTIgaXMgdHdvIGJlZm9yZSB0aGUgZW5kIChvbmUgYmVmb3JlIGxhc3QpLCBldGMuXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHsqfVxuICovXG5EZW5xdWUucHJvdG90eXBlLnBlZWtBdCA9IGZ1bmN0aW9uIHBlZWtBdChpbmRleCkge1xuICB2YXIgaSA9IGluZGV4O1xuICAvLyBleHBlY3QgYSBudW1iZXIgb3IgcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAoKGkgIT09IChpIHwgMCkpKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICB2YXIgbGVuID0gdGhpcy5zaXplKCk7XG4gIGlmIChpID49IGxlbiB8fCBpIDwgLWxlbikgcmV0dXJuIHVuZGVmaW5lZDtcbiAgaWYgKGkgPCAwKSBpICs9IGxlbjtcbiAgaSA9ICh0aGlzLl9oZWFkICsgaSkgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gIHJldHVybiB0aGlzLl9saXN0W2ldO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3IgcGVla0F0KClcbiAqIEBwYXJhbSBpXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoaSkge1xuICByZXR1cm4gdGhpcy5wZWVrQXQoaSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGxpc3Qgd2l0aG91dCByZW1vdmluZyBpdC5cbiAqIEByZXR1cm5zIHsqfVxuICovXG5EZW5xdWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiBwZWVrKCkge1xuICBpZiAodGhpcy5faGVhZCA9PT0gdGhpcy5fdGFpbCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5faGVhZF07XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciBwZWVrKClcbiAqIEByZXR1cm5zIHsqfVxuICovXG5EZW5xdWUucHJvdG90eXBlLnBlZWtGcm9udCA9IGZ1bmN0aW9uIHBlZWtGcm9udCgpIHtcbiAgcmV0dXJuIHRoaXMucGVlaygpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpdGVtIHRoYXQgaXMgYXQgdGhlIGJhY2sgb2YgdGhlIHF1ZXVlIHdpdGhvdXQgcmVtb3ZpbmcgaXQuXG4gKiBVc2VzIHBlZWtBdCgtMSlcbiAqL1xuRGVucXVlLnByb3RvdHlwZS5wZWVrQmFjayA9IGZ1bmN0aW9uIHBlZWtCYWNrKCkge1xuICByZXR1cm4gdGhpcy5wZWVrQXQoLTEpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IGxlbmd0aCBvZiB0aGUgcXVldWVcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERlbnF1ZS5wcm90b3R5cGUsICdsZW5ndGgnLCB7XG4gIGdldDogZnVuY3Rpb24gbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLnNpemUoKTtcbiAgfVxufSk7XG5cbi8qKlxuICogUmV0dXJuIHRoZSBudW1iZXIgb2YgaXRlbXMgb24gdGhlIGxpc3QsIG9yIDAgaWYgZW1wdHkuXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5EZW5xdWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiBzaXplKCkge1xuICBpZiAodGhpcy5faGVhZCA9PT0gdGhpcy5fdGFpbCkgcmV0dXJuIDA7XG4gIGlmICh0aGlzLl9oZWFkIDwgdGhpcy5fdGFpbCkgcmV0dXJuIHRoaXMuX3RhaWwgLSB0aGlzLl9oZWFkO1xuICBlbHNlIHJldHVybiB0aGlzLl9jYXBhY2l0eU1hc2sgKyAxIC0gKHRoaXMuX2hlYWQgLSB0aGlzLl90YWlsKTtcbn07XG5cbi8qKlxuICogQWRkIGFuIGl0ZW0gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdC5cbiAqIEBwYXJhbSBpdGVtXG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uIHVuc2hpZnQoaXRlbSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuc2l6ZSgpO1xuICB2YXIgbGVuID0gdGhpcy5fbGlzdC5sZW5ndGg7XG4gIHRoaXMuX2hlYWQgPSAodGhpcy5faGVhZCAtIDEgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICB0aGlzLl9saXN0W3RoaXMuX2hlYWRdID0gaXRlbTtcbiAgaWYgKHRoaXMuX3RhaWwgPT09IHRoaXMuX2hlYWQpIHRoaXMuX2dyb3dBcnJheSgpO1xuICBpZiAodGhpcy5fY2FwYWNpdHkgJiYgdGhpcy5zaXplKCkgPiB0aGlzLl9jYXBhY2l0eSkgdGhpcy5wb3AoKTtcbiAgaWYgKHRoaXMuX2hlYWQgPCB0aGlzLl90YWlsKSByZXR1cm4gdGhpcy5fdGFpbCAtIHRoaXMuX2hlYWQ7XG4gIGVsc2UgcmV0dXJuIHRoaXMuX2NhcGFjaXR5TWFzayArIDEgLSAodGhpcy5faGVhZCAtIHRoaXMuX3RhaWwpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW5kIHJldHVybiB0aGUgZmlyc3QgaXRlbSBvbiB0aGUgbGlzdCxcbiAqIFJldHVybnMgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzIGVtcHR5LlxuICogQHJldHVybnMgeyp9XG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiBzaGlmdCgpIHtcbiAgdmFyIGhlYWQgPSB0aGlzLl9oZWFkO1xuICBpZiAoaGVhZCA9PT0gdGhpcy5fdGFpbCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdmFyIGl0ZW0gPSB0aGlzLl9saXN0W2hlYWRdO1xuICB0aGlzLl9saXN0W2hlYWRdID0gdW5kZWZpbmVkO1xuICB0aGlzLl9oZWFkID0gKGhlYWQgKyAxKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgaWYgKGhlYWQgPCAyICYmIHRoaXMuX3RhaWwgPiAxMDAwMCAmJiB0aGlzLl90YWlsIDw9IHRoaXMuX2xpc3QubGVuZ3RoID4+PiAyKSB0aGlzLl9zaHJpbmtBcnJheSgpO1xuICByZXR1cm4gaXRlbTtcbn07XG5cbi8qKlxuICogQWRkIGFuIGl0ZW0gdG8gdGhlIGJvdHRvbSBvZiB0aGUgbGlzdC5cbiAqIEBwYXJhbSBpdGVtXG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2goaXRlbSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuc2l6ZSgpO1xuICB2YXIgdGFpbCA9IHRoaXMuX3RhaWw7XG4gIHRoaXMuX2xpc3RbdGFpbF0gPSBpdGVtO1xuICB0aGlzLl90YWlsID0gKHRhaWwgKyAxKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgaWYgKHRoaXMuX3RhaWwgPT09IHRoaXMuX2hlYWQpIHtcbiAgICB0aGlzLl9ncm93QXJyYXkoKTtcbiAgfVxuICBpZiAodGhpcy5fY2FwYWNpdHkgJiYgdGhpcy5zaXplKCkgPiB0aGlzLl9jYXBhY2l0eSkge1xuICAgIHRoaXMuc2hpZnQoKTtcbiAgfVxuICBpZiAodGhpcy5faGVhZCA8IHRoaXMuX3RhaWwpIHJldHVybiB0aGlzLl90YWlsIC0gdGhpcy5faGVhZDtcbiAgZWxzZSByZXR1cm4gdGhpcy5fY2FwYWNpdHlNYXNrICsgMSAtICh0aGlzLl9oZWFkIC0gdGhpcy5fdGFpbCk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbmQgcmV0dXJuIHRoZSBsYXN0IGl0ZW0gb24gdGhlIGxpc3QuXG4gKiBSZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpcyBlbXB0eS5cbiAqIEByZXR1cm5zIHsqfVxuICovXG5EZW5xdWUucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uIHBvcCgpIHtcbiAgdmFyIHRhaWwgPSB0aGlzLl90YWlsO1xuICBpZiAodGFpbCA9PT0gdGhpcy5faGVhZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdmFyIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoO1xuICB0aGlzLl90YWlsID0gKHRhaWwgLSAxICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgdmFyIGl0ZW0gPSB0aGlzLl9saXN0W3RoaXMuX3RhaWxdO1xuICB0aGlzLl9saXN0W3RoaXMuX3RhaWxdID0gdW5kZWZpbmVkO1xuICBpZiAodGhpcy5faGVhZCA8IDIgJiYgdGFpbCA+IDEwMDAwICYmIHRhaWwgPD0gbGVuID4+PiAyKSB0aGlzLl9zaHJpbmtBcnJheSgpO1xuICByZXR1cm4gaXRlbTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuZCByZXR1cm4gdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoZSBsaXN0LlxuICogUmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXMgZW1wdHkuXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHsqfVxuICovXG5EZW5xdWUucHJvdG90eXBlLnJlbW92ZU9uZSA9IGZ1bmN0aW9uIHJlbW92ZU9uZShpbmRleCkge1xuICB2YXIgaSA9IGluZGV4O1xuICAvLyBleHBlY3QgYSBudW1iZXIgb3IgcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAoKGkgIT09IChpIHwgMCkpKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICBpZiAodGhpcy5faGVhZCA9PT0gdGhpcy5fdGFpbCkgcmV0dXJuIHZvaWQgMDtcbiAgdmFyIHNpemUgPSB0aGlzLnNpemUoKTtcbiAgdmFyIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoO1xuICBpZiAoaSA+PSBzaXplIHx8IGkgPCAtc2l6ZSkgcmV0dXJuIHZvaWQgMDtcbiAgaWYgKGkgPCAwKSBpICs9IHNpemU7XG4gIGkgPSAodGhpcy5faGVhZCArIGkpICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICB2YXIgaXRlbSA9IHRoaXMuX2xpc3RbaV07XG4gIHZhciBrO1xuICBpZiAoaW5kZXggPCBzaXplIC8gMikge1xuICAgIGZvciAoayA9IGluZGV4OyBrID4gMDsgay0tKSB7XG4gICAgICB0aGlzLl9saXN0W2ldID0gdGhpcy5fbGlzdFtpID0gKGkgLSAxICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFza107XG4gICAgfVxuICAgIHRoaXMuX2xpc3RbaV0gPSB2b2lkIDA7XG4gICAgdGhpcy5faGVhZCA9ICh0aGlzLl9oZWFkICsgMSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChrID0gc2l6ZSAtIDEgLSBpbmRleDsgayA+IDA7IGstLSkge1xuICAgICAgdGhpcy5fbGlzdFtpXSA9IHRoaXMuX2xpc3RbaSA9IChpICsgMSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2tdO1xuICAgIH1cbiAgICB0aGlzLl9saXN0W2ldID0gdm9pZCAwO1xuICAgIHRoaXMuX3RhaWwgPSAodGhpcy5fdGFpbCAtIDEgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICB9XG4gIHJldHVybiBpdGVtO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgbnVtYmVyIG9mIGl0ZW1zIGZyb20gdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoZSBsaXN0LlxuICogUmV0dXJucyBhcnJheSBvZiByZW1vdmVkIGl0ZW1zLlxuICogUmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXMgZW1wdHkuXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEBwYXJhbSBjb3VudFxuICogQHJldHVybnMge2FycmF5fVxuICovXG5EZW5xdWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShpbmRleCwgY291bnQpIHtcbiAgdmFyIGkgPSBpbmRleDtcbiAgdmFyIHJlbW92ZWQ7XG4gIHZhciBkZWxfY291bnQgPSBjb3VudDtcbiAgLy8gZXhwZWN0IGEgbnVtYmVyIG9yIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKChpICE9PSAoaSB8IDApKSkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgaWYgKHRoaXMuX2hlYWQgPT09IHRoaXMuX3RhaWwpIHJldHVybiB2b2lkIDA7XG4gIHZhciBzaXplID0gdGhpcy5zaXplKCk7XG4gIHZhciBsZW4gPSB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgaWYgKGkgPj0gc2l6ZSB8fCBpIDwgLXNpemUgfHwgY291bnQgPCAxKSByZXR1cm4gdm9pZCAwO1xuICBpZiAoaSA8IDApIGkgKz0gc2l6ZTtcbiAgaWYgKGNvdW50ID09PSAxIHx8ICFjb3VudCkge1xuICAgIHJlbW92ZWQgPSBuZXcgQXJyYXkoMSk7XG4gICAgcmVtb3ZlZFswXSA9IHRoaXMucmVtb3ZlT25lKGkpO1xuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG4gIGlmIChpID09PSAwICYmIGkgKyBjb3VudCA+PSBzaXplKSB7XG4gICAgcmVtb3ZlZCA9IHRoaXMudG9BcnJheSgpO1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuICBpZiAoaSArIGNvdW50ID4gc2l6ZSkgY291bnQgPSBzaXplIC0gaTtcbiAgdmFyIGs7XG4gIHJlbW92ZWQgPSBuZXcgQXJyYXkoY291bnQpO1xuICBmb3IgKGsgPSAwOyBrIDwgY291bnQ7IGsrKykge1xuICAgIHJlbW92ZWRba10gPSB0aGlzLl9saXN0Wyh0aGlzLl9oZWFkICsgaSArIGspICYgdGhpcy5fY2FwYWNpdHlNYXNrXTtcbiAgfVxuICBpID0gKHRoaXMuX2hlYWQgKyBpKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgaWYgKGluZGV4ICsgY291bnQgPT09IHNpemUpIHtcbiAgICB0aGlzLl90YWlsID0gKHRoaXMuX3RhaWwgLSBjb3VudCArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gICAgZm9yIChrID0gY291bnQ7IGsgPiAwOyBrLS0pIHtcbiAgICAgIHRoaXMuX2xpc3RbaSA9IChpICsgMSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2tdID0gdm9pZCAwO1xuICAgIH1cbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuICBpZiAoaW5kZXggPT09IDApIHtcbiAgICB0aGlzLl9oZWFkID0gKHRoaXMuX2hlYWQgKyBjb3VudCArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gICAgZm9yIChrID0gY291bnQgLSAxOyBrID4gMDsgay0tKSB7XG4gICAgICB0aGlzLl9saXN0W2kgPSAoaSArIDEgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrXSA9IHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cbiAgaWYgKGkgPCBzaXplIC8gMikge1xuICAgIHRoaXMuX2hlYWQgPSAodGhpcy5faGVhZCArIGluZGV4ICsgY291bnQgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICAgIGZvciAoayA9IGluZGV4OyBrID4gMDsgay0tKSB7XG4gICAgICB0aGlzLnVuc2hpZnQodGhpcy5fbGlzdFtpID0gKGkgLSAxICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFza10pO1xuICAgIH1cbiAgICBpID0gKHRoaXMuX2hlYWQgLSAxICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgICB3aGlsZSAoZGVsX2NvdW50ID4gMCkge1xuICAgICAgdGhpcy5fbGlzdFtpID0gKGkgLSAxICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFza10gPSB2b2lkIDA7XG4gICAgICBkZWxfY291bnQtLTtcbiAgICB9XG4gICAgaWYgKGluZGV4IDwgMCkgdGhpcy5fdGFpbCA9IGk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fdGFpbCA9IGk7XG4gICAgaSA9IChpICsgY291bnQgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICAgIGZvciAoayA9IHNpemUgLSAoY291bnQgKyBpbmRleCk7IGsgPiAwOyBrLS0pIHtcbiAgICAgIHRoaXMucHVzaCh0aGlzLl9saXN0W2krK10pO1xuICAgIH1cbiAgICBpID0gdGhpcy5fdGFpbDtcbiAgICB3aGlsZSAoZGVsX2NvdW50ID4gMCkge1xuICAgICAgdGhpcy5fbGlzdFtpID0gKGkgKyAxICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFza10gPSB2b2lkIDA7XG4gICAgICBkZWxfY291bnQtLTtcbiAgICB9XG4gIH1cbiAgaWYgKHRoaXMuX2hlYWQgPCAyICYmIHRoaXMuX3RhaWwgPiAxMDAwMCAmJiB0aGlzLl90YWlsIDw9IGxlbiA+Pj4gMikgdGhpcy5fc2hyaW5rQXJyYXkoKTtcbiAgcmV0dXJuIHJlbW92ZWQ7XG59O1xuXG4vKipcbiAqIE5hdGl2ZSBzcGxpY2UgaW1wbGVtZW50YXRpb24uXG4gKiBSZW1vdmUgbnVtYmVyIG9mIGl0ZW1zIGZyb20gdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoZSBsaXN0IGFuZC9vciBhZGQgbmV3IGVsZW1lbnRzLlxuICogUmV0dXJucyBhcnJheSBvZiByZW1vdmVkIGl0ZW1zIG9yIGVtcHR5IGFycmF5IGlmIGNvdW50ID09IDAuXG4gKiBSZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpcyBlbXB0eS5cbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEBwYXJhbSBjb3VudFxuICogQHBhcmFtIHsuLi4qfSBbZWxlbWVudHNdXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24gc3BsaWNlKGluZGV4LCBjb3VudCkge1xuICB2YXIgaSA9IGluZGV4O1xuICAvLyBleHBlY3QgYSBudW1iZXIgb3IgcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAoKGkgIT09IChpIHwgMCkpKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZSgpO1xuICBpZiAoaSA8IDApIGkgKz0gc2l6ZTtcbiAgaWYgKGkgPiBzaXplKSByZXR1cm4gdm9pZCAwO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICB2YXIgaztcbiAgICB2YXIgdGVtcDtcbiAgICB2YXIgcmVtb3ZlZDtcbiAgICB2YXIgYXJnX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoO1xuICAgIHZhciBhcmd1bWVudHNfaW5kZXggPSAyO1xuICAgIGlmICghc2l6ZSB8fCBpIDwgc2l6ZSAvIDIpIHtcbiAgICAgIHRlbXAgPSBuZXcgQXJyYXkoaSk7XG4gICAgICBmb3IgKGsgPSAwOyBrIDwgaTsgaysrKSB7XG4gICAgICAgIHRlbXBba10gPSB0aGlzLl9saXN0Wyh0aGlzLl9oZWFkICsgaykgJiB0aGlzLl9jYXBhY2l0eU1hc2tdO1xuICAgICAgfVxuICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgIHJlbW92ZWQgPSBbXTtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgdGhpcy5faGVhZCA9ICh0aGlzLl9oZWFkICsgaSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZWQgPSB0aGlzLnJlbW92ZShpLCBjb3VudCk7XG4gICAgICAgIHRoaXMuX2hlYWQgPSAodGhpcy5faGVhZCArIGkgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGFyZ19sZW4gPiBhcmd1bWVudHNfaW5kZXgpIHtcbiAgICAgICAgdGhpcy51bnNoaWZ0KGFyZ3VtZW50c1stLWFyZ19sZW5dKTtcbiAgICAgIH1cbiAgICAgIGZvciAoayA9IGk7IGsgPiAwOyBrLS0pIHtcbiAgICAgICAgdGhpcy51bnNoaWZ0KHRlbXBbayAtIDFdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcCA9IG5ldyBBcnJheShzaXplIC0gKGkgKyBjb3VudCkpO1xuICAgICAgdmFyIGxlbmcgPSB0ZW1wLmxlbmd0aDtcbiAgICAgIGZvciAoayA9IDA7IGsgPCBsZW5nOyBrKyspIHtcbiAgICAgICAgdGVtcFtrXSA9IHRoaXMuX2xpc3RbKHRoaXMuX2hlYWQgKyBpICsgY291bnQgKyBrKSAmIHRoaXMuX2NhcGFjaXR5TWFza107XG4gICAgICB9XG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgcmVtb3ZlZCA9IFtdO1xuICAgICAgICBpZiAoaSAhPSBzaXplKSB7XG4gICAgICAgICAgdGhpcy5fdGFpbCA9ICh0aGlzLl9oZWFkICsgaSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZWQgPSB0aGlzLnJlbW92ZShpLCBjb3VudCk7XG4gICAgICAgIHRoaXMuX3RhaWwgPSAodGhpcy5fdGFpbCAtIGxlbmcgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGFyZ3VtZW50c19pbmRleCA8IGFyZ19sZW4pIHtcbiAgICAgICAgdGhpcy5wdXNoKGFyZ3VtZW50c1thcmd1bWVudHNfaW5kZXgrK10pO1xuICAgICAgfVxuICAgICAgZm9yIChrID0gMDsgayA8IGxlbmc7IGsrKykge1xuICAgICAgICB0aGlzLnB1c2godGVtcFtrXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZW1vdmVkO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLnJlbW92ZShpLCBjb3VudCk7XG4gIH1cbn07XG5cbi8qKlxuICogU29mdCBjbGVhciAtIGRvZXMgbm90IHJlc2V0IGNhcGFjaXR5LlxuICovXG5EZW5xdWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gIHRoaXMuX2xpc3QgPSBuZXcgQXJyYXkodGhpcy5fbGlzdC5sZW5ndGgpO1xuICB0aGlzLl9oZWFkID0gMDtcbiAgdGhpcy5fdGFpbCA9IDA7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBvciBmYWxzZSB3aGV0aGVyIHRoZSBsaXN0IGlzIGVtcHR5LlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gIHJldHVybiB0aGlzLl9oZWFkID09PSB0aGlzLl90YWlsO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBxdWV1ZSBpdGVtcy5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgcmV0dXJuIHRoaXMuX2NvcHlBcnJheShmYWxzZSk7XG59O1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS1cbiAqICAgSU5URVJOQUxTXG4gKiAtLS0tLS0tLS0tLS0tXG4gKi9cblxuLyoqXG4gKiBGaWxscyB0aGUgcXVldWUgd2l0aCBpdGVtcyBmcm9tIGFuIGFycmF5XG4gKiBGb3IgdXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIGFycmF5XG4gKiBAcHJpdmF0ZVxuICovXG5EZW5xdWUucHJvdG90eXBlLl9mcm9tQXJyYXkgPSBmdW5jdGlvbiBfZnJvbUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHZhciBjYXBhY2l0eSA9IHRoaXMuX25leHRQb3dlck9mMihsZW5ndGgpO1xuXG4gIHRoaXMuX2xpc3QgPSBuZXcgQXJyYXkoY2FwYWNpdHkpO1xuICB0aGlzLl9jYXBhY2l0eU1hc2sgPSBjYXBhY2l0eSAtIDE7XG4gIHRoaXMuX3RhaWwgPSBsZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5fbGlzdFtpXSA9IGFycmF5W2ldO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIGZ1bGxDb3B5XG4gKiBAcGFyYW0gc2l6ZSBJbml0aWFsaXplIHRoZSBhcnJheSB3aXRoIGEgc3BlY2lmaWMgc2l6ZS4gV2lsbCBkZWZhdWx0IHRvIHRoZSBjdXJyZW50IGxpc3Qgc2l6ZVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuRGVucXVlLnByb3RvdHlwZS5fY29weUFycmF5ID0gZnVuY3Rpb24gX2NvcHlBcnJheShmdWxsQ29weSwgc2l6ZSkge1xuICB2YXIgc3JjID0gdGhpcy5fbGlzdDtcbiAgdmFyIGNhcGFjaXR5ID0gc3JjLmxlbmd0aDtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICBzaXplID0gc2l6ZSB8IGxlbmd0aDtcblxuICAvLyBObyBwcmVhbGxvYyByZXF1ZXN0ZWQgYW5kIHRoZSBidWZmZXIgaXMgY29udGlndW91c1xuICBpZiAoc2l6ZSA9PSBsZW5ndGggJiYgdGhpcy5faGVhZCA8IHRoaXMuX3RhaWwpIHtcbiAgICAvLyBTaW1wbHkgZG8gYSBmYXN0IHNsaWNlIGNvcHlcbiAgICByZXR1cm4gdGhpcy5fbGlzdC5zbGljZSh0aGlzLl9oZWFkLCB0aGlzLl90YWlsKTtcbiAgfVxuXG4gIHZhciBkZXN0ID0gbmV3IEFycmF5KHNpemUpO1xuXG4gIHZhciBrID0gMDtcbiAgdmFyIGk7XG4gIGlmIChmdWxsQ29weSB8fCB0aGlzLl9oZWFkID4gdGhpcy5fdGFpbCkge1xuICAgIGZvciAoaSA9IHRoaXMuX2hlYWQ7IGkgPCBjYXBhY2l0eTsgaSsrKSBkZXN0W2srK10gPSBzcmNbaV07XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuX3RhaWw7IGkrKykgZGVzdFtrKytdID0gc3JjW2ldO1xuICB9IGVsc2Uge1xuICAgIGZvciAoaSA9IHRoaXMuX2hlYWQ7IGkgPCB0aGlzLl90YWlsOyBpKyspIGRlc3RbaysrXSA9IHNyY1tpXTtcbiAgfVxuXG4gIHJldHVybiBkZXN0O1xufVxuXG4vKipcbiAqIEdyb3dzIHRoZSBpbnRlcm5hbCBsaXN0IGFycmF5LlxuICogQHByaXZhdGVcbiAqL1xuRGVucXVlLnByb3RvdHlwZS5fZ3Jvd0FycmF5ID0gZnVuY3Rpb24gX2dyb3dBcnJheSgpIHtcbiAgaWYgKHRoaXMuX2hlYWQgIT0gMCkge1xuICAgIC8vIGRvdWJsZSBhcnJheSBzaXplIGFuZCBjb3B5IGV4aXN0aW5nIGRhdGEsIGhlYWQgdG8gZW5kLCB0aGVuIGJlZ2lubmluZyB0byB0YWlsLlxuICAgIHZhciBuZXdMaXN0ID0gdGhpcy5fY29weUFycmF5KHRydWUsIHRoaXMuX2xpc3QubGVuZ3RoIDw8IDEpO1xuXG4gICAgdGhpcy5fdGFpbCA9IHRoaXMuX2xpc3QubGVuZ3RoO1xuICAgIHRoaXMuX2hlYWQgPSAwO1xuXG4gICAgdGhpcy5fbGlzdCA9IG5ld0xpc3Q7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fdGFpbCA9IHRoaXMuX2xpc3QubGVuZ3RoO1xuICAgIHRoaXMuX2xpc3QubGVuZ3RoIDw8PSAxO1xuICB9XG5cbiAgdGhpcy5fY2FwYWNpdHlNYXNrID0gKHRoaXMuX2NhcGFjaXR5TWFzayA8PCAxKSB8IDE7XG59O1xuXG4vKipcbiAqIFNocmlua3MgdGhlIGludGVybmFsIGxpc3QgYXJyYXkuXG4gKiBAcHJpdmF0ZVxuICovXG5EZW5xdWUucHJvdG90eXBlLl9zaHJpbmtBcnJheSA9IGZ1bmN0aW9uIF9zaHJpbmtBcnJheSgpIHtcbiAgdGhpcy5fbGlzdC5sZW5ndGggPj4+PSAxO1xuICB0aGlzLl9jYXBhY2l0eU1hc2sgPj4+PSAxO1xufTtcblxuLyoqXG4gKiBGaW5kIHRoZSBuZXh0IHBvd2VyIG9mIDIsIGF0IGxlYXN0IDRcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5fbmV4dFBvd2VyT2YyID0gZnVuY3Rpb24gX25leHRQb3dlck9mMihudW0pIHtcbiAgdmFyIGxvZzIgPSBNYXRoLmxvZyhudW0pIC8gTWF0aC5sb2coMik7XG4gIHZhciBuZXh0UG93MiA9IDEgPDwgKGxvZzIgKyAxKTtcblxuICByZXR1cm4gTWF0aC5tYXgobmV4dFBvdzIsIDQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERlbnF1ZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/denque/index.js\n");

/***/ })

};
;