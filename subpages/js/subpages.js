class Subpages {
  constructor() {
    this.getGoodsList();
    this.timeOut();
    this.index = 0;
    this.nextIndex = 0;
    this.times;
    this.$('.btn_right').addEventListener('click', this.nextCb)
    this.$('.btn_left').addEventListener('click', this.prevCb)
    this.autoPlay();
    this.$('.swiper-container').addEventListener('mouseover', this.mouseoverCb)
    this.$('.swiper-container').addEventListener('mouseout', this.mouseoutCb)
  }
  nextCb = () => {
    this.nextIndex = this.index;
    this.index++;
    if (this.index > 5) {
      this.index = 0;
    }
    this.imgPlay(this.nextIndex, this.index);
  }
  prevCb = () => {
    this.nextIndex = this.index;
    this.index--;
    if (this.index < 0) {
      this.index = 5;
    }
    console.log(this.index);
    this.imgPlay(this.nextIndex, this.index);
  }
  imgPlay(nextIndex, index) {
    let imgObj = Array.from(this.$('.swiper-slide'));
    imgObj[nextIndex].style.display = 'none';
    imgObj[index].style.display = 'block';
  }
  autoPlay() {
    this.times = setInterval(this.nextCb, 2000)
  }
  mouseoverCb = () => {
    clearInterval(this.times);
  }
  mouseoutCb = () => {
    this.autoPlay()
  }

  //倒计时
  timeOut = () => {
    let nowTime = new Date();
    let hour = nowTime.getHours();
    let i = 0;
    if (hour % 2 == 0) {
      i = 2;
      this.$('#place span').innerHTML = hour;
    } else {
      i = 1;
      this.$('#place span').innerHTML = hour - 1;
    }
    let endTime = new Date();
    endTime.setHours(hour + i)
    endTime.setMinutes(0)
    endTime.setSeconds(0)
    let dataH = parseInt((endTime - nowTime) / 1000 / 60 / 60);
    let dataM = parseInt((endTime - nowTime) / 1000 / 60 % 60);
    let dataS = parseInt((endTime - nowTime) / 1000 % 60);

    this.$('#hour').innerHTML = dataH < 10 ? '0' + dataH : dataH;
    this.$('#minute').innerHTML = dataM < 10 ? '0' + dataM : dataM;
    this.$('#second').innerHTML = dataS < 10 ? '0' + dataS : dataS;
    setTimeout(this.timeOut, 1000)
  }
  //获取商品列表展示到页面中
  getGoodsList() {
    let SubpagesThis = this;
    axios.get('http://localhost:8888/goods/category')
      .then(function ({ status, data }) {
        let html = '';
        if (status == 200 && data.code == 1) {
          data.list.forEach(v => {
            html += `<a  class="box1" href="#none">${v}</a>`
          });
        } else {
          throw new Error('数据请求错误')
        }
        SubpagesThis.$('.line-con').innerHTML += html;
      })

  }
  $(e) {
    let res = document.querySelectorAll(e);
    return res.length == 1 ? res[0] : res;
  }
}
new Subpages;