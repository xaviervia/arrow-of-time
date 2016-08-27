export default (i) => (f, x) =>
  'a'.repeat(i).split('').reduce((acc, _, index) => f(acc, index), x)
