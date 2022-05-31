class Index {
  constructor() {
    this.$('.banner').addEventListener('click', this.banner);
    this.$('.slideshow').addEventListener('mouseover', this.bannerOver);
    this.$('.slideshow').addEventListener('mouseout', this.bannerOut);
    // console.log(this.$('.navLi'));
    // this.$('.navUl').addEventListener('click', this.navPoint);

    this.index = 0;
    this.nextIndex = 0;
    this.changeNum = 0;
    this.times;
    let bannerUl = this.$('.slideshow-img-wrapper');
    this.ulChildren = bannerUl.children;
    let navUl = this.$('.slideshow-nav ul');
    this.navUlChildren = navUl.children;
    this.autoPlay();
    this.getGoodsData();
    this.loading();
    this.goodsPage = 1;
    this.check = false;
    //小圆点控制轮播图跳转
    Array.from(this.$('.navItem')).forEach((v, k) => {
      let IndexThis = this;
      v.onclick = function () {
        IndexThis.nextIndex = IndexThis.index;
        IndexThis.index = k;
        IndexThis.change(IndexThis.index, IndexThis.nextIndex)
      }
    })
  }
  //轮播图事件
  banner = (eve) => {
    if (eve.target.classList.contains('sildeshow-next')) {
      this.nextBtn();
    }
    if (eve.target.classList.contains('sildeshow-pre')) {
      this.preBtn();
    }
  }
  bannerOver = () => {
    clearInterval(this.times);
  }
  bannerOut = () => {
    this.autoPlay();
  }
  //右翻页
  nextBtn = () => {
    this.nextIndex = this.index;
    this.index++;
    if (this.index >= 5) {
      this.index = 0;
    }
    this.change(this.index, this.nextIndex);
  }
  //左翻页
  preBtn = () => {
    this.nextIndex = this.index;
    this.index--;
    if (this.index < 0) {
      this.index = 4;
    }
    this.change(this.index, this.nextIndex);
  }
  //小圆点控制轮播图跳转
  // navPoint = (v, k) => {
  // console.log('这是ul的触发内容');
  // let IndexThis = this;
  // Array.from(this.navUlChildren).forEach((v, k) => {
  //   v.onclick = function () {
  //     // console.log('这是li的触发内容');
  //     IndexThis.nextIndex = IndexThis.index;
  //     IndexThis.index = k;
  //     IndexThis.change(IndexThis.index, IndexThis.nextIndex)
  //   }
  // })
  // }
  //轮播图自动跳转
  autoPlay() {
    this.times = setInterval(this.nextBtn, 4000);
  }
  //轮播图的实现操作
  change(index, nextIndex) {
    this.ulChildren[nextIndex].classList.remove('slideActive');
    this.ulChildren[index].classList.add('slideActive');
    this.navUlChildren[nextIndex].classList.remove('navHover');
    this.navUlChildren[index].classList.add('navHover');
  }
  //获取商品列表
  getGoodsData(page = 1) {
    let IndexThis = this;
    let html = '';
    axios.get('http://localhost:8888/goods/list?current=' + page)
      .then(function ({ status, data }) {
        if (status == 200 && data.code == 1) {
          data.list.forEach((v) => {
            html += `<li class='goods_li' data-id='${v.goods_id}'>
            <a href="goods.html" target='_blank'>
              <div><img src="${v.img_big_logo}"></div>
              <h3>${v.title}</h3>
             <br>
              <p class="price"><span>售价 : ${v.current_price}</span></p>
            </a>
          </li>`
          })
          IndexThis.$('.template-list').innerHTML += html;
          IndexThis.goodsInfo();
        }
      })
  }
  //懒加载
  //页面宽+滚动条宽>内容宽+内容到浏览器地址栏的高度
  loading() {
    //懒加载
    //div和ul都是由li撑开的,无法获取高度
    // let contH = 1650;
    // let IndexThis = this;
    // window.onscroll = function () {
    //   let clinH = window.innerHeight;
    //   let scollH = document.documentElement.scrollTop;
    //   if (clinH + scollH > contH) {
    //     if (IndexThis.check) {
    //       return;
    //     } else {
    //       IndexThis.check = true;
    //       setTimeout(() => {
    //         IndexThis.check = false;
    //       }, 2000)
    //     }
    //     
    //   }
    // }
    let IndexThis = this;
    this.$('.kanbugou').onclick = function () {
      IndexThis.getGoodsData(++IndexThis.goodsPage)
    }


  }
  goodsInfo() {
    Array.from(this.$('.goods_li')).forEach(v => {
      // console.log(v);
      v.onclick = function () {
        // history.href = '../goods.html'
        localStorage.setItem('goodsId', v.dataset.id)
      }
    });
  }


  $(all) {
    let res = document.querySelectorAll(all)
    return res.length == 1 ? res[0] : res;
  }
}
new Index;
