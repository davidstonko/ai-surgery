---
layout: default
title: "Collaborate: the wire-stiffening problem"
description: "I am looking for an applied mathematician and machine learning engineers to work on predicting how a stiff guidewire deforms the aorta and iliac arteries."
head_title: "Collaborate on the wire-stiffening problem | David Stonko, MD, MS"
---
# Collaborate on the wire-stiffening problem

<p class="lede">A stiff guidewire changes the anatomy before the stent graft goes in. I want to predict that change from the preoperative CT, and I am looking for collaborators.</p>

<div class="prose" markdown="1">

## The problem

Aortic stent grafts are planned on a CT taken with nothing in the patient. During the case a stiff wire straightens the iliac arteries and shifts the aorta, so the graft is deployed into different anatomy. When a fenestration has to line up with a branch, millimeters matter.

I model the vessel centerline and the wire as curves of frames in SE(3). When the surgeon lets go, the wire and vessel settle into the configuration of least elastic energy with the wire inside the lumen. A paper in preparation proves that this equilibrium exists and works out its mechanics. The next steps need people with expertise I do not have.

## Who I am looking for

**An applied mathematician interested in linear and matrix algebra.** The open questions sit in the Hessians and KKT systems of the discretized problem. They include its zero-energy modes, constraint qualification at contact, the multiplier rule in three dimensions, and adding torque and precurved wires, where the rotational part of SE(3) carries the physics.

**Machine learning engineers interested in surgery.** The longer goal is anatomy-informed neural networks. These are models that predict the deformed anatomy from the preoperative CT, with anatomic facts built into the architecture or the loss, and that learn from routine angiograms. The work includes SE(3)-equivariant models and learning tissue parameters from the projected wire shape.

## What I bring

I am a vascular surgeon. I bring the clinical problem, the surgical judgment about which errors matter, and a working MATLAB implementation of the mechanics.

## Read more

- [Preprint on arXiv](https://arxiv.org/abs/2608.21332)
- [Research page](../research/)

## Get in touch

Email [contact@localminimum.us](mailto:contact@localminimum.us?subject=Collaboration%3A%20wire-stiffening%20problem) with a few lines on your background and what interests you.

</div>
