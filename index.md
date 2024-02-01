---
layout: home
---

<ul style="list-style-type: none;">
      {% for article in site.posts %}
      <li>
        <article style="border-bottom: solid 1px #eff0f1;margin-bottom: 10px;padding-bottom: 10px;">
          <div>
            <div>
              <div>
              <div>
              <div style="font-size:14px;color:gray;">{{ article.date | date: "%-d %B %Y" }}</div>
              </div>
                <div>
                  <h2 style="margin: 0;"><a href="{{article.url}}">{{article.title}}</a></h2>
                </div>
                <div>{{article.description}}</div>
              </div>
              <div><a aria-label="{{article.description}}" href="{{article.url}}">Read more →</a></div>
            </div>
          </div>
        </article>

      </li>
      {% endfor %}
    </ul>

 

 
 

 