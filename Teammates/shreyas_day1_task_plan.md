# Shreyas — Day 1 Task Plan for PastPort India

## Role for Day 1

Shreyas is the **Frontend Co-lead** for PastPort India. On Day 1, he will support Priyansh with the technical setup, design the application structure, and prepare a simple frontend shell/wireframe for the final app.

The final product will have separate options for:

```text
View in 3D  -> normal interactive 3D monument viewer
View in AR  -> Siddhant’s camera-based AR module
Enter VR    -> optional WebXR/Cardboard immersive mode
```

Shreyas must make sure the frontend design keeps these three options separate and visible. He must not attempt to build Siddhant’s AR module or the VR engine on Day 1.

## Day 1 main objective

By the end of Day 1, Shreyas must provide a clear, mobile-first frontend structure that the technical team can build on:

```text
PastPort India Home
  -> Search/Explore Monuments
  -> Monument Detail Page
       -> View in 3D
       -> View in AR
       -> Enter VR
       -> History and Timeline
       -> Sources and Attribution
```

His priority is not advanced visual polish. His priority is **clear navigation, usable mobile layout, and a frontend structure that does not conflict with AR or VR development**.

## Exact tasks

### 1. Understand the existing project

Shreyas should first inspect the repository and identify:

- the frontend framework;
- the routing method;
- the existing page and component folders;
- the styling system;
- how assets are referenced; and
- whether a 3D viewer or AR/VR folder already exists.

He must not edit files while only inspecting the project.

### 2. Coordinate with Priyansh

Shreyas should meet Priyansh before coding and agree on:

| Decision | Required agreement |
|---|---|
| Product name | PastPort India |
| First monument | Taj Mahal, unless the team changes it together |
| Frontend framework | Existing project stack; do not introduce a new framework |
| Page structure | Home, Explore, Monument Detail, 3D, AR, VR, Story/Sources |
| Design direction | Heritage-inspired but modern, mobile-first |
| Integration rule | AR and VR are separate options using the same 3D model |
| Branch | `feature/shreyas-frontend` |

### 3. Create the frontend wireframe

Prepare a simple wireframe or low-fidelity design for these screens:

1. **Home:** PastPort India name, tagline, search/explore button, and a hero image or monument visual.
2. **Explore:** search box, monument card, location, period, and “Explore” button.
3. **Monument Detail:** present-day image, short description, and separate 3D, AR, and VR buttons.
4. **3D View:** model area, rotate/zoom instructions, hotspot area, and back button.
5. **AR View:** camera instructions, marker instructions, permission/error area, and fallback to 3D.
6. **VR View:** “Enter VR” button or unsupported-device message, plus normal 3D fallback.
7. **History/Sources:** timeline, short facts, source links, and AI-visualization disclaimer area.

The wireframe can be made in Figma, on paper and photographed, in a design tool, or as a simple HTML/React shell. The team does not need a high-fidelity design on Day 1.

### 4. Build only the initial frontend shell

If Priyansh has created the React project, Shreyas should implement only the approved frontend shell on his branch:

- top navigation or simple mobile header;
- home screen;
- search/explore area;
- monument card;
- monument detail placeholder;
- separate buttons for 3D, AR, and VR;
- empty placeholder states for AR and VR; and
- responsive layout for phone and desktop.

The AR and VR buttons should not pretend that those features already work. They may display a clear placeholder or route stub such as:

```text
AR module is being prepared.
Open 3D View instead.
```

### 5. Establish the design language

Use a heritage-inspired visual system that remains readable on a phone:

| Design item | Day 1 decision |
|---|---|
| Primary colour | Deep indigo or royal blue |
| Accent colour | Sandstone gold or copper |
| Background | Warm ivory or subtle parchment tone |
| Typography | Clear sans-serif for body text; decorative font only for headings if readable |
| Buttons | Large, high-contrast, easy to tap |
| Cards | Soft rounded corners and restrained shadows |
| Image style | Real monument reference images plus clearly labelled reconstructions |
| Motion | Minimal, fast transitions; no distracting animations |

Do not spend the whole day choosing colours. A consistent basic theme is enough.

## Files Shreyas may edit on Day 1

Use the project’s actual structure, but keep the work limited to frontend files owned by Shreyas. Likely allowed files are:

```text
client/src/pages/Home.tsx
client/src/pages/Explore.tsx
client/src/pages/MonumentDetail.tsx
client/src/components/MonumentCard.tsx
client/src/components/ExperienceButtons.tsx
client/src/components/AppHeader.tsx
client/src/styles or approved frontend styling files
```

If the project uses `src/` instead of `client/src/`, use the equivalent frontend paths.

He may create:

