export const insertMentionLinks = (markdown) => {
  return markdown.replace(
    /\B(@([a-zA-Z0-9](-?[a-zA-Z0-9_])+))/g,
    `**[$1](https://github.com/$2)**`
  );
};

export const shorten = (text = "", maxLength = 240) => {
  // Normalize newlines
  let cleanText = text.replace(/\\r\\n/g, "\n");

  // Return if short enough already
  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  const ellip = " ...";
  // Return the 140 chars as-is if they end in a non-word char
  const oneTooLarge = cleanText.substr(0, 241);
  if (/\W$/.test(oneTooLarge)) {
    return oneTooLarge.substr(0, 240) + ellip;
  }

  // Walk backwards to the nearest non-word character
  let i = oneTooLarge.length;
  while (--i) {
    if (/\W/.test(oneTooLarge[i])) {
      return oneTooLarge.substr(0, i) + ellip;
    }
  }

  return oneTooLarge.substr(0, 240) + ellip;
};

export const relativeDate = (str) => {
  var s = (+new Date() - Date.parse(str)) / 1e3,
    m = s / 60,
    h = m / 60,
    d = h / 24,
    y = d / 365.242199,
    tmp;

  return (tmp = Math.round(s)) === 1
    ? "just now"
    : m < 1.01
    ? tmp + " seconds ago"
    : (tmp = Math.round(m)) === 1
    ? "a minute ago"
    : h < 1.01
    ? tmp + " minutes ago"
    : (tmp = Math.round(h)) === 1
    ? "an hour ago"
    : d < 1.01
    ? tmp + " hours ago"
    : (tmp = Math.round(d)) === 1
    ? "yesterday"
    : y < 1.01
    ? tmp + " days ago"
    : (tmp = Math.round(y)) === 1
    ? "a year ago"
    : tmp + " years ago";
};

export const pluralizedComments = (commentsCount) => {
  if (commentsCount === 1) {
    return `${commentsCount} comment`;
  } else if (commentsCount > 0) {
    return `${commentsCount} comments`;
  } else {
    return `0 comments`;
  }
};

export const lowerCaseAllWordsExceptFirstLetters = (string) => {
  return string.replace(/\S*/g, function (word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
};
