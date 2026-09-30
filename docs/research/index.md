---
layout: default
title: Research and Tools
nav: research
description: David Stonko's research on outcomes and applied machine learning in vascular surgery, and open research tools.
---
# Research and tools

<p class="lede">Outcomes research and applied machine learning in vascular surgery, using large clinical databases and registries.</p>

<div class="prose" markdown="1">

Publications are on [Google Scholar](https://scholar.google.com/citations?user=615pt6cAAAAJ&hl=en). The [research tools](#open-research-tools) further down are open source and free to use for research.

<hr>

## David's classical ML research work

Before large language models, my machine learning work used small neural networks and classical statistics on registry and admission data to predict trauma volume, patient outcomes and resource needs. A few representative papers:

### Artificial intelligence can predict daily trauma volume and average acuity
*J Trauma Acute Care Surg*, 2018 &middot; first author &middot; [Paper](https://doi.org/10.1097/TA.0000000000001947)

I built a two-layer neural network that combined three years of trauma registry data from a Level I center with local weather and calendar data. It predicted daily trauma volume, penetrating trauma, emergent operative cases and mean Injury Severity Score (r = 0.89 on validation and test data), a proof of concept that "unpredictable" trauma load can be forecast for staffing and resource planning.

### Artificial neural networks can predict trauma volume and acuity regardless of center size and geography
*J Trauma Acute Care Surg*, 2019 &middot; [Paper](https://doi.org/10.1097/TA.0000000000002320)

The follow-up tested the same approach across five geographically distinct Level I centers: 43,380 traumas over 5,410 center-days. A single network held its accuracy on new data (R = 0.87) and did best on the high-volume days that matter most for planning.

### Machine learning analysis outperforms conventional statistical models and CT classification systems in predicting 6-month outcomes in pediatric TBI
*Neurosurg Focus*, 2018 &middot; [Paper](https://doi.org/10.3171/2018.8.FOCUS17773)

In 565 children with traumatic brain injury, the standard CT grading systems (Helsinki, Rotterdam, Marshall) predicted survival with AUCs of 0.78 to 0.84. A pediatric-specific neural network predicted 6-month outcome with an AUC of 0.95.

### A pilot machine learning study using trauma admission data to identify risk for high length of stay
*Surg Innov*, 2023 &middot; first author &middot; [Paper](https://doi.org/10.1177/15533506221139965)

Using only physiologic and demographic data available at admission, a deep neural network identified trauma patients who would land in the top quartile of length of stay (AUROC 0.80, specificity 0.95) in 2,953 admissions at an urban Level I trauma center. The goal is to start disposition planning on day one.

<hr>

## Current work: Anatomically informed neural networks (AINN)

Physics-informed neural networks (PINNs) build known physical laws into how a network is trained, so a model is penalized for predictions that break physics. That lets them learn from less data and behave more sensibly outside the data they were trained on.

I am working on the anatomic analogue: using what we already know about human anatomy to constrain neural networks in the same way that PINNs use known physics. More here as the work matures.

<hr>

## Open research tools

### Automated aortic segmentation and EVAR planner

An open-source MATLAB pipeline that takes a contrast-enhanced CT angiogram, segments the aorta and iliac arteries, finds the visceral branches and access vessels, builds a bifurcated centerline, and produces the measurements used to plan endovascular aneurysm repair.

**Work in progress.** This is under active development and not yet validated. Features, outputs and code will change.

**[Source on GitHub](https://github.com/davidstonko/aortic-segmenter-and-surgery-planner)**

Research use only. Not a regulated medical device.

### DFWC wound healing calculator

Estimates the probability that a diabetic foot ulcer heals within 180 days, from four variables available at the first visit, including toe location, University of Texas stage and WIfI wound grade. Developed on 1,141 ulcers from 387 patients at the Johns Hopkins Diabetic Foot and Wound Center and reported per TRIPOD+AI.

**[Open the calculator](https://davidstonko.github.io/dfwc-calc/)** &middot; [Source on GitHub](https://github.com/davidstonko/dfwc-calc)

For research and education only. Not for clinical decision-making.

<hr>

## More code

Everything else is on [GitHub](https://github.com/davidstonko), including the [Claude skills](../skills/).

</div>
