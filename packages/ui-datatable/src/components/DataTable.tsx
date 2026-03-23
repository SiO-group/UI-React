import {DataTableHeader} from "./DataTableHeader";
import {useDataTable} from "../hooks/useDataTable";
import {DataTableProps} from "../types";
import {Pagination} from "@sio-group/ui-pagination";
import {DataTableBody} from "./DataTableBody";
import {DataTableControls} from "./DataTableControls";

export const DataTable = <T extends { id: string | number }>({
    columns,
    entity,
    actionMenu,
    renderMenuIcon,
    onUpdate,
    formFields,
    renderSortIcon,
    emptyMessage = 'Nog geen data',
    striped = false,
    hover = false,
    style,
    ...props
}: DataTableProps<T>) => {
    const {
        pagedData,
        paginationMeta,
        showPagination,
        showSearch,
        handleSearch,
        handleSort,
        handlePaginate,
        currentSort,
        currentSearch,
    } = useDataTable(props);

    return (
        <div className="datatable" style={style}>
            {showSearch && (
                <DataTableControls
                    currentSearch={currentSearch}
                    handleSearch={handleSearch}
                    entity={entity}
                />
            )}

            <div className="datatable__wrapper">
                <table className={[striped && 'striped', hover && 'hover'].filter(Boolean).join(' ')}>
                    <DataTableHeader
                        columns={columns}
                        onSort={handleSort}
                        sortValue={currentSort}
                        hasActionMenu={!!actionMenu?.actions?.length}
                        renderSortIcon={renderSortIcon}
                    />
                    <tbody>
                    {pagedData.length
                        ? pagedData.map((item) => (
                            <DataTableBody
                                item={item}
                                columns={columns}
                                actionMenu={actionMenu}
                                formFields={formFields}
                                updateData={onUpdate}
                                renderMenuIcon={renderMenuIcon}
                                key={item.id}
                            />
                        ))
                        : (
                            <tr>
                                <td colSpan={columns.length + (actionMenu?.actions?.length ? 1 : 0)}>
                                    <div className="empty-state">{emptyMessage}</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {(showPagination && paginationMeta) && (
                <Pagination
                    {...paginationMeta}
                    onPaginate={handlePaginate}
                />
            )}
        </div>
    )
}
