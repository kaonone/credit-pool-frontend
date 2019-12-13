import React from 'react';
import { GetProps } from '_helpers';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { BuyCashIcon, SellCashIcon } from 'components/icons';
import { ModalButton, Button } from 'components';

import { PTokenBuyingForm } from '../PTokenBuyingForm/PTokenBuyingForm';
import { PTokenSellingForm } from '../PTokenSellingForm/PTokenSellingForm';
import { Direction } from '../PTokenExchangingForm/PTokenExchangingForm';

interface IOwnProps {
  direction: Direction;
}

type IProps = Omit<GetProps<typeof Button>, 'ref'> & IOwnProps;

const tKeys = tKeysAll.features.cashExchange.pTokenExchangingButton;

export function PTokenExchangingButton(props: IProps) {
  const { direction, ...restProps } = props;
  const { t } = useTranslate();

  return (
    <>
      {direction === 'buy' ? (
        <ModalButton
          startIcon={<BuyCashIcon />}
          content={t(tKeys.buyPtk.getKey())}
          fullWidth
          {...restProps}
        >
          {({ closeModal }) => <PTokenBuyingForm onCancel={closeModal} />}
        </ModalButton>
      ) : (
        <ModalButton
          startIcon={<SellCashIcon />}
          content={t(tKeys.sellPtk.getKey())}
          fullWidth
          {...restProps}
        >
          {({ closeModal }) => <PTokenSellingForm onCancel={closeModal} />}
        </ModalButton>
      )}
    </>
  );
}
