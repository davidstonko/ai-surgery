---
layout: default
title: Claude Skills
nav: skills
description: Claude skills built for academic surgery, free to download and use.
---
# Claude Skills

<p class="lede">Skills I built for Claude to handle recurring academic work. Free to download and adapt.</p>

<div class="prose" markdown="1">

## Hopkins CV (jhsomCV)

Converts any CV into the Word format that the Advisory Board of the Medical Faculty (ABMF) mandates for appointment and promotion at the Johns Hopkins University School of Medicine. It restructures the CV into the full I to XII ABMF sections, verifies every publication against PubMed and classifies it by PubMed's own publication type, and reports discrepancies (authorship mismatches, duplicates, indexed papers missing from the CV) instead of silently fixing them. Ask Claude to "put my CV in the Hopkins promotions format." Check the ABMF rules against the version the committee is currently using before you submit.

**[Download jhsomcv.zip](jhsomcv.zip)** &middot; [Source on GitHub](https://github.com/davidstonko/jhsomcv)

## JH Surgery Format

A formatting skill for the Johns Hopkins Department of Surgery (The Johns Hopkins Hospital and Johns Hopkins Bayview). Tell Claude what you are presenting and it builds a branded rough draft you finish yourself: grand rounds and podium decks, conference posters sized to the meeting's spec, journal club, case conferences, abstracts, and letters on department letterhead. It never touches patient information; case-based drafts use bracketed placeholders you fill in on a hospital computer. Type `/jhsurgeryformat` once installed.

**[Download jhsurgeryformat.zip](https://github.com/davidstonko/jh-surgery-format/raw/main/jhsurgeryformat.zip)** &middot; [Source on GitHub](https://github.com/davidstonko/jh-surgery-format)

No install needed for a one-off: download [JH-Surgery-Format.md](https://github.com/davidstonko/jh-surgery-format/raw/main/JH-Surgery-Format.md) and attach it to a Claude chat.

## Suggest a skill

Know of a Claude skill that might be important to surgeons or physicians, or one you built yourself? **[Suggest a skill](../submit.html)** with a link and a few lines on what it does. If it is useful, I will add it here and credit you.

## How to install a skill

1. In Claude, turn on code execution: **Settings > Capabilities** (Team and Enterprise plans: your admin enables it under Organization settings).
2. Go to **Customize > Skills**, click **+**, choose **Create skill**, then **Upload a skill**, and select the ZIP file. Don't unzip it first.
3. Start a new chat and ask for the task. Claude uses the skill when the request matches.

More of my code, including research tools, is on [GitHub](https://github.com/davidstonko).

Skills work on Free, Pro, Max, Team and Enterprise plans. See Anthropic's [guide to using skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude) for details.

</div>
