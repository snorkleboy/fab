const _options = {
    preloadImages: true,
    frames: 13,
    timeInterval: {
        amount: 1,
        interval: "hr"
    },
    replayPause:1000,
    frameSpeedMS: 500,
    bounds: {
        south: 30,
        west: -156,
        north: 49,
        east: -65
    },
    resolution:"1024x1024",
    baseImageUrl: "https://maps.aerisapi.com/45yv8VupfeOkKylvazTSa_sPoCW1N6z7BMpwkWkbrXDFbytIWtWVX47BdNwNJx/fradar"
}
export default class AerisGmapsAnimator {
    constructor(map, options = _options) {
        options = Object.assign({}, _options, options)
        this.options = options
        this.map = map;
        this.overlays = this.makeOverlays(options.timeInterval, options.baseImageUrl, options.frames);
        if (this.options.preloadImages) {
            this.preloadImages(this.urls);
        }
        this.intervalId = null;
        this.pauseTimeoutId = null;
        this.index = 0;
        this.imagesLoaded = false;
        this.playing = false;
        this.preloading = false;
    }
    prePlay(){
        this.overlays.forEach(overlay=>{
            overlay.setMap(this.map);
            overlay.setMap(null);
        })
    }
    start() {
        if (this.imagesLoaded){
            this.prePlay();
            this.intervalId = setInterval(
                this.animate.bind(this),
                this.options.frameSpeedMS
            )
            this.playing = true;
        } else{
            if (!this.options.preloadImages && !this.preloading){
                this.preloading=true;
                this.preloadImages(this.urls);
            }
            setTimeout(
                this.start.bind(this),
                1000
            )
        }
    }
    pause() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.playing = false;
    }
    stop() {
        this.pause();
        clearTimeout(this.pauseTimeoutId)
        this.index=0;
        this.overlays.forEach(overlay => overlay.setMap(null));
        this.playing = false;
    }
    animate() {
        const lastOverlay = this.index === 0 ? this.overlays.length - 1 : this.index - 1;
        this.overlays[lastOverlay].setMap(null);
        this.overlays[this.index].setMap(this.map);

        if (this.index === this.overlays.length -1 && this.options.replayPause > 0){
            this.pause();
            this.pauseTimeoutId = setTimeout(
                this.start.bind(this),
                this.options.replayPause
            )

        }
        this.index = (this.index + 1) % (this.overlays.length);
    }
    makeOverlays(timeInterval, baseUrl, frames) {
        this.urls = this.makeUrls(timeInterval, baseUrl, frames)
        const overlays = [];

        this.urls.forEach(url => {
            overlays.push(
                new google.maps.GroundOverlay(url, this.options.bounds, {
                    opacity: 0.8
                })
            )
        })
        return overlays;
    }
    makeUrls(timeInterval, baseUrl, frames) {
        const resolution = this.options.resolution;
        const bounds = this.options.bounds
        const arr = [];
        const format = "png"
        arr.push(`${baseUrl}/${resolution}/${bounds.south},${bounds.west},${bounds.north},${bounds.east}/current.${format}`)
        for (let i = 1; i < frames; i++) {
            arr.push(`${baseUrl}/${resolution}/${bounds.south},${bounds.west},${bounds.north},${bounds.east}/+${timeInterval.amount * i }${timeInterval.interval}.${format}`)
        }
        return arr;
    }
    preloadImages(urlArr) {
        urlArr.forEach((url,i) => {
            const preload = new Image();
            preload.onload = (e)=>loadedTracker.call(this);
            preload.src = url
        })

        let loaded = 0;
        function loadedTracker(){
            loaded = loaded + 1;
            if (loaded >= this.options.frames){
                this.imagesLoaded = true;
                this.preloading=false;
            }
        }
    }
}

