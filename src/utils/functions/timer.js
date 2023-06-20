export function getTimerLabel(timestamp, deleteHandler) {
  const now = new Date();
  const targetDate = new Date(timestamp);
  const diff = Math.abs(now - targetDate);

  if (now >= targetDate) {
    if(deleteHandler){
      deleteHandler()
    }
    return `Expired`
  }

  const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}