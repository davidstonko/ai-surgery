---
layout: default
title: Research and Tools
nav: research
description: "David Stonko's research on open aortic surgery, carotid revascularization, vascular trauma and machine learning in surgery, with open research tools."
head_title: "Research: Vascular Surgery and Machine Learning | David Stonko, MD, MS"
---
# Research and tools

<p class="lede">Outcomes research and applied machine learning in vascular surgery, using large clinical databases and registries.</p>

<div class="prose" markdown="1">

Publications are on [Google Scholar](https://scholar.google.com/citations?user=615pt6cAAAAJ&hl=en). The [research tools](#tools) further down are open source and free to use for research. My medical device work is on the [MedTech Work](../medtech/) page.

<hr>

## David's ML/AI Research

### Classical ML research work

<figure class="paper-cover">
<a href="https://thejns.org/focus/view/journals/neurosurg-focus/45/5/neurosurg-focus.45.issue-5.xml"><img src="{{ '/assets/research/nsfocus-45-5-cover.jpg' | relative_url }}" alt="Cover of Neurosurgical Focus, November 2018, showing the neural network diagram from this paper: nine input variables, a layer of training nodes, and a favorable versus unfavorable outcome" width="240" height="320" loading="lazy"></a>
<figcaption>My neural network diagram became the cover art of the November 2018 issue, <em>Neurosurgical Focus</em>, Predictive Analytics in Medicine.</figcaption>
</figure>

Before large language models, my machine learning work used neural networks, classical ML and large registry datasets to predict patient outcomes, including some examples below like predicting tumor grade, surgical outcomes and trauma center workload.

#### Neural networks outperform CT grading for pediatric TBI outcomes

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

<details markdown="1">
<summary>Other machine learning and applied math work (15)</summary>

**Machine learning and AI**

- Wise ES, Stonko DP, Glaser ZA, et al. "Prediction of prolonged ventilation after coronary artery bypass grafting: data from an artificial neural network." *Heart Surg Forum* 2017;20(1):E007-E014. [Paper](https://doi.org/10.1532/hsf.1566)
- Stonko DP\*, O'Neill DC\*, Dennis BM, et al. "Trauma quality improvement: reducing triage errors by automating the level assignment process." *J Surg Educ* 2018;75(6):1551-1557. [Paper](https://doi.org/10.1016/j.jsurg.2018.03.014)
- Hale AT, Stonko DP, Lim J, et al. "Using an artificial neural network to predict traumatic brain injury." *J Neurosurg Pediatr* 2019;23(2):219-226. [Paper](https://doi.org/10.3171/2018.8.PEDS18370)
- Zarkowsky DS, Stonko DP. "Artificial intelligence's role in vascular surgery decision-making." *Semin Vasc Surg* 2021;34(4):260-267. [Paper](https://doi.org/10.1053/j.semvascsurg.2021.10.005)
- Stonko DP, Weller JH, Gonzalez Salazar AJ, et al. "A pilot machine learning study using trauma admission data to identify risk for high length of stay." *Surg Innov* 2023;30(3):356-365. [Paper](https://doi.org/10.1177/15533506221139965)
- Stonko DP, Morrison JJ, Hicks CW. "A review of mature machine learning and artificial intelligence enabled applications in aortic surgery." *JVS-Vascular Insights* 2023.
- Stonko DP, Hicks CW. "Mature artificial intelligence- and machine learning-enabled medical tools impacting vascular surgical care: a scoping review of late-stage, US Food and Drug Administration-approved or cleared technologies relevant to vascular surgeons." *Semin Vasc Surg* 2023;36(3):460-470. [Paper](https://doi.org/10.1053/j.semvascsurg.2023.06.001)
- Stonko DP, Jarman MP, Byrne JP. "It is time for some deep learning: a statistical commentary on machine learning for clinical prediction models using imbalanced datasets." *Trauma Surg Acute Care Open* 2024;9:e001567.

**Applied math, mathematical biology and biophysics**

- Stonko DP, Manning L, Starz-Gaiano M, Peercy BE. "A mathematical model of collective cell migration in a three-dimensional, heterogeneous environment." *PLoS One* 2015;10(4):e0122799. [Paper](https://doi.org/10.1371/journal.pone.0122799)
- Wimmer RJ, Liu Y, Schachter TN, Stonko DP, Peercy BE, Schneider MF. "Mathematical modeling reveals modulation of both nuclear influx and efflux of Foxo1 by the IGF-I/PI3K/Akt pathway in skeletal muscle fibers." *Am J Physiol Cell Physiol* 2014;306(6):C570-C584. [Paper](https://doi.org/10.1152/ajpcell.00338.2013)
- Stonko DP. "A discrete, three-dimensional, force-based mathematical model of collective cell migration." M.S. thesis, Department of Mathematics and Statistics, University of Maryland, Baltimore County, 2014. Advisors: Bradford E. Peercy, PhD, and Michelle Starz-Gaiano, PhD.
- Stonko D, Starz-Gaiano M, Peercy BE. "Implementing a numerical package to model collective cell migration." Technical Report HPCF-2014-2, UMBC High Performance Computing Facility, 2014.
- Stonko D, Khuvis S, Gobbert MK. "Numerical methods to solve 2-D and 3-D elliptic partial differential equations using Matlab on the cluster maya." Technical Report HPCF-2014-9, UMBC High Performance Computing Facility, 2014.
- Stonko DP, Starz-Gaiano M, Peercy BE. "Force-based biophysical model of border cell migration: unraveling the mechanism of collective cell migration." UMBC Department of Mathematics and Statistics, 2013.
- Ge X\*, Stonko DP\*. "Modeling a cellular response to a gradient: mathematics and molecular biology inform a mechanistic understanding." *UMBC Review* 2012;13.

\* Equal contribution.

</details>

<hr class="sub">

### Current work: Anatomy-informed neural networks (AINN)

Deep learning models of anatomy can give answers that are numerically plausible but anatomically impossible, and they generalize poorly when data are scarce, which is the usual situation in surgery. Physics-informed neural networks (PINNs) handle the same problem in engineering by building known physical laws into training. AINN does the same with anatomy, in two ways:

- **Soft priors** enter the loss as penalties. A renal transplant artery arising from the iliac instead of the aorta is treated as unexpected, not impossible.
- **Hard priors**, such as the continuity of a vessel, are built into the architecture, so predictions that break them cannot happen by construction.

The first test case is how the aortoiliac tree deforms when a stiff wire is passed through it. That matters in aortic surgery now and will matter for autonomous endovascular navigation. The model couples the wire and the vessel in 3D and is supervised against the 2D angiogram, so ordinary angiograms can train a 3D prediction.

This is early work. The preprint lays out the framework and checks the math against known ground truth; no network has been trained yet. Next is moving from simulation to real CT scans, to test whether the anatomic priors improve accuracy and reduce the training data needed.

**[Read the preprint on arXiv](https://arxiv.org/abs/2608.21332)** &middot; Stonko DP. "Anatomy-Informed Neural Networks: Encoding Anatomic Priors in Loss and Architecture, with an SE(3) Formulation of Guidewire-Induced Aortoiliac Deformation." arXiv:2608.21332, August 2026.

<hr>

## Clinical Research

### Open thoracoabdominal aortic aneurysm repair

Open thoracoabdominal repair is among the largest operations in vascular surgery, and spinal cord ischemia is its most feared complication. I have trained and worked with [Dr. James H. Black III](https://profiles.hopkinsmedicine.org/provider/james-hamilton-black-iii/2706000), a world expert in this operation, and with [Dr. Caitlin W. Hicks](https://profiles.hopkinsmedicine.org/provider/caitlin-hicks/2706850), and our work through the [Johns Hopkins Aortic Center](https://www.hopkinsmedicine.org/heart-vascular-institute/cardiac-surgery/aortic-center) looks at how it is sequenced and monitored. We care for a large population of patients with connective tissue disorders (Marfan, Ehlers-Danlos and Loeys-Dietz syndromes), so we continue to do a high volume of open thoracoabdominal surgery even as these cases become rarer nationally.

- Stonko DP, Aru RG, Tan LT, et al. "Open thoracoabdominal aortic reconstruction with distal aortic perfusion: a bottom-up approach is safe in selected patients." *Ann Vasc Surg* 2026. [Paper](https://doi.org/10.1016/j.avsg.2026.09.021)

  Repair is usually done top-down. A bottom-up sequence, doing the distal anastomoses first, can help when those are expected to be hard, such as with hostile iliac anatomy. In 44 patients (33 top-down, 11 bottom-up), in-hospital mortality, spinal cord ischemia, new dialysis and length of stay were similar, so the sequence can be tailored to the patient's anatomy and the surgeon's experience.

- Aru RG, Stonko DP, Tan LT, et al. "Utility of motor-evoked potentials in contemporary open thoracoabdominal aortic repair." *J Vasc Surg* 2024;80(4):979-987. [Paper](https://doi.org/10.1016/j.jvs.2024.04.022)

  In 79 open type 2, type 3 and completion repairs with intraoperative motor-evoked potential monitoring, MEP changes tracked with the number of vertebral levels replaced. Spinal cord ischemia occurred only when more than six levels were replaced (17.7% overall), was usually reversible, and led to permanent paraplegia in 5.1%.

<hr class="sub">

### Carotid revascularization

I have done research with [Dr. Caitlin W. Hicks](https://profiles.hopkinsmedicine.org/provider/caitlin-hicks/2706850), an internationally recognized expert in carotid revascularization and public health, on a number of projects.

Stonko DP, Goldsborough E, Kibrik P, Zhang G, Holscher CM, Hicks CW. "Use of transcarotid artery revascularization, transfemoral carotid artery stenting, and carotid endarterectomy in the US from 2015 to 2019." *JAMA Netw Open* 2022;5(9):e2231944. [Paper](https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2796354)

TCAR was cleared by the FDA in 2015. Using the Vascular Quality Initiative, we tracked 108,676 carotid revascularizations over its first five years. Endarterectomy fell from 84.9% of cases to 64.8%, while TCAR rose from 0.8% to 21.9%, overtaking transfemoral stenting. The shift was largest in high-risk patients, and high-risk status was the strongest predictor of choosing TCAR.

More of my carotid revascularization work:

- Stonko DP, et al. "Association of year of surgery and carotid stenting outcomes in high-risk patients, 2015-2021." *JAMA Surg* 2023;158(7):768-769. [Paper](https://doi.org/10.1001/jamasurg.2022.8384)
- Stonko DP, et al. "Automatic 1-year follow-up appointment creation and reminders can improve long-term follow-up after carotid revascularization." *Am J Surg* 2024;227:57-62. [Paper](https://doi.org/10.1016/j.amjsurg.2023.09.032)
- Zhang GQ, Bose S, Stonko DP, et al. "Transcarotid artery revascularization is associated with similar outcomes to carotid endarterectomy regardless of patient risk status." *J Vasc Surg* 2022;76(2):474-481. [Paper](https://doi.org/10.1016/j.jvs.2022.03.860)
- Kibrik P, Stonko DP, et al. "Association of carotid revascularization approach with perioperative outcomes based on symptom status and degree of stenosis among octogenarians." *J Vasc Surg* 2022;76(3):769-777. [Paper](https://doi.org/10.1016/j.jvs.2022.04.027)
- Bose S, Stonko DP, et al. "Females are less likely to receive best medical therapy for stroke prevention before and after carotid revascularization than males." *J Vasc Surg* 2023;77(3):786-794. [Paper](https://doi.org/10.1016/j.jvs.2022.09.028)
- Holscher CM, Dun C, Wu YHA, White M, Stonko DP, et al. "Impact of the 2023 Centers for Medicare & Medicaid Services policy change on carotid artery stenting use among Medicare beneficiaries." *Surgery* 2025;187:109622. [Paper](https://doi.org/10.1016/j.surg.2025.109622)

<hr class="sub">

### Vascular trauma

Much of my research is on the management of vascular trauma. Five of my studies were recently cited in the [2025 ESVS Clinical Practice Guidelines on the Management of Vascular Trauma](https://doi.org/10.1016/j.ejvs.2024.12.018), in the recommendations on synthetic interposition grafts, major abdominal vascular injury and postoperative antiplatelet therapy. Others are cited in the AAST and WSES guidelines on major thoracic vascular injuries (2026), the WSES guidelines on trauma in elderly and frail patients (2023), and the European guideline update on initial surgical management of upper extremity injuries in the severely injured (2026).

#### Cited in the 2025 ESVS guidelines

Most use data from PROOVIT, the American Association for the Surgery of Trauma's prospective multicenter vascular injury registry.

- Stonko DP, Betzold RD, Abdou H, et al. "In-hospital outcomes in autogenous vein versus synthetic graft interposition for traumatic arterial injury: a propensity-matched cohort from PROOVIT." *J Trauma Acute Care Surg* 2022;92(2):407-412. [Paper](https://doi.org/10.1097/TA.0000000000003465)
- Stonko DP, Azar FK, Betzold RD, et al. "Contemporary management and outcomes of injuries to the inferior vena cava: a prospective multicenter trial from PROspective Observational Vascular Injury Treatment." *Am Surg* 2023;89(4):714-719. [Paper](https://doi.org/10.1177/00031348211038556)
- Stonko DP, Betzold RD, Azar FK, et al. "Postoperative antiplatelet and/or anticoagulation use does not impact complication or reintervention rates after vein repair of arterial injury: a PROOVIT study." *Vascular* 2023;31(4):777-783. [Paper](https://doi.org/10.1177/17085381221082371)
- Siddiqi N, Lammers D, Hu P, Stonko DP, et al. "Comparison of contralateral vs ipsilateral vein graft for traumatic vascular injury repair: a cohort from PROOVIT." *Am Surg* 2024;90(9):2310-2313. [Paper](https://doi.org/10.1177/00031348241246167)
- Chipman AM, Ottochian M, Ricaurte D, Gunter G, DuBose JJ, Stonko DP, et al. "Contemporary management and time to revascularization in upper extremity arterial injury." *Vascular* 2023;31(2):284-291. [Paper](https://doi.org/10.1177/17085381211062726)

<details markdown="1">
<summary>Other clinical vascular trauma studies (5)</summary>

- Abdou H, Edwards J, Stonko DP, et al. "The role of endovascular repair of popliteal arterial injuries in the acute setting." *Ann Vasc Surg* 2022;87:522-528. [Paper](https://doi.org/10.1016/j.avsg.2022.05.040)
- Abdou H, Treffalls RN, Stonko DP, et al. "Endovascular stenting techniques for blunt carotid injury." *Vascular* 2024;32(5):1055-1062. [Paper](https://doi.org/10.1177/17085381231193062)
- Patel N, Harfouche M, Stonko DP, et al. "Factors associated with increased mortality in severe abdominopelvic injury." *Shock* 2022;57(2):175-180. [Paper](https://doi.org/10.1097/SHK.0000000000001851)
- Edwards J, Treffalls RN, Abdou H, Stonko DP, et al. "Lower Extremity Staged Revascularization (LESR) as a new innovative concept for lower extremity salvage in acute popliteal artery injuries: a hypothesis." *Patient Saf Surg* 2022;16(1):39. [Paper](https://doi.org/10.1186/s13037-022-00349-2)
- Dvir M, Jodlowski G, Stonko DP, et al. "A proposed clinical guide to delivering Lower Extremity Extracorporeal Distal Revascularization (LEEDR) as a bridge to definitive care in acute limb ischemia." *Perfusion* 2026;41(3):254-259. [Paper](https://doi.org/10.1177/02676591251363374)

</details>

<details markdown="1">
<summary>Large animal and translational studies (17)</summary>

- Stonko DP, Patel N, Edwards J, et al. "A swine model of reproducible timed induction of peripheral arterial shunt failure: developing warning signs of imminent shunt failure." *JVS Vasc Sci* 2022;3:285-291. [Paper](https://doi.org/10.1016/j.jvssci.2022.07.001)
- Edwards J, Stonko DP, Abdou H, et al. "Lower extremity extracorporeal distal revascularization in a swine model of prolonged extremity ischemia." *Ann Vasc Surg* 2023;89:293-301. [Paper](https://doi.org/10.1016/j.avsg.2022.09.060)
- Treffalls RN, Jodlowski G, Wilken S, Stonko DP, et al. "Lower extremity extracorporeal distal revascularization (LEEDR) as a novel approach to limb salvage following prolonged ischemia." *Sci Rep* 2025;15:32802. [Paper](https://doi.org/10.1038/s41598-025-17820-6)
- Stonko DP, Edwards J, Abdou H, et al. "The underlying cardiovascular mechanisms of resuscitation and injury of REBOA and partial REBOA." *Front Physiol* 2022;13:871073. [Paper](https://doi.org/10.3389/fphys.2022.871073)
- Edwards J, Abdou H, Stonko DP, et al. "Partial vs full resuscitative endovascular balloon occlusion of the aorta (REBOA) in a swine model of raised intracranial pressure and hemorrhagic shock." *J Am Coll Surg* 2023;236(1):241-252. [Paper](https://doi.org/10.1097/XCS.0000000000000403)
- Madurska MJ, Abdou H, Elansary NN, Edwards J, Patel N, Stonko DP, et al. "Whole blood selective aortic arch perfusion for exsanguination cardiac arrest: assessing myocardial tolerance to the duration of cardiac arrest." *Shock* 2022;57(6):243-250. [Paper](https://doi.org/10.1097/SHK.0000000000001946)
- Elansary NN, Stonko DP, Treffalls RN, et al. "Class of hemorrhagic shock is associated with progressive diastolic coronary flow reversal and diminished left ventricular function." *Front Physiol* 2022;13:1033784. [Paper](https://doi.org/10.3389/fphys.2022.1033784)
- Treffalls RN, Stonko DP, Edwards J, et al. "Characterization of the mesenteric circulatory physiology during hemorrhagic shock in a swine model." *Surg Pract Sci* 2022;10:100119. [Paper](https://doi.org/10.1016/j.sipas.2022.100119)
- Stonko DP, Edwards J, Abdou H, et al. "Raising systemic blood pressure to delay irreversible intestinal ischemia in a swine model of proximal superior mesenteric artery occlusion." *J Surg Res* 2024;295:70-80. [Paper](https://doi.org/10.1016/j.jss.2023.09.076)
- Banaskiewicz K, Treffalls R, Wilken S, Stonko DP, et al. "Performance of open versus endovascular approaches in swine modeling of acute mesenteric ischemia." *Vascular* 2026;34(2):351-356. [Paper](https://doi.org/10.1177/17085381251339240)
- Stonko DP, Treffalls RN, Edwards J, et al. "How to TEVAR swine for scientific research: technical, anatomic, and device considerations to translate human TEVAR techniques into the large animal laboratory." *Vascular* 2024;32(4):728-736. [Paper](https://doi.org/10.1177/17085381231162121)
- Stonko DP, Edwards J, Abdou H, et al. "Thoracic endovascular aortic repair acutely augments left ventricular biomechanics in an animal model: a mechanism for postoperative heart failure and hypertension." *Ann Vasc Surg* 2023;97:18-26. [Paper](https://doi.org/10.1016/j.avsg.2023.04.007)
- Stonko DP, Edwards J, Abdou H, et al. "A technical and data analytic approach to pressure-volume loops over numerous cardiac cycles." *JVS Vasc Sci* 2022;3:73-84. [Paper](https://doi.org/10.1016/j.jvssci.2021.12.003)
- Stonko DP, Rousseau MC, Price C, et al. "Technical and analytical approach to biventricular pressure-volume loops in swine including a completely endovascular, percutaneous closed-chest large animal model." *JVS Vasc Sci* 2024;5:100190. [Paper](https://doi.org/10.1016/j.jvssci.2024.100190)
- Gerling KA, Stonko DP, Xun H, et al. "A novel sutureless anastomotic device in a swine model: a proof of concept study." *J Surg Res* 2023;291:116-123. [Paper](https://doi.org/10.1016/j.jss.2023.04.012)
- Treffalls RN, Poe K, Abdou H, Stonko DP, et al. "Exploring intra-arterial contrast administration for intraoperative imaging using a swine model." *Angiology* 2025;76(9):833-840. [Paper](https://doi.org/10.1177/00033197231155225)
- Treffalls RN, Lubas M, Morrison JJ, Stonko DP. "Autologous blood resuscitation for large animals in a research setting using the Hemafuse device: preliminary data of device use for controlled and real-world hemorrhage." *Front Vet Sci* 2022;9:1069420. [Paper](https://doi.org/10.3389/fvets.2022.1069420)

</details>

<hr class="sub">

### Book chapters

- Stonko DP, Black JH III. "Management of aortic arch and arch vessel injuries." In: Mitchell, Farber, Moore, Cox, eds. *Decision Making in Vascular Trauma.* Wolters Kluwer. Expected April 2027.
- Stonko DP, Black JH III. "Vascular reconstruction in oncologic surgery." In: Sidawy, Perler, Harris, eds. *Rutherford's Vascular Surgery and Endovascular Therapy,* 11th ed. Elsevier; 2026.
- Stonko DP, Holscher CM. "Acute limb ischemia: surgical and endovascular treatment." In: Sidawy, Perler, Harris, eds. *Rutherford's Vascular Surgery and Endovascular Therapy,* 11th ed. Elsevier; 2026.
- Stonko DP, Reifsnyder T. "Management of acute mesenteric ischemia." In: Cameron JL, Cameron AM, eds. *Current Surgical Therapy,* 15th ed. Elsevier; 2026.
- Stonko DP, Hicks CW. "When to surgically intervene for claudication?" *Advances in Surgery* 2025;59(1):245-258.
- Stonko DP, Hicks CW. "Current management of intermittent claudication." *Advances in Surgery* 2023;57(1):103-113. [Chapter](https://doi.org/10.1016/j.yasu.2023.04.009)
- Stonko DP, Hicks CW. "Management of ruptured abdominal aortic aneurysms." In: Cameron JL, Cameron AM, eds. *Current Surgical Therapy,* 14th ed. Elsevier; 2022.

<hr>

## Tools

### Automated aortic segmentation and EVAR planner

An open-source MATLAB pipeline that takes a contrast-enhanced CT angiogram, segments the aorta and iliac arteries, finds the visceral branches and access vessels, builds a bifurcated centerline, and produces the measurements used to plan endovascular aneurysm repair.

**Work in progress.** This is under active development and not yet validated. Features, outputs and code will change.

**[Project page](evar-planner/)** &middot; [Source on GitHub](https://github.com/davidstonko/aortic-segmenter-and-surgery-planner)

Research use only. Not a regulated medical device.

### DFWC wound healing calculator

<figure class="paper-cover poster-zoom">
<a href="{{ '/assets/research/dfwc-evs-2026-poster.pdf' | relative_url }}"><img src="{{ '/assets/research/dfwc-evs-2026-poster.jpg' | relative_url }}" alt="Poster: Data Visualization and Prediction of DFU Healing. WIfI component outperforms the composite stage, and more sophisticated models aren't much better. Eastern Vascular Society 2026." width="1400" height="1225" loading="lazy"></a>
<figcaption>Poster, Eastern Vascular Society 40th Annual Meeting, September 2026. <a href="{{ '/assets/research/dfwc-evs-2026-poster.pdf' | relative_url }}">Open the PDF</a>.</figcaption>
</figure>

Estimates the probability that a diabetic foot ulcer heals within 180 days, from four variables available at the first visit, including toe location, University of Texas stage and WIfI wound grade. Developed on 1,141 ulcers from 387 patients at the Johns Hopkins Diabetic Foot and Wound Center and reported per TRIPOD+AI.

**[Open the calculator](https://davidstonko.github.io/dfwc-calc/)** &middot; [Source on GitHub](https://github.com/davidstonko/dfwc-calc)

For research and education only. Not for clinical decision-making.

<div class="clear"></div>

### More code

Everything else is on [GitHub](https://github.com/davidstonko), including the [Claude skills](../skills/).

</div>
