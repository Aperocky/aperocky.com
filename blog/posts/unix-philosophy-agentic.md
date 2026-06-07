# Unix Philosophy and Agentic Development

*Written by Rocky Li — June 2026*

*This article is fully written by hand*

Unix philosophy has been there for half a century, yet it is more applicable than ever today in the age of LLMs to increase correctness and robustness and long term maintenance cost of software.

## What is Unix Philosophy

The unix philosophy had produced one of the most stable software configurations that have lasted for 4 decades, that are still in use today by humans and agents alike. Most developer are familiar with `ls`, `cat`, `grep`, `echo`, `rm`, and other modular software such as `vi`, `curl`, `top`, and then there are daemons such as `sshd`, `crond`, etc. Together, these are the central pieces of a software that works together as an ecosystem. A stable ecosystem that has worked well, it supported a stable environment where other software ran on for decades.

Each of these software have continued development - but none of them had such significant changes. What allowed this stability is the underlying Unix philosophy that namesaked these software. Each software does one thing and only one thing well, and maintain its public contract with only non-backwards breaking changes. This not only allowed the system to be stable, it also allows it to be customizable to a much larger degree. In AWS, our set of services roughly follow the Unix Philosophy in terms of product, where each offer a specific building block that in turns allow for a custom solution to be built by customer.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 220" width="100%" font-family="Arial,sans-serif">
  <text x="390" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Unix Philosophy: Modular Building Blocks</text>

  <!-- Individual tools -->
  <rect x="30" y="50" width="70" height="40" rx="6" fill="#E3F2FD" stroke="#1976D2" stroke-width="1.5"/>
  <text x="65" y="74" text-anchor="middle" font-size="11" font-weight="600" fill="#1976D2">ls</text>

  <rect x="115" y="50" width="70" height="40" rx="6" fill="#E3F2FD" stroke="#1976D2" stroke-width="1.5"/>
  <text x="150" y="74" text-anchor="middle" font-size="11" font-weight="600" fill="#1976D2">grep</text>

  <rect x="200" y="50" width="70" height="40" rx="6" fill="#E3F2FD" stroke="#1976D2" stroke-width="1.5"/>
  <text x="235" y="74" text-anchor="middle" font-size="11" font-weight="600" fill="#1976D2">cat</text>

  <rect x="285" y="50" width="70" height="40" rx="6" fill="#E3F2FD" stroke="#1976D2" stroke-width="1.5"/>
  <text x="320" y="74" text-anchor="middle" font-size="11" font-weight="600" fill="#1976D2">curl</text>

  <rect x="370" y="50" width="70" height="40" rx="6" fill="#E3F2FD" stroke="#1976D2" stroke-width="1.5"/>
  <text x="405" y="74" text-anchor="middle" font-size="11" font-weight="600" fill="#1976D2">sed</text>

  <rect x="455" y="50" width="70" height="40" rx="6" fill="#E3F2FD" stroke="#1976D2" stroke-width="1.5"/>
  <text x="490" y="74" text-anchor="middle" font-size="11" font-weight="600" fill="#1976D2">cron</text>

  <rect x="540" y="50" width="70" height="40" rx="6" fill="#E3F2FD" stroke="#1976D2" stroke-width="1.5"/>
  <text x="575" y="74" text-anchor="middle" font-size="11" font-weight="600" fill="#1976D2">vi</text>

  <rect x="625" y="50" width="70" height="40" rx="6" fill="#E3F2FD" stroke="#1976D2" stroke-width="1.5"/>
  <text x="660" y="74" text-anchor="middle" font-size="11" font-weight="600" fill="#1976D2">awk</text>

  <!-- Pipe connections -->
  <text x="390" y="115" text-anchor="middle" font-size="11" fill="#666">| pipes | compose into |</text>

  <!-- Composed result -->
  <rect x="140" y="135" width="500" height="50" rx="8" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
  <text x="390" y="158" text-anchor="middle" font-size="12" font-weight="600" fill="#2E7D32">Infinite Compositions — Stable for Decades</text>
  <text x="390" y="175" text-anchor="middle" font-size="10" fill="#555">Each does one thing well • Non-breaking contracts • Composable via stdin/stdout</text>

  <!-- Key principle -->
  <text x="390" y="210" text-anchor="middle" font-size="10" fill="#1565C0" font-weight="600">Stability through modularity — not through monolithic perfection</text>
</svg>

## Unix Philosophy for LLM/Agent

The unix philosophy has proven to work by providing a stable environment and ecosystem of software for other software to run on, and have proven to be remarkable well designed set of software. In the current LLM times, there are one more important new constraint that made Unix Philosophy even more important:

