# Manmath — Day 1 Research Plan for PastPort India

## Role for Day 1

Manmath is the **Research Lead and future third speaker** for PastPort India. His Day 1 responsibility is to prepare a reliable, source-backed Taj Mahal content pack that the technical and presentation teams can safely use in the MVP.

He is not expected to code on Day 1. His most valuable contribution is to prevent historical errors, unsupported claims, weak references, and misleading AI-generated reconstructions.

## Main objective

Prepare a concise and verified research package for the Taj Mahal that supports these app sections:

```text
Taj Mahal overview
  -> Historical timeline
  -> Architecture and important features
  -> Cultural significance
  -> Present-day visitor context
  -> 4–6 interactive 3D/AR hotspots
  -> Short narration
  -> Quiz/learning facts
  -> Sources and attribution
```

The research must help the final app present a clear difference between:

- **Verified historical information**;
- **Present-day visual evidence**;
- **Historically inspired reconstruction**; and
- **AI-assisted artistic visualization**.

## Day 1 exact tasks

### 1. Confirm the content scope

Manmath should agree with Priyansh and Shreyas on the exact content required for the first MVP:

| Content area | Target for Day 1 |
|---|---|
| Flagship monument | Taj Mahal |
| Historical period | Mughal period and construction context |
| Timeline | 5–7 reliable events |
| Architecture | 4–6 features suitable for hotspots |
| Cultural context | 3–4 concise points |
| Languages | English first; Hindi/Marathi content can be prepared later |
| Narration | 60–90 second factual script |
| Quiz | 3–5 questions based only on verified facts |
| AI visualization | One disclaimer and approved scene description |

Do not expand the first day into research on every Indian monument.

### 2. Collect authoritative sources

Prioritize sources in this order:

1. Archaeological Survey of India or other official government sources.
2. UNESCO or official heritage institution pages.
3. Official tourism or museum sources.
4. Reputable university, academic, or museum publications.
5. High-quality books or research papers.
6. General websites only for discovery, never as the only source for important claims.

For every source, record the title, organization/author, URL, date accessed, and the exact claim it supports.

### 3. Create the source ledger

Create a document named:

```text
content/research/taj-mahal-source-ledger.md
```

If the repository does not yet have a content folder, Manmath should create the research document in a separate branch or shared research folder after informing Priyansh. He must not change application code to add research.

Use this format:

```markdown
## Source ID: TM-001

- Title:
- Organization/author:
- URL:
- Date accessed:
- Supports:
- Exact fact used in the app:
- Confidence: High / Medium / Needs review
- Copyright or usage note:
```

Every visible fact in the app should later reference one or more source IDs such as `TM-001`.

### 4. Prepare the historical timeline

Prepare five to seven concise timeline events. Each event should contain:

```text
id
approximate date or period
short title
one-sentence description
sourceIds[]
confidence
```

Avoid overloading the timeline with disputed dates or unsupported anecdotes. If a date or story is uncertain, mark it as **Needs review** and do not give it to the technical team as final content.

### 5. Select AR/3D hotspots

Select four to six features that can be shown on a 3D model. The hotspot list should be understandable to a school student or general visitor.

For every hotspot, provide:

| Field | Example requirement |
|---|---|
| ID | `main-dome` |
| Display title | Short and readable |
| Location | Front courtyard, dome, gate, minaret, etc. |
| Explanation | 40–70 words maximum |
| Source IDs | At least one source |
| Visual requirement | What the model should highlight |
| Confidence | High/Medium/Needs review |

Do not require the model to show a feature that cannot be represented accurately with the available asset. Coordinate with Siddhant if a hotspot location is unclear.

### 6. Write the narration script

Prepare a 60–90 second script in simple English for the first demo. The script should explain:

- what the Taj Mahal is;
- why it is culturally significant;
- what the user is seeing in the 3D/AR experience; and
- which parts are verified versus historically inspired.

Do not write exaggerated claims such as “the AI shows exactly how the monument looked in the past.”

### 7. Prepare quiz questions

Write three to five multiple-choice questions. Each answer must be directly supported by a source ID. Include the correct answer and a one-sentence explanation.

```text
Question:
Options:
Correct answer:
Explanation:
Source IDs:
```

### 8. Prepare AI-visualization guidance

Write a short scene brief for the optional AI-assisted video or image. Clearly define it as an artistic interpretation. Include this label in the content notes:

> **AI-assisted historical visualization — artistic interpretation, not archival footage.**

The scene brief should avoid precise claims that the AI cannot prove. For example, it can describe a historically inspired courtyard atmosphere, but it must not claim that generated people, clothing, or architecture are exact archival representations.

