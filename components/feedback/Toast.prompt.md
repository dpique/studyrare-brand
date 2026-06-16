Transient notification — answer feedback, saved confirmations, reminders.

```jsx
<Toast variant="correct" title="Correct!" onClose={dismiss}>+10 points · 3-day streak</Toast>
<Toast variant="incorrect" title="Not quite" onClose={dismiss}>Review the explanation below.</Toast>
<Toast variant="info" title="Progress saved">You can resume this set anytime.</Toast>
```

Variants `info` `correct` `incorrect` `accent`. Pass `onClose` for the dismiss × button. Place in a fixed corner stack.
