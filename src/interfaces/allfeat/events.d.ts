// Generated by dedot cli

import type {
  GenericChainEvents,
  GenericPalletEvent,
  RpcVersion,
} from 'dedot/types';
import type {
  DispatchError,
  AccountId32,
  H256,
  Result,
  Bytes,
  FixedBytes,
} from 'dedot/codecs';
import type {
  FrameSystemDispatchEventInfo,
  MelodieRuntimeRuntimeTask,
  FrameSupportTokensMiscBalanceStatus,
  SpConsensusGrandpaAppPublic,
  PalletImOnlineSr25519AppSr25519Public,
  MelodieRuntimePalletsProxyProxyType,
  PalletMultisigTimepoint,
  PalletSafeModeExitReason,
} from './types';

export interface ChainEvents<Rv extends RpcVersion>
  extends GenericChainEvents<Rv> {
  /**
   * Pallet `System`'s events
   **/
  system: {
    /**
     * An extrinsic completed successfully.
     **/
    ExtrinsicSuccess: GenericPalletEvent<
      Rv,
      'System',
      'ExtrinsicSuccess',
      { dispatchInfo: FrameSystemDispatchEventInfo }
    >;

    /**
     * An extrinsic failed.
     **/
    ExtrinsicFailed: GenericPalletEvent<
      Rv,
      'System',
      'ExtrinsicFailed',
      {
        dispatchError: DispatchError;
        dispatchInfo: FrameSystemDispatchEventInfo;
      }
    >;

    /**
     * `:code` was updated.
     **/
    CodeUpdated: GenericPalletEvent<Rv, 'System', 'CodeUpdated', null>;

    /**
     * A new account was created.
     **/
    NewAccount: GenericPalletEvent<
      Rv,
      'System',
      'NewAccount',
      { account: AccountId32 }
    >;

    /**
     * An account was reaped.
     **/
    KilledAccount: GenericPalletEvent<
      Rv,
      'System',
      'KilledAccount',
      { account: AccountId32 }
    >;

    /**
     * On on-chain remark happened.
     **/
    Remarked: GenericPalletEvent<
      Rv,
      'System',
      'Remarked',
      { sender: AccountId32; hash: H256 }
    >;

    /**
     * A [`Task`] has started executing
     **/
    TaskStarted: GenericPalletEvent<
      Rv,
      'System',
      'TaskStarted',
      { task: MelodieRuntimeRuntimeTask }
    >;

    /**
     * A [`Task`] has finished executing.
     **/
    TaskCompleted: GenericPalletEvent<
      Rv,
      'System',
      'TaskCompleted',
      { task: MelodieRuntimeRuntimeTask }
    >;

    /**
     * A [`Task`] failed during execution.
     **/
    TaskFailed: GenericPalletEvent<
      Rv,
      'System',
      'TaskFailed',
      { task: MelodieRuntimeRuntimeTask; err: DispatchError }
    >;

    /**
     * An upgrade was authorized.
     **/
    UpgradeAuthorized: GenericPalletEvent<
      Rv,
      'System',
      'UpgradeAuthorized',
      { codeHash: H256; checkVersion: boolean }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Utility`'s events
   **/
  utility: {
    /**
     * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     * well as the error.
     **/
    BatchInterrupted: GenericPalletEvent<
      Rv,
      'Utility',
      'BatchInterrupted',
      { index: number; error: DispatchError }
    >;

    /**
     * Batch of dispatches completed fully with no error.
     **/
    BatchCompleted: GenericPalletEvent<Rv, 'Utility', 'BatchCompleted', null>;

    /**
     * Batch of dispatches completed but has errors.
     **/
    BatchCompletedWithErrors: GenericPalletEvent<
      Rv,
      'Utility',
      'BatchCompletedWithErrors',
      null
    >;

    /**
     * A single item within a Batch of dispatches has completed with no error.
     **/
    ItemCompleted: GenericPalletEvent<Rv, 'Utility', 'ItemCompleted', null>;

    /**
     * A single item within a Batch of dispatches has completed with error.
     **/
    ItemFailed: GenericPalletEvent<
      Rv,
      'Utility',
      'ItemFailed',
      { error: DispatchError }
    >;

    /**
     * A call was dispatched.
     **/
    DispatchedAs: GenericPalletEvent<
      Rv,
      'Utility',
      'DispatchedAs',
      { result: Result<[], DispatchError> }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Balances`'s events
   **/
  balances: {
    /**
     * An account was created with some free balance.
     **/
    Endowed: GenericPalletEvent<
      Rv,
      'Balances',
      'Endowed',
      { account: AccountId32; freeBalance: bigint }
    >;

    /**
     * An account was removed whose balance was non-zero but below ExistentialDeposit,
     * resulting in an outright loss.
     **/
    DustLost: GenericPalletEvent<
      Rv,
      'Balances',
      'DustLost',
      { account: AccountId32; amount: bigint }
    >;

    /**
     * Transfer succeeded.
     **/
    Transfer: GenericPalletEvent<
      Rv,
      'Balances',
      'Transfer',
      { from: AccountId32; to: AccountId32; amount: bigint }
    >;

    /**
     * A balance was set by root.
     **/
    BalanceSet: GenericPalletEvent<
      Rv,
      'Balances',
      'BalanceSet',
      { who: AccountId32; free: bigint }
    >;

    /**
     * Some balance was reserved (moved from free to reserved).
     **/
    Reserved: GenericPalletEvent<
      Rv,
      'Balances',
      'Reserved',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some balance was unreserved (moved from reserved to free).
     **/
    Unreserved: GenericPalletEvent<
      Rv,
      'Balances',
      'Unreserved',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some balance was moved from the reserve of the first account to the second account.
     * Final argument indicates the destination balance type.
     **/
    ReserveRepatriated: GenericPalletEvent<
      Rv,
      'Balances',
      'ReserveRepatriated',
      {
        from: AccountId32;
        to: AccountId32;
        amount: bigint;
        destinationStatus: FrameSupportTokensMiscBalanceStatus;
      }
    >;

    /**
     * Some amount was deposited (e.g. for transaction fees).
     **/
    Deposit: GenericPalletEvent<
      Rv,
      'Balances',
      'Deposit',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some amount was withdrawn from the account (e.g. for transaction fees).
     **/
    Withdraw: GenericPalletEvent<
      Rv,
      'Balances',
      'Withdraw',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some amount was removed from the account (e.g. for misbehavior).
     **/
    Slashed: GenericPalletEvent<
      Rv,
      'Balances',
      'Slashed',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some amount was minted into an account.
     **/
    Minted: GenericPalletEvent<
      Rv,
      'Balances',
      'Minted',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some amount was burned from an account.
     **/
    Burned: GenericPalletEvent<
      Rv,
      'Balances',
      'Burned',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some amount was suspended from an account (it can be restored later).
     **/
    Suspended: GenericPalletEvent<
      Rv,
      'Balances',
      'Suspended',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some amount was restored into an account.
     **/
    Restored: GenericPalletEvent<
      Rv,
      'Balances',
      'Restored',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * An account was upgraded.
     **/
    Upgraded: GenericPalletEvent<
      Rv,
      'Balances',
      'Upgraded',
      { who: AccountId32 }
    >;

    /**
     * Total issuance was increased by `amount`, creating a credit to be balanced.
     **/
    Issued: GenericPalletEvent<Rv, 'Balances', 'Issued', { amount: bigint }>;

    /**
     * Total issuance was decreased by `amount`, creating a debt to be balanced.
     **/
    Rescinded: GenericPalletEvent<
      Rv,
      'Balances',
      'Rescinded',
      { amount: bigint }
    >;

    /**
     * Some balance was locked.
     **/
    Locked: GenericPalletEvent<
      Rv,
      'Balances',
      'Locked',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some balance was unlocked.
     **/
    Unlocked: GenericPalletEvent<
      Rv,
      'Balances',
      'Unlocked',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some balance was frozen.
     **/
    Frozen: GenericPalletEvent<
      Rv,
      'Balances',
      'Frozen',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * Some balance was thawed.
     **/
    Thawed: GenericPalletEvent<
      Rv,
      'Balances',
      'Thawed',
      { who: AccountId32; amount: bigint }
    >;

    /**
     * The `TotalIssuance` was forcefully changed.
     **/
    TotalIssuanceForced: GenericPalletEvent<
      Rv,
      'Balances',
      'TotalIssuanceForced',
      { old: bigint; new: bigint }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `TransactionPayment`'s events
   **/
  transactionPayment: {
    /**
     * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
     * has been paid by `who`.
     **/
    TransactionFeePaid: GenericPalletEvent<
      Rv,
      'TransactionPayment',
      'TransactionFeePaid',
      { who: AccountId32; actualFee: bigint; tip: bigint }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `ValidatorSet`'s events
   **/
  validatorSet: {
    /**
     * New validator addition initiated. Effective in ~2 sessions.
     **/
    ValidatorAdditionInitiated: GenericPalletEvent<
      Rv,
      'ValidatorSet',
      'ValidatorAdditionInitiated',
      AccountId32
    >;

    /**
     * Validator removal initiated. Effective in ~2 sessions.
     **/
    ValidatorRemovalInitiated: GenericPalletEvent<
      Rv,
      'ValidatorSet',
      'ValidatorRemovalInitiated',
      AccountId32
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Session`'s events
   **/
  session: {
    /**
     * New session has happened. Note that the argument is the session index, not the
     * block number as the type might suggest.
     **/
    NewSession: GenericPalletEvent<
      Rv,
      'Session',
      'NewSession',
      { sessionIndex: number }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Grandpa`'s events
   **/
  grandpa: {
    /**
     * New authority set has been applied.
     **/
    NewAuthorities: GenericPalletEvent<
      Rv,
      'Grandpa',
      'NewAuthorities',
      { authoritySet: Array<[SpConsensusGrandpaAppPublic, bigint]> }
    >;

    /**
     * Current authority set has been paused.
     **/
    Paused: GenericPalletEvent<Rv, 'Grandpa', 'Paused', null>;

    /**
     * Current authority set has been resumed.
     **/
    Resumed: GenericPalletEvent<Rv, 'Grandpa', 'Resumed', null>;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Sudo`'s events
   **/
  sudo: {
    /**
     * A sudo call just took place.
     **/
    Sudid: GenericPalletEvent<
      Rv,
      'Sudo',
      'Sudid',
      {
        /**
         * The result of the call made by the sudo user.
         **/
        sudoResult: Result<[], DispatchError>;
      }
    >;

    /**
     * The sudo key has been updated.
     **/
    KeyChanged: GenericPalletEvent<
      Rv,
      'Sudo',
      'KeyChanged',
      {
        /**
         * The old sudo key (if one was previously set).
         **/
        old?: AccountId32 | undefined;

        /**
         * The new sudo key (if one was set).
         **/
        new: AccountId32;
      }
    >;

    /**
     * The key was permanently removed.
     **/
    KeyRemoved: GenericPalletEvent<Rv, 'Sudo', 'KeyRemoved', null>;

    /**
     * A [sudo_as](Pallet::sudo_as) call just took place.
     **/
    SudoAsDone: GenericPalletEvent<
      Rv,
      'Sudo',
      'SudoAsDone',
      {
        /**
         * The result of the call made by the sudo user.
         **/
        sudoResult: Result<[], DispatchError>;
      }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `ImOnline`'s events
   **/
  imOnline: {
    /**
     * A new heartbeat was received from `AuthorityId`.
     **/
    HeartbeatReceived: GenericPalletEvent<
      Rv,
      'ImOnline',
      'HeartbeatReceived',
      { authorityId: PalletImOnlineSr25519AppSr25519Public }
    >;

    /**
     * At the end of the session, no offence was committed.
     **/
    AllGood: GenericPalletEvent<Rv, 'ImOnline', 'AllGood', null>;

    /**
     * At the end of the session, at least one validator was found to be offline.
     **/
    SomeOffline: GenericPalletEvent<
      Rv,
      'ImOnline',
      'SomeOffline',
      { offline: Array<[AccountId32, AccountId32]> }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Identity`'s events
   **/
  identity: {
    /**
     * A name was set or reset (which will remove all judgements).
     **/
    IdentitySet: GenericPalletEvent<
      Rv,
      'Identity',
      'IdentitySet',
      { who: AccountId32 }
    >;

    /**
     * A name was cleared, and the given balance returned.
     **/
    IdentityCleared: GenericPalletEvent<
      Rv,
      'Identity',
      'IdentityCleared',
      { who: AccountId32; deposit: bigint }
    >;

    /**
     * A name was removed and the given balance slashed.
     **/
    IdentityKilled: GenericPalletEvent<
      Rv,
      'Identity',
      'IdentityKilled',
      { who: AccountId32; deposit: bigint }
    >;

    /**
     * A judgement was asked from a registrar.
     **/
    JudgementRequested: GenericPalletEvent<
      Rv,
      'Identity',
      'JudgementRequested',
      { who: AccountId32; registrarIndex: number }
    >;

    /**
     * A judgement request was retracted.
     **/
    JudgementUnrequested: GenericPalletEvent<
      Rv,
      'Identity',
      'JudgementUnrequested',
      { who: AccountId32; registrarIndex: number }
    >;

    /**
     * A judgement was given by a registrar.
     **/
    JudgementGiven: GenericPalletEvent<
      Rv,
      'Identity',
      'JudgementGiven',
      { target: AccountId32; registrarIndex: number }
    >;

    /**
     * A registrar was added.
     **/
    RegistrarAdded: GenericPalletEvent<
      Rv,
      'Identity',
      'RegistrarAdded',
      { registrarIndex: number }
    >;

    /**
     * A sub-identity was added to an identity and the deposit paid.
     **/
    SubIdentityAdded: GenericPalletEvent<
      Rv,
      'Identity',
      'SubIdentityAdded',
      { sub: AccountId32; main: AccountId32; deposit: bigint }
    >;

    /**
     * An account's sub-identities were set (in bulk).
     **/
    SubIdentitiesSet: GenericPalletEvent<
      Rv,
      'Identity',
      'SubIdentitiesSet',
      { main: AccountId32; numberOfSubs: number; newDeposit: bigint }
    >;

    /**
     * A given sub-account's associated name was changed by its super-identity.
     **/
    SubIdentityRenamed: GenericPalletEvent<
      Rv,
      'Identity',
      'SubIdentityRenamed',
      { sub: AccountId32; main: AccountId32 }
    >;

    /**
     * A sub-identity was removed from an identity and the deposit freed.
     **/
    SubIdentityRemoved: GenericPalletEvent<
      Rv,
      'Identity',
      'SubIdentityRemoved',
      { sub: AccountId32; main: AccountId32; deposit: bigint }
    >;

    /**
     * A sub-identity was cleared, and the given deposit repatriated from the
     * main identity account to the sub-identity account.
     **/
    SubIdentityRevoked: GenericPalletEvent<
      Rv,
      'Identity',
      'SubIdentityRevoked',
      { sub: AccountId32; main: AccountId32; deposit: bigint }
    >;

    /**
     * A username authority was added.
     **/
    AuthorityAdded: GenericPalletEvent<
      Rv,
      'Identity',
      'AuthorityAdded',
      { authority: AccountId32 }
    >;

    /**
     * A username authority was removed.
     **/
    AuthorityRemoved: GenericPalletEvent<
      Rv,
      'Identity',
      'AuthorityRemoved',
      { authority: AccountId32 }
    >;

    /**
     * A username was set for `who`.
     **/
    UsernameSet: GenericPalletEvent<
      Rv,
      'Identity',
      'UsernameSet',
      { who: AccountId32; username: Bytes }
    >;

    /**
     * A username was queued, but `who` must accept it prior to `expiration`.
     **/
    UsernameQueued: GenericPalletEvent<
      Rv,
      'Identity',
      'UsernameQueued',
      { who: AccountId32; username: Bytes; expiration: number }
    >;

    /**
     * A queued username passed its expiration without being claimed and was removed.
     **/
    PreapprovalExpired: GenericPalletEvent<
      Rv,
      'Identity',
      'PreapprovalExpired',
      { whose: AccountId32 }
    >;

    /**
     * A username was set as a primary and can be looked up from `who`.
     **/
    PrimaryUsernameSet: GenericPalletEvent<
      Rv,
      'Identity',
      'PrimaryUsernameSet',
      { who: AccountId32; username: Bytes }
    >;

    /**
     * A dangling username (as in, a username corresponding to an account that has removed its
     * identity) has been removed.
     **/
    DanglingUsernameRemoved: GenericPalletEvent<
      Rv,
      'Identity',
      'DanglingUsernameRemoved',
      { who: AccountId32; username: Bytes }
    >;

    /**
     * A username has been unbound.
     **/
    UsernameUnbound: GenericPalletEvent<
      Rv,
      'Identity',
      'UsernameUnbound',
      { username: Bytes }
    >;

    /**
     * A username has been removed.
     **/
    UsernameRemoved: GenericPalletEvent<
      Rv,
      'Identity',
      'UsernameRemoved',
      { username: Bytes }
    >;

    /**
     * A username has been killed.
     **/
    UsernameKilled: GenericPalletEvent<
      Rv,
      'Identity',
      'UsernameKilled',
      { username: Bytes }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Scheduler`'s events
   **/
  scheduler: {
    /**
     * Scheduled some task.
     **/
    Scheduled: GenericPalletEvent<
      Rv,
      'Scheduler',
      'Scheduled',
      { when: number; index: number }
    >;

    /**
     * Canceled some task.
     **/
    Canceled: GenericPalletEvent<
      Rv,
      'Scheduler',
      'Canceled',
      { when: number; index: number }
    >;

    /**
     * Dispatched some task.
     **/
    Dispatched: GenericPalletEvent<
      Rv,
      'Scheduler',
      'Dispatched',
      {
        task: [number, number];
        id?: FixedBytes<32> | undefined;
        result: Result<[], DispatchError>;
      }
    >;

    /**
     * Set a retry configuration for some task.
     **/
    RetrySet: GenericPalletEvent<
      Rv,
      'Scheduler',
      'RetrySet',
      {
        task: [number, number];
        id?: FixedBytes<32> | undefined;
        period: number;
        retries: number;
      }
    >;

    /**
     * Cancel a retry configuration for some task.
     **/
    RetryCancelled: GenericPalletEvent<
      Rv,
      'Scheduler',
      'RetryCancelled',
      { task: [number, number]; id?: FixedBytes<32> | undefined }
    >;

    /**
     * The call for the provided hash was not found so the task has been aborted.
     **/
    CallUnavailable: GenericPalletEvent<
      Rv,
      'Scheduler',
      'CallUnavailable',
      { task: [number, number]; id?: FixedBytes<32> | undefined }
    >;

    /**
     * The given task was unable to be renewed since the agenda is full at that block.
     **/
    PeriodicFailed: GenericPalletEvent<
      Rv,
      'Scheduler',
      'PeriodicFailed',
      { task: [number, number]; id?: FixedBytes<32> | undefined }
    >;

    /**
     * The given task was unable to be retried since the agenda is full at that block or there
     * was not enough weight to reschedule it.
     **/
    RetryFailed: GenericPalletEvent<
      Rv,
      'Scheduler',
      'RetryFailed',
      { task: [number, number]; id?: FixedBytes<32> | undefined }
    >;

    /**
     * The given task can never be executed since it is overweight.
     **/
    PermanentlyOverweight: GenericPalletEvent<
      Rv,
      'Scheduler',
      'PermanentlyOverweight',
      { task: [number, number]; id?: FixedBytes<32> | undefined }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Preimage`'s events
   **/
  preimage: {
    /**
     * A preimage has been noted.
     **/
    Noted: GenericPalletEvent<Rv, 'Preimage', 'Noted', { hash: H256 }>;

    /**
     * A preimage has been requested.
     **/
    Requested: GenericPalletEvent<Rv, 'Preimage', 'Requested', { hash: H256 }>;

    /**
     * A preimage has ben cleared.
     **/
    Cleared: GenericPalletEvent<Rv, 'Preimage', 'Cleared', { hash: H256 }>;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Proxy`'s events
   **/
  proxy: {
    /**
     * A proxy was executed correctly, with the given.
     **/
    ProxyExecuted: GenericPalletEvent<
      Rv,
      'Proxy',
      'ProxyExecuted',
      { result: Result<[], DispatchError> }
    >;

    /**
     * A pure account has been created by new proxy with given
     * disambiguation index and proxy type.
     **/
    PureCreated: GenericPalletEvent<
      Rv,
      'Proxy',
      'PureCreated',
      {
        pure: AccountId32;
        who: AccountId32;
        proxyType: MelodieRuntimePalletsProxyProxyType;
        disambiguationIndex: number;
      }
    >;

    /**
     * An announcement was placed to make a call in the future.
     **/
    Announced: GenericPalletEvent<
      Rv,
      'Proxy',
      'Announced',
      { real: AccountId32; proxy: AccountId32; callHash: H256 }
    >;

    /**
     * A proxy was added.
     **/
    ProxyAdded: GenericPalletEvent<
      Rv,
      'Proxy',
      'ProxyAdded',
      {
        delegator: AccountId32;
        delegatee: AccountId32;
        proxyType: MelodieRuntimePalletsProxyProxyType;
        delay: number;
      }
    >;

    /**
     * A proxy was removed.
     **/
    ProxyRemoved: GenericPalletEvent<
      Rv,
      'Proxy',
      'ProxyRemoved',
      {
        delegator: AccountId32;
        delegatee: AccountId32;
        proxyType: MelodieRuntimePalletsProxyProxyType;
        delay: number;
      }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Multisig`'s events
   **/
  multisig: {
    /**
     * A new multisig operation has begun.
     **/
    NewMultisig: GenericPalletEvent<
      Rv,
      'Multisig',
      'NewMultisig',
      {
        approving: AccountId32;
        multisig: AccountId32;
        callHash: FixedBytes<32>;
      }
    >;

    /**
     * A multisig operation has been approved by someone.
     **/
    MultisigApproval: GenericPalletEvent<
      Rv,
      'Multisig',
      'MultisigApproval',
      {
        approving: AccountId32;
        timepoint: PalletMultisigTimepoint;
        multisig: AccountId32;
        callHash: FixedBytes<32>;
      }
    >;

    /**
     * A multisig operation has been executed.
     **/
    MultisigExecuted: GenericPalletEvent<
      Rv,
      'Multisig',
      'MultisigExecuted',
      {
        approving: AccountId32;
        timepoint: PalletMultisigTimepoint;
        multisig: AccountId32;
        callHash: FixedBytes<32>;
        result: Result<[], DispatchError>;
      }
    >;

    /**
     * A multisig operation has been cancelled.
     **/
    MultisigCancelled: GenericPalletEvent<
      Rv,
      'Multisig',
      'MultisigCancelled',
      {
        cancelling: AccountId32;
        timepoint: PalletMultisigTimepoint;
        multisig: AccountId32;
        callHash: FixedBytes<32>;
      }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `SafeMode`'s events
   **/
  safeMode: {
    /**
     * The safe-mode was entered until inclusively this block.
     **/
    Entered: GenericPalletEvent<Rv, 'SafeMode', 'Entered', { until: number }>;

    /**
     * The safe-mode was extended until inclusively this block.
     **/
    Extended: GenericPalletEvent<Rv, 'SafeMode', 'Extended', { until: number }>;

    /**
     * Exited the safe-mode for a specific reason.
     **/
    Exited: GenericPalletEvent<
      Rv,
      'SafeMode',
      'Exited',
      { reason: PalletSafeModeExitReason }
    >;

    /**
     * An account reserved funds for either entering or extending the safe-mode.
     **/
    DepositPlaced: GenericPalletEvent<
      Rv,
      'SafeMode',
      'DepositPlaced',
      { account: AccountId32; amount: bigint }
    >;

    /**
     * An account had a reserve released that was reserved.
     **/
    DepositReleased: GenericPalletEvent<
      Rv,
      'SafeMode',
      'DepositReleased',
      { account: AccountId32; amount: bigint }
    >;

    /**
     * An account had reserve slashed that was reserved.
     **/
    DepositSlashed: GenericPalletEvent<
      Rv,
      'SafeMode',
      'DepositSlashed',
      { account: AccountId32; amount: bigint }
    >;

    /**
     * Could not hold funds for entering or extending the safe-mode.
     *
     * This error comes from the underlying `Currency`.
     **/
    CannotDeposit: GenericPalletEvent<Rv, 'SafeMode', 'CannotDeposit', null>;

    /**
     * Could not release funds for entering or extending the safe-mode.
     *
     * This error comes from the underlying `Currency`.
     **/
    CannotRelease: GenericPalletEvent<Rv, 'SafeMode', 'CannotRelease', null>;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `Stakeholders`'s events
   **/
  stakeholders: {
    MiddsRegistered: GenericPalletEvent<
      Rv,
      'Stakeholders',
      'MIDDSRegistered',
      { provider: AccountId32; hashId: H256; dataColateral: bigint }
    >;
    MiddsUpdated: GenericPalletEvent<
      Rv,
      'Stakeholders',
      'MIDDSUpdated',
      { hashId: H256 }
    >;
    MiddsUnregistered: GenericPalletEvent<
      Rv,
      'Stakeholders',
      'MIDDSUnregistered',
      { hashId: H256 }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
  /**
   * Pallet `MusicalWorks`'s events
   **/
  musicalWorks: {
    MiddsRegistered: GenericPalletEvent<
      Rv,
      'MusicalWorks',
      'MIDDSRegistered',
      { provider: AccountId32; hashId: H256; dataColateral: bigint }
    >;
    MiddsUpdated: GenericPalletEvent<
      Rv,
      'MusicalWorks',
      'MIDDSUpdated',
      { hashId: H256 }
    >;
    MiddsUnregistered: GenericPalletEvent<
      Rv,
      'MusicalWorks',
      'MIDDSUnregistered',
      { hashId: H256 }
    >;

    /**
     * Generic pallet event
     **/
    [prop: string]: GenericPalletEvent<Rv>;
  };
}
