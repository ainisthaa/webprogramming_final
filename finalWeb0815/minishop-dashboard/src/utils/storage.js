export function loadData(key, fallback, isValid = () => true) {
  try {
    const saved = localStorage.getItem(key)
    if (saved === null) return fallback
    const data = JSON.parse(saved)
    return isValid(data) ? data : fallback
  } catch {
    return fallback
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Could not save ${key}`, error)
  }
}
