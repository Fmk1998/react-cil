import React, {FunctionComponent, useEffect, useCallback, Fragment} from "react";
import clsx from "clsx";
import {createStyles, lighten, makeStyles, Theme} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import {Get, ObjectConverParameters, ParametersConverObject} from "para-lib";

interface HeaderCell {
    id: string | number
}

interface Operator {
    type?: string,
    label: string,
    onClick: Function
}

interface Columns {
    label: string,
    operator: Operator[],
    numeric?: boolean,
    disablePadding?: boolean
}

interface OwnProps {
    config: {
        url: string,
        ctx: string,
        params?: any,
        header: HeaderCell[],
        columns?: Columns[],
        externals?: Function
    },
    checkedAble?: boolean,
    sortedAble?: boolean,
}

type Props = OwnProps;
type Order = "asc" | "desc";

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const ParaTableHead = (props: any) => {
    const {config, checkedAble, sortedAble} = props;
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };
    console.log("headerProps", props);
    return (
        <TableHead>
            <TableRow>
                {checkedAble
                    ? <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{"aria-label": "select all desserts"}}
                        />
                    </TableCell>
                    : null}
                {config.header.map((headCell: any) => (
                    sortedAble
                        ? <TableCell key={headCell.id}
                                     align={headCell.numeric ? "right" : "left"}
                                     padding={headCell.disablePadding ? "none" : "default"}
                                     sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                        : <TableCell key={headCell.id}
                                     align={headCell.numeric ? "right" : "left"}
                                     padding={headCell.disablePadding ? "none" : "default"}
                        >
                            {headCell.label}
                        </TableCell>
                ))}
                {
                    config.columns
                        ? renderColumns(config.columns, false)
                        : null
                }
            </TableRow>
        </TableHead>
    );
};

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1)
        },
        highlight:
            theme.palette.type === "light"
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark
                },
        title: {
            flex: "1 1 100%"
        }
    })
);


const ParaTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                    Nutrition
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    },
    noData: {
        height: "260px"
    }
}));

/* 渲染额外的列 */
const renderColumns = (columns: any, bol: boolean, row?: any) => {
    if (!bol) {
        return columns.map((value: Columns, index: number) => (
            <TableCell key={index}
                       align="center"
                       padding={value.disablePadding ? "none" : "default"}
            >
                {value.label}
            </TableCell>
        ));
    } else {
        return columns.map((value: Columns, index: number) => (
            <TableCell key={index}
                       align="center"
                       padding={value.disablePadding ? "none" : "default"}
            >
                {
                    value.operator.map((item: any, index: number) => (
                        <Button key={index} {...item} onClick={() => {
                            item.onClick(row);
                        }}>{item.label}</Button>
                    ))
                }
            </TableCell>
        ));
    }
};

const ParaTable: FunctionComponent<Props> = (props) => {
    console.log("props:", props);
    const {config} = props;
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(config.params?.size || 25);
    const [dataSource, setDataSource] = React.useState({
        list: [],
        page: 1,
        size: config.params?.size || 25
    });
    const [url, setUrl] = React.useState("");

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = dataSource.list.map((n: any) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        if (props.checkedAble) {
            const selectedIndex = selected.indexOf(id);
            let newSelected: string[] = [];
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1)
                );
            }
            setSelected(newSelected);
        } else {
            console.log("点击了Item=====>", id);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataSource.list.length - page * rowsPerPage);

    /* 请求数据 */
    const fetchData = useCallback(async () => {
        let url = null;
        if (config.params) {
            url = `${config.url}?${ObjectConverParameters(config.params)}`;
        } else {
            url = config.url;
        }
        setUrl(url);
        const {data, err}: any = await Get({url, ctx: config.ctx});
        if (err) return;
        setDataSource(data?.data);
    }, []);

    useEffect(() => {
        fetchData();
    }, [config.params]);

    useEffect(() => {
        console.log("分页数据变化了", rowsPerPage);
        config.params["page"] = page;
        config.params["size"] = rowsPerPage;
        fetchData();
    }, [rowsPerPage]);

    useEffect(() => {
        console.log("页数数据变化了", page);
        config.params["page"] = page;
        config.params["size"] = rowsPerPage;
        fetchData();
    }, [page]);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <ParaTableToolbar numSelected={selected.length}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        aria-label="enhanced table"
                    >
                        <ParaTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={dataSource.list.length}
                            {...props}
                        />
                        {
                            dataSource.list?.length
                                ? <TableBody>
                                    {
                                        props.checkedAble
                                            ? stableSort(dataSource.list, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row: any, index) => {
                                                    const isItemSelected = isSelected(row.id);
                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                    return (
                                                        <TableRow
                                                            hover
                                                            onClick={event => handleClick(event, row.id)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={row.id}
                                                            selected={isItemSelected}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    checked={isItemSelected}
                                                                    inputProps={{"aria-labelledby": labelId}}
                                                                />
                                                            </TableCell>
                                                            {/*<TableCell component="th" id={labelId} scope="row" padding="none">*/}
                                                            {/*{row.name}*/}
                                                            {/*</TableCell>*/}
                                                            {
                                                                config.header.map((cells: any) => (
                                                                    <TableCell align={cells.numeric ? "right" : "left"}
                                                                               key={cells.id}
                                                                    >
                                                                        {row[cells["id"]]}
                                                                    </TableCell>
                                                                ))
                                                            }
                                                        </TableRow>
                                                    );
                                                })
                                            : dataSource.list.map((row: any) => {
                                                if (config.externals) {
                                                    return (
                                                        <Fragment key={row.id}>
                                                            <TableRow
                                                                hover
                                                                onClick={event => handleClick(event, row.id)}
                                                                tabIndex={-1}
                                                                key={row.id}
                                                            >
                                                                {
                                                                    config.header.map((cells: any) => (
                                                                        <TableCell align={cells.numeric ? "right" : "left"}
                                                                                   key={cells.id}
                                                                        >
                                                                            {row[cells["id"]]}
                                                                        </TableCell>
                                                                    ))
                                                                }
                                                                {
                                                                    config.columns
                                                                        ? renderColumns(config.columns, true, row)
                                                                        : null
                                                                }
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell colSpan={1}>
                                                                    {
                                                                        config.externals(row)
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        </Fragment>
                                                    );
                                                } else {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            onClick={event => handleClick(event, row.id)}
                                                            tabIndex={-1}
                                                            key={row.id}
                                                        >
                                                            {
                                                                config.header.map((cells: any) => (
                                                                    <TableCell align={cells.numeric ? "right" : "left"}
                                                                               key={cells.id}
                                                                    >
                                                                        {row[cells["id"]]}
                                                                    </TableCell>
                                                                ))
                                                            }
                                                            {
                                                                config.columns
                                                                    ? renderColumns(config.columns, true, row)
                                                                    : null
                                                            }
                                                        </TableRow>
                                                    );
                                                }
                                            })
                                    }
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                                : <TableBody>
                                    <TableRow className={classes.noData}>
                                        <TableCell align={"center"} colSpan={12}>暂无数据</TableCell>
                                    </TableRow>
                                </TableBody>
                        }
                    </Table>
                </TableContainer>
                {
                    dataSource.list?.length
                        ? <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={dataSource.list.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        : null
                }
            </Paper>
            {
                dataSource && dataSource.list?.length
                    ? <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense}/>}
                        label="Dense padding"
                    />
                    : null
            }
        </div>
    );
};

export default ParaTable;
