# Agentic Greenfield Project Pattern

*Written by Rocky Li — May 2026*

*Content of this document is fully written by hand, with the exception of SVG generation.*

The end goal of this philosophical exercise is to achieve efficient delivery at the same level of quality so that greenfield projects can successfully turn into a production service without excessive risk while still harnessing the power of LLMs.

The cost switch of design, code and reviews means a new method of development is called for to get to the same outcome more efficiently.

<svg xmlns="http://www.w3.org/2000/svg" width="700" height="120" font-family="Arial,sans-serif">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#555"/></marker>
  </defs>
  <rect x="20" y="35" width="180" height="50" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
  <text x="110" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">Initial Design</text>
  <text x="110" y="74" text-anchor="middle" font-size="10" fill="#555">Core contracts</text>
  <line x1="200" y1="60" x2="248" y2="60" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>
  <rect x="250" y="35" width="180" height="50" rx="8" fill="#FFF8E1" stroke="#F57F17" stroke-width="2"/>
  <text x="340" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57F17">Rapid Iteration</text>
  <text x="340" y="74" text-anchor="middle" font-size="10" fill="#555">Build + test loops</text>
  <line x1="430" y1="60" x2="478" y2="60" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>
  <rect x="480" y="35" width="180" height="50" rx="8" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
  <text x="570" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">Final Review</text>
  <text x="570" y="74" text-anchor="middle" font-size="10" fill="#555">Human vetting</text>
  <text x="350" y="110" text-anchor="middle" font-size="11" fill="#888">Three distinct phases — each optimized for a single goal</text>
</svg>

## Initial Design Phase

1. Create a basic behavior baseline of the new feature, focus on absolutely necessary "core" or contract features.

The initial design phase is meant to be foundational — it should focus only on the central promise and overall structure of the feature, and not necessarily the edge cases. Detailed behavior and implementation are refined during the rapid iteration phase.

<svg xmlns="http://www.w3.org/2000/svg" width="500" height="220" font-family="Arial,sans-serif">
  <!-- Funnel shape -->
  <polygon points="100,30 400,30 340,190 160,190" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
  <!-- Labels inside funnel -->
  <text x="250" y="60" text-anchor="middle" font-size="12" fill="#666">Feature requests, edge cases, behaviors</text>
  <text x="250" y="85" text-anchor="middle" font-size="12" fill="#666">Implementation options, APIs</text>
  <line x1="130" y1="100" x2="370" y2="100" stroke="#1976D2" stroke-width="1" stroke-dasharray="4"/>
  <text x="250" y="125" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976D2">Filter down to:</text>
  <text x="250" y="150" text-anchor="middle" font-size="12" fill="#333">Core contracts</text>
  <text x="250" y="170" text-anchor="middle" font-size="12" fill="#333">Overall structure</text>
  <!-- Output arrow -->
  <line x1="250" y1="192" x2="250" y2="212" stroke="#1976D2" stroke-width="2" marker-end="url(#arrow1)"/>
  <defs><marker id="arrow1" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#1976D2"/></marker></defs>
  <text x="250" y="218" text-anchor="middle" font-size="11" font-weight="600" fill="#1976D2">Foundational baseline</text>
</svg>

**Key principle:** Don't design the whole system upfront. Establish the central promise and skeleton — edge cases and detailed behavior emerge from real results during iteration.

## Rapid Iteration Phase

1. Rapidly iterate + build testing framework that allows E2E test in the quickest time.
2. The iteration loop guardrails should be automated, with human review centered on project structure and behavior.
3. Refine design, behavior, implementation as real-life tests come back with results.
4. The largest spend of human attention in this phase is guidance and project structure, with emphasis on simplicity on a global level.

