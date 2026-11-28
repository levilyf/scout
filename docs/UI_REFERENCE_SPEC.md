# Scout UI Reference and Implementation Contract

**Status:** Owner-approved visual direction. This document is mandatory for every agent implementing or changing Scout UI.

**Primary reference:** The 15-screen Scout UI reference image supplied by the owner in the conversation on 27 November 2026. It shows a five-column, three-row board of mobile screens. The board is a design reference, not an app screen.

**Related documents:** `docs/DESIGN_SYSTEM.md`, `docs/PRODUCT_SPEC.md`, `docs/PRIVACY_MODEL.md`, and `AGENTS.md`.

---

## 1. Mandatory instruction to coding agents

Before implementing, modifying, or reviewing any Scout screen:

1. Read this entire document.
2. Read `docs/DESIGN_SYSTEM.md` for shared design tokens and component rules.
3. Read the relevant product and privacy requirements.
4. Inspect the supplied reference image if it is available in the task context or repository.
5. Recreate the reference with real native components. Never use the reference screenshot as the application UI.
6. Capture screenshots of the implementation and compare them against the reference before declaring the work complete.

**Do not treat this document as optional inspiration. It is the UI implementation contract.**

Do not independently redesign, simplify, reinterpret, or replace the visual language. Do not silently omit screens or visible controls. If a detail is genuinely ambiguous, preserve the closest visible interpretation and record the question instead of inventing a new visual direction.

### Priority when requirements conflict

- Security, privacy, accessibility, platform conventions, and financial correctness cannot be violated to imitate a picture.
- Product behavior in `PRODUCT_SPEC.md` and `PRIVACY_MODEL.md` remains authoritative.
- For visual decisions, this document and the supplied reference take priority over generic templates, agent preferences, or default component-library styling.
- If a reference detail conflicts with an approved product rule, keep the product rule and reproduce the visual treatment around it.

---

## 2. Visual target

Scout is a premium, minimal, dark editorial social-finance app. It should feel like a carefully designed consumer social product with serious financial utility, not a generic banking dashboard.

### 2.1 Overall appearance

- Predominantly pure black canvas.
- High-contrast white primary typography.
- Quiet neutral-grey supporting text and metadata.
- Subtle dark surfaces and thin outlines.
- Generous, deliberate whitespace.
- Rounded input fields, cards, buttons, and media containers.
- Minimal outline icons with consistent stroke weight.
- Strong typography hierarchy.
- Large product/lifestyle imagery in social posts.
- Compact, quiet navigation.
- Restrained feedback and motion.

The result should feel calm, confident, polished, and cohesive. Do not add visual decoration just because a screen looks empty.

### 2.2 Color tokens

Use the existing Scout tokens as the baseline:

| Token | Value | Usage |
|---|---|---|
| Background | `#000000` | Main screen canvas |
| Surface | `#0A0A0A` | Inputs and subtle containers |
| Elevated surface | `#141414` | Cards, selected controls, icon wells |
| Primary text | `#FFFFFF` | Main headings, important values |
| Secondary text | `#929292` | Descriptions, labels, metadata |
| Muted text | `#6F6F6F` | Quiet supporting information |
| Border | `#292929` | Input outlines, dividers, subtle boundaries |

Functional colors only:
- Restrained green for positive changes and income.
- Restrained red for destructive actions and real warnings.
- Google’s official multicolor mark only on Google sign-in.

Do not introduce a decorative brand accent, gradients, neon, glassmorphism, colorful glows, or arbitrary per-screen colors. If a token needs adjustment to match the supplied image, document the measured reason and update the shared token rather than adding a one-off value.

### 2.3 Typography

Use one consistent contemporary sans-serif available and licensed for the app.

Hierarchy:
- Screen title: large, clear, medium or semibold.
- Section title: medium weight.
- Main balance/amount: prominent, not excessively heavy.
- Body copy: normal weight and comfortable line height.
- Form labels: compact but readable.
- Metadata: smaller and neutral grey.
- Buttons: medium/semibold, centered.

Do not bold everything. Do not use arbitrary font sizes screen by screen. Define shared type tokens and apply them consistently. Keep the Scout wordmark and small uppercase tagline visually consistent on authentication screens.

