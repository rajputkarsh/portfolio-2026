/** Firebase Cloud Messaging (push) — activates only when configured. */

export const FIREBASE_CONFIGURED =
  !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  !!process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

type Result = { ok: boolean; token?: string; reason?: string };

export async function enableNotifications(): Promise<Result> {
  if (!FIREBASE_CONFIGURED) return { ok: false, reason: "not-configured" };
  if (typeof window === "undefined" || !("Notification" in window))
    return { ok: false, reason: "unsupported" };
  if (!("serviceWorker" in navigator))
    return { ok: false, reason: "unsupported" };

  const { initializeApp, getApps } = await import("firebase/app");
  const { getMessaging, getToken, isSupported } =
    await import("firebase/messaging");

  if (!(await isSupported())) return { ok: false, reason: "unsupported" };

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const app = getApps().length ? getApps()[0] : initializeApp(config);

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return { ok: false, reason: "denied" };

  const registration = await navigator.serviceWorker.ready;
  const messaging = getMessaging(app);
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });

  return token ? { ok: true, token } : { ok: false, reason: "no-token" };
}
