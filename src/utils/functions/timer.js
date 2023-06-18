export function getTimerLabel(timestamp) {
    const now = new Date();
    const targetDate = new Date(timestamp);
    const diff = Math.abs(now - targetDate);
  
    const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }