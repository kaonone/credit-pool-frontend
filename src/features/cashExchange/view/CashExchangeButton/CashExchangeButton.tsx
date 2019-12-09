import React from 'react';

import { ITranslateKey } from 'services/i18n';
import { ModalButton } from 'components';

interface IContentProps {
  onCancel(): void;
}

interface IProps {
  ModalContent: React.ComponentType<IContentProps>;
  text: ITranslateKey;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function CashExchangeButton(props: IProps) {
  const { ModalContent: Form, text, icon, disabled } = props;

  return (
    <ModalButton
      size="large"
      color="secondary"
      variant="contained"
      startIcon={icon}
      content={text}
      disabled={disabled}
      fullWidth
    >
      {({ closeModal }) => <Form onCancel={closeModal} />}
    </ModalButton>
  );
}
