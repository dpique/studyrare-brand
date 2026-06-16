Styled native select with a custom chevron — filters for domain, difficulty, mode.

```jsx
<Select label="Domain" options={['All domains','Cytogenetics','Metabolic','Cancer']} />
<Select label="Mode" options={[{value:'tutor',label:'Tutor'},{value:'timed',label:'Timed'}]} />
```

Pass `options` (strings or `{value,label}`) or `<option>` children. `size` `sm`/`md`.
