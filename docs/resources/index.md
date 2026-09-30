---
layout: default
title: Resources
nav: resources
description: Johns Hopkins AI tools and policies, where to start reading on AI in surgery, how the models work, and what to follow to keep up.
head_title: "AI Resources for Surgeons | LocalMinimum.us"
---
# Resources

<p class="lede">The links worth keeping close.</p>

<div class="prose" markdown="1">

## The newsletter

- [Subscribe](../subscribe/) to The Local Minimum, the weekly email.
- [Past issues](../issues/) of the newsletter.
- [Suggest an item](../submit.html) for the newsletter.
- [Library](../library/): posts and reading lists.

### From the newsletter

- **Issue 1:** [Machines of Loving Grace](https://darioamodei.com/essay/machines-of-loving-grace), Dario Amodei's essay on what powerful AI could do for biology and medicine, and [Ilya Sutskever on the Dwarkesh Podcast](https://www.youtube.com/watch?v=aR20FWCCjAs).

## Johns Hopkins AI resources

### Tools

- **[HopGPT](https://it.johnshopkins.edu/ai/hopgpt/)** ([open HopGPT](https://chat.ai.jh.edu/)): Hopkins' secure, JHED-authenticated AI platform. Approved for sensitive data including PHI/PII. The sanctioned route.
- **[Microsoft Copilot for Microsoft 365](https://it.johnshopkins.edu/ai/microsoft-copilot/)**: AI inside Outlook, Word, Excel and Teams, under your Hopkins account.
- **[Abridge AI scribe](https://it.johnshopkins.edu/ai/ambient-virtual-ai-scribes/)**: the approved ambient scribe that drafts clinical notes from the visit conversation.
- **[Zoom AI Companion](https://it.johnshopkins.edu/ai/zoom-ai-companion/)**: meeting summaries and action items.
- **[Approved clinical AI tools](https://it.johnshopkins.edu/ai/clinical-tools/)**: IT's page for the current list of approved clinical tools (JHED login needed to see the list).

### Policy

- **[JHU Guidelines for Responsible Use of AI](https://it.johnshopkins.edu/ai/guidelines-for-responsible-use-of-ai/)**: the institutional ground rules for everyday AI use.
- **[Research IT: Artificial Intelligence](https://researchit.jhu.edu/artificial-intelligence/)**: where to start for research uses. IRB approval for PHI/PII work, SIP approval for clinical research.
- **["Generative AI at Johns Hopkins: What Faculty Need to Know"](https://medicine-matters.blogs.hopkinsmedicine.org/2026/05/generative-ai-at-johns-hopkins-what-faculty-need-to-know/)**: Medicine Matters, May 2026. The faculty-facing summary of current policy.

### Learning

- **[GenAI @ JHU](https://genai.jhu.edu/)**: the university's hub for generative AI guidance and training.
- **[JHU Libraries: AI Foundations for Academic Work](https://guides.library.jhu.edu/ai-foundations)**: the place to start if you are new to AI for research and writing.
- **[JHU Libraries: Using AI](https://guides.library.jhu.edu/using-AI)**: the library's broader guide to AI tools for research and writing.
- **[Library Data Services](https://dataservices.library.jhu.edu/training-workshops/)**: free workshops and one-on-one consultations on data and analysis methods.

### Collaborators and compute

- **[Data Science and AI Institute](https://ai.jhu.edu/)**: the university's AI hub and the place to find collaborators across schools. See its [events](https://ai.jhu.edu/events/) and [postdoctoral fellowship](https://ai.jhu.edu/careers/postdoctoral-fellowship-program/).
- **[Malone Center for Engineering in Healthcare](https://malonecenter.jhu.edu/)**: Hopkins engineers working on clinical problems. A good place to find a technical partner.
- **[ARCH condos and colocation](https://www.arch.jhu.edu/about-arch/condos-and-colocation/)**: buy nodes on the Rockfish cluster or rack your own hardware at ARCH, if you want to run models locally.

## AI in medicine

The clinical evidence, and the rules we practice under.

- **[NEJM AI Grand Rounds](https://podcasts.apple.com/us/podcast/nejm-ai-grand-rounds/id1657518313)** (podcast): clinical AI conversations from NEJM AI. The closest thing the field has to a journal club.
- **[Ground Truths](https://erictopol.substack.com/)**, Eric Topol (newsletter and [podcast](https://erictopol.substack.com/s/podcasts)): medical AI interviews and a steady read on the evidence.
- **[FSMB recommendations on AI in clinical practice](https://www.fsmb.org/advocacy/news-releases/fsmb-releases-recommendations-on-the-responsible-and-ethical-incorporation-of-ai-into-clinical-practice/)**: the Federation of State Medical Boards on accountability when physicians use AI tools. The view from the people who license us.
- **[AAMC AI competencies](https://www.aamc.org/about-us/medical-education/ai-competencies)**: what the AAMC expects learners and educators to be able to do with AI. Useful for anyone building a curriculum.

## How to evaluate an AI paper or product

Questions I ask before trusting a model, whether it is in a journal or a sales pitch.

1. **Who and what?** What exactly does it predict or do, and do the patients it was built on look like mine?
2. **How was it tested?** On held-out data, at another hospital, or prospectively? External and prospective validation carry the most weight.
3. **Compared to what?** Standard care, clinicians, or a simple model? Is the difference large enough to matter clinically?
4. **Is it calibrated?** A high AUC can still come with wrong risk estimates.
5. **What happens when it is wrong,** and who catches the error?
6. **Did it change anything?** Better decisions or outcomes, or only better predictions?

The reporting guidelines are the formal version of these questions:

- **[TRIPOD+AI](https://doi.org/10.1136/bmj-2023-078378)** (BMJ 2024): prediction models built with regression or machine learning.
- **[CONSORT-AI](https://doi.org/10.1038/s41591-020-1034-x)** and **[SPIRIT-AI](https://doi.org/10.1038/s41591-020-1037-7)** (Nature Medicine 2020): trials of AI interventions, and their protocols.
- **[DECIDE-AI](https://doi.org/10.1038/s41591-022-01772-9)** (Nature Medicine 2022): early clinical evaluation of AI decision support.

## How AI works

The technical side, from first principles to how the tools get built. Most of these are the hands-on links from my Grand Rounds talk, AI for Surgeons.

- **[Full reading list from the Faculty Development Series talk](../library/2026/09/ai-safety-effectiveness-surgery-resources/)**: history, mechanics, clinical evidence and the key technical papers.
- **["The Bitter Lesson"](http://www.incompleteideas.net/IncIdeas/BitterLesson.html)**, Richard Sutton, 2019: why general methods that scale with computing power keep beating methods built on human expertise. The short essay behind how the field thinks about progress.
- **[3Blue1Brown, neural networks series](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)**: the best visual explanation of how these models work. Start with [episode 1](https://www.youtube.com/watch?v=aircAruvnKk).
- **[Tiktokenizer](https://tiktokenizer.vercel.app)**: paste in a sentence and see the tokens a model actually reads.
- **[Transluce observability interface](https://transluce.org/observability-interface)**: look inside a model at the features it uses to answer.
- **["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents)**, Anthropic. A plain explanation of what "agentic" means.
- **[Lex Fridman #447: Cursor Team, Future of Programming with AI](https://lexfridman.com/cursor-team/)** (podcast): the Cursor founders on building an AI coding tool, and a good look at how the products built on top of the models get made.
- **[Latent Space](https://www.latent.space/podcast)** (podcast): how AI is actually built and deployed, from the engineering side.
- **[METR time horizons](https://metr.org/time-horizons/)**: how long a task AI agents can finish on their own, updated as new models ship.

## AI economics and industry

Who builds the models, the chips and the data centers, and where the money goes. It explains why the tools change as fast as they do.

- **[SemiAnalysis](https://semianalysis.com/)**, Dylan Patel: the best research on chips, data centers and AI economics.
- **[Lex Fridman #459: DeepSeek, China, OpenAI, NVIDIA, xAI, TSMC, Stargate, and AI Megaclusters](https://lexfridman.com/deepseek-dylan-patel-nathan-lambert/)** (podcast): Dylan Patel and Nathan Lambert on the hardware and model race. Long, and worth it.
- **[Dwarkesh Podcast](https://www.dwarkesh.com/)**: long interviews with lab leaders and researchers. Start with the [Dylan Patel episode](https://www.dwarkesh.com/p/dylan-patel) on chips, data centers and the build-out.
- **[Epoch AI](https://epoch.ai/)**: data and charts on compute, training cost and model trends.
- **[Stratechery](https://stratechery.com/)**, Ben Thompson: the business strategy of the tech and AI companies.

</div>
