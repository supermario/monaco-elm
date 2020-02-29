export const language = {
 // Set defaultToken to invalid to see what you do not tokenize yet
 // defaultToken: 'invalid',

 keywords: [
   'module','exposing','import','port','type','alias','let','in','if','then','else','case','of'
 ],

 typeKeywords: [],

 operators: [
   '=', '>', '<', '==', '<=', '>=', '/=',
   '&&', '||', '++', '::', '+', '-', '*', '/',
   '<<', '>>', '|>', '<|'
 ],

 // we include these common regular expressions
 symbols:  /[=><!~?:&|+\-*\/\^%]+/,

 // C# style strings
 escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

 // The main tokenizer for our languages
 tokenizer: {
   root: [
     // Identifiers and keywords
     [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'keyword',
                                  '@keywords': 'keyword',
                                  '@default': 'identifier' } }],

     // Show Type names nicely
     [/[A-Z][\w\$]*/, 'type.identifier' ],

     // Whitespace
     { include: '@whitespace' },

     // Delimiters and operators
     [/[{}()\[\]]/, '@brackets'],
     [/[<>](?!@symbols)/, '@brackets'],
     [/@symbols/, { cases: { '@operators': 'operator',
                             '@default'  : '' } } ],

     // Numbers
     [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
     [/\d+/, 'number'],

     // delimiter: after number because of .\d floats
     [/[;,.]/, 'delimiter'],

     // strings
     [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
     [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],

     // characters
     [/'[^\\']'/, 'string'],
     [/(')(@escapes)(')/, ['string','string.escape','string']],
     [/'/, 'string.invalid']
   ],

   string: [
     [/[^\\"]+/,  'string'],
     [/@escapes/, 'string.escape'],
     [/\\./,      'string.escape.invalid'],
     [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
   ],

   whitespace: [
     [/[ \t\r\n]+/, ''],
     [/{-/, 'comment', '@comment'],
     [/--.*$/, 'comment'],
   ],

   comment: [
     [/[^{-]+/, 'comment'],
     [/-}/, 'comment', '@pop'],
     [/[{-]/, 'comment']
   ],
 },
};
