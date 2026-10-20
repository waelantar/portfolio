# PF-006 theme and motion review

**State:** local implementation complete on the PF-006 branch. The page is still a scaffold and is not a published site.

## Visual system

The same semantic markup serves both themes. The dark palette uses ink `#0B0D11`, warm text `#F7F5F0` and orange `#FF7A33`. The light palette uses paper `#F7F5F0`, ink `#17191F` and deep orange `#B8400D`. The header, route, portrait frame and action remain in the same positions. The theme button follows the system preference initially and saves an explicit choice in local storage. A small self-hosted script applies a saved choice before page paint. With JavaScript unavailable, CSS still follows the system preference and all text and links remain in the HTML.

## Initial contrast measurements

Ratios use the WCAG relative-luminance formula on source tokens; rendered component and assistive-technology review remains part of the later full-page gate.

| Pair | Dark | Light |
| --- | ---: | ---: |
| Primary text / page | 17.85:1 | 16.13:1 |
| Muted text / page | 11.10:1 | 8.04:1 |
| Accent text / page | 7.49:1 | 5.10:1 |
| Primary action text / fill | 7.49:1 | 5.56:1 |
| Border / page | 3.18:1 | 4.33:1 |

## Interaction and layout checks

- The selected route draws once in 0.9 seconds. No idle loop, parallax, autoplay or scroll lock exists. Hover and focus responses use a 0.2–0.22 second transition.
- At a simulated 320-pixel viewport, the document scroll width stayed 320 pixels; the theme button and heading stayed inside the viewport. A 390-pixel mobile view and 1440-pixel desktop view were visually inspected in both theme directions.
- The theme button's 44-pixel height and action-oriented accessible name were inspected. Mouse activation and keyboard Enter changed the theme and stored preference. Keyboard focus used a visible solid outline.
- With reduced motion emulated, the route animation was `none`, link and button transition durations were `0s`, and the heading remained visible.
- With browser script execution disabled, the accessibility tree still exposed the heading, approved professional scope, public source link and portrait placeholder. The current noindex flag remains until the complete approved evidence pages pass release review.

The abstract portrait is still a placeholder at the same reviewed path. PF-008 will add the complete proof and contact journey.