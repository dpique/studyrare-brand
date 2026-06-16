Rounded container surface — dashboards, question cards, course tiles, explanation panels.

```jsx
<Card>Default white card with soft shadow.</Card>
<Card interactive onClick={open}>Clickable course tile — lifts on hover.</Card>
<Card variant="navy" padding="lg">Inverse panel for stats / CTAs.</Card>
<Card variant="accent">Amber-tinted callout (mnemonic / tip).</Card>
```

Variants: `default` `brand` `navy` `accent` `outline`. `padding` `none`/`sm`/`md`/`lg`. `interactive` adds hover-lift. `elevation` `flat`/`raised` overrides the shadow.
