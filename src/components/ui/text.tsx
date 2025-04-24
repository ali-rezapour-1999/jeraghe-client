import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ElementType,
  ComponentPropsWithoutRef,
} from "react";

// برای Paragraph مثل قبل
type ParagraphProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const Paragraph = ({
  children,
  className = "",
  ...props
}: ParagraphProps) => {
  return (
    <p className={`text-primary dark:text-light ${className}`} {...props}>
      {children}
    </p>
  );
};

type HeadingProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Heading = <T extends ElementType = "h1">({
  as,
  className = "",
  children,
  ...props
}: HeadingProps<T>) => {
  const Tag = as || "h1";

  return (
    <Tag
      className={`dark:text-light text-primary font-bold ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};
