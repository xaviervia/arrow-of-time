export default function (...fs) {
  return (x) =>
    fs.reduceRight((y, f) => f(y), x)
}
