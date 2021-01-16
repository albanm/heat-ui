// abstract all basic get/set interactions with the universe data view

const metadataLength = 5
const planeMetadataLength = 0

export function getLength (width: number, height: number, nbPlanes: number): number {
  return metadataLength + (nbPlanes * (planeMetadataLength + (width * height * 2)))
}

export function setMetadata (data: DataView, width: number, height: number, nbPlanes: number): void {
  data.setUint16(0, width)
  data.setUint16(2, height)
  data.setUint8(4, nbPlanes)
}
export function getWidth (data: DataView): number {
  return data.getUint16(0)
}
export function getHeight (data: DataView): number {
  return data.getUint16(2)
}
export function getNbPlanes (data: DataView): number {
  return data.getUint8(4)
}

export function getPlaneData (data: DataView, plane: number): DataView {
  const planeLength = (getWidth(data) * getHeight(data) * 2)
  return new DataView(data.buffer, metadataLength + (plane * (planeMetadataLength + planeLength)), planeLength)
}

export function getEnergy (planeData: DataView, width: number, x: number, y: number): number {
  return planeData.getInt16(planeMetadataLength + (width * y) + x)
}
export function addEnergy (planeData: DataView, planeWidth: number, planeHeight: number, x: number, y: number, energy: number): null {
  if (x >= planeWidth) return
  if (y >= planeHeight) return
  const pos = planeMetadataLength + (planeWidth * y) + x
  planeData.setInt16(pos, planeData.getInt16(pos) + energy)
}
