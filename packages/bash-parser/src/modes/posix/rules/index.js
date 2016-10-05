'use strict';

exports.parameterExpansion = require('./parameter-expansion');
exports.commandExpansion = require('./command-expansion');
exports.arithmeticExpansion = require('./arithmetic-expansion');
exports.aliasSubstitution = require('./alias-substitution');
exports.defaultNodeType = require('./default-node-type');
exports.fieldSplitting = require('./field-splitting');
exports.tildeExpanding = require('./tilde-expanding');
exports.pathExpansion = require('./path-expansion');
exports.quoteRemoval = require('./quote-removal');
exports.identifySimpleCommandNames = require('./identify-simplecommand-names');
exports.identifyMaybeSimpleCommands = require('./identify-maybe-simple-commands');
exports.operatorTokens = require('./operator-tokens');
exports.reservedWords = require('./reserved-words');
exports.separator = require('./separator');
exports.linebreakIn = require('./linebreak-in');
exports.forNameVariable = require('./for-name-variable');
exports.functionName = require('./function-name');
exports.ioNumber = require('./io-number');
// exports.removeTempObject = require('./remove-temp-object');
exports.newLineList = require('./new-line-list');
exports.assignmentWord = require('./assignment-word');
exports.syntaxerrorOnContinue = require('./syntaxerror-oncontinue');
