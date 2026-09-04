/* script.js — 职责：页面的「行为」（交互与动态内容）
   index.html 管结构、styles.css 管长相、本文件管动作。 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 页脚年份自动更新：永远显示当前年份
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // 2. 导航锚点平滑滚动：点击「关于我 / 项目 / 联系方式」平滑滑到对应区块
  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return; // 只处理站内锚点

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
