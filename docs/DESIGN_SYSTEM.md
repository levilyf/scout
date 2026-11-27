# Scout design system

**Status:** Visual direction accepted in principle; exact component values and implementation details remain to be validated against the reference illustration.

## 1. Mandatory reference specification

`docs/UI_REFERENCE_SPEC.md` is the mandatory screen-by-screen implementation contract for Scout UI. Every coding agent must read and follow it before implementing or modifying screens. It defines the supplied 15-screen reference, screen composition, interactions, shared components, Android requirements, and visual QA gate. This design-system document supplies shared tokens and component principles; it does not replace the detailed UI reference specification.

## 2. Reference direction

Use the dark social-feed illustration shown in the Scout conversation as the primary visual reference. The target is a premium, minimal, editorial mobile interface, not a generic fintech dashboard.

The visual language should feel like a polished social product:
- Deep black canvas.
- High-contrast white typography.
- Restrained neutral-grey metadata and dividers.
- Generous whitespace and deliberate alignment.
- Rounded cards and controls with subtle boundaries.
- Large, high-quality lifestyle/product imagery where content calls for it.
- Small, quiet interaction icons.
- Strong typographic hierarchy.
- Calm motion and restrained haptics.

## 2. Authentication visual reference

The approved login reference is the black, minimal screen shared by the owner. Treat it as the baseline for login and sign-up:
- Centered Scout wordmark and quiet tagline near the top.
- Large, left-aligned welcome heading with one short supporting sentence.
- Clearly labelled, full-width outlined email and password fields.
- High-contrast white primary action with dark text and rounded corners.
- Quiet text action for password recovery.
- Thin neutral divider and a clear create-account link.
- Google sign-in must be included as a secondary authentication action, visually consistent with the neutral palette. Use the official Google mark and approved brand treatment; do not invent a multicolor Scout variant.
- Preserve generous vertical spacing, readable touch targets, keyboard-safe layout, loading/disabled states, and clear validation errors.

The reference is a design target, not a screenshot to embed. Build it from accessible, reusable native components. Apply the same visual language to sign-up, verification, recovery, and reset-password screens.

## 3. Color foundation

Dark theme is the primary reference:
- App background: `#000000`
- Main surface: `#0A0A0A`
- Elevated surface: `#141414`
- Primary text: `#FFFFFF`
- Secondary text: `#929292`
- Muted text: `#6F6F6F`
- Border: `#292929`

Light theme may be supported, but must be designed deliberately rather than mechanically inverted. Functional status colors may appear only where they communicate meaning, not as decorative brand colors.

## 4. Typography and layout

- Use a clean contemporary sans-serif with strong legibility.
- Use weight and spacing to establish hierarchy, not a pile of font sizes.
- Use consistent spacing tokens based on a 4-point grid.
- Align cards, labels, amounts, and icons precisely.
- Keep metadata visibly secondary.
- Amounts should be easy to scan without dominating every screen.

Typeface selection is open pending licensing and platform checks.

## 5. Components

Build reusable React Native components for:
- Screen and section headers.
- Profile identity row.
- Feed post card.
- Post media container.
- Transaction row and pending-review card.
- Amount and category labels.
- Reaction/comment action row.
- Friend request row.
- Empty, loading, error, and offline states.
- Confirmation sheets, dialogs, and permission explanations.

Do not implement reference illustrations as screenshots. Recreate the design using real accessible components and dynamic data.

## 6. Feed card baseline

A feed card may include:
- Avatar, display name, username, timestamp, and overflow menu.
- User-authored caption.
- Optional image/media.
- Optional explicitly shared merchant/category/amount.
- Reaction and comment actions.
- Audience/visibility indicator where useful.

Never display transaction amount, merchant, or category unless the author explicitly chose to share those fields. A social post must not reveal more than its preview suggests.

## 7. Interaction principles

- Smooth but restrained transitions.
- Haptics only for meaningful actions and only where supported.
- Clear pressed, disabled, loading, and error states.
- No deceptive swipe actions.
- Confirmation for destructive or privacy-impacting changes.
- Accessible touch targets, contrast, screen-reader labels, and dynamic text support.

## 8. Anti-patterns

- Generic template dashboards.
- Excessive gradients, neon accents, or glassmorphism.
- Decorative green/indigo brand identity.
- Excessive card nesting and borders.
- Tiny grey text with poor contrast.
- Emoji used as the only icon system.
- Fake data presented as live financial data.
- Screenshot-based UI in place of actual components.

## 9. Quality bar

Every screen must feel like part of the same product. Review screens side by side for typography, spacing, card geometry, icon weight, image treatment, and interaction behavior before calling the design complete.
