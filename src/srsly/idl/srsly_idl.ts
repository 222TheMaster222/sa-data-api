/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/srsly.json`.
 */
export type Srsly = {
    version: '1.0.0';
    name: 'srsly';
    address: 'SRSLY1fq9TJqCk1gNSE7VZL2bztvTn9wm4VR8u8jMKT';
    metadata: {
        name: 'srsly';
        version: '1.0.0';
        spec: '0.1.0';
        description: 'Space Rental from SLY';
    };
    instructions: [
        {
            name: 'acceptRental';
            discriminator: [192, 221, 241, 212, 141, 161, 36, 146];
            accounts: [
                {
                    name: 'mint';
                    address: 'ATLA5nAaVRfH6BNwD4SAyWp96EdQaAh6bBmGeTx956sx';
                    kind: 'account';
                    path: 'mint';
                },
                {
                    name: 'borrower';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'borrowerProfile';
                },
                {
                    name: 'borrowerProfileFaction';
                },
                {
                    name: 'borrowerTokenAccount';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'borrower';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'mint';
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'fleet';
                    writable: true;
                    relations: ['contract'];
                },
                {
                    name: 'gameId';
                },
                {
                    name: 'starbase';
                },
                {
                    name: 'starbasePlayer';
                    writable: true;
                },
                {
                    name: 'contract';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [114, 101, 110, 116, 97, 108, 95, 99, 111, 110, 116, 114, 97, 99, 116];
                            },
                            {
                                kind: 'account';
                                path: 'contract.fleet';
                                account: 'contractState';
                            }
                        ];
                    };
                },
                {
                    name: 'rentalState';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [114, 101, 110, 116, 97, 108, 95, 115, 116, 97, 116, 101];
                            },
                            {
                                kind: 'account';
                                path: 'contract';
                            },
                            {
                                kind: 'account';
                                path: 'borrower';
                            }
                        ];
                    };
                },
                {
                    name: 'rentalAuthority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    114,
                                    101,
                                    110,
                                    116,
                                    97,
                                    108,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'rentalTokenAccount';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'rentalState';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'mint';
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'rentalThread';
                    writable: true;
                },
                {
                    name: 'feeTokenAccount';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    200,
                                    182,
                                    122,
                                    108,
                                    74,
                                    122,
                                    176,
                                    202,
                                    84,
                                    111,
                                    116,
                                    161,
                                    175,
                                    85,
                                    111,
                                    229,
                                    188,
                                    105,
                                    205,
                                    151,
                                    154,
                                    187,
                                    178,
                                    50,
                                    133,
                                    209,
                                    48,
                                    56,
                                    107,
                                    39,
                                    184,
                                    43
                                ];
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'mint';
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'sageProgram';
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi';
                },
                {
                    name: 'antegenProgram';
                    address: 'AgThdyi1P5RkVeZD2rQahTvs8HePJoGFFxKtvok5s2J1';
                },
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'associatedTokenProgram';
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [
                {
                    name: 'amount';
                    type: 'u64';
                },
                {
                    name: 'duration';
                    type: 'u64';
                }
            ];
        },
        {
            name: 'cancelRental';
            discriminator: [97, 204, 63, 8, 84, 34, 28, 43];
            accounts: [
                {
                    name: 'borrower';
                    signer: true;
                    relations: ['rentalState'];
                },
                {
                    name: 'rentalThread';
                },
                {
                    name: 'contract';
                },
                {
                    name: 'rentalState';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [114, 101, 110, 116, 97, 108, 95, 115, 116, 97, 116, 101];
                            },
                            {
                                kind: 'account';
                                path: 'rental_state.contract';
                                account: 'rentalState';
                            },
                            {
                                kind: 'account';
                                path: 'borrower';
                            }
                        ];
                    };
                }
            ];
            args: [];
        },
        {
            name: 'closeContract';
            discriminator: [37, 244, 34, 168, 92, 202, 80, 106];
            accounts: [
                {
                    name: 'owner';
                    writable: true;
                    signer: true;
                    relations: ['contract'];
                },
                {
                    name: 'ownerTokenAccount';
                    writable: true;
                    optional: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'owner';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'const';
                                value: [
                                    140,
                                    119,
                                    241,
                                    156,
                                    255,
                                    59,
                                    87,
                                    34,
                                    56,
                                    120,
                                    33,
                                    198,
                                    221,
                                    208,
                                    211,
                                    20,
                                    190,
                                    93,
                                    159,
                                    12,
                                    154,
                                    136,
                                    45,
                                    46,
                                    161,
                                    10,
                                    152,
                                    60,
                                    85,
                                    252,
                                    217,
                                    191
                                ];
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'rentalTokenAccount';
                    writable: true;
                    optional: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'contract.current_rental_state';
                                account: 'contractState';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'const';
                                value: [
                                    140,
                                    119,
                                    241,
                                    156,
                                    255,
                                    59,
                                    87,
                                    34,
                                    56,
                                    120,
                                    33,
                                    198,
                                    221,
                                    208,
                                    211,
                                    20,
                                    190,
                                    93,
                                    159,
                                    12,
                                    154,
                                    136,
                                    45,
                                    46,
                                    161,
                                    10,
                                    152,
                                    60,
                                    85,
                                    252,
                                    217,
                                    191
                                ];
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'borrowerTokenAccount';
                    writable: true;
                    optional: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'rentalState';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'const';
                                value: [
                                    140,
                                    119,
                                    241,
                                    156,
                                    255,
                                    59,
                                    87,
                                    34,
                                    56,
                                    120,
                                    33,
                                    198,
                                    221,
                                    208,
                                    211,
                                    20,
                                    190,
                                    93,
                                    159,
                                    12,
                                    154,
                                    136,
                                    45,
                                    46,
                                    161,
                                    10,
                                    152,
                                    60,
                                    85,
                                    252,
                                    217,
                                    191
                                ];
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'rentalState';
                    writable: true;
                    optional: true;
                },
                {
                    name: 'fleet';
                    writable: true;
                },
                {
                    name: 'gameId';
                    optional: true;
                },
                {
                    name: 'starbase';
                    optional: true;
                },
                {
                    name: 'starbasePlayer';
                    writable: true;
                    optional: true;
                },
                {
                    name: 'contract';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [114, 101, 110, 116, 97, 108, 95, 99, 111, 110, 116, 114, 97, 99, 116];
                            },
                            {
                                kind: 'account';
                                path: 'contract.fleet';
                                account: 'contractState';
                            }
                        ];
                    };
                },
                {
                    name: 'rentalAuthority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    114,
                                    101,
                                    110,
                                    116,
                                    97,
                                    108,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'sageProgram';
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi';
                },
                {
                    name: 'tokenProgram';
                    optional: true;
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                }
            ];
            args: [];
        },
        {
            name: 'closeRental';
            discriminator: [179, 188, 113, 211, 41, 232, 51, 51];
            accounts: [
                {
                    name: 'borrower';
                    writable: true;
                    signer: true;
                    relations: ['rentalState'];
                },
                {
                    name: 'borrowerTokenAccount';
                    writable: true;
                },
                {
                    name: 'ownerTokenAccount';
                    writable: true;
                },
                {
                    name: 'contract';
                },
                {
                    name: 'rentalState';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [114, 101, 110, 116, 97, 108, 95, 115, 116, 97, 116, 101];
                            },
                            {
                                kind: 'account';
                                path: 'rental_state.contract';
                                account: 'rentalState';
                            },
                            {
                                kind: 'account';
                                path: 'rental_state.borrower';
                                account: 'rentalState';
                            }
                        ];
                    };
                },
                {
                    name: 'rentalTokenAccount';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'rentalState';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'const';
                                value: [
                                    140,
                                    119,
                                    241,
                                    156,
                                    255,
                                    59,
                                    87,
                                    34,
                                    56,
                                    120,
                                    33,
                                    198,
                                    221,
                                    208,
                                    211,
                                    20,
                                    190,
                                    93,
                                    159,
                                    12,
                                    154,
                                    136,
                                    45,
                                    46,
                                    161,
                                    10,
                                    152,
                                    60,
                                    85,
                                    252,
                                    217,
                                    191
                                ];
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'rentalAuthority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    114,
                                    101,
                                    110,
                                    116,
                                    97,
                                    108,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'rentalThread';
                    writable: true;
                },
                {
                    name: 'antegenProgram';
                    address: 'AgThdyi1P5RkVeZD2rQahTvs8HePJoGFFxKtvok5s2J1';
                },
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                }
            ];
            args: [];
        },
        {
            name: 'createContract';
            discriminator: [244, 48, 244, 178, 216, 88, 122, 52];
            accounts: [
                {
                    name: 'mint';
                    address: 'ATLA5nAaVRfH6BNwD4SAyWp96EdQaAh6bBmGeTx956sx';
                },
                {
                    name: 'owner';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'ownerTokenAccount';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'owner';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'account';
                                path: 'mint';
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'fleet';
                    writable: true;
                },
                {
                    name: 'ownerProfile';
                    relations: ['fleet'];
                },
                {
                    name: 'gameId';
                },
                {
                    name: 'contract';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [114, 101, 110, 116, 97, 108, 95, 99, 111, 110, 116, 114, 97, 99, 116];
                            },
                            {
                                kind: 'account';
                                path: 'fleet';
                            }
                        ];
                    };
                },
                {
                    name: 'rentalAuthority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    114,
                                    101,
                                    110,
                                    116,
                                    97,
                                    108,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                },
                {
                    name: 'associatedTokenProgram';
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
                },
                {
                    name: 'systemProgram';
                    address: '11111111111111111111111111111111';
                },
                {
                    name: 'sageProgram';
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi';
                }
            ];
            args: [
                {
                    name: 'rate';
                    type: 'u64';
                },
                {
                    name: 'durationMin';
                    type: 'u64';
                },
                {
                    name: 'durationMax';
                    type: 'u64';
                },
                {
                    name: 'paymentsFeq';
                    type: 'string';
                },
                {
                    name: 'ownerKeyIndex';
                    type: 'u16';
                }
            ];
        },
        {
            name: 'payRental';
            discriminator: [114, 15, 111, 207, 115, 207, 108, 169];
            accounts: [
                {
                    name: 'borrower';
                    writable: true;
                },
                {
                    name: 'borrowerTokenAccount';
                    writable: true;
                },
                {
                    name: 'owner';
                    writable: true;
                },
                {
                    name: 'ownerTokenAccount';
                    writable: true;
                },
                {
                    name: 'fleet';
                    writable: true;
                },
                {
                    name: 'gameId';
                },
                {
                    name: 'starbase';
                },
                {
                    name: 'starbasePlayer';
                    writable: true;
                },
                {
                    name: 'contract';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [114, 101, 110, 116, 97, 108, 95, 99, 111, 110, 116, 114, 97, 99, 116];
                            },
                            {
                                kind: 'account';
                                path: 'contract.fleet';
                                account: 'contractState';
                            }
                        ];
                    };
                },
                {
                    name: 'rentalState';
                    writable: true;
                },
                {
                    name: 'rentalAuthority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    114,
                                    101,
                                    110,
                                    116,
                                    97,
                                    108,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'rentalTokenAccount';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'rentalState';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'const';
                                value: [
                                    140,
                                    119,
                                    241,
                                    156,
                                    255,
                                    59,
                                    87,
                                    34,
                                    56,
                                    120,
                                    33,
                                    198,
                                    221,
                                    208,
                                    211,
                                    20,
                                    190,
                                    93,
                                    159,
                                    12,
                                    154,
                                    136,
                                    45,
                                    46,
                                    161,
                                    10,
                                    152,
                                    60,
                                    85,
                                    252,
                                    217,
                                    191
                                ];
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'rentalThread';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'sageProgram';
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi';
                },
                {
                    name: 'antegenProgram';
                    address: 'AgThdyi1P5RkVeZD2rQahTvs8HePJoGFFxKtvok5s2J1';
                },
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                }
            ];
            args: [];
            returns: {
                defined: {
                    name: 'threadResponse';
                };
            };
        },
        {
            name: 'resetRental';
            discriminator: [139, 185, 76, 32, 61, 143, 163, 183];
            accounts: [
                {
                    name: 'owner';
                    writable: true;
                    signer: true;
                },
                {
                    name: 'ownerTokenAccount';
                    writable: true;
                },
                {
                    name: 'borrowerTokenAccount';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'rental_state.borrower';
                                account: 'rentalState';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'const';
                                value: [
                                    140,
                                    119,
                                    241,
                                    156,
                                    255,
                                    59,
                                    87,
                                    34,
                                    56,
                                    120,
                                    33,
                                    198,
                                    221,
                                    208,
                                    211,
                                    20,
                                    190,
                                    93,
                                    159,
                                    12,
                                    154,
                                    136,
                                    45,
                                    46,
                                    161,
                                    10,
                                    152,
                                    60,
                                    85,
                                    252,
                                    217,
                                    191
                                ];
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'fleet';
                    writable: true;
                },
                {
                    name: 'gameId';
                },
                {
                    name: 'starbase';
                },
                {
                    name: 'starbasePlayer';
                    writable: true;
                },
                {
                    name: 'contract';
                },
                {
                    name: 'rentalThread';
                },
                {
                    name: 'rentalState';
                },
                {
                    name: 'rentalTokenAccount';
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: 'account';
                                path: 'rentalState';
                            },
                            {
                                kind: 'const';
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: 'const';
                                value: [
                                    140,
                                    119,
                                    241,
                                    156,
                                    255,
                                    59,
                                    87,
                                    34,
                                    56,
                                    120,
                                    33,
                                    198,
                                    221,
                                    208,
                                    211,
                                    20,
                                    190,
                                    93,
                                    159,
                                    12,
                                    154,
                                    136,
                                    45,
                                    46,
                                    161,
                                    10,
                                    152,
                                    60,
                                    85,
                                    252,
                                    217,
                                    191
                                ];
                            }
                        ];
                        program: {
                            kind: 'const';
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: 'rentalAuthority';
                    pda: {
                        seeds: [
                            {
                                kind: 'const';
                                value: [
                                    114,
                                    101,
                                    110,
                                    116,
                                    97,
                                    108,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    name: 'sageProgram';
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi';
                },
                {
                    name: 'tokenProgram';
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
                }
            ];
            args: [];
        }
    ];
    accounts: [
        {
            name: 'contractState';
            discriminator: [190, 138, 10, 223, 189, 116, 222, 115];
        },
        {
            name: 'fleet';
            discriminator: [109, 207, 251, 48, 106, 2, 136, 163];
        },
        {
            name: 'rentalState';
            discriminator: [97, 162, 29, 222, 251, 251, 180, 244];
        },
        {
            name: 'thread';
            discriminator: [186, 27, 154, 111, 51, 36, 159, 90];
        }
    ];
    errors: [
        {
            code: 6000;
            name: 'invalidDurationMinimum';
            msg: 'Invalid duration minimum. Must be between 1 and the duration maximum.';
        },
        {
            code: 6001;
            name: 'invalidDurationMaximum';
            msg: 'Invalid duration maximum. Must be greater than or equal to the duration minimum.';
        },
        {
            code: 6002;
            name: 'invalidRateCalculation';
            msg: 'The contract rate multiplied by duration exceeds the payment amount.';
        },
        {
            code: 6003;
            name: 'fleetAlreadyRented';
            msg: 'Fleet is already rented (sub_profile is not empty).';
        },
        {
            code: 6004;
            name: 'invalidRate';
            msg: 'Contract rate must be greater than or equal to 0.';
        },
        {
            code: 6005;
            name: 'invalidPaymentFrequency';
            msg: 'Invalid payment frequency. Must be one of: @hourly, @daily, @weekly, @monthly.';
        },
        {
            code: 6006;
            name: 'invalidSubProfileInvalidator';
            msg: 'Invalid sub_profile invalidator.';
        },
        {
            code: 6007;
            name: 'insufficientCancellationNotice';
            msg: 'Rental time remaining is less than minimum cancellation notice required.';
        },
        {
            code: 6008;
            name: 'contractClosed';
            msg: 'The contract is closed.';
        },
        {
            code: 6009;
            name: 'devOnlyFrequency';
            msg: 'This frequency is only allowed in development.';
        },
        {
            code: 6010;
            name: 'expectedDailyFrequency';
            msg: 'Expected daily frequency but contract is set differently.';
        },
        {
            code: 6011;
            name: 'invalidThreadContext';
            msg: 'Thread has invalid context set.';
        },
        {
            code: 6012;
            name: 'rentalIsActive';
            msg: 'Rental is still active.';
        }
    ];
    types: [
        {
            name: 'clockData';
            docs: [
                'The clock object, representing a specific moment in time recorded by a Solana cluster.'
            ];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'slot';
                        docs: ['The current slot.'];
                        type: 'u64';
                    },
                    {
                        name: 'epoch';
                        docs: ['The bank epoch.'];
                        type: 'u64';
                    },
                    {
                        name: 'unixTimestamp';
                        docs: ['The current unix timestamp.'];
                        type: 'i64';
                    }
                ];
            };
        },
        {
            name: 'contractState';
            docs: [
                '* **Rental Contract State**\n * \n * This account stores the details of a fleet rental contract, which includes:\n * - Rental price (`rate`)\n * - Duration constraints (`duration_min`, `duration_max`)\n * - Payment frequency (`payments_feq`)\n * - Ownership details (`owner`, `owner_token_account`)\n * - Current rental status (`current_rental_state`)\n * - Fleet and game identifiers'
            ];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'version';
                        type: 'u8';
                    },
                    {
                        name: 'toClose';
                        type: 'bool';
                    },
                    {
                        name: 'rate';
                        type: 'u64';
                    },
                    {
                        name: 'durationMin';
                        type: 'u64';
                    },
                    {
                        name: 'durationMax';
                        type: 'u64';
                    },
                    {
                        name: 'paymentsFeq';
                        type: {
                            defined: {
                                name: 'paymentFrequency';
                            };
                        };
                    },
                    {
                        name: 'fleet';
                        type: 'pubkey';
                    },
                    {
                        name: 'gameId';
                        type: 'pubkey';
                    },
                    {
                        name: 'currentRentalState';
                        type: 'pubkey';
                    },
                    {
                        name: 'owner';
                        type: 'pubkey';
                    },
                    {
                        name: 'ownerTokenAccount';
                        type: 'pubkey';
                    },
                    {
                        name: 'ownerProfile';
                        type: 'pubkey';
                    },
                    {
                        name: 'bump';
                        type: 'u8';
                    }
                ];
            };
        },
        {
            name: 'equality';
            docs: ['Operators for describing how to compare two values to one another.'];
            repr: {
                kind: 'rust';
            };
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'greaterThanOrEqual';
                    },
                    {
                        name: 'lessThanOrEqual';
                    }
                ];
            };
        },
        {
            name: 'execContext';
            docs: ['The execution context of a particular transaction thread.'];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'execIndex';
                        docs: ['Index of the next instruction to be executed.'];
                        type: 'u64';
                    },
                    {
                        name: 'execsSinceReimbursement';
                        docs: [
                            'Number of execs since the last tx reimbursement.',
                            'To be deprecated in v3 since we now reimburse for every transaction.'
                        ];
                        type: 'u64';
                    },
                    {
                        name: 'execsSinceSlot';
                        docs: ['Number of execs in this slot.'];
                        type: 'u64';
                    },
                    {
                        name: 'lastExecAt';
                        docs: ['Slot of the last exec'];
                        type: 'u64';
                    },
                    {
                        name: 'lastExecTimestamp';
                        docs: ['Unix timestamp of last exec'];
                        type: 'i64';
                    },
                    {
                        name: 'triggerContext';
                        docs: ['Context for the triggering condition'];
                        type: {
                            defined: {
                                name: 'triggerContext';
                            };
                        };
                    }
                ];
            };
        },
        {
            name: 'fleet';
            serialization: 'bytemuck';
            repr: {
                kind: 'c';
            };
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'version';
                        type: 'u8';
                    },
                    {
                        name: 'gameId';
                        type: 'pubkey';
                    },
                    {
                        name: 'ownerProfile';
                        type: 'pubkey';
                    },
                    {
                        name: 'fleetShips';
                        type: 'pubkey';
                    },
                    {
                        name: 'subProfile';
                        type: 'pubkey';
                    },
                    {
                        name: 'subProfileInvalidator';
                        type: 'pubkey';
                    }
                ];
            };
        },
        {
            name: 'paymentFrequency';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'hourly';
                    },
                    {
                        name: 'daily';
                    },
                    {
                        name: 'dailyOld';
                    },
                    {
                        name: 'weekly';
                    },
                    {
                        name: 'monthly';
                    },
                    {
                        name: 'decasecond';
                    },
                    {
                        name: 'minute';
                    }
                ];
            };
        },
        {
            name: 'rentalState';
            docs: [
                "* **Rental State Account**\n * \n * This account stores data for an **active** rental session, including:\n * - The renter's (`borrower`) public key\n * - Payment details, including rate and total duration\n * - Start and end timestamps\n * - Whether the rental was cancelled early"
            ];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'version';
                        type: 'u8';
                    },
                    {
                        name: 'borrower';
                        type: 'pubkey';
                    },
                    {
                        name: 'thread';
                        type: 'pubkey';
                    },
                    {
                        name: 'contract';
                        type: 'pubkey';
                    },
                    {
                        name: 'ownerTokenAccount';
                        type: 'pubkey';
                    },
                    {
                        name: 'rate';
                        type: 'f64';
                    },
                    {
                        name: 'startTime';
                        type: 'i64';
                    },
                    {
                        name: 'endTime';
                        type: 'i64';
                    },
                    {
                        name: 'cancelled';
                        type: 'bool';
                    },
                    {
                        name: 'bump';
                        type: 'u8';
                    }
                ];
            };
        },
        {
            name: 'serializableAccount';
            docs: ['Account metadata needed to execute an instruction on Solana.'];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'pubkey';
                        docs: ["An account's public key"];
                        type: 'pubkey';
                    },
                    {
                        name: 'isSigner';
                        docs: ['True if an Instruction requires a Transaction signature matching `pubkey`.'];
                        type: 'bool';
                    },
                    {
                        name: 'isWritable';
                        docs: ['True if the `pubkey` can be loaded as a read-write account.'];
                        type: 'bool';
                    }
                ];
            };
        },
        {
            name: 'serializableInstruction';
            docs: ['The data needed execute an instruction on Solana.'];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'programId';
                        docs: ['Pubkey of the instruction processor that executes this instruction'];
                        type: 'pubkey';
                    },
                    {
                        name: 'accounts';
                        docs: ['Metadata for what accounts should be passed to the instruction processor'];
                        type: {
                            vec: {
                                defined: {
                                    name: 'serializableAccount';
                                };
                            };
                        };
                    },
                    {
                        name: 'data';
                        docs: ['Opaque data passed to the instruction processor'];
                        type: 'bytes';
                    }
                ];
            };
        },
        {
            name: 'thread';
            docs: ['Tracks the current state of a transaction thread on Solana.'];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'authority';
                        docs: ['The owner of this thread.'];
                        type: 'pubkey';
                    },
                    {
                        name: 'bump';
                        docs: ['The bump, used for PDA validation.'];
                        type: 'u8';
                    },
                    {
                        name: 'createdAt';
                        docs: ['The cluster clock at the moment the thread was created.'];
                        type: {
                            defined: {
                                name: 'clockData';
                            };
                        };
                    },
                    {
                        name: 'execContext';
                        docs: ["The context of the thread's current execution state."];
                        type: {
                            option: {
                                defined: {
                                    name: 'execContext';
                                };
                            };
                        };
                    },
                    {
                        name: 'fee';
                        docs: ['The number of lamports to payout to workers per execution.'];
                        type: 'u64';
                    },
                    {
                        name: 'id';
                        docs: ['The id of the thread, given by the authority.'];
                        type: 'bytes';
                    },
                    {
                        name: 'instructions';
                        docs: ['The instructions to be executed.'];
                        type: {
                            vec: {
                                defined: {
                                    name: 'serializableInstruction';
                                };
                            };
                        };
                    },
                    {
                        name: 'name';
                        docs: ['The name of the thread.'];
                        type: 'string';
                    },
                    {
                        name: 'nextInstruction';
                        docs: ['The next instruction to be executed.'];
                        type: {
                            option: {
                                defined: {
                                    name: 'serializableInstruction';
                                };
                            };
                        };
                    },
                    {
                        name: 'paused';
                        docs: ['Whether or not the thread is currently paused.'];
                        type: 'bool';
                    },
                    {
                        name: 'rateLimit';
                        docs: ['The maximum number of execs allowed per slot.'];
                        type: 'u64';
                    },
                    {
                        name: 'trigger';
                        docs: ['The triggering event to kickoff a thread.'];
                        type: {
                            defined: {
                                name: 'trigger';
                            };
                        };
                    }
                ];
            };
        },
        {
            name: 'threadResponse';
            docs: ['A response value target programs can return to update the thread.'];
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'closeTo';
                        docs: [
                            'If set, the thread will automatically close and return lamports to the provided address.',
                            'If dynamic_instruction is also set, close_to will take precedence and the dynamic instruction will not be executed.'
                        ];
                        type: {
                            option: 'pubkey';
                        };
                    },
                    {
                        name: 'dynamicInstruction';
                        docs: [
                            'A dynamic instruction to execute next.',
                            'If close_to is also set, it will take precedence and the dynamic instruction will not be executed.'
                        ];
                        type: {
                            option: {
                                defined: {
                                    name: 'serializableInstruction';
                                };
                            };
                        };
                    },
                    {
                        name: 'trigger';
                        docs: ['Value to update the thread trigger to.'];
                        type: {
                            option: {
                                defined: {
                                    name: 'trigger';
                                };
                            };
                        };
                    }
                ];
            };
        },
        {
            name: 'trigger';
            docs: ['The triggering conditions of a thread.'];
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'account';
                        fields: [
                            {
                                name: 'address';
                                docs: ['The address of the account to monitor.'];
                                type: 'pubkey';
                            },
                            {
                                name: 'offset';
                                docs: ['The byte offset of the account data to monitor.'];
                                type: 'u64';
                            },
                            {
                                name: 'size';
                                docs: ['The size of the byte slice to monitor (must be less than 1kb)'];
                                type: 'u64';
                            }
                        ];
                    },
                    {
                        name: 'cron';
                        fields: [
                            {
                                name: 'schedule';
                                docs: [
                                    'The schedule in cron syntax. Value must be parsable by the `solana_cron` package.'
                                ];
                                type: 'string';
                            },
                            {
                                name: 'skippable';
                                docs: [
                                    'Boolean value indicating whether triggering moments may be skipped if they are missed (e.g. due to network downtime).',
                                    'If false, any "missed" triggering moments will simply be executed as soon as the network comes back online.'
                                ];
                                type: 'bool';
                            }
                        ];
                    },
                    {
                        name: 'now';
                    },
                    {
                        name: 'slot';
                        fields: [
                            {
                                name: 'slot';
                                type: 'u64';
                            }
                        ];
                    },
                    {
                        name: 'epoch';
                        fields: [
                            {
                                name: 'epoch';
                                type: 'u64';
                            }
                        ];
                    },
                    {
                        name: 'timestamp';
                        fields: [
                            {
                                name: 'unixTs';
                                type: 'i64';
                            }
                        ];
                    },
                    {
                        name: 'pyth';
                        fields: [
                            {
                                name: 'priceFeed';
                                docs: ['The address of the price feed to monitor.'];
                                type: 'pubkey';
                            },
                            {
                                name: 'equality';
                                docs: ['The equality operator (gte or lte) used to compare prices.'];
                                type: {
                                    defined: {
                                        name: 'equality';
                                    };
                                };
                            },
                            {
                                name: 'limit';
                                docs: ['The limit price to compare the Pyth feed to.'];
                                type: 'i64';
                            }
                        ];
                    }
                ];
            };
        },
        {
            name: 'triggerContext';
            docs: ['The event which allowed a particular transaction thread to be triggered.'];
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'account';
                        fields: [
                            {
                                name: 'dataHash';
                                docs: ["The account's data hash."];
                                type: 'u64';
                            }
                        ];
                    },
                    {
                        name: 'cron';
                        fields: [
                            {
                                name: 'startedAt';
                                docs: ['The threshold moment the schedule was waiting for.'];
                                type: 'i64';
                            }
                        ];
                    },
                    {
                        name: 'now';
                    },
                    {
                        name: 'slot';
                        fields: [
                            {
                                name: 'startedAt';
                                docs: ['The threshold slot the schedule was waiting for.'];
                                type: 'u64';
                            }
                        ];
                    },
                    {
                        name: 'epoch';
                        fields: [
                            {
                                name: 'startedAt';
                                docs: ['The threshold epoch the schedule was waiting for.'];
                                type: 'u64';
                            }
                        ];
                    },
                    {
                        name: 'timestamp';
                        fields: [
                            {
                                name: 'startedAt';
                                docs: ['The threshold moment the schedule was waiting for.'];
                                type: 'i64';
                            }
                        ];
                    },
                    {
                        name: 'pyth';
                        fields: [
                            {
                                name: 'price';
                                type: 'i64';
                            }
                        ];
                    }
                ];
            };
        }
    ];
    constants: [
        {
            name: 'seed';
            type: 'string';
            value: '"anchor"';
        }
    ];
};

/**
 * This is the added constant that matches the `Srsly` type above.
 */
export const IDL: Srsly = {
    version: '1.0.0',
    name: 'srsly',
    address: 'SRSLY1fq9TJqCk1gNSE7VZL2bztvTn9wm4VR8u8jMKT',
    metadata: {
        name: 'srsly',
        version: '1.0.0',
        spec: '0.1.0',
        description: 'Space Rental from SLY',
    },
    instructions: [
        {
            name: 'acceptRental',
            discriminator: [192, 221, 241, 212, 141, 161, 36, 146],
            accounts: [
                {
                    name: 'mint',
                    address: 'ATLA5nAaVRfH6BNwD4SAyWp96EdQaAh6bBmGeTx956sx',
                    kind: 'account',
                    path: 'mint',
                },
                {
                    name: 'borrower',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'borrowerProfile',
                },
                {
                    name: 'borrowerProfileFaction',
                },
                {
                    name: 'borrowerTokenAccount',
                    writable: true,
                    pda: {
                        seeds: [
                            { kind: 'account', path: 'borrower' },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            { kind: 'account', path: 'mint' },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'fleet',
                    writable: true,
                    relations: ['contract'],
                },
                {
                    name: 'gameId',
                },
                {
                    name: 'starbase',
                },
                {
                    name: 'starbasePlayer',
                    writable: true,
                },
                {
                    name: 'contract',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [114, 101, 110, 116, 97, 108, 95, 99, 111, 110, 116, 114, 97, 99, 116],
                            },
                            { kind: 'account', path: 'contract.fleet', account: 'contractState' },
                        ],
                    },
                },
                {
                    name: 'rentalState',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [114, 101, 110, 116, 97, 108, 95, 115, 116, 97, 116, 101],
                            },
                            { kind: 'account', path: 'contract' },
                            { kind: 'account', path: 'borrower' },
                        ],
                    },
                },
                {
                    name: 'rentalAuthority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    114, 101, 110, 116, 97, 108, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'rentalTokenAccount',
                    writable: true,
                    pda: {
                        seeds: [
                            { kind: 'account', path: 'rentalState' },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            { kind: 'account', path: 'mint' },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'rentalThread',
                    writable: true,
                },
                {
                    name: 'feeTokenAccount',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    200, 182, 122, 108, 74, 122, 176, 202, 84, 111, 116, 161, 175, 85, 111, 229, 188,
                                    105, 205, 151, 154, 187, 178, 50, 133, 209, 48, 56, 107, 39, 184, 43,
                                ],
                            },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            { kind: 'account', path: 'mint' },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'sageProgram',
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi',
                },
                {
                    name: 'antegenProgram',
                    address: 'AgThdyi1P5RkVeZD2rQahTvs8HePJoGFFxKtvok5s2J1',
                },
                {
                    name: 'tokenProgram',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'associatedTokenProgram',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'systemProgram',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [
                { name: 'amount', type: 'u64' },
                { name: 'duration', type: 'u64' },
            ],
        },
        {
            name: 'cancelRental',
            discriminator: [97, 204, 63, 8, 84, 34, 28, 43],
            accounts: [
                {
                    name: 'borrower',
                    signer: true,
                    relations: ['rentalState'],
                },
                {
                    name: 'rentalThread',
                },
                {
                    name: 'contract',
                },
                {
                    name: 'rentalState',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [114, 101, 110, 116, 97, 108, 95, 115, 116, 97, 116, 101],
                            },
                            {
                                kind: 'account',
                                path: 'rental_state.contract',
                                account: 'rentalState',
                            },
                            { kind: 'account', path: 'borrower' },
                        ],
                    },
                },
            ],
            args: [],
        },
        {
            name: 'closeContract',
            discriminator: [37, 244, 34, 168, 92, 202, 80, 106],
            accounts: [
                {
                    name: 'owner',
                    writable: true,
                    signer: true,
                    relations: ['contract'],
                },
                {
                    name: 'ownerTokenAccount',
                    writable: true,
                    optional: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'account',
                                path: 'owner',
                            },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: 'const',
                                value: [
                                    140, 119, 241, 156, 255, 59, 87, 34, 56, 120, 33, 198, 221, 208, 211, 20, 190, 93,
                                    159, 12, 154, 136, 45, 46, 161, 10, 152, 60, 85, 252, 217, 191,
                                ],
                            },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'rentalTokenAccount',
                    writable: true,
                    optional: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'account',
                                path: 'contract.current_rental_state',
                                account: 'contractState',
                            },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: 'const',
                                value: [
                                    140, 119, 241, 156, 255, 59, 87, 34, 56, 120, 33, 198, 221, 208, 211, 20, 190, 93,
                                    159, 12, 154, 136, 45, 46, 161, 10, 152, 60, 85, 252, 217, 191,
                                ],
                            },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'borrowerTokenAccount',
                    writable: true,
                    optional: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'account',
                                path: 'rentalState',
                            },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: 'const',
                                value: [
                                    140, 119, 241, 156, 255, 59, 87, 34, 56, 120, 33, 198, 221, 208, 211, 20, 190, 93,
                                    159, 12, 154, 136, 45, 46, 161, 10, 152, 60, 85, 252, 217, 191,
                                ],
                            },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'rentalState',
                    writable: true,
                    optional: true,
                },
                {
                    name: 'fleet',
                    writable: true,
                },
                {
                    name: 'gameId',
                    optional: true,
                },
                {
                    name: 'starbase',
                    optional: true,
                },
                {
                    name: 'starbasePlayer',
                    writable: true,
                    optional: true,
                },
                {
                    name: 'contract',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [114, 101, 110, 116, 97, 108, 95, 99, 111, 110, 116, 114, 97, 99, 116],
                            },
                            { kind: 'account', path: 'contract.fleet', account: 'contractState' },
                        ],
                    },
                },
                {
                    name: 'rentalAuthority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    114, 101, 110, 116, 97, 108, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'sageProgram',
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi',
                },
                {
                    name: 'tokenProgram',
                    optional: true,
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
            ],
            args: [],
        },
        {
            name: 'closeRental',
            discriminator: [179, 188, 113, 211, 41, 232, 51, 51],
            accounts: [
                {
                    name: 'borrower',
                    writable: true,
                    signer: true,
                    relations: ['rentalState'],
                },
                {
                    name: 'borrowerTokenAccount',
                    writable: true,
                },
                {
                    name: 'ownerTokenAccount',
                    writable: true,
                },
                {
                    name: 'contract',
                },
                {
                    name: 'rentalState',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [114, 101, 110, 116, 97, 108, 95, 115, 116, 97, 116, 101],
                            },
                            {
                                kind: 'account',
                                path: 'rental_state.contract',
                                account: 'rentalState',
                            },
                            {
                                kind: 'account',
                                path: 'rental_state.borrower',
                                account: 'rentalState',
                            },
                        ],
                    },
                },
                {
                    name: 'rentalTokenAccount',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'account',
                                path: 'rentalState',
                            },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: 'const',
                                value: [
                                    140, 119, 241, 156, 255, 59, 87, 34, 56, 120, 33, 198, 221, 208, 211, 20, 190, 93,
                                    159, 12, 154, 136, 45, 46, 161, 10, 152, 60, 85, 252, 217, 191,
                                ],
                            },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'rentalAuthority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    114, 101, 110, 116, 97, 108, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'rentalThread',
                    writable: true,
                },
                {
                    name: 'antegenProgram',
                    address: 'AgThdyi1P5RkVeZD2rQahTvs8HePJoGFFxKtvok5s2J1',
                },
                {
                    name: 'tokenProgram',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'systemProgram',
                    address: '11111111111111111111111111111111',
                },
            ],
            args: [],
        },
        {
            name: 'createContract',
            discriminator: [244, 48, 244, 178, 216, 88, 122, 52],
            accounts: [
                {
                    name: 'mint',
                    address: 'ATLA5nAaVRfH6BNwD4SAyWp96EdQaAh6bBmGeTx956sx',
                },
                {
                    name: 'owner',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'ownerTokenAccount',
                    writable: true,
                    pda: {
                        seeds: [
                            { kind: 'account', path: 'owner' },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            { kind: 'account', path: 'mint' },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'fleet',
                    writable: true,
                },
                {
                    name: 'ownerProfile',
                    relations: ['fleet'],
                },
                {
                    name: 'gameId',
                },
                {
                    name: 'contract',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [114, 101, 110, 116, 97, 108, 95, 99, 111, 110, 116, 114, 97, 99, 116],
                            },
                            { kind: 'account', path: 'fleet' },
                        ],
                    },
                },
                {
                    name: 'rentalAuthority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    114, 101, 110, 116, 97, 108, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'tokenProgram',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
                {
                    name: 'associatedTokenProgram',
                    address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                },
                {
                    name: 'systemProgram',
                    address: '11111111111111111111111111111111',
                },
                {
                    name: 'sageProgram',
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi',
                },
            ],
            args: [
                { name: 'rate', type: 'u64' },
                { name: 'durationMin', type: 'u64' },
                { name: 'durationMax', type: 'u64' },
                { name: 'paymentsFeq', type: 'string' },
                { name: 'ownerKeyIndex', type: 'u16' },
            ],
        },
        {
            name: 'payRental',
            discriminator: [114, 15, 111, 207, 115, 207, 108, 169],
            accounts: [
                {
                    name: 'borrower',
                    writable: true,
                },
                {
                    name: 'borrowerTokenAccount',
                    writable: true,
                },
                {
                    name: 'owner',
                    writable: true,
                },
                {
                    name: 'ownerTokenAccount',
                    writable: true,
                },
                {
                    name: 'fleet',
                    writable: true,
                },
                {
                    name: 'gameId',
                },
                {
                    name: 'starbase',
                },
                {
                    name: 'starbasePlayer',
                    writable: true,
                },
                {
                    name: 'contract',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [114, 101, 110, 116, 97, 108, 95, 99, 111, 110, 116, 114, 97, 99, 116],
                            },
                            { kind: 'account', path: 'contract.fleet', account: 'contractState' },
                        ],
                    },
                },
                {
                    name: 'rentalState',
                    writable: true,
                },
                {
                    name: 'rentalAuthority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    114, 101, 110, 116, 97, 108, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'rentalTokenAccount',
                    writable: true,
                    pda: {
                        seeds: [
                            { kind: 'account', path: 'rentalState' },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: 'const',
                                value: [
                                    140, 119, 241, 156, 255, 59, 87, 34, 56, 120, 33, 198, 221, 208, 211, 20, 190, 93,
                                    159, 12, 154, 136, 45, 46, 161, 10, 152, 60, 85, 252, 217, 191,
                                ],
                            },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'rentalThread',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'sageProgram',
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi',
                },
                {
                    name: 'antegenProgram',
                    address: 'AgThdyi1P5RkVeZD2rQahTvs8HePJoGFFxKtvok5s2J1',
                },
                {
                    name: 'tokenProgram',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
            ],
            args: [],
            returns: {
                defined: { name: 'threadResponse' },
            },
        },
        {
            name: 'resetRental',
            discriminator: [139, 185, 76, 32, 61, 143, 163, 183],
            accounts: [
                {
                    name: 'owner',
                    writable: true,
                    signer: true,
                },
                {
                    name: 'ownerTokenAccount',
                    writable: true,
                },
                {
                    name: 'borrowerTokenAccount',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'account',
                                path: 'rental_state.borrower',
                                account: 'rentalState',
                            },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: 'const',
                                value: [
                                    140, 119, 241, 156, 255, 59, 87, 34, 56, 120, 33, 198, 221, 208, 211, 20, 190, 93,
                                    159, 12, 154, 136, 45, 46, 161, 10, 152, 60, 85, 252, 217, 191,
                                ],
                            },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'fleet',
                    writable: true,
                },
                {
                    name: 'gameId',
                },
                {
                    name: 'starbase',
                },
                {
                    name: 'starbasePlayer',
                    writable: true,
                },
                {
                    name: 'contract',
                },
                {
                    name: 'rentalThread',
                },
                {
                    name: 'rentalState',
                },
                {
                    name: 'rentalTokenAccount',
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: 'account',
                                path: 'rentalState',
                            },
                            {
                                kind: 'const',
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28,
                                    180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: 'const',
                                value: [
                                    140, 119, 241, 156, 255, 59, 87, 34, 56, 120, 33, 198, 221, 208, 211, 20, 190, 93,
                                    159, 12, 154, 136, 45, 46, 161, 10, 152, 60, 85, 252, 217, 191,
                                ],
                            },
                        ],
                        program: {
                            kind: 'const',
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19,
                                153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: 'rentalAuthority',
                    pda: {
                        seeds: [
                            {
                                kind: 'const',
                                value: [
                                    114, 101, 110, 116, 97, 108, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121,
                                ],
                            },
                        ],
                    },
                },
                {
                    name: 'sageProgram',
                    address: 'sAgezwJpDb1aHvzNr3o24cKjsETmFEKghBEyJ1askDi',
                },
                {
                    name: 'tokenProgram',
                    address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: 'contractState',
            discriminator: [190, 138, 10, 223, 189, 116, 222, 115],
        },
        {
            name: 'fleet',
            discriminator: [109, 207, 251, 48, 106, 2, 136, 163],
        },
        {
            name: 'rentalState',
            discriminator: [97, 162, 29, 222, 251, 251, 180, 244],
        },
        {
            name: 'thread',
            discriminator: [186, 27, 154, 111, 51, 36, 159, 90],
        },
    ],
    errors: [
        {
            code: 6000,
            name: 'invalidDurationMinimum',
            msg: 'Invalid duration minimum. Must be between 1 and the duration maximum.',
        },
        {
            code: 6001,
            name: 'invalidDurationMaximum',
            msg: 'Invalid duration maximum. Must be greater than or equal to the duration minimum.',
        },
        {
            code: 6002,
            name: 'invalidRateCalculation',
            msg: 'The contract rate multiplied by duration exceeds the payment amount.',
        },
        {
            code: 6003,
            name: 'fleetAlreadyRented',
            msg: 'Fleet is already rented (sub_profile is not empty).',
        },
        {
            code: 6004,
            name: 'invalidRate',
            msg: 'Contract rate must be greater than or equal to 0.',
        },
        {
            code: 6005,
            name: 'invalidPaymentFrequency',
            msg: 'Invalid payment frequency. Must be one of: @hourly, @daily, @weekly, @monthly.',
        },
        {
            code: 6006,
            name: 'invalidSubProfileInvalidator',
            msg: 'Invalid sub_profile invalidator.',
        },
        {
            code: 6007,
            name: 'insufficientCancellationNotice',
            msg: 'Rental time remaining is less than minimum cancellation notice required.',
        },
        {
            code: 6008,
            name: 'contractClosed',
            msg: 'The contract is closed.',
        },
        {
            code: 6009,
            name: 'devOnlyFrequency',
            msg: 'This frequency is only allowed in development.',
        },
        {
            code: 6010,
            name: 'expectedDailyFrequency',
            msg: 'Expected daily frequency but contract is set differently.',
        },
        {
            code: 6011,
            name: 'invalidThreadContext',
            msg: 'Thread has invalid context set.',
        },
        {
            code: 6012,
            name: 'rentalIsActive',
            msg: 'Rental is still active.',
        },
    ],
    types: [
        {
            name: 'clockData',
            docs: [
                'The clock object, representing a specific moment in time recorded by a Solana cluster.',
            ],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'slot',
                        docs: ['The current slot.'],
                        type: 'u64',
                    },
                    {
                        name: 'epoch',
                        docs: ['The bank epoch.'],
                        type: 'u64',
                    },
                    {
                        name: 'unixTimestamp',
                        docs: ['The current unix timestamp.'],
                        type: 'i64',
                    },
                ],
            },
        },
        {
            name: 'contractState',
            docs: [
                '* **Rental Contract State**\n * \n * This account stores the details of a fleet rental contract, which includes:\n * - Rental price (`rate`)\n * - Duration constraints (`duration_min`, `duration_max`)\n * - Payment frequency (`payments_feq`)\n * - Ownership details (`owner`, `owner_token_account`)\n * - Current rental status (`current_rental_state`)\n * - Fleet and game identifiers',
            ],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'version',
                        type: 'u8',
                    },
                    {
                        name: 'toClose',
                        type: 'bool',
                    },
                    { name: 'rate', type: 'u64' },
                    { name: 'durationMin', type: 'u64' },
                    { name: 'durationMax', type: 'u64' },
                    {
                        name: 'paymentsFeq',
                        type: { defined: { name: 'paymentFrequency' } },
                    },
                    { name: 'fleet', type: 'pubkey' },
                    {
                        name: 'gameId',
                        type: 'pubkey',
                    },
                    {
                        name: 'currentRentalState',
                        type: 'pubkey',
                    },
                    { name: 'owner', type: 'pubkey' },
                    { name: 'ownerTokenAccount', type: 'pubkey' },
                    { name: 'ownerProfile', type: 'pubkey' },
                    { name: 'bump', type: 'u8' },
                ],
            },
        },
        {
            name: 'equality',
            docs: ['Operators for describing how to compare two values to one another.'],
            repr: { kind: 'rust' },
            type: {
                kind: 'enum',
                variants: [{ name: 'greaterThanOrEqual' }, { name: 'lessThanOrEqual' }],
            },
        },
        {
            name: 'execContext',
            docs: ['The execution context of a particular transaction thread.'],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'execIndex',
                        docs: ['Index of the next instruction to be executed.'],
                        type: 'u64',
                    },
                    {
                        name: 'execsSinceReimbursement',
                        docs: [
                            'Number of execs since the last tx reimbursement.',
                            'To be deprecated in v3 since we now reimburse for every transaction.',
                        ],
                        type: 'u64',
                    },
                    {
                        name: 'execsSinceSlot',
                        docs: ['Number of execs in this slot.'],
                        type: 'u64',
                    },
                    {
                        name: 'lastExecAt',
                        docs: ['Slot of the last exec'],
                        type: 'u64',
                    },
                    {
                        name: 'lastExecTimestamp',
                        docs: ['Unix timestamp of last exec'],
                        type: 'i64',
                    },
                    {
                        name: 'triggerContext',
                        docs: ['Context for the triggering condition'],
                        type: { defined: { name: 'triggerContext' } },
                    },
                ],
            },
        },
        {
            name: 'fleet',
            serialization: 'bytemuck',
            repr: { kind: 'c' },
            type: {
                kind: 'struct',
                fields: [
                    { name: 'version', type: 'u8' },
                    { name: 'gameId', type: 'pubkey' },
                    { name: 'ownerProfile', type: 'pubkey' },
                    { name: 'fleetShips', type: 'pubkey' },
                    { name: 'subProfile', type: 'pubkey' },
                    { name: 'subProfileInvalidator', type: 'pubkey' },
                ],
            },
        },
        {
            name: 'paymentFrequency',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'hourly',
                    },
                    {
                        name: 'daily',
                    },
                    {
                        name: 'dailyOld',
                    },
                    {
                        name: 'weekly',
                    },
                    {
                        name: 'monthly',
                    },
                    {
                        name: 'decasecond',
                    },
                    {
                        name: 'minute',
                    },
                ],
            },
        },
        {
            name: 'rentalState',
            docs: [
                "* **Rental State Account**\n * \n * This account stores data for an **active** rental session, including:\n * - The renter's (`borrower`) public key\n * - Payment details, including rate and total duration\n * - Start and end timestamps\n * - Whether the rental was cancelled early",
            ],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'version',
                        type: 'u8',
                    },
                    {
                        name: 'borrower',
                        type: 'pubkey',
                    },
                    {
                        name: 'thread',
                        type: 'pubkey',
                    },
                    {
                        name: 'contract',
                        type: 'pubkey',
                    },
                    {
                        name: 'ownerTokenAccount',
                        type: 'pubkey',
                    },
                    {
                        name: 'rate',
                        type: 'f64',
                    },
                    {
                        name: 'startTime',
                        type: 'i64',
                    },
                    {
                        name: 'endTime',
                        type: 'i64',
                    },
                    {
                        name: 'cancelled',
                        type: 'bool',
                    },
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                ],
            },
        },
        {
            name: 'serializableAccount',
            docs: ['Account metadata needed to execute an instruction on Solana.'],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'pubkey',
                        docs: ["An account's public key"],
                        type: 'pubkey',
                    },
                    {
                        name: 'isSigner',
                        docs: ['True if an Instruction requires a Transaction signature matching `pubkey`.'],
                        type: 'bool',
                    },
                    {
                        name: 'isWritable',
                        docs: ['True if the `pubkey` can be loaded as a read-write account.'],
                        type: 'bool',
                    },
                ],
            },
        },
        {
            name: 'serializableInstruction',
            docs: ['The data needed execute an instruction on Solana.'],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'programId',
                        docs: ['Pubkey of the instruction processor that executes this instruction'],
                        type: 'pubkey',
                    },
                    {
                        name: 'accounts',
                        docs: ['Metadata for what accounts should be passed to the instruction processor'],
                        type: {
                            vec: { defined: { name: 'serializableAccount' } },
                        },
                    },
                    {
                        name: 'data',
                        docs: ['Opaque data passed to the instruction processor'],
                        type: 'bytes',
                    },
                ],
            },
        },
        {
            name: 'thread',
            docs: ['Tracks the current state of a transaction thread on Solana.'],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'authority',
                        docs: ['The owner of this thread.'],
                        type: 'pubkey',
                    },
                    {
                        name: 'bump',
                        docs: ['The bump, used for PDA validation.'],
                        type: 'u8',
                    },
                    {
                        name: 'createdAt',
                        docs: ['The cluster clock at the moment the thread was created.'],
                        type: { defined: { name: 'clockData' } },
                    },
                    {
                        name: 'execContext',
                        docs: ["The context of the thread's current execution state."],
                        type: { option: { defined: { name: 'execContext' } } },
                    },
                    {
                        name: 'fee',
                        docs: ['The number of lamports to payout to workers per execution.'],
                        type: 'u64',
                    },
                    {
                        name: 'id',
                        docs: ['The id of the thread, given by the authority.'],
                        type: 'bytes',
                    },
                    {
                        name: 'instructions',
                        docs: ['The instructions to be executed.'],
                        type: {
                            vec: { defined: { name: 'serializableInstruction' } },
                        },
                    },
                    {
                        name: 'name',
                        docs: ['The name of the thread.'],
                        type: 'string',
                    },
                    {
                        name: 'nextInstruction',
                        docs: ['The next instruction to be executed.'],
                        type: { option: { defined: { name: 'serializableInstruction' } } },
                    },
                    {
                        name: 'paused',
                        docs: ['Whether or not the thread is currently paused.'],
                        type: 'bool',
                    },
                    {
                        name: 'rateLimit',
                        docs: ['The maximum number of execs allowed per slot.'],
                        type: 'u64',
                    },
                    {
                        name: 'trigger',
                        docs: ['The triggering event to kickoff a thread.'],
                        type: { defined: { name: 'trigger' } },
                    },
                ],
            },
        },
        {
            name: 'threadResponse',
            docs: ['A response value target programs can return to update the thread.'],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'closeTo',
                        docs: [
                            'If set, the thread will automatically close and return lamports to the provided address.',
                            'If dynamic_instruction is also set, close_to will take precedence and the dynamic instruction will not be executed.',
                        ],
                        type: { option: 'pubkey' },
                    },
                    {
                        name: 'dynamicInstruction',
                        docs: [
                            'A dynamic instruction to execute next.',
                            'If close_to is also set, it will take precedence and the dynamic instruction will not be executed.',
                        ],
                        type: { option: { defined: { name: 'serializableInstruction' } } },
                    },
                    {
                        name: 'trigger',
                        docs: ['Value to update the thread trigger to.'],
                        type: { option: { defined: { name: 'trigger' } } },
                    },
                ],
            },
        },
        {
            name: 'trigger',
            docs: ['The triggering conditions of a thread.'],
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'account',
                        fields: [
                            {
                                name: 'address',
                                docs: ['The address of the account to monitor.'],
                                type: 'pubkey',
                            },
                            {
                                name: 'offset',
                                docs: ['The byte offset of the account data to monitor.'],
                                type: 'u64',
                            },
                            {
                                name: 'size',
                                docs: ['The size of the byte slice to monitor (must be less than 1kb)'],
                                type: 'u64',
                            },
                        ],
                    },
                    {
                        name: 'cron',
                        fields: [
                            {
                                name: 'schedule',
                                docs: [
                                    'The schedule in cron syntax. Value must be parsable by the `solana_cron` package.',
                                ],
                                type: 'string',
                            },
                            {
                                name: 'skippable',
                                docs: [
                                    'Boolean value indicating whether triggering moments may be skipped if they are missed (e.g. due to network downtime).',
                                    'If false, any "missed" triggering moments will simply be executed as soon as the network comes back online.',
                                ],
                                type: 'bool',
                            },
                        ],
                    },
                    {
                        name: 'now',
                    },
                    {
                        name: 'slot',
                        fields: [{ name: 'slot', type: 'u64' }],
                    },
                    {
                        name: 'epoch',
                        fields: [{ name: 'epoch', type: 'u64' }],
                    },
                    {
                        name: 'timestamp',
                        fields: [{ name: 'unixTs', type: 'i64' }],
                    },
                    {
                        name: 'pyth',
                        fields: [
                            {
                                name: 'priceFeed',
                                docs: ['The address of the price feed to monitor.'],
                                type: 'pubkey',
                            },
                            {
                                name: 'equality',
                                docs: ['The equality operator (gte or lte) used to compare prices.'],
                                type: { defined: { name: 'equality' } },
                            },
                            {
                                name: 'limit',
                                docs: ['The limit price to compare the Pyth feed to.'],
                                type: 'i64',
                            },
                        ],
                    },
                ],
            },
        },
        {
            name: 'triggerContext',
            docs: ['The event which allowed a particular transaction thread to be triggered.'],
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'account',
                        fields: [
                            {
                                name: 'dataHash',
                                docs: ["The account's data hash."],
                                type: 'u64',
                            },
                        ],
                    },
                    {
                        name: 'cron',
                        fields: [
                            {
                                name: 'startedAt',
                                docs: ['The threshold moment the schedule was waiting for.'],
                                type: 'i64',
                            },
                        ],
                    },
                    {
                        name: 'now',
                    },
                    {
                        name: 'slot',
                        fields: [
                            {
                                name: 'startedAt',
                                docs: ['The threshold slot the schedule was waiting for.'],
                                type: 'u64',
                            },
                        ],
                    },
                    {
                        name: 'epoch',
                        fields: [
                            {
                                name: 'startedAt',
                                docs: ['The threshold epoch the schedule was waiting for.'],
                                type: 'u64',
                            },
                        ],
                    },
                    {
                        name: 'timestamp',
                        fields: [
                            {
                                name: 'startedAt',
                                docs: ['The threshold moment the schedule was waiting for.'],
                                type: 'i64',
                            },
                        ],
                    },
                    {
                        name: 'pyth',
                        fields: [{ name: 'price', type: 'i64' }],
                    },
                ],
            },
        },
    ],
    constants: [
        {
            name: 'seed',
            type: 'string',
            value: '"anchor"',
        },
    ],
};