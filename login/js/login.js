class Login {
    constructor() {
        this.check_Acc_Pas();
        this.$('.ipt_One').addEventListener('blur', this.ipt_One_Blur);
        this.$('.ipt_One').addEventListener('focus', this.ipt_One_Focus);
        this.$('.ipt_Psd').addEventListener('blur', this.ipt_Psd_Blur);
        this.$('.ipt_Psd').addEventListener('focus', this.ipt_Psd_Focus);
        this.$('.ipt_Psd').addEventListener('input', this.check_Acc_Pas);
        this.$('button').addEventListener('click', this.check);
        this.$('.btn').addEventListener('click', this.checkInput);
        this.add = location.search;
        this.returnAdd = this.add.split('=')[1];
        // console.log(this.returnAdd);
    }
    ipt_One_Blur = () => {
        if (!(this.$('.ipt_One').value).trim()) {
            this.$('.tip').innerHTML = '*请输入账户名称'
        } else {
            this.$('.tip').innerHTML = ''
        }
    }
    ipt_One_Focus = () => {
        this.$('.tip').innerHTML = ''
    }
    ipt_Psd_Blur = () => {
        if (!(this.$('.ipt_Psd').value).trim()) {
            this.$('.pwd_tip').innerHTML = '*请输入密码'
        } else {
            this.$('.pwd_tip').innerHTML = ''
        }
    }
    ipt_Psd_Focus = () => {
        this.$('.pwd_tip').innerHTML = ''
    }
    check_Acc_Pas = () => {
        if ((this.$('.ipt_One').value).trim() && (this.$('.ipt_Psd').value).trim()) {
            this.$('button').style.backgroundColor = 'orange';
            this.$('button').disabled = false;
        }
        if (!(this.$('.ipt_One').value).trim() || !(this.$('.ipt_Psd').value).trim()) {
            this.$('button').style.backgroundColor = 'gray';
            this.$('button').disabled = true;
        }
    }
    checkInput = () => {
        if (this.$('.btn').checked) {
            this.$('.treaty').style.display = 'none'
        } else {
            this.$('.treaty').style.display = 'block'
            return;
        }
    }
    check = () => {
        let LoginThis = this;
        if (this.$('.btn').checked) {
            this.$('.treaty').style.display = 'none'
        } else {
            this.$('.treaty').style.display = 'block'
            return;
        }
        let username = this.$('.ipt_One').value;
        let password = this.$('.ipt_Psd').value;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let data = `username=${username}&password=${password}`
        axios.post('http://localhost:8888/users/login', data).then((res) => {
            if (res.status == 200 && res.data.code == 1) {
                // console.log(4545);
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user_id', res.data.user.id)
                //获取实时时间,方便以后计算token过期
                // let d = new Date();
                // let hour = d.getHours() * 60;
                // let min = d.getMinutes();
                // let nowTime = hour + min;
                // localStorage.setItem('token_time', nowTime)
                // console.log(LoginThis.returnAdd);
                location.href = `${LoginThis.returnAdd}`;
                //账号密码错误 code = 0
            } else if (res.status == 200 && res.data.code == 0) {
                alert('账号/密码错误')
            }
        })

    }
    $(all) {
        let res = document.querySelectorAll(all)
        return res.length == 1 ? res[0] : res;
    }
}
new Login;