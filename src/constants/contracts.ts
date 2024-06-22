export const LOTTERIES_CONTRACT_PRODUCTION =
  '0xC3B0902A13E7f6E83eB48f726F7ffE120d54a805';
export const LOTTERIES_CONTRACT = '0x3e1B84e3300dE3BE0265C67eB5509a737B5D9f02';

export const LOTTERIES_ABI = [
  {
      inputs: [
          {
              internalType: "address",
              name: "_owner",
              type: "address",
          },
          {
              internalType: "address",
              name: "_ref",
              type: "address",
          },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      name: "History",
      outputs: [
          {
              internalType: "uint256",
              name: "ids",
              type: "uint256",
          },
          {
              components: [
                  {
                      internalType: "string",
                      name: "ticker",
                      type: "string",
                  },
                  {
                      internalType: "address",
                      name: "token",
                      type: "address",
                  },
                  {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                  },
              ],
              internalType: "struct LotteryManager.Prizes",
              name: "userPrizes",
              type: "tuple",
          },
          {
              components: [
                  {
                      internalType: "uint32[]",
                      name: "tickets",
                      type: "uint32[]",
                  },
                  {
                      internalType: "uint256",
                      name: "optional",
                      type: "uint256",
                  },
              ],
              internalType: "struct LotteryManager.Tickets",
              name: "tickets",
              type: "tuple",
          },
          {
              internalType: "uint256",
              name: "finalDates",
              type: "uint256",
          },
          {
              internalType: "uint256",
              name: "winnerNumber",
              type: "uint256",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      name: "avaiableLotteries",
      outputs: [
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "uint32[]",
              name: "myTickets",
              type: "uint32[]",
          },
          {
              internalType: "uint256",
              name: "id",
              type: "uint256",
          },
      ],
      name: "buyTickets",
      outputs: [],
      stateMutability: "payable",
      type: "function",
  },
  {
      inputs: [],
      name: "claimPrize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "token",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
          },
          {
              internalType: "uint8",
              name: "loops",
              type: "uint8",
          },
          {
              internalType: "uint8",
              name: "_type",
              type: "uint8",
          },
          {
              internalType: "uint256",
              name: "ticketPrice",
              type: "uint256",
          },
          {
              internalType: "address",
              name: "newLottery",
              type: "address",
          },
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
          {
              internalType: "string",
              name: "_ticker",
              type: "string",
          },
      ],
      name: "createLottery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "uint256",
              name: "id",
              type: "uint256",
          },
      ],
      name: "deleteLottery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "uint256",
              name: "id",
              type: "uint256",
          },
      ],
      name: "getData",
      outputs: [
          {
              components: [
                  {
                      internalType: "address",
                      name: "token",
                      type: "address",
                  },
                  {
                      internalType: "uint256",
                      name: "prize",
                      type: "uint256",
                  },
                  {
                      internalType: "int8",
                      name: "loops",
                      type: "int8",
                  },
                  {
                      internalType: "uint8",
                      name: "_type",
                      type: "uint8",
                  },
                  {
                      internalType: "address",
                      name: "creator",
                      type: "address",
                  },
                  {
                      internalType: "address",
                      name: "contractAddr",
                      type: "address",
                  },
                  {
                      internalType: "uint256",
                      name: "ticketPrice",
                      type: "uint256",
                  },
                  {
                      internalType: "uint256",
                      name: "Id",
                      type: "uint256",
                  },
                  {
                      internalType: "uint16",
                      name: "subId",
                      type: "uint16",
                  },
                  {
                      internalType: "string",
                      name: "_ticker",
                      type: "string",
                  },
                  {
                      internalType: "uint256",
                      name: "currentPrize",
                      type: "uint256",
                  },
              ],
              internalType: "struct LotteryManager.LotteryData",
              name: "",
              type: "tuple",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
      ],
      name: "getFinalDates",
      outputs: [
          {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "id",
              type: "uint256",
          },
      ],
      name: "getIdPrizes",
      outputs: [
          {
              components: [
                  {
                      internalType: "string",
                      name: "ticker",
                      type: "string",
                  },
                  {
                      internalType: "address",
                      name: "token",
                      type: "address",
                  },
                  {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                  },
              ],
              internalType: "struct LotteryManager.Prizes[]",
              name: "",
              type: "tuple[]",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
      ],
      name: "getIds",
      outputs: [
          {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [],
      name: "getLotteries",
      outputs: [
          {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
      ],
      name: "getPrizes",
      outputs: [
          {
              components: [
                  {
                      internalType: "string",
                      name: "ticker",
                      type: "string",
                  },
                  {
                      internalType: "address",
                      name: "token",
                      type: "address",
                  },
                  {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                  },
              ],
              internalType: "struct LotteryManager.Prizes[]",
              name: "",
              type: "tuple[]",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
      ],
      name: "getTickets",
      outputs: [
          {
              components: [
                  {
                      internalType: "uint32[]",
                      name: "tickets",
                      type: "uint32[]",
                  },
                  {
                      internalType: "uint256",
                      name: "optional",
                      type: "uint256",
                  },
              ],
              internalType: "struct LotteryManager.Tickets[]",
              name: "",
              type: "tuple[]",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
      ],
      name: "getUserHistory",
      outputs: [
          {
              components: [
                  {
                      internalType: "uint256",
                      name: "ids",
                      type: "uint256",
                  },
                  {
                      components: [
                          {
                              internalType: "string",
                              name: "ticker",
                              type: "string",
                          },
                          {
                              internalType: "address",
                              name: "token",
                              type: "address",
                          },
                          {
                              internalType: "uint256",
                              name: "amount",
                              type: "uint256",
                          },
                          {
                              internalType: "bool",
                              name: "isClaimed",
                              type: "bool",
                          },
                      ],
                      internalType: "struct LotteryManager.Prizes",
                      name: "userPrizes",
                      type: "tuple",
                  },
                  {
                      components: [
                          {
                              internalType: "uint32[]",
                              name: "tickets",
                              type: "uint32[]",
                          },
                          {
                              internalType: "uint256",
                              name: "optional",
                              type: "uint256",
                          },
                      ],
                      internalType: "struct LotteryManager.Tickets",
                      name: "tickets",
                      type: "tuple",
                  },
                  {
                      internalType: "uint256",
                      name: "finalDates",
                      type: "uint256",
                  },
                  {
                      internalType: "uint256",
                      name: "winnerNumber",
                      type: "uint256",
                  },
              ],
              internalType: "struct LotteryManager.ParticipationsData[]",
              name: "",
              type: "tuple[]",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
      ],
      name: "getUserPrizes",
      outputs: [
          {
              components: [
                  {
                      internalType: "string",
                      name: "ticker",
                      type: "string",
                  },
                  {
                      internalType: "address",
                      name: "token",
                      type: "address",
                  },
                  {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                  },
              ],
              internalType: "struct LotteryManager.userPrize[]",
              name: "",
              type: "tuple[]",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
      ],
      name: "getWinnerNumbers",
      outputs: [
          {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      name: "isInSubId",
      outputs: [
          {
              internalType: "bool",
              name: "",
              type: "bool",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      name: "lotteryAddresses",
      outputs: [
          {
              internalType: "address",
              name: "",
              type: "address",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [],
      name: "lotteryId",
      outputs: [
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      name: "lotteryMap",
      outputs: [
          {
              internalType: "address",
              name: "token",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "prize",
              type: "uint256",
          },
          {
              internalType: "int8",
              name: "loops",
              type: "int8",
          },
          {
              internalType: "uint8",
              name: "_type",
              type: "uint8",
          },
          {
              internalType: "address",
              name: "creator",
              type: "address",
          },
          {
              internalType: "address",
              name: "contractAddr",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "ticketPrice",
              type: "uint256",
          },
          {
              internalType: "uint256",
              name: "Id",
              type: "uint256",
          },
          {
              internalType: "uint16",
              name: "subId",
              type: "uint16",
          },
          {
              internalType: "string",
              name: "_ticker",
              type: "string",
          },
          {
              internalType: "uint256",
              name: "currentPrize",
              type: "uint256",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [],
      name: "owner",
      outputs: [
          {
              internalType: "address",
              name: "",
              type: "address",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      name: "participations",
      outputs: [
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [],
      name: "ref",
      outputs: [
          {
              internalType: "contract ReferralProgram",
              name: "",
              type: "address",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
  {
      inputs: [],
      name: "sendPrizeToWinners",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "user",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
          },
          {
              internalType: "address",
              name: "token",
              type: "address",
          },
          {
              internalType: "string",
              name: "tick",
              type: "string",
          },
          {
              internalType: "bool",
              name: "returnPrize",
              type: "bool",
          },
          {
              internalType: "uint256",
              name: "id",
              type: "uint256",
          },
      ],
      name: "sendUserPrizes",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "uint256",
              name: "time",
              type: "uint256",
          },
      ],
      name: "setDuration",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "uint256",
              name: "price",
              type: "uint256",
          },
      ],
      name: "setMinTicketPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      inputs: [
          {
              internalType: "address",
              name: "",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "",
              type: "uint256",
          },
      ],
      name: "userPrizes",
      outputs: [
          {
              internalType: "string",
              name: "ticker",
              type: "string",
          },
          {
              internalType: "address",
              name: "token",
              type: "address",
          },
          {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
          },
      ],
      stateMutability: "view",
      type: "function",
  },
];
