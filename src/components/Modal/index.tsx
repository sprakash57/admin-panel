import React from 'react';
import ReactPortal from './ReactPortal';
import { ModalContainer, ModalContent, ModalOverlay } from './styled';

interface ModalProps {
  isOpen: boolean;
  outsideClickClosesModal?: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, children, onClose, outsideClickClosesModal = true }: ModalProps) => {
  const [ready, setReady] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (isOpen) setReady(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && outsideClickClosesModal) {
      const inner = containerRef?.current;
      const handleOutsideClick = (e: MouseEvent) => {
        const inside = inner?.contains(e.target as HTMLElement);
        if (!inside) onClose();
      };
      document.addEventListener('click', handleOutsideClick, true);
      return () => {
        document.removeEventListener('click', handleOutsideClick, true);
      };
    }
  }, [isOpen, outsideClickClosesModal, onClose, containerRef]);

  React.useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null);
    document.body.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <ReactPortal wrapperId='app-modal'>
      {isOpen && (
        <ModalOverlay data-ready={ready} aria-hidden={!isOpen}>
          <ModalContainer ref={containerRef as React.RefObject<HTMLDivElement>}>
            <button onClick={onClose}>X</button>
            <ModalContent>{children}</ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </ReactPortal>
  );
};

const MemoModal = React.memo(Modal);
MemoModal.displayName = 'MemoModal';

export default MemoModal;
