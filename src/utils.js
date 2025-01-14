function isAllowedUrl(url, allowedUrls) {
  if (!Array.isArray(allowedUrls)) {
    return true;
  }
  return url.includes(allowedUrls[0]);
}
function isValidUrl(url) {
  return url.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);
}

function getCurrentDateTimeAsString() {
  return (new Date()).toUTCString();
}

module.exports = {
  isValidUrl: isValidUrl,
  isAllowedUrl: isAllowedUrl,
  getCurrentDateTimeAsString: getCurrentDateTimeAsString
};
