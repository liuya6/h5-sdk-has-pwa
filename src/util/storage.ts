function isLocalStorageSupport() {
  try {
    const isSupport =
      "localStorage" in window && window["localStorage"] !== null;
    if (isSupport) {
      localStorage.setItem("__test", "1");
      localStorage.removeItem("__test");
    }
    return isSupport;
  } catch (e) {
    return false;
  }
}

function getStorage() {
  return isLocalStorageSupport() ? window.localStorage : window.sessionStorage;
}

export const MStorage = getStorage();
