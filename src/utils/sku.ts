export interface SkuParams {
  size: string;
  designName: string;
  designVersion: string;
  logoMaterial: string;
  fixVariant: string;
}

export function buildSku({ size, designName, designVersion, logoMaterial, fixVariant }: SkuParams) {
  const parts = [
    `арт. ${size}`,
    `${designName} ${designVersion}`,
    `лого=${logoMaterial === 'none' ? 'без лого' : logoMaterial}`,
    `фіксація=${fixVariant === 'none' ? 'без фіксації' : 'в багажнику'}`
  ];
  return parts.join(' | ');
}