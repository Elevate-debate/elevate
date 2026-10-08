async function checkSheets() {
  const gids = [0, 1, 2, 3, 4, 5, 100, 200, 500, 1000, 1452345, 1632731885];
  // check Chapters
  const resChapters = await fetch('https://docs.google.com/spreadsheets/d/1sJbN7keR-Fdi6pFJKnzG569WwNFXtfNgns4yiGOZNPY/gviz/tq?tqx=out:csv&sheet=Chapters');
  console.log('Chapters status:', resChapters.status, (await resChapters.text()).slice(0, 100));

  // check Resources
  const resResources = await fetch('https://docs.google.com/spreadsheets/d/1sJbN7keR-Fdi6pFJKnzG569WwNFXtfNgns4yiGOZNPY/gviz/tq?tqx=out:csv&sheet=Resources');
  console.log('Resources status:', resResources.status, (await resResources.text()).slice(0, 200));

  // check gid=0
  const res0 = await fetch('https://docs.google.com/spreadsheets/d/1sJbN7keR-Fdi6pFJKnzG569WwNFXtfNgns4yiGOZNPY/gviz/tq?tqx=out:csv&gid=0');
  console.log('gid=0 status:', res0.status, (await res0.text()).slice(0, 100));
}
checkSheets();

