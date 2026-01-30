function memoize(fn) {
  let cache = {};
  return function (n) {
    if (cache[n]) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}

function square(n) {
  console.log("Calculating...");
  return n * n;
}

const memoSquare = memoize(square);

memoSquare(5);
memoSquare(5);