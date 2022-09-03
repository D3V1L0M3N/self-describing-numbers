// how many numbers would you like to test?
const numbers = 12_000_000;
// which number should we start at
const startAt = 0;
// this prevents things like the following numbers being valid: [ 224444, 442244, 444422, 666666 ]
const strictMode = true;


function isEven(n) {
  return n % 2 == 0;
}

function splitNumber(n) {
  n = n.toString();
  var result = [];
  for (var i = 0; i <= n.length-2; i += 2) {
    result.push(n.slice(i, i+2));
  }
  return result;
}

function countOccurences(numberToLookFor, numberToLookIn) {
  numberToLookIn = numberToLookIn.toString();
  var count = 0;
  numberToLookIn.split('').forEach(n => {
    n = parseInt(n);
    if (n == numberToLookFor) { count++; }
  });
  return count;
}

function findDuplicates(arry) {
  return arry.filter((item, index) => arry.indexOf(item) !== index);
}



function main() {
  console.log('Starting number crunch!');
  const startTime = Date.now();

  var results = [];

  numberCrunch:
  for (var i = 0; i < numbers; i++) {
    // example number: 14233221
    var number = i;
  
    // check number has even number of digits
    if (!isEven(number.toString().length)) { continue }
  
    // split our number into couplets
    // example: ['14', '23', '32', '21']
    var couplets = splitNumber(number);

    // strict mode: there should not be duplicate couplets
    if (strictMode && findDuplicates(couplets).length) {
      continue numberCrunch;
    }

    for (var x = 0; x < couplets.length; x++) {
      // each couplet indicates how often an integer should appear in our number
      // example: ['14'] - there should be x1 4 in our number
      // lets check each couplet to see if they're telling the truth
      if (parseInt(couplets[x].charAt(0)) !== countOccurences(couplets[x].charAt(1), number)) {
        continue numberCrunch;
      }
  
      // make sure each quantity indicator gets mentioned/tested
      if (!couplets.map(e => e.charAt(1)).includes(couplets[x].charAt(0))) {
        continue numberCrunch;
      }
    }

    // our number passed the tests!
    results.push(number);
  }

  console.log(`Done - took ${Date.now() - startTime}ms`);
  console.log(results);
}


main();