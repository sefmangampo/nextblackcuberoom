const ScrollToRefresh = () => {
  const hash = window.location.hash.substring(1);

  if (hash && hash.length) {
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        el.scrollIntoView();
      });
    }, 600);
  }
};

const fnRemoveHash = () => {
  const loc = window.location;
  const hist = window.history;

  if (hist && "pushState" in hist) {
    hist.replaceState("", document.title, loc.pathname + loc.search);
  } else {
    const scrollV = document.body.scrollTop;
    const scrollH = document.body.scrollLeft;

    loc.hash = "";

    document.body.scrollTop = scrollH;
    document.body.scrollLeft = scrollV;
  }
};

export default ScrollToRefresh;
