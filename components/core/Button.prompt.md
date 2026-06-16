Pill-shaped primary action button in Nunito bold — use for the main action on any StudyRare view.

```jsx
<Button variant="primary" onClick={submit}>Submit answer</Button>
<Button variant="accent" rightIcon={<ChevronRight/>}>Start bootcamp</Button>
<Button variant="secondary" size="sm">Skip</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="primary" loading>Saving…</Button>
```

Variants: `primary` (periwinkle, the default CTA), `accent` (amber — reserve for a single hero action per view), `secondary` (outlined), `ghost` (text-only), `danger` (destructive). Sizes: `sm` · `md` · `lg`. Pass `block` to fill width, `leftIcon`/`rightIcon` for icons (Lucide nodes), `as="a"` for link buttons.
