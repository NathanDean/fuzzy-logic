import { ReactNode, Children, cloneElement, isValidElement } from 'react';

interface CardGridProps {
  children: ReactNode;
  cardWidth?: 'sm' | 'md' | 'lg' | 'xl';
  imageHeight?: 'sm' | 'md' | 'lg';
  cols?: 1 | 2 | 3;
}

interface WithImageHeight {
  imageHeight?: 'sm' | 'md' | 'lg';
}

export default function CardGrid({
  children,
  cardWidth = 'md',
  imageHeight = 'lg',
  cols = 2,
}: CardGridProps) {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }[cols];

  const cardWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg lg:max-w-3xl xl:max-w-4xl',
    xl: 'sm:w-xl lg:w-3xl xl:w-7xl',
  }[cardWidth];

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<WithImageHeight>, {
        imageHeight,
      });
    }

    return child;
  });

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-10`}>
      {Children.map(childrenWithProps, (child) => (
        <div className={`flex justify-center ${cardWidthClass}`}>{child}</div>
      ))}
    </div>
  );
}
