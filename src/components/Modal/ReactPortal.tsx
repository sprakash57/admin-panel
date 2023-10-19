import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  wrapperId?: string;
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

const ReactPortal = ({ children, wrapperId = 'react-portal-wrapper' }: Props) => {
  const [wrapperElement, setWrapperElement] = React.useState<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    let systemCreated = false;
    let element = document.getElementById(wrapperId) as HTMLDivElement;
    // if element is undefined then create one and append it to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId) as HTMLDivElement;
    }
    setWrapperElement(element);

    return () => {
      // delete the element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;
  return createPortal(children, wrapperElement);
};

export default ReactPortal;
