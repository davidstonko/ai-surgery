---
title: "AI Safety and Effectiveness in Surgery: Resources and Links"
dek: "Hopkins tools and policy, where to start reading, the clinical evidence, and the technical papers that matter most."
author: David P. Stonko, MD, MS
---

Resources and links from my Faculty Development Series talk on AI safety and effectiveness in surgery.

## 1. Johns Hopkins AI resources

- **HopGPT**: [it.johnshopkins.edu/ai/hopgpt](https://it.johnshopkins.edu/ai/hopgpt/) (or just go through [my.jh.edu](https://my.jh.edu/)). Hopkins' secure, JHED-authenticated AI platform; free to JHU/JHM faculty, staff, and students; frontier models behind Hopkins controls; approved for sensitive data including PHI/PII. The sanctioned (and encouraged by administration) avenue.
- **JHU Guidelines for Responsible Use of AI**: [it.johnshopkins.edu/ai/guidelines-for-responsible-use-of-ai](https://it.johnshopkins.edu/ai/guidelines-for-responsible-use-of-ai/). The institutional ground rules for everyday AI use.
- **Research IT: Artificial Intelligence**: [researchit.jhu.edu/artificial-intelligence](https://researchit.jhu.edu/artificial-intelligence/). Where to start for research uses; remember IRB approval for PHI/PII work and SIP approval for clinical research.
- **"Generative AI at Johns Hopkins: What Faculty Need to Know"**: [Medicine Matters, May 2026](https://medicine-matters.blogs.hopkinsmedicine.org/2026/05/generative-ai-at-johns-hopkins-what-faculty-need-to-know/). The faculty-facing summary of current policy.

## 2. Further reading and watching

For those generally interested in AI history or how it works, and how it is shaping (and will continue to shape) society.

- **["The Bitter Lesson"](http://www.incompleteideas.net/IncIdeas/BitterLesson.html)**: Richard Sutton, 2019. If you only read one thing on this list, read this twice. It's the most important short essay in AI, and you can read it in 10 minutes on an iPhone instead of scrolling Instagram tonight. He argues that 70 years of history show that general methods that scale with computation beat human-encoded domain expertise. Read it before betting your research program on a hand-built clinical algorithm. He wrote this in 2019 and everything still holds.
- **["Clinical AI tools are losing to general-purpose models"](https://kevinmd.com/2026/07/clinical-ai-tools-are-losing-to-general-purpose-models.html)**: an article I wrote for KevinMD this year about my take on how the Bitter Lesson is now coming for surgery.
- **[AlphaGo (documentary)](https://youtu.be/WXuK6gekU1Y)**: free, 90 minutes, and the best emotional introduction to what it feels like when a scalable system passes human expertise. I think this is also on Netflix. If you like this, [this is the follow-up](https://www.youtube.com/watch?v=d95J8yzvjbQ).
- **3Blue1Brown: ["But what is a neural network?"](https://youtu.be/aircAruvnKk) and ["Transformers, the tech behind LLMs"](https://youtu.be/wjZofJX0v4M)**: the clearest visual explanations of the mechanics, no math background required. There are about 10 more videos from them if it's interesting, but this is where to start in that direction.
- **Andrej Karpathy: ["Intro to Large Language Models"](https://youtu.be/zjkBMFhNj_g)**: one hour from an OpenAI co-founder covering how LLMs are trained and where they fail. Also his ["Software Is Changing (Again)"](https://youtu.be/LCEmiRjPEtQ), on what AI does to how we build things.
- **[Dwarkesh Podcast: Richard Sutton](https://www.dwarkesh.com/p/richard-sutton)**: the Bitter Lesson's author arguing LLMs are a dead end; a worthwhile counterweight to the hype in both directions.

## 3. Clinical evidence discussed in the talk

A few were skipped due to time constraints.

- **[GPT-4 alone outperformed physicians using GPT-4](https://doi.org/10.1001/jamanetworkopen.2024.40969)**: randomized trial (Goh et al., *JAMA Network Open* 2024). Physicians with GPT-4 scored 76% on diagnostic reasoning vs. 74% without; GPT-4 alone scored 92%. Access to AI is not the same as skill with it.
- **[The follow-up: the gap is closable](https://www.nature.com/articles/s41591-024-03456-y)**: Goh et al., *Nature Medicine* 2025. In a second RCT on management reasoning, physicians using GPT-4 outperformed those without it. Using AI well is a learnable skill.
- **[TREWS: AI sepsis detection that worked (built at Hopkins)](https://www.nature.com/articles/s41591-022-01894-0)**: Adams et al., *Nature Medicine* 2022. Prospective five-hospital study of ~590,000 patients; when clinicians engaged alerts within 3 hours, in-hospital sepsis mortality fell 18.7% (relative).
- **[The Epic sepsis model: same task, opposite outcome](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2781307)**: Wong et al., *JAMA Internal Medicine* 2021. On external validation the widely deployed proprietary model showed AUC 0.63 (vs. reported 0.76 to 0.83) and missed two-thirds of sepsis cases. External validation and implementation decide outcomes.
- **[AI de-skilling is measurable](https://doi.org/10.1016/S2468-1253(25)00133-5)**: Budzyń et al., *Lancet Gastroenterology & Hepatology* 2025. After routine AI-assisted colonoscopy, experienced endoscopists' unassisted adenoma detection fell from 28.4% to 22.4%. Keep your unassisted reps.
- **[General-purpose LLMs outperform specialized clinical AI tools](https://doi.org/10.1038/s41591-026-04431-5)**: Vishwanath et al., *Nature Medicine* 2026. Benchmark comparison showing frontier general models beating purpose-built clinical AI. [Companion paper on physicians' real-world questions](https://www.nature.com/articles/s41591-026-04457-9).

## 4. The most important technical AI papers of the last decade

My opinion; all free.

- **["Attention Is All You Need"](https://arxiv.org/abs/1706.03762)**: Vaswani et al., 2017. The eight-page paper introducing the transformer, the architecture inside GPT, Claude, Gemini, OpenEvidence, ambient scribes, and AlphaFold.
- **[Scaling laws](https://arxiv.org/abs/2001.08361)**: Kaplan et al., 2020. Model error falls as a power law in parameters, data, and compute: a dose-response curve for machine capability, measured before the capability existed.
- **[Chinchilla](https://arxiv.org/abs/2203.15556)**: Hoffmann et al., 2022. Model size must be matched to training data; a smaller model trained on more data beats a bigger under-fed one.
- **["Lost in the Middle"](https://arxiv.org/abs/2307.03172)**: Liu et al., *TACL* 2024. The canonical U-shaped curve; the same fact is recalled worse when buried mid-prompt. Put key data at the beginning or end.
- **[Context rot](https://www.trychroma.com/research/context-rot)**: Chroma Research, 2025. Performance degrades as input length grows, well before the advertised context-window limit. See also [NoLiMa](https://arxiv.org/abs/2502.05167).
- **[Reinforcement learning with verifiable rewards (RLVR)](https://arxiv.org/abs/2411.15124)**: Lambert et al. (Tülu 3), 2024. Why AI improves fastest where answers can be objectively checked. The same logic should guide which AI projects you spend your time on.
- **[Sycophancy](https://arxiv.org/abs/2310.13548)**: Sharma et al., *ICLR* 2024. Models trained on human feedback learn to agree with you. Ask for the case against your plan to get a better result.
