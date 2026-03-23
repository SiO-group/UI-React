import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import {renderValue} from "../utils/render-value";

interface TestItem {
    id: number;
    name: string;
    email: string;
    status: string;
    active: boolean;
    createdAt: string;
    tags: string[];
    role: { name: string };
    meta: { key: string; value: string };
}

const baseColumn = { name: 'name' as keyof TestItem, label: 'Naam' };
const baseItem: TestItem = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    status: 'active',
    active: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    tags: ['admin', 'user'],
    role: { name: 'Administrator' },
    meta: { key: 'foo', value: 'bar' },
};

const renderCell = (props: Parameters<typeof renderValue>[0]) => {
    const result = renderValue(props);
    const { container } = render(<>{result}</>);
    return container;
};

// ─────────────────────────────────────────────
// Null / undefined / empty
// ─────────────────────────────────────────────

describe('empty values', () => {
    it('renders EmptyCell for null', () => {
        const container = renderCell({ value: null, column: baseColumn, item: baseItem });
        expect(container.querySelector('.empty')).toBeTruthy();
    });

    it('renders EmptyCell for undefined', () => {
        const container = renderCell({ value: undefined, column: baseColumn, item: baseItem });
        expect(container.querySelector('.empty')).toBeTruthy();
    });

    it('renders EmptyCell for empty array', () => {
        const container = renderCell({ value: [], column: baseColumn, item: baseItem });
        expect(container.querySelector('.empty')).toBeTruthy();
    });
});

// ─────────────────────────────────────────────
// String / number fallback
// ─────────────────────────────────────────────

describe('string and number values', () => {
    it('renders a string value', () => {
        const container = renderCell({ value: 'Alice', column: baseColumn, item: baseItem });
        expect(container.textContent).toBe('Alice');
    });

    it('renders a number value as string', () => {
        const container = renderCell({ value: 42, column: baseColumn, item: baseItem });
        expect(container.textContent).toBe('42');
    });
});

// ─────────────────────────────────────────────
// Format: email
// ─────────────────────────────────────────────

describe('format: email', () => {
    it('renders a mailto link', () => {
        const container = renderCell({
            value: 'alice@example.com',
            column: { ...baseColumn, format: 'email' },
            item: baseItem,
        });

        const link = container.querySelector('a');
        expect(link).toBeTruthy();
        expect(link?.getAttribute('href')).toBe('mailto:alice@example.com');
        expect(link?.textContent).toBe('alice@example.com');
    });
});

// ─────────────────────────────────────────────
// Format: date / datetime
// ─────────────────────────────────────────────

describe('format: date and datetime', () => {
    it('renders a localized date string for format: date', () => {
        const container = renderCell({
            value: '2024-01-15T10:00:00.000Z',
            column: { ...baseColumn, format: 'date' },
            item: baseItem,
        });

        // Should contain year and month — exact format depends on locale
        expect(container.textContent).toMatch(/2024/);
    });

    it('renders a localized datetime string for format: datetime', () => {
        const container = renderCell({
            value: '2024-01-15T10:00:00.000Z',
            column: { ...baseColumn, format: 'datetime' },
            item: baseItem,
        });

        expect(container.textContent).toMatch(/2024/);
    });
});

// ─────────────────────────────────────────────
// Format: boolean / button
// ─────────────────────────────────────────────

describe('format: boolean and button', () => {
    it('renders a BooleanCell for format: boolean', () => {
        const container = renderCell({
            value: true,
            column: { ...baseColumn, format: 'boolean' },
            item: baseItem,
        });

        expect(container.querySelector('.boolean')).toBeTruthy();
    });

    it('renders a BooleanCell for format: button', () => {
        const container = renderCell({
            value: false,
            column: { ...baseColumn, format: 'button' },
            item: baseItem,
        });

        expect(container.querySelector('.boolean')).toBeTruthy();
    });

    it('calls updateData when BooleanCell is clicked', async () => {
        const updateData = vi.fn();
        const container = renderCell({
            value: true,
            column: { ...baseColumn, format: 'boolean' },
            item: baseItem,
            updateData,
        });

        const button = container.querySelector('button');
        button?.click();

        expect(updateData).toHaveBeenCalledWith(baseItem.id, { name: !true });
    });
});

