Toggle switch for binary settings — timer visibility, reminders, dark mode.

```jsx
<Switch label="Show timer" defaultChecked />
<Switch label="Email me daily questions" onChange={onToggle} />
```

Forwards native checkbox props (`checked`, `defaultChecked`, `onChange`, `disabled`).
