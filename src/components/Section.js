export default class Section {
	constructor(data, selector, container) {
    this._items = data.items;
    this._renderCallback = data.renderer;
    this._selector = selector;
    this._container = container;
	}

  addItem = (data) => {
    this._container.prepend(this._renderCallback(data.name, data.image));
  }

  render = () => {
    const itemList = [];
    for (let item of this._items) {
        itemList.push(this._renderCallback(item.name, item.link));
    }

    this._container.append.apply(this._container, itemList);
  }
}