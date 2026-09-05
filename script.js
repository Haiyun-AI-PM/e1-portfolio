/* script.js — E3 首版 V1：行为层
   index.html 管结构、styles.css 管长相、本文件管动作。 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 页脚年份自动更新
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // 2. 时间线手风琴：同一时刻只展开一个节点（可验证交互）
  const items = Array.from(document.querySelectorAll('.tl-item'));
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return; // 只响应"展开"事件
      items.forEach((other) => {
        if (other !== item && other.open) {
          other.open = false;
        }
      });
    });
  });
});
