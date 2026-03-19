import {render, screen} from "@testing-library/react";
import {describe, expect, test} from "vitest";
import {Card} from "../src";
import "@testing-library/jest-dom";

describe("ui-card", () => {
    test("renders compound components", () => {
        render(
            <Card>
                <Card.Header>Header</Card.Header>
                <Card.Body>Body</Card.Body>
                <Card.Footer>Footer</Card.Footer>
            </Card>
        );

        expect(screen.getByText("Header")).toBeInTheDocument();
        expect(screen.getByText("Body")).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    test("creates fallback header when title provided", () => {
        render(
            <Card title="Fallback">
                Body
            </Card>
        );

        expect(screen.getByText("Fallback")).toBeInTheDocument();
    });
})