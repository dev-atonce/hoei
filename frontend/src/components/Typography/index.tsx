import { ReactNode, CSSProperties } from "react";

import * as S from "./styled";

// Type/Interface to avoid unwanted tags such as 'divs' e.g.
type TagVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type TypographyProps = {
  tag?: TagVariants;
  children: ReactNode;
};

/**
 * @tag will have default 'p' since it'll probably be our most used tag
 */
const Typography = ({ tag = "p", children }: TypographyProps) => (
  // @ts-ignore
  <S.DynamicTypography tag={tag}>{children}</S.DynamicTypography>
);

export default Typography;
