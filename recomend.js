export class Recomend {
  constructor(el) {
    this.$el = el
  }

  launch() {
    fetch('https://v1.itooi.cn/netease/songList/hot?cat=全部&pageSize=20&page=0')
      .then(res => res.json())
      .then(res => this.data = res.data)
      .then(() => this.render())
  }

  render() {
    let loading = document.querySelector('.loading')
    loading.style.display = 'none'
    let html = ``
    this.data.forEach(item => {
      html += `<div class="list-box">
                  <img src="${item.coverImgUrl}" alt="cover" musicid = ${item.id}>
                  <p>${item.name}</p>
                </div>
      `
    })
    this.$el.innerHTML = html
    console.log(1)
    
  }

}