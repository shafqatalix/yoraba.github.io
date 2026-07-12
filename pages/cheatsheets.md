---
layout: home
title: Cheatsheets
description: Quick reference guides for developers.
permalink: /cheatsheets/
---

## Cheatsheets

<div class="search-container" style="margin-bottom: 1.5rem;">
  <input type="text" id="cheatsheet-search" placeholder="Search cheatsheets..." style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; background-color: var(--code-bg); color: var(--text); font-size: 1rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s;">
</div>

<style>
  #cheatsheet-search:focus {
    border-color: var(--accent) !important;
    box-shadow: 0 0 0 3px rgba(63, 185, 80, 0.3) !important;
  }
</style>

<ul class="collection-list" id="cheatsheets-list" style="list-style: none; padding: 0;">
{% for sheet in site.cheatsheets %}
  <li class="cheatsheet-item">
    <div class="post-card">
      <div class="post-title"><a href="{{ sheet.url }}">{{ sheet.title }}</a></div>
      <p class="post-desc">{{ sheet.description }}</p>
    </div>
  </li>
{% endfor %}
</ul>

<p id="no-results" style="display: none; color: var(--text-secondary); text-align: center; margin-top: 2rem;">No cheatsheets found matching your search.</p>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('cheatsheet-search');
  const sheetsList = document.getElementById('cheatsheets-list');
  const sheetItems = sheetsList.querySelectorAll('.cheatsheet-item');
  const noResults = document.getElementById('no-results');

  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    let visibleCount = 0;

    sheetItems.forEach(item => {
      const title = item.querySelector('.post-title').textContent.toLowerCase();
      const desc = item.querySelector('.post-desc') ? item.querySelector('.post-desc').textContent.toLowerCase() : '';

      if (title.includes(query) || desc.includes(query)) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  });
});
</script>
