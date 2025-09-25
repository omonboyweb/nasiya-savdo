// storage.ts

export function setStorage<T>(key: string, value: T): void {
  // localStorage.setItem(key, JSON.stringify(value));
  if (value === null || value === undefined) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}
