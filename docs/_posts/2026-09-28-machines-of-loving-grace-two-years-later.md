---
title: "Machines of Loving Grace, two years later"
dek: "In 2024, Dario Amodei wrote that powerful AI could arrive as early as 2026. It is now 2026."
author: David P. Stonko, MD, MS
---

This first feature covers an essay Dario Amodei published in October 2024, [Machines of Loving Grace](https://darioamodei.com/essay/machines-of-loving-grace). If you only have time for one thing this week, read the essay instead of this post.

Amodei is the CEO of Anthropic, the company that makes Claude, and he usually writes about AI risk. This essay was his attempt to describe what happens if things go right. The title comes from a poem Richard Brautigan wrote in 1967, while he was poet-in-residence at Caltech.

Early in the essay, Amodei defines what he calls powerful AI. He avoids the term artificial general intelligence (AGI), which he considers imprecise and weighed down by science fiction and hype. (I don't like the term either.) His definition is specific. The model would:

- be smarter than a Nobel laureate across most fields
- use a computer the way a remote worker does
- work on its own on tasks lasting days or weeks
- run as millions of copies in parallel

He calls this a "country of geniuses in a datacenter." He wrote that it could arrive as early as 2026. In a [follow-up essay](https://darioamodei.com/essay/the-adolescence-of-technology) this January, he repeated that it could be one to two years away, or considerably further out.

The first reason I chose to start with this is because I think his prediction around the emergence of powerful AI is now coming true. The second reason is the tone. Much of the current conversation about AI is pessimistic, in medicine and elsewhere, and I have added to it myself. This essay is a detailed optimistic case, and its sections on biology and neuroscience are the most relevant to physicians and surgeons.

## The argument

Consider how far surgery, anesthesia, and medicine have come in the last 100 years. In 1925, life expectancy in the US was 59 years; in 2024 it reached 79, the highest on record. Penicillin was not discovered until 1928, so a surgeon of that era operated without antibiotics. A [meta-analysis](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736%2812%2960990-8/abstract) of more than 21 million anesthetics found that deaths caused solely by anesthesia fell from 357 per million before the 1970s to 34 per million in the 1990s and 2000s (Bainbridge et al., Lancet 2012).

> **What if the next 100 years of medical progress arrived in the next 10?**

Now think about where surgery might be 100 years from now. Robots might operate semi-autonomously or on their own. New drugs might replace some operations entirely, and cures might exist for many diseases we now manage for life. Amodei's central claim is that AI could increase the rate of discovery at least tenfold, compressing 50 to 100 years of biomedical progress into 5 to 10. He calls this the compressed 21st century. He has a quite lengthy discussion on what the holdups will be, namely regulatory and clinical trial timelines. Elements of biological experimentation and science are not reducible beyond some minimum time that AI can help us reach but probably not surpass. But he has reasons for why this is more of a speed bump than might first be assumed.

His reasoning is that a small number of tools account for much of the progress in biology: CRISPR, mRNA vaccines, CAR-T, advanced microscopy, and cheap genome sequencing. By his estimate, about one such tool appears each year. He argues that finding them depends mostly on how many talented people are working on the problem. His example is CRISPR, which was known as part of bacterial immunity for about 25 years before anyone saw that it could edit genes.

He then lists outcomes he considers plausible (on variable timelines and probabilities of success):

- prevention of nearly all natural infectious disease
- a 95% or greater reduction in cancer mortality and incidence
- cures for most genetic disease
- prevention of Alzheimer's
- a doubling of the human lifespan

He calls these educated guesses, meant to show the scale of change.

## What has happened since

**Autonomy.** METR, a nonprofit evaluation group, measures how long a task, in expert human hours, an AI agent can complete on its own. That task length has roughly doubled every seven months for six years. In February 2026, Claude Opus 4.6 reached about 14.5 hours at a 50% success rate. As of May, Claude Mythos measured at least 16 hours, which METR says is beyond what its current task suite can reliably measure. METR's tasks are mostly software, so these figures do not transfer directly to other professional work.

**Research.** In May, Nature published two systems that carry out much of the reasoning in a research project: Robin from FutureHouse and Co-Scientist from Google DeepMind. Robin generated the hypotheses, chose the experiments, and analyzed the data, while human researchers did the bench work. It identified ripasudil, a glaucoma drug, as a candidate for dry macular degeneration. The finding still needs preclinical work before any trial in patients.

**Drugs.** In July, Insilico started a Phase III trial of rentosertib for idiopathic pulmonary fibrosis. AI identified both its target and its molecule. In the Phase IIa study, the highest-dose arm gained a mean 98.4 mL of FVC at 12 weeks. An analysis presented at ASCO this year counted 117 AI-enabled drugs that had entered human trials. Of those, 8 had completed Phase 2.

**Surgery.** Axel Krieger's group at Johns Hopkins built SRT-H, a surgical robot based on a transformer architecture similar to what is used in ChatGPT. It performed the clipping and cutting phase of cholecystectomy on eight ex vivo gallbladders with a 100% success rate and no human intervention ([Kim et al., Science Robotics 2025](https://www.science.org/doi/10.1126/scirobotics.adt5254)). The authors described this as step-level autonomy and noted that a living patient involves problems this experiment did not address.

## Why this matters for surgeons

First, consider the role Amodei gives AI. In surgical research, many of us still use AI as a better regression: we point it at NSQIP or VQI and hope for a higher AUC. Amodei describes AI acting as the principal investigator, and Robin is an early version of that. The idea is close to Richard Sutton's 2019 essay [The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html), which argues that general methods that scale with computing power eventually beat approaches built on hand-coded expert knowledge.

Second, anyone who has run a power calculation will recognize his point about clinical trials. Trials are slow mainly because most new therapies have small effects, and small effects require large samples. Therapies with large effects move faster; his example is the COVID mRNA vaccines, approved in nine months. Rentosertib is an example. AI shortened discovery, but the drug still needs a randomized, double-blind, placebo-controlled Phase III.

Third, he states the limits. Intelligence does not make cells divide faster, and experiments take as long as they take. Surgery happens in that physical world, which is one reason SRT-H has not reached patients. Among his speculative examples are better implanted devices and the ability to regrow or reshape tissue. Anyone who works on grafts and limb salvage should pay attention to both.

## The counterargument

There are two main counterarguments. First is Niko McCarty's [response](https://www.lesswrong.com/posts/2zmxYKKsSaWWjALg2/levers-for-biological-progress-a-response-to-machines-of) in Asimov Press. He argues that most of what slows biology is biophysical rather than computational, and that there may not be enough high-quality biological data for even a superintelligent model to reach its potential. Early results fit that view: AI has sped up discovery, but of the 117 AI-enabled drugs that had entered human trials by the end of 2025, only 8 had completed Phase 2 ([ASCO 2026](https://doi.org/10.1200/JCO.2026.44.16_suppl.11072)). The second is Amodei's more recent essay, [The Adolescence of Technology](https://darioamodei.com/essay/the-adolescence-of-technology) (January 2026), which he frames as the disquieting counterpart to Machines of Loving Grace and which exposes the risks of all of this. He lays out five: AI systems that develop goals of their own, misuse by individuals to cause mass harm (bioweapons especially), misuse by governments to seize power, economic disruption and job loss, and broader destabilization from how fast things change. For each he proposes defenses, from interpretability research and gene synthesis screening to chip export controls and economic policy.

The regulatory question is now open. On September 19, President Trump said he would create an ["AI Force"](https://www.forbes.com/sites/maryroeloffs/2026/09/19/trump-vows-to-launch-ai-force-to-safeguard-us-dominance/) and name an AI czar, and rejected calls, including Amodei's, to slow frontier development, arguing that it would cede ground to China. Supporters of regulation argue that systems this capable need binding safety standards and independent oversight before wide deployment, much as drugs and devices do. Critics counter that when the largest AI companies ask for regulation, they are seeking regulatory capture: licensing and compliance rules that incumbents can afford and startups and open-source developers cannot, which builds a moat around the leaders. How this is resolved will shape how quickly any of Amodei's predictions reach patients.

## My thoughts

You don't need to accept Amodei's timeline to learn from his essay. He writes with long prose, which can be a little tedious, but it has more clarity on his position than the sound bites you might get from CNBC about AI risks. My summary leaves out most of what makes it worth reading: the reasoning behind each prediction, the limits he acknowledges, and sections on neuroscience, economics, and governance that I didn't cover at all. The introduction and the biology section take about 20 minutes.

**[Read Machines of Loving Grace](https://darioamodei.com/essay/machines-of-loving-grace)**

*From [Local Minimum](https://davidstonko.github.io/ai-surgery/), Issue 1.*
