Progress / completion bar — course progress, domain mastery, or a stacked answer breakdown.

```jsx
<ProgressBar label="Metabolic genetics" value={64} showValue />
<ProgressBar variant="correct" value={80} size="sm" />
<ProgressBar segments={[
  { value: 62, variant: 'correct' },
  { value: 23, variant: 'incorrect' },
]} />
```

Single-fill with `variant`, or pass `segments` for a stacked bar (correct/incorrect/unanswered). `label` + `showValue` add a caption row.
