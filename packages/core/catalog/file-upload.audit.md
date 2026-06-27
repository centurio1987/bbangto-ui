# FileUploader variant axis — saturation audit

- **Category:** molecule / control
- **Host:** `FileUploader` (`packages/core/src/components/FileUploader.tsx`)
- **Axis:** `variant` (layout / upload-target family)
- **Default-first anchor:** `default` (unchanged; existing union head preserved)
- **Saturation round:** 1 (pilot)

## Adopted members (this round)

| Member | Load-bearing chrome | Why irreducible to existing members |
|--------|---------------------|-------------------------------------|
| `avatar` | Circular media slot (`border-radius: radius.full`), thin **solid** 1px border, image fills the slot via `background-size: cover` / `background-position: center`, hover dims (`opacity` transition). The dashed rectangular dropzone chrome is removed entirely — the round slot itself IS the upload target. | `default` and `compact` are both rectangular dropzones with a **dashed** border and external chrome (cloud icon / "Choose file" button). The avatar-as-target treatment (round, solid-bordered, image-filled, hover-dim) is a distinct target form, not a size/density variation of the dashed dropzone. |

All chrome composes from existing tokens via `cssVar()`
(`radius.full`, `semantic.border.base|focus`, `semantic.background.sunken`,
`semantic.disabled.background`, `semantic.foreground.muted`, `semantic.primary.base`,
`motion.duration.fast` / `motion.easing.default`, `spacing.64`). The image
preview `url(...)` is the only inline composition and carries no design value.

## Candidate accounting (12 surveyed)

- **reviewed:** 12
- **absorbed:** 5 — `circle` (same round-target idea), `profile` (avatar synonym),
  `thumbnail` (image-fill slot, square sub-case of the round media slot),
  `image-preview` (folds into the filled-slot preview behavior),
  `inline-avatar` (size/placement variation, not a new chrome family).
- **noise:** 3 — `gallery` (multi-image grid; an orthogonal layout axis, not a
  target family), `kanban-drop` (cross-component DnD board, out of host scope),
  `paste-zone` (input-method variation reusing the same dropzone chrome).
- **dropped:**
  - `glass` — requires `backdrop-filter` + a translucent surface token absent
    from `SemanticColors`; would force raw values.
  - `gradient-ring` — needs a multi-stop gradient ring not derivable as a single
    border token; chrome not expressible without raw gradient color stops beyond
    the avatar's solid-border spec.
  - `bordered-card` — duplicates the existing rectangular dropzone framing; no
    distinct chrome beyond `default`/`compact`.
- **unreviewed:** 0 (= 12 − 12 reviewed)

## Notes

- New member appended to the union tail; `default` remains the default so every
  existing call site and story renders identically.
- Root now renders `data-bbangto-file-upload-variant={variant}` across all three
  variant branches (first axis hook on this host; future axes should follow the
  same `data-bbangto-file-upload-*` convention).
- a11y contract preserved: the circular target is keyboard-operable
  (`role="button"`, `tabIndex`, Enter/Space via `onKeyDown`) with an
  `aria-label`, and the hidden `input[type=file]` access is retained.
