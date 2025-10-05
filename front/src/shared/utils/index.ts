/**
 * Объеденить CSS классы
 * @param classes - Массив классов
 */
export const cn = (...classes: (string | null | undefined)[]): string => {
  return classes.filter(Boolean).join(" ")
}
