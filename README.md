# UX Median Bar Graph

[**LIVE**](https://tomashubelbauer.github.io/ux-median-bar-graph)

This repository is an experiment in implementing a UI control displaying a bar
graph that uses the median of values to determine the maximum value representable
and displays number of multiples of that value above the above the bar in case
the value exceeds the median.

The bar graph is inspired by the one in VSTS / Azure DevOps.

The idea is to find a visual representation that doesn't suffer from squashing
from outliers, but also doesn't cut them off, instead option to switch to textual
representation of the multiples, which is still fast to parse and resolve when
needed.
