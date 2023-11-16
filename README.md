# tstl-simple-const-unroller

TypeScriptToLua plugin that performs [constant folding](https://en.wikipedia.org/wiki/Constant_folding) for simple numeric expressions:

- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)
- Modulo (%)

## Example

```ts
const hour = 60 * 60;
```

Becomes:

```lua
local hour = 3600
```

## Installation

1. Install this plugin

```bash
yarn add git+https://git@github.com/thinknathan/tstl-simple-const-unroller.git#^1.0.0 -D
# or
npm install git+https://git@github.com/thinknathan/tstl-simple-const-unroller.git#^1.0.0 --save-dev
```

2. Add `tstl-simple-const-unroller` to `tstl.luaPlugins` in `tsconfig.json`

```diff
{
	"tstl": {
		"luaPlugins": [
+			{ "name": "tstl-simple-const-unroller }
		],
	}
}
```

## License

CC0
