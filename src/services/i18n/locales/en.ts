// tslint:disable:max-line-length
const en = {
  app: {
    mainTitle: 'Akropolis Pool',
    connectingWarning: 'You need connect to wallet',
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
      'pool.sellPtk': {
        pending: 'pool.sellPtk transaction pending',
        success: 'pool.sellPtk transaction succeeded',
        error: 'pool.sellPtk transaction failed',
      },
      'pool.buyPtk': {
        pending: 'pool.buyPtk transaction pending',
        success: 'pool.buyPtk transaction succeeded',
        error: 'pool.buyPtk transaction failed',
      },
      'pool.stakePtk': {
        pending: 'pool.stakePtk transaction pending',
        success: 'pool.stakePtk transaction succeeded',
        error: 'pool.stakePtk transaction failed',
      },
      'pool.getLoan': {
        pending: 'pool.getLoan transaction pending',
        success: 'pool.getLoan transaction succeeded',
        error: 'pool.getLoan transaction failed',
      },
    },
    cashExchange: {
      pTokenBuyingButton: {
        buttonTitle: 'Buy PTK',
        formTitle: 'Buy Pool Tokens',
        placeholder: 'Enter sum',
      },
      pTokenSellingButton: {
        buttonTitle: 'Sell PTK',
        formTitle: 'Sell Pool Tokens',
        placeholder: 'Enter sum',
      },
      stakeButton: {
        buttonTitle: 'Stake',
        formTitle: 'Stake',
        placeholder: 'Enter sum',
        confirmText:
          'Are you sure you want to stake %{sourceAmount} and cover deposit %{targetAmount}?',
        calculatedAmountText: 'You cover deposit ~%{formattedAmount}',
      },
      getLoanButton: {
        buttonTitle: 'Get loan',
        formTitle: 'Get loan',
        amountPlaceholder: 'Enter sum',
        amountLabel: 'Loan sum',
        percentPlaceholder: 'Enter percent value',
        percentLabel: 'Percent',
        descriptionPlaceholder: 'Enter reason',
        descriptionLabel: 'Reason',
        confirmText:
          'Are you sure you want get loan %{sourceAmount} with collateral %{targetAmount}?',
        calculatedAmountText: 'Collateral will be ~%{formattedAmount}',
      },
      exchangingForm: {
        cancelButtonText: 'Cancel',
        givenAmountText: 'You get ~%{formattedAmount}',
        targetAmountError: 'Please wait until amount is calculated',
      },
      exchangingConfirmation: {
        title: 'Confirm action',
        confirmMessage: 'Are you sure you want exchange %{sourceAmount} on %{targetAmount}?',
        no: 'no',
        yes: 'yes',
      },
    },
    loans: {
      loansList: {
        myLoans: 'My loans',
        myGuarantees: 'My guarantees',
        others: 'Others',
      },
      loansPanel: {
        address: 'Address',
        loan: 'Loan',
        duePayment: 'Due payment',
        borrowApr: 'Borrow APR',
        earn: 'Earn',
        status: 'Status',
        myStake: 'My stake',
        paymentDate: 'Payment date',
        statuses: {
          closed: 'closed',
          opened: 'opened',
        },
      },
    },
    loanApplications: {
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
      expansionPanelTitle: 'Reason',
    },
  },
};

export { en };
