export function setCookie(key, value, expire = null) {
  let cookieValue = `${key}=${value}`;
  if (expire !== null) {
    cookieValue += `; expires=${expire};`;
  }
  document.cookie = `${key}=${value}; expires=${expire}`;
}

export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// export function deleteCookie(key) {
//   setCookie(key, '', 'Thu, 01 Jan 1970 00:00:00 GMT');
// }

export function deleteCookie(key: string) {
  document.cookie = `${key}=;expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0;`;
}
