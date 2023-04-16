---
static: true
template: post
type: post
author: Paillat
image: https://source.unsplash.com/random/?sample
title: Sample Article in Markdown
---
# Sample Article in Markdown
<img src="<!-- image -->" alt="post main image" class="post-main-image">
This is a sample article in Markdown that showcases various Markdown syntax.

## Headers

Headers are created using one or more # symbols. The number of # symbols indicates the level of the header.

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

## Emphasis

Emphasis can be added using *asterisks* or _underscores_.

This is *italic* and this is **bold**.

## Links

Links are created using square brackets and parentheses.

[Visit GitHub!](https://github.com)

## Images

Images can be included using the syntax `![Alt text](image URL "caption")`.

![Sample image from Unsplash](https://source.unsplash.com/random/?nature "Sample image from Unsplash")

## Code Blocks

Code blocks can be included using triple backticks.

```python
def hello_world():
    print("Hello, world!")
    
hello_world()
```

```javascript
function helloWorld() {
  console.log("Hello, world!");
}

helloWorld();
```


Inline code blocks can be included using single backticks, like `this`.

To escape code blocks within code blocks, use a backslash before the backticks, like this: \`\`\`.

## Lists

Lists can be ordered or unordered.

### Unordered

- Item 1
- Item 2
- Item 3

### Ordered

1. Item 1
2. Item 2
3. Item 3

## Tables

Tables can be created using pipes and dashes.

| Name  | Age | Gender |
|-------|-----|--------|
| John  | 25  | Male   |
| Sarah | 31  | Female |

## Blockquotes

Blockquotes are created using the `>` symbol.

> This is a blockquote.

That's all for this sample article in Markdown!

To include images from Unsplash's API, replace `QUERY_HERE` in the image URL with a search query. For example, to include a random image of nature, use `https://source.unsplash.com/random/?nature`.
