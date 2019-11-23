const sleep = t => {
  const time = Date.now() + t * 1000;
  while (Date.now() < time) {}
};

export default class HomeController {
  static async hello(ctx) {
    console.log('进入');
    sleep(3);
    console.log('success');
    ctx.body = {
      state: 'success'
    };
  }
}
