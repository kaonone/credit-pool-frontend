// tslint:disable:max-line-length
const en = {
  app: {
    mainTitle: 'Akropolis Pool',
    connectingWarning: 'You need connect to wallet',
    pages: {},
    components: {
      header: {
        total: 'Total',
        availableBalance: 'Available balance',
        issued: 'Issued loans',
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
      'ptk.approve': {
        pending: 'ptk.approve transaction pending',
        success: 'ptk.approve transaction succeeded',
        error: 'ptk.approve transaction failed',
      },
      'liquidity.sellPtk': {
        pending: 'liquidity.sellPtk transaction pending',
        success: 'liquidity.sellPtk transaction succeeded',
        error: 'liquidity.sellPtk transaction failed',
      },
      'liquidity.buyPtk': {
        pending: 'liquidity.buyPtk transaction pending',
        success: 'liquidity.buyPtk transaction succeeded',
        error: 'liquidity.buyPtk transaction failed',
      },
      'loan.addPledge': {
        pending: 'loan.addPledge transaction pending',
        success: 'loan.addPledge transaction succeeded',
        error: 'loan.addPledge transaction failed',
      },
      'loan.createProposal': {
        pending: 'loan.createProposal transaction pending',
        success: 'loan.createProposal transaction succeeded',
        error: 'loan.createProposal transaction failed',
      },
    },
    cashExchange: {
      pTokenBuyingButton: {
        buttonTitle: 'Deposit',
        formTitle: 'Deposit to Pool',
        placeholder: 'Enter sum',
        confirmMessage: 'Are you sure you want deposit %{sourceAmount}?',
      },
      pTokenSellingButton: {
        buttonTitle: 'Withdraw',
        formTitle: 'Withdraw from Pool',
        placeholder: 'Enter sum',
        confirmMessage:
          'Are you sure you want withdraw %{sourceAmount}? You will get %{targetAmount} and will pay %{feeAmount} fee.',
      },
      stakeButton: {
        buttonTitle: 'Stake',
        formTitle: 'Stake',
        placeholder: 'Enter sum',
        confirmMessage: 'Are you sure you want to stake %{sourceAmount}?',
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
        confirmMessage:
          'Are you sure you want get loan %{sourceAmount} with collateral %{collateral}?',
      },
      exchangingForm: {
        cancelButtonText: 'Cancel',
        givenAmountText: 'You get ~%{formattedAmount}',
        targetAmountError: 'Please wait until amount is calculated',
      },
      exchangingConfirmation: {
        title: 'Confirm action',
        no: 'no',
        yes: 'yes',
      },
    },
    personalInformation: {
      title: 'Personal Information',
      deposit: 'Deposit',
      availableBalance: 'Available balance',
      locked: 'Locked',
      credit: 'Credit',
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
      notFound: 'Loan applications not found',
      lend: 'lend',
      to: 'to',
      apr: 'apr',
      staked: 'staked',
      collateral: 'Collateral',
      timeLeft: 'Time left',
      expansionPanelTitle: 'Reason',
      status: {
        PROPOSED: 'proposed',
        APPROVED: 'approved',
        DECLINED: 'declined',
        PARTIALLY_REPAYED: 'partially repayed',
        CLOSED: 'closed',
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
    activitiesCard: {
      expansionPanelTitle: 'Reason',
    },
  },
};

export { en };
