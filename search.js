export class Search {
  constructor(el) {
    this.$el = el
  }

  launch() {
    let input = document.querySelector('input')
    let that = this
    this.$el.innerHTML = ''

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
    console.log(input)

  }

  render() {
    console.log(this.data)
    let loading = document.querySelector('.loading')
    loading.style.display = 'none'

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
    this.$el.innerHTML = html
  }

}