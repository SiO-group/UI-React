# @sio-group/ui-core

![npm](https://img.shields.io/npm/v/@sio-group/ui-core)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A lightweight set of core UI components for React applications.
The package provides reusable building blocks such as buttons, links and loading indicators that can be used across applications or higher-level UI libraries.

The components are designed to be:

* **Composable**
* **Accessible**
* **Framework-agnostic**
* **Minimal and dependency-free**

---

## Features

* 🎨 **Reusable UI primitives** – foundational components for design systems
* ⚡ **Lightweight** – minimal dependencies
* 🧩 **Composable** – use icons, text, or custom content
* ♿ **Accessible** – ARIA attributes and keyboard-friendly
* 🔄 **Loading states** – built-in spinner support
* 🎯 **Flexible styling** – customizable with CSS classes
* 📦 **TypeScript support** – full type definitions included

---

## Installation

```bash
npm install @sio-group/ui-core
```

### Peer dependencies

This package requires:

* `react` ^19.0.0
* `react-dom` ^19.0.0

---

## Styling

Import the core styles before using the components.

```javascript
// All core styling (for best performance)
import "@sio-group/ui-core/sio-core-style.css";

// Styling per component
import "@sio-group/ui-core/sio-button.css";
import "@sio-group/ui-core/sio-link.css";
import "@sio-group/ui-core/sio-pill.css";
```

### Core styles

`sio-core-style.css` contains:

* base CSS variables
* reset and base styles
* shared utility styles

### Component styles

Each component has its own stylesheet.

| File             | Description    |
|------------------|----------------|
| `sio-button.css` | Button styling |
| `sio-link.css`   | Link styling   |
| `sio-pill.css`   | Pill styling   |

This allows projects to import only the styles they need.

---

## Color

The `Color` type is shared across all components that support color theming.

```ts
import { Color } from "@sio-group/ui-core";

type Color = 'default' | 'error' | 'success' | 'warning' | 'caution' | 'info';
```

| Value     | Intent                              |
|-----------|-------------------------------------|
| `default` | Neutral, no semantic meaning        |
| `error`   | Destructive or failed state         |
| `success` | Positive or completed state         |
| `warning` | Potentially problematic state       |
| `caution` | Requires attention, less severe     |
| `info`    | Informational, no action required   |

The `color` prop on `Button`, `Link` and `Pill` all use this type.

---

## Components

This package currently includes:

* **Button**
* **Link**
* **Pill**

---

## Button

A flexible button component for user interaction.

### Example

```tsx
import { Button } from "@sio-group/ui-core";

function Example() {
  return (
    <Button onClick={() => console.log("clicked")}>
      Save
    </Button>
  );
}
```

---

### Loading state

```tsx
<Button loading>
  Processing
</Button>
```

The button automatically becomes disabled while loading.

---

### Button with icon

```tsx
<Button>
  <Icon name="plus" />
  <span>Add item</span>
</Button>
```

---

### Button variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="link">Link style</Button>
```

---

### Button colors

```tsx
<Button color="default">Default</Button>
<Button color="error">Delete</Button>
<Button color="success">Confirm</Button>
<Button color="warning">Warning</Button>
<Button color="caution">Caution</Button>
<Button color="info">Info</Button>
```

---

### Button sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

---

### Block button

```tsx
<Button block>
  Full width button
</Button>
```

---

### Button API

| Prop        | Type                                                                  | Default     | Description                               |
|-------------|-----------------------------------------------------------------------|-------------|-------------------------------------------|
| `type`      | `"button" \| "submit" \| "reset"`                                     | `"button"`  | Button type                               |
| `onClick`   | `(event) => void`                                                     | —           | Click handler                             |
| `variant`   | `"primary" \| "secondary" \| "link"`                                  | `"primary"` | Visual variant                            |
| `color`     | `Color`                                                               | `"default"` | Color theme                               |
| `size`      | `"sm" \| "md" \| "lg"`                                                | `"md"`      | Button size                               |
| `block`     | `boolean`                                                             | `false`     | Full width button                         |
| `loading`   | `boolean`                                                             | `false`     | Displays spinner and disables interaction |
| `disabled`  | `boolean`                                                             | `false`     | Disables the button                       |
| `className` | `string`                                                              | —           | Additional CSS classes                    |
| `ariaLabel` | `string`                                                              | —           | Accessibility label                       |
| `style`     | `React.CSSProperties`                                                 | —           | Inline styles                             |
| `children`  | `ReactNode`                                                           | —           | Button content                            |

---

## Link

A navigation component supporting both internal and external links.

The component can:

* render normal links
* open external URLs
* integrate with custom navigation functions (e.g. routers)

---

### Basic example

```tsx
import { Link } from "@sio-group/ui-core";

<Link to="/dashboard">
  Dashboard
</Link>
```

---

### External link

External links are automatically detected for URLs like:

* `http`
* `https`
* `mailto`
* `tel`
* `ftp`

```tsx
<Link to="https://example.com">
  Visit website
</Link>
```

You can also force it:

```tsx
<Link to="https://example.com" external>
  Visit website
</Link>
```

---

### Router navigation

Use a custom navigation function when integrating with a router.

```tsx
<Link
  to="/settings"
  navigate={(to) => router.navigate(to)}
>
  Settings
</Link>
```

---

### Loading state

```tsx
<Link to="/profile" loading>
  Loading profile
</Link>
```

---

### Link API

| Prop        | Type                   | Default     | Description                    |
|-------------|------------------------|-------------|--------------------------------|
| `to`        | `string`               | —           | Target URL                     |
| `navigate`  | `(to: string) => void` | —           | Optional navigation function   |
| `external`  | `boolean`              | `false`     | Forces external link behaviour |
| `onClick`   | `(event) => void`      | —           | Click handler                  |
| `color`     | `Color`                | `"default"` | Color theme                    |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`      | Link size                      |
| `block`     | `boolean`              | `false`     | Full width link                |
| `loading`   | `boolean`              | `false`     | Displays spinner               |
| `disabled`  | `boolean`              | `false`     | Disables the link              |
| `className` | `string`               | —           | Additional CSS classes         |
| `ariaLabel` | `string`               | —           | Accessibility label            |
| `style`     | `React.CSSProperties`  | —           | Inline styles                  |
| `children`  | `ReactNode`            | —           | Link content                   |

---

## Pill

A compact status indicator for displaying the state or category of an item.

### Example

```tsx
import { Pill } from "@sio-group/ui-core";

function Example() {
  return <Pill status="success" label="Actief" />;
}
```

---

### Pill colors

```tsx
<Pill status="default" label="Onbekend" />
<Pill status="success" label="Actief" />
<Pill status="error"   label="Geblokkeerd" />
<Pill status="warning" label="Vervallen" />
<Pill status="caution" label="In behandeling" />
<Pill status="info"    label="Concept" />
```

---

### Pill API

| Prop     | Type     | Default | Description                    |
|----------|----------|---------|--------------------------------|
| `status` | `Color`  | —       | Color variant of the pill      |
| `label`  | `string` | —       | Text displayed inside the pill |

---

## Accessibility

The components include basic accessibility support:

* `aria-busy` for loading states
* `aria-disabled` for disabled elements
* optional `aria-label` support
* disabled links are removed from keyboard navigation (`tabIndex=-1`)

---

## TypeScript

This package includes full TypeScript definitions.

```ts
import { Button, Link, Pill } from "@sio-group/ui-core";
import type { Color } from "@sio-group/ui-core";
```

---

## Browser Support

Supports all modern browsers that support:

* ES modules
* React 19+

---

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](../../LICENSE) file for details.