### 2.4 Geometry and spacing

- Use a 4-point spacing scale.
- Use consistent horizontal screen margins.
- Align labels and fields to the same left edge.
- Keep repeated field heights and corner radii identical.
- Align right-side amounts to one vertical edge.
- Use subtle rounded corners rather than exaggerated pill shapes everywhere.
- Keep card nesting to a minimum.
- Preserve the negative space visible in the reference.
- Respect Android safe areas, system bars, and keyboard insets.
- Scroll long content instead of squeezing typography or controls.

The screenshot is a visual target, not proof of exact pixel values. Measure the reference where possible. Do not claim exact hex, radius, or spacing values that have not been measured.

### 2.5 Iconography

Use one coherent outline icon family. Keep icon size, stroke, optical weight, and alignment consistent. Avoid emoji as substitutes for functional icons. Use the official Google mark for Google sign-in.

---

## 3. Screen inventory

The supplied board contains these 15 reference screens:

| # | Screen | Area |
|---|---|---|
| 01 | Welcome Back / Login | Authentication |
| 02 | Create Account | Authentication |
| 03 | Verify Email | Authentication |
| 04 | Profile Onboarding | Onboarding |
| 05 | Reset Password | Recovery |
| 06 | Home / Dashboard | Finance |
| 07 | Transaction Approval | Finance |
| 08 | Activity / Transactions | Finance |
| 09 | Budgets | Finance |
| 10 | Savings / Goals | Finance |
| 11 | Social Feed | Social |
| 12 | Friend Profile | Social |
| 13 | Settings | Account |
| 14 | Support / Help | Account |
| 15 | Account Management | Account |

These are not the entire product page inventory. The complete planned route inventory remains in `docs/PRODUCT_SPEC.md`. Build additional detail, edit, search, filter, confirmation, recovery, and empty/error states using the same visual system.

---

## 4. Screen specifications

### 01 — Welcome Back / Login

**Composition**
- Full black screen.
- Centered Scout wordmark in the upper area.
- Small muted uppercase tagline: “KNOW YOUR MONEY.”
- Large left-aligned heading: “Welcome back.”
- Supporting line: “Log in to your Scout account.”
- Email label and full-width outlined field.
- Password label and full-width outlined secure field.
- Full-width white “Log in” primary button.
- Quiet “or” separator.
- Full-width dark outlined “Continue with Google” button with official Google mark.
- Centered “Forgot password?” link.
- Thin horizontal divider.
- Bottom link: “New to Scout? Create account”.

**Field treatment**
- Black/near-black fill.
- Thin neutral-grey outline.
- Rounded rectangle corners.
- White entered text and muted placeholder.
- Labels above fields, not floating inside them.
- Password visibility control inside the field where supported.

**Behavior**
- Validate required fields and email format.
- Show inline errors without shifting the entire layout unpredictably.
- Show loading and disabled states during authentication.
- Successful authentication enters the protected app.
- Forgot password opens Screen 05.
- Create account opens Screen 02.
- Google action starts the approved Google sign-in flow.
- No guest entry or bypass.

### 02 — Create Account

**Composition**
- Same wordmark and tagline treatment as login.
- Heading: “Create account.”
- Supporting line: “Join Scout and take control of your finances.”
- Name, email, and password fields in a vertical stack.
- White “Sign up” button.
- “or” separator.
- Outlined “Continue with Google” button.
- Quiet existing-account link at the bottom.

**Behavior**
- Validate all required fields.
- Explain password requirements.
- Handle an already-registered email safely.
- Google sign-up must use the same approved identity system as Google login.
- Continue to verification when required by the chosen provider/policy.
- Existing-account link returns to login.

### 03 — Verify Email

**Composition**
- Black background.
- Back arrow at top-left.
- Centered envelope icon in a rounded elevated dark container.
- Heading: “Verify your email”.
- Short explanation that a verification link was sent.
- Prominent white “Open Email App” button.
- Quiet resend action with visible countdown/cooldown.

**Behavior**
- Open an email app where platform support permits.
- Resend only through a real provider request.
- Show cooldown and useful errors.
- Detect completed verification through the auth provider.
- Never claim an email was sent unless the provider confirms it.

