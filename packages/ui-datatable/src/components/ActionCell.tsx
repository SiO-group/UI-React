import {Action, ActionCellProps} from "../types";
import {Button} from "@sio-group/ui-core";
import {useEffect, useRef, useState} from "react";

export const ActionCell = <T extends { id: string | number }> ({
    actionMenu,
    item,
    renderMenuIcon,
}: ActionCellProps<T>) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const positionDropdown = () => {
        if (dropdownRef.current && triggerRef.current) {
            const rect: DOMRect = triggerRef.current.getBoundingClientRect();
            dropdownRef.current.style.left = `${rect.left}px`;
            dropdownRef.current.style.top = `${rect.top}px`;
        }
    }

    useEffect(() => {
        if (!isOpen) return;

        const handleOutside = (e: MouseEvent | Event) => {
            if (dropdownRef.current?.contains(e.target as Node)) return;
            setIsOpen(false);
        }

        document.addEventListener('mousedown', handleOutside, false);
        document.addEventListener('wheel', handleOutside, false);

        return () => {
            document.removeEventListener('mousedown', handleOutside, false);
            document.removeEventListener('wheel', handleOutside, false);
        }
    }, [isOpen]);

    const renderButton = ({ label, name, icon, onClick }: Action<T>, showLabel: boolean) => (
        <Button
            onClick={() => onClick(item)}
            variant="secondary"
            className=""
            ariaLabel={label}
            key={name}
        >
            {icon && <span>{icon}</span>}
            {showLabel && <span>{label}</span>}
        </Button>
    )

    return (
        <td className="action-cel">
            {actionMenu?.type === 'inline' ? (
                <div className="action-group">
                    {actionMenu.actions.map((action: Action<T>) => renderButton(action, false))}
                </div>
            ) : (
                <section
                    className="action-dropdown"
                    ref={triggerRef}
                >
                    <button
                        className="btn--link btn--default"
                        aria-label="Acties"
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        onClick={() => {
                            setIsOpen(!isOpen);
                            positionDropdown();
                        }}
                    >
                        {renderMenuIcon ? renderMenuIcon() : '⋮'}
                    </button>
                    {isOpen && (
                        <div
                            className="action-dropdown__menu"
                            ref={dropdownRef}
                            role="menu"
                        >
                            {actionMenu?.actions.map((action: Action<T>) => renderButton(action, true))}
                        </div>
                    )}
                </section>
            )}
        </td>
    );
}