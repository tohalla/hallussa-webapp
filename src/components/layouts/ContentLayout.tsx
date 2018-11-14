import React from "react"

const styledContentLayout = "";

interface Props {
  children: Node;
}

export default (props: Props) => {
  return (
    <div className={styledContentLayout}>
      {props.children}
    </div>
  )
}
