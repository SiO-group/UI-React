interface ModalClassProps {
    size: 'sm' | 'md' | 'lg',
    className?: string,
}

export const createModalClasses = ({size = 'md', className}: ModalClassProps): string => {
    const classes = [
        className,
        size === 'lg' && 'modal--large',
        size === 'sm' && 'modal--small',
        size === 'md' && 'modal--medium'
    ];

    return classes.filter(Boolean).join(' ');
}