### 04 — Profile Onboarding

**Composition**
- Black background and back arrow.
- Small multi-step progress indicator near the top.
- Centered heading: “Welcome to Scout.”
- Supporting line: “Let’s set up your profile.”
- Large circular avatar/photo placeholder with camera icon.
- Small outlined “Change photo” action.
- Username label and outlined field.
- Currency label and selector.
- Full-width white “Continue” button.

**Behavior**
- Profile image selection is optional.
- Validate username syntax and availability.
- Display available/taken feedback clearly.
- India/INR is the proposed default.
- Changing display currency must not silently rewrite stored money values.
- This is one step in onboarding; other approved onboarding steps remain in the product spec.

### 05 — Reset Password

**Composition**
- Black background and back arrow.
- Centered lock icon in a subtle dark rounded container.
- Heading: “Reset your password”.
- Supporting text: “Enter your email and we’ll send you a reset link.”
- Email label and outlined field.
- White “Send link” button.
- Quiet “Back to login” link.

**Behavior**
- Validate email.
- Submit a real recovery request.
- Use a non-enumerating confirmation message that does not reveal whether an account exists.
- Show network/provider errors.
- Implement a separate reset-completion screen in the full route map, even though it is not shown on the board.

### 06 — Home / Dashboard

**Header**
- Small Scout wordmark aligned left.
- Notification bell aligned right.

**Main summary**
- Prominent balance/financial summary.
- Small visibility/eye control if the value can be hidden.
- Restrained month-over-month comparison.
- Minimal line chart below.
- Time filters: 1D, 1W, 1M, 3M, 1Y.
- Selected range uses a subtle elevated/outlined state.

**Pending review**
- Rounded dark card below the chart.
- Example title: “Review 2 transactions”.
- Supporting copy: “These expenses need your approval.”
- Right-facing arrow.
- Make this visible without turning it into a blocking modal.

**Quick actions**
- Add expense.
- Set budget.
- New goal.
- View more.

Use compact icon buttons with short labels, aligned evenly.

**Navigation**
The visual reference shows five destinations: Home, Activity, Social, Budgets, Profile. Treat this as the current visual reference for the bottom navigation. The final route map must still expose all documented settings and account pages; do not delete functionality to fit the tab bar.

**Financial correctness**
- Confirmed data only in confirmed totals.
- Pending/ignored detections never affect balances, budgets, or analytics.
- Never imply that manually tracked accounts are connected bank accounts.
- No fabricated financial figures in production. Use clearly synthetic fixtures in development.

### 07 — Transaction Approval

**Composition**
- Black background and back arrow.
- Centered title: “Transaction pending”.
- Large rounded dark transaction card.
- Merchant/source icon.
- Merchant name.
- Prominent amount.
- Supporting date/time.
- Short question asking whether to add/count the expense.
- White “Approve” button.
- Dark outlined “Ignore” button.
- Quiet “Report” action.

**Example fixture**
- Amazon India.
- ₹1,499.
- Today · 4:32 PM.

This is sample UI data only.

**Behavior**
- Approve confirms the pending transaction exactly once.
- Ignore moves it to the ignored/recoverable state.
- Report opens a real report/correction flow.
- Offer edit-before-confirm where appropriate.
- Detect possible duplicates.
- Dismissing the screen must never approve an item.
- Approval is not consent to publish socially.

### 08 — Activity / Transactions

**Header**
- “Activity” title.
- Search icon at upper-right.

**Filters**
- Horizontal chips: All, Expenses, Income, Transfers.
- Selected chip uses a brighter neutral surface/border.
- Additional date/category/account filters belong in the filter interface.

**Transaction rows**
- Source/merchant/category icon at left.
- Name and date/time in the center.
- Amount aligned right.
- Consistent row height and spacing.
- Subtle separators only where useful.
- Positive green treatment may identify income.

**Example fixtures**
- Amazon India — ₹1,499.
- Zomato — ₹320.
- Cred — ₹2,499.
- Salary — +₹75,000.
- Netflix — ₹149.

**Behavior**
- Open transaction details.
- Search and filter actual records.
- Support expense, income, and transfer creation.
- Support editing and deletion according to product rules.
- Transfers between a user's own accounts are not income or expenses.

