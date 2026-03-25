import React from "react";
import {ButtonProps} from "../../types";
import {Spinner} from "../Spinner";

const ButtonComponent: React.FC<ButtonProps> = ({
    type = 'button',
    label,
    onClick,
    variant = 'primary',
    color = 'default',
    size = 'md',
    block = false,
    loading = false,
    disabled = false,
    className,
    ariaLabel,
    ariaExpanded,
    ariaHaspopup,
    style,
    children,
}: ButtonProps) => {
    const isDisabled: boolean = disabled || loading;

    const handleClick = (e: React.MouseEvent) => {
        if (isDisabled) {
            e.preventDefault();
            return;
        }

        onClick?.(e);
    };

    const buttonClasses = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        `btn--${color}`,
        block && 'btn--block',
        loading && 'btn--loading',
        isDisabled && 'btn--disabled',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            onClick={handleClick}
            className={buttonClasses}
            style={style}
            disabled={isDisabled}
            aria-label={ariaLabel}
            aria-busy={loading}
            aria-disabled={isDisabled}
            aria-expanded={ariaExpanded}
            aria-haspopup={ariaHaspopup}
        >
            {loading
                ? (
                    <>
                        <Spinner />
                        <span className='loading-text'>Processing...</span>
                    </>
                )
                : (
                    <>
                        {label}
                        {children}
                    </>
                )
            }
        </button>
    );
};

/**
 * Button component for user interaction.
 *
 * @component
 * @example
 * // Primaire button
 * <Button label="Save" onClick={handleSave} />
 *
 * @example
 * // Submit button with loading state
 * <Button
 *   type="submit"
 *   label="Send"
 *   variant="primary"
 *   loading
 * />
 *
 * @example
 * // Button with icon and tekst
 * <Button type="button" onClick={handleClick}>
 *   <Icon name="plus" />
 *   <span>Add</span>
 * </Button>
 *
 * @example
 * // Error variant
 * <Button
 *   type="button"
 *   label="Delete"
 *   variant="secondary"
 *   color="error"
 *   onClick={handleDelete}
 * />
 */
export const Button: React.FC<ButtonProps> = React.memo(ButtonComponent);