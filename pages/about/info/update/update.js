Page({
  data: {
    items: [
      { id: '0', value: '男', checked: 'true' },
      { id: '1', value: '女' },
      { id: '2', value: '保密' },
    ],

    name: "",
    birthday: "",
    gender: "",
    genderSelect: 0,
    desc: "",
    phone: "",
    city: "",
    school: "",
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    console.log(this.data.id)
  },


  userNameInput: function (e) {
    //设置姓名
    this.setData({
      name: e.detail.value
    })
  },
  radioChange(e) {
    this.setData({
      genderSelect: e.detail.value
    })
  },
  userDescInput: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  userTellInput: function (e) {
    //设置电话
    this.setData({
      phone: e.detail.value
    })
  },
  userBirthdayInput: function (e) {
    //设置电话
    this.setData({
      birthday: e.detail.value
    })
  },
  userCityInput: function (e) {
    //设置电话
    this.setData({
      city: e.detail.value
    })
  },
  userSchoolInput: function (e) {
    //设置电话
    this.setData({
      school: e.detail.value
    })
  },
  submit: function () { //提交input信息到后台
    var name = this.data.name;
    console.log(name)
    var desc = this.data.desc;
    console.log(desc)
    var birthday = this.data.birthday;
    console.log(birthday)
    var city = this.data.city;
    console.log(city)
    var school = this.data.school;
    console.log(school)
    var phone = this.data.phone;
    console.log(phone)
    var gender = this.data.items[this.data.genderSelect].value;
    console.log(gender)
    wx.request({
      url: 'https://njuqa.clsaa.com/api/user',
      method: 'PUT',
      data: {
        id: this.data.id,
        nickname: name,
        birthday: birthday,
        gender: gender == '女' ? 1 : (this.data.gender == '男' ? 0 : 2),
        phone: phone,
        city: city,
        school: school,
        desc: desc
      }

    })
    wx.navigateBack({
      url: '../info',
    })
  }
})
