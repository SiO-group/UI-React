# @sio-group/ui-widgets

![npm](https://img.shields.io/npm/v/@sio-group/ui-widgets)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A lightweight collection of dashboard and analytics widgets for React applications.
The package provides reusable data visualization and metric components designed for dashboards, reporting interfaces and operational tooling.

The components are designed to be:

* **Composable**
* **Accessible**
* **Minimal**
* **Framework-agnostic**
* **Easy to theme**

---

## Features

* 📊 **Dashboard widgets** – metric and comparison components
* ⚡ **Lightweight** – minimal dependencies
* 🎨 **Themeable** – token-based color system
* 🧩 **Composable** – icons, labels and custom content support
* ♿ **Accessible** – semantic markup and ARIA support
* 📦 **TypeScript support** – full type definitions included
* 📈 **Analytics-focused** – designed for reporting and KPI interfaces

---

## Installation

```bash
npm install @sio-group/ui-widgets
```

### Peer dependencies

This package requires:

* `react` ^19.0.0
* `react-dom` ^19.0.0

---

## Styling

Import the core widget styles before using the components.

```javascript
// All widget styling
import "@sio-group/ui-widgets/sio-widget-style.css";

// Individual component styles
import "@sio-group/ui-widgets/sio-stat-card.css";
import "@sio-group/ui-widgets/sio-metric-card.css";
import "@sio-group/ui-widgets/sio-compare-card.css";
import "@sio-group/ui-widgets/sio-bar-card.css";
```

---

### Core styles

`sio-widget-style.css` contains:

* shared CSS variables
* layout utilities
* widget spacing tokens
* typography helpers
* shared card styles

---

### Color

The `ColorToken` type is shared across all components supporting semantic color theming.

```typescript
import type { ColorToken } from "@sio-group/ui-widgets";

type ColorToken = 
    | 'default' 
    | 'success' 
    | 'warning' 
    | 'error' 
    | 'primary';
```

| Value      | Intent                      |
|------------|-----------------------------|
| `default`  | 	Neutral appearance         |
| `primary`  | 	Main accent color          |
| `success`  | 	Positive or healthy state  |
| `warning`  | 	Potential issue or caution |
| `error`    | 	Critical or negative state |

Several components also support custom CSS color values.

Examples:

```typescript
color="success"
color="#22c55e"
color="rgb(34, 197, 94)"
color="var(--custom-color)"
```

---

## Components

This package currently includes:

* **StatCard**
* **MetricCard**
* **CompareCard**
* **BarCard**

---

## StatCard

A compact metric card for displaying a single key statistic.

Supports optional:

* icons
* trend indicators
* contextual labels

### Example

```tsx
import { StatCard } from "@sio-group/ui-widgets";

<StatCard
    title="Participation"
    value="82%"
    label="Last 30 days"
    color="success"
/>
```

---

### StatCard API

| Prop      | Type                 | 	Default  | Description               |
|-----------|----------------------|-----------|---------------------------|
| title     | `string`             | —         | Card title                |
| value     | `string` \| `number` | —         | Primary displayed value   |
| label     | `string`             | —         | Optional supporting label |
| icon      | `ReactNode`          | —         | Optional icon             |
| color     | `ColorToken`         | "default" | Color theme               |
| trend     | `Trend`              | —         | Optional trend indicator  |
| className | `string`             | —         | Additional CSS classes    |

---

## Trend example

```tsx
<StatCard
    title="Mood score"
    value="7.8"
    trend={{
        direction: "up",
        value: "+12%",
        label: "vs previous month"
    }}
/>
```

---

## MetricCard

Displays a primary metric with optional supporting statistics.
Ideal for KPI dashboards and analytics interfaces.

---

### Example

```tsx
import { MetricCard } from "@sio-group/ui-widgets";

<MetricCard
    title="Average wellbeing"
    value="7.4"
    unit="/ 10"
    color="primary"
    stats={[
        { value: "82%", label: "Participation" },
        { value: "132", label: "Responses" }
    ]}
/>
```

---

### MetricCard API

| Prop	     | Type	                | Default	   | Description            |
|-----------|----------------------|------------|------------------------|
| title     | `string`             | —          | Metric title           |
| value     | `string` \| `number` | —          | Main displayed value   |
| unit	     | `string`             | —          | Optional value suffix  |
| stats     | `MetricStat[]`       | []         | Supporting statistics  |
| icon      | `ReactNode`          | —          | Optional icon          |
| color     | `ColorToken`         | "default"  | Color theme            |
| className | `string`             | —          | Additional CSS classes |

---

## CompareCard

Displays proportional bars to visually compare multiple values.
Supports both semantic color tokens and custom CSS colors.

---

### Example

```tsx
import { CompareCard } from "@sio-group/ui-widgets";

<CompareCard
    title="Participation by team"
    items={[
        { label: "Team A", value: 82, color: "success" },
        { label: "Team B", value: 61, color: "#f59e0b" },
        { label: "Team C", value: 44, color: "error" }
    ]}
/>
```

---

### CompareCard API

| Prop       | Type            | Default | Description                   |
|------------|-----------------|---------|-------------------------------|
| title      | `string`        | —       | Card title                    |
| items      | `CompareItem[]` | —       | Items displayed in comparison |
| showValues | `boolean`       | true    | Shows numeric values          |
| className  | `string`        | —       | Additional CSS classes        |

---

## BarCard

Displays a progress or completion bar with optional metadata.
Useful for participation, completion or utilization metrics.

---

### Example

```tsx
import { BarCard } from "@sio-group/ui-widgets";

<BarCard
    title="Participation"
    value={82}
    max={100}
    label="82 users"
    caption="Last 30 days"
    color="success"
/>
```

---

#### Explicit percentage

```tsx
<BarCard
    title="Storage usage"
    value={512}
    percentage={72}
    label="512 GB"
/>
```

---

### BarCard API

| Prop	       | Type	         | Default	   | Description                        |
|-------------|---------------|------------|------------------------------------|
| title       | `string`      | —          | Card title                         |
| value       | `number`      | —          | Main numeric value                 |
| max         | `number`      | 100        | Maximum value for percentage calc  |
| percentage  | `number`      | —          | Explicit percentage override       |
| label       | `string`      | —          | Optional footer label              |
| caption     | `string`      | —          | Optional footer caption            |
| color       | `ColorToken`  | "default"  | Color theme                        |
| className   | `string`      | —          | Additional CSS classes             |

---

## Accessibility

The components include accessibility support where appropriate:

* semantic HTML structure
* progressbar support for `BarCard`
* `aria-labels` for trend indicators
* keyboard-friendly interaction patterns
* decorative icons marked with `aria-hidden`

---

### TypeScript

This package includes full TypeScript definitions.

```typescript
import { StatCard, MetricCard, CompareCard, BarCard } from "@sio-group/ui-widgets";
import type { ColorToken, CompareItem } from "@sio-group/ui-widgets";
```

---

## Browser Support

Supports all modern browsers supporting:

* ES modules
* React 19+

---

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](../../LICENSE) file for details.