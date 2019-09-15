Page({
  data: {
    switch: 0
  },
  chage(e) {
    this.setData({
      switch: e.currentTarget.id
    })
  }
})