Agents are limited by contexts, and this mean, on complex, interlinked systems, their capability to understand the entire software degrade the larger the software becomes. This makes agents much more capable to work on a ecosystem like this as each piece of the software are separate, modular, and single-purposed. 

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 260" width="100%" font-family="Arial,sans-serif">
  <text x="390" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Context Window vs Software Complexity</text>

  <!-- Monolith side -->
  <rect x="30" y="45" width="330" height="180" rx="10" fill="#FFEBEE" stroke="#C62828" stroke-width="2"/>
  <text x="195" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">Monolith</text>

  <rect x="50" y="80" width="290" height="60" rx="4" fill="#fff" stroke="#E57373" stroke-width="1"/>
  <text x="195" y="105" text-anchor="middle" font-size="10" fill="#333">Interlinked components — 500K+ lines</text>
  <text x="195" y="120" text-anchor="middle" font-size="10" fill="#333">Agent will hold more non-useful context</text>

  <rect x="50" y="155" width="290" height="55" rx="4" fill="#FFCDD2" stroke="#E57373" stroke-width="1"/>
  <text x="195" y="175" text-anchor="middle" font-size="10" font-weight="600" fill="#C62828">Context overflow → hallucination</text>
  <text x="195" y="192" text-anchor="middle" font-size="10" fill="#C62828">Correctness degrades with size</text>

  <!-- Modular side -->
  <rect x="420" y="45" width="330" height="180" rx="10" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
  <text x="585" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">Modular (Unix-style)</text>

  <rect x="440" y="80" width="85" height="40" rx="4" fill="#fff" stroke="#66BB6A" stroke-width="1"/>
  <text x="482" y="104" text-anchor="middle" font-size="9" fill="#333">Module A</text>
  <rect x="540" y="80" width="85" height="40" rx="4" fill="#fff" stroke="#66BB6A" stroke-width="1"/>
  <text x="582" y="104" text-anchor="middle" font-size="9" fill="#333">Module B</text>
  <rect x="640" y="80" width="85" height="40" rx="4" fill="#fff" stroke="#66BB6A" stroke-width="1"/>
  <text x="682" y="104" text-anchor="middle" font-size="9" fill="#333">Module C</text>

  <rect x="440" y="135" width="290" height="75" rx="4" fill="#C8E6C9" stroke="#66BB6A" stroke-width="1"/>
  <text x="585" y="158" text-anchor="middle" font-size="10" font-weight="600" fill="#2E7D32">Agent focuses on ONE module at a time</text>
  <text x="585" y="176" text-anchor="middle" font-size="10" fill="#333">Full context fits → high correctness</text>
  <text x="585" y="194" text-anchor="middle" font-size="10" fill="#333">Changes don't break other modules</text>

  <!-- Arrow between -->
  <text x="390" y="245" text-anchor="middle" font-size="10" fill="#333" font-weight="600">Modularity converts context limits from a blocker into a non-issue</text>
</svg>

## Unix Philosophy for Agentic Harness

Now getting into the implementation part - for agentic harness specifically, I believe this becomes important because there are too many examples to the contrary that have had spectacular rise and falls. I believe a stable agentic harness that have both extensibility into the future, customizability for everyone to work in their own way, and stays out of the way such that the user can focus on the work that harness is doing instead of the harness itself.

The harness should be made of building blocks that forms an ecosystem of which each component of the harness does exactly one thing well. And for this purpose, we should use pre-existing software to the maximal liberty. For instance, my custom harness (hopefully open source soon) consisted of:

* filesystem: On the concept level, each agent gets its own path in the filesystem so it can store context independently.
* tmux: this allow for survivability and addressability and wraps agents runtime.
* claude-code, codex: the coding harness themselves are building block.
* message router: a message routing layer that handles message delivery, status tracking, including delayed delivery.
* RAG store: a small CLI built to allow each agent to build and query its own RAG via sqlite and FTS5, in its own path.
* task CLI: A task management CLI that allows for tracking tasks.
* org manager: A hierarchy and topography defining package that include skills for agent to organize into org trees.

And other people has been able to add packages on top of this ecosystem, or use existing packages to manage connection to slack, etc. This is the definition of an open ecosystem — the harness ecosystem built using unix philosophy is customizable and perhaps more importantly, maintainable.

