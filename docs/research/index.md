---
layout: default
title: Research and Tools
nav: research
description: David Stonko's research on outcomes and applied machine learning in vascular surgery, and open research tools.
---
# Research and tools

<p class="lede">Outcomes research and applied machine learning in vascular surgery, using large clinical databases and registries.</p>

<div class="prose" markdown="1">

Publications are on [Google Scholar](https://scholar.google.com/citations?user=615pt6cAAAAJ&hl=en). The [research tools](#tools) further down are open source and free to use for research.

<hr>

## David's ML/AI Research

### Classical ML research work

Before large language models, my machine learning work used neural networks, classical ML and large registry datasets to predict patient outcomes, tumor grade and trauma center workload.

#### Neural networks outperform CT grading for pediatric TBI outcomes

<figure class="paper-cover">
<a href="https://thejns.org/focus/view/journals/neurosurg-focus/45/5/neurosurg-focus.45.issue-5.xml"><img src="{{ '/assets/research/nsfocus-45-5-cover.jpg' | relative_url }}" alt="Cover of Neurosurgical Focus, November 2018, showing the neural network diagram from this paper: nine input variables, a layer of training nodes, and a favorable versus unfavorable outcome" width="240" height="320" loading="lazy"></a>
<figcaption>My neural network diagram became the cover art of the November 2018 issue, <em>Neurosurgical Focus</em>, Predictive Analytics in Medicine.</figcaption>
</figure>

Hale AT, Stonko DP, et al. "Machine-learning analysis outperforms conventional statistical models and CT classification systems in predicting 6-month outcomes in pediatric patients sustaining traumatic brain injury." *Neurosurg Focus* 2018;45(5):E2. [Paper](https://thejns.org/focus/view/journals/neurosurg-focus/45/5/article-pE2.xml)

In 565 children with traumatic brain injury, the standard CT grading systems (Helsinki, Rotterdam, Marshall) predicted survival with AUCs of 0.78 to 0.84. A pediatric-specific neural network, built on nine clinical and CT variables, predicted 6-month outcome with an AUC of 0.95.

<div class="clear"></div>

#### Predicting trauma volume and acuity to direct staffing

Trauma has long been treated as unpredictable. Across four papers, we used big data and classical ML to predict daily trauma volume and acuity at large US Level I trauma centers, so staffing and resources can be matched to demand.

- Stonko DP, et al. "Artificial intelligence can predict daily trauma volume and average acuity." *J Trauma Acute Care Surg* 2018;85(2):393-397. [Paper](https://doi.org/10.1097/TA.0000000000001947)

  A neural network built on three years of registry data plus local weather and calendar data predicted daily trauma volume, penetrating trauma, emergent operative cases and mean Injury Severity Score at one Level I center (r = 0.89).
- Stonko DP, et al. "Identifying temporal patterns in trauma admissions: Informing resource allocation." *PLoS One* 2018;13(12):e0207766. [Paper](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0207766)

  In 10,684 trauma contacts, admissions peaked on weekends and around evening shift change, with a high season from April to late October. Penetrating trauma and patients headed to the OR arrived later in the day than blunt trauma and floor admissions.
- Dennis BM, Stonko DP, et al. "Artificial neural networks can predict trauma volume and acuity regardless of center size and geography: A multicenter study." *J Trauma Acute Care Surg* 2019;87(1):181-187. [Paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC6602836/)

  One network trained across five geographically distinct Level I centers (43,380 traumas) held its accuracy on new data (R = 0.87) and did best on high-volume days.
- Stonko DP, et al. "Artificial intelligence in trauma systems." *Surgery* 2021;169(6):1295-1299. [Paper](https://www.sciencedirect.com/science/article/pii/S0039606020305092)

  A review of where machine learning fits across a trauma system, from nurse and provider staffing ratios to where to site a new trauma center.

#### Machine learning to predict meningioma grade from MRI

<figure class="paper-cover paper-side">
<img src="{{ '/assets/research/meningioma-ml-fig1.jpg' | relative_url }}" alt="ROC curves comparing an optimized neural network, logistic regression, Gaussian SVM, naive Bayes and k-nearest neighbors for predicting atypical meningioma" width="1000" height="802" loading="lazy">
<figcaption>Figure 1. ROC curves for each ML algorithm and statistical method in predicting atypical (WHO grade II) meningioma.</figcaption>
</figure>

Hale AT, Stonko DP, et al. "Machine learning analyses can differentiate meningioma grade by features on magnetic resonance imaging." *Neurosurg Focus* 2018;45(5):E4. [Paper](https://thejns.org/focus/view/journals/neurosurg-focus/45/5/article-pE4.xml)

I did the ML programming. Working in MATLAB from six features a neuroradiologist read on preoperative MRI (tumor volume, peritumoral edema, necrosis, location, draining vein) plus sex, I trained and validated a panel of binary classifiers on 128 patients: k-nearest neighbors, support vector machines, naive Bayes, neural networks and logistic regression. I then compared them head to head on the ROC curve. The optimized neural network did best (AUC 0.89).

<div class="clear"></div>

<hr class="sub">

### Current work: Anatomy-informed neural networks (AINN)

Deep learning models of anatomy can give answers that are numerically plausible but anatomically impossible, and they generalize poorly when data are scarce, which is the usual situation in surgery. Physics-informed neural networks (PINNs) handle the same problem in engineering by building known physical laws into training. AINN does the same with anatomy, in two ways:

- **Soft priors** enter the loss as penalties. A renal transplant artery arising from the iliac instead of the aorta is treated as unexpected, not impossible.
- **Hard priors**, such as the continuity of a vessel, are built into the architecture, so predictions that break them cannot happen by construction.

The first test case is how the aortoiliac tree deforms when a stiff wire is passed through it. That matters in aortic surgery now and will matter for autonomous endovascular navigation. The model couples the wire and the vessel in 3D and is supervised against the 2D angiogram, so ordinary angiograms can train a 3D prediction.

This is early work. The preprint lays out the framework and checks the math against known ground truth; no network has been trained yet. Next is moving from simulation to real CT scans, to test whether the anatomic priors improve accuracy and reduce the training data needed.

**[Read the preprint on arXiv](https://arxiv.org/abs/2608.21332)** &middot; Stonko DP. "Anatomy-Informed Neural Networks: Encoding Anatomic Priors in Loss and Architecture, with an SE(3) Formulation of Guidewire-Induced Aortoiliac Deformation." arXiv:2608.21332, August 2026.

<hr>

## Tools

### Automated aortic segmentation and EVAR planner

An open-source MATLAB pipeline that takes a contrast-enhanced CT angiogram, segments the aorta and iliac arteries, finds the visceral branches and access vessels, builds a bifurcated centerline, and produces the measurements used to plan endovascular aneurysm repair.

**Work in progress.** This is under active development and not yet validated. Features, outputs and code will change.

**[Source on GitHub](https://github.com/davidstonko/aortic-segmenter-and-surgery-planner)**

Research use only. Not a regulated medical device.

### DFWC wound healing calculator

Estimates the probability that a diabetic foot ulcer heals within 180 days, from four variables available at the first visit, including toe location, University of Texas stage and WIfI wound grade. Developed on 1,141 ulcers from 387 patients at the Johns Hopkins Diabetic Foot and Wound Center and reported per TRIPOD+AI.

**[Open the calculator](https://davidstonko.github.io/dfwc-calc/)** &middot; [Source on GitHub](https://github.com/davidstonko/dfwc-calc)

For research and education only. Not for clinical decision-making.

### More code

Everything else is on [GitHub](https://github.com/davidstonko), including the [Claude skills](../skills/).

</div>
