import * as ayc from 'async';

const test = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

var q = ayc.queue(function(task, callback) {
  console.log('进入');
  test().then(r => {
    console.log('success');
    callback();
  });
}, 2);

q.drain(function() {
  console.log('所有任务处理完');
});

q.error(function(err, task) {
  console.error(err);
});

let count = 0;

export default class HomeController {
  static async hello(ctx) {
    count++;
    q.push({ name: '任务' + count }, err => {
      console.log('完成处理:' + count);
    });

    const now = performance.now();
    while (performance.now() < now + 1000) {}

    ctx.body = {
      state: 'success aasdf'
    };
  }
}
