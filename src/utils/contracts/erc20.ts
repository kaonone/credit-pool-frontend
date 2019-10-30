import { makeContractCreator, getOutput, getInput } from 'utils/ethereum/makeContractCreator';
import erc20 from './erc20.abi.json';

export const createErc20 = makeContractCreator(
  erc20 as any[],
  {
    callMethods: {
      totalSupply: {
        output: getOutput('uint256'),
      },
      balanceOf: {
        inputs: [getInput('_owner', 'address')],
        output: getOutput('uint256'),
      },
    },
    sendMethods: {
      approve: {
        inputs: [getInput('_spender', 'address'), getInput('_value', 'uint256')],
        output: getOutput('bool'),
      },
    },
    events: {
      Transfer: {
        inputs: [getInput('_from', 'address'), getInput('_to', 'address'), getInput('_value', 'uint256')],
      },
      Approval: {
        inputs: [getInput('_owner', 'address'), getInput('_spender', 'address'), getInput('_value', 'uint256')],
      },
    },
  } as const,
);
