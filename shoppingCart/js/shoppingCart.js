class Cart {
  constructor() {
    //自动检查登录状态(token)
    // this.checkLogin();
    //获取商品列表
    this.goodsList();
    //div节点,分派删除/增减事件
    this.$('.main-con-container').addEventListener('click', this.distribute)
    //全选
    this.$('.all-choose').addEventListener('click', this.allSle)
    //结算
    this.$('.go-bill').addEventListener('click', this.billCb)

  }

  //input 验证仅才能输入数字
  checkNum() {
    let IndexThis = this;
    Array.from(this.$('.num-one')).forEach((v, k) => {
      v.oninput = function (eve) {
        v.value = v.value.replace(/[^\d]/g, '');
        let current_price = eve.target.parentNode.previousSibling.previousSibling.innerHTML - 0;
        let price = eve.target.parentNode.nextSibling.nextSibling;
        price.innerHTML = (v.value * current_price).toFixed(2);
        IndexThis.total()
      }
    })
  }

  //结算
  billCb = (() => {
    let id = localStorage.getItem('user_id')
    let param = `id=${id}`;
    let totalNum = this.$('.quantity').innerHTML;
    let totalPrice = this.$('.results').innerHTML;
    if (totalPrice == 0 || totalNum == 0) {
      layer.open({
        title: '温馨提示:'
        , content: '请至少选中一件商品'
      });
    } else {
      axios.post(' http://localhost:8888/cart/pay', param, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.status == 200 && res.data.code == 1) {
          layer.open({
            title: '商品购买信息'
            , content: `由于老板不给工资,购买页面不开发!!!<br>以下是您的购买信息:<br>您购买了&nbsp;<font color='red'>${totalNum}</font>&nbsp;件商品,总价&nbsp;<font color='red'>${totalPrice}</font>&nbsp;元`
            , anim: 5
          });
        } else if (res.status == 200 && res.data.code == 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          location.href = '../login/login.html?ReturnUrl=../shoppingCart/shoppingCart.html'
        };
      })
    }

  })
  //派发删除/增加/减少事件
  distribute = (eve) => {
    if (eve.target.classList.contains('delBtn')) { this.delBtnCb(eve) }
    if (eve.target.classList.contains('add-one')) { this.addCb(eve) }
    if (eve.target.classList.contains('reduce-one')) { this.reduceCb(eve) }
    if (eve.target.classList.contains('radio')) { this.oneSle(eve) }
  }
  //全选
  allSle = () => {
    if (this.$('.all-choose').checked) {
      Array.from(this.$('.radio')).forEach((v) => {
        v.checked = true;
        this.total()
      })
    } else {
      // this.$('.quantity').innerHTML = 0;
      Array.from(this.$('.radio')).forEach((v) => {
        v.checked = false;
        this.total()
      })
    }
  }

  //单选
  oneSle = () => {
    Array.from(this.$('.radio')).forEach(v => {
      let res = Array.from(this.$('.radio')).find(v => {
        return !v.checked
      })
      if (res) {
        this.$('.all-choose').checked = false;
        this.total()
      } else {
        this.$('.all-choose').checked = true;
        this.total()
      }
    });
  }

  //数量和总价
  total() {
    let allNum = 0;
    let allPrice = 0;
    Array.from(this.$('.container-box')).forEach((v) => {
      if (v.firstElementChild.checked) {
        let inputText = v.querySelector('.num-one').value - 0;
        let currentPrice = v.querySelector('.money-one').innerHTML - 0;
        allNum += inputText;
        allPrice += currentPrice;
      }

    })
    // console.log(allNum);
    this.$('.quantity').innerHTML = allNum;
    this.$('.results').innerHTML = (allPrice).toFixed(2);
  }

  //删除事件
  delBtnCb = (eve) => {
    let id = localStorage.getItem('user_id');
    let goodsId = eve.target.parentNode.dataset.id;
    let divObj = eve.target.parentNode;
    // console.log(goodsId, divObj);
    layer.open({
      title: '删除提示',
      content: '真的考虑好要删除了吗?(〃＞皿＜)',
      btn: ['让我留下(*╹▽╹*)', '狠心删除'],
      btn2: function () {
        axios.get('http://localhost:8888/cart/remove', {
          params: {
            id,
            goodsId
          }
        });
        divObj.remove();
      }
    })
  }

  //增加事件
  addCb = (eve) => {
    let input = eve.target.previousSibling.previousSibling;
    let inputVlue = input.value;
    let current_price = eve.target.parentNode.previousSibling.previousSibling.innerHTML - 0;
    inputVlue++;
    input.value = inputVlue;
    let price = eve.target.parentNode.nextSibling.nextSibling;
    price.innerHTML = (inputVlue * current_price).toFixed(2);
    this.total()
  }


  //减少事件
  reduceCb = (eve) => {
    let CartThis = this;
    let input = eve.target.nextSibling.nextSibling;
    let inputVlue = input.value;
    let current_price = eve.target.parentNode.previousSibling.previousSibling.innerHTML - 0;
    inputVlue--;
    if (inputVlue <= 1) {
      inputVlue = 1;
    }
    input.value = inputVlue;
    let price = eve.target.parentNode.nextSibling.nextSibling;
    price.innerHTML = (inputVlue * current_price).toFixed(2);
    this.total()
  }

  //自动检查token
  // checkLogin() {
  //   let d = new Date();
  //   let hour = d.getHours() * 60;
  //   let min = d.getMinutes();
  //   let nowTime = hour + min;
  //   let token_time = localStorage.getItem('token_time') - 0;
  //   // console.log(token_time, nowTime);
  //   //学习拦截器
  //   if ((nowTime - token_time) > 60) {
  //     alert('登录过期,请重新登录')
  //     location.href = '../login/login.html?ReturnUrl=../shoppingCart/shoppingCart.html'
  //   }
  // }

  //自动获取商品列表
  goodsList() {
    //请求商品列表需要authorization字段
    const AUTH_TOKEN = localStorage.getItem('token')
    axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
    let id = localStorage.getItem('user_id')
    let data = `id=${id}`
    axios.get('http://localhost:8888/cart/list', {
      params: {
        id
      }
    }).then((res) => {
      let html = '';
      // console.log(res);
      if (res.status == 200 && res.data.code == 1) {
        res.data.cart.forEach(v => {
          html += `<div class="container-box" data-id='${v.goods_id}'>
          <input type="checkbox" class="radio">
          <i><img src="${v.img_small_logo}""></i>
          <p>${v.title}</p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>${v.current_price}</span>
          <div class="add">
              <div class="add-boxs"></div>
              <strong class="reduce-one">-</strong>&nbsp;
              <input  value='${v.cart_number}' class="num-one number" type="text" name=''>
              &nbsp<strong class="add-one">+</strong>
          </div>
          <h5 class="money-one nowmoney">${(v.cart_number) * (v.current_price)}</h5>
          <button class="delBtn">删除</button>
      </div>`
        })
      } else if (res.status == 200 && res.data.code == 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        location.href = '../login/login.html?ReturnUrl=../shoppingCart/shoppingCart.html'
      };
      this.$('.main-con-container').innerHTML += html;
      this.checkNum();
    })
  }
  $(all) {
    let res = document.querySelectorAll(all)
    return res.length == 1 ? res[0] : res;
  }
}

new Cart;