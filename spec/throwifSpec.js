'use strict';

if (typeof Throwif === "undefined" && typeof require !== "undefined") {
    // For Node compatibility.
    global.Throwif = require("../throwif");
}

var data;

beforeEach(function() {
    //reset data
    data = {};

    data.requiredParams = ['a','d','g'];
    data.optionalParams = ['b','e','f'];

    data.types = {
        'exampleArray'    : [1,2,3,4],
        'exampleObject'   : {'iam': "an object"},
        'exampleFunction' : function(){
            return "i am a function";
        },
        'exampleNumber'   : 3.1416,
        'exampleBoolean'  : true,
        'exampleString'   : 'I am a String'
    };

    data.sets = {};

    data.sets['all'] = {
        'a': 'value of a',
        'b': 'value of b',
        'c': 'value of c',
        'd': 'value of d',
        'e': 'value of e',
        'f': 'value of f',
        'g': 'value of g',
        'h': 'value of h'
    };

    data.sets['union'] = {
        'a': 'value of a',
        'b': 'value of b',
        'c': 'value of c',
        'd': 'value of d',
        'e': 'value of e',
        'f': 'value of f',
        'g': 'value of g',
        'h': 'value of h'
    };
});

describe("Testing Throwif", function() {

    it("should be defined", function() {
        expect(Throwif).toBeDefined();
    });

    it("should have a version", function() {
        expect(Throwif.version()).toMatch(/^v[0-9]+\.[0-9]+\.[0-9]$/);
    })

    it("should have testdata", function() {
        expect(data.types).toBeDefined();
        expect(data.types['exampleFunction']).toBeDefined();

        expect(data.requiredParams).toBeDefined();
        expect(data.optionalParams).toBeDefined();
        expect(data.sets).toBeDefined();
        expect(data.sets['all']).toBeDefined();
        expect(data.sets['union']).toBeDefined();
    });

    // throw if not array
    it("should handle array as param", function() {
        expect( Throwif.notArray ).toBeDefined();

        expect( function() { Throwif.notArray(data.types['exampleArray']);    }).not.toThrow();
        expect( function() { Throwif.notArray(data.types['exampleObject']);   }).toThrow();
        expect( function() { Throwif.notArray(data.types['exampleFunction']); }).toThrow();
        expect( function() { Throwif.notArray(data.types['exampleNumber']);   }).toThrow();
        expect( function() { Throwif.notArray(data.types['exampleBoolean']);  }).toThrow();
        expect( function() { Throwif.notArray(data.types['exampleString']);   }).toThrow();
    });

    // throw if not Object
    it("should handle Object as param", function() {
        expect( Throwif.notObject ).toBeDefined();

        expect( function() { Throwif.notObject(data.types['exampleArray']);    }).not.toThrow(); // array's are also objects
        expect( function() { Throwif.notObject(data.types['exampleObject']);   }).not.toThrow();
        expect( function() { Throwif.notObject(data.types['exampleFunction']); }).toThrow();
        expect( function() { Throwif.notObject(data.types['exampleNumber']);   }).toThrow();
        expect( function() { Throwif.notObject(data.types['exampleBoolean']);  }).toThrow();
        expect( function() { Throwif.notObject(data.types['exampleString']);   }).toThrow();
    });

    // throw if not function
    it("should handle functions as param", function() {
        expect( Throwif.notFunction ).toBeDefined();

        expect( function() { Throwif.notFunction(data.types['exampleArray']);    }).toThrow();
        expect( function() { Throwif.notFunction(data.types['exampleObject']);   }).toThrow();
        expect( function() { Throwif.notFunction(data.types['exampleFunction']); }).not.toThrow();
        expect( function() { Throwif.notFunction(data.types['exampleNumber']);   }).toThrow();
        expect( function() { Throwif.notFunction(data.types['exampleBoolean']);  }).toThrow();
        expect( function() { Throwif.notFunction(data.types['exampleString']);   }).toThrow();
    });

    // throw if not Number
    it("should handle functions as param", function() {
        expect( Throwif.notString ).toBeDefined();

        expect( function() { Throwif.notNumber(data.types['exampleArray']);    }).toThrow();
        expect( function() { Throwif.notNumber(data.types['exampleObject']);   }).toThrow();
        expect( function() { Throwif.notNumber(data.types['exampleFunction']); }).toThrow();
        expect( function() { Throwif.notNumber(data.types['exampleBoolean']);  }).toThrow();
        expect( function() { Throwif.notNumber(data.types['exampleNumber']);   }).not.toThrow();
        expect( function() { Throwif.notNumber(data.types['exampleString']);   }).toThrow();
    });

    // throw if not boolean
    it("should handle functions as param", function() {
        expect( Throwif.notBoolean ).toBeDefined();

        expect( function() { Throwif.notBoolean(data.types['exampleArray']);    }).toThrow();
        expect( function() { Throwif.notBoolean(data.types['exampleObject']);   }).toThrow();
        expect( function() { Throwif.notBoolean(data.types['exampleFunction']); }).toThrow();
        expect( function() { Throwif.notBoolean(data.types['exampleNumber']);   }).toThrow();
        expect( function() { Throwif.notBoolean(data.types['exampleBoolean']);  }).not.toThrow();
        expect( function() { Throwif.notBoolean(data.types['exampleString']);   }).toThrow();
    });

    // throw if not String
    it("should handle functions as param", function() {
        expect( Throwif.notString ).toBeDefined();

        expect( function() { Throwif.notString(data.types['exampleArray']);    }).toThrow();
        expect( function() { Throwif.notString(data.types['exampleObject']);   }).toThrow();
        expect( function() { Throwif.notString(data.types['exampleFunction']); }).toThrow();
        expect( function() { Throwif.notString(data.types['exampleBoolean']);  }).toThrow();
        expect( function() { Throwif.notString(data.types['exampleNumber']);   }).toThrow();
        expect( function() { Throwif.notString(data.types['exampleString']);   }).not.toThrow();
    });
});
