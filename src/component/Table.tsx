import React from "react";
import ReactTable, { TableProps } from "react-table";
import "react-table/react-table.css";
import { tableContainer } from "../style/table";
import { greyscale } from "../style/variables/colors";

interface Props<T> extends Pick<TableProps<T>, "columns"> {
  data: Readonly<T[]>;
  pageSize: number;
}

const getHeaderProps = () => ({style: {
  background: greyscale[7],
  boxShadow: "none",
  fontWeight: 900,
}});

const Table = <T extends {}>({data, ...props}: Props<T>) => (
  <div className={tableContainer}>
    <ReactTable
      getTheadProps={getHeaderProps}
      minRows={0}
      multiSort={false}
      resizable={false}
      pageSizeOptions={undefined}
      showPageSizeOptions={false}
      showPaginationBottom={props.pageSize < data.length}
      showPageJump={false}
      style={{background: greyscale[9]}}
      data={data as T[]}
      {...props}
    />
  </div>
);

Table.defaultProps = {
  pageSize: 20,
};

export default Table;
