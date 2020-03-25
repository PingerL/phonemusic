export class RecomendList{
  constructor(el){
    this.$el = el
    this.onplaying = false
    this.init()
  }
  init(){
    this.listHandle()
    this.playMusic()
  }
  initPage(){
    let sections = Array.from(document.querySelectorAll('section'))
    sections.forEach(section => {
      section.style.display = "none"
    })
    this.$el.style.display = "block"
  }
  listHandle(){
    console.log('musidlist')
    let recomendBox = document.querySelector('.recomend')
    recomendBox.addEventListener('click',(e)=>{
      let id
      console.log(this,'this')
      if(e.target.tagName !== 'DIV'){
        id = e.target.parentNode.getAttribute('musicid')
      }else{
        id = e.target.getAttribute('musicid')
      }
      fetch(`https://v1.itooi.cn/netease/songList?id=${id}`,{mode:'cors'})
        .then(res => res.json())
        .then(res => {
          this.data = res.data
          this.renderData()
        })
    })
    
  }
  renderData(){
    let html =`<h4 style="padding:20px 10px ;background-color:gray;margin:0 -30px;color:white;">${this.data.name}</h4>`
    this.data.tracks.forEach((item,i) => {
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
    this.initPage()
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