Controlled tab switcher. `line` for page nav, `pill` for compact in-card filters.

```jsx
<Tabs variant="line" value={tab} onChange={setTab}
  items={[{value:'overview',label:'Overview'},{value:'performance',label:'Performance'}]} />

<Tabs variant="pill" value={view} onChange={setView}
  items={[{value:'all',label:'All',count:240},{value:'flagged',label:'Flagged',count:12}]} />
```

`items` are strings or `{value,label,count}`. Controlled via `value` + `onChange`.
