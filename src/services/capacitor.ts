export function isNativeAndroid(): boolean {
    const win = window as unknown as { Capacitor?: { getPlatform?: () => string } };
      return win.Capacitor?.getPlatform?.() === 'android';
}

export function getPlatformCapabilityNotice(): string {
    return isNativeAndroid()
        ? 'Running inside Capacitor Android shell (Demo Backend Mode)'
            : 'Running in Mobile Web Preview (Capacitor Android ready)';
}
