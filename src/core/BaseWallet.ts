import { WalletConfig } from './types';

export abstract class BaseWallet {
  protected config: WalletConfig;
  protected publicKey: string | null = null;
  protected connected: boolean = false;

  constructor(config: WalletConfig) {
    this.config = config;
  }

  /**
   * Connect to the wallet
   */
  abstract connect(): Promise<void>;

  /**
   * Disconnect from the wallet
   */
  abstract disconnect(): Promise<void>;

  /**
   * Check if wallet is available (installed)
   */
  abstract isAvailable(): boolean;

  /**
   * Get wallet name
   */
  abstract getName(): string;

  /**
   * Get wallet icon URL
   */
  abstract getIcon(): string;

  /**
   * Sign a transaction
   */
  abstract signTransaction(xdr: string): Promise<string>;

  /**
   * Sign auth entry (Soroban)
   */
  abstract signAuthEntry(entry: string): Promise<string>;

  /**
   * Get connected public key
   */
  getPublicKey(): string | null {
    return this.publicKey;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Get network
   */
  getNetwork(): string {
    return this.config.network;
  }
}
