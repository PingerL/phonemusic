export class Rank {
  constructor(el) {
    this.$el = el
  }

  launch() {
    this.$el.innerHTML = ''
    let loading = document.querySelector('.loading')
    loading.style.display = 'block'
    fetch('https://v1.itooi.cn/netease/artist/top?page=0&pageSize=30',{
      mode:'cors'})
      .then(res => res.json())
      .then(res => this.data = res.data)
      .then(() => this.render())
  }

  render() {
    console.log(this.data)
    let loading = document.querySelector('.loading')
    loading.style.display = 'none'
    let html = `<h4 style="padding:20px 10px ;background-color:black;margin:0 -30px;color:white;">歌手排行榜</h4>`
    this.data.forEach((item,i) => {
      html += `
      <li>
        <img src="${item.img1v1Url}" style="width:100px">
        <span class="mr10" >${i + 1}</span>
        <span class="m-title">${item.name}</span>
      </li>      
    `
    })
    html = `<ul>${html}</ul>`
    this.$el.innerHTML = html
  }

}