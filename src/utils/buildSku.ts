export const COLOR_NAMES:Record<string,string>={
  black:'чорний',
  'black-silver':'чорно‑сріблястий',
  'black-blue':'чорно‑синій',
  'black-red':'чорно‑червоний',
  brown:'коричневий',
  beige:'бежевий',
}

export interface SkuArgs{
  size:string
  design:string
  color:string
  logo:string
  fix:string
}

export const buildSku=(a:SkuArgs)=>
  `арт. ${a.size} ${a.design} | колір=${COLOR_NAMES[a.color]??a.color} | лого=${a.logo} | фіксація=${a.fix}`