Square icon-only button for toolbars and dense controls — flag a question, open settings, paginate.

```jsx
<IconButton label="Flag for review" variant="flag" pressed={flagged} onClick={toggle}>
  <Flag/>
</IconButton>
<IconButton label="Next" variant="solid"><ChevronRight/></IconButton>
```

Variants: `ghost` (default), `solid` (periwinkle fill), `outline`, `flag` (amber when pressed). Sizes `sm`/`md`/`lg`. Always supply `label`; use `pressed` for toggle state.
