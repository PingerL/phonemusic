import {Rank} from './rank.js'
import {Recomend} from './recomend.js'
import {Search} from './search.js'

export class Footer{
  constructor(el){
    this.$el = el
    this.$tabbar = Array.from(el.querySelectorAll('span'))
    this.init()
  }
  init(){
    this.footerHandle()
  }
  // initPage(){
  //   let sections = Array.from(document.querySelectorAll('section'))
  //   sections.forEach(section => {
  //     section.style.display = "none"
  //   })
  //   this.$el.style.display = "block"
  // }
  footerHandle(){
    console.log(this.$tabbar)
    this.$el.addEventListener('click',(e)=> {
      this.$tabbar.forEach(tab => {
        tab.classList.remove('active')
      })
      e.target.classList.add('active')
      if (e.target.innerText === "歌单推荐") {
        let recomend = new Recomend(document.querySelector('.recomend'))
      } else if (e.target.innerText === "歌手排行") {
        let rank = new Rank(document.querySelector('.rank'))
      } else {
        let search = new Search(document.querySelector('.search'))
      }
    })
    
  }
  
}