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
exports.ERC20Contract = exports.ERC20Events = void 0;
// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma enum-naming
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
const base_contract_1 = require("@0x/base-contract");
const json_schemas_1 = require("@0x/json-schemas");
const utils_1 = require("@0x/utils");
const web3_wrapper_1 = require("@0x/web3-wrapper");
const assert_1 = require("@0x/assert");
const ethers = __importStar(require("ethers"));
var ERC20Events;
(function (ERC20Events) {
    ERC20Events["Approval"] = "Approval";
    ERC20Events["Transfer"] = "Transfer";
})(ERC20Events = exports.ERC20Events || (exports.ERC20Events = {}));
/* istanbul ignore next */
// tslint:disable:array-type
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
class ERC20Contract extends base_contract_1.BaseContract {
    constructor(address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode = ERC20Contract.deployedBytecode) {
        super('ERC20', ERC20Contract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode);
        this._methodABIIndex = {};
        utils_1.classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
        this._subscriptionManager = new base_contract_1.SubscriptionManager(ERC20Contract.ABI(), this._web3Wrapper);
        ERC20Contract.ABI().forEach((item, index) => {
            if (item.type === 'function') {
                const methodAbi = item;
                this._methodABIIndex[methodAbi.name] = index;
            }
        });
    }
    static async deployFrom0xArtifactAsync(artifact, supportedProvider, txDefaults, logDecodeDependencies) {
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
        return ERC20Contract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly);
    }
    static async deployWithLibrariesFrom0xArtifactAsync(artifact, libraryArtifacts, supportedProvider, txDefaults, logDecodeDependencies) {
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
        const libraryAddresses = await ERC20Contract._deployLibrariesAsync(artifact, libraryArtifacts, new web3_wrapper_1.Web3Wrapper(provider), txDefaults);
        const bytecode = base_contract_1.linkLibrariesInBytecode(artifact, libraryAddresses);
        return ERC20Contract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly);
    }
    static async deployAsync(bytecode, abi, supportedProvider, txDefaults, logDecodeDependencies) {
        assert_1.assert.isHexString('bytecode', bytecode);
        assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema, [
            json_schemas_1.schemas.addressSchema,
            json_schemas_1.schemas.numberSchema,
            json_schemas_1.schemas.jsNumber,
        ]);
        const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = base_contract_1.BaseContract._lookupConstructorAbi(abi);
        [] = base_contract_1.BaseContract._formatABIDataItemList(constructorAbi.inputs, [], base_contract_1.BaseContract._bigNumberToString);
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, []);
        const web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
        const txDataWithDefaults = await base_contract_1.BaseContract._applyDefaultsToContractTxDataAsync({
            data: txData,
            ...txDefaults,
        }, web3Wrapper.estimateGasAsync.bind(web3Wrapper));
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        utils_1.logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        utils_1.logUtils.log(`ERC20 successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new ERC20Contract(txReceipt.contractAddress, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }
    /**
     * @returns      The contract ABI
     */
    static ABI() {
        const abi = [
            {
                constant: true,
                inputs: [],
                name: 'name',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: '_spender',
                        type: 'address',
                    },
                    {
                        name: '_value',
                        type: 'uint256',
                    },
                ],
                name: 'approve',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'totalSupply',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: '_from',
                        type: 'address',
                    },
                    {
                        name: '_to',
                        type: 'address',
                    },
                    {
                        name: '_value',
                        type: 'uint256',
                    },
                ],
                name: 'transferFrom',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'decimals',
                outputs: [
                    {
                        name: '',
                        type: 'uint8',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: '_owner',
                        type: 'address',
                    },
                ],
                name: 'balanceOf',
                outputs: [
                    {
                        name: 'balance',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'symbol',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: '_to',
                        type: 'address',
                    },
                    {
                        name: '_value',
                        type: 'uint256',
                    },
                ],
                name: 'transfer',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: '_owner',
                        type: 'address',
                    },
                    {
                        name: '_spender',
                        type: 'address',
                    },
                ],
                name: 'allowance',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                outputs: [],
                payable: true,
                stateMutability: 'payable',
                type: 'fallback',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'owner',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'spender',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Approval',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'from',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'to',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Transfer',
                outputs: [],
                type: 'event',
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
                    await ERC20Contract._deployLibrariesAsync(libraryArtifact, libraryArtifacts, web3Wrapper, txDefaults, libraryAddresses);
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
        const methodAbi = ERC20Contract.ABI()[index]; // tslint:disable-line:no-unnecessary-type-assertion
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
    name() {
        const self = this;
        const functionSignature = 'name()';
        return {
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
    approve(_spender, _value) {
        const self = this;
        assert_1.assert.isString('_spender', _spender);
        assert_1.assert.isBigNumber('_value', _value);
        const functionSignature = 'approve(address,uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_spender.toLowerCase(),
                    _value
                ]);
            },
        };
    }
    ;
    totalSupply() {
        const self = this;
        const functionSignature = 'totalSupply()';
        return {
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
    transferFrom(_from, _to, _value) {
        const self = this;
        assert_1.assert.isString('_from', _from);
        assert_1.assert.isString('_to', _to);
        assert_1.assert.isBigNumber('_value', _value);
        const functionSignature = 'transferFrom(address,address,uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_from.toLowerCase(),
                    _to.toLowerCase(),
                    _value
                ]);
            },
        };
    }
    ;
    decimals() {
        const self = this;
        const functionSignature = 'decimals()';
        return {
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
    balanceOf(_owner) {
        const self = this;
        assert_1.assert.isString('_owner', _owner);
        const functionSignature = 'balanceOf(address)';
        return {
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [_owner.toLowerCase()
                ]);
            },
        };
    }
    ;
    symbol() {
        const self = this;
        const functionSignature = 'symbol()';
        return {
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
    transfer(_to, _value) {
        const self = this;
        assert_1.assert.isString('_to', _to);
        assert_1.assert.isBigNumber('_value', _value);
        const functionSignature = 'transfer(address,uint256)';
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
                return self._strictEncodeArguments(functionSignature, [_to.toLowerCase(),
                    _value
                ]);
            },
        };
    }
    ;
    allowance(_owner, _spender) {
        const self = this;
        assert_1.assert.isString('_owner', _owner);
        assert_1.assert.isString('_spender', _spender);
        const functionSignature = 'allowance(address,address)';
        return {
            async callAsync(callData = {}, defaultBlock) {
                base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                const rawCallResult = await self._performCallAsync({ data: this.getABIEncodedTransactionData(), ...callData }, defaultBlock);
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue(rawCallResult);
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [_owner.toLowerCase(),
                    _spender.toLowerCase()
                ]);
            },
        };
    }
    ;
    /**
     * Subscribe to an event type emitted by the ERC20 contract.
     * @param eventName The ERC20 contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    subscribe(eventName, indexFilterValues, callback, isVerbose = false, blockPollingIntervalMs) {
        assert_1.assert.doesBelongToStringEnum('eventName', eventName, ERC20Events);
        assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
        assert_1.assert.isFunction('callback', callback);
        const subscriptionToken = this._subscriptionManager.subscribe(this.address, eventName, indexFilterValues, ERC20Contract.ABI(), callback, isVerbose, blockPollingIntervalMs);
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
     * @param eventName The ERC20 contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    async getLogsAsync(eventName, blockRange, indexFilterValues) {
        assert_1.assert.doesBelongToStringEnum('eventName', eventName, ERC20Events);
        assert_1.assert.doesConformToSchema('blockRange', blockRange, json_schemas_1.schemas.blockRangeSchema);
        assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
        const logs = await this._subscriptionManager.getLogsAsync(this.address, eventName, blockRange, indexFilterValues, ERC20Contract.ABI());
        return logs;
    }
}
exports.ERC20Contract = ERC20Contract;
ERC20Contract.contractName = 'ERC20';
// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjMjAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcmMyMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkZBQTZGO0FBQzdGLHFFQUFxRTtBQUNyRSxvQ0FBb0M7QUFDcEMscURBUzJCO0FBQzNCLG1EQUEyQztBQWdCM0MscUNBQXFGO0FBRXJGLG1EQUErQztBQUMvQyx1Q0FBb0M7QUFDcEMsK0NBQWlDO0FBUWpDLElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNuQixvQ0FBcUIsQ0FBQTtJQUNyQixvQ0FBcUIsQ0FBQTtBQUN6QixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7QUFlRCwwQkFBMEI7QUFDMUIsNEJBQTRCO0FBQzVCLDJDQUEyQztBQUMzQyxzQ0FBc0M7QUFDdEMsTUFBYSxhQUFjLFNBQVEsNEJBQVk7SUE2ekIzQyxZQUNJLE9BQWUsRUFDZixpQkFBb0MsRUFDcEMsVUFBNEIsRUFDNUIscUJBQStELEVBQy9ELG1CQUF1QyxhQUFhLENBQUMsZ0JBQWdCO1FBRXJFLEtBQUssQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQTl6QnhHLG9CQUFlLEdBQStCLEVBQUUsQ0FBQztRQSt6QjlELGtCQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLGdDQUFnQyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLG1DQUFtQixDQUN2QyxhQUFhLENBQUMsR0FBRyxFQUFFLEVBQ25CLElBQUksQ0FBQyxZQUFZLENBQ3BCLENBQUM7UUFDVixhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFB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