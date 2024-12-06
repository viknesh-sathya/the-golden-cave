# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Extensions

1. vscode-styled-components. (Helps to write normal css in componets)
2. Tailwind CSS IntelliSense.
3. Material Icon Theme.
4. ESLint.
5. Color Highlight.
6. Auto Rename Tag.

# Note

GlobalStyles cannot have children so it should be placed as a sibiling( check App.js)

We need to also install date-fns lib for manipulating the dates refer the utility file

# hooks

1. const { register, handleSubmit } = useForm();

# React Query hooks

1. useQuery()
2. useMutation() used to delete or mutate

# npm i

1.  npm i react-hot-toast
2.  npm i date-fns
3.  npm i @tanstack/react-query-devtools@4
4.  npm i --save @supabase/supabase-js
5.  npm i react-icons
6.  npm i react-router-dom@6
7.  npm i styled-components
8.  npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
9.  npm i -D prettier prettier-plugin-tailwindcss
10. npx tailwindcss init -p
11. npm i -D tailwindcss@3 postcss autoprefixer
12. npm i @redux-devtools/extension
13. npm i react-hook-form@7
14. npm i recharts@2
15. npm i react-error-boundary
