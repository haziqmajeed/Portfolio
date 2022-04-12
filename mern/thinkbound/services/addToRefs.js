export default function addToRefs(el, ref) {
    if (el && !ref.current.includes(el)) {
        ref.current.push(el);
    }
};