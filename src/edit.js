import { Component, createElement as el } from '@wordpress/element';
import classnames from 'classnames';

class DoubleMasonry extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        return el( 'p', { className: classnames( 'text-4xl', 'text-purple' ) }, 'Hello editor!' );
    }
}

export default DoubleMasonry;
