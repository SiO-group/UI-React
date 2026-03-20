# @sio-group/ui-pagination

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
![npm](https://img.shields.io/npm/v/@sio-group/ui-pagination)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)

A flexible and accessible pagination component for React applications.
Supports page-window rendering with ellipsis, result range info, and full keyboard accessibility — with no dependencies beyond React.

---

## Features

* 🔢 **Smart page window** – Shows a configurable window of pages around the current page with ellipsis
* ♿ **Accessible** – Full `aria-label` support and semantic markup
* 🎨 **Custom styling** – Supports custom classes and inline styles
* 🔧 **Composable** – Use the `windowSize` utility to build your own UI
* 📦 **Zero dependencies** – No third-party pagination library required

---

## Installation

```bash
npm install @sio-group/ui-pagination
```

### Peer dependencies

This package requires:

* `react` ^19.0.0
* `react-dom` ^19.0.0

---

## Quick Example

```tsx
import { Pagination } from "@sio-group/ui-pagination";

function Example() {
    return (
        <Pagination
            from={1}
            to={20}
            total={240}
            pageCount={12}
            currentPage={1}
            onPaginate={(page) => fetchPage(page)}
        />
    );
}
```

---

## Styling

Import the base pagination styles:

```js
import "@sio-group/ui-pagination/sio-pagination-style.css";
```

---

## Basic Usage

```tsx
import { Pagination } from "@sio-group/ui-pagination";

function App() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Pagination
            from={1}
            to={20}
            total={240}
            pageCount={12}
            currentPage={currentPage}
            onPaginate={setCurrentPage}
        />
    );
}
```

This renders a full pagination bar:

```
1 - 20 van 240     ‹ vorige  [1] [2] [3] ... [12]  volgende ›
```

---

## API Reference

### Pagination Props

| Prop          | Type                      | Default | Description                                        |
|---------------|---------------------------|---------|----------------------------------------------------|
| `currentPage` | `number`                  | —       | The currently active page (1-based)                |
| `pageCount`   | `number`                  | —       | Total number of pages                              |
| `from`        | `number`                  | —       | First item of the current page                     |
| `to`          | `number`                  | —       | Last item of the current page                      |
| `total`       | `number`                  | —       | Total number of items across all pages             |
| `onPaginate`  | `(page: number) => void`  | —       | Called with the new page number on navigation      |
| `windowSize`  | `number`                  | `2`     | Number of pages shown left and right of current    |
| `className`   | `string`                  | —       | Additional CSS classes for the pagination wrapper  |
| `style`       | `CSSProperties`           | —       | Inline styles for the pagination wrapper           |

---

## Window Size

The `windowSize` prop controls how many page buttons are shown around the current page.

```tsx
// Default (windowSize=2): 1 ... 4 5 [6] 7 8 ... 24
<Pagination windowSize={2} ... />

// Compact (windowSize=1): 1 ... 5 [6] 7 ... 24
<Pagination windowSize={1} ... />
```

This is useful for adapting the pagination to different screen sizes or container widths.

---

## TypeScript

This package includes full TypeScript definitions.

```ts
import { Pagination, PaginationProps, getPaginationWindow, PageItem } from "@sio-group/ui-pagination";
```

---

## Browser Support

This package supports all modern browsers that support:

* ES6 modules
* React 19

---

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](../../LICENSE) file for details.