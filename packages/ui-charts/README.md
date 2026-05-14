# @sio-group/ui-charts

![npm](https://img.shields.io/npm/v/@sio-group/ui-charts)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

The charts package provides lightweight and composable data visualizations for dashboards, analytics interfaces and reporting tools.

All charts are:

* 🎨 **Themeable** – supports semantic color tokens and custom CSS colors
* ⚡ **Lightweight** – pure React + SVG/CSS
* ♿ **Accessible** – semantic labels and keyboard-safe rendering
* 📦 **TypeScript-first** – fully typed APIs
* 🧩 **Composable** – designed for design systems and dashboard layouts
* 📱 **Responsive** – scales to container width

---

## Installation

```bash
npm install @sio-group/ui-widgets
```

## Peer dependencies

This package requires:

* `react` ^19.0.0
* `react-dom` ^19.0.0

---

## Styling

Import the chart styles before using the components.

```javascript
// All widget styling
import "@sio-group/ui-widgets/sio-widgets-style.css";

// Individual chart styles
import "@sio-group/ui-widgets/sio-bar-chart.css";
import "@sio-group/ui-widgets/sio-line-chart.css";
import "@sio-group/ui-widgets/sio-donut-chart.css";
import "@sio-group/ui-widgets/sio-gauge-chart.css";
import "@sio-group/ui-widgets/sio-stacked-bar.css";
```

---

## Components

This package currently includes:

* **BarChart**
* **DonutChart**
* **GaugeChart**
* **LineChart**
* **StackedBar**

---

## BarChart

Displays vertical bar charts with support for:

* simple bars
* grouped bars
* stacked bars

---

### Example

```tsx
import { BarChart } from "@sio-group/ui-widgets";

<BarChart 
    title="Participation" 
    labels={["Mon", "Tue", "Wed"]} 
    series={[
        {
            label: "Users", 
            values: [12, 18, 9], 
            color: "success"
        }
        ]}
/>
```

---

### Variants

#### Simple

```tsx
<BarChart variant="simple" />
```

### Grouped

```tsx
<BarChart variant="grouped" />
```

### Stacked

```tsx
<BarChart variant="stacked" />
```

---

### BarChart API

| Prop       | Type                                     | Default | Description            |
|------------|------------------------------------------|---------|------------------------|
| title      | `string`                                 | —       | Optional chart title   |
| labels     | `string[]`                               | —       | X-axis labels          |
| series     | `BarSeries[]`                            | —       | Data series            |
| maxValue   | `number`                                 | auto    | Fixed maximum Y-axis   |
| variant    | `"simple"` \| `"grouped"` \| `"stacked"` | auto    | Chart variant          |
| height     | `number`                                 | 140     | Chart height in px     |
| showValues | `boolean`                                | false   | Displays values        |
| showLegend | `boolean`                                | true    | Displays legend        |
| className  | `string`                                 | —       | Additional CSS classes |

---

## DonutChart

Displays proportional data distribution using circular SVG segments.

---

### Example

```tsx
import { DonutChart } from "@sio-group/ui-widgets";

<DonutChart 
    title="Status distribution" 
    slices={[
        { label: "Success", value: 72, color: "success" },
        { label: "Warning", value: 18, color: "warning" },
        { label: "Error", value: 10, color: "danger" },
    ]}
/>
```

---

### DonutChart API

| Prop           | Type            | Default  | Description            |
|----------------|-----------------|----------|------------------------|
| title          | `string`        | —        | Optional chart title   |
| slices         | `DonutSlice[]`  | —        | Chart segments         |
| radius         | `number`        | 52       | Donut radius           |
| thickness      | `number`        | 18       | Ring thickness         |
| centerLabel    | `string`        | total    | Center label           |
| centerSublabel | `string`        | "totaal" | Center sublabel        |
| showLegend     | `boolean`       | true     | Displays legend        |
| className      | `string`        | —        | Additional CSS classes |

---

## GaugeChart

Displays a semi-circular gauge with:

* animated progress arc
* directional needle
* configurable ranges

---

### Example

```tsx
import { GaugeChart } from "@sio-group/ui-widgets";

<GaugeChart
    title="Wellbeing"
    value={72}
    min={0}
    max={100}
    color="success"
    unit="%"
/>
```

---

### GaugeChart API

| Prop        | Type         | Default   | Description            |
|-------------|--------------|-----------|------------------------|
| title       | `string`     | —         | Optional chart title   |
| value       | `number`     | —         | Current value          |
| min         | `number`     | 0         | Minimum value          |
| max         | `number`     | 100       | Maximum value          |
| color       | `ColorValue` | "default" | Gauge color            |
| unit        | `string`     | ""        | Unit suffix            |
| centerLabel | `string`     | computed  | Custom center label    |
| size        | `number`     | 180       | SVG size               |
| thickness   | `number`     | 16        | Arc thickness          |
| className   | `string`     | —         | Additional CSS classes |

---

## LineChart

Displays responsive trend visualizations with support for:

* multiple series
* filled areas
* interactive tooltips
* grid lines
* point markers

---

### Example

```tsx
import { LineChart } from "@sio-group/ui-widgets";

<LineChart
    title="Mood evolution"
    labels={["Mon", "Tue", "Wed", "Thu"]}
    minValue={0}
    maxValue={10}
    series={[
        {
        label: "Mood",
        values: [6, 7, 5, 8],
        color: "info",
        fill: true
        }
    ]}
/>
```

---

### LineChart API

| Prop      | Type           | Default | Description            |
|-----------|----------------|---------|------------------------|
| title     | `string`       | —       | Optional chart title   |
| labels    | `string[]`     | —       | X-axis labels          |
| series    | `LineSeries[]` | —       | Data series            |
| minValue  | `number`       | auto    | Fixed minimum Y-axis   |
| maxValue  | `number`       | auto    | Fixed maximum Y-axis   |
| height    | `number`       | 120     | SVG height             |
| gridLines | `number`       | 4       | Grid line count        |
| showDots  | `boolean`      | true    | Displays point markers |
| className | `string`       | —       | Additional CSS classes |

---

## StackedBar

Displays proportional horizontal distribution using stacked segments.

---

### Example

```tsx
import { StackedBar } from "@sio-group/ui-widgets";

<StackedBar
    title="Response breakdown"
    segments={[
        { label: "Positive", value: 62, color: "success" },
        { label: "Neutral", value: 24, color: "warning" },
        { label: "Negative", value: 14, color: "danger" },
    ]}
/>
```

---

### StackedBar API

| Prop            | Type                  | Default | Description            |
|-----------------|-----------------------|---------|------------------------|
| title           | `string`              | —       | Optional title         |
| segments        | `StackedBarSegment[]` | —       | Bar segments           |
| height          | `number`              | 24      | Bar height in px       |
| showLegend      | `boolean`             | true    | Displays legend        |
| showPercentages | `boolean`             | true    | Displays percentages   |
| className       | `string`              | —       | Additional CSS classes |

---

## Accessibility

The charts include accessibility support where applicable:

* semantic `role="img"`
* descriptive `aria-label`
* tooltip-safe interactions
* keyboard-safe rendering

---

## TypeScript

All components include full TypeScript definitions.

```typescript
import {
    BarChart,
    DonutChart,
    GaugeChart,
    LineChart,
    StackedBar,
} from "@sio-group/ui-widgets";
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