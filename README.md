# ElectroCalc v3 — Learn + Calculate in a New Tab

ElectroCalc is a dark-only engineering calculator website for ECE students.

## New in v3
When a user clicks a calculator on the home page, it opens in a **new browser tab**:

`index.html → calculator.html?calc=ohm`

The new calculator workspace contains:

1. **Topic introduction** — what the concept is.
2. **Main formula** — highlighted separately.
3. **Important points** — practical things to remember.
4. **Worked example** — step-by-step method.
5. **Interactive calculator** — user enters their own values.
6. **Result** — formula substitution and final answer.
7. **Calculation history** — stored locally in the browser.

## Logic gates
The Logic Gate calculator supports:
- AND
- OR
- NOT
- NAND
- NOR
- XOR
- XNOR

For multi-input gates, the user can select **1–8 inputs**. NOT automatically uses one input.

## File structure
```text
ElectroCalc/
├── index.html
├── calculator.html
├── calculator.js
├── calculator.css
├── style.css
├── README.md
└── assets/
    └── hero-workspace.png
```

## Run locally
Open `index.html` using VS Code Live Server, or open it directly in a browser.

## GitHub Pages
This version uses only HTML, CSS and JavaScript, so it can be hosted as a static GitHub Pages site.

## Authentication
The login/register UI is still a frontend demonstration using localStorage. Do not use it for real passwords in production. The next version should use Firebase Auth, Supabase Auth, or a Node/Express backend with secure password handling.
