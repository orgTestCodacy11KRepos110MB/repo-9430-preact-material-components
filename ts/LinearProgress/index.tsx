import {MDCLinearProgress} from '@material/linear-progress';
import autobind from 'autobind-decorator';
import {h} from 'preact';
import MaterialComponent from '../Base/MaterialComponent';

export interface ILinearProgressProps {
  indeterminate?: boolean;
  reverse?: boolean;
  progress?: number; // TODO: fix type in docs
}

export interface ILinearProgressState {}

export class LinearProgress extends MaterialComponent<
  ILinearProgressProps,
  ILinearProgressState
> {
  public defaultProps = {
    determinate: true
  };

  protected componentName = 'linear-progress';
  protected mdcProps = ['reverse'];
  protected themeProps = ['primary', 'secondary'];
  protected MDComponent?: MDCLinearProgress;
  protected mdcNotifyProps = ['reverse', 'progress'];

  public componentDidMount() {
    super.componentDidMount();
    if (this.control) {
      this.MDComponent = new MDCLinearProgress(this.control);
      this.MDComponent.determinate = !this.props.indeterminate;
    }
    this.afterComponentDidMount();
  }

  public componentWillUpdate(nextProps) {
    super.componentWillUpdate(nextProps);
    if (this.MDComponent) {
      this.MDComponent.determinate = !this.props.indeterminate;
    }
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    if (this.MDComponent) {
      this.MDComponent.destroy();
    }
  }

  @autobind
  protected materialDom(props) {
    // TODO: Fix theme props
    return (
      <div role="progressbar" {...props} ref={this.setControlRef}>
        <div className="mdc-linear-progress__buffering-dots" />
        <div className="mdc-linear-progress__buffer" />
        <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span className="mdc-linear-progress__bar-inner" />
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span className="mdc-linear-progress__bar-inner" />
        </div>
      </div>
    );
  }
}

export default LinearProgress;