## Day 1 deliverables

Manmath must deliver the following by the end of Day 1:

1. Taj Mahal source ledger with at least five strong sources.
2. Five to seven timeline events.
3. Four to six proposed 3D/AR hotspots.
4. Short monument overview for the home/detail page.
5. Three to five verified quiz questions.
6. A 60–90 second narration script.
7. Cultural significance notes.
8. A list of uncertain or disputed claims to exclude.
9. AI-visualization disclaimer and scene brief.
10. A two-minute verbal explanation for the third-speaker segment.

## File and coding boundaries

Manmath should work on a separate branch named:

```text
feature/manmath-research
```

He should create or edit only research/content documentation files approved by Priyansh, such as:

```text
content/research/taj-mahal-source-ledger.md
content/research/taj-mahal-facts.md
content/research/taj-mahal-timeline.md
content/research/taj-mahal-hotspots.md
content/research/taj-mahal-quiz.md
content/research/taj-mahal-narration.md
```

He must not edit:

```text
client/src/features/ar/*
client/src/features/vr/*
client/src/features/model-viewer/*
client/src/pages/*
client/src/components/*
server/*
dizzle/*
shared/*
package.json
pnpm-lock.yaml
.env files
```

He should not directly insert historical text into React components. He should provide structured content and source IDs to Priyansh and Shreyas, who will integrate it into the app.

If the existing repository has no research/content folder, he should keep the research in a separate document and ask Priyansh where it should be placed. He must not reorganize the repository by himself.

## AI prompts for Manmath

### Research discovery prompt

```text
I am researching the Taj Mahal for a student innovation project called PastPort India.
Find authoritative sources from government, UNESCO, museum, archaeological,
university, or official tourism organizations.
For each claim, provide the source title, organization, URL, and the exact
claim supported. Separate verified facts from popular but unsupported stories.
Do not invent facts, dates, quotations, architectural details, or citations.
Keep the language understandable for school students and general visitors.
```

### Fact-checking prompt

```text
Review the following Taj Mahal fact list.
For each statement, classify it as Verified, Needs stronger source, Disputed,
or Remove. Do not rewrite a weak claim as if it were true.
Return the source needed for each Verified claim and explain uncertainty simply.
Use only the sources provided below.
[Paste source ledger and facts]
```

### App-content prompt

```text
Convert the verified Taj Mahal facts below into structured content for a
heritage-learning web app. Create a timeline, four to six 3D/AR hotspots,
three quiz questions, and a 60–90 second narration.
Do not add any fact that is not present in the source notes.
Attach source IDs to every item. Keep each hotspot explanation under 70 words.
Clearly label any historical reconstruction as interpretation.
```

### Translation prompt

```text
Translate only the verified Taj Mahal content below into simple Hindi.
Preserve names, dates, numbers, and source IDs exactly.
Do not add cultural claims or change the historical meaning.
Return English and Hindi side by side for human review.
```

## Coordination with the team

| Person | What Manmath gives them | When |
|---|---|---|
| Priyansh | Source ledger, content structure, uncertain-claims list | End of Day 1 |
| Siddhant | Hotspot titles, positions/descriptions, visual requirements | After model inspection |
| Shreyas | Short descriptions, UI labels, timeline text, source drawer content | End of Day 1 or Day 2 |
| Khushi | Problem/solution story, narration, cultural-impact points | During PPT preparation |
| Tanaya | Source links, image/asset permissions, claims to verify | During slide and QA review |

## Day 1 schedule

| Time | Task |
|---|---|
| First 30 minutes | Confirm Taj Mahal as the flagship monument and agree on content scope |
| Next 90 minutes | Locate and record authoritative sources |
| Next 60 minutes | Prepare timeline and cultural significance notes |
| Next 60 minutes | Select AR/3D hotspots and write short explanations |
| Next 45 minutes | Write narration and quiz questions |
| Final 30 minutes | Review claims with Khushi/Tanaya for PPT and share the pack with Priyansh/Shreyas/Siddhant |

## Quality rules

Manmath must not use AI-generated text without checking it against a source. He must not copy long passages from websites into the app. He should paraphrase in original, simple language and keep source links for attribution.

He must not use AI-generated images or videos as historical evidence. Any AI-assisted visual must be labelled as an artistic interpretation. If the team cannot verify a claim, the claim should be omitted from the MVP rather than presented confidently.

## Definition of success

Manmath’s Day 1 work is successful when the technical team can build the monument page and AR/3D hotspots without guessing historical facts, Khushi and Tanaya can create accurate PPT slides, and the final speaker can explain the heritage value of PastPort India with clear source support and honest reconstruction disclaimers.
