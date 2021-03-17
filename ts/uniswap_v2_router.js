"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV2RouterContract = void 0;
// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma enum-naming
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
const base_contract_1 = require("@0x/base-contract");
const json_schemas_1 = require("@0x/json-schemas");
const utils_1 = require("@0x/utils");
const web3_wrapper_1 = require("@0x/web3-wrapper");
const assert_1 = require("@0x/assert");
const ethers = __importStar(require("ethers"));
// tslint:enable:no-unused-variable
/* istanbul ignore next */
// tslint:disable:array-type
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
class UniswapV2RouterContract extends base_contract_1.BaseContract {
    constructor(address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode = UniswapV2RouterContract.deployedBytecode) {
        super('UniswapV2Router', UniswapV2RouterContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode);
        this._methodABIIndex = {};
        utils_1.classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
        UniswapV2RouterContract.ABI().forEach((item, index) => {
            if (item.type === 'function') {
                const methodAbi = item;
                this._methodABIIndex[methodAbi.name] = index;
            }
        });
    }
    static async deployFrom0xArtifactAsync(artifact, supportedProvider, txDefaults, logDecodeDependencies, _factory, _WETH) {
        assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema, [
            json_schemas_1.schemas.addressSchema,
            json_schemas_1.schemas.numberSchema,
            json_schemas_1.schemas.jsNumber,
        ]);
        if (artifact.compilerOutput === undefined) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        const logDecodeDependenciesAbiOnly = {};
        if (Object.keys(logDecodeDependencies) !== undefined) {
            for (const key of Object.keys(logDecodeDependencies)) {
                logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
            }
        }
        return UniswapV2RouterContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _factory, _WETH);
    }
    static async deployWithLibrariesFrom0xArtifactAsync(artifact, libraryArtifacts, supportedProvider, txDefaults, logDecodeDependencies, _factory, _WETH) {
        assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema, [
            json_schemas_1.schemas.addressSchema,
            json_schemas_1.schemas.numberSchema,
            json_schemas_1.schemas.jsNumber,
        ]);
        if (artifact.compilerOutput === undefined) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
        const abi = artifact.compilerOutput.abi;
        const logDecodeDependenciesAbiOnly = {};
        if (Object.keys(logDecodeDependencies) !== undefined) {
            for (const key of Object.keys(logDecodeDependencies)) {
                logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
            }
        }
        const libraryAddresses = await UniswapV2RouterContract._deployLibrariesAsync(artifact, libraryArtifacts, new web3_wrapper_1.Web3Wrapper(provider), txDefaults);
        const bytecode = base_contract_1.linkLibrariesInBytecode(artifact, libraryAddresses);
        return UniswapV2RouterContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _factory, _WETH);
    }
    static async deployAsync(bytecode, abi, supportedProvider, txDefaults, logDecodeDependencies, _factory, _WETH) {
        assert_1.assert.isHexString('bytecode', bytecode);
        assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema, [
            json_schemas_1.schemas.addressSchema,
            json_schemas_1.schemas.numberSchema,
            json_schemas_1.schemas.jsNumber,
        ]);
        const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = base_contract_1.BaseContract._lookupConstructorAbi(abi);
        [_factory,
            _WETH
        ] = base_contract_1.BaseContract._formatABIDataItemList(constructorAbi.inputs, [_factory,
            _WETH
        ], base_contract_1.BaseContract._bigNumberToString);
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [_factory,
            _WETH
        ]);
        const web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
        const txDataWithDefaults = await base_contract_1.BaseContract._applyDefaultsToContractTxDataAsync({
            data: txData,
            ...txDefaults,
        }, web3Wrapper.estimateGasAsync.bind(web3Wrapper));
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        utils_1.logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        utils_1.logUtils.log(`UniswapV2Router successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new UniswapV2RouterContract(txReceipt.contractAddress, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [_factory,
            _WETH
        ];
        return contractInstance;
    }
    /**
     * @returns      The contract ABI
     */
    static ABI() {
        const abi = [
            {
                inputs: [
                    {
                        name: '_factory',
                        type: 'address',
                    },
                    {
                        name: '_WETH',
                        type: 'address',
                    },
                ],
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                inputs: [],
                name: 'WETH',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'tokenA',
                        type: 'address',
                    },
                    {
                        name: 'tokenB',
                        type: 'address',
                    },
                    {
                        name: 'amountADesired',
                        type: 'uint256',
                    },
                    {
                        name: 'amountBDesired',
                        type: 'uint256',
                    },
                    {
                        name: 'amountAMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountBMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'addLiquidity',
                outputs: [
                    {
                        name: 'amountA',
                        type: 'uint256',
                    },
                    {
                        name: 'amountB',
                        type: 'uint256',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'token',
                        type: 'address',
                    },
                    {
                        name: 'amountTokenDesired',
                        type: 'uint256',
                    },
                    {
                        name: 'amountTokenMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETHMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'addLiquidityETH',
                outputs: [
                    {
                        name: 'amountToken',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETH',
                        type: 'uint256',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'payable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'factory',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountOut',
                        type: 'uint256',
                    },
                    {
                        name: 'reserveIn',
                        type: 'uint256',
                    },
                    {
                        name: 'reserveOut',
                        type: 'uint256',
                    },
                ],
                name: 'getAmountIn',
                outputs: [
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'pure',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'reserveIn',
                        type: 'uint256',
                    },
                    {
                        name: 'reserveOut',
                        type: 'uint256',
                    },
                ],
                name: 'getAmountOut',
                outputs: [
                    {
                        name: 'amountOut',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'pure',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountOut',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                ],
                name: 'getAmountsIn',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                ],
                name: 'getAmountsOut',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountA',
                        type: 'uint256',
                    },
                    {
                        name: 'reserveA',
                        type: 'uint256',
                    },
                    {
                        name: 'reserveB',
                        type: 'uint256',
                    },
                ],
                name: 'quote',
                outputs: [
                    {
                        name: 'amountB',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'pure',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'tokenA',
                        type: 'address',
                    },
                    {
                        name: 'tokenB',
                        type: 'address',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                    {
                        name: 'amountAMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountBMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'removeLiquidity',
                outputs: [
                    {
                        name: 'amountA',
                        type: 'uint256',
                    },
                    {
                        name: 'amountB',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'token',
                        type: 'address',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                    {
                        name: 'amountTokenMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETHMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'removeLiquidityETH',
                outputs: [
                    {
                        name: 'amountToken',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETH',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'token',
                        type: 'address',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                    {
                        name: 'amountTokenMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETHMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
                outputs: [
                    {
                        name: 'amountETH',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'token',
                        type: 'address',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                    {
                        name: 'amountTokenMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETHMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                    {
                        name: 'approveMax',
                        type: 'bool',
                    },
                    {
                        name: 'v',
                        type: 'uint8',
                    },
                    {
                        name: 'r',
                        type: 'bytes32',
                    },
                    {
                        name: 's',
                        type: 'bytes32',
                    },
                ],
                name: 'removeLiquidityETHWithPermit',
                outputs: [
                    {
                        name: 'amountToken',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETH',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'token',
                        type: 'address',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                    {
                        name: 'amountTokenMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountETHMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                    {
                        name: 'approveMax',
                        type: 'bool',
                    },
                    {
                        name: 'v',
                        type: 'uint8',
                    },
                    {
                        name: 'r',
                        type: 'bytes32',
                    },
                    {
                        name: 's',
                        type: 'bytes32',
                    },
                ],
                name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
                outputs: [
                    {
                        name: 'amountETH',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'tokenA',
                        type: 'address',
                    },
                    {
                        name: 'tokenB',
                        type: 'address',
                    },
                    {
                        name: 'liquidity',
                        type: 'uint256',
                    },
                    {
                        name: 'amountAMin',
                        type: 'uint256',
                    },
                    {
                        name: 'amountBMin',
                        type: 'uint256',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                    {
                        name: 'approveMax',
                        type: 'bool',
                    },
                    {
                        name: 'v',
                        type: 'uint8',
                    },
                    {
                        name: 'r',
                        type: 'bytes32',
                    },
                    {
                        name: 's',
                        type: 'bytes32',
                    },
                ],
                name: 'removeLiquidityWithPermit',
                outputs: [
                    {
                        name: 'amountA',
                        type: 'uint256',
                    },
                    {
                        name: 'amountB',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountOut',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapETHForExactTokens',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'payable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactETHForTokens',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'payable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
                outputs: [],
                stateMutability: 'payable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactTokensForETH',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactTokensForTokens',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountIn',
                        type: 'uint256',
                    },
                    {
                        name: 'amountOutMin',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountOut',
                        type: 'uint256',
                    },
                    {
                        name: 'amountInMax',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapTokensForExactETH',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'amountOut',
                        type: 'uint256',
                    },
                    {
                        name: 'amountInMax',
                        type: 'uint256',
                    },
                    {
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
                name: 'swapTokensForExactTokens',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                outputs: [],
                stateMutability: 'payable',
                type: 'receive',
            },
        ];
        return abi;
    }
    static async _deployLibrariesAsync(artifact, libraryArtifacts, web3Wrapper, txDefaults, libraryAddresses = {}) {
        const links = artifact.compilerOutput.evm.bytecode.linkReferences;
        // Go through all linked libraries, recursively deploying them if necessary.
        for (const link of Object.values(links)) {
            for (const libraryName of Object.keys(link)) {
                if (!libraryAddresses[libraryName]) {
                    // Library not yet deployed.
                    const libraryArtifact = libraryArtifacts[libraryName];
                    if (!libraryArtifact) {
                        throw new Error(`Missing artifact for linked library "${libraryName}"`);
                    }
                    // Deploy any dependent libraries used by this library.
                    await UniswapV2RouterContract._deployLibrariesAsync(libraryArtifact, libraryArtifacts, web3Wrapper, txDefaults, libraryAddresses);
                    // Deploy this library.
                    const linkedLibraryBytecode = base_contract_1.linkLibrariesInBytecode(libraryArtifact, libraryAddresses);
                    const txDataWithDefaults = await base_contract_1.BaseContract._applyDefaultsToContractTxDataAsync({
                        data: linkedLibraryBytecode,
                        ...txDefaults,
                    }, web3Wrapper.estimateGasAsync.bind(web3Wrapper));
                    const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                    utils_1.logUtils.log(`transactionHash: ${txHash}`);
                    const { contractAddress } = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
                    utils_1.logUtils.log(`${libraryArtifact.contractName} successfully deployed at ${contractAddress}`);
                    libraryAddresses[libraryArtifact.contractName] = contractAddress;
                }
            }
        }
        return libraryAddresses;
    }
    getFunctionSignature(methodName) {
        const index = this._methodABIIndex[methodName];
        const methodAbi = UniswapV2RouterContract.ABI()[index]; // tslint:disable-line:no-unnecessary-type-assertion
        const functionSignature = base_contract_1.methodAbiToFunctionSignature(methodAbi);
        return functionSignature;
    }
    getABIDecodedTransactionData(methodName, callData) {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = this;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecode(callData);
        return abiDecodedCallData;
    }
    getABIDecodedReturnData(methodName, callData) {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = this;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecodeReturnValue(callData);
        return abiDecodedCallData;
    }
    getSelector(methodName) {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = this;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        return abiEncoder.getSelector();
    }
    WETH() {
        const self = this;
        const functionSignature = 'WETH()';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    ;
    addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline) {
        const self = this;
        assert_1.assert.isString('tokenA', tokenA);
        assert_1.assert.isString('tokenB', tokenB);
        assert_1.assert.isBigNumber('amountADesired', amountADesired);
        assert_1.assert.isBigNumber('amountBDesired', amountBDesired);
        assert_1.assert.isBigNumber('amountAMin', amountAMin);
        assert_1.assert.isBigNumber('amountBMin', amountBMin);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [tokenA.toLowerCase(),
                    tokenB.toLowerCase(),
                    amountADesired,
                    amountBDesired,
                    amountAMin,
                    amountBMin,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline) {
        const self = this;
        assert_1.assert.isString('token', token);
        assert_1.assert.isBigNumber('amountTokenDesired', amountTokenDesired);
        assert_1.assert.isBigNumber('amountTokenMin', amountTokenMin);
        assert_1.assert.isBigNumber('amountETHMin', amountETHMin);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'addLiquidityETH(address,uint256,uint256,uint256,address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [token.toLowerCase(),
                    amountTokenDesired,
                    amountTokenMin,
                    amountETHMin,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    factory() {
        const self = this;
        const functionSignature = 'factory()';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    ;
    getAmountIn(amountOut, reserveIn, reserveOut) {
        const self = this;
        assert_1.assert.isBigNumber('amountOut', amountOut);
        assert_1.assert.isBigNumber('reserveIn', reserveIn);
        assert_1.assert.isBigNumber('reserveOut', reserveOut);
        const functionSignature = 'getAmountIn(uint256,uint256,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                let rawCallResult;
                if (self._deployedBytecodeIfExists) {
                    rawCallResult = await self._evmExecAsync(this.getABIEncodedTransactionData());
                }
                else {
                    rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                }
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountOut,
                    reserveIn,
                    reserveOut
                ]);
            },
        };
    }
    ;
    getAmountOut(amountIn, reserveIn, reserveOut) {
        const self = this;
        assert_1.assert.isBigNumber('amountIn', amountIn);
        assert_1.assert.isBigNumber('reserveIn', reserveIn);
        assert_1.assert.isBigNumber('reserveOut', reserveOut);
        const functionSignature = 'getAmountOut(uint256,uint256,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                let rawCallResult;
                if (self._deployedBytecodeIfExists) {
                    rawCallResult = await self._evmExecAsync(this.getABIEncodedTransactionData());
                }
                else {
                    rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                }
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountIn,
                    reserveIn,
                    reserveOut
                ]);
            },
        };
    }
    ;
    getAmountsIn(amountOut, path) {
        const self = this;
        assert_1.assert.isBigNumber('amountOut', amountOut);
        assert_1.assert.isArray('path', path);
        const functionSignature = 'getAmountsIn(uint256,address[])';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountOut,
                    path
                ]);
            },
        };
    }
    ;
    getAmountsOut(amountIn, path) {
        const self = this;
        assert_1.assert.isBigNumber('amountIn', amountIn);
        assert_1.assert.isArray('path', path);
        const functionSignature = 'getAmountsOut(uint256,address[])';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountIn,
                    path
                ]);
            },
        };
    }
    ;
    quote(amountA, reserveA, reserveB) {
        const self = this;
        assert_1.assert.isBigNumber('amountA', amountA);
        assert_1.assert.isBigNumber('reserveA', reserveA);
        assert_1.assert.isBigNumber('reserveB', reserveB);
        const functionSignature = 'quote(uint256,uint256,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                let rawCallResult;
                if (self._deployedBytecodeIfExists) {
                    rawCallResult = await self._evmExecAsync(this.getABIEncodedTransactionData());
                }
                else {
                    rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                }
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountA,
                    reserveA,
                    reserveB
                ]);
            },
        };
    }
    ;
    removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline) {
        const self = this;
        assert_1.assert.isString('tokenA', tokenA);
        assert_1.assert.isString('tokenB', tokenB);
        assert_1.assert.isBigNumber('liquidity', liquidity);
        assert_1.assert.isBigNumber('amountAMin', amountAMin);
        assert_1.assert.isBigNumber('amountBMin', amountBMin);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [tokenA.toLowerCase(),
                    tokenB.toLowerCase(),
                    liquidity,
                    amountAMin,
                    amountBMin,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline) {
        const self = this;
        assert_1.assert.isString('token', token);
        assert_1.assert.isBigNumber('liquidity', liquidity);
        assert_1.assert.isBigNumber('amountTokenMin', amountTokenMin);
        assert_1.assert.isBigNumber('amountETHMin', amountETHMin);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'removeLiquidityETH(address,uint256,uint256,uint256,address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [token.toLowerCase(),
                    liquidity,
                    amountTokenMin,
                    amountETHMin,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    removeLiquidityETHSupportingFeeOnTransferTokens(token, liquidity, amountTokenMin, amountETHMin, to, deadline) {
        const self = this;
        assert_1.assert.isString('token', token);
        assert_1.assert.isBigNumber('liquidity', liquidity);
        assert_1.assert.isBigNumber('amountTokenMin', amountTokenMin);
        assert_1.assert.isBigNumber('amountETHMin', amountETHMin);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'removeLiquidityETHSupportingFeeOnTransferTokens(address,uint256,uint256,uint256,address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [token.toLowerCase(),
                    liquidity,
                    amountTokenMin,
                    amountETHMin,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    removeLiquidityETHWithPermit(token, liquidity, amountTokenMin, amountETHMin, to, deadline, approveMax, v, r, s) {
        const self = this;
        assert_1.assert.isString('token', token);
        assert_1.assert.isBigNumber('liquidity', liquidity);
        assert_1.assert.isBigNumber('amountTokenMin', amountTokenMin);
        assert_1.assert.isBigNumber('amountETHMin', amountETHMin);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        assert_1.assert.isBoolean('approveMax', approveMax);
        assert_1.assert.isNumberOrBigNumber('v', v);
        assert_1.assert.isString('r', r);
        assert_1.assert.isString('s', s);
        const functionSignature = 'removeLiquidityETHWithPermit(address,uint256,uint256,uint256,address,uint256,bool,uint8,bytes32,bytes32)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [token.toLowerCase(),
                    liquidity,
                    amountTokenMin,
                    amountETHMin,
                    to.toLowerCase(),
                    deadline,
                    approveMax,
                    v,
                    r,
                    s
                ]);
            },
        };
    }
    ;
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(token, liquidity, amountTokenMin, amountETHMin, to, deadline, approveMax, v, r, s) {
        const self = this;
        assert_1.assert.isString('token', token);
        assert_1.assert.isBigNumber('liquidity', liquidity);
        assert_1.assert.isBigNumber('amountTokenMin', amountTokenMin);
        assert_1.assert.isBigNumber('amountETHMin', amountETHMin);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        assert_1.assert.isBoolean('approveMax', approveMax);
        assert_1.assert.isNumberOrBigNumber('v', v);
        assert_1.assert.isString('r', r);
        assert_1.assert.isString('s', s);
        const functionSignature = 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(address,uint256,uint256,uint256,address,uint256,bool,uint8,bytes32,bytes32)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [token.toLowerCase(),
                    liquidity,
                    amountTokenMin,
                    amountETHMin,
                    to.toLowerCase(),
                    deadline,
                    approveMax,
                    v,
                    r,
                    s
                ]);
            },
        };
    }
    ;
    removeLiquidityWithPermit(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline, approveMax, v, r, s) {
        const self = this;
        assert_1.assert.isString('tokenA', tokenA);
        assert_1.assert.isString('tokenB', tokenB);
        assert_1.assert.isBigNumber('liquidity', liquidity);
        assert_1.assert.isBigNumber('amountAMin', amountAMin);
        assert_1.assert.isBigNumber('amountBMin', amountBMin);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        assert_1.assert.isBoolean('approveMax', approveMax);
        assert_1.assert.isNumberOrBigNumber('v', v);
        assert_1.assert.isString('r', r);
        assert_1.assert.isString('s', s);
        const functionSignature = 'removeLiquidityWithPermit(address,address,uint256,uint256,uint256,address,uint256,bool,uint8,bytes32,bytes32)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [tokenA.toLowerCase(),
                    tokenB.toLowerCase(),
                    liquidity,
                    amountAMin,
                    amountBMin,
                    to.toLowerCase(),
                    deadline,
                    approveMax,
                    v,
                    r,
                    s
                ]);
            },
        };
    }
    ;
    swapETHForExactTokens(amountOut, path, to, deadline) {
        const self = this;
        assert_1.assert.isBigNumber('amountOut', amountOut);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapETHForExactTokens(uint256,address[],address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountOut,
                    path,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    swapExactETHForTokens(amountOutMin, path, to, deadline) {
        const self = this;
        assert_1.assert.isBigNumber('amountOutMin', amountOutMin);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactETHForTokens(uint256,address[],address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountOutMin,
                    path,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    swapExactETHForTokensSupportingFeeOnTransferTokens(amountOutMin, path, to, deadline) {
        const self = this;
        assert_1.assert.isBigNumber('amountOutMin', amountOutMin);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactETHForTokensSupportingFeeOnTransferTokens(uint256,address[],address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountOutMin,
                    path,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline) {
        const self = this;
        assert_1.assert.isBigNumber('amountIn', amountIn);
        assert_1.assert.isBigNumber('amountOutMin', amountOutMin);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactTokensForETH(uint256,uint256,address[],address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountIn,
                    amountOutMin,
                    path,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    swapExactTokensForETHSupportingFeeOnTransferTokens(amountIn, amountOutMin, path, to, deadline) {
        const self = this;
        assert_1.assert.isBigNumber('amountIn', amountIn);
        assert_1.assert.isBigNumber('amountOutMin', amountOutMin);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactTokensForETHSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountIn,
                    amountOutMin,
                    path,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline) {
        const self = this;
        assert_1.assert.isBigNumber('amountIn', amountIn);
        assert_1.assert.isBigNumber('amountOutMin', amountOutMin);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountIn,
                    amountOutMin,
                    path,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    swapExactTokensForTokensSupportingFeeOnTransferTokens(amountIn, amountOutMin, path, to, deadline) {
        const self = this;
        assert_1.assert.isBigNumber('amountIn', amountIn);
        assert_1.assert.isBigNumber('amountOutMin', amountOutMin);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountIn,
                    amountOutMin,
                    path,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    swapTokensForExactETH(amountOut, amountInMax, path, to, deadline) {
        const self = this;
        assert_1.assert.isBigNumber('amountOut', amountOut);
        assert_1.assert.isBigNumber('amountInMax', amountInMax);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapTokensForExactETH(uint256,uint256,address[],address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountOut,
                    amountInMax,
                    path,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
    swapTokensForExactTokens(amountOut, amountInMax, path, to, deadline) {
        const self = this;
        assert_1.assert.isBigNumber('amountOut', amountOut);
        assert_1.assert.isBigNumber('amountInMax', amountInMax);
        assert_1.assert.isArray('path', path);
        assert_1.assert.isString('to', to);
        assert_1.assert.isBigNumber('deadline', deadline);
        const functionSignature = 'swapTokensForExactTokens(uint256,uint256,address[],address,uint256)';
        return {
            async sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData }, this.estimateGasAsync.bind(this));
                if (opts.shouldValidate !== false) {
                    await this.callAsync(txDataWithDefaults);
                }
                return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            async estimateGasAsync(txData) {
                const txDataWithDefaults = await self._applyDefaultsToTxDataAsync({ data: this.getABIEncodedTransactionData(), ...txData });
                return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            },
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [amountOut,
                    amountInMax,
                    path,
                    to.toLowerCase(),
                    deadline
                ]);
            },
        };
    }
    ;
}
exports.UniswapV2RouterContract = UniswapV2RouterContract;
UniswapV2RouterContract.contractName = 'UniswapV2Router';
// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcF92Ml9yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1bmlzd2FwX3YyX3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkZBQTZGO0FBQzdGLHFFQUFxRTtBQUNyRSxvQ0FBb0M7QUFDcEMscURBUzJCO0FBQzNCLG1EQUEyQztBQWUzQyxxQ0FBcUY7QUFFckYsbURBQStDO0FBQy9DLHVDQUFvQztBQUNwQywrQ0FBaUM7QUFDakMsbUNBQW1DO0FBSW5DLDBCQUEwQjtBQUMxQiw0QkFBNEI7QUFDNUIsMkNBQTJDO0FBQzNDLHNDQUFzQztBQUN0QyxNQUFhLHVCQUF3QixTQUFRLDRCQUFZO0lBcWxGckQsWUFDSSxPQUFlLEVBQ2YsaUJBQW9DLEVBQ3BDLFVBQTRCLEVBQzVCLHFCQUErRCxFQUMvRCxtQkFBdUMsdUJBQXVCLENBQUMsZ0JBQWdCO1FBRS9FLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUF0bEY1SCxvQkFBZSxHQUErQixFQUFFLENBQUM7UUF1bEY5RCxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNoRyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDMUIsTUFBTSxTQUFTLEdBQUcsSUFBaUIsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ2hEO1FBQ0wsQ0FBQyxDQUFDLENB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