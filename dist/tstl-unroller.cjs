'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts = require('typescript');
const tstl = require('typescript-to-lua');
const constantUnroller = {
	visitors: {
		[ts.SyntaxKind.BinaryExpression]: (node, context) => {
			const operator = node.operatorToken.kind;
			const left = context.transformExpression(node.left);
			const right = context.transformExpression(node.right);
			if (tstl.isNumericLiteral(left) && tstl.isNumericLiteral(right)) {
				switch (operator) {
					case ts.SyntaxKind.AsteriskToken:
						return tstl.createNumericLiteral(left.value * right.value);
					case ts.SyntaxKind.PlusToken:
						return tstl.createNumericLiteral(left.value + right.value);
					case ts.SyntaxKind.MinusToken:
						return tstl.createNumericLiteral(left.value - right.value);
					case ts.SyntaxKind.SlashToken:
						return tstl.createNumericLiteral(left.value / right.value);
					case ts.SyntaxKind.PercentToken:
						return tstl.createNumericLiteral(left.value % right.value);
				}
			}
			return context.superTransformExpression(node);
		},
	},
};
exports.default = constantUnroller;
