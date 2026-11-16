export interface FirebaseEnvConfig {
    apiKey?: string;
      authDomain?: string;
        projectId?: string;
          storageBucket?: string;
            messagingSenderId?: string;
              appId?: string;
}

export function getFirebaseEnvConfig(): FirebaseEnvConfig {
    return {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY || undefined,
              authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || undefined,
                  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || undefined,
                      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || undefined,
                          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || undefined,
                              appId: import.meta.env.VITE_FIREBASE_APP_ID || undefined,
    };
}

export function isFirebaseConfigured(): boolean {
    const cfg = getFirebaseEnvConfig();
      return Boolean(cfg.apiKey && cfg.projectId && cfg.appId);
}