```text
client/src/features/frontend-shell/
client/src/data/ui-copy.ts
```

only after informing Priyansh and confirming that these folders do not conflict with the existing project.

## Files Shreyas must not edit

Without explicit approval from Priyansh, Shreyas must not modify:

```text
client/src/features/ar/*
client/src/features/vr/*
client/src/features/model-viewer/*
client/src/components/ARViewer.*
client/src/components/VRViewer.*
server/*
dizzle/*
shared/*
.env files
package.json
pnpm-lock.yaml
Siddhant’s AR branch or AR assets
```

He must not change Siddhant’s AR implementation, install AR packages, change the 3D model loader, change VR configuration, modify backend/database code, or rewrite global configuration to solve a frontend issue. If he needs a shared-file change, he must open an issue or ask Priyansh first.

## AI coding prompt for Shreyas

```text
We are beginners building PastPort India using the existing project stack.
I am responsible only for the frontend shell on Day 1.
First inspect the project structure and list the files you would change.
Modify only the approved frontend page/component files.
Do not modify any AR files, VR files, shared 3D/model files, server files,
database files, package.json, lock files, or .env files.
Create a mobile-first Home, Explore, and Monument Detail shell.
Show separate buttons for View in 3D, View in AR, and Enter VR.
For AR and VR, use placeholder states or callbacks; do not implement the
AR or VR engine. Explain every change in beginner-friendly language and
provide exact commands to run and test the result.
```

## AI prompt for frontend review

```text
Review only the frontend files I list below: [file paths].
Do not edit any files.
Check whether the layout works on a small phone, whether all buttons are
readable and tappable, whether there are dead-end screens, and whether the
3D, AR, and VR options are clearly separated.
Give a list of issues ordered by severity and suggest the smallest fix for
 each issue. Do not recommend new libraries unless absolutely necessary.
```

## Day 1 schedule

| Time | Task | Output |
|---|---|---|
| First 30 minutes | Meet Priyansh and inspect repository | Agreed file list and branch name |
| Next 45 minutes | Create `feature/shreyas-frontend` and run the existing app | Working local environment |
| Next 60 minutes | Create low-fidelity wireframe for Home, Explore, Detail, 3D, AR, and VR | Wireframe/screenshots |
| Next 90 minutes | Build Home, Explore, and monument-card shell with AI assistance | First frontend pull request draft |
| Next 45 minutes | Add separate 3D, AR, and VR buttons and placeholder states | Clear experience navigation |
| Next 30 minutes | Test mobile and desktop layouts | Screenshots and bug notes |
| Final 30 minutes | Review with Priyansh and Siddhant; ensure AR/VR boundaries are respected | Approved Day 1 frontend shell |

## Day 1 deliverables

Shreyas must finish with:

1. `feature/shreyas-frontend` branch.
2. A simple mobile-first wireframe.
3. Home, Explore, and Monument Detail frontend shell.
4. Separate buttons for 3D, AR, and VR.
5. Placeholder/fallback states for AR and VR.
6. No changes to Siddhant’s AR files.
7. No changes to VR, backend, database, package, or environment files.
8. A list of files changed.
9. Screenshots on a phone-sized viewport.
10. A pull request for Priyansh to review.

## Testing checklist

Before opening the pull request, Shreyas must verify:

- the app starts with the documented command;
- the home page loads without console errors;
- the search/explore area is readable;
- the monument card opens the detail screen;
- the 3D, AR, and VR options are visibly different;
- AR and VR placeholder screens provide a back or 3D fallback;
- no button leads to a dead end;
- the layout works at approximately 360px mobile width;
- the layout remains usable on desktop;
- images do not overflow their cards;
- text has sufficient contrast;
- buttons are large enough to tap; and
- the pull request file list contains only approved frontend files.

## Pull request format

```text
Title: feat(frontend): add PastPort India Day 1 shell

## Added
- Home screen
- Explore/search shell
- Monument card
- Monument detail placeholder
- Separate 3D, AR, and VR buttons
- AR/VR placeholder and fallback states

## Files changed
- [list every file]

## Testing
- Local run: passed/failed
- Mobile width: passed/failed
- Desktop width: passed/failed
- No console errors: passed/failed
- AR files changed: no
- VR files changed: no
- Backend/database files changed: no

## Review requested from
- Priyansh: integration and scope
- Siddhant: AR boundary check
```

## Definition of success

Shreyas’s Day 1 work is successful when a new user can open PastPort India, understand what the app does, see the Taj Mahal as the first monument, and clearly choose between **3D**, **AR**, and **VR** without confusion. Siddhant’s AR work remains isolated, the future VR option remains visible, and the frontend shell is ready for later integration.
