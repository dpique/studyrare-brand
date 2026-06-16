Board-style multiple-choice answer option — the signature StudyRare control.

```jsx
// before submitting
<Choice letter="A" selected onClick={() => pick('A')}>Autosomal dominant</Choice>

// after submitting (graded)
<Choice letter="A" graded state="incorrect" selected>Autosomal dominant</Choice>
<Choice letter="B" graded state="correct">Autosomal recessive</Choice>
<Choice letter="C" graded>X-linked</Choice>
```

Pre-submit: use `selected`. Post-submit: set `graded` on all options and give the answer key `state="correct"`; the learner's wrong pick gets `state="incorrect"`. Unselected non-answers dim automatically.