### 09 — Budgets

**Composition**
- “Budgets” heading.
- Main rounded monthly budget card.
- Label “Monthly Budget”.
- Large total budget amount.
- Horizontal progress bar.
- Remaining amount and percentage used.
- “Categories” section.
- Compact category rows with icon, name, spent/limit values, and optional progress.

**Example fixture**
- Monthly budget: ₹25,000.
- Spent: ₹7,500.
- Remaining: ₹17,500.
- Used: 30%.

The progress indicator must be calculated from confirmed spending, not hardcoded.

**Behavior**
- View all budgets.
- Create, edit, archive, or delete with appropriate confirmation.
- Open category details.
- Show useful empty states when no budget exists.

### 10 — Savings / Goals

**Composition**
- “Savings” heading.
- Large goal card, e.g. “Europe Trip”.
- Target amount, saved amount, and progress percentage.
- Horizontal progress indicator.
- Compact “+ New Goal” action.
- Separate savings summary card with total saved and a restrained trend line.

**Example fixture**
- Goal target: ₹1,50,000.
- Saved: ₹80,000.
- Progress: 54%.

**Behavior**
- Create and edit goals.
- View goal details and contribution history.
- Add contributions.
- Complete or archive goals.
- Goal contributions are allocations, not expenses.

### 11 — Social Feed

**Importance:** This is a core visual identity screen. Give its spacing, media presentation, and post hierarchy the same care as authentication.

**Composition**
- Black background.
- Compact header.
- Create-post action at upper-right.
- Vertical feed of post cards.
- Each post: avatar, display name, username, timestamp, overflow menu, caption, optional large media, optional explicitly shared transaction details, and a compact reaction/comment/action row.

**Example fixture**
- User: rohan.
- Caption: “Finally got the headphones I’ve wanted.”
- Large headphones product image.
- Optional category and amount: Shopping · ₹8,999.

**Media**
- Large, high-quality image area.
- Rounded corners consistent with the system.
- Preserve source aspect ratio where possible.
- Avoid unnecessary overlays.
- Do not crop important subject details.

**Behavior**
- Like/unlike.
- Comment and open post detail.
- Open profile.
- Share post.
- Save/bookmark only if included in approved scope.
- Report or hide content.

**Privacy**
- Never publish a transaction automatically.
- The author must explicitly choose the fields and audience.
- Do not expose balances, account identifiers, raw messages, or unselected financial fields.

### 12 — Friend Profile

**Composition**
- Back arrow.
- Prominent circular avatar.
- Display name and username.
- Profile metrics area.
- Friend/follow action as defined by the approved relationship model.
- Activity and Goals sections/tabs.
- Shared post list.

The screenshot's example metrics are illustrative, not permission to expose private spending or savings totals.

**Behavior**
- Send/accept/remove friend request according to the approved friend model.
- View only content shared with the viewer.
- Block and report.
- Never expose financial metrics just because two users are friends.
- Do not silently replace the approved mutual-friend model with a follower-only model.

### 13 — Settings

**Composition**
- “Settings” heading.
- Profile identity row with avatar, display name, username, and chevron.
- Compact rounded list of settings rows.
- Each row has a consistent outline icon, label, and right chevron.

**Reference rows**
1. Privacy & Security.
2. Notifications.
3. Appearance.
4. Currency (INR).
5. Help & Support.
6. About Scout.

**Behavior**
Every row must navigate to a real destination. Do not ship decorative, non-functional settings rows.

### 14 — Support / Help

**Composition**
- Back arrow.
- Centered headset/support icon.
- Heading: “Need help?”
- Short supporting description.
- Rounded list of options.

**Options**
- FAQs.
- Contact Support.
- Report a Bug.
- Terms & Conditions.

**Behavior**
- FAQ opens useful help content.
- Contact Support uses an approved real support route.
- Report a Bug opens a report form.
- Terms opens the legal document.
- Never invent support email addresses or contact details.

### 15 — Account Management

**Composition**
- “Account” heading.
- Rounded dark action group.
- Export Your Data row.
- Delete Account row with restrained destructive red styling.
- Separate Sign Out button.
- Small version label near the bottom.

