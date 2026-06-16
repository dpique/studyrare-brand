Modal dialog with overlay — confirmations (end session, submit exam) and short forms.

```jsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="End this session?"
  description="Your progress on the 18 answered questions will be saved."
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Keep going</Button>
    <Button variant="danger" onClick={end}>End session</Button>
  </>}
/>
```

Controlled via `open`. `onClose` fires on overlay click + × button. `size` `sm`/`md`/`lg`, `footer` for actions.
