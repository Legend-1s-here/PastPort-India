# PastPort India — SIH26195 Seven-Day MVP Plan

## Project goal

Build a focused, mobile-first software prototype for **SIH26195 — Student Innovation: Heritage & Culture**. PastPort India will let users search for an Indian monument, view a historically inspired 3D reconstruction, explore source-backed history through hotspots and a timeline, and optionally experience the monument through phone-based AR, VR-ready 3D mode, and immersive media.

The entire team may use AI-assisted or “vibe coding,” but the team will not ask AI to build the whole application at once. AI will be used to generate small features, explain code, create content drafts, prepare test cases, improve UI, and help debug exact errors. Humans remain responsible for testing, historical accuracy, asset permissions, final decisions, and integration.

## Final MVP scope

### Core features that must work

1. A mobile-friendly PastPort India landing page.

1. Search by monument name using a curated local catalogue.

1. One polished flagship monument experience, preferably Taj Mahal.

1. A lightweight GLB/GLTF 3D monument viewer with rotate and zoom.

1. Four to six clickable historical hotspots.

1. A chronological history timeline.

1. A source and attribution panel for factual information.

1. English plus one additional language or narration sample, preferably Hindi or Marathi.

1. A normal 3D fallback that works even when AR/VR is unsupported.

### Features to add if the core is stable

1. Marker-based AR using a printed image target.

1. Optional VR-ready mode using WebXR or Cardboard-style split-screen view.

1. One curated YouTube 360 embed with attribution.

1. One 10–20 second AI-assisted historical visualization with a visible disclaimer.

1. PWA caching for the app shell, monument data, model, poster, and audio.

1. QR code that opens the public demo.

### Features explicitly excluded

Do not build a complete national monument database, live AI video generation, exact archaeological reconstruction, unrestricted markerless AR, a native Android/iOS app, arbitrary YouTube scraping or downloading, user-uploaded media, blockchain, complex authentication, multiplayer, or an advanced CMS.

## Recommended technology stack

| Layer | Technology | Use |
| --- | --- | --- |
| Application | React + TypeScript + Vite | Main web application |
| Styling | Tailwind CSS | Mobile-first responsive design |
| 3D | Three.js or React Three Fiber | GLB/GLTF viewer, camera controls, hotspots |
| AR | MindAR.js with Three.js/A-Frame | Printed-marker AR on a phone |
| VR | WebXR, only if supported | Optional immersive mode using the same 3D model |
| Content | Local JSON/TypeScript files | Monument, hotspots, timeline, sources, languages, media |
| Search | Fuse.js or simple local search | Search monument names and alternate names |
| Audio | Pre-recorded MP3 plus SpeechSynthesis fallback | Narration and multilingual support |
| YouTube | Official IFrame embed with curated video ID | Optional 360 video inside the app |
| Offline | PWA service worker + IndexedDB/localStorage | Cache core content and anonymous progress |
| Hosting | Vercel or Netlify over HTTPS | Public link, camera permission, service worker |
| Collaboration | GitHub | Branches, pull requests, review, backups |

## Team roles

| Member | Primary role | Secondary role | Final responsibility |
| --- | --- | --- | --- |
| **Priyansh** | Leader, product owner, AI-assisted integration, architecture | Web app and deployment | Final merge, scope control, public build, overall coordination |
| **Siddhant** | AR lead and technical lead | 3D model integration, AI coding | Working marker AR, 3D viewer, AR fallback, technical explanation |
| **Shreyas** | Frontend co-leader | UI/UX, responsive pages, 3D controls | Frontend integration, code review with Priyansh, second speaker |
| **Manmath** | Research lead | Historical verification and source ledger | Content accuracy, citations, cultural interpretation, third speaker |
| **Khushi** | Main speaker | Light frontend/backend learning and PPT work | Main story, user journey, slide narrative, selected UI contributions |
| **Tanaya** | PPT and research support | QA and content review | Presentation assets, research assistance, test checklist, demo backup verification |

