import React from "react";
import ReactTable, { TableProps } from "react-table";
import "react-table/react-table.css";
import { greyscale } from "../emotion-styles/src/variables/colors";

type Props = Pick<TableProps, "pageSize" | "columns" | "data">;

export default ({pageSize = 20, ...props}: Props) => (
  <ReactTable
    minRows={0}
    multiSort={false}
    resizable={false}
    pageSize={pageSize}
    pageSizeOptions={undefined}
    showPageSizeOptions={false}
    showPaginationBottom={pageSize < props.data.length}
    showPageJump={false}
    style={{background: greyscale[9]}}
    {...props}
  />
);
