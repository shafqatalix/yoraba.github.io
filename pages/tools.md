---
layout: home
title: Tools
description: Developer tools for everyday tasks.
permalink: /tools/
---

## Tools

<ul class="collection-list">
{% for tool in site.tools %}
  <li>
    <div class="post-card">
      <div class="post-title"><a href="{{ tool.url }}">{{ tool.title }}</a></div>
      <p class="post-desc">{{ tool.description }}</p>
    </div>
  </li>
{% endfor %}
</ul>
