export function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)

  return enumValues[randomIndex];
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Deep copy function for TypeScript. T Generic type of source/copied value.
 *
 * @param source Target value to be copied.
 */
export function deepCopy<T>(source: T): T {
  if (source === null) {
    return source
  } else if (source instanceof Date) {
    return new Date(source.getTime()) as any
  }

  // First part is for array and second part is for Realm.Collection
  // if (source instanceof Array || typeof (source as any).type === 'string') {
  if (typeof source === 'object') {
    if (typeof source[(Symbol as any).iterator] === 'function') {
      const cp = [] as any[]
      if ((source as any as any[]).length > 0) {
        for (const arrayMember of source as any as any[]) {
          cp.push(deepCopy(arrayMember))
        }
      }

      return cp as any as T
    } else {
      const targetKeys = Object.keys(source)
      const cp = {}

      if (targetKeys.length > 0) {
        for (const key of targetKeys) {
          cp[key] = deepCopy(source[key])
        }
      }

      return cp as T
    }
  }

  // Means that object is atomic
  return source
}
