---
layout: home
title: Cheatsheets
description: Quick reference guides for developers.
permalink: /cheatsheets/
---

## Cheatsheets

<ul class="collection-list">
{% for sheet in site.cheatsheets %}
  <li>
    <div class="post-card">
      <div class="post-title"><a href="{{ sheet.url }}">{{ sheet.title }}</a></div>
      <p class="post-desc">{{ sheet.description }}</p>
    </div>
  </li>
{% endfor %}
</ul>
