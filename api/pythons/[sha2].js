const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { query: {sha2}} = req;

  // 读取JSON文件获取映射
  const dabasePath = path.join(__dirname, '../database.json');
  const filesMap = JSON.parse(fs.readFileSync(dabasePath, 'utf-8'));

  // 检查SHA1值是否存在于映射中
  if (sha2 && filesMap[sha2]) {
    // 重定向到映射的URL
    res.redirect(filesMap[sha2]);
  } else {
    // 如果SHA1值不合法或不存在，则返回错误信息
    res.status(404).json({ error: 'Invalid or missing sha2 parameter' });
  }
};
