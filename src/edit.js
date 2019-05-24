import { Component, createElement as el } from '@wordpress/element';

class DoubleMasonry extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        return el( 'p', { className: 'foo' }, 'Hello editor!' );
    }
}

export default DoubleMasonry;
