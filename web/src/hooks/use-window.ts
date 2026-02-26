export function useWindow() {
  const openNewWindow = (url: string) =>
    window.open(url, "_window", "width=800,height=600");

  const postNewMessage = (window: Window, messageType: string) => {
    window.postMessage({ type: messageType }, window.location.origin);
  };

  return { openNewWindow, postNewMessage };
}
