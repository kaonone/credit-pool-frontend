// tslint:disable:max-line-length
const en = {
  app: {
    mainTitle: 'Akropolis Pool',
    connectingWarning: 'You need connect to wallet',
    pages: {
      overview: {
        poolBalanceTitle: 'Input/Output costs',
        distributions: 'Distributions',
        myBalanceTitle: 'My balance',
        poolInfoTitle: 'Pool information',
      },
      balances: {
        balanceChangesTitle: 'Deposit/Withdraw history',
        earningsTitle: 'Earnings',
      },
    },
    components: {
      header: {
        total: 'Total',
        availableBalance: 'Available balance',
        issued: 'Issued loans',
      },
    },
  },
  features: {
    auth: {
      applicationNetwork: 'This application works with the network "%{networkName}"',
    },
    notifications: {
      'dai.approve': {
        pending: 'Approving %{amount} transfer. Pending',
        success: 'Approving %{amount} transfer. Successful',
        error: 'Approving %{amount} transfer. Failed',
      },
      'ptk.claimDistributions': {
        pending: 'Withdrawing distributions. Pending',
        success: 'Withdrawing distributions. Successful',
        error: 'Withdrawing distributions. Failed',
      },
      'liquidity.sellPtk': {
        pending: 'Withdrawing %{amount} from the pool. Pending',
        success: 'Withdrawing %{amount} from the pool. Successful',
        error: 'Withdrawing %{amount} from the pool. Failed',
      },
      'liquidity.buyPtk': {
        pending: 'Transferring %{amount} to the pool. Pending',
        success: 'Transferring %{amount} to the pool. Successful',
        error: 'Transferring %{amount} to the pool. Failed',
      },
      'loan.addPledge': {
        pending: 'Adding pledge for the loan. Pending',
        success: 'Adding pledge for the loan. Successful',
        error: 'Adding pledge for the loan. Failed',
      },
      'loan.unstakePledge': {
        pending: 'Withdrawing pledge from the loan. Pending',
        success: 'Withdrawing pledge from the loan. Successful',
        error: 'Withdrawing pledge from the loan. Failed',
      },
      'loan.withdrawUnlockedPledge': {
        pending: 'Withdraw unlocked stake and earn from the loan. Pending',
        success: 'Withdraw unlocked stake and earn from the loan. Successful',
        error: 'Withdraw unlocked stake and earn from the loan. Failed',
      },
      'loan.createProposal': {
        pending: 'Creating a loan proposal. Pending',
        success: 'Creating a loan proposal. Successful',
        error: 'Creating a loan proposal. Failed',
      },
      'loan.executeProposal': {
        pending: 'Loan activation. Pending',
        success: 'Loan activation. Successful',
        error: 'Loan activation. Failed',
      },
      'loan.liquidateDebt': {
        pending: 'Loan liquidation. Pending',
        success: 'Loan liquidation. Successful',
        error: 'Loan liquidation. Failed',
      },
      'loan.repay': {
        pending: 'Loan repaying. Pending',
        success: 'Loan repaying. Successful',
        error: 'Loan repaying. Failed',
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
        confirmMessage: 'Are you sure you want withdraw %{sourceAmount}?',
      },
      stakeButton: {
        buttonTitle: 'Stake',
        formTitle: 'Stake',
        placeholder: 'Enter sum',
        confirmMessage:
          'Are you sure you want to stake %{sourceAmount}? Your interest share will increase by %{interestShareDelta}',
      },
      unstakeButton: {
        buttonTitle: 'Unstake',
        formTitle: 'Unstake',
        placeholder: 'Enter sum',
        confirmMessage:
          'Are you sure you want to unstake %{sourceAmount}? Your interest share will decrease by %{interestShareDelta}',
      },
      repayButton: {
        buttonTitle: 'Repay',
        formTitle: 'Repay',
        placeholder: 'Enter sum',
        confirmMessage:
          'Are you sure you want to repay %{sourceAmount}? Loan body: ~%{body}, interest: ~%{interest}',
        fields: {
          repaymentMethod: {
            fromOwnBalance: 'from own balance',
            fromAvailablePoolBalance: 'from available pool balance',
          },
        },
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
      activateLoanButton: {
        confirmMessage:
          'Are you sure you want to activate a loan? Please note that your loan will be transferred directly to your wallet.',
      },
      liquidateLoanButton: {
        confirmMessage: 'Are you sure you want to liquidate a loan?',
      },
      unlockButton: {
        buttonTitle: 'Unlock',
        confirmMessage:
          'Are you sure you want to withdraw unlocked stake %{pledgeForUnlock} and earn %{earnForUnlock}?',
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
      deposit: 'Deposit',
      availableBalance: 'Available balance',
      currentProfit: 'Current profit',
      locked: 'Locked',
      credit: 'Current loans',
    },
    distributions: {
      accumulated: 'Accumulated',
      untilTheNextDistribution: 'Time to Next Distribution',
      awaitingDistribution: 'Awaiting distribution',
      withdrawButton: 'Withdraw my distributions',
      withdrawConfirmationMessage:
        'Are you sure you want to withdraw %{distributions} from distributions? This happens automatically when you change your balance.',
    },
    balance: {
      changes: {
        notFound: 'Balance changes not found',
        date: 'Date',
        type: 'Action',
        amount: 'Amount',
        types: {
          DEPOSIT: 'Deposit',
          WITHDRAW: 'Withdraw',
        },
      },
      earnings: {
        notFound: 'Earnings not found',
        date: 'Date',
        type: 'Type',
        amount: 'Amount',
        types: {
          DEBT_INTEREST: 'Loan interest',
          POOL_DISTRIBUTIONS: 'Pool distribution',
        },
      },
    },
    loans: {
      loansList: {
        myLoans: 'My loans',
        myGuarantees: 'My guarantees',
        others: 'Others',
      },
      loansPanel: {
        notFound: 'Loans not found',
        address: 'Address',
        loan: 'Loan',
        duePayment: 'Due payment',
        borrowApr: 'Borrow APR',
        earn: 'Earn',
        status: 'Status',
        myStake: 'My stake',
        myInterestShare: 'Interest share',
        paymentDate: 'Payment date',
        statuses: {
          PROPOSED: '%{pledgeProgress}% staked',
          EXECUTED: 'executed',
          PARTIALLY_REPAYED: 'partially repayed',
          CLOSED: 'closed',
        },
      },
    },
    loanApplications: {
      notFound: 'Loan applications not found',
      lend: 'lend',
      to: 'to',
      apr: 'apr',
      myStake: 'My stake',
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
      onEnglishPlease: 'Should contain only english letters, numbers and ",.!:\'""',
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
