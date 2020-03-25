export class Recomend{
  constructor(el){
    this.$el = el
    this.$content = el.querySelector('.content')
    this.init()
  }
  init(){
    this.initPage()
    this.getData()
  }
  initPage(){
    let sections = Array.from(document.querySelectorAll('section'))
    sections.forEach(section => {
      section.style.display = "none"
    })
    this.$el.style.display = "block"
  }
  getData(){
    let url = 'https://v1.itooi.cn/netease/songList/hot?cat=全部&pageSize=20&page=0'
    fetch(url,{mode:'cors'}).then( res => res.json())
    .then( (res)=> {
      this.data = res.data
      this.renderData()
    })
  }
  renderData(){
    let html = ''
      this.data.forEach(item => {
        html += `<div class="list-box" musicid = ${item.id}>
                  <img src="${item.coverImgUrl}" alt="" class="test">
                  <p>${item.name}</p>
                </div>
      `
      })
      this.$content.innerHTML = html
  }
}










