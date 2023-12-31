import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

const constantUnroller: tstl.Plugin = {
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
					case ts.SyntaxKind.AsteriskAsteriskToken:
						return tstl.createNumericLiteral(Math.pow(left.value, right.value));
				}
			}

			return context.superTransformExpression(node);
		},
	},
};

export default constantUnroller;
