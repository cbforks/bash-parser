'use strict';

/* eslint-disable no-sequences */
/* eslint-disable no-return-assign */

module.exports = options => {
	const builder = {};

	builder.list = andOr => ({type: 'list', andOrs: [andOr]});	// eslint-disable-line camelcase
	builder.listAppend = (list, andOr) => (list.andOrs.push(andOr), list);

	builder.term = andOr => ({type: 'term', andOrs: [andOr]});	// eslint-disable-line camelcase
	builder.termAppend = (term, andOr) => (term.andOrs.push(andOr), term);
	builder.subshell = list => ({type: 'subshell', list});
	builder.listAppend = (list, andOr) => (list.andOrs.push(andOr), list);

	builder.pipeSequence = command => {
		return [command];
	};
	builder.pipeSequenceAppend = (pipe, command) => (pipe.push(command), pipe);
	builder.bangPipeSequence = pipe => (pipe.bang = true, pipe);
	builder.singleAndOr = pipe => {
		return {type: 'andOr', left: pipe};
	};
	builder.andAndOr = (left, right) => {
		return {
			type: 'andOr',
			op: 'and',
			left,
			right: builder.singleAndOr(right)
		};
	};
	builder.orAndOr = (left, right) => {
		return {
			type: 'andOr',
			op: 'or',
			left,
			right: builder.singleAndOr(right)
		};
	};
	builder.forClause = (name, wordlist, doGroup) => ({
		type: 'for',
		name,
		wordlist: wordlist,
		do: doGroup
	});

	builder.forClauseDefault = (name, doGroup) => ({
		type: 'for',
		name,
		do: doGroup
	});

	builder.functionDefinition = (name, body) => ({
		type: 'function',
		name,
		body
	});

	builder.ifClause = (clause, then, elseBranch) => {
		const node = {
			type: 'if',
			clause,
			then
		};
		if (elseBranch) {
			node.else = elseBranch;
		}
		return node;
	};

	builder.elifClause = (clause, then, elseBranch) => {
		const node = {
			type: 'elif',
			clause,
			then
		};
		if (elseBranch) {
			node.else = elseBranch;
		}
		return node;
	};

	builder.while = (clause, body) => ({type: 'while', clause, do: body});
	builder.until = (clause, body) => ({type: 'until', clause, do: body});

	builder.commandName = name => name;

	builder.command = function command(prefix, command, suffix) {
		const node = {
			type: 'simple_command',
			name: command
		};

		if (options.insertLOC) {
			node.loc = {};
			if (prefix) {
				const firstPrefix = prefix.list[0];
				node.loc.startLine = firstPrefix.loc.startLine;
				node.loc.startColumn = firstPrefix.loc.startColumn;
			} else {
				node.loc.startLine = command.loc.startLine;
				node.loc.startColumn = command.loc.startColumn;
			}

			if (suffix) {
				const lastSuffix = suffix.list[suffix.list.length - 1];
				node.loc.endLine = lastSuffix.loc.endLine;
				node.loc.endColumn = lastSuffix.loc.endColumn;
			} else {
				node.loc.endLine = command.loc.endLine;
				node.loc.endColumn = command.loc.endColumn;
			}
		}

		if (prefix) {
			node.prefix = prefix;
		}
		if (suffix) {
			node.suffix = suffix;
		}
		return node;
	};
	builder.ioRedirect = (op, file) => ({type: 'io_redirect', op: op, file: file});
	builder.numberIoRedirect = (ioRedirect, numberIo) =>
		(ioRedirect.numberIo = numberIo, ioRedirect);

	builder.suffix = item => {
		const node = {
			type: 'cmd_suffix',
			list: [item]
		};
		return node;
	};

	builder.suffixAppend = (suffix, item) => {
		suffix.list.push(item);
		return suffix;
	};

	builder.prefix = item => ({type: 'cmd_prefix', list: [item]});
	builder.prefixAppend = (prefix, item) => (prefix.list.push(item), prefix);

	return builder;
};
