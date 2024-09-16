import { createElement } from "react";

import styled from "styled-components";
// @ts-ignore
export const DynamicTypography = styled(({ tag, children, ...props }) =>
  createElement(tag, props, children)
);
