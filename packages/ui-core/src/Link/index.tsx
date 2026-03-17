import React from "react";
import {LinkProps} from "../types";
import {Spinner} from "../Spinner";

const LinkComponent: React.FC<LinkProps> = ({
    label,
    to,
    onClick,
    color = 'default',
    size = 'md',
    block = false,
    loading = false,
    disabled = false,
    className,
    ariaLabel,
    navigate,
    external = false,
    style,
    children,
}: LinkProps) => {
    const isDisabled: boolean = disabled || loading;
    const isExternal: boolean = external || /^(https?:|mailto:|tel:|ftp:)/.test(to);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isDisabled) {
            e.preventDefault();
            return;
        }

        onClick?.(e);

        if (!isExternal && navigate) {
            e.preventDefault();
            navigate(to);
        }
    };

    const linkClasses = [
        'link',
        `link--${color}`,
        `link--${size}`,
        block && 'link--block',
        loading && 'link--loading',
        isDisabled && 'link--disabled',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <a
            href={isDisabled ? undefined : to}
            onClick={handleClick}
            className={linkClasses}
            style={style}
            aria-label={ariaLabel}
            aria-busy={loading}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : undefined}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}>
            {loading ? (
                <>
                    <Spinner />
                    <span className='loading-text'>Processing...</span>
                </>
            ) : (
                <>
                    {label}
                    {children}
                </>
            )}
        </a>
    );
}

/**
 * Custom Link component for internal or external navigation
 *
 * @component
 * @example
 * // Internal link
 * <Link to="/dashboard" label="Dashboard" />
 *
 * @example
 * // External link
 * // external property is optional
 * // http(s), ftp, email and tel with automatically render as external
 * <Link to="https://example.com" label="Visit website" external />
 *
 * @example
 * // Link with loading state
 * <Link to="/profile" label="Profile" loading />
 *
 * @example
 * // Link with custom click handler en navigation
 * <Link
 *   to="/settings"
 *   label="Settings"
 *   onClick={() => console.log('clicked')}
 *   navigate={customNavigate}
 * />
 */
export const Link: React.FC<LinkProps> = React.memo(LinkComponent);
