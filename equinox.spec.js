/* 
A "describe" block can be used to group together multiple tests
which check the same nodule or function.
 */
describe("Example tests", function(){
  var add = (num1, num2) => {
    return num1 + num2;
  }
  // Individual tests can be run using the "it" or "test" methods, they are aliased and are equivalent
  it("Should add small numbers", function(){
    /* This test suite is written in Jest. There are many more methods other than "toBe"
    Go to: https://jestjs.io/docs/en/expect
    to find more options if "toBe" doesn't fit your use case.
    */
    expect(add(1,1)).toBe(2);
  });
  
  // In addition to expected, "happy path", behaviour as above, you should also test your edge cases
  it("Should return Infinity for numbers of type Number which are very large", function(){
    expect(add(1.6E310, 1)).toBe(Infinity);
  });
});
/*
We start here. 1 describe block per feature tested.
We can use the 'only' method to only run the tests we want. https://jestjs.io/docs/en/api#describeonlyname-fn
*/