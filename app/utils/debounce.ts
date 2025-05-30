let debounceTimer: number | undefined;

export const debounce = (callback: () => void): void => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = undefined;
  }

  debounceTimer = setTimeout(() => {
    return callback();
  }, 1000);
};
