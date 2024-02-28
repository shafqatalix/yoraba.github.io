---
title: Count Sort algorithm
date: 2024-02-26
tags: ["sorting"]
published: true
description: Count sort algorithm simplified
layout: post
permalink: /count-sort
---

## Count Sort

This is the simplified version of count sort algorithm

- Find maximum number from input
- Create new array of size Max + 1 and call it counts
- Initialize each element of counts array to zero
- Iterate over the original input array and recode the occurrences of each element into counts array.
- Accumulate each element by adding pervious values of counts
- Iterate over original array from end, find the index in accumulated array and store the value in output array as following

{% include image.html file="images/count-sort.svg" max-width="120%"  alt="Count Sort algorithm diagram" caption="Count Sort algorithm" %}

### Solution - Javascript

{% include image.html file="images/count-sort-javascript.svg" max-width="100%"  alt="Count Sort algorithm diagram" caption="Count Sort algorithm" %}
