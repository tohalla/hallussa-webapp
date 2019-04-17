import React from "react";
import ReactTable, { TableProps } from "react-table";
import "react-table/react-table.css";
import { tableContainer } from "../styles/table";
import { greyscale } from "../styles/variables/colors";

type Props = Pick<TableProps, "columns" | "data"> & {pageSize: number};

const getHeaderProps = () => ({style: {
  background: greyscale[7],
  boxShadow: "none",
  fontWeight: 900,
}});

const Table = (props: Props) => (
  <div className={tableContainer}>
    <ReactTable
      getTheadProps={getHeaderProps}
      minRows={0}
      multiSort={false}
      resizable={false}
      pageSizeOptions={undefined}
      showPageSizeOptions={false}
      showPaginationBottom={props.pageSize < props.data.length}
      showPageJump={false}
      style={{background: greyscale[9]}}
      {...props}
    />
  </div>
);

Table.defaultProps = {
  pageSize: 20,
};

export default Table;
