export const PROGRESS_KEY = 'workshop_progress';

export const getProgress = (): string[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    localStorage.removeItem(PROGRESS_KEY);
    return [];
  }
};

export const markTaskComplete = (taskId: string) => {
  if (typeof window === 'undefined') return;
  const progress = getProgress();
  if (!progress.includes(taskId)) {
    const next = [...progress, taskId];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('progress-update', { detail: next }));
  }
};

export const isTaskComplete = (taskId: string): boolean => {
  return getProgress().includes(taskId);
};
