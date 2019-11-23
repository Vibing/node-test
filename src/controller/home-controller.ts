import * as ayc from 'async';

const sleep = t => {
  const time = Date.now() + t * 1000;
  while (Date.now() < time) {}
};

var q = ayc.queue(function(task, callback) {
  console.log('进入');
  sleep(3);
  console.log('success');
  callback();
}, 3);

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
    ctx.body = {
      state: 'success'
    };
  }
}
