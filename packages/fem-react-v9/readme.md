https://react-v9.holt.courses/
git clone https://github.com/btholt/citr-v9-project.git

npx serve (made by vercel)

## VSCode - prettier
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

VSCode configuration - format on save

package.json script
```
 "format": "prettier --write \"src/**/*.{js,jsx}\"",
```

## VSCode - multiple cursors

https://www.youtube.com/watch?v=vJvF7Y9oEjc

https://code.visualstudio.com/assets/docs/getstarted/tips-and-tricks/keyboard-references.png

## Eslint 9

```
npm install -D eslint@9.9.1 eslint-config-prettier@9.1.0 globals@15.9.0
```

eslint.config.mjs

```
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import pluginQuery from "@tanstack/eslint-plugin-query";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  reactPlugin.configs.flat["jsx-runtime"],
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
  },
  prettier,
];

```

prettier has to be last

```
npm run lint -- --fix
npm run lint -- --debug
```

Install VSCode extension

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## .gitignore

```
node_modules
dist/
.env
.DS_Store
coverage/
.vscode/
```

## Vite

```
npm install -D vite@5.4.2 @vitejs/plugin-react@4.3.1
```

vite.config.js

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/public": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    TanStackRouterVite(),
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-react-compiler",
            {
              target: "19",
            },
          ],
        ],
      },
    }),
  ],
});
```

package.json

```
// inside scripts
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```

## React 

```
npm install react@18.3.1 react-dom@18.3.1
```

## JSX

## Hooks

Hook is a function with state which is both readable and mutable

Never use in conditionals because they must be called in the same order each time. 
https://react-v9.holt.courses/lessons/core-react-concepts/hooks

useDebugValue from react - https://react.dev/reference/react/useDebugValue - for custom hooks, identifying in browser react tools at a glance

## React Dev Tools

https://react.dev/learn/react-developer-tools

* Components
* Profiler

## Context

Used for app-level state only such as a shopping cart

```
// contexts.jsx
import { createContext } from "react";

export const CartContext = createContext([[], function () {}]);
```

https://react-v9.holt.courses/lessons/core-react-concepts/context

```
// at the top
import { StrictMode, useState } from "react"; // need useState
import { CartContext } from "./contexts";

// replace App
const App = () => {
  const cartHook = useState([]);
  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div>
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};
```


```
// at top
import { useContext } from "react";
import { CartContext } from "./contexts";

// top of function
const [cart] = useContext(CartContext);

// replace span number
🛒<span className="nav-cart-number">{cart.length}</span>
```

## todo

* figure out emmit for HTML/JSX completion