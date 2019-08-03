import './css/TextArea.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 文本域
 * @author tengge / https://github.com/tengge1
 */
class TextArea extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this, props.onChange);
        this.handleInput = this.handleInput.bind(this, props.onInput);
    }

    render() {
        const { className, style, value } = this.props;

        return <textarea
            className={classNames('TextArea', className)}
            style={style}
            value={this.state.value}
            onChange={this.handleChange}
            onInput={this.handleInput}></textarea>;
    }

    handleChange(onChange, event) {
        onChange && onChange(event.target.value, this.props.name, event);
    }

    handleInput(onInput, event) {
        onInput && onInput(event.target.value, this.props.name, event);
    }
}

TextArea.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onInput: PropTypes.func,
};

TextArea.defaultProps = {
    className: null,
    style: null,
    name: null,
    value: '',
    onChange: null,
    onInput: null,
};

export default TextArea;