// ─────────────────────────────────────────────
// Format: pill
// ─────────────────────────────────────────────

describe('format: pill', () => {
    it('renders a Pill with status and label from value', () => {
        const container = renderCell({
            value: { status: 'success', label: 'Actief' },
            column: { ...baseColumn, format: 'pill' },
            item: baseItem,
        });

        const pill = container.querySelector('.pill');
        expect(pill).toBeTruthy();
        expect(pill?.textContent).toBe('Actief');
        expect(pill?.className).toContain('pill--success');
    });
});

// ─────────────────────────────────────────────
// Arrays
// ─────────────────────────────────────────────

describe('array values', () => {
    it('renders each string item in its own div', () => {
        const container = renderCell({
            value: ['admin', 'user'],
            column: baseColumn,
            item: baseItem,
        });

        const divs = container.querySelectorAll('div');
        expect(divs).toHaveLength(2);
        expect(divs[0].textContent).toBe('admin');
        expect(divs[1].textContent).toBe('user');
    });

    it('renders each object item using key-value pairs', () => {
        const container = renderCell({
            value: [{ name: 'Admin' }, { name: 'User' }],
            column: baseColumn,
            item: baseItem,
        });

        expect(container.textContent).toContain('Admin');
        expect(container.textContent).toContain('User');
    });

    it('renders only the specified key when format.key is set', () => {
        const container = renderCell({
            value: [{ name: 'Admin', id: 1 }, { name: 'User', id: 2 }],
            column: { ...baseColumn, format: { key: 'name' } },
            item: baseItem,
        });

        expect(container.textContent).toContain('Admin');
        expect(container.textContent).toContain('User');
        expect(container.textContent).not.toContain('1');
        expect(container.textContent).not.toContain('2');
    });
});

// ─────────────────────────────────────────────
// Objects
// ─────────────────────────────────────────────

describe('object values', () => {
    it('renders all key-value pairs for a plain object', () => {
        const container = renderCell({
            value: { key: 'foo', value: 'bar' },
            column: baseColumn,
            item: baseItem,
        });

        expect(container.textContent).toContain('key');
        expect(container.textContent).toContain('foo');
        expect(container.textContent).toContain('value');
        expect(container.textContent).toContain('bar');
    });

    it('renders only the specified key when format.key is set', () => {
        const container = renderCell({
            value: { name: 'Administrator', id: 5 },
            column: { ...baseColumn, format: { key: 'name' } },
            item: baseItem,
        });

        expect(container.textContent).toBe('Administrator');
        expect(container.textContent).not.toContain('5');
    });

    it('renders EmptyCell for empty object', () => {
        const container = renderCell({
            value: {},
            column: baseColumn,
            item: baseItem,
        });

        expect(container.querySelector('.empty')).toBeTruthy();
    });

    it('falls through to String(value) when format.key does not exist on object', () => {
        const container = renderCell({
            value: { name: 'Alice' },
            column: { ...baseColumn, format: { key: 'nonexistent' } },
            item: baseItem,
        });

        // Returns empty string for missing key
        expect(container.textContent).toBe('');
    });
});

// ─────────────────────────────────────────────
// Inline editing (formFields)
// ─────────────────────────────────────────────

describe('inline editing', () => {
    it('renders InlineInputCell when a matching formField is found', () => {
        const formFields = [{ name: 'name', type: 'text' as const }];
        const container = renderCell({
            value: 'Alice',
            column: baseColumn,
            item: baseItem,
            formFields,
        });

        // InlineInputCell should be rendered — check for edit button or input
        expect(container.querySelector('button[aria-label="inline edit field"]')).toBeTruthy();
    });

    it('does not render InlineInputCell when no matching formField', () => {
        const formFields = [{ name: 'email', type: 'text' as const }];
        const container = renderCell({
            value: 'Alice',
            column: baseColumn, // name: 'name', no matching formField for 'name'
            item: baseItem,
            formFields,
        });

        expect(container.querySelector('button[aria-label="inline edit field"]')).toBeFalsy();
        expect(container.textContent).toBe('Alice');
    });
});
