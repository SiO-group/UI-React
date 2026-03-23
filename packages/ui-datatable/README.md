# @sio-group/ui-datatable

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
![npm](https://img.shields.io/npm/v/@sio-group/ui-datatable)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)

A flexible and accessible datatable component for React applications.
Supports both client-side and server-side data handling through a single unified API.

---

## Features

* 🔄 **Client-side & server-side** – one component for both local and API-driven data
* 🔍 **Search** – built-in search bar, client-side filtering or server-side delegation
* ↕️ **Sorting** – per-column sort with custom sort icons
* 📄 **Pagination** – via `@sio-group/ui-pagination`
* ✏️ **Inline editing** – editable cells with text input and select support
* 🎯 **Action menu** – inline or dropdown row actions, fully controlled by the consumer
* 🎨 **Custom styling** – supports custom classes and inline styles
* ♿ **Accessible** – ARIA attributes on sort controls and search input
* 📦 **TypeScript** – full generic type support

---

## Installation

```bash
npm install @sio-group/ui-datatable
```

### Peer dependencies

This package requires:

* `react` ^19.0.0
* `react-dom` ^19.0.0

### Dependencies

This package includes:

* `@sio-group/ui-pagination`
* `@sio-group/ui-core`

---

## Styling

```js
import "@sio-group/ui-datatable/sio-datatable-style.css";
import "@sio-group/ui-core/sio-core-style.css";
import "@sio-group/ui-pagination/sio-pagination-style.css";
```

---

## Quick Example

```tsx
import { DataTable } from "@sio-group/ui-datatable";

interface User {
    id: number;
    name: string;
    email: string;
}

const columns = [
    { name: 'name',  label: 'Naam',   sort: true },
    { name: 'email', label: 'E-mail', format: 'email' as const },
];

function Example() {
    return (
        <DataTable<User>
            columns={columns}
            data={users}
            clientPageSize={20}
            clientSearchKeys={['name', 'email']}
        />
    );
}
```

---

## Client-side vs Server-side

The datatable has two modes. The mode is determined automatically based on the props you provide — there is no explicit `mode` prop.

|                 | Client-side             | Server-side               |
|-----------------|-------------------------|---------------------------|
| Data            | Full dataset via `data` | Current page via `data`   |
| Pagination info | Calculated internally   | Provided via `pagination` |
| Search          | Filtered internally     | Delegated via `onSearch`  |
| Sort            | Sorted internally       | Delegated via `onSort`    |

### Client-side

Pass the full dataset via `data`. The datatable handles filtering, sorting and pagination internally.

```tsx
<DataTable<User>
    columns={columns}
    data={allUsers}
    clientPageSize={20}
    clientSearchKeys={['name', 'email']}
/>
```

- **Search** is shown when `clientSearchKeys` is provided.
- **Pagination** is shown when `clientPageSize` is provided.
- **Sorting** is active per column when `column.sort` is `true`.

### Server-side

Pass the current page of data via `data` and provide a `pagination` object with the metadata from your API response. The datatable delegates search, sort and pagination back to you via callbacks.

```tsx
<DataTable<User>
    columns={columns}
    data={pagedUsers}
    pagination={{
        currentPage: 1,
        pageCount: 12,
        total: 240,
        from: 1,
        to: 20,
    }}
    onPaginate={(page) => fetchPage(page)}
    onSearch={(query) => setSearch(query)}
    onSort={(sort) => setSort(sort)}
    searchValue={search}
    sortValue={sort}
/>
```

- **Search** is shown when `onSearch` is provided.
- **Pagination** is shown when `onPaginate` is provided.
- **Sorting** is active per column when `column.sort` is `true`.

---

## Action Menu

Row actions are fully controlled by the consumer via `onClick`. The datatable has no knowledge of navigation, deletion or confirmation dialogs.

```tsx
const actionMenu = {
    type: 'dropdown' as const,
    actions: [
        {
            name: 'detail',
            label: 'Bekijken',
            icon: <EyeIcon />,
            onClick: (item) => navigate(`/users/${item.id}`),
        },
        {
            name: 'edit',
            label: 'Wijzigen',
            icon: <PencilIcon />,
            onClick: (item) => navigate(`/users/${item.id}/wijzigen`),
        },
        {
            name: 'delete',
            label: 'Verwijderen',
            icon: <TrashIcon />,
            onClick: (item) => setConfirmItem(item),
        },
    ],
};

<DataTable<User>
    columns={columns}
    data={users}
    actionMenu={actionMenu}
    renderMenuIcon={() => <EllipsisIcon />}
/>
```

The `type` prop controls how the actions are rendered:

| `type`       | Description                                  |
|--------------|----------------------------------------------|
| `'inline'`   | All action buttons shown directly in the row |
| `'dropdown'` | Actions hidden behind a trigger button       |

---

## Inline Editing

Mark columns as editable by providing a `formFields` array. Each entry maps a column by `name` to an input type.

```tsx
const formFields = [
    { name: 'name', type: 'text', required: true },
    {
        name: 'status',
        type: 'select',
        options: [
            { label: 'Actief', value: 'active' },
            { label: 'Inactief', value: 'inactive' },
        ],
    },
];

<DataTable<User>
    columns={columns}
    data={users}
    formFields={formFields}
    onUpdate={(id, values) => updateUser(id, values)}
/>
```

An edit icon appears next to the cell value. Clicking it opens an input. Changes are confirmed with ✓ or cancelled with ✗. Pressing `Escape` also cancels the edit.

`onUpdate` is called with the row `id` and a partial object containing the changed field:

```
onUpdate={(id, values) => {
    // id: 1
    // values: { name: 'Sophia' }
}}
```

---

## Column Formats

The `format` prop on a column controls how the cell value is rendered.

| `format`          | Input type                         | Renders                                            |
|-------------------|------------------------------------|----------------------------------------------------|
| `'date'`          | `string \| Date`                   | Localized date (`nl-BE`)                           |
| `'datetime'`      | `string \| Date`                   | Localized date + time (`nl-BE`)                    |
| `'boolean'`       | `boolean`                          | Clickable ✓/✗, calls `onUpdate`                    |
| `'button'`        | `boolean`                          | Same as boolean, rendered as a primary button      |
| `'pill'`          | `{ status: Color, label: string }` | `<Pill>` from `@sio-group/ui-core`                 |
| `'email'`         | `string`                           | `mailto:` link                                     |
| `{ key: string }` | `object \| object[]`               | Renders the value of the given key from the object |
| _(none)_          | `string \| number`                 | Raw value                                          |

For objects and arrays without a `format`, all key-value pairs are rendered stacked.

```
// Render only the `name` key from an object or array of objects
{ name: 'role', label: 'Rol', format: { key: 'name' } }
```

---

## Sort Icons

Provide a custom sort icon via `renderSortIcon`:

```
<DataTable
    ...
    renderSortIcon={(direction, active) => (
        <MyIcon
            name={direction === 'asc' ? 'sort-up' : 'sort-down'}
            style={{ opacity: active ? 1 : 0.3 }}
        />
    )}
/>
```

---

## API Reference

### DataTable Props

| Prop               | Type                                                       | Default           | Description                                                                |
|--------------------|------------------------------------------------------------|-------------------|----------------------------------------------------------------------------|
| `columns`          | `Column<T>[]`                                              | —                 | Column definitions                                                         |
| `data`             | `T[]`                                                      | —                 | Data to display — full dataset (client-side) or current page (server-side) |
| `pagination`       | `PaginationMeta`                                           | —                 | Server pagination metadata. Presence determines server-side mode           |
| `onPaginate`       | `(page: number) => void`                                   | —                 | Called on page change. Shows pagination when provided (server-side)        |
| `onSearch`         | `(query: string) => void`                                  | —                 | Called on search input. Shows search bar when provided (server-side)       |
| `onSort`           | `(sort: SortState \| null) => void`                        | —                 | Called on column sort (server-side)                                        |
| `searchValue`      | `string`                                                   | —                 | Controlled search value (server-side)                                      |
| `sortValue`        | `SortState \| null`                                        | —                 | Controlled sort state (server-side)                                        |
| `clientPageSize`   | `number`                                                   | —                 | Page size for client-side pagination. Shows pagination when provided       |
| `clientSearchKeys` | `(keyof T)[]`                                              | —                 | Fields to search on client-side. Shows search bar when provided            |
| `entity`           | `Entity`                                                   | —                 | Used for search bar placeholder text                                       |
| `actionMenu`       | `ActionMenu<T>`                                            | —                 | Row action configuration                                                   |
| `renderMenuIcon`   | `() => ReactNode`                                          | —                 | Custom dropdown trigger icon                                               |
| `onUpdate`         | `(id: string \| number, values: Partial<T>) => void`       | —                 | Called on inline edit save or boolean toggle                               |
| `formFields`       | `FormField[]`                                              | —                 | Makes columns inline-editable                                              |
| `renderSortIcon`   | `(direction: SortDirection, active: boolean) => ReactNode` | —                 | Custom sort indicator                                                      |
| `emptyMessage`     | `string`                                                   | `'Nog geen data'` | Message shown when data is empty                                           |
| `striped`          | `boolean`                                                  | `false`           | Alternating row background color                                           |
| `hover`            | `boolean`                                                  | `false`           | Highlight row on mouse hover                                               |
| `style`            | `CSSProperties`                                            | —                 | Inline styles for the table wrapper                                        |

---

### Column

| Prop        | Type                                                                                    | Default | Description                               |
|-------------|-----------------------------------------------------------------------------------------|---------|-------------------------------------------|
| `name`      | `keyof T`                                                                               | —       | Maps to a key on the data object          |
| `label`     | `string`                                                                                | —       | Column header label                       |
| `sort`      | `boolean`                                                                               | —       | Enables sorting for this column           |
| `format`    | `'boolean' \| 'button' \| 'date' \| 'datetime' \| 'pill' \| 'email' \| { key: string }` | —       | Cell render format                        |
| `className` | `string`                                                                                | —       | Additional CSS class on `<th>` and `<td>` |
| `style`     | `CSSProperties`                                                                         | —       | Inline styles on `<th>` and `<td>`        |

---

## Utility Classes

The following CSS classes can be applied to a column via the `className` prop.

| Class       | Description                                                    |
|-------------|----------------------------------------------------------------|
| `center`    | Centers the cell content                                       |
| `right`     | Aligns the cell content to the right                           |
| `linebreak` | Renders newlines in the cell value (`\n` becomes a line break) |
| `no-style`  | Removes link styling — underline on hover only                 |

```tsx
const columns = [
    { name: 'amount', label: 'Bedrag', className: 'right' },
    { name: 'notes',  label: 'Notities', className: 'linebreak' },
];
```

`no-style` is useful on columns with `format: 'email' or other link-based formats where you want to suppress the default link appearance.

### ActionMenu

| Prop      | Type                     | Description              |
|-----------|--------------------------|--------------------------|
| `type`    | `'inline' \| 'dropdown'` | How actions are rendered |
| `actions` | `Action<T>[]`            | List of row actions      |

### Action

| Prop      | Type                | Description                   |
|-----------|---------------------|-------------------------------|
| `name`    | `string`            | Identifier for the action     |
| `label`   | `string`            | Display label                 |
| `icon`    | `ReactNode`         | Optional icon                 |
| `onClick` | `(item: T) => void` | Called with the full row item |

---

### FormField

| Prop       | Type                                             | Default | Description                    |
|------------|--------------------------------------------------|---------|--------------------------------|
| `name`     | `string`                                         | —       | Maps to a column by name       |
| `type`     | `'text' \| 'select' \| 'radio'`                  | —       | Input type                     |
| `options`  | `string[] \| { label: string; value: string }[]` | —       | Options for select and radio   |
| `required` | `boolean`                                        | —       | Prevents saving an empty value |

---

### PaginationMeta

| Prop          | Type     | Description                 |
|---------------|----------|-----------------------------|
| `currentPage` | `number` | Active page (1-based)       |
| `pageCount`   | `number` | Total number of pages       |
| `total`       | `number` | Total number of items       |
| `from`        | `number` | First item on current page  |
| `to`          | `number` | Last item on current page   |

---

### SortState

| Prop        | Type              | Description         |
|-------------|-------------------|---------------------|
| `name`      | `keyof T`         | Column being sorted |
| `direction` | `'asc' \| 'desc'` | Sort direction      |

---

### Entity

| Prop    | Type     | Description                                                    |
|---------|----------|----------------------------------------------------------------|
| `name`  | `string` | Machine name, e.g. `'users'`                                   |
| `label` | `string` | Display name, e.g. `'Gebruikers'` — used in search placeholder |

---

## TypeScript

This package includes full TypeScript definitions. All main types are exported.

```ts
import { DataTable } from "@sio-group/ui-datatable";
import type {
    DataTableProps,
    Column,
    Entity,
    Action,
    ActionMenu,
    ActionMenuType,
    FormField,
    FormFieldType,
    SortState,
    SortDirection,
} from "@sio-group/ui-datatable";
```

---

## Browser Support

Supports all modern browsers that support:

* ES6 modules
* React 19+

---

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](../../LICENSE) file for details.