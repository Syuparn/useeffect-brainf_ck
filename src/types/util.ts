export function updateArr<T>(arr: T[], idx: number, elem: T): T[] {
  return arr.map((v, i) => (i === idx ? elem : v));
}
