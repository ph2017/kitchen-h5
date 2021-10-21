/**
 * 遍历查找当前节点element的带有className的父节点
 * @param {*} element
 * @param {string} className
 * @returns element
 */
 export function getParentNode(element, className) {
    while (element) {
        if (element.className && element.className.indexOf(className) > -1) {
            return element;
        } else {
            element = element.parentNode;
        }
    }
    return null;
}