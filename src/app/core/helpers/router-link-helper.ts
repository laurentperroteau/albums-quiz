// TODO: spec
export namespace RouterLinkHelper {

  export function push(baseLink: string[], toPush) {
    return baseLink && toPush ? [...baseLink, toPush] : baseLink;
  }
}
