export class URLBuilder {
  private url: URL
  private pathNames: string[] = []

  constructor(url: string | URL, initialParameters?: Record<string, string>) {
    this.url = new URL(url)

    if (initialParameters) {
      this.addParameters(initialParameters)
    }
  }

  public getURL(): URL {
    return this.url
  }

  public toString(): string {
    return this.url.toString()
  }

  public getSearchParams(): URLSearchParams {
    return this.url.searchParams
  }

  public addPath(path: string | string[]) {
    const pathArray = Array.isArray(path) ? path : [path]

    for (const item of pathArray) {
      this.pathNames.push(item)
    }

    return this
  }

  public removePath(path: string | string[]) {
    this.pathNames = this.pathNames.filter((item) =>
      Array.isArray(path) ? !path.includes(item) : item !== path,
    )

    return this
  }

  public addParameters(queries: Record<string, string>) {
    for (const query of Object.entries(queries)) {
      const [name, value] = query
      this.url.searchParams.set(name, value)
    }

    return this
  }

  public removeParameter(...queries: string[]) {
    for (const name of queries) {
      this.url.searchParams.delete(name)
    }

    return this
  }
}

export class RequestBuilder {
  private request: Request

  constructor(url: string | URL, initParams?: RequestInit) {
    const path = new URL(url)

    this.request = new Request(path, initParams)
  }

  public getRequest(): Request {
    return this.request
  }

  public addHeaders(headers: Record<string, string>) {
    for (const query of Object.entries(headers)) {
      const [name, value] = query
      this.request.headers.set(name, value)
    }

    return this
  }

  public removeHeaders(...headers: string[]) {
    for (const header of headers) {
      this.request.headers.delete(header)
    }

    return this
  }
}
