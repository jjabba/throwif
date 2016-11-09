/**
 * Copyright (c) 2016 Karl Berggren
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the ThrowIf API and when
    // executed as a simple <script>, it creates a ThrowIf global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("throwif", definition);

    // CommonJS
    } else if (typeof exports === "object" && typeof module === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeThrowIf = definition;
        }

    // <script>
    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        // Prefer window over self for add-on scripts. Use self for
        // non-windowed contexts.
        var global = typeof window !== "undefined" ? window : self;

        // Get the `window` object, save the previous ThrowIf global
        // and initialize ThrowIf as a global.
        var previousThrowIf = global.ThrowIf;
        global.ThrowIf = definition();

        // Add a noConflict function so ThrowIf can be removed from the
        // global namespace.
        global.ThrowIf.noConflict = function () {
            global.ThrowIf = previousThrowIf;
            return this;
        };

    } else {
        throw new Error("This environment was not anticipated by ThrowIf. Please file a bug.");
    }

})(function () {
var ThrowIf, version, helper;

version = {
    "major": 0,
    "minor": 5,
    "patch": 1
}

/* Argument validation helpers */
helper = {
    'throwIfTypeofIsNot': function (typeDescriptor, parameter) {
        var negate = true;
        return helper.throwIfTypeofIs.call(this, typeDescriptor, parameter, negate);
    },
    'throwIfTypeofIs': function (typeDescriptor, parameter) {
        var negate = arguments.length === 3 && arguments[2] === true;
        var tester = function (parameter) {
            return negate ? typeof parameter === typeDescriptor : typeof parameter !== typeDescriptor;
        };
        helper.throwIfTestFails(tester, parameter, "Expected " + typeDescriptor + ", found ");
    },
    'throwIfTestFails': function (test, parameter, errorMessage) {
        if (true !== test(parameter)) {
            throw new TypeError(errorMessage + typeof parameter);
        }
    },
    'isArray': function (supposedArray) {
        // PolyFill 'isArray' if nessesary
        if (!Array.isArray) {
            Array.isArray = function(arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
        }
        return Array.isArray(supposedArray);
    },
    'isBoolean': function(supposedBoolean){
        return supposedBoolean === true || supposedBoolean === false;
    }
};

ThrowIf = {
    /**
     * @description
     * Return the current version of throwif
     */
    "version": function() {
        return 'v' + version.major + '.' + version.minor + '.' + version.minor;
    },

    /**
     * @description
     * Ensure all properties are availiable in object.
     *
     * @param {object} object Object to test.
     * @param {string} propertyName name of property One.
     * @param {string=} [propertyName2] name of property Two. (to try more properties, add more arguments to the call.)
     *
     * @returns {boolean} True if object contains all properties, otherwise false.
     */
    'hasOwnProperties': function (object) { /*, propertyname1, propertyname2, ... */
        utils.throwIfNotObject(object);
        var i = 1, allThere = true, argumentsLength = arguments.length;
        while (allThere && (i < argumentsLength)) {
            utils.throwIfNotString(arguments[i]);
            allThere = allThere && object.hasOwnProperty(arguments[i]);
            ++i;
        }
        return allThere;
    },

    'notFunction': function (supposedFunction) {
        helper.throwIfTypeofIsNot("function", supposedFunction);
    },
    'notString': function (supposedString) {
        helper.throwIfTypeofIsNot("string", supposedString);
    },
    'notObject': function (supposedObject) {
        helper.throwIfTypeofIsNot("object", supposedObject);
    },
    'notNumber': function (supposedNumber) {
        helper.throwIfTypeofIsNot("number", supposedNumber);
    },
    'notDefined': function (supposedlyDefined) {
        helper.throwIfTypeofIs('undefined', supposedlyDefined);
    },
    'notArray': function (supposedArray) {
        helper.throwIfTestFails(helper.isArray, supposedArray, "Array expected, found ");
    },
    'notBoolean': function (supposedBoolean) {
        helper.throwIfTestFails(helper.isBoolean, supposedBoolean, "Boolean expected, found ");
    }
};

return ThrowIf;
});
