import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.heavy.pipbase',
  appName: 'Pipbase',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: false,
      splashFullScreen: true,
    },
  },
};

export default config;
