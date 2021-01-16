// a simple 1 dimensional gaussian distribution
// https://en.wikipedia.org/wiki/Gaussian_function
// amplitude is the top height of the curve
// sd is for standard deviation, i.e the half width at mean height of the curve
export function gaussian (amplitude: number, sd: number, x: number): number {
  return amplitude * Math.exp(-(Math.pow(x, 2) / (2 * Math.pow(sd, 2))))
}
