# SiO UI React

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
![version](https://img.shields.io/badge/version-0.1.0-blue)
[![Build Status](https://github.com/SiO-group/ui-react/actions/workflows/webpack.yml/badge.svg)](https://github.com/SiO-group/ui-react/actions/workflows/webpack.yml)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)

[![GitHub stars](https://img.shields.io/github/stars/SiO-group/ui-react?style=social)](https://github.com/SiO-group/ui-react/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SiO-group/ui-react?style=social)](https://github.com/SiO-group/ui-react/forks)
![GitHub last commit](https://img.shields.io/github/last-commit/SiO-group/ui-react)

A lightweight, accessible set of UI components for React applications. Build consistent interfaces with our modular architecture that separates core primitives from specialized components.

## Why SiO UI?

Most UI libraries are monolithic. SiO UI takes a different approach by providing **modular packages** that work together seamlessly but can also be used independently:

- **Start small** with our core primitives
- **Add complexity** when you need it
- **Stay lightweight** by importing only what you use

This separation gives you the flexibility to:
- Use the same core components across different projects
- Extend with specialized components without bloat
- Maintain consistent styling and behavior

## Packages

| Package                                                  | Version                                                           | Description                                                  | Documentation                                |
|----------------------------------------------------------|-------------------------------------------------------------------|--------------------------------------------------------------|----------------------------------------------|
| [**@sio-group/ui-core**](./packages/ui-core)             | ![version](https://img.shields.io/npm/v/@sio-group/ui-core)       | Foundational UI primitives (Button, Link, Pill)              | [README](./packages/ui-core/README.md)       |
| [**@sio-group/ui-modal**](./packages/ui-modal)           | ![version](https://img.shields.io/npm/v/@sio-group/ui-modal)      | Flexible modal component with Confirmation dialog            | [README](./packages/ui-modal/README.md)      |
| [**@sio-group/ui-card**](./packages/ui-card)             | ![version](https://img.shields.io/npm/v/@sio-group/ui-card)       | Flexible and accessible card component                       | [README](./packages/ui-card/README.md)       |
| [**@sio-group/ui-pagination**](./packages/ui-pagination) | ![version](https://img.shields.io/npm/v/@sio-group/ui-pagination) | Standalone pagination component with page window             | [README](./packages/ui-pagination/README.md) |
| [**@sio-group/ui-datatable**](./packages/ui-datatable)   | ![version](https://img.shields.io/npm/v/@sio-group/ui-datatable)  | Full-featured datatable with client- and server-side support | [README](./packages/ui-datatable/README.md)  |

## Quick Start

Choose your entry point based on your needs:

### 🚀 I want a complete UI solution

```bash
npm install @sio-group/ui-core @sio-group/ui-modal @sio-group/ui-card @sio-group/ui-pagination @sio-group/ui-datatable
```

```tsx
import { Button } from '@sio-group/ui-core';
import { Modal } from '@sio-group/ui-modal';
import { Card } from '@sio-group/ui-card';
import { DataTable } from '@sio-group/ui-datatable';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <Card title="Demo Card" addShadow>
        <p>This is awesome content</p>
      </Card>

      <Modal show={open} close={() => setOpen(false)} title="Welcome">
        <p>This is a complete UI solution!</p>
      </Modal>

      <DataTable
        columns={columns}
        data={rows}
        clientPageSize={20}
        clientSearchKeys={['name', 'email']}
      />
    </>
  );
}
```

### 🔧 I only need core primitives

```bash
npm install @sio-group/ui-core
```

```tsx
import { Button, Link, Pill } from '@sio-group/ui-core';

function MyComponent() {
  return (
    <div>
      <Button variant="primary" onClick={handleClick}>
        Click me
      </Button>
      <Link to="/dashboard">
        Go to Dashboard
      </Link>
      <Pill status="success" label="Actief" />
    </div>
  );
}
```

### 🎯 I need advanced components

```bash
npm install @sio-group/ui-modal
```

```tsx
import { Modal, Confirmation } from '@sio-group/ui-modal';
import { Button } from '@sio-group/ui-core';

function MyModal() {
  return (
    <Modal show={isOpen} close={onClose} size="lg">
      <Modal.Header showClose close={onClose}>
        <h2>Custom Header</h2>
      </Modal.Header>
      <Modal.Body>
        Your content here
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
```

### 📄 I need a datatable

```bash
npm install @sio-group/ui-datatable
```

```tsx
import { DataTable } from '@sio-group/ui-datatable';

// Client-side — full dataset, filtering and pagination handled internally
<DataTable
  columns={columns}
  data={allUsers}
  clientPageSize={20}
  clientSearchKeys={['name', 'email']}
/>

// Server-side — paginated data, delegates search/sort/paginate to parent
<DataTable
  columns={columns}
  data={pagedUsers}
  pagination={meta}
  onPaginate={(page) => fetchPage(page)}
  onSearch={(query) => setSearch(query)}
  onSort={(sort) => setSort(sort)}
/>
```

## Architecture

```
           ┌─────────────────┐
           │    ui-core      │
           │  (primitives)   │
           │ Button          │
           │ Link            │
           │ Pill            │
           └────────┬────────┘
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────────┐
│ ui-modal │  │ ui-card  │  │ui-pagination │
│          │  │          │  │              │
│ Modal    │  │ Card     │  │ Pagination   │
│ Confirm  │  │          │  │              │
└──────────┘  └──────────┘  └──────┬───────┘
                                   │
                            ┌──────▼───────┐
                            │ ui-datatable │
                            │              │
                            │  DataTable   │
                            └──────────────┘
```

### Package Relationships

- **@sio-group/ui-core** — no internal dependencies, foundational components
- **@sio-group/ui-modal** — depends on `ui-core` for buttons and links
- **@sio-group/ui-card** — depends on `ui-core` for buttons and links
- **@sio-group/ui-pagination** — no internal dependencies
- **@sio-group/ui-datatable** — depends on `ui-core` and `ui-pagination`

## Key Features

- Modular architecture (primitives + composites)
- Full TypeScript support
- Accessible by design (ARIA, keyboard navigation)
- Two APIs per component (props-based and composition)
- Tree-shakable packages
- Minimal dependencies
- Client-side and server-side datatable support

## Styling

Each package includes its own CSS:

```js
import "@sio-group/ui-core/sio-core-style.css";
import "@sio-group/ui-core/sio-button.css";
import "@sio-group/ui-core/sio-link.css";
import "@sio-group/ui-core/sio-pill.css";
import "@sio-group/ui-modal/sio-modal-style.css";
import "@sio-group/ui-card/sio-card-style.css";
import "@sio-group/ui-pagination/sio-pagination-style.css";
import "@sio-group/ui-datatable/sio-datatable-style.css";
```

## Development

```bash
# Clone the repository
git clone https://github.com/sio-group/ui-react
cd ui-react

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests for all packages
npm test

# Run tests in watch mode
npm run test:watch

# Lint all packages
npm run lint

# Type-check all packages
npm run typecheck

# Start demo application
npm run demo
```

### Workspace Structure

```
ui-react/
├── packages/
│   ├── ui-core/         # Core UI primitives — Button, Link, Pill
│   ├── ui-modal/        # Modal and Confirmation components
│   ├── ui-card/         # Card component
│   ├── ui-pagination/   # Pagination component
│   ├── ui-datatable/    # DataTable component
│   └── demo/            # Example application
└── package.json         # Workspace root
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Setting up the development environment
- Coding standards
- Pull request process
- Release process

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](./LICENSE) file for details.

---

Made with ❤️ by the SiO Solutions Team