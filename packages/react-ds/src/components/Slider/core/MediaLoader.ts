export default class MediaLoader {
  image!: HTMLImageElement
  video!: HTMLVideoElement
  resolve!: Function
  ended!: boolean
  loading!: boolean
  toLoad!: number
  loaded!: number
  resolver!: Function

  constructor() {
    if (typeof window !== 'undefined') {
      this.image = new Image()
      this.video = document.createElement('video')
      this.events()
    }
  }

  events() {
    this.video.addEventListener(
      'loadeddata',
      () => this.resolve && this.resolve(true)
    )
    this.video.addEventListener(
      'loadeddata',
      () => this.resolve && this.resolve(false)
    )
    this.image.onload = () => this.resolve && this.resolve(true)
    this.image.onerror = () => this.resolve && this.resolve(false)
  }
  load(url: URL) {
    return new Promise((resolve) => {
      if (!url.href) {
        resolve(true)
      }
      this.resolve = resolve
      this.loading = true
      this.ended = false
      if (url.href.match(/\.(mp4|webm)/i)) {
        this.video.setAttribute('src', url.href)
      }
      if (url.href.match(/\.(png|jp(e)?g|gif|webp)/i)) {
        this.image.src = url.href
        if (this.image.width > 0 || this.image.height > 0) {
          resolve(true)
        }
      }
    })
  }
  loadImage(url: string) {
    const image = new Image()
    let loaded = false
    image.onload = () => {
      if (!loaded) this.pumpLoaded()
    }
    image.onerror = () => {
      if (!loaded) this.pumpLoaded()
    }
    image.src = url
    if (loaded === false && (image.width > 0 || image.height > 0)) {
      loaded = true
      this.pumpLoaded()
    }
  }
  loadVideo(url: string) {
    const video = document.createElement('video')
    video.addEventListener('loadeddata', () => {
      this.pumpLoaded()
    })
    video.addEventListener('error', () => {
      this.pumpLoaded()
    })
    video.setAttribute('src', url)
  }
  pumpLoaded() {
    this.loaded += 1
    if (this.loaded === this.toLoad) {
      this.resolver(true)
    }
  }
  startLoad(url: string) {
    if (url.match(/\.(mp4|webm)/i)) {
      this.loadVideo(url)
    }
    if (url.match(/\.(png|jp(e)?g|gif|webp)/i)) {
      this.loadImage(url)
    }
  }
  loadMultiple(urls: string[]) {
    this.loaded = 0
    this.toLoad = urls.length
    return new Promise((resolve) => {
      this.resolver = resolve
      urls.forEach((url: string) => {
        this.startLoad(url)
      })
    })
  }
}
