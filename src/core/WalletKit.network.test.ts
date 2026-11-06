import { describe, it, expect, afterEach, vi } from 'vitest';
import { WalletKit } from './WalletKit';

const MAINNET_HORIZON = 'https://horizon.stellar.org';
const TESTNET_HORIZON = 'https://horizon-testnet.stellar.org';
const MAINNET_SOROBAN = 'https://soroban-rpc.stellar.org';
const TESTNET_SOROBAN = 'https://soroban-testnet.stellar.org';

describe('WalletKit - endpoint selection across network switches', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses custom Horizon and Soroban URLs on the initially configured network', () => {
    const kit = new WalletKit({
      network: 'testnet',
      projectName: 'Test App',
      autoConnect: false,
      horizonUrl: 'https://custom-horizon.example.com',
      sorobanRpcUrl: 'https://custom-soroban.example.com',
    });

    expect(kit.getNetwork()).toBe('testnet');
    expect(kit.getHorizonUrl()).toBe('https://custom-horizon.example.com');
    expect(kit.getSorobanRpcUrl()).toBe('https://custom-soroban.example.com');
  });

  it('uses target-network defaults when switching away and restores custom URLs when switching back', async () => {
    const kit = new WalletKit({
      network: 'testnet',
      projectName: 'Test App',
      autoConnect: false,
      horizonUrl: 'https://custom-horizon.example.com',
      sorobanRpcUrl: 'https://custom-soroban.example.com',
    });

    await kit.switchNetwork('mainnet');

    expect(kit.getNetwork()).toBe('mainnet');
    expect(kit.getHorizonUrl()).toBe(MAINNET_HORIZON);
    expect(kit.getSorobanRpcUrl()).toBe(MAINNET_SOROBAN);

    await kit.switchNetwork('testnet');

    expect(kit.getNetwork()).toBe('testnet');
    expect(kit.getHorizonUrl()).toBe('https://custom-horizon.example.com');
    expect(kit.getSorobanRpcUrl()).toBe('https://custom-soroban.example.com');
  });

  it('keeps overrides bound to the initial network when created on mainnet', async () => {
    const kit = new WalletKit({
      network: 'mainnet',
      projectName: 'Test App',
      autoConnect: false,
      horizonUrl: 'https://custom-mainnet-horizon.example.com',
      sorobanRpcUrl: 'https://custom-mainnet-soroban.example.com',
    });

    expect(kit.getHorizonUrl()).toBe('https://custom-mainnet-horizon.example.com');
    expect(kit.getSorobanRpcUrl()).toBe('https://custom-mainnet-soroban.example.com');

    await kit.switchNetwork('testnet');

    expect(kit.getHorizonUrl()).toBe(TESTNET_HORIZON);
    expect(kit.getSorobanRpcUrl()).toBe(TESTNET_SOROBAN);

    await kit.switchNetwork('mainnet');

    expect(kit.getHorizonUrl()).toBe('https://custom-mainnet-horizon.example.com');
    expect(kit.getSorobanRpcUrl()).toBe('https://custom-mainnet-soroban.example.com');
  });

  it('uses mainnet and testnet defaults with no overrides', async () => {
    const kit = new WalletKit({
      network: 'mainnet',
      projectName: 'Test App',
      autoConnect: false,
    });

    expect(kit.getHorizonUrl()).toBe(MAINNET_HORIZON);
    expect(kit.getSorobanRpcUrl()).toBe(MAINNET_SOROBAN);

    await kit.switchNetwork('testnet');
    expect(kit.getHorizonUrl()).toBe(TESTNET_HORIZON);
    expect(kit.getSorobanRpcUrl()).toBe(TESTNET_SOROBAN);

    await kit.switchNetwork('mainnet');
    expect(kit.getHorizonUrl()).toBe(MAINNET_HORIZON);
    expect(kit.getSorobanRpcUrl()).toBe(MAINNET_SOROBAN);
  });

  it('resolves each override independently', async () => {
    const kit = new WalletKit({
      network: 'testnet',
      projectName: 'Test App',
      autoConnect: false,
      horizonUrl: 'https://custom-horizon.example.com',
    });

    expect(kit.getHorizonUrl()).toBe('https://custom-horizon.example.com');
    expect(kit.getSorobanRpcUrl()).toBe(TESTNET_SOROBAN);

    await kit.switchNetwork('mainnet');
    expect(kit.getHorizonUrl()).toBe(MAINNET_HORIZON);
    expect(kit.getSorobanRpcUrl()).toBe(MAINNET_SOROBAN);

    await kit.switchNetwork('testnet');
    expect(kit.getHorizonUrl()).toBe('https://custom-horizon.example.com');
    expect(kit.getSorobanRpcUrl()).toBe(TESTNET_SOROBAN);
  });

  it('emits networkChanged after each transition', async () => {
    const kit = new WalletKit({
      network: 'testnet',
      projectName: 'Test App',
      autoConnect: false,
    });

    const listener = vi.fn();
    kit.on('networkChanged', listener);

    await kit.switchNetwork('mainnet');
    await kit.switchNetwork('testnet');

    expect(listener).toHaveBeenNthCalledWith(1, 'mainnet');
    expect(listener).toHaveBeenNthCalledWith(2, 'testnet');
  });
});