Many harness today become large bloated software that eats up RAM, creates leaks, almost impossible to debug due to size alone - this is not the case for a harness built with unix philosophy, each component is constrained, small, and eventually arrive at a point where adding feature feels *wrong*. A feature should be a new package, and user can decide whether they want it. That new package would also be doing only that feature, and work with everything else on an optional basis.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 360" width="100%" font-family="Arial,sans-serif">
  <text x="390" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Agentic Harness: Pluggable Ecosystem vs Monolithic Bloat</text>

  <!-- Left: Pluggable ecosystem -->
  <rect x="20" y="40" width="360" height="290" rx="10" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
  <text x="200" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">Pluggable Ecosystem</text>

  <!-- Pieces that plug together -->
  <rect x="40" y="75" width="95" height="38" rx="5" fill="#fff" stroke="#66BB6A" stroke-width="1.5"/>
  <text x="87" y="92" text-anchor="middle" font-size="9" font-weight="600" fill="#2E7D32">tmux</text>
  <text x="87" y="104" text-anchor="middle" font-size="7" fill="#555">survivability</text>

  <rect x="145" y="75" width="95" height="38" rx="5" fill="#fff" stroke="#66BB6A" stroke-width="1.5"/>
  <text x="192" y="92" text-anchor="middle" font-size="9" font-weight="600" fill="#2E7D32">msg router</text>
  <text x="192" y="104" text-anchor="middle" font-size="7" fill="#555">delivery</text>

  <rect x="250" y="75" width="95" height="38" rx="5" fill="#fff" stroke="#66BB6A" stroke-width="1.5"/>
  <text x="297" y="92" text-anchor="middle" font-size="9" font-weight="600" fill="#2E7D32">RAG store</text>
  <text x="297" y="104" text-anchor="middle" font-size="7" fill="#555">memory</text>

  <rect x="40" y="123" width="95" height="38" rx="5" fill="#fff" stroke="#66BB6A" stroke-width="1.5"/>
  <text x="87" y="140" text-anchor="middle" font-size="9" font-weight="600" fill="#2E7D32">task CLI</text>
  <text x="87" y="152" text-anchor="middle" font-size="7" fill="#555">tracking</text>

  <rect x="145" y="123" width="95" height="38" rx="5" fill="#fff" stroke="#66BB6A" stroke-width="1.5"/>
  <text x="192" y="140" text-anchor="middle" font-size="9" font-weight="600" fill="#2E7D32">org manager</text>
  <text x="192" y="152" text-anchor="middle" font-size="7" fill="#555">hierarchy</text>

  <rect x="250" y="123" width="95" height="38" rx="5" fill="#fff" stroke="#66BB6A" stroke-width="1.5"/>
  <text x="297" y="140" text-anchor="middle" font-size="9" font-weight="600" fill="#2E7D32">claude-code</text>
  <text x="297" y="152" text-anchor="middle" font-size="7" fill="#555">coding</text>

  <!-- Plug icon hint -->
  <rect x="250" y="171" width="95" height="38" rx="5" fill="#fff" stroke="#2E7D32" stroke-width="1.5" stroke-dasharray="4"/>
  <text x="297" y="188" text-anchor="middle" font-size="9" font-weight="600" fill="#2E7D32">your pkg</text>
  <text x="297" y="200" text-anchor="middle" font-size="7" fill="#555">plug in</text>

  <!-- Properties -->
  <line x1="40" y1="225" x2="355" y2="225" stroke="#C8E6C9" stroke-width="1"/>
  <text x="200" y="244" text-anchor="middle" font-size="9" fill="#333">✓ Each piece replaceable independently</text>
  <text x="200" y="258" text-anchor="middle" font-size="9" fill="#333">✓ Small, debuggable, no RAM bloat</text>
  <text x="200" y="272" text-anchor="middle" font-size="9" fill="#333">✓ Add features as new packages</text>
  <text x="200" y="286" text-anchor="middle" font-size="9" fill="#333">✓ Users customize by swapping pieces</text>
  <text x="200" y="306" text-anchor="middle" font-size="9" font-weight="600" fill="#2E7D32">Adding a feature feels wrong → make a new pkg</text>

  <!-- Right: Monolithic bloat -->
  <rect x="410" y="40" width="350" height="290" rx="10" fill="#FFEBEE" stroke="#C62828" stroke-width="2"/>
  <text x="585" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">Monolithic Harness</text>

  <!-- Single giant blob -->
  <rect x="440" y="78" width="290" height="130" rx="8" fill="#FFCDD2" stroke="#E57373" stroke-width="1.5"/>
  <text x="585" y="110" text-anchor="middle" font-size="11" font-weight="600" fill="#C62828">One Giant Package</text>
  <text x="585" y="130" text-anchor="middle" font-size="9" fill="#333">messaging + memory + tasks + coding +</text>
  <text x="585" y="144" text-anchor="middle" font-size="9" fill="#333">org + UI + config + plugins + telemetry</text>
  <text x="585" y="162" text-anchor="middle" font-size="9" fill="#333">+ scheduling + auth + state sync + ...</text>
  <text x="585" y="185" text-anchor="middle" font-size="9" font-weight="600" fill="#C62828">All coupled. All in one process.</text>

  <!-- Properties -->
  <line x1="440" y1="225" x2="730" y2="225" stroke="#FFCDD2" stroke-width="1"/>
  <text x="585" y="244" text-anchor="middle" font-size="9" fill="#333">✗ RAM leaks, impossible to debug</text>
  <text x="585" y="258" text-anchor="middle" font-size="9" fill="#333">✗ One bug crashes everything</text>
  <text x="585" y="272" text-anchor="middle" font-size="9" fill="#333">✗ Can't swap components</text>
  <text x="585" y="286" text-anchor="middle" font-size="9" fill="#333">✗ Spectacular rise → spectacular fall</text>
  <text x="585" y="306" text-anchor="middle" font-size="9" font-weight="600" fill="#C62828">Large footprint and maintenance nightmare</text>

  <!-- Bottom summary -->
  <text x="390" y="350" text-anchor="middle" font-size="10" fill="#333" font-weight="600">Build a product from pieces, not a piece that tries to be the product</text>
