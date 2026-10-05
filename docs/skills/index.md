---
layout: default
title: Claude Skills
nav: skills
description: Claude skills built for academic surgery, free to download and use.
---
# Claude Skills

<p class="lede">Skills I built for Claude to handle recurring academic work, plus a few by others that I use. All free.</p>

<div class="prose" markdown="1">

## Hopkins CV (jhsomCV)

Converts any CV into the Word format that the Advisory Board of the Medical Faculty (ABMF) mandates for appointment and promotion at the Johns Hopkins University School of Medicine. It restructures the CV into the full I to XII ABMF sections, verifies every publication against PubMed and classifies it by PubMed's own publication type, and reports discrepancies (authorship mismatches, duplicates, indexed papers missing from the CV) instead of silently fixing them. Ask Claude to "put my CV in the Hopkins promotions format." Check the ABMF rules against the version the committee is currently using before you submit.

**[Download jhsomcv.zip](jhsomcv.zip)** &middot; [Source on GitHub](https://github.com/davidstonko/jhsomcv)

## JH Surgery Format

Takes the science, letter or talk you already have and formats it into a rough draft with Hopkins and Department of Surgery branding, following the [published brand standards](https://brand.hopkinsmedicine.org/brand/design-standards) and the surgery templates the department already uses. It does not do any science. It builds grand rounds and podium decks, conference posters sized to the meeting's spec, journal club, case conferences, abstracts, and letters on department letterhead, for The Johns Hopkins Hospital and Johns Hopkins Bayview. It handles logo resolution behind the scenes, so the logo is not grainy when you print the poster at FedEx. Case-based drafts use bracketed placeholders you fill in on a hospital computer.

**[Download jhsurgeryformat.zip](https://github.com/davidstonko/jh-surgery-format/raw/main/jhsurgeryformat.zip)** &middot; [Source on GitHub](https://github.com/davidstonko/jh-surgery-format)

Installed, you type `/jhsurgeryformat` in any chat, answer two or three questions, and get back a real PowerPoint or Word file with the Hopkins logos embedded and clearly marked blanks where your content goes. To skip the install, paste this into Claude instead:

```
Fetch https://raw.githubusercontent.com/davidstonko/jh-surgery-format/main/JH-Surgery-Format.md and follow it as my formatting skill.
```

### Three things to try with your own files

Each prompt works with or without the skill installed (on the free plan, do step 1 of the install steps below first).

1. **A letter on letterhead.** Attach a recommendation letter you already wrote in Word:
   ```
   Put this letter on department letterhead using the /jhsurgeryformat skill (if it isn't installed, fetch and follow https://raw.githubusercontent.com/davidstonko/jh-surgery-format/main/JH-Surgery-Format.md).
   ```
   It asks whether you want personalized or general letterhead, matches the official JHM stationery standards, and tells you how to print it.
2. **A poster from an accepted abstract.** Attach the Word file of the abstract you submitted:
   ```
   Build an ACS Clinical Congress poster draft from this abstract using the /jhsurgeryformat skill (if it isn't installed, fetch and follow https://raw.githubusercontent.com/davidstonko/jh-surgery-format/main/JH-Surgery-Format.md).
   ```
   It looks up the meeting's size requirements itself and gives you a rough draft to finish in PowerPoint.
3. **A talk from a prior institution.** Attach the old deck:
   ```
   I built this presentation when I was at my prior institution, but now I am at JHH; strip the old branding and convert the whole thing to Hopkins format using the /jhsurgeryformat skill (if it isn't installed, fetch and follow https://raw.githubusercontent.com/davidstonko/jh-surgery-format/main/JH-Surgery-Format.md), without changing any content.
   ```

### Why a skill beats prompting from scratch

An installed skill costs one line of context until you call it, and because its text is identical every session it is served from the model's prompt cache instead of being reprocessed. House colors, slide geometry, logo rules and per-format structures are already worked out, so drafts converge in one or two turns instead of a long revision cycle. Attaching an old deck as a style example costs 10 to 100 times more tokens every time. And because the brand standards are built in, the lazy path and the correct path are the same path.

## Skills by others

These were not built by me. Each links to its authors' own page.

### Academic Humanizer

One of my favorite skills. It edits AI-assisted papers, rebuttals and grant proposals (including NIH Specific Aims and NSF summaries) so they read clearly and sound like you. It removes the usual AI tells: "In recent years" openers, inflated phrasing, run-on sentences. It also checks that no claim is stronger than its evidence. It never changes a number, result or citation. If you give it a few of your own published papers, it matches your voice. It lists every proposed change before making any edits. It is an editing aid, not a way around AI disclosure rules, so follow your journal's policy.

Built by [MorphMind](https://github.com/AIScientists-Dev) (AIScientists-Dev on GitHub), building on [humanizer](https://github.com/blader/humanizer) by blader. MIT license.

**[Academic Humanizer on GitHub](https://github.com/AIScientists-Dev/academic-humanizer)**

To use it without installing, paste this into Claude with your draft attached:

```
Fetch https://raw.githubusercontent.com/AIScientists-Dev/academic-humanizer/main/SKILL.md and follow it to edit the attached draft.
```

### For figures

- **[tufte-viz](https://github.com/aparente/claude-skills/tree/master/skills/tufte-viz)**, [Angelica Parente](https://github.com/aparente). Teaches Claude Edward Tufte's rules for charts: maximize data ink, drop chartjunk, keep the graphic honest, use small multiples. Use it to plan a figure or to critique one you already made. Part of her [claude-skills](https://github.com/aparente/claude-skills) collection, which also has a design-thinking facilitator. MIT license.
- **[cnsplots](https://github.com/faridrashidi/cnsplots)**, [Farid Rashidi](https://farid.one/). A Python plotting library for figures styled to Cell, Nature and Science requirements, with more than 25 plot types including Kaplan-Meier curves, ROC curves and forest plots, and SVG files that stay editable in Illustrator. It ships with its own Claude Code skill: after `pip install cnsplots`, run `cnsplots skill install`, then type `/cnsplots`. [Documentation and examples](https://cnsplots.farid.one/). BSD license.

### From elsewhere at Hopkins

- **[Academic AI Library Workshop](https://jhu-sheridan-libraries.github.io/academic-ai-library-workshop/)**, Steven J. Miklovic, Sheridan Libraries. A free, self-paced course on using Claude for research work. It covers checking an AI-generated literature scan before you trust it, synthesizing evidence without hiding gaps, and writing a skill of your own. Written for library staff, no programming needed, and useful for anyone doing literature reviews.

## Suggest a skill

Know of a Claude skill that might be important to surgeons or physicians, or one you built yourself? **[Suggest a skill](../submit.html)** with a link and a few lines on what it does. If it is useful, I will add it here and credit you.

## How to install a skill

1. In Claude, turn on code execution: **Settings > Capabilities** (Team and Enterprise plans: your admin enables it under Organization settings).
2. Go to **Customize > Skills**, click **+**, choose **Create skill**, then **Upload a skill**, and select the ZIP file. Don't unzip it first; if your browser unzipped it automatically, right-click the folder and choose Compress to get the ZIP back.
3. Start a new chat and ask for the task. Claude uses the skill when the request matches.

Claude works in a browser; the desktop app is optional, and the free plan is enough to try these. Never give Claude or any online AI patient information.

More of my code, including research tools, is on [GitHub](https://github.com/davidstonko).

Skills work on Free, Pro, Max, Team and Enterprise plans. See Anthropic's [guide to using skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude) for details.

</div>
