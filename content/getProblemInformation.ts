export default async () => {
  const infoPage = (new DOMParser()).parseFromString(await (await fetch(location.href.replace('submitpage', 'problem'))).text(), 'text/html')
  const infoElement = infoPage.querySelector<HTMLDivElement>('body > div > div > div:nth-child(4)')
  return infoElement?.innerText
}