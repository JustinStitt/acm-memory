// params: object
// fields:
// newWidth
// defaultTimeout
export function poppress(node, params) {
  let old_width = node.width;
  let newWidth = params.newWidth;
  let defaultTimeout = params.defaultTimeout;
	const handleMousedown = () => {
    node.width = newWidth;
    setTimeout(() => {
      node.width = old_width;
    }, defaultTimeout)
	};

	const handleMouseup = () => {
    node.width = old_width;
	};

	node.addEventListener('mousedown', handleMousedown);
	node.addEventListener('mouseup', handleMouseup);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown);
			node.removeEventListener('mouseup', handleMouseup);
		}
	};
}