// measure.js
function a(el) {
    return el.getElementsByTagName('*');
}

function b(el) {
    return el.querySelectorAll('*');
}

function c(el) {
    const children = [...el.children];
    return [...children, ...children.flatMap(c)];
}

function d(el, els = []) {
    els.push(...el.children);
    for (const child of el.children)
        d(child, els);
    return els;
}

function e(el) {
    function* e0(el) {
        for (const child of el.children) {
            yield child;
            yield* e0(child);
        };
    };

    return e0(el).toArray();
};

function f(el) {
    const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
    const els = [];
    while (treeWalker.nextNode())
        els.push(treeWalker.currentNode);
    return els;
}

function g(el) {
    const nodeIterator = document.createNodeIterator(el, NodeFilter.SHOW_ELEMENT);
    let child = nodeIterator.nextNode(); //returns root
    const els = [];
    while (child = nodeIterator.nextNode())
        els.push(child);
    return els;
}

const ways = { a, b, c, d, e, f, g };


export function measure(el) {

    const results = Object.fromEntries(Object.values(ways).map(name => [name, []]));
    for (let i = 0; i < 10; i++) {
        Object.values(ways).forEach(func => {
            const start = performance.now();
            let r = func(el);
            results[func].push(performance.now() - start);
            // console.log(r.length)
            if (r.length !== 68848) {
                throw 'wrong length ' + r.length;
            }
        })
    }

    return results;
}
