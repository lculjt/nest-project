const OSS = require('ali-oss');

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-beijing',
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: '',
  accessKeySecret: '',
  authorizationV4: true,
  // yourbucketname填写存储空间名称。
  bucket: 'ljts-bucket'
});

async function list () {
    // 不带任何参数，默认最多返回100个文件。
    const result = await client.list();
    console.log(result);
}

async function put () {
    try {
      const result = await client.put('newpic.png', '../large-file-sharding-upload/uploads/989194_180700smlj5jm8vfnf2q9g.jpg');
      console.log(result);
      list();
    } catch (e) {
      console.log(e);
    }
}
put();
