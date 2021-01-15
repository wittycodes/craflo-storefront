import Footer  from "../../../../layouts/footer"
import * as React from "react";
import { RuntimeComponent } from "./runtimeComponent.decorator";


@RuntimeComponent({
  selector: "product-page-runtime"
})
export class Runtime extends React.Component {
  public state: any;

  constructor(props) {
    super(props);

    this.state = {
      clickCount: 0
    };

    this.increaseCount = this.increaseCount.bind(this);
  }

  public increaseCount(): void {
    this.setState({ clickCount: this.state.clickCount + 1 });
  }

  public render(): JSX.Element {
    return (
      <div>
        <Footer/>
        <div className="text text-align-center">
          <button className="button" onClick={this.increaseCount}>
            Click me
          </button>
          <div>
            <label htmlFor="clickCount">Click count:</label>
            <b id="clickCount">{this.state.clickCount}</b>
          </div>
        </div>
      </div>
    );
  }
}
