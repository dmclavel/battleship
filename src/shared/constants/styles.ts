import type { CSSProperties } from 'react';

type CenterModalStyle = {
  position: CSSProperties['position'];
  top: CSSProperties['top'];
  left: CSSProperties['left'];
  transform: CSSProperties['transform'];
};

type AriaDescriptorStyle = {
  position: CSSProperties['position'];
  opacity: CSSProperties['opacity'];
  zIndex: CSSProperties['zIndex'];
};

const CENTER_MODAL_STYLE: CenterModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const ARIA_DESCRIPTOR_STYLE: AriaDescriptorStyle = {
  position: 'absolute',
  opacity: 0,
  zIndex: -1,
};

export type { CenterModalStyle, AriaDescriptorStyle };
export { CENTER_MODAL_STYLE, ARIA_DESCRIPTOR_STYLE };
