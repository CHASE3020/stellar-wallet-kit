export type NetworkType = 'mainnet' | 'testnet';

export enum WalletType {
  FREIGHTER = 'freighter',
  ALBEDO = 'albedo',
  RABET = 'rabet',
  XBULL = 'xbull',
  WALLETCONNECT = 'walletconnect',
}

export interface WalletKitConfig {
  network: NetworkType;
  projectName: string;
  projectIcon?: string;
  projectUrl?: string;
  autoConnect?: boolean;
  autoApprove?: boolean;
  walletConnectProjectId?: string;
  horizonUrl?: string;
  sorobanRpcUrl?: string;
}

export interface WalletInfo {
  type: WalletType;
  name: string;
  icon: string;
  available: boolean;
}

export interface WalletConfig {
  network: NetworkType;
  networkPassphrase: string;
}

export interface SubmitResult {
  hash: string;
  ledger: number;
  success: boolean;
  error?: string;
}

export type WalletEvent =
  | 'connected'
  | 'disconnected'
  | 'accountChanged'
  | 'networkChanged'
  | 'transactionSuccess'
  | 'transactionError';

export interface WalletError extends Error {
  code: string;
  details?: any;
}
