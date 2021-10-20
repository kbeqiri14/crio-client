/**
 * @desc A function that transforms the root element of
 * a component into provided element, by replacing it.
 * @param {function(): {props: *}} Component
 * @param rootTag
 */
export const transformTag = (Component, rootTag) => {
  const isFn = typeof Component === 'function';
  const render = isFn ? Component : Component.render;

  const modifiedRender = function () {
    const { props, ...restProps } = render.apply(this, arguments);
    restProps.type = rootTag;
    return {
      props,
      ...restProps,
    };
  };

  if (isFn) {
    return modifiedRender;
  } else {
    Component.render = modifiedRender;
    return Component;
  }
};
