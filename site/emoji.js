// ===== Lisân Campus · émoticônes affichées en images
// Chaque émoticône du site est remplacée par une image : Fluent Emoji de Microsoft (licence MIT) et,
// pour les drapeaux, flag-icons (licence MIT). Le même dessin sur tous les téléphones et ordinateurs.
// Fichiers dans emoji/ (nom = points de code en hexadécimal) ; liste refaite par outils/emoji/build.js.
(function () {
  const HAVE = new Set(["1f0cf","1f1e7-1f1eb","1f1e8-1f1ee","1f1ea-1f1ec","1f1eb-1f1f7","1f1ec-1f1f3","1f1f2-1f1e6","1f1f2-1f1f1","1f1f8-1f1e6","1f1f8-1f1f3","1f305","1f307","1f309","1f30a","1f30d","1f310","1f31f","1f320","1f321","1f327","1f32c","1f331","1f332","1f333","1f336","1f339","1f33d","1f33e","1f340","1f345","1f347","1f349","1f34a","1f34b","1f34c","1f34d","1f34e","1f357","1f35a","1f35e","1f36c","1f370","1f372","1f373","1f375","1f37d","1f381","1f382","1f388","1f389","1f393","1f399","1f39e","1f3a3","1f3a4","1f3a6","1f3a7","1f3a8","1f3ab","1f3ac","1f3ad","1f3ae","1f3af","1f3b5","1f3b6","1f3c0","1f3c3","1f3c5","1f3c6","1f3ca","1f3cb","1f3d6","1f3d7","1f3d8","1f3d9","1f3da","1f3db","1f3dc","1f3de","1f3e0","1f3e2","1f3e4","1f3e5","1f3e6","1f3e8","1f3ea","1f3eb","1f3ec","1f3ed","1f3f0","1f3f7","1f404","1f408","1f40e","1f414","1f416","1f418","1f41d","1f41f","1f42a","1f42b","1f42d","1f438","1f441","1f442","1f443","1f444","1f44b","1f44d","1f44e","1f453","1f455","1f457","1f458","1f464","1f465","1f466-1f3ff","1f467-1f3fd","1f467-1f3fe","1f468-1f3fe-200d-1f33e","1f468-1f3fe-200d-1f3eb","1f468-1f3fe-200d-1f4bc","1f468-1f3ff","1f468-1f3ff-200d-1f4bb","1f469-1f3fd","1f469-1f3fe","1f469-1f3fe-200d-1f393","1f469-1f3fe-200d-1f52c","1f469-1f3fe-200d-1f9b1","1f469-1f3fe-200d-2695","1f46a","1f474-1f3fe","1f475-1f3ff","1f477-1f3fe","1f483","1f489","1f48a","1f49a","1f4a1","1f4a7","1f4aa","1f4ac","1f4ad","1f4af","1f4b0","1f4b3","1f4b5","1f4b6","1f4b8","1f4bb","1f4bc","1f4c3","1f4c4","1f4c5","1f4c6","1f4c8","1f4c9","1f4ca","1f4cb","1f4cd","1f4d1","1f4d5","1f4d6","1f4d8","1f4da","1f4db","1f4dc","1f4dd","1f4de","1f4e1","1f4e2","1f4e3","1f4e4","1f4e6","1f4e7","1f4e8","1f4e9","1f4f0","1f4f1","1f4f2","1f4f6","1f4f7","1f4f8","1f4f9","1f4fa","1f4fb","1f501","1f504","1f50a","1f50b","1f50d","1f50e","1f510","1f511","1f512","1f51f","1f520","1f525","1f527","1f52a","1f52c","1f52d","1f54c","1f56f","1f570","1f58b","1f5a5","1f5bc","1f5c2","1f5d1","1f5d2","1f5d3","1f5de","1f5e3","1f5fa","1f5fd","1f600","1f604","1f60a","1f60b","1f60c","1f62b","1f633","1f634","1f686","1f68c","1f695","1f697","1f6aa","1f6ab","1f6ae","1f6b0","1f6b2","1f6b6","1f6bf","1f6c2","1f6cb","1f6cc","1f6cd","1f6ce","1f6cf","1f6d2","1f6d6","1f6d7","1f6e0","1f6e1","1f6e3","1f6e4","1f6eb","1f6ec","1f6f0","1f90f","1f912","1f914","1f915","1f916","1f91d","1f91e","1f922","1f927","1f938","1f944","1f954","1f955","1f957","1f95a","1f95b","1f964","1f966","1f969","1f96d","1f970","1f975","1f976","1f981","1f98a","1f98c","1f992","1f99f","1f9a0","1f9b5","1f9b6","1f9c2","1f9c3","1f9c4","1f9c5","1f9cd-1f3fe","1f9d1-1f3fe","1f9d1-1f3fe-200d-1f33e","1f9d1-1f3fe-200d-1f373","1f9d1-1f3fe-200d-1f393","1f9d1-1f3fe-200d-1f3a4","1f9d1-1f3fe-200d-1f3eb","1f9d1-1f3fe-200d-1f4bc","1f9d1-1f3fe-200d-2695","1f9d2-1f3fe","1f9d4-1f3fe","1f9d5-1f3fe","1f9da","1f9e0","1f9e1","1f9ea","1f9ed","1f9ee","1f9f1","1f9f3","1f9f4","1f9f5","1f9f8","1f9f9","1f9fe","1fa78","1fa91","1fa99","1fa9c","1fa9f","1fab6","1fad2","2139","2194","23e9","23f0","23f3","2600","2615","267b","2696","2699","26a1","26bd","2702","2705","2708","2709","270b","270d","270f","2714","2728","2744","274c","2753","2754","2764","2795","27a1","2b05","2b50"]);
  const RE = /(?:\p{Regional_Indicator}{2}|\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?)*)\uFE0F?/gu;
  const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'OPTION', 'SELECT', 'PRE', 'CODE', 'TITLE', 'svg', 'SVG', 'IMG']);
  const hex = s => [...s].map(c => c.codePointAt(0).toString(16)).filter(h => h !== 'fe0f').join('-');
  function swap(node) {
    const t = node.nodeValue; RE.lastIndex = 0;
    if (!RE.test(t)) return;
    RE.lastIndex = 0;
    const frag = document.createDocumentFragment(); let last = 0, any = false, m;
    while ((m = RE.exec(t))) {
      const h = hex(m[0]); if (!HAVE.has(h)) continue;
      if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
      const img = document.createElement('img');
      img.className = 'emo' + (/^1f1/.test(h) && h.length === 11 ? ' flag' : ''); img.src = 'emoji/' + h + '.svg';
      img.alt = m[0]; img.draggable = false; img.decoding = 'async';
      frag.appendChild(img); last = m.index + m[0].length; any = true;
    }
    if (!any) return;
    if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }
  function emojify(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (root.parentNode && !SKIP.has(root.parentNode.nodeName)) swap(root); return; }
    if (root.nodeType !== 1 || SKIP.has(root.nodeName)) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => {
      for (let p = n.parentNode; p && p !== root.parentNode; p = p.parentNode) if (SKIP.has(p.nodeName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT; } });
    const list = []; while (w.nextNode()) list.push(w.currentNode);
    list.forEach(swap);
  }
  window.emojify = emojify;
  emojify(document.body);
  new MutationObserver(ms => ms.forEach(m => {
    if (m.type === 'characterData') emojify(m.target); else m.addedNodes.forEach(emojify);
  })).observe(document.body, { childList: true, subtree: true, characterData: true });
})();
