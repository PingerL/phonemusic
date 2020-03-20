export class RecomendSong {
  constructor(el) {
    this.$el = el
    this.onplaying = false
  }
  launch() {
    var audioObject
    this.$el.addEventListener('click', (e) => {
      if (e.target.tagName != "SPAN") return
      let id = e.target.getAttribute('songid')
      console.log(id)
      /*  进入音乐播放页面
      let musicbox = document.querySelector('.musicbox')
      this.$el.style.display = 'none'
      musicbox.style.display = 'block'
      */
      if (!id) return
      if (this.onplaying) {
        audioObject.pause()
        this.onplaying = false
        console.log('pause')
      }
      audioObject = new Audio(`https://v1.itooi.cn/netease/url?id=${id}&quality=flac`)
      audioObject.play()
      this.onplaying = true
      console.log('play')

    })
  }




}