**Behavior**
- Export creates a real user data export and explains its contents.
- Delete requires impact explanation, appropriate re-authentication, explicit confirmation, and clear completion status.
- Sign out invalidates the session, clears protected in-memory state, and returns to authentication.
- Account deletion and retention behavior must follow the privacy model.

---

## 5. Additional screens required by the full page map

The 15 reference screens are not permission to ignore the rest of the product. Implement additional screens with the same design language when their phase is approved:

- Welcome/product introduction.
- Username availability feedback.
- Remaining onboarding steps and completion.
- Password-reset completion.
- Transaction add/edit/detail/search/filter.
- Account list/detail/add/edit/archive.
- Budget create/edit/detail.
- Savings goal create/edit/detail/contributions.
- Recurring payments.
- Friend discovery and requests.
- Create post, audience selection, and preview.
- Post detail, comments, and replies.
- Sharing permissions and revocation.
- Notifications inbox and preferences.
- Privacy/security and active sessions.
- Appearance and currency settings.
- Data export status.
- Blocked users.
- Help articles and bug-report form.
- Sign-out confirmation and account deletion flow.
- Offline, loading, empty, error, session-expired, and restricted-account states.

Use `docs/PRODUCT_SPEC.md` as the canonical full page inventory. Do not implement every proposed feature in one release; respect the release sequence and approval gates.

---

## 6. Shared component system

Build reusable components rather than 15 isolated layouts.

### Foundation
- `ScreenContainer`
- `SafeScreen`
- `ScoutWordmark`
- `ScreenHeader`
- `SectionHeader`
- `PrimaryButton`
- `SecondaryButton`
- `TextButton`
- `IconButton`
- `Divider`
- `TextField`
- `PasswordField`
- `SelectField`
- `ProgressIndicator`
- `BottomNavigation`

### Finance
- `MoneyAmount`
- `BalanceSummary`
- `SpendingChart`
- `TransactionRow`
- `TransactionCard`
- `PendingReviewCard`
- `BudgetProgressCard`
- `CategoryBudgetRow`
- `SavingsGoalCard`
- `QuickActionButton`

### Social
- `UserAvatar`
- `UserIdentity`
- `FeedPostCard`
- `PostMedia`
- `PostActionBar`
- `FriendProfileHeader`
- `FriendRequestCard`
- `CommentRow`

### System
- `LoadingState`
- `EmptyState`
- `ErrorState`
- `OfflineBanner`
- `ConfirmationDialog`
- `BottomSheet`
- `Toast`
- `FormError`

Use the project's existing framework and conventions. Do not add a new UI framework or icon library without checking the current dependencies and obtaining approval where architecture changes are involved.

Shared components must expose variants for legitimate differences. Do not duplicate nearly identical components just to adjust one screen.

---

## 7. Navigation and flows

### Signed-out
- First launch → Welcome/Login.
- Login → email/password OR Google.
- Sign up → verification when required → onboarding.
- Forgot password → recovery request → reset completion → login.

### Authenticated
- Successful authentication → onboarding if incomplete, otherwise Home.
- Main tabs use the visual reference destinations: Home, Activity, Social, Budgets, Profile.
- Profile/More exposes Settings, Support, Account, and other documented destinations.
- Preserve deep links and session guards where applicable.

Mandatory authentication remains in force. No guest mode or protected-route bypass.

---

## 8. Responsive and Android requirements

The reference depicts iPhone-style mockups, but Scout's current target is Android-first.

- Reproduce the content composition and design language, not fake iOS system chrome.
- Use Android status/navigation bars and platform-safe areas correctly.
- Support different Android screen sizes and densities.
- Keep forms usable when the keyboard is open.
- Avoid content clipping and horizontal overflow.
- Scroll long pages naturally.
- Maintain accessible touch targets.
- Respect font scaling and screen readers.
- Verify on a real emulator/device size, not only a browser preview.

---

## 9. Functionality and state requirements

Every visible control must have a real behavior or an explicitly marked unavailable/development state.

