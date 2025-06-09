export function isNavItemActive({ href, onePageHref, pathname }) {
  if (href && pathname.startsWith(href)) {
    return true;
  }

  if (onePageHref) {
    // Преобразование шаблона onePageHref в регулярное выражение
    const regex = new RegExp(`^${onePageHref.replace(/:\w+/g, '[^/]+')}$`);
    return regex.test(pathname);
  }

  return false;
}
