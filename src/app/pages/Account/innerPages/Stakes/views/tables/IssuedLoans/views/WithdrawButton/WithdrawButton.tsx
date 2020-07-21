import React from 'react';

import { Button } from 'components';

export const WithdrawButton = (props: { onClick: () => void }) => {
  const { onClick } = props;
  return (
    <Button onClick={onClick} variant="outlined">
      Withdraw
    </Button>
  );
};
