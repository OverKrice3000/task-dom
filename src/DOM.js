/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        let nextTag = document.createElement(tag);
        nextTag.innerHTML = content;
        document.body.append(nextTag);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    let insertor = function insert(element, childrenCount, level, depth) {
        if (!level) return element;
        for (let i = 0; i < childrenCount; i++) {
            let nextTag = document.createElement('div');
            nextTag.setAttribute('class', 'item_' + depth);
            element.append(
                insert(nextTag, childrenCount, level - 1, depth + 1),
            );
        }
        return element;
    };
    let rootTag = document.createElement('div');
    rootTag.setAttribute('class', 'item_1');
    document.body.append(rootTag);
    return insertor(rootTag, childrenCount, level - 1, 2);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    let twos = document.getElementsByClassName('item_2');
    for (let two of twos) {
        let substitude = document.createElement('section');
        substitude.setAttribute('class', 'item_2');
        substitude.innerHTML = two.innerHTML;
        two.replaceWith(substitude);
    }
    return tree;
}
