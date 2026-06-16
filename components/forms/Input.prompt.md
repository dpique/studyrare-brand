Labelled text input with hint/error states — search, sign-in, short answers.

```jsx
<Input label="Email" type="email" required placeholder="you@program.edu" />
<Input label="Search questions" leftIcon={<Search/>} placeholder="Search by topic…" />
<Input label="Password" type="password" error="Incorrect password" />
```

Props: `label`, `hint`, `error` (red state), `required`, `size` (`sm`/`md`/`lg`), `leftIcon`. Forwards all native input attributes.
