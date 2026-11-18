export function isNativeAndroid(): boolean {
      const win = window as unknown as { Capacitor?: { getPlatform?: () => string } };
        return win.Capacitor?.getPlatform?.() === 'android';
}

export function getPlatformLabel(): string {
      return isNativeAndroid() ? 'NEEDZO Android App' : 'NEEDZO Bhopal Web App';
}
