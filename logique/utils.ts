export function scrollTop() {
    document.getElementsByTagName('html')[0].scrollIntoView(true)
}
export function scrollTo(id, x, y) {
    document.getElementById(id) && document.getElementById(id).scrollTo(x, y)
}