## Team rules for beginners

The team will use one GitHub repository and one main branch. Each member creates a feature branch, asks AI for one small change, tests it locally, commits it, and opens a pull request. Priyansh and Shreyas review frontend/integration changes; Siddhant reviews AR/3D changes; Manmath reviews historical content; Tanaya checks user-facing quality.

The team should not copy code without understanding where it belongs. Every AI request must state the existing framework, target file, desired behaviour, constraints, and test command. When an error occurs, paste the exact error and the relevant file to AI. Do not ask AI to rewrite the entire project in response to one error.

At the end of each day, the team must keep one working build. Experimental AR/VR work stays on a separate branch until tested.

## AI-assisted coding workflow

Each feature follows this loop:

```
Define one small task
  -> Ask AI for a plan and files to edit
  -> Let AI implement only that task
  -> Run the app
  -> Test the feature
  -> Give AI the exact error if it fails
  -> Review and understand the change
  -> Commit and open a pull request
  -> Review and merge
```

Useful beginner prompt template:

```
We are building PastPort India using React, TypeScript, Vite, Tailwind CSS, and Three.js.
We are beginners. Implement only this feature: [feature].
Modify only these files: [files].
Do not add a backend or extra libraries unless necessary.
Explain the code in simple language.
Include loading, error, and fallback states.
Give the exact command to test it.
```

## Seven-day work plan

### Day 1 — Understand, freeze, and set up

**Goal:** Everyone understands the product, GitHub workflow, and exact MVP. The riskiest AR/3D technology is tested before serious UI work starts.

| Member | Work | Deliverable |
| --- | --- | --- |
| Priyansh | Create repository, project, branch rules, issue board, README, and initial deployment | Working React app on GitHub and public test URL |
| Siddhant | Test Three.js/R3F with one GLB model and test MindAR marker detection on the target Android phone | 3D/AR feasibility proof and screenshots |
| Shreyas | Co-design app navigation and mobile wireframes; create first landing-page shell | Home, search, detail, 3D, AR, and story wireframe |
| Manmath | Select flagship monument and collect authoritative sources, dates, architecture references, and image permissions | Research folder and source ledger |
| Khushi | Draft main user story, problem explanation, and first PPT structure; learn how to edit one frontend component | Problem slide and first demo narrative |
| Tanaya | Research cultural references and prepare a beginner QA checklist; help Khushi with PPT theme | Source notes, testing sheet, slide theme |

**Day 1 output:** The team must choose one monument, one language pair, one model, one AR approach, one YouTube policy, and one final product name. If AR cannot be proven on a phone, the team keeps AR as a recorded backup and prioritizes 3D.

### Day 2 — Build the application shell and monument catalogue

**Goal:** The user can open PastPort India, search a monument, and reach the monument page.

| Member | Work | Deliverable |
| --- | --- | --- |
| Priyansh | Set up routes, shared TypeScript types, data-loading pattern, error boundary, and deployment | Working routes and stable main branch |
| Siddhant | Prepare/optimize the GLB model, file size, scale, lights, and loading state | Reusable `ModelViewer` component |
| Shreyas | Build the landing page, search bar, monument cards, and responsive monument-detail layout | Frontend screens connected to local data |
| Manmath | Convert research into structured JSON: summary, timeline, hotspots, sources, and interpretation labels | Verified monument data file |
| Khushi | Write user-facing copy and help with one small UI section under Shreyas’s guidance | Approved welcome and onboarding text |
| Tanaya | Test search, routes, broken asset paths, small screens, and empty states | Day 2 bug list |

**Day 2 gate:** A user can search for Shaniwar Wada and open a readable monument page. No AR, VR, video, or live AI may block this flow.

### Day 3 — Build the historical learning experience

**Goal:** The product becomes more than a 3D model by adding reliable cultural information.

