import { platform } from 'os'

export const getPlatformForCypressSnapshots = () => {
  const isMac = platform() === 'darwin'
  const isLinux = platform() === 'linux'
  if (!isMac && !isLinux) {
    throw new Error('Unsupported platform for cypress snapshots')
  }

  return isMac ? 'mac' : 'linux'
}
