import React from 'react'
import { Modal } from 'flowbite-react'

export type ModalProps = {
  children: React.ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
  show?: boolean;
  title?: string;
  footer?: React.ReactNode;
}

const AppModal = (props: ModalProps) => {
  const { children, dismissible, onClose, show, title, footer } = props;

  return (
    <Modal
      dismissible={dismissible}
      show={show}
      onClose={onClose}

    >
      <Modal.Header>
        {title}
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      {footer && <Modal.Footer>
        {footer}
      </Modal.Footer>}
    </Modal>
  )
}

AppModal.defaultProps = {
  dismissible: true,
  show: false,
  children: null,
  onClose: () => { },
  title: 'Modal header',
  footer: null,
}

export default AppModal