</svg>

## Unix Philosophy for Agentic Software Development

The same philosophy then applies more broadly beyond harness. While there are talks of how to build harness and skills and prompts to speed up development and make work more efficient. There aren't much talk about making the development themselves more suitable for LLMs and the agents. To me, this is equally important. If the project in questions is one of the many spaghettified monoliths, agent development with the same setup will run into problems that can have multitude or even orders of magnitude poorer result due to context limitations. At a certain point, a project may be unmaintainable by either agents or humans, save for herculian effort on both.

This means, the ideal software project for agent would be:

* Small and independent building blocks that each does one thing well.
* If it cannot be small and independent blocks and must ship as a monolith, a group of components that are almost independent, glued together by a single component that handles routing.

The system designed in this way would ensure that agents are able to focus on the entire context that matter to a problem without breaking other things, and this divide and conquer strategy will return dividend in terms of correctness, and in turn much less churn. The biggest challenge to developing with agents in the present time is difficulty with verification and hallucination. An increase in correctness from 80% to 90% would increase the speed by 2 fold, simply by the nature of where the time consuming part of the work remains.

This concept is not new or only a case for agent or LLM, as Unix Philosophy is around for 50 years. However, this both increases in importance today due to the constraint of LLM, and also with my personal observation that most software, both open source and enterprise, are not following this recommendation, and there are a lot of improvement to be made here, for both new and existing projects.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 280" width="100%" font-family="Arial,sans-serif">
  <text x="390" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">Correctness Dividend from Modular Architecture</text>

  <!-- Left: spaghetti -->
  <rect x="30" y="45" width="230" height="180" rx="10" fill="#FFEBEE" stroke="#C62828" stroke-width="2"/>
  <text x="145" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">Spaghetti Monolith</text>
  <text x="145" y="100" text-anchor="middle" font-size="10" fill="#333">Agent correctness: ~80%</text>
  <text x="145" y="118" text-anchor="middle" font-size="10" fill="#333">Each fix risks breaking others</text>
  <text x="145" y="136" text-anchor="middle" font-size="10" fill="#333">Verification: very hard</text>
  <line x1="60" y1="155" x2="230" y2="155" stroke="#FFCDD2" stroke-width="1"/>
  <text x="145" y="175" text-anchor="middle" font-size="10" font-weight="600" fill="#C62828">Result: constant churn</text>
  <text x="145" y="195" text-anchor="middle" font-size="10" fill="#C62828">Time spent on rework > building</text>

  <!-- Right: modular -->
  <rect x="520" y="45" width="230" height="180" rx="10" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
  <text x="635" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">Modular Components</text>
  <text x="635" y="100" text-anchor="middle" font-size="10" fill="#333">Agent correctness: ~90%+</text>
  <text x="635" y="118" text-anchor="middle" font-size="10" fill="#333">Changes isolated to one module</text>
  <text x="635" y="136" text-anchor="middle" font-size="10" fill="#333">Verification: straightforward</text>
  <line x1="550" y1="155" x2="720" y2="155" stroke="#C8E6C9" stroke-width="1"/>
  <text x="635" y="175" text-anchor="middle" font-size="10" font-weight="600" fill="#2E7D32">Result: 2x speed</text>
  <text x="635" y="195" text-anchor="middle" font-size="10" fill="#2E7D32">80→90% correctness = halved rework</text>

  <!-- Arrow -->
  <line x1="280" y1="135" x2="500" y2="135" stroke="#555" stroke-width="2" marker-end="url(#unixArr)"/>
  <text x="390" y="125" text-anchor="middle" font-size="10" fill="#555">refactor to modular</text>
  <defs>
    <marker id="unixArr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#555"/>
    </marker>
  </defs>

  <text x="390" y="260" text-anchor="middle" font-size="10" fill="#333" font-weight="600">Unix Philosophy is not just cleaner code — it's a force multiplier for agent-driven development</text>
</svg>

See also: [Agentic Software Development Methodology](/blog/post.html?slug=agentic-development-philosophy) for the operational process that applies these principles day-to-day.
