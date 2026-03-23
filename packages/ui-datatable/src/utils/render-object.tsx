import {EmptyCell} from "../components/cell-types/EmptyCell";

export const renderObject = (obj: Record<string, unknown>) => {
    const entries = Object.entries(obj);

    if (!entries.length) return <EmptyCell />;

    return (
        <>
            {entries.map(([key, val]) => (
                <div key={key}>
                    <span>{key}: </span>
                    <span>{String(val)}</span>
                </div>
            ))}
        </>
    )
}