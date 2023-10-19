import React from 'react';
import ReactModal from 'react-modal';
import { ModalContent } from './styled';

ReactModal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalV2 = ({ isOpen, children, onClose }: Props) => {
  const modalStyle: ReactModal.Styles = {
    overlay: {
      position: 'fixed',
      inset: '0',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '999',
      background: 'rgb(255, 255, 255, 0.8)',
    },
    content: {
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
    },
  };
  console.log('react modal');
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <button onClick={onClose}>X</button>
      <ModalContent>{children}</ModalContent>
    </ReactModal>
  );
};

const MemoModalV2 = React.memo(ModalV2);
MemoModalV2.displayName = 'MemoModalV2';

export default MemoModalV2;
