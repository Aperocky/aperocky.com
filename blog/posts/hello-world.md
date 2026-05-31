# Hello World

This is the first blog post, rendered from a `.md` file via JavaScript.

## Markdown features

You can write **bold**, _italic_, `inline code`, and [links](https://github.com/Aperocky).

### Code block

```python
def greet(name):
    return f"Hello, {name}!"
```

### Lists

- Item one
- Item two
- Item three

## Inline SVG

Here is an SVG diagram rendered directly from the markdown:

<svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="40" rx="6" fill="#005" />
  <text x="50" y="35" font-size="13" fill="white" text-anchor="middle" font-family="Helvetica">Input</text>
  <line x1="90" y1="30" x2="120" y2="30" stroke="#333" stroke-width="2" marker-end="url(#arrow)" />
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#333" />
    </marker>
  </defs>
  <rect x="120" y="10" width="70" height="40" rx="6" fill="#550000" />
  <text x="155" y="35" font-size="13" fill="white" text-anchor="middle" font-family="Helvetica">Output</text>
</svg>

The SVG above is written as raw HTML inside the `.md` file — no extra processing needed.
