/* script.js — E4 完善作品：行为层
   index.html 管结构、styles.css 管长相、本文件管动作。
   交互清单：
   1) 页脚年份自动更新（E1 起）；
   2) 时间线手风琴：同一时刻只展开一个节点（E3，可验证交互）；
   3) 桌面侧边导航：滚动高亮当前章节 + 旅程节点点击自动展开并定位（E4 新增，可验证交互）。 */

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

  // 3. 侧边章节导航：滚动时高亮当前章节（桌面 ≥1180px 可见；可验证交互）
  const spyLinks = Array.from(document.querySelectorAll('.side-nav a[data-spy]'));
  const spySections = spyLinks
    .map((a) => document.getElementById(a.dataset.spy))
    .filter(Boolean);

  const paintSpy = () => {
    let current = null;
    for (const sec of spySections) {
      if (sec.getBoundingClientRect().top <= 120) current = sec.id;
    }
    if (current) {
      spyLinks.forEach((a) => a.classList.toggle('active', a.dataset.spy === current));
    }
  };

  if (spyLinks.length && spySections.length) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        paintSpy();
        ticking = false;
      });
    }, { passive: true });
    paintSpy();
  }

  // 4. 侧边"旅程节点"快跳：先展开目标节点（遵循手风琴互斥），再平滑定位
  document.querySelectorAll('.side-sub a[href^="#tl-"]').forEach((link) => {
    link.addEventListener('click', (ev) => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      ev.preventDefault();
      if (target.tagName === 'DETAILS' && !target.open) {
        target.open = true;
      }
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });
});
