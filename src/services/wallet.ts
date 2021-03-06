import { ethers } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import './metamask'

export async function connectToWallet(): Promise<JsonRpcProvider | undefined> {
  if (window.ethereum !== undefined) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Prompt user for connecting metamask
      await provider.send('eth_requestAccounts', [])
      // Require user to change network
      await provider.send('wallet_switchEthereumChain', [{ chainId: '0x3' }]) // ropsten
      return provider
    } catch (e) {
      // TODO
    }
  }
}

export async function getWallet(): Promise<JsonRpcProvider | undefined> {
  if (window.ethereum !== undefined) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return provider
  }
}

export async function getWalletAddress(): Promise<string | undefined> {
  const provider = await getWallet()
  if (provider !== undefined) {
    const addresses: string[] = await provider.send('eth_accounts', [])
    return addresses[0]
  }
}

export function addWalletListener(callback: (addr?: string) => void): void {
  if (window.ethereum !== undefined) {
    window.ethereum.on('accountsChanged', (addresses: string[]) =>
      callback(addresses[0])
    )
  }
}
