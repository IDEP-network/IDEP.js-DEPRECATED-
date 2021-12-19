const isNode = () => {
  const isNode =
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;
  return isNode;
};

export default isNode();
