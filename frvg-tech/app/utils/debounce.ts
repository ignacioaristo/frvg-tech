let debounceTimer: number | undefined;

export const debounce = (callback: () => void): void => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = undefined;
  }

  debounceTimer = setTimeout(() => {
    callback();
  }, 1000);
};
