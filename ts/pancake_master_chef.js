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
exports.PancakeMasterChefContract = exports.PancakeMasterChefEvents = void 0;
// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma enum-naming
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
const base_contract_1 = require("@0x/base-contract");
const json_schemas_1 = require("@0x/json-schemas");
const utils_1 = require("@0x/utils");
const web3_wrapper_1 = require("@0x/web3-wrapper");
const assert_1 = require("@0x/assert");
const ethers = __importStar(require("ethers"));
var PancakeMasterChefEvents;
(function (PancakeMasterChefEvents) {
    PancakeMasterChefEvents["Deposit"] = "Deposit";
    PancakeMasterChefEvents["EmergencyWithdraw"] = "EmergencyWithdraw";
    PancakeMasterChefEvents["OwnershipTransferred"] = "OwnershipTransferred";
    PancakeMasterChefEvents["Withdraw"] = "Withdraw";
})(PancakeMasterChefEvents = exports.PancakeMasterChefEvents || (exports.PancakeMasterChefEvents = {}));
/* istanbul ignore next */
// tslint:disable:array-type
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
class PancakeMasterChefContract extends base_contract_1.BaseContract {
    constructor(address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode = PancakeMasterChefContract.deployedBytecode) {
        super('PancakeMasterChef', PancakeMasterChefContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode);
        this._methodABIIndex = {};
        utils_1.classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
        this._subscriptionManager = new base_contract_1.SubscriptionManager(PancakeMasterChefContract.ABI(), this._web3Wrapper);
        PancakeMasterChefContract.ABI().forEach((item, index) => {
            if (item.type === 'function') {
                const methodAbi = item;
                this._methodABIIndex[methodAbi.name] = index;
            }
        });
    }
    static async deployFrom0xArtifactAsync(artifact, supportedProvider, txDefaults, logDecodeDependencies, _cake, _syrup, _devaddr, _cakePerBlock, _startBlock) {
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
        return PancakeMasterChefContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _cake, _syrup, _devaddr, _cakePerBlock, _startBlock);
    }
    static async deployWithLibrariesFrom0xArtifactAsync(artifact, libraryArtifacts, supportedProvider, txDefaults, logDecodeDependencies, _cake, _syrup, _devaddr, _cakePerBlock, _startBlock) {
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
        const libraryAddresses = await PancakeMasterChefContract._deployLibrariesAsync(artifact, libraryArtifacts, new web3_wrapper_1.Web3Wrapper(provider), txDefaults);
        const bytecode = base_contract_1.linkLibrariesInBytecode(artifact, libraryAddresses);
        return PancakeMasterChefContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, _cake, _syrup, _devaddr, _cakePerBlock, _startBlock);
    }
    static async deployAsync(bytecode, abi, supportedProvider, txDefaults, logDecodeDependencies, _cake, _syrup, _devaddr, _cakePerBlock, _startBlock) {
        assert_1.assert.isHexString('bytecode', bytecode);
        assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema, [
            json_schemas_1.schemas.addressSchema,
            json_schemas_1.schemas.numberSchema,
            json_schemas_1.schemas.jsNumber,
        ]);
        const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = base_contract_1.BaseContract._lookupConstructorAbi(abi);
        [_cake,
            _syrup,
            _devaddr,
            _cakePerBlock,
            _startBlock
        ] = base_contract_1.BaseContract._formatABIDataItemList(constructorAbi.inputs, [_cake,
            _syrup,
            _devaddr,
            _cakePerBlock,
            _startBlock
        ], base_contract_1.BaseContract._bigNumberToString);
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [_cake,
            _syrup,
            _devaddr,
            _cakePerBlock,
            _startBlock
        ]);
        const web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
        const txDataWithDefaults = await base_contract_1.BaseContract._applyDefaultsToContractTxDataAsync({
            data: txData,
            ...txDefaults,
        }, web3Wrapper.estimateGasAsync.bind(web3Wrapper));
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        utils_1.logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        utils_1.logUtils.log(`PancakeMasterChef successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new PancakeMasterChefContract(txReceipt.contractAddress, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [_cake,
            _syrup,
            _devaddr,
            _cakePerBlock,
            _startBlock
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
                        name: '_cake',
                        type: 'address',
                    },
                    {
                        name: '_syrup',
                        type: 'address',
                    },
                    {
                        name: '_devaddr',
                        type: 'address',
                    },
                    {
                        name: '_cakePerBlock',
                        type: 'uint256',
                    },
                    {
                        name: '_startBlock',
                        type: 'uint256',
                    },
                ],
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'user',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'pid',
                        type: 'uint256',
                        indexed: true,
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Deposit',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'user',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'pid',
                        type: 'uint256',
                        indexed: true,
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'EmergencyWithdraw',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'previousOwner',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'newOwner',
                        type: 'address',
                        indexed: true,
                    },
                ],
                name: 'OwnershipTransferred',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'user',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'pid',
                        type: 'uint256',
                        indexed: true,
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Withdraw',
                outputs: [],
                type: 'event',
            },
            {
                inputs: [],
                name: 'BONUS_MULTIPLIER',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_allocPoint',
                        type: 'uint256',
                    },
                    {
                        name: '_lpToken',
                        type: 'address',
                    },
                    {
                        name: '_withUpdate',
                        type: 'bool',
                    },
                ],
                name: 'add',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'cake',
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
                inputs: [],
                name: 'cakePerBlock',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_pid',
                        type: 'uint256',
                    },
                    {
                        name: '_amount',
                        type: 'uint256',
                    },
                ],
                name: 'deposit',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_devaddr',
                        type: 'address',
                    },
                ],
                name: 'dev',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'devaddr',
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
                        name: '_pid',
                        type: 'uint256',
                    },
                ],
                name: 'emergencyWithdraw',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_amount',
                        type: 'uint256',
                    },
                ],
                name: 'enterStaking',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_from',
                        type: 'uint256',
                    },
                    {
                        name: '_to',
                        type: 'uint256',
                    },
                ],
                name: 'getMultiplier',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_amount',
                        type: 'uint256',
                    },
                ],
                name: 'leaveStaking',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'massUpdatePools',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_pid',
                        type: 'uint256',
                    },
                ],
                name: 'migrate',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'migrator',
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
                inputs: [],
                name: 'owner',
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
                        name: '_pid',
                        type: 'uint256',
                    },
                    {
                        name: '_user',
                        type: 'address',
                    },
                ],
                name: 'pendingCake',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'index_0',
                        type: 'uint256',
                    },
                ],
                name: 'poolInfo',
                outputs: [
                    {
                        name: 'lpToken',
                        type: 'address',
                    },
                    {
                        name: 'allocPoint',
                        type: 'uint256',
                    },
                    {
                        name: 'lastRewardBlock',
                        type: 'uint256',
                    },
                    {
                        name: 'accCakePerShare',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'poolLength',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'renounceOwnership',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_pid',
                        type: 'uint256',
                    },
                    {
                        name: '_allocPoint',
                        type: 'uint256',
                    },
                    {
                        name: '_withUpdate',
                        type: 'bool',
                    },
                ],
                name: 'set',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_migrator',
                        type: 'address',
                    },
                ],
                name: 'setMigrator',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'startBlock',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'syrup',
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
                inputs: [],
                name: 'totalAllocPoint',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'newOwner',
                        type: 'address',
                    },
                ],
                name: 'transferOwnership',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'multiplierNumber',
                        type: 'uint256',
                    },
                ],
                name: 'updateMultiplier',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_pid',
                        type: 'uint256',
                    },
                ],
                name: 'updatePool',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'index_0',
                        type: 'uint256',
                    },
                    {
                        name: 'index_1',
                        type: 'address',
                    },
                ],
                name: 'userInfo',
                outputs: [
                    {
                        name: 'amount',
                        type: 'uint256',
                    },
                    {
                        name: 'rewardDebt',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: '_pid',
                        type: 'uint256',
                    },
                    {
                        name: '_amount',
                        type: 'uint256',
                    },
                ],
                name: 'withdraw',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
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
                    await PancakeMasterChefContract._deployLibrariesAsync(libraryArtifact, libraryArtifacts, web3Wrapper, txDefaults, libraryAddresses);
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
        const methodAbi = PancakeMasterChefContract.ABI()[index]; // tslint:disable-line:no-unnecessary-type-assertion
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
    BONUS_MULTIPLIER() {
        const self = this;
        const functionSignature = 'BONUS_MULTIPLIER()';
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
    add(_allocPoint, _lpToken, _withUpdate) {
        const self = this;
        assert_1.assert.isBigNumber('_allocPoint', _allocPoint);
        assert_1.assert.isString('_lpToken', _lpToken);
        assert_1.assert.isBoolean('_withUpdate', _withUpdate);
        const functionSignature = 'add(uint256,address,bool)';
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
                return self._strictEncodeArguments(functionSignature, [_allocPoint,
                    _lpToken.toLowerCase(),
                    _withUpdate
                ]);
            },
        };
    }
    ;
    cake() {
        const self = this;
        const functionSignature = 'cake()';
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
    cakePerBlock() {
        const self = this;
        const functionSignature = 'cakePerBlock()';
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
    deposit(_pid, _amount) {
        const self = this;
        assert_1.assert.isBigNumber('_pid', _pid);
        assert_1.assert.isBigNumber('_amount', _amount);
        const functionSignature = 'deposit(uint256,uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_pid,
                    _amount
                ]);
            },
        };
    }
    ;
    dev(_devaddr) {
        const self = this;
        assert_1.assert.isString('_devaddr', _devaddr);
        const functionSignature = 'dev(address)';
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
                return self._strictEncodeArguments(functionSignature, [_devaddr.toLowerCase()
                ]);
            },
        };
    }
    ;
    devaddr() {
        const self = this;
        const functionSignature = 'devaddr()';
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
    emergencyWithdraw(_pid) {
        const self = this;
        assert_1.assert.isBigNumber('_pid', _pid);
        const functionSignature = 'emergencyWithdraw(uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_pid
                ]);
            },
        };
    }
    ;
    enterStaking(_amount) {
        const self = this;
        assert_1.assert.isBigNumber('_amount', _amount);
        const functionSignature = 'enterStaking(uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_amount
                ]);
            },
        };
    }
    ;
    getMultiplier(_from, _to) {
        const self = this;
        assert_1.assert.isBigNumber('_from', _from);
        assert_1.assert.isBigNumber('_to', _to);
        const functionSignature = 'getMultiplier(uint256,uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_from,
                    _to
                ]);
            },
        };
    }
    ;
    leaveStaking(_amount) {
        const self = this;
        assert_1.assert.isBigNumber('_amount', _amount);
        const functionSignature = 'leaveStaking(uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_amount
                ]);
            },
        };
    }
    ;
    massUpdatePools() {
        const self = this;
        const functionSignature = 'massUpdatePools()';
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
    migrate(_pid) {
        const self = this;
        assert_1.assert.isBigNumber('_pid', _pid);
        const functionSignature = 'migrate(uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_pid
                ]);
            },
        };
    }
    ;
    migrator() {
        const self = this;
        const functionSignature = 'migrator()';
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
    owner() {
        const self = this;
        const functionSignature = 'owner()';
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
    pendingCake(_pid, _user) {
        const self = this;
        assert_1.assert.isBigNumber('_pid', _pid);
        assert_1.assert.isString('_user', _user);
        const functionSignature = 'pendingCake(uint256,address)';
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
                return self._strictEncodeArguments(functionSignature, [_pid,
                    _user.toLowerCase()
                ]);
            },
        };
    }
    ;
    poolInfo(index_0) {
        const self = this;
        assert_1.assert.isBigNumber('index_0', index_0);
        const functionSignature = 'poolInfo(uint256)';
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
                return self._strictEncodeArguments(functionSignature, [index_0
                ]);
            },
        };
    }
    ;
    poolLength() {
        const self = this;
        const functionSignature = 'poolLength()';
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
    renounceOwnership() {
        const self = this;
        const functionSignature = 'renounceOwnership()';
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
    set(_pid, _allocPoint, _withUpdate) {
        const self = this;
        assert_1.assert.isBigNumber('_pid', _pid);
        assert_1.assert.isBigNumber('_allocPoint', _allocPoint);
        assert_1.assert.isBoolean('_withUpdate', _withUpdate);
        const functionSignature = 'set(uint256,uint256,bool)';
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
                return self._strictEncodeArguments(functionSignature, [_pid,
                    _allocPoint,
                    _withUpdate
                ]);
            },
        };
    }
    ;
    setMigrator(_migrator) {
        const self = this;
        assert_1.assert.isString('_migrator', _migrator);
        const functionSignature = 'setMigrator(address)';
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
                return self._strictEncodeArguments(functionSignature, [_migrator.toLowerCase()
                ]);
            },
        };
    }
    ;
    startBlock() {
        const self = this;
        const functionSignature = 'startBlock()';
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
    syrup() {
        const self = this;
        const functionSignature = 'syrup()';
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
    totalAllocPoint() {
        const self = this;
        const functionSignature = 'totalAllocPoint()';
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
    transferOwnership(newOwner) {
        const self = this;
        assert_1.assert.isString('newOwner', newOwner);
        const functionSignature = 'transferOwnership(address)';
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
                return self._strictEncodeArguments(functionSignature, [newOwner.toLowerCase()
                ]);
            },
        };
    }
    ;
    updateMultiplier(multiplierNumber) {
        const self = this;
        assert_1.assert.isBigNumber('multiplierNumber', multiplierNumber);
        const functionSignature = 'updateMultiplier(uint256)';
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
                return self._strictEncodeArguments(functionSignature, [multiplierNumber
                ]);
            },
        };
    }
    ;
    updatePool(_pid) {
        const self = this;
        assert_1.assert.isBigNumber('_pid', _pid);
        const functionSignature = 'updatePool(uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_pid
                ]);
            },
        };
    }
    ;
    userInfo(index_0, index_1) {
        const self = this;
        assert_1.assert.isBigNumber('index_0', index_0);
        assert_1.assert.isString('index_1', index_1);
        const functionSignature = 'userInfo(uint256,address)';
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
                return self._strictEncodeArguments(functionSignature, [index_0,
                    index_1.toLowerCase()
                ]);
            },
        };
    }
    ;
    withdraw(_pid, _amount) {
        const self = this;
        assert_1.assert.isBigNumber('_pid', _pid);
        assert_1.assert.isBigNumber('_amount', _amount);
        const functionSignature = 'withdraw(uint256,uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_pid,
                    _amount
                ]);
            },
        };
    }
    ;
    /**
     * Subscribe to an event type emitted by the PancakeMasterChef contract.
     * @param eventName The PancakeMasterChef contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    subscribe(eventName, indexFilterValues, callback, isVerbose = false, blockPollingIntervalMs) {
        assert_1.assert.doesBelongToStringEnum('eventName', eventName, PancakeMasterChefEvents);
        assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
        assert_1.assert.isFunction('callback', callback);
        const subscriptionToken = this._subscriptionManager.subscribe(this.address, eventName, indexFilterValues, PancakeMasterChefContract.ABI(), callback, isVerbose, blockPollingIntervalMs);
        return subscriptionToken;
    }
    /**
     * Cancel a subscription
     * @param subscriptionToken Subscription token returned by `subscribe()`
     */
    unsubscribe(subscriptionToken) {
        this._subscriptionManager.unsubscribe(subscriptionToken);
    }
    /**
     * Cancels all existing subscriptions
     */
    unsubscribeAll() {
        this._subscriptionManager.unsubscribeAll();
    }
    /**
     * Gets historical logs without creating a subscription
     * @param eventName The PancakeMasterChef contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    async getLogsAsync(eventName, blockRange, indexFilterValues) {
        assert_1.assert.doesBelongToStringEnum('eventName', eventName, PancakeMasterChefEvents);
        assert_1.assert.doesConformToSchema('blockRange', blockRange, json_schemas_1.schemas.blockRangeSchema);
        assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
        const logs = await this._subscriptionManager.getLogsAsync(this.address, eventName, blockRange, indexFilterValues, PancakeMasterChefContract.ABI());
        return logs;
    }
}
exports.PancakeMasterChefContract = PancakeMasterChefContract;
PancakeMasterChefContract.contractName = 'PancakeMasterChef';
// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuY2FrZV9tYXN0ZXJfY2hlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhbmNha2VfbWFzdGVyX2NoZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZGQUE2RjtBQUM3RixxRUFBcUU7QUFDckUsb0NBQW9DO0FBQ3BDLHFEQVMyQjtBQUMzQixtREFBMkM7QUFnQjNDLHFDQUFxRjtBQUVyRixtREFBK0M7QUFDL0MsdUNBQW9DO0FBQ3BDLCtDQUFpQztBQVVqQyxJQUFZLHVCQUtYO0FBTEQsV0FBWSx1QkFBdUI7SUFDL0IsOENBQW1CLENBQUE7SUFDbkIsa0VBQXVDLENBQUE7SUFDdkMsd0VBQTZDLENBQUE7SUFDN0MsZ0RBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUxXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBS2xDO0FBMEJELDBCQUEwQjtBQUMxQiw0QkFBNEI7QUFDNUIsMkNBQTJDO0FBQzNDLHNDQUFzQztBQUN0QyxNQUFhLHlCQUEwQixTQUFRLDRCQUFZO0lBNDNFdkQsWUFDSSxPQUFlLEVBQ2YsaUJBQW9DLEVBQ3BDLFVBQTRCLEVBQzVCLHFCQUErRCxFQUMvRCxtQkFBdUMseUJBQXlCLENBQUMsZ0JBQWdCO1FBRWpGLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSx5QkFBeUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUE3M0VoSSxvQkFBZSxHQUErQixFQUFFLENBQUM7UUE4M0U5RCxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxtQ0FBbUIsQ0FDdkMseUJBQXlCLENBQUMsR0FBRyxFQUFFLEVBQy9CLElBQUksQ0FBQyxZQUFZLENBQ3BCLENBQUM7UUFDVix5QkFBeUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDMUIsTUFBTSxTQUFTLEdBQUcsSUFBaUIsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ2hEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBdjRFRSxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUNyQyxRQUFtRCxFQUNuRCxpQkFBb0MsRUFDcEMsVUFBMkIsRUFDM0IscUJBQThGLEVBQzFGLEtBQWEsRUFDYixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsYUFBd0IsRUFDeEIsV0FBc0I7UUFFMUIsZUFBTSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsc0JBQU8sQ0FBQyxZQUFZLEVBQUU7WUFDdkUsc0JBQU8sQ0FBQyxhQUFhO1lBQ3JCLHNCQUFPLENBQUMsWUFBWTtZQUNwQixzQkFBTyxDQUFDLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxRQUFRLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7U0FDckU7UUFDRCxNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckUsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUM3RCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUN4QyxNQUFNLDRCQUE0QixHQUE0QyxFQUFFLENBQUM7UUFDakYsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ2xELEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUNsRCw0QkFBNEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO2FBQ3JGO1NBQ0o7UUFDRCxPQUFPLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsNEJBQTRCLEVBQUUsS0FBSyxFQUM3SCxNQUFNLEVBQ04sUUFBUSxFQUNSLGFBQWEsRUFDYixXQUFXLENBQ1YsQ0FBQztJQUNFLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUN0RCxRQUEwQixFQUMxQixnQkFBNkQsRUFDN0QsaUJBQW9DLEVBQ3BDLFVBQTJCLEVBQzNCLHFCQUE4RixFQUMxRixLQUFhLEVBQ2IsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLGFBQXdCLEVBQ3hCLFdBQXNCO1FBRTFCLGVBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLHNCQUFPLENBQUMsWUFBWSxFQUFFO1lBQ3ZFLHNCQUFPLENBQUMsYUFBYTtZQUNyQixzQkFBTyxDQUFDLFlBQVk7WUFDcEIsc0JBQU8sQ0FBQyxRQUFRO1NBQ25CLENBQUMsQ0FBQztRQUNILElBQUksUUFBUSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUU7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsTUFBTSxRQUFRLEdBQUcscUJBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1FBQ3hDLE1BQU0sNEJBQTRCLEdBQTRDLEVBQUUsQ0FBQztRQUNqRixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDbEQsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ2xELDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7YUFDckY7U0FDSjtRQUNELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSx5QkFBeUIsQ0FBQyxxQkFBcUIsQ0FDMUUsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixJQUFJLDBCQUFXLENBQUMsUUFBUSxDQUFDLEVBQ3pCLFVBQVUsQ0FDYixDQUFDO1FBQ0YsTUFBTSxRQUFRLEdBQUcsdUNBQXVCLENBQ3BDLFFBQVEsRUFDUixnQkFBZ0IsQ0FDbkIsQ0FBQztRQUNGLE9BQU8seUJBQXlCLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSw0QkFBNEIsRUFBRSxLQUFLLEVBQzdILE1BQU0sRUFDTixRQUFRLEVBQ1IsYUFBYSxFQUNiLFdBQVcsQ0FDVixDQUFDO0lBQ0UsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUMzQixRQUFnQixFQUNoQixHQUFnQixFQUNoQixpQkFBb0MsRUFDcEMsVUFBMkIsRUFDM0IscUJBQThELEVBQzFELEtBQWEsRUFDYixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsYUFBd0IsRUFDeEIsV0FBc0I7UUFFMUIsZUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekMsZUFBTSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsc0JBQU8sQ0FBQyxZQUFZLEVBQUU7WUFDdkUsc0JBQU8sQ0FBQyxhQUFhO1lBQ3JCLHNCQUFPLENBQUMsWUFBWTtZQUNwQixzQkFBTyxDQUFDLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcscUJBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sY0FBYyxHQUFHLDRCQUFZLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxLQUFLO1lBQ2QsTUFBTTtZQUNOLFFBQVE7WUFDUixhQUFhO1lBQ2IsV0FBVztTQUNWLEdBQUcsNEJBQVksQ0FBQyxzQkFBc0IsQ0FDM0IsY0FBYyxDQUFDLE1BQU0sRUFDckIsQ0FBQyxLQUFLO1lBQ2xCLE1BQU07WUFDTixRQUFRO1lBQ1IsYUFBYTtZQUNiLFdBQVc7U0FDVixFQUNXLDRCQUFZLENBQUMsa0JBQWtCLENBQ2xDLENBQUM7UUFDRixNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7UUFDeEMsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLO1lBQ3pELE1BQU07WUFDTixRQUFRO1lBQ1IsYUFBYTtZQUNiLFdBQVc7U0FDVixDQUFDLENBQUM7UUFDSyxNQUFNLFdBQVcsR0FBRyxJQUFJLDBCQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLDRCQUFZLENBQUMsbUNBQW1DLENBQzdFO1lBQ0ksSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLFVBQVU7U0FDaEIsRUFDRCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUNqRCxDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMxRSxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMzQyxNQUFNLFNBQVMsR0FBRyxNQUFNLFdBQVcsQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RSxnQkFBUSxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDeEYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxlQUF5QixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUN6SSxnQkFBZ0IsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxLQUFLO1lBQ2pELE1BQU07WUFDTixRQUFRO1lBQ1IsYUFBYTtZQUNiLFdBQVc7U0FDVixDQUFDO1FBQ00sT0FBTyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsR0FBRztRQUNiLE1BQU0sR0FBRyxHQUFHO1lBQ1I7Z0JBQ0ksTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxPQUFPO3dCQUNiLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsU0FBUztxQkFDbEI7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsZUFBZTt3QkFDckIsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO29CQUNEO3dCQUNJLElBQUksRUFBRSxhQUFhO3dCQUNuQixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsZUFBZSxFQUFFLFlBQVk7Z0JBQzdCLElBQUksRUFBRSxhQUFhO2FBQ3RCO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsSUFBSTtxQkFDaEI7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEtBQUs7d0JBQ1gsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO29CQUNEO3dCQUNJLElBQUksRUFBRSxRQUFRO3dCQUNkLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxLQUFLO3FCQUNqQjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsRUFDUjtnQkFDRCxJQUFJLEVBQUUsT0FBTzthQUNoQjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLE1BQU07d0JBQ1osSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO29CQUNEO3dCQUNJLElBQUksRUFBRSxLQUFLO3dCQUNYLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxJQUFJO3FCQUNoQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsS0FBSztxQkFDakI7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsSUFBSSxFQUFFLE9BQU87YUFDaEI7WUFDRDtnQkFDSSxTQUFTLEVBQUUsS0FBSztnQkFDaEIsTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxlQUFlO3dCQUNyQixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsSUFBSTtxQkFDaEI7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxJQUFJO3FCQUNoQjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsc0JBQXNCO2dCQUM1QixPQUFPLEVBQUUsRUFDUjtnQkFDRCxJQUFJLEVBQUUsT0FBTzthQUNoQjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLE1BQU07d0JBQ1osSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLElBQUk7cUJBQ2hCO29CQUNEO3dCQUNJLElBQUksRUFBRSxLQUFLO3dCQUNYLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxJQUFJO3FCQUNoQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsS0FBSztxQkFDakI7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSxFQUNSO2dCQUNELElBQUksRUFBRSxPQUFPO2FBQ2hCO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFLEVBQ1A7Z0JBQ0QsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxlQUFlLEVBQUUsTUFBTTtnQkFDdkIsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLGFBQWE7d0JBQ25CLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO29CQUNEO3dCQUNJLElBQUksRUFBRSxhQUFhO3dCQUNuQixJQUFJLEVBQUUsTUFBTTtxQkFDZjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsS0FBSztnQkFDWCxPQUFPLEVBQUUsRUFDUjtnQkFDRCxlQUFlLEVBQUUsWUFBWTtnQkFDN0IsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUUsRUFDUDtnQkFDRCxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELGVBQWUsRUFBRSxNQUFNO2dCQUN2QixJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNEO2dCQUNJLE1BQU0sRUFBRSxFQUNQO2dCQUNELElBQUksRUFBRSxjQUFjO2dCQUNwQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELGVBQWUsRUFBRSxNQUFNO2dCQUN2QixJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNEO2dCQUNJLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUUsU0FBUztxQkFDbEI7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLFNBQVM7d0JBQ2YsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxFQUNSO2dCQUNELGVBQWUsRUFBRSxZQUFZO2dCQUM3QixJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNEO2dCQUNJLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELElBQUksRUFBRSxLQUFLO2dCQUNYLE9BQU8sRUFBRSxFQUNSO2dCQUNELGVBQWUsRUFBRSxZQUFZO2dCQUM3QixJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNEO2dCQUNJLE1BQU0sRUFBRSxFQUNQO2dCQUNELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxNQUFNO3dCQUNaLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixPQUFPLEVBQUUsRUFDUjtnQkFDRCxlQUFlLEVBQUUsWUFBWTtnQkFDN0IsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLFNBQVM7d0JBQ2YsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELElBQUksRUFBRSxjQUFjO2dCQUNwQixPQUFPLEVBQUUsRUFDUjtnQkFDRCxlQUFlLEVBQUUsWUFBWTtnQkFDN0IsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLE9BQU87d0JBQ2IsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO29CQUNEO3dCQUNJLElBQUksRUFBRSxLQUFLO3dCQUNYLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxlQUFlLEVBQUUsTUFBTTtnQkFDdkIsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLFNBQVM7d0JBQ2YsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELElBQUksRUFBRSxjQUFjO2dCQUNwQixPQUFPLEVBQUUsRUFDUjtnQkFDRCxlQUFlLEVBQUUsWUFBWTtnQkFDN0IsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUUsRUFDUDtnQkFDRCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixPQUFPLEVBQUUsRUFDUjtnQkFDRCxlQUFlLEVBQUUsWUFBWTtnQkFDN0IsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLE1BQU07d0JBQ1osSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxFQUNSO2dCQUNELGVBQWUsRUFBRSxZQUFZO2dCQUM3QixJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNEO2dCQUNJLE1BQU0sRUFBRSxFQUNQO2dCQUNELElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELGVBQWUsRUFBRSxNQUFNO2dCQUN2QixJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNEO2dCQUNJLE1BQU0sRUFBRSxFQUNQO2dCQUNELElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxNQUFNO3dCQUNaLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsT0FBTzt3QkFDYixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsWUFBWTt3QkFDbEIsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO29CQUNEO3dCQUNJLElBQUksRUFBRSxpQkFBaUI7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsaUJBQWlCO3dCQUN2QixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFLEVBQ1A7Z0JBQ0QsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFLEVBQ1A7Z0JBQ0QsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsZUFBZSxFQUFFLFlBQVk7Z0JBQzdCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxNQUFNO3dCQUNaLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsYUFBYTt3QkFDbkIsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO29CQUNEO3dCQUNJLElBQUksRUFBRSxhQUFhO3dCQUNuQixJQUFJLEVBQUUsTUFBTTtxQkFDZjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsS0FBSztnQkFDWCxPQUFPLEVBQUUsRUFDUjtnQkFDRCxlQUFlLEVBQUUsWUFBWTtnQkFDN0IsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsYUFBYTtnQkFDbkIsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsZUFBZSxFQUFFLFlBQVk7Z0JBQzdCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFLEVBQ1A7Z0JBQ0QsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFLEVBQ1A7Z0JBQ0QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsT0FBTyxFQUFFO29CQUNMO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxlQUFlLEVBQUUsTUFBTTtnQkFDdkIsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUUsRUFDUDtnQkFDRCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELGVBQWUsRUFBRSxNQUFNO2dCQUN2QixJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNEO2dCQUNJLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO2lCQUNKO2dCQUNELElBQUksRUFBRSxtQkFBbUI7Z0JBQ3pCLE9BQU8sRUFBRSxFQUNSO2dCQUNELGVBQWUsRUFBRSxZQUFZO2dCQUM3QixJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNEO2dCQUNJLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxJQUFJLEVBQUUsa0JBQWtCO3dCQUN4QixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsZUFBZSxFQUFFLFlBQVk7Z0JBQzdCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxNQUFNO3dCQUNaLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsZUFBZSxFQUFFLFlBQVk7Z0JBQzdCLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsU0FBUzt3QkFDZixJQUFJLEVBQUUsU0FBUztxQkFDbEI7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsU0FBUztxQkFDbEI7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxlQUFlLEVBQUUsTUFBTTtnQkFDdkIsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRDtnQkFDSSxNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLE1BQU07d0JBQ1osSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO29CQUNEO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRSxTQUFTO3FCQUNsQjtpQkFDSjtnQkFDRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsZUFBZSxFQUFFLFlBQVk7Z0JBQzdCLElBQUksRUFBRSxVQUFVO2FBQ25CO1NBQ1csQ0FBQztRQUNqQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFUyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUN4QyxRQUEwQixFQUMxQixnQkFBNkQsRUFDN0QsV0FBd0IsRUFDeEIsVUFBMkIsRUFDM0IsbUJBQXNELEVBQUU7UUFFeEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztRQUNsRSw0RUFBNEU7UUFDNUUsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLEtBQUssTUFBTSxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUNoQyw0QkFBNEI7b0JBQzVCLE1BQU0sZUFBZSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsZUFBZSxFQUFFO3dCQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxXQUFXLEdBQUcsQ0FBQyxDQUFDO3FCQUMzRTtvQkFDRCx1REFBdUQ7b0JBQ3ZELE1BQU0seUJBQXlCLENBQUMscUJBQXFCLENBQ2pELGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsQ0FDbkIsQ0FBQztvQkFDRix1QkFBdUI7b0JBQ3ZCLE1BQU0scUJBQXFCLEdBQUcsdUNBQXVCLENBQ2pELGVBQWUsRUFDZixnQkFBZ0IsQ0FDbkIsQ0FBQztvQkFDRixNQUFNLGtCQUFrQixHQUFHLE1BQU0sNEJBQVksQ0FBQyxtQ0FBbUMsQ0FDN0U7d0JBQ0ksSUFBSSxFQUFFLHFCQUFxQjt3QkFDM0IsR0FBRyxVQUFVO3FCQUNoQixFQUNELFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQ2pELENBQUM7b0JBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFDMUUsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLE1BQU0sRUFBRSxDQUFDLENBQUM7b0JBQzNDLE1BQU0sRUFBRSxlQUFlLEVBQUUsR0FBRyxNQUFNLFdBQVcsQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbkYsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFlLENBQUMsWUFBWSw2QkFBNkIsZUFBZSxFQUFFLENBQUMsQ0FBQztvQkFDNUYsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLGVBQXlCLENBQUM7aUJBQzlFO2FBQ0o7U0FDSjtRQUNELE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQUVNLG9CQUFvQixDQUFDLFVBQWtCO1FBQzFDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsTUFBTSxTQUFTLEdBQUcseUJBQXlCLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFjLENBQUMsQ0FBQyxvREFBb0Q7UUFDM0gsTUFBTSxpQkFBaUIsR0FBRyw0Q0FBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRSxPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7SUFFTSw0QkFBNEIsQ0FBSSxVQUFrQixFQUFFLFFBQWdCO1FBQ3ZFLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sSUFBSSxHQUFJLElBQXlDLENBQUM7UUFDeEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0QsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sa0JBQWtCLENBQUM7SUFDOUIsQ0FBQztJQUVNLHVCQUF1QixDQUFJLFVBQWtCLEVBQUUsUUFBZ0I7UUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsTUFBTSxJQUFJLEdBQUksSUFBeUMsQ0FBQztRQUN4RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM3RCxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBSSxRQUFRLENBQUMsQ0FBQztRQUMzRSxPQUFPLGtCQUFrQixDQUFDO0lBQzlCLENBQUM7SUFFTSxXQUFXLENBQUMsVUFBa0I7UUFDakMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsTUFBTSxJQUFJLEdBQUksSUFBeUMsQ0FBQztRQUN4RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM3RCxPQUFPLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sZ0JBQWdCO1FBR25CLE1BQU0sSUFBSSxHQUFHLElBQXdDLENBQUM7UUFDdEQsTUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztRQUUvQyxPQUFPO1lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUN0QixNQUFvQyxFQUNwQyxPQUE0QixFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRXBELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEVBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssRUFBRTtvQkFDL0IsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFDRCw0QkFBNEIsQ0FDeEIsTUFBd0IsRUFDeEIsT0FBb0MsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUU1RCxPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNGLENBQUM7WUFDRCxLQUFLLENBQUMsZ0JBQWdCLENBQ2xCLE1BQW9DO2dCQUVwQyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUMzRCxDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFDRCxLQUFLLENBQUMsU0FBUyxDQUNYLFdBQThCLEVBQUUsRUFDaEMsWUFBeUI7Z0JBR3pCLDRCQUFZLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUM3SCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDN0QsNEJBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzFFLE9BQU8sVUFBVSxDQUFDLHVCQUF1QixDQUMzQyxhQUFhLENBQUMsQ0FBQztZQUNqQixDQUFDO1lBQ0QsNEJBQTRCO2dCQUN4QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5RCxDQUFDO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFBQSxDQUFDO0lBQ0ssR0FBRyxDQUNGLFdBQXNCLEVBQ3RCLFFBQWdCLEVBQ2hCLFdBQW9CO1FBR3hCLE1BQU0sSUFBSSxHQUFHLElBQXdDLENBQUM7UUFDbEQsZUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0MsZUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEMsZUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDakQsTUFBTSxpQkFBaUIsR0FBRywyQkFBMkIsQ0FBQztRQUV0RCxPQUFPO1lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUN0QixNQUFvQyxFQUNwQyxPQUE0QixFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRXBELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEVBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssRUFBRTtvQkFDL0IsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFDRCw0QkFBNEIsQ0FDeEIsTUFBd0IsRUFDeEIsT0FBb0MsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUU1RCxPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNGLENBQUM7WUFDRCxLQUFLLENBQUMsZ0JBQWdCLENBQ2xCLE1BQW9DO2dCQUVwQyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUMzRCxDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFDRCxLQUFLLENBQUMsU0FBUyxDQUNYLFdBQThCLEVBQUUsRUFDaEMsWUFBeUI7Z0JBR3pCLDRCQUFZLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUM3SCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDN0QsNEJBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzFFLE9BQU8sVUFBVSxDQUFDLHVCQUF1QixDQUMzQyxhQUFhLENBQUMsQ0FBQztZQUNqQixDQUFDO1lBQ0QsNEJBQTRCO2dCQUN4QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFdBQVc7b0JBQ3RFLFFBQVEsQ0FBQyxXQUFXLEVBQUU7b0JBQ3RCLFdBQVc7aUJBQ1YsQ0FBQyxDQUFDO1lBQ0gsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLElBQUk7UUFHUCxNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ3RELE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDO1FBRW5DLE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlELENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxZQUFZO1FBR2YsTUFBTSxJQUFJLEdBQUcsSUFBd0MsQ0FBQztRQUN0RCxNQUFNLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBRTNDLE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlELENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxPQUFPLENBQ04sSUFBZSxFQUNmLE9BQWtCO1FBR3RCLE1BQU0sSUFBSSxHQUFHLElBQXdDLENBQUM7UUFDbEQsZUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsZUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0MsTUFBTSxpQkFBaUIsR0FBRywwQkFBMEIsQ0FBQztRQUVyRCxPQUFPO1lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUN0QixNQUFvQyxFQUNwQyxPQUE0QixFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRXBELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEVBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssRUFBRTtvQkFDL0IsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFDRCw0QkFBNEIsQ0FDeEIsTUFBd0IsRUFDeEIsT0FBb0MsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUU1RCxPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNGLENBQUM7WUFDRCxLQUFLLENBQUMsZ0JBQWdCLENBQ2xCLE1BQW9DO2dCQUVwQyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUMzRCxDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFDRCxLQUFLLENBQUMsU0FBUyxDQUNYLFdBQThCLEVBQUUsRUFDaEMsWUFBeUI7Z0JBR3pCLDRCQUFZLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUM3SCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDN0QsNEJBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzFFLE9BQU8sVUFBVSxDQUFDLHVCQUF1QixDQUMzQyxhQUFhLENBQUMsQ0FBQztZQUNqQixDQUFDO1lBQ0QsNEJBQTRCO2dCQUN4QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUk7b0JBQy9ELE9BQU87aUJBQ04sQ0FBQyxDQUFDO1lBQ0gsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLEdBQUcsQ0FDRixRQUFnQjtRQUdwQixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ2xELGVBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDO1FBRXpDLE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtpQkFDaEYsQ0FBQyxDQUFDO1lBQ0gsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLE9BQU87UUFHVixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ3RELE1BQU0saUJBQWlCLEdBQUcsV0FBVyxDQUFDO1FBRXRDLE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlELENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxpQkFBaUIsQ0FDaEIsSUFBZTtRQUduQixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ2xELGVBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE1BQU0saUJBQWlCLEdBQUcsNEJBQTRCLENBQUM7UUFFdkQsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJO2lCQUM5RCxDQUFDLENBQUM7WUFDSCxDQUFDO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFBQSxDQUFDO0lBQ0ssWUFBWSxDQUNYLE9BQWtCO1FBR3RCLE1BQU0sSUFBSSxHQUFHLElBQXdDLENBQUM7UUFDbEQsZUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0MsTUFBTSxpQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQztRQUVsRCxPQUFPO1lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUN0QixNQUFvQyxFQUNwQyxPQUE0QixFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRXBELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEVBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssRUFBRTtvQkFDL0IsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFDRCw0QkFBNEIsQ0FDeEIsTUFBd0IsRUFDeEIsT0FBb0MsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUU1RCxPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNGLENBQUM7WUFDRCxLQUFLLENBQUMsZ0JBQWdCLENBQ2xCLE1BQW9DO2dCQUVwQyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUMzRCxDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFDRCxLQUFLLENBQUMsU0FBUyxDQUNYLFdBQThCLEVBQUUsRUFDaEMsWUFBeUI7Z0JBR3pCLDRCQUFZLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUM3SCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDN0QsNEJBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzFFLE9BQU8sVUFBVSxDQUFDLHVCQUF1QixDQUMzQyxhQUFhLENBQUMsQ0FBQztZQUNqQixDQUFDO1lBQ0QsNEJBQTRCO2dCQUN4QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU87aUJBQ2pFLENBQUMsQ0FBQztZQUNILENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxhQUFhLENBQ1osS0FBZ0IsRUFDaEIsR0FBYztRQUdsQixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ2xELGVBQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25DLGVBQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLE1BQU0saUJBQWlCLEdBQUcsZ0NBQWdDLENBQUM7UUFFM0QsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLO29CQUNoRSxHQUFHO2lCQUNGLENBQUMsQ0FBQztZQUNILENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxZQUFZLENBQ1gsT0FBa0I7UUFHdEIsTUFBTSxJQUFJLEdBQUcsSUFBd0MsQ0FBQztRQUNsRCxlQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQyxNQUFNLGlCQUFpQixHQUFHLHVCQUF1QixDQUFDO1FBRWxELE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTztpQkFDakUsQ0FBQyxDQUFDO1lBQ0gsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLGVBQWU7UUFHbEIsTUFBTSxJQUFJLEdBQUcsSUFBd0MsQ0FBQztRQUN0RCxNQUFNLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO1FBRTlDLE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlELENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxPQUFPLENBQ04sSUFBZTtRQUduQixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ2xELGVBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE1BQU0saUJBQWlCLEdBQUcsa0JBQWtCLENBQUM7UUFFN0MsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJO2lCQUM5RCxDQUFDLENBQUM7WUFDSCxDQUFDO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFBQSxDQUFDO0lBQ0ssUUFBUTtRQUdYLE1BQU0sSUFBSSxHQUFHLElBQXdDLENBQUM7UUFDdEQsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUM7UUFFdkMsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUQsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLEtBQUs7UUFHUixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ3RELE1BQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO1FBRXBDLE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlELENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxXQUFXLENBQ1YsSUFBZSxFQUNmLEtBQWE7UUFHakIsTUFBTSxJQUFJLEdBQUcsSUFBd0MsQ0FBQztRQUNsRCxlQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxlQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxNQUFNLGlCQUFpQixHQUFHLDhCQUE4QixDQUFDO1FBRXpELE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSTtvQkFDL0QsS0FBSyxDQUFDLFdBQVcsRUFBRTtpQkFDbEIsQ0FBQyxDQUFDO1lBQ0gsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLFFBQVEsQ0FDUCxPQUFrQjtRQUd0QixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ2xELGVBQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLE1BQU0saUJBQWlCLEdBQUcsbUJBQW1CLENBQUM7UUFFOUMsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPO2lCQUNqRSxDQUFDLENBQUM7WUFDSCxDQUFDO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFBQSxDQUFDO0lBQ0ssVUFBVTtRQUdiLE1BQU0sSUFBSSxHQUFHLElBQXdDLENBQUM7UUFDdEQsTUFBTSxpQkFBaUIsR0FBRyxjQUFjLENBQUM7UUFFekMsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUQsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLGlCQUFpQjtRQUdwQixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ3RELE1BQU0saUJBQWlCLEdBQUcscUJBQXFCLENBQUM7UUFFaEQsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUQsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLEdBQUcsQ0FDRixJQUFlLEVBQ2YsV0FBc0IsRUFDdEIsV0FBb0I7UUFHeEIsTUFBTSxJQUFJLEdBQUcsSUFBd0MsQ0FBQztRQUNsRCxlQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxlQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMvQyxlQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNqRCxNQUFNLGlCQUFpQixHQUFHLDJCQUEyQixDQUFDO1FBRXRELE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSTtvQkFDL0QsV0FBVztvQkFDWCxXQUFXO2lCQUNWLENBQUMsQ0FBQztZQUNILENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxXQUFXLENBQ1YsU0FBaUI7UUFHckIsTUFBTSxJQUFJLEdBQUcsSUFBd0MsQ0FBQztRQUNsRCxlQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1QyxNQUFNLGlCQUFpQixHQUFHLHNCQUFzQixDQUFDO1FBRWpELE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtpQkFDakYsQ0FBQyxDQUFDO1lBQ0gsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLFVBQVU7UUFHYixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ3RELE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDO1FBRXpDLE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlELENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxLQUFLO1FBR1IsTUFBTSxJQUFJLEdBQUcsSUFBd0MsQ0FBQztRQUN0RCxNQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztRQUVwQyxPQUFPO1lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUN0QixNQUFvQyxFQUNwQyxPQUE0QixFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRXBELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLEVBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssRUFBRTtvQkFDL0IsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQzVDO2dCQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFDRCw0QkFBNEIsQ0FDeEIsTUFBd0IsRUFDeEIsT0FBb0MsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUU1RCxPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNGLENBQUM7WUFDRCxLQUFLLENBQUMsZ0JBQWdCLENBQ2xCLE1BQW9DO2dCQUVwQyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUMzRCxDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFDRCxLQUFLLENBQUMsU0FBUyxDQUNYLFdBQThCLEVBQUUsRUFDaEMsWUFBeUI7Z0JBR3pCLDRCQUFZLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUM3SCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDN0QsNEJBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzFFLE9BQU8sVUFBVSxDQUFDLHVCQUF1QixDQUMzQyxhQUFhLENBQUMsQ0FBQztZQUNqQixDQUFDO1lBQ0QsNEJBQTRCO2dCQUN4QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5RCxDQUFDO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFBQSxDQUFDO0lBQ0ssZUFBZTtRQUdsQixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ3RELE1BQU0saUJBQWlCLEdBQUcsbUJBQW1CLENBQUM7UUFFOUMsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUQsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLGlCQUFpQixDQUNoQixRQUFnQjtRQUdwQixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ2xELGVBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLE1BQU0saUJBQWlCLEdBQUcsNEJBQTRCLENBQUM7UUFFdkQsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO2lCQUNoRixDQUFDLENBQUM7WUFDSCxDQUFDO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFBQSxDQUFDO0lBQ0ssZ0JBQWdCLENBQ2YsZ0JBQTJCO1FBRy9CLE1BQU0sSUFBSSxHQUFHLElBQXdDLENBQUM7UUFDbEQsZUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdELE1BQU0saUJBQWlCLEdBQUcsMkJBQTJCLENBQUM7UUFFdEQsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxnQkFBZ0I7aUJBQzFFLENBQUMsQ0FBQztZQUNILENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFDSyxVQUFVLENBQ1QsSUFBZTtRQUduQixNQUFNLElBQUksR0FBRyxJQUF3QyxDQUFDO1FBQ2xELGVBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE1BQU0saUJBQWlCLEdBQUcscUJBQXFCLENBQUM7UUFFaEQsT0FBTztZQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FDdEIsTUFBb0MsRUFDcEMsT0FBNEIsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUVwRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUM3RCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsNEJBQTRCLENBQ3hCLE1BQXdCLEVBQ3hCLE9BQW9DLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFNUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUNsQixNQUFvQztnQkFFcEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxXQUE4QixFQUFFLEVBQ2hDLFlBQXlCO2dCQUd6Qiw0QkFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDN0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdELDRCQUFZLENBQUMsaUNBQWlDLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDM0MsYUFBYSxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELDRCQUE0QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJO2lCQUM5RCxDQUFDLENBQUM7WUFDSCxDQUFDO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFBQSxDQUFDO0lBQ0ssUUFBUSxDQUNQLE9BQWtCLEVBQ2xCLE9BQWU7UUFHbkIsTUFBTSxJQUFJLEdBQUcsSUFBd0MsQ0FBQztRQUNsRCxlQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2QyxlQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLGlCQUFpQixHQUFHLDJCQUEyQixDQUFDO1FBRXRELE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTztvQkFDbEUsT0FBTyxDQUFDLFdBQVcsRUFBRTtpQkFDcEIsQ0FBQyxDQUFDO1lBQ0gsQ0FBQztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUNLLFFBQVEsQ0FDUCxJQUFlLEVBQ2YsT0FBa0I7UUFHdEIsTUFBTSxJQUFJLEdBQUcsSUFBd0MsQ0FBQztRQUNsRCxlQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxlQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQyxNQUFNLGlCQUFpQixHQUFHLDJCQUEyQixDQUFDO1FBRXRELE9BQU87WUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3RCLE1BQW9DLEVBQ3BDLE9BQTRCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFFcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FDN0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO29CQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELDRCQUE0QixDQUN4QixNQUF3QixFQUN4QixPQUFvQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUU7Z0JBRTVELE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDbEIsTUFBb0M7Z0JBRXBDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQzdELEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELEtBQUssQ0FBQyxTQUFTLENBQ1gsV0FBOEIsRUFBRSxFQUNoQyxZQUF5QjtnQkFHekIsNEJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzdILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCw0QkFBWSxDQUFDLGlDQUFpQyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxVQUFVLENBQUMsdUJBQXVCLENBQzNDLGFBQWEsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7WUFDRCw0QkFBNEI7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSTtvQkFDL0QsT0FBTztpQkFDTixDQUFDLENBQUM7WUFDSCxDQUFDO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFBQSxDQUFDO0lBRUY7Ozs7Ozs7O09BUUc7SUFDSSxTQUFTLENBQ1osU0FBa0MsRUFDbEMsaUJBQXNDLEVBQ3RDLFFBQWlDLEVBQ2pDLFlBQXFCLEtBQUssRUFDMUIsc0JBQStCO1FBRS9CLGVBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDL0UsZUFBTSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLHNCQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNwRyxlQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4QyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQ3pELElBQUksQ0FBQyxPQUFPLEVBQ1osU0FBUyxFQUNULGlCQUFpQixFQUNqQix5QkFBeUIsQ0FBQyxHQUFHLEVBQUUsRUFDL0IsUUFBUSxFQUNSLFNBQVMsRUFDVCxzQkFBc0IsQ0FDekIsQ0FBQztRQUNGLE9BQU8saUJBQWlCLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVcsQ0FBQyxpQkFBeUI7UUFDeEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7T0FFRztJQUNJLGNBQWM7UUFDakIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLFlBQVksQ0FDckIsU0FBa0MsRUFDbEMsVUFBc0IsRUFDdEIsaUJBQXNDO1FBRXRDLGVBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDL0UsZUFBTSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsc0JBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9FLGVBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxzQkFBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDcEcsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUNyRCxJQUFJLENBQUMsT0FBTyxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHlCQUF5QixDQUFDLEdBQUcsRUFBRSxDQUNsQyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7QUExM0VMLDhEQWc1RUM7QUEzNEVhLHNDQUFZLEdBQUcsbUJBQW1CLENBQUM7QUE2NEVqRCxxQ0FBcUM7QUFDckMsNkdBQTZHO0FBQzdHLGlFQUFpRSJ9