Examples:
- Login authenticates.
- Sign up registers.
- Google sign-in starts the approved provider flow.
- Search searches.
- Filters filter.
- Add expense opens a form and persists the result.
- Approve confirms a pending record exactly once.
- Ignore changes its state and preserves recovery.
- New Goal creates a goal.
- Like updates reaction state.
- Comments open and persist through the approved backend.
- Settings rows navigate.
- Export produces a real export.
- Sign out ends the session.
- Delete Account runs the approved deletion flow.

Do not simulate a successful save, authentication, export, or financial operation if it did not happen. Use clearly labeled synthetic fixtures for development only.

---

## 10. Visual QA and completion gate

A screen is not complete merely because it compiles or looks vaguely similar.

### Required process

1. Implement one screen or coherent screen group.
2. Run typecheck, lint, and relevant tests.
3. Launch the app on an Android emulator/device.
4. Capture screenshots at the target viewport.
5. Compare the actual screenshots with the supplied reference.
6. Check alignment, margins, typography, field heights, button geometry, corner radii, icon placement, colors, and vertical rhythm.
7. Fix visible mismatches.
8. Repeat until the screen is acceptably faithful.
9. Test loading, empty, error, disabled, and interaction states.
10. Record any unavoidable differences and their reasons.

### Visual comparison checklist

- [ ] Background is the correct black.
- [ ] Text hierarchy and alignment match.
- [ ] Horizontal margins match.
- [ ] Vertical spacing and grouping match.
- [ ] Input dimensions, outlines, and corner radii match.
- [ ] Button size, fill, and label alignment match.
- [ ] Icon family, size, and stroke weight are consistent.
- [ ] Cards and media use the correct geometry.
- [ ] Bottom navigation proportions and active state match.
- [ ] No unintended color, gradient, shadow, or decoration has appeared.
- [ ] Android safe areas and keyboard behavior work.
- [ ] All visible controls work.
- [ ] No financial or social privacy rule is violated.

### Completion report

For each completed screen group, report:
- Screens implemented.
- Routes and interactions implemented.
- Tests/checks actually run and their results.
- Screenshot comparison performed.
- Known visual differences.
- Missing backend capabilities or blocked decisions.

Never claim “pixel perfect” unless the reference and rendered screenshots have actually been compared at a matching viewport. Never claim tests passed unless they were run.

---

## 11. Implementation order

Follow the approved build plan. Recommended UI order:

1. Shared tokens, typography, buttons, fields, screen shell, and navigation.
2. Login, sign-up, verification, recovery, and onboarding.
3. Home, transaction review, activity, and transaction forms.
4. Budgets and savings goals.
5. Social feed, friend profile, post creation, and privacy controls.
6. Settings, support, account management, and exceptional states.
7. Full visual QA and accessibility pass.

Do not build all screens as one giant component. Keep routes, components, state, and domain logic separated.

**Final instruction:** The supplied Scout reference is the visual target. Match it deliberately, consistently, and screen by screen. Do not get creative with an already approved design.


---

## 0A. OWNER'S EXPLICIT PIXEL-FIDELITY REQUIREMENT (HIGHEST VISUAL PRIORITY)

The owner has reconfirmed using the newly attached 1434 × 1536 PNG that this is the exact target appearance. This is not a mood board and not a loose style suggestion.

**Required fidelity:** screen by screen, control by control, line by line, colour by colour, cap height by cap height, margin by margin, radius by radius, and alignment by alignment. The owner expects the implementation to look as close to the supplied pixels as the platform and device allow.

Treat the supplied image as the visual ground truth. Do not use the phrase "inspired by" as a substitute for reproducing it.

### Absolute visual rules

