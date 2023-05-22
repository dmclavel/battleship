import React from 'react';

import { ARIA_DESCRIPTOR_STYLE } from '../../../shared/constants/styles';

import type { FC, ReactNode } from 'react';

interface AriaDescriptorProps {
  id: string;
  children: ReactNode;
}

const AriaDescriptor: FC<AriaDescriptorProps> = ({
  id,
  children,
}) => {
  return (
    <div
      id={id}
      style={{ ...ARIA_DESCRIPTOR_STYLE }}
    >
      {children}
    </div>
  );
};

export default AriaDescriptor;
