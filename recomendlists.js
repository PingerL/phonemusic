export class RecomendLists {
  constructor(el) {
    this.$el = el
  }
  launch() {
    // addEventListener 里面的 this 指向的是触发该事件的 元素
    // 所以要 事先将 this 保存一下
    let that = this
    this.$el.addEventListener('click', function (e) {
      console.log(e.target)
      if(e.target.tagName != "IMG") return
      this.musicid = e.target.getAttribute('musicid')
      fetch(`https://v1.itooi.cn/netease/songList?id=${this.musicid}`)
        .then(res => res.json())
        .then(res => that.data = res.data)
        .then(() => that.render())
    })
  }

  render() {
    let loading = document.querySelector('.loading')
    loading.style.display = 'none'
    // console.log(this.data)
    let html = `<h4 style="padding:20px 10px ;background-color:black;margin:0 -30px;color:white;">${this.data.name}</h4>`
    this.data.tracks.forEach((item, i) => {
      html += `
        <li>
          <span class="mr10" >${i + 1}</span>
          <span class="m-title" songid="${item.id}">${item.name}</span>
          <p>${item.artists[0].name}</p>
        </li>      
      `
    })
    html = `<ul>${html}</ul>`
    this.$el.innerHTML = html
    console.log(2)
  }
}