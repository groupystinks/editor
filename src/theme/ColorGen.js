import ColorGen from 'tinytinycolor';

export default class Color {
  constructor(stringOrColor) {
    this._color = new ColorGen(stringOrColor);
  }

  toString(): string {
    return this._color.toHexString();
  }

  lighten(amount: number): Color {
    return new Color(ColorGen.lighten(this._color, amount));
  }

  darken(amount: number): Color {
    return new Color(ColorGen.darken(this._color, amount));
  }

  saturate(amount: number): Color {
    return new Color(ColorGen.saturate(this._color, amount));
  }
}
