class GoodsInfo {
    constructor() {
        this.getInfo();
        //商品数量减少
        this.$('.minBtn').addEventListener('click', this.minBtnCb)
        //商品数量增加
        this.$('.addBtn').addEventListener('click', this.addBtnCb)
        this.text = this.$('.num').value;
        //键盘输出改动页面价格
        this.$('.num').addEventListener('input', this.inputCb)
        //添加到购物车
        this.$('.add-cart').addEventListener('click', this.addCartCb)
        //放大镜
        this.$('.left-img').addEventListener('mouseenter', this.loupeEnter)
        this.$('.left-img').addEventListener('mouseleave', this.loupeLeave)
        this.$('.left-img').addEventListener('mousemove', this.loupeMove)
    }
    //放大镜
    loupeEnter = () => {
        this.$('.loupe').style.display = 'block';
        this.$('.mask').style.display = 'block';
    }
    loupeLeave = () => {
        this.$('.loupe').style.display = 'none';
        this.$('.mask').style.display = 'none';
    }
    loupeMove = (eve) => {
        let mask = this.$('.mask');
        let box = this.$('.left-img');
        let clinX = eve.pageX;
        let clinY = eve.pageY;
        let boxX = box.offsetLeft;
        let boxY = box.offsetTop;
        let offX = mask.offsetWidth;
        let offY = mask.offsetHeight;
        let boxW = box.offsetWidth - offX;
        let boxH = box.offsetHeight - offY;
        let maskX = clinX - boxX - offX / 2;
        let maskY = clinY - boxY - offY / 2;
        if (maskX < 0) { maskX = 0 }
        if (maskY < 0) { maskY = 0 }
        if (maskX > boxW) { maskX = boxW }
        if (maskY > boxH) { maskY = boxH }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        let loupeW = this.$('.loupeImg').offsetWidth - this.$('.loupe').offsetWidth;
        let loupeH = this.$('.loupeImg').offsetHeight - this.$('.loupe').offsetHeight;
        let loupeImgX = maskX / boxW * loupeW;
        let loupeImgY = maskY / boxH * loupeH;
        this.$('.loupeImg').style.left = -loupeImgX + 'px'
        this.$('.loupeImg').style.top = -loupeImgY + 'px'
    }
    //添加到购物车
    addCartCb() {

        if (localStorage.getItem('token')) {
            //注意:调用购物车接口需要token
            const AUTH_TOKEN = localStorage.getItem('token')
            axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            let goodsId = localStorage.getItem('goodsId')
            let id = localStorage.getItem('user_id')
            let data = `id=${id}&goodsId=${goodsId}`

            axios.post('http://localhost:8888/cart/add', data).then((res) => {
                console.log(res);
                if (res.status == 200 && res.data.code == 1) {
                    console.log(55665);
                    layer.open({
                        title: '添加购物车成功^_^',
                        btn: ['继续浏览', '购物车结算'],
                        btn2: function () {
                            location.href = '../shoppingCart/shoppingCart.html'
                        }
                    })
                } else if (res.status == 200 && res.data.code == 401) {
                    location.href = '../login/login.html?ReturnUrl=../index/goods.html'
                } else if (res.status == 200 && res.data.code == 0) {
                    location.href = '../login/login.html?ReturnUrl=../index/goods.html'
                }
            })
        } else {

            location.href = '../login/login.html?ReturnUrl=../index/goods.html'
        }
    }
    //键盘输出改动页面价格
    inputCb = () => {
        this.text = this.$('.num').value;
        this.getInfo()
    }
    //商品数量减少
    minBtnCb = () => {
        this.text--;
        if (this.text <= 1) {
            this.text = 1
        }
        this.$('.num').value = this.text;
        this.getInfo()
    }
    //商品数量增加
    addBtnCb = () => {
        this.text++;
        this.$('.num').value = this.text;
        this.getInfo()
    }
    //自动调用商品详情
    getInfo() {
        let GoodsInfoThis = this;
        let goodsId = localStorage.getItem('goodsId');
        let data = `${goodsId}`
        axios.get('http://localhost:8888/goods/item', {
            params: {
                id: goodsId
            }
        })
            .then(({ status, data }) => {
                // console.log(data);
                let html01 = '';
                let html02 = '';
                let html03 = '';
                let html04 = '';
                let html05 = '';
                let html06 = '';
                if (status == 200 && data.code == 1) {
                    html01 += `<img src="${data.info.goods_introduce}`
                    html02 += `<img src="${data.info.img_big_logo}" alt="" class="img">`
                    html03 += `${data.info.title}`
                    html04 += `<li><span>价格</span><i class="main-money">￥${((data.info.current_price) * GoodsInfoThis.text).toFixed(2)}</i></li><p>服务 限时满69包邮 三方店铺 7天无理由退货</p>`
                    html05 += `库存&nbsp;&nbsp;&nbsp;${data.info.goods_number}&nbsp;套`
                    html06 += `<img src="${data.info.img_big_logo}" alt="" class="loupeImg">`
                } else if (status == 200 && data.code == 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_id');
                    location.href = '../login/login.html?ReturnUrl=../index/goods.html'
                } else {
                    throw new Error('未请求到数据')
                }
                this.$('.main').innerHTML = html01;
                this.$('.left-img').innerHTML += html02;
                this.$('.name').innerHTML = html03;
                this.$('.box-main').innerHTML = html04;
                this.$('.goodsNorms').innerHTML = html05;
                this.$('.main>img').style.display = 'none';
                this.$('.loupe').innerHTML = html06;
            })
    }
    $(all) {
        let res = document.querySelectorAll(all)
        return res.length == 1 ? res[0] : res;
    }
}
new GoodsInfo;