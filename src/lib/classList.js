// https://programmingwithmosh.com/react/multiple-css-classes-react/
export default function classList(...classes) {
  return classes.filter((item) => !!item).join(' ')
}
