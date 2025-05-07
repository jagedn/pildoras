const getAuthors = function (node) {
  const result = [];
  const authorCount = node.getAttribute('authorcount')
  if (authorCount > 1) {
    for (let index = 1; index < authorCount + 1; index++) {
      const author = node.getAttribute(`author_${index}`)
      const email = node.getAttribute(`email_${index}`)
      const bio = node.getAttribute(`authorbio_${index}`)
      const avatar = node.getAttribute(`avatar_${index}`)
      result.push({ name: author, email: email, bio: bio, avatar: avatar })
    }
  } else {
    const author = node.getAttribute('author')
    const email = node.getAttribute('email')
    const bio = node.getAttribute(`authorbio`)
    const avatar = node.getAttribute(`avatar`)
    result.push({ name: author, email: email, bio: bio, avatar: avatar })
  }
  return result;
}

const renderAuthors = function (node) {
  const lastpage = node.getAttribute('last-page');
  if( lastpage !== undefined && lastpage === "false" ) return "";

  const authors = getAuthors(node)

  return authors.map(author => {
    const authorImageUri = node.getMediaUri(`${author.avatar}`)
    return `
<h3>Authors :</h3>
<div class="author">
<div class="author-avatar"><img src="${authorImageUri}"/></div>
<div class="author-name"><a href="${author.email}">${author.email}</a></div>
<div class="author-bio">${author.bio}</div>
</div>
`;
  }).join('\n')
}

const renderRepository = function (node) {
  const lastpage = node.getAttribute('last-page');
  if( lastpage !== undefined && lastpage === "false" ) return "";
  return `<div class="repository-container">
<a href="https://github.com/jagedn/pildoras/pdfs">Ir al repositorio de pildoras</a>
</div>
`;
}


module.exports = {
  paragraph: (node) => `<p class="${node.getRoles().join(' ')}">${node.getContent()}</p>`,
  document: (node) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="./jagedn/assets/style.css" rel="stylesheet">
</head>
<body>
<header>
  <img class="wordmark" src="./jagedn/assets/logo.svg"/>
  <h1>${node.getHeader().getTitle()}</h1>
  <a class="website" href="https://incsteps.com">incsteps.com</a>
  <img class="logo" src="./jagedn/assets/logo.svg"/>
</header>
<section class="content">
${node.getContent()}
<div class="sect1 authors">
${renderAuthors(node)}
${renderRepository(node)}
</div>
</section>
</body>`
}