<svg xmlns="http://www.w3.org/2000/svg" width="560" height="260" font-family="Arial,sans-serif">
  <!-- Central loop -->
  <ellipse cx="280" cy="130" rx="160" ry="80" fill="none" stroke="#F57F17" stroke-width="2" stroke-dasharray="6"/>
  <!-- Loop nodes -->
  <rect x="200" y="50" width="160" height="36" rx="6" fill="#FFF8E1" stroke="#F57F17" stroke-width="2"/>
  <text x="280" y="73" text-anchor="middle" font-size="12" font-weight="600" fill="#333">Code (Agent-driven)</text>
  <rect x="370" y="110" width="130" height="36" rx="6" fill="#FFF8E1" stroke="#F57F17" stroke-width="2"/>
  <text x="435" y="133" text-anchor="middle" font-size="12" font-weight="600" fill="#333">E2E Test</text>
  <rect x="200" y="170" width="160" height="36" rx="6" fill="#FFF8E1" stroke="#F57F17" stroke-width="2"/>
  <text x="280" y="193" text-anchor="middle" font-size="12" font-weight="600" fill="#333">Refine Design</text>
  <rect x="60" y="110" width="130" height="36" rx="6" fill="#FFF8E1" stroke="#F57F17" stroke-width="2"/>
  <text x="125" y="133" text-anchor="middle" font-size="12" font-weight="600" fill="#333">Add Guardrail</text>
  <!-- Arrows between nodes (clockwise) -->
  <path d="M360,68 Q400,68 400,110" fill="none" stroke="#F57F17" stroke-width="2" marker-end="url(#arrow2)"/>
  <path d="M435,146 Q435,188 360,188" fill="none" stroke="#F57F17" stroke-width="2" marker-end="url(#arrow2)"/>
  <path d="M200,188 Q125,188 125,146" fill="none" stroke="#F57F17" stroke-width="2" marker-end="url(#arrow2)"/>
  <path d="M125,110 Q125,68 200,68" fill="none" stroke="#F57F17" stroke-width="2" marker-end="url(#arrow2)"/>
  <defs><marker id="arrow2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#F57F17"/></marker></defs>
  <!-- Human role callout -->
  <rect x="170" y="225" width="220" height="28" rx="4" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
  <text x="280" y="244" text-anchor="middle" font-size="11" fill="#E65100">Human focus: structure + simplicity</text>
  <!-- Speed callout -->
  <text x="280" y="22" text-anchor="middle" font-size="11" fill="#888">10s of commits/day — drop and rewrite if broken</text>
</svg>

Rapid iteration phase speaks with results from end-to-end tests — once something works, we add it to automated guardrails to ensure it continues to work. Humans do not vet each line of code; rather, they focus on logic flow and file structures. If something was broken or spaghettified, it can be dropped entirely and rewritten — this time with the learning of what had failed just a few hours ago.

After this phase, the feature should work end-to-end, the design should include edge cases, and the E2E test suite is both created and populated with most of the eventual prod-level service tests.

## Final Review Phase

1. Holistic structure review.
2. Final code quality and security review.

<svg xmlns="http://www.w3.org/2000/svg" width="500" height="200" font-family="Arial,sans-serif">
  <!-- Gate visual -->
  <rect x="50" y="20" width="400" height="160" rx="10" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
  <text x="250" y="45" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">Human Review Gate</text>
  <!-- Checklist items -->
  <rect x="90" y="60" width="20" height="20" rx="3" fill="none" stroke="#2E7D32" stroke-width="2"/>
  <text x="95" y="76" font-size="14" fill="#2E7D32">&#x2713;</text>
  <text x="120" y="76" font-size="12" fill="#333">No spaghetti — clean architecture throughout</text>
  <rect x="90" y="90" width="20" height="20" rx="3" fill="none" stroke="#2E7D32" stroke-width="2"/>
  <text x="95" y="106" font-size="14" fill="#2E7D32">&#x2713;</text>
  <text x="120" y="106" font-size="12" fill="#333">Security review — all inputs validated, no escalation paths</text>
  <rect x="90" y="120" width="20" height="20" rx="3" fill="none" stroke="#2E7D32" stroke-width="2"/>
  <text x="95" y="136" font-size="14" fill="#2E7D32">&#x2713;</text>
  <text x="120" y="136" font-size="12" fill="#333">Human understanding — every module comprehensible</text>
  <rect x="90" y="150" width="20" height="20" rx="3" fill="none" stroke="#2E7D32" stroke-width="2"/>
  <text x="95" y="166" font-size="14" fill="#2E7D32">&#x2713;</text>
  <text x="120" y="166" font-size="12" fill="#333">Operational readiness — no tech debt time bombs</text>
</svg>

In the final review phase, we ensure that all functionality is not on shaky ground or built via spaghetti. While this is guarded to a certain degree in rapid iteration, it is here where humans truly vet all parts of the software including security. In rapid iteration, we prioritize speed and functionality; here, we switch around and prioritize **correctness and human understanding**.

It is too easy to say "All functions work, let's ship." But without the final review, the product is on shaky foundation both on a human and operational/tech debt level.

## Summary

By implementing the product in distinct phases geared towards separate goals, we divide and conquer and use economy of scale for each phase. We focus both LLM and human attention where they are most efficient — one thing at a time. Instead of a classic code review process after each change, we ensure shorter turnaround and higher quality simultaneously.

See also: [Agentic Software Development Philosophy](/blog/post.html?slug=agentic-development-philosophy) — the broader philosophical framework that this pattern lives within.
