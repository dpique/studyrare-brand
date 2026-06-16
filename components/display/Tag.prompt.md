Outlined chip for content domains, topics and filters in the question bank.

```jsx
<Tag color="var(--periwinkle-500)">Cytogenetics</Tag>
<Tag onClick={toggle} selected={active}>Metabolic</Tag>
<Tag onRemove={() => remove(id)}>Cancer genetics</Tag>
```

Pass `color` for a leading domain dot, `selected` for the active filter state, `onClick` to make it a toggle, `onRemove` to show a × button.
