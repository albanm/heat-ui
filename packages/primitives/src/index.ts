// Note: the primitives are written in typescript in a very stateless and simple way
// with very basic datastructures, this is mostly to prevent potential performance issues
// and to facilitate an eventual conversion to AssemblyScript/webgl//sharedarraybuffer, etc.

import { gaussian } from './math'
import {
  setMetadata,
  getLength,
  getWidth,
  getHeight,
  getNbPlanes,
  getPlaneData,
  getEnergy,
  addEnergy
} from './data-view'

// A universe is composed of one or multiple "ernergy" planes
// a plane is a grid (probably matching the pixels of a canvas)
// everything is represented in a one dimensional array
export function createUniverseData (width: number, height: number, nbPlanes: number): DataView {
  // length = universe metadata size + ((plane metadata size + plane size) * number of planes)
  const length = getLength(width, height, nbPlanes)
  const data = new DataView(new ArrayBuffer(length))
  setMetadata(data, width, height, nbPlanes)
  return data
}

// radiate energy around a point
// similar to a 2 pass gaussian blur
export function radiate (
  data: DataView,
  plane: number,
  x: number,
  y: number,
  width: number,
  height: number,
  energyPeak: number
): void {
  const planeData = getPlaneData(data, plane)
  const planeWidth = getWidth(data)
  const planeHeight = getHeight(data)
  const sdY = height / 2
  let xDiff = 0
  let horizontalEnergyRadiation = energyPeak
  while (horizontalEnergyRadiation > 1) {
    horizontalEnergyRadiation = gaussian(energyPeak * 2, width / 2, xDiff)
    let yDiff = 0
    let verticalEnergyRadiation = horizontalEnergyRadiation
    while (verticalEnergyRadiation > 1) {
      verticalEnergyRadiation = gaussian(horizontalEnergyRadiation * 2, sdY, yDiff)
      for (const radiateX of xDiff === 0 ? [x] : [x - xDiff, x + xDiff]) {
        for (const radiateY of yDiff === 0 ? [y] : [y - yDiff, y + yDiff]) {
          addEnergy(planeData, planeWidth, planeHeight, radiateX, radiateY, verticalEnergyRadiation)
        }
      }
      yDiff++
    }
    xDiff++
  }
}

export function draw (data: DataView, imageData: Uint8ClampedArray): void {
  const width = getWidth(data)
  const height = getHeight(data)
  const planeDatas = []
  for (let plane; plane < getNbPlanes(data); plane++) {
    planeDatas.push(getPlaneData(data, plane))
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const energyLevels = planeDatas.map(planeData => getEnergy(planeData, width, x, y))
      const pixelIndex = (y * width + x) * 4
      // rgba
      imageData[pixelIndex] = Math.min((energyLevels[0] * 255), 255)
      imageData[pixelIndex + 1] = 0
      imageData[pixelIndex + 2] = 0
      imageData[pixelIndex + 3] = 255
    }
  }
}
