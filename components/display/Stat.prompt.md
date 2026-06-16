Big-number metric for dashboards — questions answered, accuracy, study streak.

```jsx
<Stat label="Accuracy" value={78} suffix="%" delta={6} accent />
<Stat label="Questions answered" value="1,204" />
<Stat label="Day streak" value={12} suffix="days" />
```

`delta` is a signed percent that renders a colored up/down arrow. `accent` tints the number periwinkle. `suffix` for units.
