# Regex Cheat Sheet

#### Testing a Regex
- Use the ```.test()``` method

```js

const testString = 'My test string'
const testRegex = /string/;
testRegex.test(testString)

```

#### Testing multiple patterns
- Use the OR operator(|)

```js

const regex = /yes|no|maybe/

```

#### Ignoring case
- Use the ```i``` flag for case insensitivity

```js

const caseInsensitiveRegex = /ignore case/i
const testString = 'We use the i flag to iGnorE CasE'
caseInsensitiveRegex.test(testString)

```

#### Extracting the first match to a variable
- Use the ```.match()``` function

```js

const match = 'Hello World!'.match(/hello/i)  //'Hello'

```

#### Extracting all of the matches in an array
- Use the ```g``` flag

```js

const testString = 'Repeat repeat rePeAT'
cosnt regexWithAllMatches = /Repeat/gi
testString.match(regexWithAllMatches) //['Repeat', 'repeat', 'rePeAT']

```

#### Matching any character
- Use the wildcard character ```.``` to be a placeholder for any character

```js

// To match 'cat', 'Bat', 'fAt', 'mat'
const regexWithWildcard = /.at/gi;
const testString = 'cat BAT cupcake fAT mat dog'
const allMatchingWords = testString.match(regexWithWildcard); //['cat', 'Bat', 'fAt', 'mat']

```

#### Matching a single character with multiple possibilities
- Use character classes, which allow you to define a group of characters you wish to match
- You place them inside square brackets ```[]```

```js

// Match "cat" "fat" and "mat" but not "bat"
const regexWithCharClass = /[cfm]at/g;
const testString = "cat fat bat mat";
const allMatchingWords = testString.match(regexWithCharClass); // ["cat", "fat", "mat"]

```

#### Match letters of the alphabet
- Use a range within the character set ```[a-z]```

```js

const regexWithCharRange = /[a-e]at/;
const catString = "cat";
const batString = "bat";
const fatString = "fat";

regexWithCharRange.test(catString); // true
regexWithCharRange.test(batString); // true
regexWithCharRange.test(fatString); // false

```

#### Match specific numbers and letters
- You can also use the hyphen to match numbers

```js

const regexWithLetterAndNumberRange = /[a-z0-9]/ig;
const testString = "Emma19382";
testString.match(regexWithLetterAndNumberRange) // true

```

#### Match a single, unknown character
- To match a set of characters you don't want to have, use the negated character set
- To negate a character set, use a caret ```^```

```js

const allCharsNotVowels = /[^aeiou]/gi;
const allCharsNotVowelsOrNumbers = /[^aeiou0-9]/gi;

```

#### Match characters that occur one or more times in a row
- Use the ```+``` symbol

```js

const oneOrMoreAsRegex = /a+/gi;
const oneOrMoreSsRegex = /s+/gi;
const cityInFlorida = "Tallahassee";

cityInFlorida.match(oneOrMoreAsRegex); // ['a', 'a', 'a'];
cityInFlorida.match(oneOrMoreSsRegex); // ['ss'];

```

#### Matches characters that occur zero or more times in a row
- Use the asterisk ```*```

```js

const zeroOrMoreOsRegex = /hi*/gi;
const normalHi = "hi";
const happyHi = "hiiiiii";
const twoHis = "hiihii";
const bye = "bye";

normalHi.match(zeroOrMoreOsRegex); // ["hi"]
happyHi.match(zeroOrMoreOsRegex); // ["hiiiiii"]
twoHis.match(zeroOrMoreOsRegex); // ["hii", "hii"]
bye.match(zeroOrMoreOsRegex); // null

```

#### Lazy Matching
- The smallest part of a string that matches the given requirements
- Regex, by default, are greedy (matches the longest portion of a string meeting the given requirements)
- Use the ```?``` character to lazy match

```js

const testString = "catastrophe";
const greedyRexex = /c[a-z]*t/gi;
const lazyRegex = /c[a-z]*?t/gi;

testString.match(greedyRexex); // ["catast"]
testString.match(lazyRegex); // ["cat"]

```

####
- 

```js



```



[Reference](https://dev.to/emmawedekind/regex-cheat-sheet-2j2a)
