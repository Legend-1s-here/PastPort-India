# PastPort India — Confirmed Day 1 Allocation

## Day 1 objective

By the end of Day 1, the technical team must have a working project repository and a basic 3D/AR feasibility result. The research and presentation teams must have enough verified material to support the first PPT and the product story.

The final product remains an app with both **AR and VR options**. Day 1 does not require a complete VR implementation, but the technical team must avoid decisions that block a future VR mode. AR and VR should use the same GLB/GLTF monument model wherever possible.

## Confirmed work split

| Member | Day 1 responsibility | End-of-day deliverable |
|---|---|---|
| **Priyansh** | Lead technical setup. Create the GitHub repository, React project, branch rules, issue board, README, and first deployment. Coordinate Siddhant and Shreyas. | Working repository, initial React app, public test URL, and task board |
| **Siddhant** | Lead AR work. Test MindAR/image-target AR and Three.js/R3F with a placeholder object, then test the approved monument model if time permits. Keep AR work isolated. | AR feasibility proof, phone screenshots/recording, and list of files required for the AR module |
| **Shreyas** | Co-lead technical work. Inspect the frontend structure, support Priyansh with setup, create the mobile navigation/wireframe, and prepare the first frontend shell without blocking the AR experiment. | Technical setup notes plus wireframes for Home, Search, Monument, 3D, AR, and VR options |
| **Manmath** | Research the **Taj Mahal**. Collect authoritative history, period, architecture, cultural context, present-day facts, image references, and source links. | Taj Mahal research folder and source ledger with URLs and notes |
| **Khushi** | Lead PPT work with Tanaya. Draft the problem, proposed solution, target users, user journey, expected impact, and speaker storyline. Do only light technical familiarization. | First PPT structure and main speaking narrative |
| **Tanaya** | Support Khushi with PPT design, visual consistency, research visuals, and basic source checking. | Slide theme, first visual direction, and PPT checklist |

## Technical boundaries for Day 1

Siddhant must work only in a separate branch:

```text
feature/siddhant-ar
```

His AR work should be isolated in a feature folder such as:

```text
client/src/features/ar/
```

He must not edit `App.tsx`, `main.tsx`, global CSS, page files, shared VR files, the normal 3D viewer, server files, database files, `package.json`, lock files, or environment files without explicit approval from Priyansh. If a dependency or shared-file change is required, he should create an issue or message Priyansh with the exact reason instead of editing it directly.

Priyansh and Shreyas should not rewrite Siddhant’s AR files while he is testing. They may review the code and suggest changes. The AR feature will later be connected to the app by the integration owner after Siddhant’s pull request is reviewed.

## Day 1 technical checklist

1. Create the repository and invite all required collaborators.
2. Protect `main` with a pull-request rule if possible.
3. Create the branches `feature/siddhant-ar` and `feature/shreyas-frontend`.
4. Select React + TypeScript + Vite + Tailwind + Three.js/R3F as the baseline.
5. Confirm that the project can run locally and deploy over HTTPS.
6. Confirm that a simple GLB/GLTF model can load in a normal 3D viewer.
7. Confirm whether marker-based AR can detect a printed image target on Siddhant’s Android phone.
8. Record the phone, browser, library, model, target image, and result.
9. Keep the VR option visible in the planned navigation, but implement only a placeholder or capability-detection state on Day 1.

## AI prompts for Day 1

### Priyansh prompt

```text
We are beginners building PastPort India using React, TypeScript, Vite,
Tailwind CSS, Three.js, and an eventual AR + VR experience.
First inspect the project structure and explain it simply.
Create only the base app setup, README, and safe development workflow.
Do not add a backend, authentication, database, or unrelated libraries.
List every file you will change before making changes.
Give exact run, test, and deployment commands.
```

### Siddhant prompt

```text
We are building PastPort India with React and TypeScript.
I own only the AR module. Create or modify files only inside:
client/src/features/ar/
Do not edit App.tsx, main.tsx, index.css, pages, shared 3D files, VR files,
server files, database files, package.json, lock files, or .env files.
Use MindAR image-target AR if it is already installed.
Start with a placeholder cube and include camera-permission, loading,
target-not-found, unsupported-browser, error, exit, and 3D-fallback states.
First list the files you will touch. Explain the code simply and provide
manual Android testing steps. The final app must have separate AR and VR
options using the same GLB/GLTF model, so do not replace or redesign VR.
```

### Shreyas prompt

```text
We are building PastPort India using React, TypeScript, Vite, Tailwind,
and Three.js. I own the frontend shell and wireframes.
Do not edit Siddhant’s AR folder or the future VR folder.
Create only the mobile-first Home/Search/Monument navigation shell.
Do not add a backend or change package versions.
Show separate buttons for View in 3D, View in AR, and Enter VR.
List all files before editing and explain the changes for beginners.
```

## Day 1 meeting checkpoints

| Time | Checkpoint | Participants |
|---|---|---|
| Start | Confirm the flagship monument is Taj Mahal and freeze the MVP flow | All |
| After setup | Confirm repository, branches, access, and local run command | Priyansh, Shreyas, Siddhant |
| Midday | Review Taj Mahal source list and reject weak/unsourced claims | Manmath, Khushi, Tanaya |
| Afternoon | Demonstrate normal 3D model loading and AR experiment | Priyansh, Siddhant, Shreyas |
| End | Review PPT outline, technical risks, and Day 2 tasks | All |

## Day 1 success criteria

Day 1 is complete when:

- the repository runs on each technical member’s computer;
- `main` is protected or the team has agreed to enforce pull requests manually;
- Siddhant has a separate AR branch and an AR feasibility result or documented blocker;
- Shreyas has the frontend navigation/wireframe with separate 3D, AR, and VR options;
- Manmath has a source-backed Taj Mahal research pack;
- Khushi and Tanaya have the first PPT structure and visual style; and
- the team has a working build, a backup branch, and no unclear ownership.

## Day 1 fallback rule

If AR does not work by the end of Day 1, do not install several libraries or rewrite the application. Keep the AR route as an optional feature, record the failure, and continue with the normal 3D viewer. The final app can still contain both AR and VR options through a stable AR attempt, a clear fallback, and a VR-ready interface using the same monument model.