| Member | Work | Deliverable |
| --- | --- | --- |
| Priyansh | Merge stable branches, connect state between pages, and maintain deployment | Integrated build |
| Siddhant | Add model interaction, camera controls, hotspot positions, and focus-on-hotspot behaviour | Four to six working hotspots |
| Shreyas | Build hotspot panels, timeline, source drawer, buttons, loading states, and visual polish | Complete learning UI |
| Manmath | Verify every visible factual claim and attach source IDs; identify uncertain reconstruction claims | Fact-checked source-backed content |
| Khushi | Prepare narration script, knowledge-check wording, and history-story transitions; add one small approved UI improvement | Narration and quiz copy |
| Tanaya | Check readability, contrast, keyboard access, mobile touch targets, and content consistency | Usability report |

**Day 3 gate:** The 3D model, hotspots, timeline, and sources work without relying on external AI or YouTube.

### Day 4 — Add marker AR and multilingual/audio support

**Goal:** Demonstrate a real AR use case while protecting the normal 3D experience.

| Member | Work | Deliverable |
| --- | --- | --- |
| Priyansh | Add `/ar` route, camera permission states, error handling, and 3D fallback | AR route never creates a dead end |
| Siddhant | Integrate MindAR image target and attach the same GLB model to the printed marker | AR works on at least one tested phone |
| Shreyas | Design AR instructions, large buttons, hotspot labels, and language controls | Usable AR interface |
| Manmath | Validate Hindi/Marathi text or narration against research sources | Approved language content |
| Khushi | Record or organize narration and rehearse explaining AR versus VR; update PPT architecture slide | Narration assets and explanation |
| Tanaya | Test camera permission denial, target-not-found, phone orientation, unsupported browser, and language switching | AR test report and fallback decision |

**Day 4 gate:** If marker AR is not stable, freeze it as an optional feature and use the 3D viewer plus a recorded AR demonstration. Do not spend the remaining days chasing markerless AR.

### Day 5 — Add immersive media, offline shell, and presentation assets

**Goal:** Complete the feature set that strengthens the pitch without risking the core.

| Member | Work | Deliverable |
| --- | --- | --- |
| Priyansh | Add PWA manifest/service worker, cache core assets, prepare production build, and manage integration | Offline-ready public build |
| Siddhant | Prepare a short AI-assisted historical visualization; optionally test WebXR using the same model | Reviewed video and optional VR button |
| Shreyas | Build immersive-story page, YouTube embed card, attribution, poster fallback, and VR-ready UI state | Complete immersive-media UI |
| Manmath | Check all YouTube creator attribution, cultural claims, source links, and AI disclaimer wording | Media/source approval |
| Khushi | Create PPT slides with Tanaya and write the main speaking script | Draft presentation and transitions |
| Tanaya | Support PPT design, add research visuals, and test offline, YouTube failure, audio failure, and missing model states | Media/offline QA report |

**Day 5 gate:** YouTube or AI video failure must not break the monument page, 3D viewer, history, or hotspots. The team must have a complete end-to-end demo.

### Day 6 — Test, polish, and rehearse

**Goal:** Turn the prototype into a reliable demo.

| Member | Work | Deliverable |
| --- | --- | --- |
| Priyansh | Freeze scope, merge only stable pull requests, tag release candidate, and prepare rollback branch | Release candidate and backup build |
| Siddhant | Optimize model performance, AR stability, camera controls, and optional VR detection | Stable immersive interaction |
| Shreyas | Perform final frontend polish: spacing, typography, icons, animations, error states, and mobile layout | Final UI pass |
| Manmath | Complete fact/citation audit and prepare answers about heritage authenticity | Final source list and accuracy notes |
| Khushi | Rehearse the main pitch with a timer and practice opening/closing | Main speaker script |
| Tanaya | Run full Android and desktop test matrix; record backup screen video and check PPT | Pass/fail report and backup demo |

