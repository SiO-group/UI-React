import {getPaginationWindow} from "../utils/get-pagination-window";
import {PageItem, PaginationProps} from "../types";
import {Button} from "@sio-group/ui-core";

export const Pagination = ({
    from,
    to,
    total,
    pageCount,
    currentPage,
    onPaginate,
    windowSize,
    className,
    style,
}: PaginationProps) => {
    if (pageCount <= 1) return null;

    const pageItems: PageItem[] = getPaginationWindow(currentPage, pageCount, windowSize);

    return (
        <div className={`pagination${className ? ` ${className}` : ''}`} style={style}>
            <div className="pagination__info">
                <b>{from} - {to}</b> van {total}
            </div>

            <div className="pagination__controls">
                <Button
                    onClick={() => onPaginate(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="pagination__button"
                    size="sm"
                    ariaLabel="Vorige pagina"
                    variant="link"
                >
                    &#706; vorige
                </Button>

                {pageItems.map((pageItem: PageItem) => (
                    pageItem.type === 'ellipsis'
                        ? (
                            <span className="pagination__elipsis" key={pageItem.key}>...</span>
                        ) : (
                            <Button
                                onClick={() => onPaginate(pageItem?.page)}
                                className="pagination__button"
                                size="sm"
                                ariaLabel={`Pagina ${pageItem.page}`}
                                variant={pageItem.page === currentPage ? 'secondary' : 'link'}
                                key={pageItem.page}
                            >
                                {pageItem.page}
                            </Button>
                        )
                ))}

                <Button
                    onClick={() => onPaginate(currentPage + 1)}
                    disabled={currentPage >= pageCount}
                    className="pagination__button"
                    size="sm"
                    ariaLabel="Volgende pagina"
                    variant="link"
                >
                    volgende &#707;
                </Button>
            </div>
        </div>
    )
}