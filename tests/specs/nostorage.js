/*jshint asi:true */

describe("No DOM Storage:", function(){

    "use strict";

    beforeEach(function(){
        // Manually flag local storage as not being supported.
        locache.supportsLocalStorage = false
        this.cache = locache.createCache()
    })

    afterEach(function(){
        // re-enable it to avoid effecting other tests.
        locache.supportsLocalStorage = true;
    })

    it("should test that localStorage isn't supported", function() {

        expect(locache.supportsLocalStorage).toBe(false)

    })

    it("with no localStorage length and flush", function(){

        expect(this.cache.length()).toBe(0)
        this.cache.set("key", "value")
        expect(this.cache.length()).toBe(0)
        this.cache.flush()
        expect(this.cache.length()).toBe(0)

    })

    it("with no localStorage setting, getting and removing simple values", function(){

        var key = "my_key"
        var value = "my_value"

        this.cache.set(key, value)
        expect(this.cache.get(key)).toBe(null)

        this.cache.remove(key)
        expect(this.cache.get(key)).toBe(null)

    })

    it("with no localStorage setting a value with an expire time", function(){

        var key = "will_expire"
        var value = "value"

        this.cache.set(key, value, 1)
        expect(this.cache.get(key)).toBe(null)

    })

    it("with no localStorage incr and decr'ing of keys", function(){

        this.cache.incr("counter")
        expect(this.cache.get("counter")).toBe(null)
        this.cache.decr("counter")
        expect(this.cache.get("counter")).toBe(null)

    })

    it("should test setting many keys", function(){

        var pairs = {'key1': 'val1','key2': 'val2','key3': 'val3'}
        this.cache.setMany(pairs)

        expect(this.cache.get('key1')).toEqual(null)
        expect(this.cache.get('key3')).toEqual(null)

    })

    it("should test getting many keys at once", function(){

        var pairs = {'key1': 'val1','key2': 'val2','key3': 'val3'}
        this.cache.setMany(pairs)

        var vals = this.cache.getMany(['key1','key2','key3'])
        expect(vals).toEqual({'key1': null, 'key2': null,'key3': null})

    })

    it("should test getting many values at once", function(){

        var pairs = {'key1': 'val1','key2': 'val2','key3': 'val3'}
        this.cache.setMany(pairs)

        var vals = this.cache.getManyValues(['key1','key2','key3'])
        expect(vals).toEqual([null, null, null])

    })

})