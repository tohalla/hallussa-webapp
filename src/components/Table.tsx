import React from "react";
import ReactTable, { TableProps } from "react-table";
import "react-table/react-table.css";
import { tableContainer } from "../emotion-styles/src/table";
import { greyscale } from "../emotion-styles/src/variables/colors";

type Props = Pick<TableProps, "pageSize" | "columns" | "data">;

const getHeaderProps = () => ({style: {
  background: greyscale[7],
  boxShadow: "none",
  fontWeight: 900,
}});

export default ({pageSize = 20, ...props}: Props) => (
  <div className={tableContainer}>
    <ReactTable
      getTheadProps={getHeaderProps}
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
  </div>
);