- Reproduce all 15 phone screens in the same order and visual composition shown in the reference board.
- Match the black canvas, near-black surfaces, thin charcoal outlines, white primary text, muted grey secondary text, restrained green positive indicators, and the small Google multicolour mark exactly as visually shown.
- Match the actual proportions: phone frame content width, horizontal insets, top status-bar clearance, header positions, vertical rhythm, button heights, input heights, card dimensions, icon placement, bottom navigation height, and bottom safe-area clearance.
- Match text hierarchy and optical sizing, not merely nominal font sizes. Compare cap height, x-height, line height, weight, tracking, wrapping and baseline.
- Match corner radii and border thickness individually for fields, buttons, cards, avatars, icon containers, chips and progress tracks.
- Match the visible divider lengths, gaps, progress-bar fills, chart strokes, icon stroke weights and alignment.
- Match the exact visible labels, capitalization, punctuation, ordering and line breaks. Do not rewrite microcopy for stylistic preference.
- Do not add components, badges, cards, shadows, gradients, accent colours, illustrations or decorative elements absent from the reference.
- Do not remove any visible component because it seems redundant.
- Do not "improve" the design by making it more modern, more colourful, more spacious, more compact or more conventional.
- Keep the screenshot's visual density. Empty space is intentional and must not be filled.
- Do not substitute generic placeholder art for the headphone product image or other visual assets in the reference when the actual reference asset is available. If unavailable, use a clearly documented temporary asset and track replacement as a blocker.

### Reference screen order (left-to-right, top-to-bottom)

Row 1:
1. Welcome / Login
2. Sign Up
3. Email Verification
4. Profile Onboarding
5. Password Recovery

Row 2:
6. Home / Dashboard
7. Transaction Approval
8. Activity / Transactions
9. Budgets
10. Savings / Goals

Row 3:
11. Social Feed
12. Friend Profile
13. Settings
14. Support / Help
15. Account

Do not confuse the board's five-column arrangement with the app's runtime navigation. Each phone is an independent screen.

### Pixel measurement and implementation method

1. Preserve the original 1434 × 1536 image as the canonical reference. Do not resize, recompress, crop, sharpen, recolour or re-export the source before visual comparison.
2. Identify each phone viewport and crop the corresponding screen from the canonical image for comparison. Keep the crop coordinates documented in the visual QA report.
3. Implement each screen at the matching logical aspect ratio and compare at the same device pixel ratio. If the target Android device differs, compare both normalized viewport captures and actual device captures.
4. Derive spacing, dimensions, border widths, radii, colours and typography from the reference image using image inspection/measurement. Do not invent token values merely because they look plausible.
5. Build shared components only after measuring repeated elements. Reuse them without introducing per-screen visual drift.
6. Capture actual app screenshots, align them with the reference crops, and inspect overlays and difference images.
7. Fix the largest visual mismatches first, then repeat until all screens pass the visual acceptance checks.
8. Keep a per-screen checklist and record remaining differences. Never mark a screen "pixel-perfect" while known mismatches remain.

### Visual QA acceptance criteria

A screen is not complete merely because it renders or passes TypeScript.

For each of the 15 screens, verify and record:
- Outer content bounds and safe-area offsets.
- Header and title position.
- Every label's text, baseline, size, weight and line wrapping.
- Every input/button's dimensions, radius, border, fill and text alignment.
- Every card's dimensions, internal padding and spacing.
- Icon identity, dimensions, stroke weight and optical alignment.
- Divider position and length.
- Chart/progress geometry and stroke/fill.
- Bottom navigation geometry and selected state, where present.
- Scroll position and clipping at the reference viewport.
- Dark theme colours sampled from the original image.
- Screenshot overlay/difference review.

**No arbitrary "close enough" pass:** log each visible mismatch. If exact reproduction is blocked by font availability, Android system bars, platform-native controls, missing image assets or device density, document the specific limitation and reproduce the closest possible result without silently changing unrelated details.

### Platform fidelity

The reference artwork uses iPhone-style status bars, but the product is Android-first. Reproduce the app content precisely while using Android's genuine status/navigation bars and safe-area behavior. Do not draw fake iOS system chrome inside the Android app. This platform exception does not authorize changing the app's layout, typography, spacing or controls.

### Reference asset availability

The canonical source image was attached in the owner's conversation and is 1434 × 1536 pixels. A coding agent in a separate session cannot necessarily access that conversation attachment.

**Before starting pixel-accurate UI implementation, ensure the original PNG is committed to the repository at:**
`docs/reference/scout-15-screen-reference.png`

Do not create a substitute, screenshot of a screenshot, or reconstructed approximation and call it the original. If the file is absent, request that the owner add the original PNG at that exact path. The written specification remains binding, but image-based pixel comparison is blocked until the canonical asset is available.