**Day 6 gate:** The complete three-minute demo must work twice consecutively on the public URL. Hide any unstable feature rather than demonstrating it live.

### Day 7 — Finalize, rehearse, and prepare submission

**Goal:** Submit and present a coherent, reliable MVP.

| Time | Activity | Owner |
| --- | --- | --- |
| Morning | Freeze code, content, media, sources, links, and screenshots | Priyansh + all |
| Morning | Verify QR code, HTTPS URL, camera permission, model loading, and backup video | Tanaya + Siddhant |
| Late morning | Check source attribution, AI-visualization label, and media permissions | Manmath |
| Afternoon | Finalize PPT design and speaker notes | Khushi + Tanaya |
| Afternoon | Full rehearsal: problem, solution, live demo, architecture, impact, limitations | Khushi leads; all answer questions |
| Evening | Package README, demo link, screenshots, PPT, backup recording, and team details | Priyansh |

**Day 7 rule:** Do not add new features. Only merge a bug fix that has been tested and reviewed.

## Three-minute demo script

| Time | Demonstration | Speaker |
| --- | --- | --- |
| 0:00–0:25 | Explain the difficulty of experiencing and understanding India’s heritage through static information | Khushi |
| 0:25–0:45 | Search for Shaniwar Wada and open its monument page | Shreyas |
| 0:45–1:25 | Rotate the 3D reconstruction and open two or three historical hotspots | Siddhant |
| 1:25–1:50 | Show timeline, source panel, and language/audio option | Manmath |
| 1:50–2:15 | Demonstrate marker AR or play the recorded AR backup | Siddhant + Shreyas |
| 2:15–2:35 | Show immersive story, AI-assisted visualization disclaimer, and optional YouTube 360 embed | Khushi + Tanaya |
| 2:35–3:00 | Explain offline readiness, fallback design, scalability, and cultural impact | Priyansh |

## Testing checklist

The app is ready when the following tests pass:

| Test | Expected result |
| --- | --- |
| Search monument | Shaniwar Wada appears quickly and opens correctly |
| 3D model | Model loads, rotates, zooms, and has a fallback state |
| Hotspot | Panel shows concise fact, source, and correct location |
| Timeline | Events appear in chronological order |
| AR permission denied | The app explains the issue and offers normal 3D view |
| AR target missing | Instructions appear; the page does not freeze |
| VR unsupported | Normal 3D view continues to work |
| YouTube unavailable | Poster/attribution/fallback appears |
| Offline after first load | Cached app, data, model, and local audio open |
| Language switch | Approved language text/audio works or falls back cleanly |
| Phone layout | All controls are readable and tappable |
| Source review | Every factual claim has a source or interpretation label |

## Fallback priority

When time is lost, remove features in this order:

1. Multiple monuments.

1. Markerless AR.

1. Live voice search.

1. Cardboard/WebXR VR mode.

1. YouTube 360 embed.

1. AI-generated video.

1. Extra quizzes and animations.

Never remove the core flow: **search → monument page → 3D model → hotspots → timeline → sources**.

## AI and historical-accuracy policy

Use AI to draft code, UI, test cases, narration, and translations, but a human must verify each result. Use reliable institutional, museum, archaeological, academic, or official tourism sources for historical claims. Label AI-generated visuals as:

> **AI-assisted historical visualization — artistic interpretation, not archival footage.**

Do not claim that the AI video or 3D model is an exact reconstruction. Do not download or rehost third-party YouTube videos. Use only curated official embeds with attribution and keep external media optional.

## Final definition of success

PastPort India succeeds as a Round 1 MVP if a judge can understand the idea within 30 seconds, search for one monument, interact with a stable 3D model, learn from source-backed hotspots, see a working AR attempt or backup, understand how VR could extend the experience, and clearly distinguish verified history from AI-assisted interpretation.

