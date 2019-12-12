// tslint:disable:max-line-length
const en = {
  app: {
    mainTitle: 'Akropolis Pool',
    pages: {},
    components: {
      header: {
        balance: 'balance',
        issued: 'issued ptk',
        price: 'ptk price',
      },
    },
  },
  features: {
    notifications: {
      'dai.transfer': {
        pending: 'dai.transfer transaction pending',
        success: 'dai.transfer transaction succeeded',
        error: 'dai.transfer transaction failed',
      },
      'dai.approve': {
        pending: 'dai.approve transaction pending',
        success: 'dai.approve transaction succeeded',
        error: 'dai.approve transaction failed',
      },
      'pull.sellPtk': {
        pending: 'pull.sellPtk transaction pending',
        success: 'pull.sellPtk transaction succeeded',
        error: 'pull.sellPtk transaction failed',
      },
      'pull.buyPtk': {
        pending: 'pull.buyPtk transaction pending',
        success: 'pull.buyPtk transaction succeeded',
        error: 'pull.buyPtk transaction failed',
      },
    },
    cashExchange: {
      pTokenExchangingButton: {
        buyPtk: 'Buy PTK',
        sellPtk: 'Sell PTK',
      },
      cashExchangeForm: {
        cancelButtonText: 'Cancel',
        givenAmountText: 'You get ~%{formattedAmount}',
        targetAmountError: 'Please, wait until amount is calculated',
      },
      cashBuyingForm: {
        title: 'Buy cash',
        placeholder: 'Enter sum',
      },
      cashSellingForm: {
        title: 'Sell cash',
        placeholder: 'Enter sum',
      },
      confirmCashExchangeForm: {
        title: 'Confirm exchanging',
        confirmMessage: 'Are you sure you want exchange %{givenAmount} on %{receivedAmount}?',
        no: 'no',
        yes: 'yes',
      },
    },
  },
  utils: {
    validation: {
      isRequired: 'Field is required',
      moreThen: 'Should be more then %{value}',
      moreThenOrEqual: 'Should be more then or equal %{value}',
      lessThenOrEqual: 'Should be less then or equal %{value}',
      notDefault: 'Value must be different from initial',
      maxStringLength: 'Text should be less then %{max} letters',
      onEnglishPlease: 'Should contain only english letters and numbers',
      isNumber: 'Enter a valid number',
      decimalsMoreThen: 'Enter a valid number with decimals less than %{decimals} digits',
      mustBeAnInteger: 'Enter an integer',
      isPositiveNumber: 'Must be positive number',
    },
  },
  components: {
    pagination: {
      itemsPerPage: 'Items per page',
      currentPagination: '%{from} - %{to} of %{total}',
      currentSubgraphPagination: '%{from} - %{to}',
    },
    personalInformation: {
      title: 'Personal Information',
      deposit: 'deposit',
      liquid: 'liquid ptk',
      staked: 'staked ptk',
      credit: 'credit',
    },
    activitiesCard: {
      lend: 'lend',
      to: 'to',
      apr: 'apr',
      staked: 'staked',
      collateral: 'Collateral',
      timeLeft: 'Time left',
      expansionPanelTitle: 'Reason',
      status: {
        APPROVED: 'approved',
        DECLINED: 'declined',
        PENDING: 'pending',
      },
    },
  },
};

export { en };
