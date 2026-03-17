import {render, screen, fireEvent} from "@testing-library/react";
import {describe, expect, test, vi} from "vitest";
import {Modal} from "../src";
import "@testing-library/jest-dom";

describe("ui-modal", () => {
    test("renders modal whe show=true", () => {
        render(
            <Modal show title="Test Modal">Content</Modal>
        );

        expect(screen.getByText("Test Modal")).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    test("does not render when show=false", () => {
        const { container } = render(
            <Modal show={false} title="Hidden">
                Content
            </Modal>
        );

        expect(container.firstChild).toBeNull();
    });

    test("closes when escape is pressed", () => {
        const close = vi.fn();

        render(
            <Modal show close={close} closeOnEscape title="Modal">
                Content
            </Modal>
        );

        fireEvent.keyDown(document, { key: "Escape" });

        expect(close).toHaveBeenCalled();
    });

    test("renders compound components", () => {
        render(
            <Modal show>
                <Modal.Header>Header</Modal.Header>
                <Modal.Body>Body</Modal.Body>
                <Modal.Footer>Footer</Modal.Footer>
            </Modal>
        );

        expect(screen.getByText("Header")).toBeInTheDocument();
        expect(screen.getByText("Body")).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    test("creates fallback header when title provided", () => {
        render(
            <Modal show title="Fallback">
                Body
            </Modal>
        );

        expect(screen.getByText("Fallback")).toBeInTheDocument();
    });

    test("renders inside portal target", () => {
        const target = document.createElement("div");
        target.id = "portal";
        document.body.appendChild(target);

        render(
            <Modal show portalTarget="#portal">
                Body
            </Modal>
        );

        expect(target.textContent).toContain("Body");
    });

    test("clicking overlay closes modal", () => {
        const close = vi.fn();

        render(
            <Modal show close={close}>
                Body
            </Modal>
        );

        // @ts-ignore
        fireEvent.click(document.querySelector(".modal"));

        expect(close).toHaveBeenCalled();
    });
})