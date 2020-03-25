export class Search {
  constructor(el) {
    this.$el = el
    this.$content = el.querySelector('.content')
    this.init()
    this.playMusic()
  }

  init() {
    this.initPage()
    let input = document.querySelector('input')
    let that = this

    input.addEventListener('keyup', function (event) {
      let keyword = event.target.value.trim()
      if (!keyword) return
      if (event.keyCode !== 13) return
      // console.log(keyword,'keyword')
      fetch(`https://v1.itooi.cn/netease/search?keyword=${keyword}&type=song&pageSize=20&page=0`, {
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => that.data = res.data.songs)
        .then(() => that.render())
      event.target.value = ''
    })
  }

  initPage() {
    let sections = Array.from(document.querySelectorAll('section'))
    sections.forEach(section => {
      section.style.display = "none"
    })
    this.$el.style.display = "block"
  }
  render() {
    let html = `<p class="m60">搜索结果共 ${this.data.length} 首</p>`
    this.data.forEach((item, i) => {
      html += `
      <li>
        <span class="mr10" >${i + 1}</span>
        <span class="m-title" songid="${item.id}">${item.name}</span>
        <p>${item.ar[0].name}</p>
      </li>      
    `
    })
    html = `<ul>${html}</ul>`
    console.log(this.$content)
    this.$content.innerHTML = html
  }

  playMusic(){
    var audioObject
    this.$el.addEventListener('click', (e) => {
      if (e.target.tagName != "SPAN") return
      let id = e.target.getAttribute('songid')
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
